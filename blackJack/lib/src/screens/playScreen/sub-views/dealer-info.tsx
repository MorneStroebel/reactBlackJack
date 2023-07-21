import {playScreenStyles} from "../styles/playScreenStyles";
import {Image, Text, View} from "react-native";
import {GenerateCard} from "../../../../core/data/generateCard";
import React from "react";
import {Card} from "../../../../core/type/card";

type DealerInfoProps = {
    dealerCards: Card[],
    showAll: boolean,
    dealerScore: number
}
export const DealerInfo = ({dealerCards, showAll, dealerScore}: DealerInfoProps) => {
    return(
        <View style={playScreenStyles({}).dealerInfo}>
            <Text style={playScreenStyles({}).textStyles}>Dealer total: {dealerScore}</Text>
            <Text style={playScreenStyles({}).textStyles}>Dealer Cards:</Text>
            <View style={playScreenStyles({}).cardBox}>
                {
                    dealerCards.map((card, index) =>
                        <GenerateCard key={index} card={card} index={index}/>
                    )
                }
                {
                    showAll
                        ? <Image key={1}
                                 source={require('blackJack/assets/images/cardBackRed.png')}
                                 style={[playScreenStyles({index: 1}).imageStack]}
                                 resizeMode={'cover'}
                                 borderRadius={10}
                        />
                        : null
                }
            </View>
        </View>
    );
}
