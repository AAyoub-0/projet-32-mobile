import { StyleSheet, TouchableOpacity, Text, ColorValue } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import * as Texts from '@/constants/Texts';
import * as Colors from '@/constants/Colors';

type Props = {
    text: string;
    bgColor?: ColorValue;
    color?: ColorValue;
    icon?: any;
    onPress?: () => void;
}

const Chip: React.FC<Props> = ({ text, bgColor, color, icon, onPress }) => {
    return (
        <TouchableOpacity style={[styles.chip, {backgroundColor: bgColor}]} onPress={onPress}>
            <Text style={[Texts.textBody, Texts.textSemiBold, { color: color }]}>{text}</Text>
        </TouchableOpacity>
    )
}
export default Chip;

const styles = StyleSheet.create({
    chip: {
        padding: 4,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    }
});