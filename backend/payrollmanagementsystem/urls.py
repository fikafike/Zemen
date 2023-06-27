"""
URL configuration for payrollmanagementsystem project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from payroll.views import Payroll as PayrollView,Payrolls as PayrollViews,CreatePayrollView,CalculatePayrollView
from payroll.operations import ChangeToCsv,ChangeToCsvOnlyBank
from letters.views import LetterView,LetterViewDetail

urlpatterns = [
    # path('admin/', admin.site.urls),
    path("api/payroll/",CreatePayrollView.as_view(),name="payroll"),
    path("api/payroll/<int:pk>/",PayrollView.as_view(),name="payroll"),
    path("api/payrolls/",PayrollViews.as_view(),name="payrolls"),
    path("api/payroll/calculate/<int:pk>/",CalculatePayrollView.as_view(),name="calculate"),
    path("api/csv/",ChangeToCsv.as_view()),
    path("api/csv/bank/",ChangeToCsvOnlyBank.as_view()),
    path("api/letter/",LetterView.as_view()),
    path("api/letter/<int:pk>/",LetterViewDetail.as_view()),
    
]
