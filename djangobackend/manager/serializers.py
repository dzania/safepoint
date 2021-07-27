from rest_framework import serializers
from .models import Credentials

class CredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credentials
        fields = '__all__' 

    def create(self, validated_data):
        return Credentials.objects.create(**validated_data)

