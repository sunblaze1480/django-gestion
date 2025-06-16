from django.db import models
from api.models import Customers, Products

from django.core.exceptions import ValidationError

from datetime import date


class SaleStatus(models.Model):
    status_code = models.IntegerField(primary_key=True)
    description = models.CharField(max_length=15)
    

# Create your models here.
class Sales_Header(models.Model):        
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE)
    order_type = models.CharField(max_length=2)
    order_date = models.DateField(blank=True, null=True)
    order_status = models.CharField(max_length=15)
    total_amount = models.FloatField(default=0)
    paid_amount = models.FloatField(default=0, blank=True, null=True)
    
    def initialize_sale(self):
        self.set_total_amount()
        self.order_status='Pendiente'
        self.order_date= date.today()
        self.save()
    
    def set_total_amount (self):
        self.total_amount = 0
        detail_lines = Sales_Detail.objects.filter(sales_header=self.id)
        for line in detail_lines:
            line.calculate_amount()
            self.total_amount+=line.amount                    
                
    def make_payment(self, paid_amount):
        if paid_amount > 0:    
            self.paid_amount+=paid_amount
            if self.paid_amount >= self.total_amount:
                self.order_status = 'Paid'
            self.save()
    
    def change_status(self, new_status):
        #add any required business validation before changing status
        self.order_status = new_status
    

class Sales_Detail(models.Model):
    
    sales_header = models.ForeignKey(Sales_Header, related_name='order_detail', on_delete=models.CASCADE)            
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    status = models.CharField(max_length=10)  #pendiente, pagado, entregado, etc    
    quantity = models.IntegerField(default=0)
    amount = models.DecimalField(decimal_places=2, max_digits=10)      
    payment_method = models.CharField(max_length=10, blank=True)
    driver = models.CharField(max_length=50, blank=True)
    comments = models.CharField(max_length=50, blank=True)
    
    
    def calculate_amount(self):
        self.amount= self.product.unit_price*self.quantity
        self.save()
    
    def change_status(self, new_status):
        #add any required business validation before changing status
        self.status = new_status
    
                    
class PriceListHeader(models.Model):
    name = models.CharField(max_length=25, default="")
    description = models.CharField(max_length=50)
    type = models.CharField(max_length=10, blank=True, null= True)
    category = models.CharField(max_length=10, blank=True, null= True)
    
class PriceListDetail(models.Model):
    price_list_header = models.ForeignKey(PriceListHeader, related_name="price_list_detail", on_delete=models.CASCADE)
    product_code = models.CharField(max_length=10)
    product_description = models.CharField(max_length=100, null=True, blank=True)
    product_price = models.DecimalField(decimal_places=2, max_digits=10)
    packaging = models.CharField(max_length=80)
    units_per_package = models.IntegerField(default=0)
    
    
class ShipmentHeader(models.Model):
    delviery_date = models.DateTimeField()
    status= models.CharField(max_length=10)
    
class Shipment(models.Model):    
    shipment_header = models.ForeignKey(ShipmentHeader, related_name="shipment_detail", on_delete=models.CASCADE)                
    sales_detail = models.ForeignKey(Sales_Detail, related_name="shipment", on_delete=models.CASCADE)
    quantity_shipped = models.IntegerField(default=0)
    delviery_date = models.DateTimeField()
    status= models.CharField(max_length=10)
