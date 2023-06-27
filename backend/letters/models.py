from django.db import models
from rest_framework.response import Response

# Create your models here.

class LetterModel(models.Model):
    letter_type=models.CharField(max_length=100)
    letter_head=models.CharField(max_length=100000)
    to_whom_it_concern=models.CharField(max_length=100000)
    employee_name=models.CharField(max_length=100000)
    content=models.CharField(max_length=100000)
    letter_writer=models.CharField(max_length=100000)
    letter_writer_title=models.CharField(max_length=100000)
    company_name=models.CharField(max_length=100000)
