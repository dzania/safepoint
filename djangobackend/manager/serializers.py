from rest_framework import serializers
from .models import Credentials
from django.core.signing import Signer

class CredentialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credentials
        fields = '__all__' 

    def create(self, validated_data):
        signer = Signer()

        credentials = Credentials.objects.create(
            user = validated_data['user'],
            website = validated_data['website'],
            login = validated_data['login'],
            password = signer.sign_object(validated_data['password']),
        )
        credentials.save()
        return credentials
