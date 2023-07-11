import csv
from django.http import HttpResponse
from payroll.models import PayrollModel
from rest_framework.views import APIView
class ChangeToCsv(APIView):
    def get(self,request,format='json'):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="payroll.csv"'

        writer = csv.writer(response)
        writer.writerow(['employee_name', 'basic_salary', 'working_days',
                                                            'overtime', 'bonus', 'house_allowance', 'transport_allowance_prediem',
                                                            'transport_allowance', 'telephone_allowance',
                                                            'gross_salary', 'taxable_income', 'tax_by_number','tax_by_percent' ,'pensions',
                                                            'cost_sharing', 'social', 'loan', 'penality',
                                                            'total_deduction', 'net_pay', 'bank_account'])


        payroll_data = PayrollModel.objects.all().values_list('employee_name', 'basic_salary', 'working_days',
                                                            'overtime', 'bonus', 'house_allowance', 'transport_allowance_prediem',
                                                            'transport_allowance', 'telephone_allowance',
                                                            'gross_salary', 'taxable_income', 'tax_by_number','tax_by_percent' ,'pensions',
                                                            'cost_sharing', 'social', 'loan', 'penality',
                                                            'total_deduction', 'net_pay', 'bank_account')

        for payroll in payroll_data:
            writer.writerow(payroll)

        return response
    

class ChangeToCsvOnlyBank(APIView):
    def get(self,request,format='json'):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="payroll.csv"'

        writer = csv.writer(response)
        writer.writerow(['Employee Name', 'Net Pay', 'Bank Account'])

        payroll_data = PayrollModel.objects.all().values_list('employee_name','net_pay', 'bank_account')

        for payroll in payroll_data:
            writer.writerow(payroll)

        return response
    