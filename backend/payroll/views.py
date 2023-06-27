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
    def put(self,request,pk,format='json'):
        if request.data.get("total_deduction") is None:
            return Response({"total_deduction":"is required"},status=status.HTTP_400_BAD_REQUEST)
        if request.data.get("net_pay") is None:
            return Response({"net_pay":"is required"},status=status.HTTP_400_BAD_REQUEST)
        payroll_update= PayrollModel.objects.filter(pk=pk)
        payroll_update.update(
                    employee_name=request.data.get("employee_name"),
                    basic_salary=request.data.get("basic_salary"),
                    working_days=request.data.get("working_days"),
                    overtime=request.data.get("overtime"),
                    bonus=request.data.get("bonus"),
                    house_allow=request.data.get("house_allow"),
                    predtime=request.data.get("predtime"),
                    transport_allowance=request.data.get("transport_allowance"),
                    telephone_allowance=request.data.get("telephone_allowance"),
                    gross_salary=request.data.get("gross_salary"),
                    taxable_income=request.data.get("taxable_income"),
                    tax_by_percent=request.data.get("tax_by_percent"),
                    tax_by_number=request.data.get("tax_by_number"),
                    pensions=request.data.get("pensions"),
                    cost_sharing=request.data.get("cost_sharing"),
                    social=request.data.get("social"),
                    loan=request.data.get("loan"),
                    penality=request.data.get("penality"),
                    total_deduction=request.data.get("total_deduction"),
                    net_pay=request.data.get("net_pay"),
                )
        updated_data=PayrollSerializer(payroll_update,many=True)
        return Response(updated_data.data[0],status=status.HTTP_205_RESET_CONTENT)
    def delete(self,request,pk,data=None):
        try:
            payroll= PayrollModel.objects.get(pk=pk).delete()
            return Response({"status":"delted"},status=status.HTTP_202_ACCEPTED)
        except:
            return Response({"status":"could not delete the data"},status=status.HTTP_400_BAD_REQUEST)

        
       

class CalculatePayrollView(APIView):
    

    def post(self,request,pk,format=None):
        try:
            payroll= PayrollModel.objects.get(pk=pk)
            serializer=PayrollSerializer(payroll)
        except :
            return Response({"status":"could not found payroll"},status=status.HTTP_404_NOT_FOUND)
        payroll_raw=PayrollModel.objects.get(pk=pk)
        payroll_serialized=PayrollSerializer(payroll_raw)
       
        basic_salary=payroll_serialized.data["basic_salary"]
        overtime=payroll_serialized.data["overtime"]
        bonus=payroll_serialized.data["bonus"]
        house_allow=payroll_serialized.data["house_allow"]
        transport_allowance=payroll_serialized.data["transport_allowance"]
        telephone_allowance=payroll_serialized.data["telephone_allowance"]
        gross_salary=payroll_serialized.data["gross_salary"]
        taxable_income=payroll_serialized.data["taxable_income"]
        tax_by_percent=payroll_serialized.data["tax_by_percent"]
        tax_by_number=payroll_serialized.data["tax_by_number"]
        pensions=payroll_serialized.data["pensions"]
        cost_sharing=payroll_serialized.data["cost_sharing"]
        social=payroll_serialized.data["social"]
        loan=payroll_serialized.data["loan"]
        penality=payroll_serialized.data["penality"]
        total_deduction=payroll_serialized.data["total_deduction"]
        pred_time=payroll_serialized.data["predtime"]
        
        


        net_pay=payroll_serialized.data["net_pay"]
        
        taxable_income=basic_salary+overtime+bonus+house_allow+pred_time+transport_allowance+telephone_allowance
        gross_salary=int(bonus)+int( house_allow)+int(transport_allowance)+int(telephone_allowance)+int(basic_salary)
        tax_by_percent=0
        tax_minus=0
        if(basic_salary>=601 and basic_salary<=1650):
            tax_by_percent=10/100
            tax_minus=60
        if(basic_salary>=1651 and basic_salary<=3200):
            tax_by_percent=15/100
            tax_minus=142.5
        if(basic_salary>=3201 and basic_salary<=5250):
            tax_by_percent=20/100
            tax_minus=302.50

        if(basic_salary>=5251 and basic_salary<=7800):
            tax_by_percent=25/100
            tax_minus=565
        if(basic_salary>=7801 and basic_salary<=10900):
            tax_by_percent=30/100
            tax_minus=955
        if(basic_salary>=10901 ):
            tax_by_percent=35/100
            tax_minus=1500
        pensions=0.07*basic_salary
        pensions=round(pensions,2)
        tax_by_number=taxable_income*tax_by_percent
        total_deduction=pensions+cost_sharing+social+loan+penality-tax_minus
        total_deduction=round(total_deduction,5)


        net_pay=gross_salary-total_deduction
        # return Response(net_pay)
        try:
            payroll=PayrollModel.objects.filter(pk=pk)
            payroll.update(
                    basic_salary=basic_salary,
                    overtime=overtime,
                    bonus=bonus,
                    house_allow=house_allow,
                    transport_allowance=transport_allowance,
                    telephone_allowance=telephone_allowance,
                    gross_salary=gross_salary,
                    taxable_income=taxable_income,
                    tax_by_percent=tax_by_percent,
                    tax_by_number=tax_by_number,
                    pensions=pensions,
                    cost_sharing=cost_sharing,
                    social=social,
                    loan=loan,
                    penality=penality,
                    total_deduction=total_deduction,
                    net_pay=net_pay,
            )
            payroll_serialized=PayrollSerializer(payroll,many=True)
            return Response(payroll_serialized.data[0])
        except:
            return Response({"error"})

        
        



class CreatePayrollView(APIView):
    def post(self,request,format='json'):
        serializers=PayrollSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data,status=status.HTTP_201_CREATED)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)
