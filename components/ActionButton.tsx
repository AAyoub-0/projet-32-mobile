import { StyleSheet, TouchableOpacity, Text, Animated, Easing, StyleProp, ColorValue } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';

import * as Texts from '@/constants/Texts';
import * as Colors from '@/constants/Colors';
import { TextStyle } from "@expo/html-elements/build/primitives/Text";
import { ColorProperties } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type Props = {
    text: string;
    icon?: any;
    isLoading: boolean;
    style?: any;
    type?: 'success' | 'warning' | 'danger' | 'info' | 'default';
    onPress?: () => void;
}

const ActionButton: React.FC<Props> = ({ text, icon, isLoading, style, type = 'default', onPress }) => {
    const rotation = useRef(new Animated.Value(0)).current;

    let bgColor: ColorValue;
    let bgColorLight: ColorValue;

    switch (type) {
        case 'success':
            bgColor = Colors.colorSuccess;
            bgColorLight = Colors.colorSuccessLight;
            break;
        case 'warning':
            bgColor = Colors.colorWarning;
            bgColorLight = Colors.colorWarningLight;
            break;
        case 'danger':
            bgColor = Colors.colorDanger;
            bgColorLight = Colors.colorDangerLight;
            break;
        case 'info':
            bgColor = Colors.colorInfo;
            bgColorLight = Colors.colorInfoLight;
            break;
        default:
            bgColor = Colors.colorGray;
            bgColorLight = Colors.colorGrayLight;
            break;
    }

    const startRotation = () => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const stopRotation = () => {
        rotation.stopAnimation();
        rotation.setValue(0);
    };

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        if (!isLoading) {
            stopRotation();
        } else {
            startRotation();
        }
    }, [isLoading]);

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isLoading}
            style={
                [{backgroundColor: isLoading ? bgColorLight : bgColor,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: 10
            }, style]}
        >
            {text !== '' && (
                <Text style={[Texts.textSubtitle, Texts.textBold, { color: Colors.colorWhite }]}>
                    {text}
                </Text>
            )}
            
            {(icon && !isLoading) && (
                <FontAwesome name={icon} size={15} color={Colors.colorWhite} />
            )}
            {isLoading && (
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <FontAwesome name="circle-o-notch" size={15} color={Colors.colorWhite} />
                </Animated.View>
            )}
        </TouchableOpacity>
    );
}

export default ActionButton;
