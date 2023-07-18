import {Card} from "../type/card";
import {CardDeck} from "../type/deck";

export class CardLogic {
    getShuffledPlayDeck = async (numberOfDecks: number): Promise<CardDeck> => {
        const response = await fetch(
            'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=' + numberOfDecks.toString()
        );
        return await response.json() as CardDeck;
    }

    getTopCard = async (deckId: string, numberOfCards: number): Promise<Card> => {
        const response = await fetch(
            'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=' + numberOfCards.toString()
        )
        return await response.json() as Card;
    }
}
