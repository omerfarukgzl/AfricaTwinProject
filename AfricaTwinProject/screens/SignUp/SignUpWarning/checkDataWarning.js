import React from "react";
import { Text } from "react-native";
import * as Animatable from 'react-native-animatable';
import IconIo from 'react-native-vector-icons/Ionicons';
export function CheckDataWarning(text, check, styles) {
    return (
        check ?
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles} >
                    <IconIo
                        name='alert'
                        color='#760707'
                        size={25} />
                    {text} </Text>
            </Animatable.View>
            : null
    )
};