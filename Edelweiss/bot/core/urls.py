from django.contrib import admin
from django.urls import path
from core.views import front,options_chain

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", options_chain, name="front"),
    
]
