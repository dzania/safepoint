from django.urls import path
from . import views

app_name = 'manager'

urlpatterns = [
    path("credentials/", views.credentials,name="credentials"),
    path("credential/<str:id>",views.credential,name="detail_credentials"),
]
