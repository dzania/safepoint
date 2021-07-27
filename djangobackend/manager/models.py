from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Credentials(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False,blank=False)
    website = models.TextField(max_length=50,blank=False,null=False)
    login = models.CharField(max_length=50,blank=False,null=False)
    password = models.TextField(blank=False,null=False)
