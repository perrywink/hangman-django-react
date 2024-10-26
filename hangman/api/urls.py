from django.urls import path
from . import views

urlpatterns = [
    path("games/", views.GameList.as_view(), name="games-list"),
    path("game/new/", views.GameCreate.as_view(), name="game-create"),
    path("game/<int:pk>/", views.GameRetrieve.as_view(), name="game-retrieve"),
    path("game/<int:pk>/guess/", views.GameUpdate.as_view(), name="game-create"),
]
