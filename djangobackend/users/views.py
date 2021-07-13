from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer
from rest_framework.permissions import AllowAny
# Create your views here.

class CreateUser(APIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        register = RegisterUserSerializer(data=request.data)
        if register.is_valid():
            new_user = register.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(register.errors,status=status.HTTP_400_BAD_REQUEST)


