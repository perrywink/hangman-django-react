/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Game } from '../models/Game';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GamesService {
    /**
     * @returns Game
     * @throws ApiError
     */
    public static gamesList(): CancelablePromise<Array<Game>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/games/',
        });
    }
}
