import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import * as Texts from '../constants/Texts';
import * as Colors from '../constants/Colors';

import { Materiel } from '../models/Materiel';

type Props = {
    materiel: Materiel,
    showPrice?: boolean,
    disabled?: boolean,
    onPress?: () => void
}

const MaterielComponent: React.FC<Props> = ({ materiel, showPrice, disabled, onPress }) => {

    if (materiel == undefined) {
        return null;
    }
    
    const imageUri = materiel.imageUrl != undefined ? materiel.imageUrl : 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg';

    return (
        <TouchableOpacity style={styles.materiel} disabled={disabled} onPress={onPress}>
            <Image style={{ width: 97, height: 94, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} 
                    source={{ uri: imageUri }} />
            <View style={{ justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8, flex: 1 }}>
                <Text style={[Texts.textBody, Texts.textSemiBold]}>
                    {materiel.libelle}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[Texts.textCaption, Texts.textSemiBold]}>
                        Quantité : {materiel.nbExemplairesDisponibles}
                    </Text>
                    <Text style={[Texts.textCaptionBlue, Texts.textSemiBold]}>
                    {(showPrice && materiel.prix) && 
                        (`Prix : ${materiel.prix} € / Weekend`)
                    }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
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