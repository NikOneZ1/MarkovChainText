from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("api/generate_text/", views.MarkovChainText.as_view(), name='markov_chain_text'),
    path("api/preset_texts/", views.PresetTextsListView.as_view(), name='preset_texts'),
]
