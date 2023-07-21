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
import {playScreenStyles} from "../styles/playScreenStyles";
import {DealerInfo} from "../sub-views/dealer-info";
import {PlayerInfo} from "../sub-views/player-info";
import {UpdateGameState} from "../../../../core/type/update-game-state";

export const PlayScreen = ({navigation}) => {
    const buttonActiveBackgroundColor: ColorValue = '#e1a0b5';
    const buttonDisabledBackgroundColor: ColorValue = '#959ba6';
    const buttonTextColor: ColorValue = '#181f12';

    const insets: EdgeInsets = useSafeAreaInsets();
    const scaledSize: ScaledSize = useWindowDimensions();

    const [gameState, setGameState] = useState<UpdateGameState>({
        gameDeck: [],
        dealerCards: [],
        playerCards: [],
        playerScore: 0,
        dealerScore: 0,
        gameOutcome: '',
        isStaying: false,
        showAll: true,
    });

    const updateGameState = (
        {
            gameDeck,
            gameOutcome,
            showAll,
            dealerScore,
            playerScore,
            playerCards,
            dealerCards,
            isStaying
        }: UpdateGameState
    ) => {
        const updateGameType: UpdateGameState = {
            gameDeck: gameDeck,
            dealerCards: dealerCards,
            playerCards: playerCards,
            playerScore: playerScore,
            dealerScore: dealerScore,
            gameOutcome: gameOutcome,
            isStaying: isStaying,
            showAll: showAll,
        };
        setGameState(updateGameType);
    }
    const playerDrawCard = () => {
        if (gameState.gameDeck.length > 0) {
            let drawnCard: Card = gameState.gameDeck[0];
            updateGameState(
                {
                    gameDeck: gameState.gameDeck.slice(3, gameState.gameDeck.length),
                    dealerCards: gameState.dealerCards,
                    playerCards: [...gameState.playerCards, drawnCard],
                    dealerScore: gameState.dealerScore,
                    playerScore: gameState.playerScore + drawnCard.numericValue,
                    gameOutcome: gameState.playerScore + drawnCard.numericValue > 21 ? 'You busted' : '',
                    isStaying: gameState.playerScore + drawnCard.numericValue > 21,
                    showAll: true,
                }
            );
        }
    }

    const getGameOutcome = (playerScore: number, dealerScore: number): string => {
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
            {
                gameDeck: gameState.gameDeck.slice(index + 1, gameState.gameDeck.length),
                dealerCards: [...gameState.dealerCards, ...addDealerCards
                ],
                playerCards: gameState.playerCards,
                dealerScore: temporaryDealerValue,
                playerScore: gameState.playerScore,
                gameOutcome: getGameOutcome(gameState.playerScore, temporaryDealerValue),
                isStaying: true,
                showAll: false,
            }
        );
    }

    useEffect(() => {
        const newGameDeck: Card[] = new Deck().newDeck(1)
        updateGameState(
            {
                gameDeck: newGameDeck.slice(3, newGameDeck.length),
                dealerCards: [newGameDeck[0]],
                playerCards: [newGameDeck[1], newGameDeck[2]],
                dealerScore: gameState.dealerScore + newGameDeck[0].numericValue,
                playerScore: gameState.playerScore + newGameDeck[1].numericValue + newGameDeck[2].numericValue,
                gameOutcome: '',
                isStaying: false,
                showAll: true,
            }
        );
    }, [])

    return (
        <View style={playScreenStyles({}).flex1}>
            <ImageBackground source={require('blackJack/assets/images/background.jpg')} resizeMode={'cover'}
                             style={playScreenStyles({}).flex1}>
                <View style={playScreenStyles({insets: insets, scaledSize: scaledSize}).mainView}>
                    <View style={playScreenStyles({}).playArea}>
                        <DealerInfo
                            dealerCards={gameState.dealerCards}
                            showAll={gameState.showAll}
                            dealerScore={gameState.dealerScore}
                        />
                        <PlayerInfo
                            playerScore={gameState.playerScore}
                            playerCards={gameState.playerCards}
                        />
                    </View>
                    <View style={playScreenStyles({}).gameOutcome}>
                        <Text style={playScreenStyles({}).textStyles}>{gameState.gameOutcome}</Text>
                    </View>
                    <View style={playScreenStyles({scaledSize: scaledSize}).buttonRow}>
                        <AppPrimaryButton
                            text={'Hit'}
                            onPress={() => playerDrawCard()}
                            backgroundColor={gameState.isStaying ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
                            textColor={buttonTextColor}
                            isDisabled={gameState.isStaying}
                            width={(scaledSize.width / 3) - 32}
                        />
                        <AppPrimaryButton
                            text={'stay'}
                            onPress={async () => checkStatus()}
                            backgroundColor={gameState.isStaying ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
                            textColor={buttonTextColor}
                            isDisabled={gameState.isStaying}
                            width={(scaledSize.width / 3) - 32}
                        />
                        <AppPrimaryButton
                            text={'Play again'}
                            onPress={(): void => navigation.push(Routes.PlayScreen)}
                            backgroundColor={!gameState.isStaying ? buttonDisabledBackgroundColor : buttonActiveBackgroundColor}
                            textColor={buttonTextColor}
                            isDisabled={!gameState.isStaying}
                            width={(scaledSize.width / 3) - 32}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

