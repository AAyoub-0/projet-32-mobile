import { ColorValue, TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import * as Colors from '../constants/Colors';

type Props = {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
    multiline?: boolean;
    numberOfLines?: number;
    maxLength?: number;
    height?: number;
    autoFocus?: boolean;
    border?: Array<number>;
    borderLight?: boolean;
    borderRadius?: number;
    backgroundColor?: ColorValue;
    rightIcon?: any;
    leftIcon?: any;
    disabled?: boolean;
}

let _borderColors: ColorValue;

const TextInputFlat: React.FC<Props> = ({ placeholder, value, 
    onChangeText, secureTextEntry, keyboardType, border = [1, 1, 0, 0],
    multiline, numberOfLines, maxLength, height = undefined, autoFocus, borderLight = false,
    backgroundColor = Colors.colorWhite, borderRadius = 0, rightIcon, leftIcon, disabled }) => {
        
    if (borderLight) _borderColors = Colors.colorBorderLight;
    else _borderColors = Colors.colorWhite;

    if (!height) height = 50;
    let iconTop = height / 2 - 12;

    return (
        <View>
            {leftIcon && <FontAwesome name={leftIcon} size={24} color={Colors.colorGray} style={{position: 'absolute', right: 10, top: 15}} />}
            <TextInput
            style={{ height: height, borderColor: 'gray', 
                borderWidth: 1,
                borderTopColor: border[0] === 1 ? Colors.colorBorderLight : 'transparent', 
                borderBottomColor: border[1] === 1 ? Colors.colorBorderLight : 'transparent',
                borderLeftColor: border[2] === 1 ? Colors.colorBorderLight : 'transparent',
                borderRightColor: border[3] === 1 ? Colors.colorBorderLight : 'transparent',
                borderRadius: borderRadius,
                color: Colors.colorBlackLight,
                backgroundColor: backgroundColor, 
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 15}}
            placeholder={placeholder}
            placeholderTextColor={Colors.colorBlackLight2}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            autoFocus={autoFocus}
            editable={!disabled}
            />
            {rightIcon && <FontAwesome name={rightIcon} size={24} color={Colors.colorGray} style={{position: 'absolute', right: iconTop, top: iconTop}} />}
        </View>
    )
}
export default TextInputFlat;