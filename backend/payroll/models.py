from django.db import models

# Create your models here.
class PayrollModel(models.Model):
    # Basic Information about users
    employee_name=models.CharField(max_length=400)
    age=models.IntegerField()
    working_days=models.FloatField()


    # Salary
    basic_salary=models.FloatField()

    # Taxable allowance
    overtime=models.FloatField()
    bonus=models.FloatField()
    house_allowance=models.FloatField()

    # Limited non taxable allowance 
    prediem=models.FloatField()
    transport_allowance=models.FloatField()
    transport_allowance_prediem=models.FloatField()

    # Non taxable income
    telephone_allowance=models.FloatField()

    # Gross
    gross_salary=models.FloatField()

    # Calculated
    taxable_income=models.FloatField()
    tax_by_percent=models.FloatField()
    tax_by_number=models.FloatField()
    pensions=models.FloatField()

    cost_sharing=models.FloatField()

    # Other deduction
    social=models.FloatField()
    loan=models.FloatField()
    penality=models.FloatField()

    # Last results
    total_deduction=models.FloatField()
    net_pay=models.FloatField()

    # Bank account
    bank_account=models.FloatField()

