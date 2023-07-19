import {
    Button, ColorValue, Image, ImageBackground,
    SafeAreaView,
    ScaledSize,
    ScrollView, StyleSheet,
    Text,
    useWindowDimensions,
    View
} from "react-native";
import {CardLogic} from "../../../core/data/cardLogic";
import React, {useEffect, useState} from "react";
import {Card, CardElement} from "../../../core/type/card";
import {Routes} from "../../../core/navigation/routes";
import {EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context";
import AppPrimaryButton from "../../../core/shared components/AppButton";
import {DarkTheme} from "@react-navigation/native";
import {Deck} from "../../../core/data/Deck";
import {CardDeck} from "../../../core/type/deck";
import {GenerateCard} from "../../../core/data/generateCard";
import Snackbar from "react-native-snackbar";


export const PlayScreen = ({route, navigation}) => {
    const [playDeck, setPlayDeck] = useState<Card[]>(new Deck().newDeck(1))
    const [topCard, setTopCard] = useState<Card>({} as Card)
    return (
        <SafeAreaView>
            <Text>Top Card: {topCard.numericValue}, {topCard.suitValue}</Text>
            <View style={{height: 20}}/>
            <Button title={'Get top Card'} onPress={() => {
                if (playDeck.length > 0) {
                    setTopCard(playDeck[0])
                    let newDeck: Card[] = playDeck.slice(1, playDeck.length)
                    setPlayDeck(newDeck)
                    console.log(playDeck)
                } else {

                }
            }}/>
            <View style={{height: 20}}/>
            <GenerateCard card={playDeck[0]} height={150} width={80}/>
        </SafeAreaView>

    );
}

//     const DealerDrawCard = async (numberOfCards: number): Promise<void> => {
//         const dealerDrawnCards: Card = await drawCards(numberOfCards)
//         let tempVal = 0
//         dealerDrawnCards.cards.forEach((card: CardElement): void => {
//             tempVal += getValue(card.value, myTotal)
//         })
//         setDealerTotal(dealerTotal + tempVal)
//         setDealerCards([...dealerCards, ...dealerDrawnCards.cards]);
//         setRemaining(dealerDrawnCards.remaining);
//     }
//
//     const PlayerDrawCard = async (numberOfCards: number): Promise<void> => {
//         const playerDrawnCards: Card = await drawCards(numberOfCards)
//
//         let tempVal = 0
//         playerDrawnCards.cards.forEach((card: CardElement): void => {
//             tempVal += getValue(card.value, myTotal)
//         })
//         setMyTotal(myTotal + tempVal)
//         setMyCards([...myCards, ...playerDrawnCards.cards]);
//         setRemaining(playerDrawnCards.remaining);
//         if (myTotal + tempVal > 21) {
//             setGameStatus('you busted')
//             setPlayerStay(true)
//         }
//     }
//
//     const drawCards = async (numberOfCards: number): Promise<Card> => {
//         return await cardLogic.getTopCard(cardDeck.deck_id, numberOfCards)
//     }
//
//     const getValue = (value: string, total: number): number => {
//         switch (value) {
//             case 'ACE':
//                 return total + 11 >= 21 ? 1 : 11;
//             case 'KING':
//                 return 10;
//             case 'QUEEN':
//                 return 10;
//             case 'JACK':
//                 return 10;
//             default:
//                 return parseInt(value);
//         }
//     }
//
//     const checkStatus = async (TotalOfDealer: number, TotalOfPlayer: number) => {
//         setPlayerStay(true)
//         if (TotalOfDealer < 17) {
//           await DealerDrawCard(1)
//         }
//         if (TotalOfDealer >= 17) {
//             if (TotalOfDealer == TotalOfPlayer) {
//                 setGameStatus('draw')
//             }
//             if (TotalOfDealer > 21 && TotalOfPlayer <= 21) {
//                 setGameStatus('you win')
//             }
//             if (TotalOfPlayer <= 21 && TotalOfDealer <= 21 && TotalOfPlayer > TotalOfDealer) {
//                 setGameStatus('you win')
//             }
//             if (TotalOfPlayer <= 21 && TotalOfDealer <= 21 && TotalOfPlayer < TotalOfDealer) {
//                 setGameStatus('dealer win')
//             }
//         }
//     }
//
//     const insets: EdgeInsets = useSafeAreaInsets();
//     const scaledSize: ScaledSize = useWindowDimensions();
//     const {cardDeck} = route.params;
//     const cardLogic: CardLogic = new CardLogic();
//     const [myCards, setMyCards] = useState<CardElement[]>([]);
//     const [myTotal, setMyTotal] = useState<number>(0);
//     const [dealerTotal, setDealerTotal] = useState<number>(0);
//     const [dealerCards, setDealerCards] = useState<CardElement[]>([]);
//     const [playerStay, setPlayerStay] = useState<boolean>(false);
//     const [gameStatus, setGameStatus] = useState<string>('Test text');
//     const [remaining, setRemaining] = useState<number>(0);
//     const [showAll, setShowAll] = useState<boolean>(false);
//     const [isDarkTheme, setDarkTheme]= useState<boolean>(false)
//     useEffect((): void => {
//         setDealerCards([])
//         setMyCards([])
//         DealerDrawCard(1).then(() => PlayerDrawCard(2))
//
//
//     }, [])
//
//     return (
//         <View style={{flex: 1}}>
//             <ImageBackground source={require('blackJack/assets/images/background.jpg')} resizeMode={'cover'} style={{
//                 flex: 1,
//             }}>
//                 <View style={{
//                     paddingTop: insets.top,
//                     paddingBottom: insets.bottom,
//                     height: scaledSize.height,
//                     width: scaledSize.width,
//                 }}>
//                     <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16}}>
//                         <Button title={isDarkTheme ? 'Dark Theme' : 'Light theme'} onPress={() => setDarkTheme(!isDarkTheme)}/>
//                     </View>
//                     <View style={{height: 20}}/>
//                     <View style={{
//                         flexDirection: 'column',
//                         justifyContent: 'space-between',
//                         height: '85%',
//                         paddingHorizontal: 20,
//                     }}>
//
//                         <View style={{alignItems: 'center', alignSelf: 'center', top: 0, position: 'absolute'}}>
//                             <Text style={styles().textStyles}>Dealer total: {dealerTotal}</Text>
//                             <Text style={styles().textStyles}>Dealer Cards:</Text>
//                             <View style={{height: 20}}/>
//                             <View style={{height: 144, width: '100%', alignSelf: 'center', alignContent: 'center'}}>
//                                 {
//                                     dealerCards.map((card, index) =>
//                                         <Image key={index}
//                                                source={{uri: card.image}}
//                                                style={[styles(index).imageStack]}
//                                                resizeMode={'contain'}
//                                         />
//                                     )
//                                 }
//                                 {
//                                     showAll ?
//                                         null
//                                         : <Image key={1}
//                                                  source={ isDarkTheme ? require('blackJack/assets/images/backgroundBlack.jpg') : require('blackJack/assets/images/cardBackRed.png')}
//                                                  style={[styles(1).imageStack]}
//                                                  resizeMode={'contain'}
//                                                  borderRadius={10}
//                                         />
//                                 }
//                             </View>
//                         </View>
//                         <View style={{alignItems: 'center', alignSelf: 'center', bottom: 0, position: 'absolute'}}>
//                             <Text style={styles().textStyles}>My total: {myTotal}</Text>
//                             <Text style={styles().textStyles}>My Cards:</Text>
//                             <View style={{height: 20}}/>
//                             <View style={{height: 144, width: '100%', alignSelf: 'center', alignContent: 'center'}}>
//                                 {
//                                     myCards.map((card: CardElement, index: number) =>
//                                         <Image key={index}
//                                                source={{uri: card.image}}
//                                                style={[styles(index).imageStack]}
//                                                resizeMode={'contain'}
//                                         />
//                                     )
//                                 }
//                             </View>
//                         </View>
//                     </View>
//                     <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16}}>
//                         <AppPrimaryButton
//                             text={'Hit'}
//                             onPress={() => PlayerDrawCard(1)}
//                             backgroundColor={playerStay ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
//                             textColor={buttonTextColor}
//                             isDisabled={playerStay}
//                             width={(scaledSize.width / 3) - 32}
//                         />
//                         <AppPrimaryButton
//                             text={'stay'}
//                             onPress={(): void => {
//                                 setPlayerStay(true);
//                                 checkStatus(dealerTotal, myTotal)
//                                 setShowAll(true)
//                             }}
//                             backgroundColor={playerStay ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
//                             textColor={buttonTextColor}
//                             isDisabled={playerStay}
//                             width={(scaledSize.width / 3) - 32}
//                         />
//                         <AppPrimaryButton
//                             text={'Play again'}
//                             onPress={(): void => {
//                                 navigation.push(Routes.PlayScreen, {cardDeck: cardDeck})
//                             }}
//                             backgroundColor={!playerStay ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
//                             textColor={buttonTextColor}
//                             isDisabled={!playerStay}
//                             width={(scaledSize.width / 3) - 32}
//                         />
//                     </View>
//                 </View>
//             </ImageBackground>
//         </View>
//     );
//
// }
//
// const buttonActiveBackgroundColor: ColorValue = '#e1a0b5'
// const buttonDisabledBackgroundColor: ColorValue = '#959ba6'
// const buttonTextColor: ColorValue = '#181f12'
// export const styles = (index?: number) => StyleSheet.create({
//     textStyles: {
//         color: '#f7ecdc',
//         fontSize: 18
//     },
//     imageStack: {
//         height: 144,
//         width: 100,
//         position: 'absolute',
//         right: -index * 20,
//     },
// })


