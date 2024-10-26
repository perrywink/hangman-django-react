import axios from "axios";
import type { Game, GameGuess, GameId } from "./generated/";

// const API_BASE_URL = import.meta.env.VITE_BASE_API_URL

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

export async function makeGuess(data: GameGuess): Promise<Game> {
  const response = await api.post(`/game/${data.guess}`, data);
  return response.data;
}
