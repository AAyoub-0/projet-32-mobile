import { ColorValue, TextInput } from 'react-native';

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
    backgroundColor?: ColorValue;
}

let _borderColors: ColorValue;

const TextInputFlat: React.FC<Props> = ({ placeholder, value, 
    onChangeText, secureTextEntry, keyboardType, border = [1, 1, 0, 0],
    multiline, numberOfLines, maxLength, height = undefined, autoFocus, borderLight = false,
    backgroundColor = Colors.colorWhite }) => {
        
    if (borderLight) _borderColors = Colors.colorBorderLight;
    else _borderColors = Colors.colorWhite;

    return (
        <TextInput
            style={{ height: height, borderColor: 'gray', 
                borderWidth: 1,
                borderTopColor: border[0] === 1 ? Colors.colorBorderLight : 'transparent', 
                borderBottomColor: border[1] === 1 ? Colors.colorBorderLight : 'transparent',
                borderLeftColor: border[2] === 1 ? Colors.colorBorderLight : 'transparent',
                borderRightColor: border[3] === 1 ? Colors.colorBorderLight : 'transparent',
                color: Colors.colorBlackLight,
                backgroundColor: backgroundColor, 
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
        />
    )
}
export default TextInputFlat;