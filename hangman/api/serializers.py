from rest_framework import serializers
from .models import Game

class GameIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["id"]

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["id", "word_state", "status",
                  "incorrect_guesses_made", "incorrect_guesses_left"]
