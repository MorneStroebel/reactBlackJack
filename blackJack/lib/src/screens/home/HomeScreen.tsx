import {ActivityIndicator, Button, SafeAreaView, Text} from "react-native";
import {Routes} from "../../../core/navigation/routes";
import {CardLogic} from "../../../core/data/cardLogic";
import {CardDeck} from "../../../core/type/deck";
import {useEffect, useState} from "react";

export function Home({navigation}) {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [cardDeck, setCardDeck] = useState<CardDeck>({} as CardDeck)
    useEffect(() => {
        getDeck().then(() => setLoading(false))
    })
    return (
        <SafeAreaView>
            {isLoading
                ? <ActivityIndicator/>
                : <Button title={'Play'} onPress={() => navigation.navigate(Routes.PlayScreen, {cardDeck: cardDeck})}/>
            }
        </SafeAreaView>
    )
    async function getDeck() {
        await new CardLogic().getShuffledPlayDeck(6).then(result => setCardDeck(result));
    }

}
