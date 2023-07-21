import {Text, View} from "react-native";
import {playScreenStyles} from "../styles/playScreenStyles";
import {GenerateCard} from "../../../../core/data/generateCard";
import React from "react";
import {Card} from "../../../../core/type/card";

type PlayerInfoProps = {
    playerScore: number,
    playerCards: Card[],
}

export const PlayerInfo = ({playerScore, playerCards}: PlayerInfoProps) => {
    return (
        <View style={playScreenStyles({}).playerInfo}>
            <Text style={playScreenStyles({}).textStyles}>My total: {playerScore}</Text>
            <Text style={playScreenStyles({}).textStyles}>My Cards:</Text>
            <View style={playScreenStyles({}).cardBox}>
                {
                    playerCards.map((card, index) =>
                        <GenerateCard key={index} card={card} index={index}/>
                    )
                }
            </View>
        </View>
    );
}
