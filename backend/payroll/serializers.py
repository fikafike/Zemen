from payroll.models import PayrollModel
from rest_framework import serializers
class PayrollSerializer(serializers.Serializer):
    id = serializers.FloatField(read_only=True)
    # Basic Information about users
    employee_name = serializers.CharField(max_length=400)
    age = serializers.IntegerField(required=True)
    working_days = serializers.FloatField(required=True)

    # Salary
    basic_salary = serializers.FloatField(required=True)

    # Taxable allowance
    overtime = serializers.FloatField(required=True)
    bonus = serializers.FloatField(required=True)
    house_allowance = serializers.FloatField(required=True)

    # Limited non taxable allowance
    prediem = serializers.FloatField(required=True)
    transport_allowance = serializers.FloatField(required=True)
    transport_allowance_prediem = serializers.FloatField(required=True)

    # Non taxable income
    telephone_allowance = serializers.FloatField(required=True)

    # Gross
    gross_salary = serializers.FloatField(required=True)

    # Calculated
    taxable_income = serializers.FloatField()
    tax_by_percent = serializers.FloatField()
    tax_by_number = serializers.FloatField()
    pensions = serializers.FloatField()

    cost_sharing = serializers.FloatField(required=True)

    # Other deduction
    social = serializers.FloatField(required=True)
    loan = serializers.FloatField(required=True)
    penality = serializers.FloatField(required=True)

    # Last results
    total_deduction = serializers.FloatField()
    net_pay = serializers.FloatField()

    # Bank account
    bank_account = serializers.FloatField(required=True)

    def create(self, validated_data):
        return PayrollModel.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for field in validated_data:
            setattr(instance, field, validated_data[field])
        instance.save()
        return instance