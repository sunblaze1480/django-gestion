from decimal import Decimal
from django.db import transaction
from .models import InvoiceHeader, InvoiceDetail, InvoiceProductRules
from api.models import Customers


class InvoiceService:
    @staticmethod
    @transaction.atomic
    def create_invoice(data):
        details = data.pop('details',[])
        invoice_header = InvoiceHeader.objects.create(**data)
        for d in details:
            InvoiceDetail.objects.create(invoice_header = invoice_header, **d)

        invoice_header.calculate_totals()
        invoice_header.save()

        return invoice_header

    @staticmethod
    @transaction.atomic
    def update_invoice(instance, data):
        details = data.pop("invoice_detail", [])
        for attr, value in data.items():
            setattr(instance, attr, value)
        instance.save()

        # Could replace details or update existing ones depending on your logic
        instance.invoice_detail.all().delete()
        for d in details:
            InvoiceDetail.objects.create(invoice_header=instance, **d)

        instance.recalculate_totals()
        instance.save()
        return instance

    @staticmethod
    def automatic_invoice_proposal(target, customer):
        proposed_invoice = None
        
        #TODO: Create a product/taxes table
        TAX_RATE = Decimal(0.21)
        accumulated_amount = 0
        total_gross = 0
        total_tax = 0
        total_net = 0

        available_products = InvoiceProductRules.objects.select_related('product').order_by('total_uses','-product__unit_price')
        result_invoice_details = []

        for p in available_products:
            amount = (p.product.unit_price*p.product.units_quantity) * p.quantity_per_invoice
            if accumulated_amount + amount < target:
                accumulated_amount+= amount
                tax = amount*TAX_RATE
                #totals for header
                total_gross += amount
                total_tax += tax
                total_net += (amount+tax)
                result_invoice_details.append({'product': p.product, 'quantity': p.quantity_per_invoice, 'quantity_in_package': p.product.units_quantity, 'declared_unit_price':p.product.unit_price, 'gross_amount':amount, 'tax_amount': tax, 'net_amount':amount+tax } )
                
                #actualizo total uses
                p.total_uses = F('total_uses') + 1
                p.save(update_fields=['total_uses'])  
                p.refresh_from_db(fields=['total_uses'])
                
            
            if accumulated_amount >= target:
                break
        
        if len(result_invoice_details)> 0:
            proposed_invoice = {
                'invoice_type': 'A',
                'customer' : Customers.objects.get(pk=customer),
                'invoice_date': "",
                'details': result_invoice_details,
                'total_gross_amount': total_gross,
                'total_tax_amount': total_tax,
                'total_net_amount': total_net
            }
        return proposed_invoice