import {Card} from "../type/card";
import {ColorValue, StyleSheet, Text, View} from "react-native";
import React from "react";
import {GestureResponderEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {styles} from "../../src/screens/playScreen/views/playScreen";

type Props = {
    card: Card,
    index: number
};
export const GenerateCard: React.FC<Props> = ({card, index}) => {
    return (
        <View style={styles({index: index}).imageStack}>
            <Text>{card.faceValue}</Text>
            <Text>{card.suitValue}</Text>
        </View>
    );
}


