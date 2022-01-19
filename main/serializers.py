from rest_framework import serializers
from .models import PresetText


class PresetTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = PresetText
        fields = (
            'name',
            'text'
        )
