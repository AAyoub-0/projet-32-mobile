import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import * as Colors from '../constants/Colors';
import * as Texts from '../constants/Texts';

import Line from './Line';

import { Evenement } from '../models/Evenement';

type Props = {
    evenement: Evenement;
    disabled?: boolean;
    onPress?: () => void;
}

const ActualiteFuture: React.FC<Props> = ({ evenement, disabled, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} disabled={disabled} onPress={onPress}>
            <View style={styles.date}>
                <Text style={[Texts.textNumberBig, Texts.textSemiBold]}>{ evenement.getJour() }</Text>
                <Text style={[Texts.textTitleBlue, Texts.textSemiBold, {maxWidth: 60}]}>{ evenement.getMois() }</Text>
            </View>
            <Line margin={10} height={'100%'} backgroundColor={Colors.colorBorderLight} rounded={true} orientation="vertical" />
            <Text style={[Texts.textBodySmall2, Texts.textSemiBold, {flex: 1}]}>
                { evenement.nom }
            </Text>
        </TouchableOpacity>
    )
}
export default ActualiteFuture;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.colorWhite,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        shadowColor: Colors.colorBlack,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        borderRadius: 8,
    },
    date:{
        marginRight: 12,
        minWidth: 60,
    }
});