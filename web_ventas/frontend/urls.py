from django.urls import path, include
from .views import index

urlpatterns = [
    path('/', index),
    path('products', index),
    path('customers', index),
    path('sales', index),
    path('sales/create', index),
    path('pricelists', index),
    path('pricelists/create', index),
    path('shipments', index),
    path('invoices', index),
    path('invoices/create', index),
    path('invoices/<pk>', index)
]