import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Routes} from "./routes";
import {Home} from "../../src/screens/home/HomeScreen";
import {PlayScreen} from "../../src/screens/playScreen/views/playScreen";
import {CardDeck} from "../type/deck";

const Stack = createNativeStackNavigator();
let routerOptions = {
    headerShown: false,
};

export function Router() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={routerOptions}
                    initialRouteName={Routes.PlayScreen}>
                    <Stack.Screen
                        name={Routes.PlayScreen}
                        component={PlayScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
