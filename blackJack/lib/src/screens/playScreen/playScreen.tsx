import {
    ColorValue, Image,
    ImageBackground,
    ScaledSize,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from "react-native";
import React, {useEffect, useState} from "react";
import {Card} from "../../../core/type/card";
import {Routes} from "../../../core/navigation/routes";
import {EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context";
import AppPrimaryButton from "../../../core/shared components/AppButton";
import {Deck} from "../../../core/data/Deck";
import {GenerateCard} from "../../../core/data/generateCard";


export const PlayScreen = ({navigation}) => {

    const insets: EdgeInsets = useSafeAreaInsets();
    const scaledSize: ScaledSize = useWindowDimensions();

    const [playDeck, setPlayDeck] = useState<Card[]>(new Deck().newDeck(6))
    const [dealerCards, setDealerCards] = useState<Card[]>([]);
    const [dealerTotal, setDealerTotal] = useState<number>(0);
    const [myCards, setMyCards] = useState<Card[]>([]);
    const [myTotal, setMyTotal] = useState<number>(0);
    const [playerStay, setPlayerStay] = useState<boolean>(false);
    const [gameStatus, setGameStatus] = useState<string>('');
    const [showAll, setShowAll] = useState<boolean>(true);
    const DealerDrawCard = () => {
        if (playDeck.length > 0) {
            let drawnCard: Card = playDeck[0];
            let newDeck: Card[] = playDeck.slice(1, playDeck.length)
            setPlayDeck(newDeck)
            dealerCards.push(drawnCard)
            setDealerCards(dealerCards)
            setDealerTotal(dealerTotal + drawnCard.numericValue)
        }
    }
    const PlayerDrawCard = () => {
        if (playDeck.length > 0) {
            let drawnCard: Card = playDeck[0];
            let newDeck: Card[] = playDeck.slice(1, playDeck.length)
            setPlayDeck(newDeck)
            myCards.push(drawnCard)
            setMyCards(myCards)
            setMyTotal(myTotal + drawnCard.numericValue)
            if (myTotal + drawnCard.numericValue > 21){
                setGameStatus('You busted')
                setPlayerStay(true)
            }
        }

    }
    const checkStatus = (TotalOfDealer: number, TotalOfPlayer: number) => {
        setPlayerStay(true)
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

    useEffect(() => {
        DealerDrawCard()
    }, [])
    return (
        <View style={{flex: 1}}>
            <ImageBackground source={require('blackJack/assets/images/background.jpg')} resizeMode={'cover'}
                             style={{flex: 1}}>
                <View style={{
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    height: scaledSize.height,
                    width: scaledSize.width,
                }}>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '85%',
                        paddingHorizontal: 20,
                    }}>
                        <View style={{alignItems: 'center', alignSelf: 'center', top: 0, position: 'absolute'}}>
                            <Text style={styles().textStyles}>Dealer total: {dealerTotal}</Text>
                            <Text style={styles().textStyles}>Dealer Cards:</Text>
                            <View style={{height: 20}}/>
                            <View style={{
                                height: 144,
                                width: '100%',
                                alignSelf: 'center',
                                alignContent: 'center',
                                flexDirection: 'row'
                            }}>
                                {
                                    dealerCards.map((card, index) =>
                                        <GenerateCard key={index} card={card} index={index}/>
                                    )
                                }
                                {
                                    showAll
                                        ? <Image key={1}
                                                 source={require('blackJack/assets/images/cardBackRed.png')}
                                                 style={[styles(1).imageStack]}
                                                 resizeMode={'cover'}
                                                 borderRadius={10}
                                        />
                                        : null
                                }
                            </View>
                        </View>
                        <View style={{alignItems: 'center', alignSelf: 'center', bottom: 0, position: 'absolute'}}>
                            <Text style={styles().textStyles}>My total: {myTotal}</Text>
                            <Text style={styles().textStyles}>My Cards:</Text>
                            <View style={{height: 20}}/>
                            <View style={{
                                height: 144,
                                width: '100%',
                                alignSelf: 'center',
                                alignContent: 'center',
                                flexDirection: 'row'
                            }}>
                                {
                                    myCards.map((card, index) =>
                                        <GenerateCard key={index} card={card} index={index}/>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 10}}>
                        <Text style={styles().textStyles}>{gameStatus}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        width: scaledSize.width
                    }}>
                        <AppPrimaryButton
                            text={'Hit'}
                            onPress={() => PlayerDrawCard()}
                            backgroundColor={playerStay ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
                            textColor={buttonTextColor}
                            isDisabled={playerStay}
                            width={(scaledSize.width / 3) - 32}
                        />
                        <AppPrimaryButton
                            text={'stay'}
                            onPress={(): void => {
                                setPlayerStay(true);
                                setShowAll(false)
                                if (dealerTotal < 17) {
                                    DealerDrawCard()
                                }
                                checkStatus(dealerTotal, myTotal)
                            }}
                            backgroundColor={playerStay ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
                            textColor={buttonTextColor}
                            isDisabled={playerStay}
                            width={(scaledSize.width / 3) - 32}
                        />
                        <AppPrimaryButton
                            text={'Play again'}
                            onPress={(): void => {
                                navigation.push(Routes.PlayScreen)
                            }}
                            backgroundColor={!playerStay ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
                            textColor={buttonTextColor}
                            isDisabled={!playerStay}
                            width={(scaledSize.width / 3) - 32}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const buttonActiveBackgroundColor: ColorValue = '#e1a0b5'
const buttonDisabledBackgroundColor: ColorValue = '#959ba6'
const buttonTextColor: ColorValue = '#181f12'
export const styles = (index?: number) => StyleSheet.create({
    textStyles: {
        color: '#f7ecdc',
        fontSize: 18
    },
    imageStack: {
        height: 150,
        width: 80,
        position: 'absolute',
        right: -index * 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        padding: 16
    },
})


