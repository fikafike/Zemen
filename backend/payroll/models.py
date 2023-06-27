from django.db import models

# Create your models here.
class PayrollModel(models.Model):
    employee_name=models.CharField(max_length=400)
    basic_salary=models.FloatField()
    working_days=models.FloatField()
    overtime=models.FloatField()
    bonus=models.FloatField()
    house_allow=models.FloatField()
    predtime=models.FloatField()
    transport_allowance=models.FloatField()
    telephone_allowance=models.FloatField()
    gross_salary=models.FloatField()
    taxable_income=models.FloatField()
    tax_by_percent=models.FloatField()
    tax_by_number=models.FloatField()
    pensions=models.FloatField()
    cost_sharing=models.FloatField()
    social=models.FloatField()
    loan=models.FloatField()
    penality=models.FloatField()
    total_deduction=models.FloatField()
    net_pay=models.FloatField()
    bank_account=models.FloatField()

