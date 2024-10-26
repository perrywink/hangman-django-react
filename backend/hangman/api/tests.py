from django.test import TestCase
from .models import Game
import math

class GameModelTests(TestCase):
    def test_new_game(self):
        """Test that a new game is initialized with correct values"""
        game = Game.new_game()
        
        # Check initial values
        self.assertEqual(len(game.word), len(game.word_state))
        self.assertEqual(game.word_state, '_' * len(game.word))
        self.assertEqual(game.incorrect_guesses_made, 0)
        self.assertEqual(game.incorrect_guesses_left, math.ceil(len(game.word) / 2))
        self.assertEqual(game.status, Game.GameStatus.IN_PROGRESS)
        
        # Check if word is from choices
        self.assertIn(game.word, Game.WORD_CHOICES)

    def test_correct_guess(self):
        """Test making a correct guess"""
        game = Game.new_game()
        initial_state = game.word_state
        correct_letter = game.word[0]
        
        game.make_guess(correct_letter)
        
        # Check that word_state was updated
        self.assertNotEqual(game.word_state, initial_state)
        self.assertIn(correct_letter, game.word_state)
        self.assertEqual(game.incorrect_guesses_made, 0)
        self.assertEqual(game.incorrect_guesses_left, math.ceil(len(game.word) / 2))

    def test_incorrect_guess(self):
        """Test making an incorrect guess"""
        game = Game.new_game()
        initial_guesses_left = game.incorrect_guesses_left
        
        # "f" is in none of the words given.
        wrong_letter = 'f'
        
        game.make_guess(wrong_letter)
        
        self.assertEqual(game.incorrect_guesses_made, 1)
        self.assertEqual(game.incorrect_guesses_left, initial_guesses_left - 1)

    def test_winning_game(self):
        """Test winning the game by guessing all letters"""
        game = Game.new_game()
        
        # Guess each unique letter in the word
        for letter in set(game.word):
            game.make_guess(letter)
        
        self.assertEqual(game.status, "Win")
        self.assertEqual(game.word_state, game.word)

    def test_losing_game(self):
        """Test losing the game by making too many incorrect guesses"""
        game = Game.new_game()
        wrong_letter = 'f'
        
        # Make incorrect guesses until no guesses left
        while game.incorrect_guesses_left > 0:
            game.make_guess(wrong_letter)
        
        self.assertEqual(game.status, "Loss")
        self.assertEqual(game.incorrect_guesses_left, 0)