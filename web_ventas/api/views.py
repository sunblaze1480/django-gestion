import logging
from django.shortcuts import render
from django.http import HttpResponse, response
from rest_framework import status, viewsets, serializers
from rest_framework.views import APIView, exception_handler
from rest_framework.generics import  ListCreateAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView,ListAPIView
from rest_framework.response import Response
from .models import Products, Customers, AdvancedPricing, PricingTypes
from .serializers import ProductsSerializer, CustomersSerializer, AdvancedPricingSerializer, PricingTypesSerializer
from web_ventas.mixins import ListableViewMixin
from rest_framework.viewsets import ModelViewSet

logger = logging.getLogger(__name__)

# Create your views here.
#Different models have different ways of handling request, for learning and practice purposes.

#TODO: Try to remove most logic from here, as most is unnecesary

#######################################################                   
# **************** PRODUCTS **************************#
#######################################################
def main (request):
    return HttpResponse("Hello")



class ProductsViewSet(ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class ProductsMassCreateUpdate(APIView):    
    def post(self, request):
        data = request.data
        for product_data in data:            
            defaults =  {   'product_desc':product_data['product_desc'],
                            'unit_price': product_data['unit_price'].replace(".", ""),
                            'units_quantity': product_data['units_quantity'],
                            'unit_of_measure': product_data['unit_of_measure']                            
                        }
            try:
                Products.objects.update_or_create(product_id=product_data['product_id'], defaults=defaults)    
            except Exception:
                print(Exception)
        return Response("CSV Procesado", status=status.HTTP_201_CREATED)


class AdvancedPricingViewset(ListableViewMixin, viewsets.ModelViewSet):    
    serializer_class = AdvancedPricingSerializer
    
    def get_queryset(self):
        queryset = AdvancedPricing.objects.all()
        product_id = self.request.query_params.get("product_id")
        
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        return queryset
            
                    
class PricingTypesViewset(viewsets.ModelViewSet):
    queryset = PricingTypes.objects.all()
    serializer_class = PricingTypesSerializer
                                        


##############################################################                   
# **************** CUSTOMERS**************************########
#############################################################


class CustomersViewSet(ModelViewSet):
    queryset = Customers.objects.all()
    serializer_class = CustomersSerializer

class CustomersView(APIView):
    
    lookup_arg = "customer_id"    
    serializer_class = CustomersSerializer  
            
    def get(self, request, *args, **kwargs):        
        lookup= request.GET.get(self.lookup_arg)
                        
        if lookup != None:
            ret_customers = Customers.objects.filter(product_id=lookup)            
        else:
            ret_customers = Customers.objects.all()
        
        data = CustomersSerializer(ret_customers, many=True).data        
        
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):        
        serializer = CustomersSerializer(data=request.data)
        
        if serializer.is_valid():            
            serializer.save()            
            return Response(serializer.errors, status=status.HTTP_201_CREATED)
        else:            
            return Response(serializer.errors, status=status.HTTP_103_EARLY_HINTS)
        
    def delete (self, request, pk, *args, **kwargs):                
        cust = Customers.objects.filter(customer_id=pk)        
        if cust:
            res = cust.delete()
            return Response(res, status=status.HTTP_200_OK) 
        return Response("Not Found", status=status.HTTP_404_NOT_FOUND)          
        
    def patch (self, request, pk, *args, **kwargs):
        try:
            instance = Customers.objects.get(customer_id=pk)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = CustomersSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():                                 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)                                                   