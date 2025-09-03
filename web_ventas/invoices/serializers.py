from rest_framework import serializers
from .models import InvoiceHeader, InvoiceDetail
from api.models import Products, Customers
from .services import InvoiceService
from api.serializers import ProductsSerializer, CustomersSerializer


class CreateInvoiceDetailSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Products.objects.all())

    class Meta:
        model= InvoiceDetail
        fields = ['product','quantity', 'quantity_in_package', 'declared_unit_price', 'gross_amount', 'tax_amount', 'net_amount']

    def validate_quantity(self,value):
        if value <= 0:
            raise serializers.ValidationError("Cantidad debe ser mayor a 0")
        return value

    def validate_declared_unit_price(self, value):
        if value <0:
            raise serializers.ValidationError("Precio no puede ser negativos")
        return value

class CreateInvoiceSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customers.objects.all())
    details = CreateInvoiceDetailSerializer(write_only=True, many=True) #field for the POST/PUT or input

    class Meta:
        model=InvoiceHeader
        fields=['customer', 'invoice_type', 'total_gross_amount', 'total_tax_amount', 'total_net_amount', 'details']
        read_only_fields=[
            'total_gross_amount',
            'total_tax_amount',
            'total_net_amount'
        ]

    def create(self, validated_data):
        return InvoiceService.create_invoice(validated_data)

    def update(self, instance, validated_data):
        return InvoiceService.update_invoice(instance, validated_data)
            

class ListInvoiceHeaderSerializer(serializers.ModelSerializer):

    customer = CustomersSerializer(read_only=True)

    class Meta:
        model= InvoiceHeader
        fields=['id',  'invoice_type','customer', 'invoice_date', 'total_gross_amount', 'total_tax_amount', 'total_net_amount']

class InvoiceDetailSerializer(serializers.ModelSerializer):
    product = ProductsSerializer(read_only=True)

    class Meta:
        model=InvoiceDetail
        fields = ['line_number', 'product','quantity', 'quantity_in_package', 'declared_unit_price', 'gross_amount', 'tax_amount', 'net_amount']

class RetrieveInvoiceSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customers.objects.all())
    details = InvoiceDetailSerializer(many=True, read_only=True, source='invoicedetail_set')

    class Meta:
        model= InvoiceHeader
        fields=['id', 'customer', 'invoice_type', 'invoice_date', 'total_gross_amount', 'total_tax_amount', 'total_net_amount', 'details']


class AutomaticGeneratorInvoiceDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model=InvoiceDetail
        fields = ['line_number', 'product','quantity', 'quantity_in_package', 'declared_unit_price', 'gross_amount', 'tax_amount', 'net_amount']



class AutomaticGeneratorInvoiceSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customers.objects.all())
    details = AutomaticGeneratorInvoiceDetailSerializer(many=True, read_only=True)

    class Meta:
        model = InvoiceHeader
        fields=['id', 'customer', 'invoice_type', 'invoice_date', 'total_gross_amount', 'total_tax_amount', 'total_net_amount', 'details']

        
