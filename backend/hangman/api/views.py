from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Game
from .serializers import GameSerializer, GameIdSerializer, GameGuessSerializer
from drf_spectacular.utils import extend_schema

class GameList(generics.ListAPIView):
    queryset = Game.objects.all().order_by('-id')[:10]
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

# Using APIView for better customizability
class GameGuess(APIView):
    # to allow for the schema generation to pick up on the correct types
    @extend_schema(request=GameGuessSerializer, responses={200: GameSerializer})
    def put(self, request, pk):
        game = get_object_or_404(Game, pk=pk)
        guess_serializer = GameGuessSerializer(data=request.data)
        guess_serializer.is_valid(raise_exception=True)
        
        game.make_guess(guess_serializer.validated_data['guess'])
        return Response(GameSerializer(game).data)

