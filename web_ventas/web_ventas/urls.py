from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),  
    path('api/', include('api.urls')),
    path('auth/', include('auth.urls')),
    path('sales/', include('sales.urls')),
    path('', include('frontend.urls'))
]