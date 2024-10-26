from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer, GameIdSerializer, GameGuessSerializer

# TMP API
class GameList(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GameCreate(generics.CreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameIdSerializer

    def create(self, request, *args, **kwargs):
        game = Game.new_game()
        serializer = self.get_serializer(game)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class GameRetrieve(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = "pk"

class GameUpdate(generics.UpdateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = "pk"

    def update(self, request, *args, **kwargs):
        game = self.get_object()
        
        guess_serializer = GameGuessSerializer(data=request.data)
        guess_serializer.is_valid(raise_exception=True)
        
        game.make_guess(guess_serializer.validated_data['guess'])
        
        return Response(
            self.get_serializer(game).data,
            status=status.HTTP_200_OK
        )
