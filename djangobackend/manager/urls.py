from django.urls import path
from . import views

app_name = 'manager'

urlpatterns = [
    path("add-credentials/", views.add_credentials,name="add_credentials")
]
