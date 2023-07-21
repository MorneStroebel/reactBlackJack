import {Card} from "./card";

export type UpdateGameState = {
    gameDeck: Card[],
    dealerCards: Card[],
    playerCards: Card[],
    dealerScore: number,
    playerScore: number,
    gameOutcome: string,
    isStaying: boolean,
    showAll: boolean,
}
