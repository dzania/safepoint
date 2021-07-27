from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer, MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.views import TokenObtainPairView



#Custom token to get id
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
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



