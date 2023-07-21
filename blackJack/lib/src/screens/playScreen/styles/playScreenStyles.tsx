import {EdgeInsets} from "react-native-safe-area-context";
import {ScaledSize, StyleSheet} from "react-native";

type StyleProps = {
    index?: number
    insets?: EdgeInsets,
    scaledSize?: ScaledSize,
}
export const playScreenStyles = (styleProps: StyleProps) => {
    return StyleSheet.create({
        textStyles: {
            color: '#f7ecdc',
            fontSize: 18
        },
        imageStack: {
            height: 150,
            width: 80,
            position: 'absolute',
            right: -styleProps.index * 20,
            backgroundColor: 'white',
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: 'black',
            padding: 16
        },
        mainView: {
            paddingTop: styleProps.insets?.top,
            paddingBottom: styleProps.insets?.bottom,
            height: styleProps.scaledSize?.height,
            width: styleProps.scaledSize?.width,
        },
        playArea: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '85%',
            paddingHorizontal: 20,
        },
        cardBox: {
            height: 150,
            width: '100%',
            alignSelf: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            paddingTop: 20
        },
        dealerInfo: {
            alignItems: 'center',
            alignSelf: 'center',
            top: 0,
            position: 'absolute'
        },
        playerInfo: {
            alignItems: 'center',
            alignSelf: 'center',
            bottom: 0,
            position: 'absolute'
        },
        gameOutcome: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10
        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            width: styleProps.scaledSize?.width
        },
        flex1: {
            flex: 1
        }

    });
};
