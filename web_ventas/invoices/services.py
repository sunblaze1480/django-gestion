from decimal import Decimal
from django.db import transaction
from .models import InvoiceHeader, InvoiceDetail, InvoiceProductRules
from api.models import Customers, Products
from django.db.models import F


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
    def automatic_invoice_from_stock(target, customer):
        """
        This method will use products' main STOCK availability to make an invoice to get to a certain target amount.

        """
        proposed_invoice = None


        TAX_RATE = Decimal(0.21)
        accumulated_amount = 0
        total_gross = 0
        total_tax = 0
        total_net = 0

        available_products = Products.objects.filter(category='AFIP', stock_quantity__gt=0).select_related('invoice_rules').order_by('-unit_price')
        result_invoice_details = []

        for p in available_products:
            #default 1 if invoice rule doesnt exist, and dont use a number greater than the stock available
            if hasattr(p, "invoice_rules"):
                invoice_units_limit = p.invoice_rules.quantity_per_invoice
            else:
                invoice_units_limit = 1
            units = min(invoice_units_limit, p.stock_quantity)
            amount = (p.unit_price*p.units_quantity) * units
            if accumulated_amount + amount < target:
                accumulated_amount+= amount
                tax = amount*TAX_RATE

                #update invoice rules
                if hasattr(p, "invoice_rules"):
                    p.invoice_rules.total_uses = F('total_uses') + 1
                    p.invoice_rules.save(update_fields=['total_uses'])
                    p.invoice_rules.refresh_from_db(fields=['total_uses'])
                else:
                    InvoiceProductRules.objects.create(product=p, total_uses=1, quantity_per_invoice=1)

                #totals for header
                total_gross += amount
                total_tax += tax
                total_net += (amount+tax)
                result_invoice_details.append({'product': p, 'quantity': units, 'quantity_in_package': p.units_quantity, 'declared_unit_price':p.unit_price, 'gross_amount':amount, 'tax_amount': tax, 'net_amount':amount+tax } )
                
                #actualizo total uses
                p.stock_quantity = F('stock_quantity') - units
                p.save(update_fields=['stock_quantity'])
                p.refresh_from_db(fields=['stock_quantity'])
                
            
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
        


    @staticmethod
    def automatic_invoice_proposal(target, customer):
        """
        This method will use only the rules table to make an invoice
        
        """
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