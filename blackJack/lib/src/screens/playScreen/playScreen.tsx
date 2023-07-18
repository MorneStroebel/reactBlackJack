import {
    Button,
    SafeAreaView,
    ScaledSize,
    ScrollView,
    Text,
    useWindowDimensions,
    View
} from "react-native";
import {CardLogic} from "../../../core/data/cardLogic";
import {useEffect, useState} from "react";
import {Card, CardElement} from "../../../core/type/card";
import {Routes} from "../../../core/navigation/routes";


export const PlayScreen = ({route, navigation}) => {

    const DealerDrawCard = async (numberOfCards: number): Promise<void> => {
        const dealerDrawnCards: Card = await drawCards(numberOfCards)
        let tempVal = 0
        dealerDrawnCards.cards.forEach((card: CardElement): void => {
            tempVal += getValue(card.value, myTotal)
        })
        setDealerTotal(dealerTotal + tempVal)
        setDealerCards([...dealerCards, ...dealerDrawnCards.cards]);
        setRemaining(dealerDrawnCards.remaining);
    }

    const PlayerDrawCard = async (numberOfCards: number): Promise<void> => {
        const playerDrawnCards: Card = await drawCards(numberOfCards)

        let tempVal = 0
        playerDrawnCards.cards.forEach((card: CardElement): void => {
            tempVal += getValue(card.value, myTotal)
        })
        setMyTotal(myTotal + tempVal)
        setMyCards([...myCards, ...playerDrawnCards.cards]);
        setRemaining(playerDrawnCards.remaining);
        if (myTotal + tempVal > 21) {
            setGameStatus('you busted')
            setPlayerStay(true)
        }
    }

    const drawCards = async (numberOfCards: number): Promise<Card> => {
        return await cardLogic.getTopCard(cardDeck.deck_id, numberOfCards)
    }

    const getValue = (value: string, total: number): number => {
        switch (value) {
            case 'ACE':
                return total >= 21 ? 1 : 11;
            case 'KING':
                return 10;
            case 'QUEEN':
                return 10;
            case 'JACK':
                return 10;
            default:
                return parseInt(value);
        }
    }

    const checkStatus = async (TotalOfDealer: number, TotalOfPlayer: number) => {
        setPlayerStay(true)
        if (TotalOfDealer < 17) {
            await DealerDrawCard(1)
        }
        if (TotalOfDealer == TotalOfPlayer) {
            setGameStatus('draw')
        }
        if (TotalOfDealer > 21 && TotalOfPlayer <= 21) {
            setGameStatus('you win')
        }
        if (TotalOfPlayer <= 21 && TotalOfDealer <= 21 && TotalOfPlayer > TotalOfDealer) {
            setGameStatus('you win')
        }
        if (TotalOfPlayer <= 21 && TotalOfDealer <= 21 && TotalOfPlayer < TotalOfDealer) {
            setGameStatus('dealer win')
        }
}

const scaledSize: ScaledSize = useWindowDimensions();
const {cardDeck} = route.params;
const cardLogic: CardLogic = new CardLogic();
const [myCards, setMyCards] = useState<CardElement[]>([]);
const [myTotal, setMyTotal] = useState<number>(0);
const [dealerTotal, setDealerTotal] = useState<number>(0);
const [dealerCards, setDealerCards] = useState<CardElement[]>([]);
const [playerStay, setPlayerStay] = useState<boolean>(false);
const [gameStatus, setGameStatus] = useState<string>('Test text');
const [remaining, setRemaining] = useState<number>(0);
useEffect((): void => {
    DealerDrawCard(2).then(() => PlayerDrawCard(2))


}, [])

return (
    <SafeAreaView>
        <View>
            <Text>DeckId: {cardDeck.deck_id}</Text>
            <Text>remaining: {remaining}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
            <View>
                <Text>My total: {myTotal}</Text>
                <Text>My Cards:</Text>
                <View style={{height: 20}}/>
                <View style={{height: 300, width: scaledSize.width / 2}}>
                    <ScrollView>
                        {myCards.map((card: CardElement, index: number) => <Text
                            key={index}>{card.value} of {card.suit}</Text>)}
                    </ScrollView>
                </View>
            </View>
            <View>
                <Text>Dealer total: {dealerTotal}</Text>
                <Text>Dealer Cards:</Text>
                <View style={{height: 20}}/>
                <View style={{height: 300, width: scaledSize.width / 2}}>
                    <ScrollView>
                        {dealerCards.map((card, index) => <Text key={index}>{card.value} of {card.suit}</Text>)}
                    </ScrollView>
                </View>
            </View>

        </View>

        <Button title={'Hit'} disabled={playerStay} onPress={() => PlayerDrawCard(1)}/>
        <Button title={'Stay'} disabled={playerStay} onPress={(): void => {
            setPlayerStay(true);
            checkStatus(dealerTotal, myTotal)
        }}/>
        <Button title={'play again'} disabled={!playerStay} onPress={(): void => {
            navigation.push(Routes.PlayScreen, {cardDeck: cardDeck})
        }}/>

        <Text>{gameStatus}</Text>
    </SafeAreaView>
);
}


