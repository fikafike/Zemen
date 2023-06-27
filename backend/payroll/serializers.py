from rest_framework import serializers
from payroll.models import PayrollModel
class PayrollSerializer(serializers.Serializer):
    id=serializers.FloatField(read_only=True)
    employee_name= serializers.CharField(required=True)
    basic_salary=serializers.FloatField(required=True)
    working_days=serializers.FloatField(required=True)
    overtime=serializers.FloatField(required=True)
    bonus=serializers.FloatField(required=True)
    house_allow=serializers.FloatField(required=True)
    predtime=serializers.FloatField(required=True)
    transport_allowance=serializers.FloatField(required=True)
    telephone_allowance=serializers.FloatField(required=True)
    gross_salary=serializers.FloatField(required=True)
    taxable_income=serializers.FloatField()
    tax_by_number=serializers.FloatField(required=True)
    tax_by_percent=serializers.FloatField(required=True)
    pensions=serializers.FloatField(required=True)
    cost_sharing=serializers.FloatField(required=True)
    social=serializers.FloatField(required=True)
    social=serializers.FloatField(required=True)
    loan=serializers.FloatField(required=True)
    penality=serializers.FloatField(required=True)
    bank_account=serializers.FloatField(required=True)
    total_deduction=serializers.FloatField()
    net_pay=serializers.FloatField()

    
    def create(self, validated_data):
        return PayrollModel.objects.create(**validated_data)
    def update(self, instance, validated_data):
        fields_to_update = [
            'employee_name', 'basic_salary', 'working_days', 'overtime', 'bonus',
            'house_allow', 'predtime', 'transport_allowance', 'telephone_allowance',
            'gross_salary', 'taxable_income','taxed' ,'tax', 'pensions', 'cost_sharing',
            'social', 'loan', 'penality', 'total_deduction', 'net_pay', ' bank_account'
        ]
        for field in fields_to_update:
            setattr(instance, field, validated_data.get(field, getattr(instance, field)))
        return PayrollModel.objects.update(instance, validated_data)
