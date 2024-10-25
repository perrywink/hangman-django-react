from django.urls import path
from . import views

urlpatterns = [
  path("games/", views.GameList.as_view(), name="games-list"),
  path("game/<int:pk>/", views.GameRetrieve.as_view(), name="game-retrieve"),
  path("game/new/", views.GameCreate.as_view(), name="game-create"),
]