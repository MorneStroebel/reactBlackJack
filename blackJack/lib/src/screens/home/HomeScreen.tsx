import {ActivityIndicator, Button, SafeAreaView, Text} from "react-native";
import {Routes} from "../../../core/navigation/routes";
import {CardLogic} from "../../../core/data/cardLogic";
import {CardDeck} from "../../../core/type/deck";
import {useEffect, useState} from "react";
import {NavigatorScreenParams} from "@react-navigation/native";


export const Home = ({navigation}) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [cardDeck, setCardDeck] = useState<CardDeck>({} as CardDeck)
    useEffect(() => {
        new CardLogic().getShuffledPlayDeck(6).then((newDeck: CardDeck) => {
            setCardDeck(newDeck)
            setLoading(false)
        })

    })
    return (
        <SafeAreaView>
            {isLoading
                ? <ActivityIndicator/>
                : <Button title={'Play'} onPress={() => navigation.navigate(Routes.PlayScreen, {cardDeck: cardDeck})}/>
            }
        </SafeAreaView>
    );
}
