import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import * as Texts from '@/constants/Texts';
import * as Colors from '@/constants/Colors';

type Props = {
    text: string;
    icon: any;
    onPress: () => void;
}

const Box: React.FC<Props> = ({ text, icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.box} onPress={onPress}>
            <FontAwesome name={icon} size={37} color={Colors.colorBlackLight} />
            <Text style={[Texts.textBodySmall2, Texts.textBold, {color: Colors.colorBlackLight}]}>{ text }</Text>
        </TouchableOpacity>
    )
}
export default Box;

const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minWidth: '30%',
        rowGap: 12,
        backgroundColor: Colors.colorWhite,
        shadowColor: Colors.colorBorder,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});