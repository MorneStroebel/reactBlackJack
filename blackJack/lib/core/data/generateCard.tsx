import {Card} from "../type/card";
import {ColorValue, StyleSheet, Text, View} from "react-native";
import React from "react";
import {GestureResponderEvent} from "react-native/Libraries/Types/CoreEventTypes";

type Props = {
    card: Card,
    height: number,
    width: number
};
export const GenerateCard: React.FC<Props> = ({card, height, width}) => {
    return (
        <View style={CardStyles(height, width).cardStyle}>
            <Text>{card.numericValue}</Text>
            <Text>{card.suitValue}</Text>
        </View>
    );
}

export const CardStyles = (height: number, width: number) => StyleSheet.create({
    cardStyle: {
        height: height,
        width: width,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
})
