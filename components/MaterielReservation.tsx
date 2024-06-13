import { StyleSheet, View, Text, StyleProp } from "react-native";

import * as Texts from '../constants/Texts';
import * as Colors from '../constants/Colors';


type Props = {
    text: string;
    style?: StyleProp<any>;
}

const MaterielReservation: React.FC<Props> = ({ text, style = {} }) => {
    return (
        <View style={[styles.reservationBoutton, style]}>
            <Text style={[Texts.textBodySmall, Texts.textBold, {color: Colors.colorPrimary}]}>
                { text }
            </Text>
            <Text style={[Texts.textBig, Texts.textBold, {
                backgroundColor: Colors.colorWarning,
                padding: 5,
                position: 'absolute',
                right: 10,
                bottom: -5,
                shadowColor: Colors.colorBlack,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 1.025,
                }]}>
                Réserver {">"}
            </Text>
        </View>
    )
}
export default MaterielReservation;

const styles = StyleSheet.create({
    reservationBoutton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.colorWhite,
        borderColor: Colors.colorBorder,
        borderWidth: 1,
        height: 50,
    },
});