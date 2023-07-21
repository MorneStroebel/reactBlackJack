import {Card} from "../type/card";
import {ColorValue, StyleSheet, Text, View} from "react-native";
import React from "react";
import {GestureResponderEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {styles} from "../../src/screens/playScreen/views/playScreen";
import {playScreenStyles} from "../../src/screens/playScreen/styles/playScreenStyles";

type Props = {
    card: Card,
    index: number
};
export const GenerateCard: React.FC<Props> = ({card, index}) => {
    return (
        <View style={playScreenStyles({index: index}).imageStack}>
            <Text>{card.faceValue}</Text>
            <Text>{card.suitValue}</Text>
        </View>
    );
}


