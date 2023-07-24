import {Card, faceValue, Suits} from "../type/card";
import {UpdateGameState} from "../type/update-game-state";

export class Deck {
    getFaceValue = (cardNumber: number): faceValue => {
        switch (cardNumber) {
            case 1:
                return faceValue.One;
            case 2:
                return faceValue.Two;
            case 3:
                return faceValue.Three;
            case 4:
                return faceValue.Four;
            case 5:
                return faceValue.Five;
            case 6:
                return faceValue.Six;
            case 7:
                return faceValue.Seven;
            case 8:
                return faceValue.Eight;
            case 9:
                return faceValue.Nine;
            case 10:
                return faceValue.Ten;
            case 11:
                return faceValue.Jack;
            case 12:
                return faceValue.Queen;
            default:
                return faceValue.King;
        }
    }

    getNumericValue = (initialValue: number): number => {
        return initialValue > 10 ? 10 : initialValue
    }

    getNumberSuits = (cardNumber: number): Card[] => {
        let suitList: Card[] = [];
        for (let k: number = 0; k < 4; k++) {
            switch (k) {
                case 0:
                    suitList.push({
                        numericValue: this.getNumericValue(cardNumber),
                        suitValue: Suits.Hearts,
                        faceValue: this.getFaceValue(cardNumber)
                    });
                    break;
                case 1:
                    suitList.push({
                        numericValue: this.getNumericValue(cardNumber),
                        suitValue: Suits.Diamonds,
                        faceValue: this.getFaceValue(cardNumber)
                    })
                    break;
                case 2:
                    suitList.push({
                        numericValue: this.getNumericValue(cardNumber),
                        suitValue: Suits.Clover,
                        faceValue: this.getFaceValue(cardNumber)
                    })
                    break;
                case  3:
                    suitList.push({
                        numericValue: this.getNumericValue(cardNumber),
                        suitValue: Suits.Clubs,
                        faceValue: this.getFaceValue(cardNumber)
                    })
                    break;
            }
        }
        return suitList
    }

    newDeck = (numberOfDecks: number): Card[] => {
        let deck: Card[] = [];
        for (let i: number = 1; i < 14; i++) {
            for (let j: number = 0; j < numberOfDecks; j++) {
                deck = [...deck, ...this.getNumberSuits(i)]
            }
        }
        console.log(deck);
        return deck.sort(() => Math.random() - 0.5)
    }

    playerDrawCard = (gameState: UpdateGameState): UpdateGameState => {
        let updateGameState: UpdateGameState = {} as UpdateGameState;
        if (gameState.gameDeck.length > 0) {
            let drawnCard: Card = gameState.gameDeck[0];
            updateGameState =
                {
                    gameDeck: gameState.gameDeck.slice(3, gameState.gameDeck.length),
                    dealerCards: gameState.dealerCards,
                    playerCards: [...gameState.playerCards, drawnCard],
                    dealerScore: gameState.dealerScore,
                    playerScore: gameState.playerScore + drawnCard.numericValue,
                    gameOutcome: gameState.playerScore + drawnCard.numericValue > 21 ? 'You busted' : '',
                    isStaying: gameState.playerScore + drawnCard.numericValue > 21,
                    showAll: true,
                };
        }
        return updateGameState;
    }

    getGameOutcome = (playerScore: number, dealerScore: number): string => {
        if (dealerScore > 21) {
            return 'You win dealer busted'
        }
        if (dealerScore > playerScore) {
            return 'Dealer won'
        }
        if (dealerScore < playerScore) {
            return 'You win'
        }
        if (dealerScore == playerScore) {
            return 'its a draw'
        }
        return ''
    }
    checkStatus = (gameState: UpdateGameState): UpdateGameState => {
        let addDealerCards: Card[] = [];
        let updateGameSate: UpdateGameState = {} as UpdateGameState;
        let temporaryDealerValue: number = gameState.dealerScore;
        let index: number = 0
        while (temporaryDealerValue < 17) {
            addDealerCards.push(gameState.gameDeck[index]);
            temporaryDealerValue += gameState.gameDeck[index].numericValue;
            index += 1;
        }
        return updateGameSate = {
            gameDeck: gameState.gameDeck.slice(index + 1, gameState.gameDeck.length),
            dealerCards: [...gameState.dealerCards, ...addDealerCards
            ],
            playerCards: gameState.playerCards,
            dealerScore: temporaryDealerValue,
            playerScore: gameState.playerScore,
            gameOutcome: this.getGameOutcome(gameState.playerScore, temporaryDealerValue),
            isStaying: true,
            showAll: false,
        };
    }
}
