import {ActivityIndicator, Button, SafeAreaView, ScrollView, Text, useWindowDimensions, View} from "react-native";
import {CardLogic} from "../../../core/data/cardLogic";
import {useEffect, useState} from "react";
import {CardDeck} from "../../../core/type/deck";
import {CardElement} from "../../../core/type/card";
import {Routes} from "../../../core/navigation/routes";

// @ts-ignore
export function PlayScreen({route, navigation}) {
    const {width} = useWindowDimensions();
    const {cardDeck} = route.params;
    const cardLogic = new CardLogic();
    const [myCards, setMyCards] = useState<CardElement[]>([]);
    const [myTotal, setMyTotal] = useState<number>(0);
    const [dealerTotal, setDealerTotal] = useState<number>(0);
    const [dealerCards, setDealerCards] = useState<CardElement[]>([]);
    const [playerStay, setPlayerStay] = useState<boolean>(false);
    const [gameStatus, setGameStatus] = useState<string>('Test text');
    const [remaining, setRemaining] = useState<number>(0);
    let didRun = false


    useEffect(() => {
        PlayerDrawCard(2)
        DealerDrawCard(2)
        didRun = true;

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
                    <View style={{height: 300, width: width / 2}}>
                        <ScrollView>
                            {myCards.map((card, index) => <Text key={index}>{card.value} of {card.suit}</Text>)}
                        </ScrollView>
                    </View>
                </View>
                <View>
                    <Text>Dealer total: {dealerTotal}</Text>
                    <Text>Dealer Cards:</Text>
                    <View style={{height: 20}}/>
                    <View style={{height: 300, width: width / 2}}>
                        <ScrollView>
                            {dealerCards.map((card, index) => <Text key={index}>{card.value} of {card.suit}</Text>)}
                        </ScrollView>
                    </View>
                </View>

            </View>

            <Button title={'Hit'} disabled={playerStay} onPress={() => PlayerDrawCard(1)}/>
            <Button title={'Stay'} disabled={playerStay} onPress={() => {
                setPlayerStay(true);
                checkStatus()
            }}/>
            <Button title={'play again'} disabled={!playerStay} onPress={() => {
                setPlayerStay(false);
                setDealerCards([])
                setMyCards([])
                PlayerDrawCard(1)
                DealerDrawCard(1)
                setDealerTotal(0)
                setMyTotal(0)
            }}/>

            <Text>{gameStatus}</Text>
        </SafeAreaView>
    );

    function DealerDrawCard(numberOfCards: number) {
        drawCards(numberOfCards).then(cards => {
            let tempVal = 0
            cards.cards.forEach((card) => {
                tempVal += getValue(card.value, dealerTotal)
            })
            setDealerTotal(dealerTotal + tempVal)
            setDealerCards([...dealerCards, ...cards.cards]);
            setRemaining(cards.remaining);
        })
    }

    function PlayerDrawCard(numberOfCards: number) {
        drawCards(numberOfCards).then(cards => {
            let tempVal = 0
            cards.cards.forEach((card) => {
                tempVal += getValue(card.value, myTotal)
            })
            setMyTotal(myTotal + tempVal)
            setMyCards([...myCards, ...cards.cards]);
            setRemaining(cards.remaining);
            if (myTotal + tempVal > 21) {
                checkStatus()
            }
        })
    }

    async function drawCards(numberOfCards: number) {
        return await cardLogic.getTopCard(cardDeck.deck_id, numberOfCards)
    }

    function getValue(value: string, total: number): number {
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

    function checkStatus() {
        if (myTotal > 21)
            setGameStatus('bust')
        if (myTotal === dealerTotal)
            setGameStatus('Draw')
        if (myTotal > dealerTotal && myTotal < 22)
            setGameStatus('you win')
        if (myTotal < dealerTotal && dealerTotal < 22)
            setGameStatus('dealer Won')
        if (dealerTotal > 21)
            setGameStatus('you won')
        setPlayerStay(true)
        if (dealerTotal < 17) {
            DealerDrawCard(1)
        }
    }
}


