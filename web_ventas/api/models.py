from django.db import models
from django.core.exceptions import ValidationError

from datetime import date

sale_type_choices = [
    'S1', 'Venta comun',
    'S2', 'Venta mayorista',
    'S3', 'Venta Interna',
]

class Products(models.Model):
    product_id = models.IntegerField( primary_key=True, default=0, unique=True)
    product_desc = models.CharField(max_length=80)
    unit_price = models.DecimalField(max_digits=8, decimal_places=2)
    units_quantity = models.IntegerField(default=0)
    unit_of_measure = models.CharField(max_length=15, null=True)    
    uom_code = models.CharField(max_length=2, null=True, blank=True) 
    stock_quantity = models.IntegerField(default=0)
    category = models.CharField(max_length=15, null=True, blank=True)
    type = models.CharField(max_length=5, default= "0", null=True, blank=True)
    reference_product_id = models.IntegerField( default=0)
    reference_product_info = models.CharField(max_length=10,null=True, blank=True)
    
            
    def get_prices(self):
        prices = [{
            'price': self.unit_price,
            'price_type': "Precio Default",
            'description': "Precio base definido en producto"
        }]
        
        adv_pricing = AdvancedPricing.objects.filter(product=self)
        for item in adv_pricing:
            prices.append({
                'price': item.unit_price,
                'price_type':item.price_type,
                'description': item.get_price_type_display()
            })

        return prices


class PricingTypes(models.Model):
    description = models.CharField(max_length=20)    
                    
class AdvancedPricing(models.Model):
        
    product = models.ForeignKey(Products, related_name="product_price", on_delete=models.CASCADE)
    price_type = models.ForeignKey(PricingTypes, related_name="product_price_type", on_delete=models.CASCADE)
    unit_price = models.DecimalField(max_digits=8, decimal_places=2)        
    date_updated = models.DateField(blank=True, null= True)
    

class Customers(models.Model):
    customer_id = models.IntegerField( primary_key = True, default=0, unique=True )
    name = models.CharField(max_length=50)    
    cust_account = models.CharField(max_length=50, blank=True)
    tax_id = models.IntegerField(default=0) #CUIT
    address = models.CharField(max_length = 50, blank=True)    
    #TODO: Normalizar esto y generar una tabla de direcciones, telefonos
    phone = models.CharField(max_length = 20, blank=True)
    email = models.CharField(max_length = 50, blank=True)    



