import {Card, faceValue, Suits} from "../type/card";

export class Deck {
      getFaceValue = (cardNumber: number): faceValue => {
          switch (cardNumber){
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
    newDeck = (numberOfDecks: number): Card[] => {
        let deck: Card[] = [];
        {
            for (let i = 1; i < 14; i++) {
                for (let j = 0; j < numberOfDecks; j++) {
                    for (let k = 0; k < 4; k++) {
                        switch (k) {
                            case 0:
                                deck.push({numericValue: this.getNumericValue(i), suitValue: Suits.Hearts, faceValue:this.getFaceValue(i)});
                                break;
                            case 1:
                                deck.push({numericValue:  this.getNumericValue(i), suitValue: Suits.Diamonds, faceValue:this.getFaceValue(i)})
                                break;
                            case 2:
                                deck.push({numericValue:  this.getNumericValue(i), suitValue: Suits.Clover, faceValue:this.getFaceValue(i)})
                                break;
                            case  3:
                                deck.push({numericValue:  this.getNumericValue(i), suitValue: Suits.Clubs, faceValue:this.getFaceValue(i)})
                                break;
                        }
                    }
                }
            }
        }
        console.log(deck);
       return deck.sort(()=> Math.random() - 0.5)
    }
}
