import { StyleSheet, View, Text, Image } from "react-native";
import * as Texts from '../constants/Texts';
import { Evenement } from '../models/Evenement';

type Props = {
    evenement: Evenement;
}

const DernieresActualite: React.FC<Props> = ({ evenement }) => {
    return (
        <View style={styles.container}>
            <Image style={{width: '40%', height: 100}} source={{ uri: evenement.imageUrl }}  />
            <View style={styles.body}>
                <Text style={[Texts.textBodySmall, Texts.textSemiBold, {marginTop: 10}]}>{ evenement.nom }</Text>
                <Text style={[Texts.textCaption, Texts.textSemiBold]}>{ evenement.getMois() + ' ' + evenement.getAnnee() }</Text>
            </View>
        </View>
    )
}
export default DernieresActualite;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        columnGap: 10,
    },
    body: {
        flex: 1,
    }
});