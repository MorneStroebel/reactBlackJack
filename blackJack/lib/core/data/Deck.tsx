import {Card, Suits} from "../type/card";

export class Deck {
    newDeck = (numberOfDecks: number): Card[] => {
        let deck: Card[] = [];
        {
            for (let i = 1; i < 14; i++) {
                for (let j = 0; j < numberOfDecks; j++) {
                    for (let k = 0; k < 5; k++) {
                        if(k == 0){
                           deck.push({numericValue: i, suitValue: Suits.Hearts})
                        }if(k == 1){
                           deck.push({numericValue: i, suitValue: Suits.Diamonds})
                        }if(k == 2){
                           deck.push({numericValue: i, suitValue: Suits.Clover})
                        }if(k == 3){
                           deck.push({numericValue: i, suitValue: Suits.Clubs})
                        }
                    }
                }
            }
        }
       return deck.sort(()=> Math.random() - 0.5)
    }

    getTopCard = (deck: Card[]): [Card , Card[]] => {
        let topCard: Card = deck[0];
        let newDeck: Card[] = deck.splice(0,1)
        return[ topCard , deck];
    }
}
