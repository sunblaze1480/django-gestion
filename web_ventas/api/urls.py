from django.urls import path
from .views import GetProducts, UpdateProduct, DeleteProduct, CustomersView, ProductsMassCreateUpdate, AdvancedPricingViewset, PricingTypesViewset

urlpatterns = [
    ##    PRODUCTS
    path("get-products", GetProducts.as_view()),    
    path("create-product",GetProducts.as_view()),
    path("update-product/<int:pk>", UpdateProduct.as_view()),
    path("delete-product/<int:pk>", DeleteProduct.as_view()),
    path("products/massupdate", ProductsMassCreateUpdate.as_view()),
    path("products/advancedPricing/",AdvancedPricingViewset.as_view({'get':'list', 'patch':'partial_update', 'post':'create'})),    
    path("products/advancedPricing",AdvancedPricingViewset.as_view({ 'post':'create'})),
    path("products/pricingTypes",PricingTypesViewset.as_view({'get':'list'})),
    ##   CUSTOMERS
    path("customers", CustomersView.as_view()),
    path("customers/<int:pk>", CustomersView.as_view()),
    path("create-customer/", CustomersView.as_view()),    
]
