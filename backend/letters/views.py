from django.shortcuts import render
from rest_framework.views import APIView
from letters.models import LetterModel
from letters.serializers import LetterSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class LetterView(APIView):
    def get(self,request,format=None):
        letters=LetterModel.objects.all()
        letters_serialized=LetterSerializer(letters,many=True)
        return Response(letters_serialized.data,status=status.HTTP_200_OK)
    def post(self,request,format=None):
        serializer=LetterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class LetterViewDetail(APIView):
    def get(self,request,pk,format='json'):
        try:
            letter=LetterModel.objects.get(pk=pk)
            letter_serialized=LetterSerializer(letter)
            return Response(letter_serialized.data,status=status.HTTP_200_OK)
        except:
            return Response({"could":"not found data"},status=status.HTTP_404_NOT_FOUND)
    def put(self, request, pk, format='json'):
        try:
            letter = LetterModel.objects.get(pk=pk)
        except LetterModel.DoesNotExist:
            return Response({'error': 'Letter not found.'}, status=status.HTTP_404_NOT_FOUND)

        letter_serialized = LetterSerializer(letter, data=request.data)
        if letter_serialized.is_valid():
            letter_serialized.update(instance=letter, validated_data=request.data)
            return Response(letter_serialized.data, status=status.HTTP_200_OK)
        else:
            return Response(letter_serialized.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request,pk,format='json'):
        try:
            letter=LetterModel.objects.get(pk=pk).delete()
            return Response("deleted",status=status.HTTP_200_OK)
        except:
            return Response({"could":"not found data"},status=status.HTTP_404_NOT_FOUND)