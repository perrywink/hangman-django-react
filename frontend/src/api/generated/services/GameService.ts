/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Game } from '../models/Game';
import type { GameGuess } from '../models/GameGuess';
import type { GameId } from '../models/GameId';
import type { PatchedGame } from '../models/PatchedGame';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameService {
    /**
     * @param id
     * @returns Game
     * @throws ApiError
     */
    public static gameRetrieve(
        id: number,
    ): CancelablePromise<Game> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/game/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns GameGuess
     * @throws ApiError
     */
    public static gameGuessUpdate(
        id: number,
        requestBody: GameGuess,
    ): CancelablePromise<GameGuess> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/game/{id}/guess/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns Game
     * @throws ApiError
     */
    public static gameGuessPartialUpdate(
        id: number,
        requestBody?: PatchedGame,
    ): CancelablePromise<Game> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/game/{id}/guess/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns GameId
     * @throws ApiError
     */
    public static gameNewCreate(
        requestBody?: GameId,
    ): CancelablePromise<GameId> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/game/new/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
