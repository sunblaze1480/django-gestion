from django.shortcuts import render
from .models import Sales_Detail, Sales_Header, PriceListDetail, PriceListHeader, Shipment
from api.models import Products
from rest_framework import status, viewsets, filters
from rest_framework.views import APIView, exception_handler
from rest_framework.decorators import action
from rest_framework.generics import  ListCreateAPIView,  ListAPIView
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import SalesOrderSerializer, SalesHeaderSerializer, SalesDetailSerializer, MakePaymentSerializer, ChangeSalesOrderStatusSerializer, PriceListSerializer, PriceListHeaderSerializer, ShipmentSerializer

# Create your views here.
#######################################################                   
# **************** SALES *****************************#
#######################################################
class SalesHeadersView(ListAPIView):
#### Used for Sales HEADERS ONLY, without any detail
   
    serializer_class = SalesHeaderSerializer    
    
    def get_queryset(self):
        filter_param = self.kwargs.get('order_id')
        #If filtering, return the details of such order
        if filter_param:
            return Sales_Header.objects.filter(id=filter_param)
        return Sales_Header.objects.all()                   
                   
class SalesOrdersView(ListCreateAPIView):      
    # Used to handle complete sales orders, including HEADER + DETAIL information
    # Serializer handles creating both objects
     
    serializer_class = SalesOrderSerializer    
            
    def get_queryset(self):
        filter_param = self.kwargs.get('order_id')
        #If filtering, return the details of such order
        if filter_param:
            return Sales_Header.objects.filter(id=filter_param)
        return Sales_Header.objects.all()        
    
class SalesOrderDetailView(ListAPIView):
    #MUST have a queryset set, or redefine get_queryset
    serializer_class = SalesDetailSerializer
    
    def get_queryset(self):
        queryset = Sales_Detail.objects.all()
        filter_id = self.kwargs.get('order_id')
        if filter_id:
            queryset = Sales_Detail.objects.filter(sales_header=filter_id)
        return queryset
        
        
class MakePaymentView(APIView):
        
    def post(self, request, *args, **kwargs):
        serializer = MakePaymentSerializer(data=request.data)     
        
        if serializer.is_valid():                        
            order_id = serializer.validated_data.get('order_id')
            amount_paid = serializer.validated_data.get('amount')            
            sales_header = Sales_Header.objects.get(id=order_id)            
            if sales_header:
                sales_header.make_payment(amount_paid)
                return Response ('Payment processed', status=status.HTTP_200_OK)
            else:
                return Response('Order Not found', status=status.HTTP_404_NOT_FOUND)
        else:
            return Response('Verify Payload Format', status=status.HTTP_400_BAD_REQUEST)


class ChangeSalesOrderStatusView(APIView):
    
    def post(self, request, *args, **kwargs):
        serializer = ChangeSalesOrderStatusSerializer(data=request.data)

        if serializer.is_valid():
            try:
                sales_header = serializer.validated_data.get('order_id')
                new_status = serializer.validated_data.get('status')                                
                sales_header.change_status(new_status)
                sales_header.save()
                return Response("OK", status=status.HTTP_202_ACCEPTED  )
            except Exception as e:
                return Response('Error:', status=status.HTTP_400_BAD_REQUEST )
        else:
            return Response('Error: Check the input data', status=status.HTTP_400_BAD_REQUEST )

        
                                                                               
class PriceListViewSet(viewsets.ModelViewSet):
    queryset = PriceListHeader.objects.all()
    serializer_class= PriceListSerializer

    def create(self, request):
        data = request.data
                        
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PriceListHeaderViewSet(viewsets.ModelViewSet):
    queryset = PriceListHeader.objects.all()
    serializer_class= PriceListHeaderSerializer


    
class PriceListMassCreateUpdate(APIView):
    def post(self, request):
    
        serializer = PriceListSerializer(data=request.data)
        
        if serializer.is_valid():
            data = serializer.validated_data
            
            detail_data = data.pop('price_list_detail')
                                        
            header_defaults =   {'name': data['name'],
                                'description':data['description'],
                                'type': data['type'],
                                'category':data['category']
                                }
            
            #We try to find this price list, if it exists we shall update it.
            #We find by name because users will not manage price lists ID 
            header, _ = PriceListHeader.objects.get_or_create(name=data['name'], defaults=header_defaults)
        
            for detail in detail_data:
                try:
                    PriceListDetail.objects.update_or_create(price_list_header=header,
                                                            product_code=detail['product_code'],                                                             
                                                            defaults=detail)
                except Exception as e:
                    return Response(f"{str(e)}", status=status.HTTP_201_CREATED)
        
            return Response("Archivo procesado", status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
class ShipmentViewSet(viewsets.ModelViewSet):    
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
    
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filtersets_fields = ["shipment_header", "delivery_date"]
    search_fields = ["status"]
    
    @action(detail=False, methods=['get'])
    def filter(self, request):
        shipment_header = request.query_params.get("shipment_header")
        delivery_date = request.query_params.get("delivery_date")
        
        filtered_queryset = self.get_queryset()
        
        if shipment_header:
            filtered_queryset = filtered_queryset.filter(shipment_header=shipment_header)
        if delivery_date:
            filtered_queryset = filtered_queryset.filter(delivery_date=delivery_date)
            
        serializer = self.get_serializer(filtered_queryset, many=True)
        return Response(serializer.data)