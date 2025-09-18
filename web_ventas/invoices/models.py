from django.db import models
from datetime import date
from api.models import Customers, Products

invoice_type_choices = [
 'A',
 'B',
 'C'   
]

# Create your models here.
class InvoiceHeader(models.Model):
    customer = models.ForeignKey(Customers, on_delete=models.CASCADE)
    invoice_type = models.CharField(max_length=10, blank=True, null=True)
    invoice_date = models.DateField(auto_now_add=True)
    total_gross_amount = models.FloatField(default=0)
    total_tax_amount = models.FloatField(default=0)
    total_net_amount = models.FloatField(default=0)

    def calculate_totals(self):
        details = self.invoicedetail_set.all()
        self.total_gross_amount = sum(d.gross_amount for d in details)
        self.total_tax_amount = sum(d.tax_amount for d in details)
        self.total_net_amount = sum(d.net_amount for d in details)

class InvoiceDetail(models.Model):
    invoice_header = models.ForeignKey(InvoiceHeader, on_delete=models.CASCADE)
    line_number = models.PositiveIntegerField(editable=False)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    declared_unit_price = models.FloatField(default=0)
    quantity = models.IntegerField(default=1)
    quantity_in_package = models.IntegerField()
    gross_amount = models.FloatField(default=0)
    tax_amount = models.FloatField(default=0)
    net_amount = models.FloatField(default=0)

    def save(self, *args, **kwargs):
        if not self.line_number:
            last_line = (InvoiceDetail.objects.filter(invoice_header=self.invoice_header).order_by("-line_number").first())

            self.line_number = last_line.line_number+1 if last_line else 1 
        
        return super().save(*args, **kwargs)

    class Meta:
        unique_together = ('invoice_header', 'line_number')



class InvoiceProductRules(models.Model):
    product = models.OneToOneField(Products, on_delete=models.CASCADE, related_name='invoice_rules')
    total_uses = models.IntegerField(default=0)
    quantity_per_invoice = models.IntegerField(default=1)
    has_usage_limit = models.BooleanField(default=False)
    invoice_usage_limit = models.IntegerField(default=0)