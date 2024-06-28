// react-native
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import MaterielComponent from "@/components/MaterielComponent";

// models
import { Materiel } from "@/models/Materiel";

// Props
type Props = {
    materiels: Materiel[]
}

const GestionMaterielView: React.FC<Props> = ({ materiels }) => {

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[Texts.textTitle, Texts.textBold, {maxWidth: '70%'}]} >
                    Gérer le matériel
                </Text>

                <TouchableOpacity style={styles.ajoutBouton}>
                    <Text style={[Texts.textSubtitle, Texts.textBold, {color: Colors.colorWhite}]}>
                        Ajouter du matériel
                    </Text>
                    <FontAwesome name="plus" size={20} color={Colors.colorWhite} />
                </TouchableOpacity>
            </View>

            <Line margin={20} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
            <TextInputFlat placeholder="Rechercher du matériel" border={[1, 1, 1, 1]} borderRadius={8} rightIcon={'search'} />
            
            {materiels.map((materiel, index) => (
                    <MaterielComponent key={index} materiel={materiel} showPrice={true} />
                ))}
        </View> 
    )
}
export default GestionMaterielView;

const styles = StyleSheet.create({
    ajoutBouton: {
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        backgroundColor: Colors.colorSuccess,
    },
});