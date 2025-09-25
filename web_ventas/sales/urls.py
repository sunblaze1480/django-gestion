from django.urls import path
from .views import SalesOrdersView, SalesHeadersView, MakePaymentView, PriceListViewSet, PriceListHeaderViewSet, PriceListMassCreateUpdate, ChangeSalesOrderStatusView,SalesOrderRetrieveView

urlpatterns = [
    ##   SALES CRUD
    path("sales", SalesOrdersView.as_view()),
    path("sales/<int:pk>", SalesOrderRetrieveView.as_view()),
    path("changestatus", ChangeSalesOrderStatusView.as_view()),
    path("salesheaders",SalesHeadersView.as_view()),
    path("salesheaders/<int:order_id>",SalesHeadersView.as_view()),
    ##   SALES  -- More Actions
    path("makepayment",MakePaymentView.as_view()),
    #    PRICE LIST
    path("pricelist", PriceListViewSet.as_view({'get': 'list', 'post':'create'})),
    path("pricelist/<int:pk>/", PriceListViewSet.as_view({'get': 'retrieve', 'patch':'partial_update'})),
    path("pricelist/headers", PriceListHeaderViewSet.as_view({'get': 'list'})),
    path("pricelist/upload", PriceListMassCreateUpdate.as_view()),
]
