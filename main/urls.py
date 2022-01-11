from django.urls import path
from . import views

urlpatterns = [
    path('', views.MarkovChainText.as_view(), name='markov_chain_text'),
]
