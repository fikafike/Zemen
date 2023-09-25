from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from payroll.models import PayrollModel
from payroll.serializers import PayrollSerializer
from rest_framework import status
from django.http import Http404


# Create your views here.

class Payrolls(APIView):
    def get(self,request,format='json'):
        payrolls_raw=PayrollModel.objects.all()
        payrolls_serialized=PayrollSerializer(payrolls_raw,many=True)
        payrolls=payrolls_serialized.data
        return Response(payrolls)
class Payroll(APIView):
   
    def get(self,request,pk,format='json'):
        try:
            payroll= PayrollModel.objects.get(pk=pk)
            serializer=PayrollSerializer(payroll)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except :
            return Response({"status":"could not found payroll"},status=status.HTTP_404_NOT_FOUND)
    def get_object(self, pk):
        try:
            return PayrollModel.objects.get(pk=pk)
        except PayrollModel.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        payroll = self.get_object(pk)
        required_fields = ['employee_name', 'age', 'basic_salary', 'working_days', 'overtime', 'bonus', 'house_allowance', 'prediem', 'transport_allowance', 'transport_allowance_prediem', 'telephone_allowance','social','loan','penality','bank_account']
        missing_fields = []

        for field in required_fields:
            if field not in request.data:
                missing_fields.append(field)

        if missing_fields:
            # Some required fields are missing in request.data, return a response indicating which fields are missing
            message = "Please provide the following required fields: {}".format(', '.join(missing_fields))
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new dictionary that includes only the required fields from request.data
        data = {field: request.data[field] for field in required_fields}
        payroll.employee_name = data['employee_name']
        
        payroll.age = data['age']

        payroll.basic_salary = data['basic_salary']
        payroll.working_days = data['working_days']
        payroll.overtime = data['overtime']
        payroll.bonus = data['bonus']
        payroll.house_allowance = data['house_allowance']
        payroll.prediem = data['prediem']
        payroll.transport_allowance = data['transport_allowance']
        payroll.transport_allowance_prediem = data['transport_allowance_prediem']
        payroll.telephone_allowance = data['telephone_allowance']
        payroll.social=data["social"]
        payroll.penality=data['penality']
        payroll.loan=data['loan']
        payroll.bank_account=data['bank_account']
        
        # Save the updated payroll instance
        payroll.save()

        updated_payroll=self.get_object(pk)

        updated_payroll.gross_salary=  updated_payroll.bonus+  updated_payroll.house_allowance+  updated_payroll.overtime+  updated_payroll.basic_salary+  updated_payroll.transport_allowance_prediem+  updated_payroll.transport_allowance+  updated_payroll.prediem+  updated_payroll.telephone_allowance
        updated_payroll.total_deduction=  updated_payroll.tax_by_number+  updated_payroll.pensions+  updated_payroll.social+  updated_payroll.loan+  updated_payroll.penality+  updated_payroll.cost_sharing
        updated_payroll.total_deduction=round(  updated_payroll.total_deduction,2)
        updated_payroll.net_pay=  updated_payroll.gross_salary-  updated_payroll.total_deduction
        updated_payroll.save()

        serializer = PayrollSerializer(updated_payroll)
        return Response(serializer.data)



        

# All required fields exist in request.data, continue with the regular flow of the code

    def delete(self,request,pk,data=None):
        try:
            payroll= PayrollModel.objects.get(pk=pk).delete()
            return Response({"status":"delted"},status=status.HTTP_202_ACCEPTED)
        except:
            return Response({"status":"could not delete the data"},status=status.HTTP_400_BAD_REQUEST)




class CreatePayrollView(APIView):
    def post(self,request,format='json'):
        serializers=PayrollSerializer(data=request.data)
        if serializers.is_valid():
            calculated_payroll=calcluatevalues(data=serializers.data)
            if(calculated_payroll.status_code==400):
                return calculated_payroll
            serializer_calculated=PayrollSerializer(data=calculated_payroll.data)
            if serializer_calculated.is_valid():
                serializer_calculated.save()
                return Response(serializer_calculated.data,status=status.HTTP_201_CREATED)
            return Response(serializer_calculated.errors,status.HTTP_400_BAD_REQUEST)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)


def calcluatevalues(data):
    # SET CALCULATED VALUES TO 0 to avoid errors
    data["taxable_income"]=0
    data["tax_by_number"]=0
    data["tax_by_percent"]=0
    data["gross_salary"]=0
    data["pensions"]=0
    data["total_deduction"]=0
    data["cost_sharing"]=0
    data["total_deduction"]=0
    data["net_pay"]=0
    

    # Age related
    if data["age"] < 18:
        return Response({"message": "Employee age could not be less than 18"}, status=400)

    if data["age"] < 60:
        data["pensions"] = round(data["basic_salary"] * 0.07,2)

    


    if data["transport_allowance"] > 600:
        data["taxable_income"] += data["transport_allowance"]
        transport_allowance_taxed=data["transport_allowance"]-600

        data["taxable_income"] = round(transport_allowance_taxed, 2)
    
    # Transport allowance predime

    if(data["transport_allowance_prediem"]>=2200):
        return Response({"message":"Employees could not get transport allowance prediem above 2220"},status=400)
    
    
    # Tranport allowance predime value can not be more than 25 percent of the salary of the user
    transport_allowance_predime_roof = data["basic_salary"] * 0.25

    if data["transport_allowance"] > transport_allowance_predime_roof:
        return Response({"message": "Transport allowance could not be greater than 25 percent of the salary"}, status=400)
    
    data["taxable_income"]+=data["bonus"]+data["house_allowance"]+data["overtime"]+data["basic_salary"]

    if(data["taxable_income"]>=601 and data["taxable_income"]<=1650):
        data["tax_by_percent"]=0.1
        data["tax_by_number"]=(data["taxable_income"]*0.1)-60
    if(data["taxable_income"]>=1651 and data["taxable_income"]<=3200):
        data["tax_by_percent"]=0.15
        data["tax_by_number"]=(data["taxable_income"]*0.15)-142.5
    if(data["taxable_income"]>=3201 and data["taxable_income"]<=5250):
        data["tax_by_percent"]=0.2
        data["tax_by_number"]=(data["taxable_income"]*0.2)-302.5
    if(data["taxable_income"]>=5251 and data["taxable_income"]<=7800):
        data["tax_by_percent"]=0.25
        data["tax_by_number"]=(data["taxable_income"]*0.25)-565
    if(data["taxable_income"]>=7801 and data["taxable_income"]<=10900):
        data["tax_by_percent"]=0.3
        data["tax_by_number"]=(data["taxable_income"]*0.3)-955
    if(data["taxable_income"]>=10901 ):
        data["tax_by_percent"]=0.35
        data["tax_by_number"]=(data["taxable_income"]*0.35)-1500
    data["gross_salary"]=data["bonus"]+data["house_allowance"]+data["overtime"]+data["basic_salary"]+data["transport_allowance_prediem"]+data["transport_allowance"]+data["prediem"]+data["telephone_allowance"]
    data["total_deduction"]=data["tax_by_number"]+data["pensions"]+data["social"]+data["loan"]+data["penality"]+data["cost_sharing"]
    data["total_deduction"]= round(data["total_deduction"],2)
    data["net_pay"]=data["gross_salary"]-data["total_deduction"]


    
    return Response(data)



   

    