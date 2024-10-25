from django.shortcuts import render
from rest_framework import generics, response, status
from rest_framework.exceptions import ValidationError
from .models import Game
from .serializers import GameSerializer

# TMP API
class GameList(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GameCreate(generics.CreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        game = Game.new_game()
        serializer = self.get_serializer(game)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)

class GameRetrieve(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = "pk"

class GameUpdate(generics.UpdateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = "pk"

    def update(self, request, *args, **kwargs):
        # receive guess
        guess = request.data.get('guess')
        if not guess:
            raise ValidationError({"guess": "This field is required."})

        # Optional: Further validation of the guess value
        if not isinstance(guess, str):
            raise ValidationError({"guess": "This field must be a string."})

        # You might want to limit the length of the guess or check for specific characters
        if len(guess) != 1:  # Example: Guess should be a single character
            raise ValidationError({"guess": "This field must be a single character."})

        game = self.get_object()
        game.make_guess(guess)
        
        serializer = self.get_serializer(game)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
