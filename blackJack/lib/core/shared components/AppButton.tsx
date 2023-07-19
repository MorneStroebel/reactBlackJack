import {ColorValue, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import React from 'react';

type Props = {
    text: String;
    onPress: (event: GestureResponderEvent) => void;
    backgroundColor: ColorValue;
    textColor: ColorValue;
    isDisabled: boolean
    width: number
};
const AppPrimaryButton: React.FC<Props> = ({text, onPress, backgroundColor, textColor, isDisabled, width}) => {
    return (
        <TouchableOpacity style={styles(backgroundColor, textColor, width).buttonContainer} onPress={onPress} disabled={isDisabled}>
            <View
                style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flexGrow: 1,
                    flexWrap: 'wrap',
                }}>
                <Text style={styles(backgroundColor, textColor, width).buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles=(backgroundColor: ColorValue, textColor: ColorValue, width: number) => StyleSheet.create({
    buttonText: {
        fontSize: 24,
        color: textColor,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center',
        flexGrow: 1,
    },
    buttonContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: backgroundColor,
        minHeight: 60,
        width: width,
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
});

export default AppPrimaryButton;
