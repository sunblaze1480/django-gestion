from django.urls import path, include
from .views import CustomersView, ProductsMassCreateUpdate, AdvancedPricingViewset, PricingTypesViewset, ProductsViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductsViewSet, basename='products')



urlpatterns = [
    ##    PRODUCTS
    path('', include(router.urls)),
    path("products/massupdate", ProductsMassCreateUpdate.as_view()),
    path("products/advancedPricing/",AdvancedPricingViewset.as_view({'get':'list', 'patch':'partial_update', 'post':'create'})),    
    path("products/advancedPricing",AdvancedPricingViewset.as_view({ 'post':'create'})),
    path("products/pricingTypes",PricingTypesViewset.as_view({'get':'list'})),
    ##   CUSTOMERS
    path("customers", CustomersView.as_view()),
    path("customers/<int:pk>", CustomersView.as_view()),
    path("create-customer/", CustomersView.as_view()),
]
