from rest_framework import serializers
from letters.models import LetterModel
class LetterSerializer(serializers.Serializer):
    letter_type=serializers.CharField(required=True)
    letter_head=serializers.CharField(required=True)
    to_whom_it_concern=serializers.CharField(required=True)
    employee_name=serializers.CharField(required=True)
    content=serializers.CharField(required=True)
    letter_writer=serializers.CharField(required=True)
    letter_writer_title=serializers.CharField(required=True)
    company_name=serializers.CharField(required=True)
    def create(self, validated_data):
        return LetterModel.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.letter_type = validated_data.get('letter_type', instance.letter_type)
        instance.letter_head = validated_data.get('letter_head', instance.letter_head)
        instance.to_whom_it_concern = validated_data.get('to_whom_it_concern', instance.to_whom_it_concern)
        instance.employee_name = validated_data.get('employee_name', instance.employee_name)
        instance.content = validated_data.get('content', instance.content)
        instance.letter_writer = validated_data.get('letter_writer', instance.letter_writer)
        instance.letter_writer_title = validated_data.get('letter_writer_title', instance.letter_writer_title)
        instance.company_name = validated_data.get('company_name', instance.company_name)
        instance.save()
        return instance
