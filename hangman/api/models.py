from django.db import models
import math
import random

# Create your models here.
class Game(models.Model):
    WORD_CHOICES = ["Hangman", "Python", "Audacix", "Bottle", "Pen"]

    class GameStatus(models.TextChoices):
        # DB Value, Display value
        IN_PROGRESS = 'InProgress', 'In Progress'
        LOSS = 'Loss', 'Loss'
        WON = 'Won', 'Won'

    status = models.CharField(
        max_length=10,
        choices=GameStatus.choices,
        default=GameStatus.IN_PROGRESS
    )
    word = models.CharField(max_length=100)
    word_state = models.CharField(max_length=100)
    incorrect_guesses_made = models.IntegerField(default=0)
    incorrect_guesses_left = models.IntegerField(default=0)
    
    @classmethod
    def new_game(cls):
        """Initialize a new game with a word"""
        game = cls()
        game.word = cls.get_random_word()
        game.word_state = '_' * len(game.word)
        game.incorrect_guesses_made = 0
        game.incorrect_guesses_left = math.ceil(len(game.word) / 2)
        game.status = game.GameStatus.IN_PROGRESS
        game.save()

    @classmethod
    def get_random_word(cls):
        return random.choice(cls.WORD_CHOICES)

    def __str__(self):
        """Return a detailed string representation for debugging"""
        return (
            f"\nHangman Game Status:\n"
            f"----------------\n"
            f"Word to guess: {self.word}\n"
            f"Current state: {self.word_state}\n"
            f"Game status: {self.status}\n"
            f"Incorrect guesses: {self.incorrect_guesses_made}/{self.max_incorrect_guesses}\n"
            f"Remaining guesses: {self.incorrect_guesses_left}\n"
            f"----------------\n"
        )
