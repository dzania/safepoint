from django.shortcuts import render
from rest_framework.decorators import APIView, api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import Serializer
from .models import Credentials
from .serializers import CredentialsSerializer
from rest_framework.permissions import IsAuthenticated
from .encryption import decrypt_password
from django.core.signing import Signer


# Add new credentials to password manager
# Get all credentials of user and decrypt password
@permission_classes((IsAuthenticated,))
@api_view(['POST','GET'])
def credentials(request):
    if request.method == "POST":
        serializer = CredentialsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "GET":
        signer = Signer()
        credentials = Credentials.objects.filter(user_id=request.user.id)
        serializer = CredentialsSerializer(credentials, many=True)
        
        #Decrypt all paswords
        for data in serializer.data:
            data['password'] = signer.unsign_object(data['password'])
        return Response(serializer.data)

    

#Get Delete or Update credential by given id 
@api_view(['GET','PUT','DELETE'])
@permission_classes((IsAuthenticated,))
def credential(request,id):
    signer = Signer()
    try:
        credential = Credentials.objects.get(id=id)
        serializer = CredentialsSerializer(credential,many=False)
    except Credentials.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer.data['password'] = signer.unsign_object(serializer.data['password'])
        return Response(serializer.data)

    elif request.method == 'DELETE':
        credential.delete()
        return Response(status=status.HTTP_200_OK)

    elif request.method = 'PUT':
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)    
        return Response(status=status.HTTP_400_BAD_REQUEST)

