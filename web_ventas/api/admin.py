from django.contrib import admin
from .models import Customers, Products, PricingTypes, AdvancedPricing

# Register your models here.
admin.site.register(Customers)
admin.site.register(Products)
admin.site.register(PricingTypes)
admin.site.register(AdvancedPricing)
