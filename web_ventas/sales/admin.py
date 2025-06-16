from django.contrib import admin
from .models import Sales_Detail, Sales_Header


# Register your models here.
admin.site.register(Sales_Header)
admin.site.register(Sales_Detail)

