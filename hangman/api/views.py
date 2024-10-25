from django.shortcuts import render
from rest_framework import generics, response, status
from .models import Game
from .serializers import GameSerializer

# TMP API
class GameList(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GameCreate(generics.CreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request):
        game = Game.new_game()
        serializer = self.get_serializer(game)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)

class GameRetrieve(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = "pk"
