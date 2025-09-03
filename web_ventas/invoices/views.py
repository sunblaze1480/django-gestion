from django.shortcuts import render
from decimal import Decimal
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response


from .models import InvoiceHeader, InvoiceProductRules
from api.models import Customers
from .serializers import CreateInvoiceSerializer, ListInvoiceHeaderSerializer, RetrieveInvoiceSerializer, AutomaticGeneratorInvoiceSerializer
from .services import InvoiceService


# Create your views here.
class InvoiceViewSet(ModelViewSet):
    queryset = InvoiceHeader.objects.all().select_related("customer").prefetch_related("invoicedetail_set")
    serializer_class= CreateInvoiceSerializer

    def get_serializer_class(self):
        if self.action == "list":      
            return ListInvoiceHeaderSerializer
        elif self.action == "retrieve":
            return RetrieveInvoiceSerializer
        elif self.action == "create":
            return CreateInvoiceSerializer
        return CreateInvoiceSerializer
    
@api_view(['POST'])
def automatic_invoice_generator(request):

    customer = request.data.get('customer')
    target= request.data.get('target_amount')

    if not customer or not target: 
        return Response("Missing key fields in payload", status=status.HTTP_400_BAD_REQUEST)
    try:
        target = float(target)
    except Exception:
        return Response("target_amount must be a number", status=status.HTTP_400_BAD_REQUEST)

    proposed_invoice = InvoiceService.automatic_invoice_proposal(target, customer)

    if proposed_invoice:
        serializer = AutomaticGeneratorInvoiceSerializer(proposed_invoice)
        return Response(serializer.data)
    else:
        return Response("No se encontraron productos disponibles para facturar", status=status.HTTP_204_NO_CONTENT)
