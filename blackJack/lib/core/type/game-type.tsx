import {Card} from "./card";

export type GameType = {
    gameDeck: Card[],
    playerCards: Card[],
    dealerCards: Card[],
    playerScore: number,
    dealerScore: number,
    isPlayerStaying: boolean
    gameOutcome: string,
    showAll: boolean,
}
