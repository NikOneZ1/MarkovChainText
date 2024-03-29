from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .utils import generate_text
from .serializers import PresetTextSerializer
from .models import PresetText
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


def index(request):
    return render(request, "build/index.html")


@method_decorator(csrf_exempt, name='dispatch')
class MarkovChainText(APIView):
    def post(self, request):
        text = request.data['text']
        words_number = request.data['words_number']
        generated_text = generate_text(text, words_number)

        return Response({'generated_text': generated_text}, status=status.HTTP_200_OK)


class PresetTextsListView(generics.ListAPIView):
    serializer_class = PresetTextSerializer
    queryset = PresetText.objects.all()
