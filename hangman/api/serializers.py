from rest_framework import serializers
from rest_framework.validators import ValidationError
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
        

class GameGuessSerializer(serializers.Serializer):
    guess = serializers.CharField(
        min_length=1,
        max_length=1,
        required=True,
        help_text="A single character guess"
    )

    def validate_guess(self, value):
        if not value.isalpha():
            raise ValidationError("Guess must be a letter.")
        return value.lower()
