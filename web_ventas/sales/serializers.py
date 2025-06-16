from rest_framework import serializers
from .models import Sales_Detail, Sales_Header, PriceListHeader, PriceListDetail, Shipment, ShipmentHeader
from api.models import Customers, Products
from api.serializers import CustomersSerializer, ProductsSerializer

class SalesHeaderSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customers.objects.all())
    class Meta:
        model = Sales_Header
        fields = ['id','customer','order_type','order_date','order_status','total_amount', 'paid_amount']
        
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['customer'] = CustomersSerializer(instance.customer).data
        return representation


class SalesDetailSerializer(serializers.ModelSerializer ):     
    product = serializers.PrimaryKeyRelatedField(queryset=Products.objects.all())        
              
    class Meta: 
        model = Sales_Detail
        fields = ['product','status','quantity','amount', 'payment_method', 'driver', 'comments']
        
    def to_representation(self, instance):
        #add product detailed information to output        
        representation =  super().to_representation(instance)
        representation['product'] = ProductsSerializer(instance.product).data
        return representation


class SalesOrderSerializer(serializers.ModelSerializer):    
    order_detail = SalesDetailSerializer( many=True)
    customer = serializers.PrimaryKeyRelatedField(queryset=Customers.objects.all())
    order_date = serializers.DateField(allow_null=True)
                       
    class Meta: 
        model = Sales_Header
        fields = ['id', 'customer', 'order_type', 'order_date', 'order_status', 'total_amount', 'paid_amount', 'order_detail']
        
    def create(self, validated_data):            
        detail_data = validated_data.pop('order_detail', [])        
        sale = Sales_Header.objects.create(**validated_data)                
        for item in detail_data:
            Sales_Detail.objects.create(sales_header=sale, **item)
        sale.initialize_sale()         
        return sale

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['customer']= CustomersSerializer(instance.customer).data
        return representation
    
    
class MakePaymentSerializer(serializers.Serializer):    
    order_id = serializers.IntegerField() 
    amount = serializers.FloatField( )

class ChangeSalesOrderStatusSerializer(serializers.Serializer):
    order_id = serializers.PrimaryKeyRelatedField(queryset=Sales_Header.objects.all())
    status = serializers.CharField()

class PriceListDetailSerializer(serializers.ModelSerializer):
    product_code = serializers.CharField()
    product_description = serializers.CharField()
    product_price = serializers.DecimalField(decimal_places=2, max_digits=10)
    units_per_package = serializers.IntegerField(default=0)    
    
    class Meta:
        model= PriceListDetail
        fields = ['product_code','product_description','product_price','packaging','units_per_package']            

class PriceListHeaderSerializer(serializers.ModelSerializer):
    id = serializers.CharField(required=False, allow_null=True)
    type = serializers.CharField(required=False, allow_null=True)
    category = serializers.CharField(required=False, allow_null=True)
    
    class Meta:
        model= PriceListHeader
        fields=['id','name', 'description', 'type', 'category']


class PriceListSerializer(serializers.ModelSerializer):
    
    type = serializers.CharField(required=False, allow_null=True, default='supplier')
    category=serializers.CharField(required=False, allow_null=True, default=' ')
    price_list_detail = PriceListDetailSerializer(many=True)
    
    
    class Meta:
        model = PriceListHeader
        fields = ['id','name', 'description', 'type', 'category', 'price_list_detail']
    
    def create(self,validated_data):
        price_list_detail = validated_data.pop('price_list_detail', [])
        list_header = PriceListHeader.objects.create(**validated_data)
        detail_fields = {field.name for field in PriceListDetail._meta.fields}
        for item in price_list_detail:            
            detail_data = {key: value for key, value in item.items() if key in detail_fields}
            detail_data['price_list_header']= list_header
            print(detail_data)
            PriceListDetail.objects.create(**detail_data)
        return list_header
    
    
class ShipmentHeaderSerializer(serializers.ModelSerializer):
    
    class Meta: 
        model= ShipmentHeader
        fields = "__all__"
    
class ShipmentSerializer(serializers.ModelSerializer):
    shipment_header = ShipmentHeaderSerializer(source="shipment_header")
    sales_detail_line = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Sales_Detail.objects.all())
    sales_detail = SalesDetailSerializer(source='sales_detail', read_only=True)
    
    class Meta:
        model = Shipment
        fields = ['shipment_header','sales_detail_line', 'sales_detail', 'quantity_shipped', 'delviery_date', 'status' ]    