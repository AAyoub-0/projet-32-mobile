import { StyleSheet, View, Text, Image } from "react-native";

import * as Texts from '../constants/Texts';
import * as Colors from '../constants/Colors';

import { Materiel } from '../models/Materiel';

type Props = {
    materiel: Materiel
}

const MaterielComponent: React.FC<Props> = ({ materiel }) => {
    return (
        <View style={styles.materiel}>
            <Image style={{ width: 97, height: 94, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} 
                    source={{ uri: materiel.imageUrl }} />
            <View style={{ justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                <Text style={[Texts.textBody, Texts.textSemiBold]}>{materiel.libelle}</Text>
                <Text style={[Texts.textCaption, Texts.textSemiBold]}>Quantité : {materiel.nbExemplairesDisponibles}</Text>
            </View>
        </View>
    )
}
export default MaterielComponent;

const styles = StyleSheet.create({
    materiel: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: Colors.colorWhite,
        borderRadius: 8,
        shadowColor: Colors.colorBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});