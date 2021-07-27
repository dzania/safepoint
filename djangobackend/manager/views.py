from django.shortcuts import render
from rest_framework.decorators import APIView, api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import Serializer
from .models import Credentials
from .serializers import CredentialsSerializer
from rest_framework.permissions import IsAuthenticated

# Add new credentials to password manager
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_credentials(request):
    serializer = CredentialsSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)
    

# Delete credentials by given id    
@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def remove_credentials(request,id):
    try:
        credentials = Credentials.objects.get(id=id)
    except Credentials.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    credentials.delete()
    return Response(status=status.HTTP_200_OK)



