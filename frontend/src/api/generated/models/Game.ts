/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatusEnum } from './StatusEnum';
export type Game = {
    readonly id: number;
    word_state: string;
    status?: StatusEnum;
    incorrect_guesses_made?: number;
    incorrect_guesses_left?: number;
};

