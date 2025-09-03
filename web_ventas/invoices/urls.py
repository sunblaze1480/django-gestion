from rest_framework.routers import DefaultRouter
from .views import InvoiceViewSet, automatic_invoice_generator
from django.urls import path, include


router = DefaultRouter()
router.register(r'invoices', InvoiceViewSet, basename='invoices')

urlpatterns = [
    path('', include(router.urls)),
    path('automatic-generator', automatic_invoice_generator, name='automatic_invoice_generator')
]