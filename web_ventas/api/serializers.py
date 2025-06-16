from rest_framework import serializers
from .models import Products, Customers, AdvancedPricing, PricingTypes

#TODO: Handle validation of certain fields/values

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ('product_id', 'product_desc', 'unit_price', 'units_quantity', 'unit_of_measure', 'uom_code', 'stock_quantity' )
        
class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ('customer_id', 'name', 'cust_account', 'tax_id', 'address', 'phone' , 'email' )
        

class PricingTypesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= PricingTypes
        fields = '__all__'        

class AdvancedPricingSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Products.objects.all())
    price_type_details = PricingTypesSerializer(source='price_type', read_only=True)    
    price_type = serializers.PrimaryKeyRelatedField(queryset=PricingTypes.objects.all(), write_only=True)
   
    
    class Meta: 
        model= AdvancedPricing
        fields = ('id', 'product', 'price_type', 'price_type_details','unit_price', 'date_updated')