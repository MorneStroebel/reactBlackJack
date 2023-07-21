import {
    ColorValue, Image,
    ImageBackground,
    ScaledSize,
    StyleSheet,
    Text,
    useWindowDimensions,
    View
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {Card} from "../../../../core/type/card";
import {Routes} from "../../../../core/navigation/routes";
import {EdgeInsets, useSafeAreaInsets} from "react-native-safe-area-context";
import AppPrimaryButton from "../../../../core/shared components/AppButton";
import {Deck} from "../../../../core/data/Deck";
import {GenerateCard} from "../../../../core/data/generateCard";
import {GameType} from "../../../../core/type/game-type";


export const PlayScreen = ({navigation}) => {

    const insets: EdgeInsets = useSafeAreaInsets();
    const scaledSize: ScaledSize = useWindowDimensions();

    const [gameState, setGameState] = useState<GameType>({
        gameDeck: [],
        dealerCards: [],
        playerCards: [],
        playerScore: 0,
        dealerScore: 0,
        gameOutcome: '',
        isPlayerStaying: false,
        showAll: true,
    });

    const updateGameState = (
        gameDeck: Card[],
        dealerCards: Card[],
        playerCards: Card[],
        dealerScore: number,
        playerScore: number,
        gameOutcome: string,
        isStaying: boolean,
        showAll: boolean,
    ) => {
        const updateGameType: GameType = {
            gameDeck: gameDeck,
            dealerCards: dealerCards,
            playerCards: playerCards,
            playerScore: playerScore,
            dealerScore: dealerScore,
            gameOutcome: gameOutcome,
            isPlayerStaying: isStaying,
            showAll: showAll,
        };
        setGameState(updateGameType);
    }
    const playerDrawCard = () => {
        if (gameState.gameDeck.length > 0) {
            let drawnCard: Card = gameState.gameDeck[0];
            updateGameState(
                gameState.gameDeck.slice(3, gameState.gameDeck.length),
                gameState.dealerCards,
                [...gameState.playerCards, drawnCard],
                gameState.dealerScore,
                gameState.playerScore + drawnCard.numericValue,
                gameState.playerScore + drawnCard.numericValue > 21 ? 'You busted' : '',
                gameState.playerScore + drawnCard.numericValue > 21,
                true,
            );
        }
    }

    const getGameOutcome = (playerScore: number, dealerScore: number): string => {
        if (dealerScore > 21){
            return 'You win dealer busted'
        }
        if (dealerScore > playerScore ) {
            return 'Dealer won'
        }
        if (dealerScore < playerScore){
            return 'You win'
        }
        if (dealerScore == playerScore) {
            return 'its a draw'
        }
        return ''
    }
    const checkStatus = () => {
        let addDealerCards: Card[] = [];
        let temporaryDealerValue: number = gameState.dealerScore;
        let index: number = 0
        while (temporaryDealerValue < 17) {
            addDealerCards.push(gameState.gameDeck[index]);
            temporaryDealerValue += gameState.gameDeck[index].numericValue;
            index += 1;
        }
        updateGameState(
            gameState.gameDeck.slice(index + 1, gameState.gameDeck.length),
            [...gameState.dealerCards, ...addDealerCards],
            gameState.playerCards,
            temporaryDealerValue,
            gameState.playerScore,
            getGameOutcome(gameState.playerScore, temporaryDealerValue),
            true,
            false,
        );
    }

    useEffect(() => {
        const newGameDeck: Card[] = new Deck().newDeck(6)
        updateGameState(
            newGameDeck.slice(3, newGameDeck.length),
            [newGameDeck[0]],
            [newGameDeck[1], newGameDeck[2]],
            gameState.dealerScore + newGameDeck[0].numericValue,
            gameState.playerScore + newGameDeck[1].numericValue + newGameDeck[2].numericValue,
            '',
            false,
            true,
        );
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
                            <Text style={styles().textStyles}>Dealer total: {gameState.dealerScore}</Text>
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
                                    gameState.dealerCards.map((card, index) =>
                                        <GenerateCard key={index} card={card} index={index}/>
                                    )
                                }
                                {
                                    gameState.showAll
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
                            <Text style={styles().textStyles}>My total: {gameState.playerScore}</Text>
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
                                    gameState.playerCards.map((card, index) =>
                                        <GenerateCard key={index} card={card} index={index}/>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 10}}>
                        <Text style={styles().textStyles}>{gameState.gameOutcome}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                        width: scaledSize.width
                    }}>
                        <AppPrimaryButton
                            text={'Hit'}
                            onPress={() => playerDrawCard()}
                            backgroundColor={gameState.isPlayerStaying ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
                            textColor={buttonTextColor}
                            isDisabled={gameState.isPlayerStaying}
                            width={(scaledSize.width / 3) - 32}
                        />
                        <AppPrimaryButton
                            text={'stay'}
                            onPress={async () => checkStatus()}
                            backgroundColor={gameState.isPlayerStaying ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
                            textColor={buttonTextColor}
                            isDisabled={gameState.isPlayerStaying}
                            width={(scaledSize.width / 3) - 32}
                        />
                        <AppPrimaryButton
                            text={'Play again'}
                            onPress={(): void => navigation.push(Routes.PlayScreen)}
                            backgroundColor={!gameState.isPlayerStaying ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
                            textColor={buttonTextColor}
                            isDisabled={!gameState.isPlayerStaying}
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
export const styles = (index?: number) => {
    return StyleSheet.create({
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
    });
};


