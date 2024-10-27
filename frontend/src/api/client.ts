import axios from "axios";
import type { Game, GameGuess, GameId } from "./generated/";

const api = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getGames(): Promise<Game[]> {
  const response = await api.get(`/games/`);
  return response.data;
}

export async function getGame(id: string): Promise<Game> {
  const response = await api.get(`/game/${id}`);
  return response.data;
}

export async function newGame(): Promise<GameId> {
  const response = await api.post(`/game/new/`);
  return response.data;
}

export async function makeGuess(id: string, data: GameGuess): Promise<Game> {
  const response = await api.put(`/game/${id}/guess/`, data);
  return response.data;
}
