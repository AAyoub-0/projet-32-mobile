// react-native
import { View, Text, TouchableOpacity } from "react-native";

// constants
import * as Texts from '../constants/Texts';

// components
import TextInputFlat from '../components/TextInputFlat';
import MaterielComponent from "@/components/MaterielComponent";

// Models
import { Materiel } from '../models/Materiel';

// Props
type Props = {
    materiels: Materiel[]
}

const DemandeListeView: React.FC<Props> = ({ materiels }) => {
    return (
        <View>
            <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]} >
                Demande de matériel
            </Text>

            <Text style={[Texts.textSubtitle, Texts.textBold, {marginBottom: 23}]}>
                Les demandes de locations sont destinées uniquement aux habitants de Vaulx Milieu. Le matériel loué ne peut pas quitter la commune de Vaulx Milieu.
            </Text>

            <Text style={[Texts.textBodyPrimary, Texts.textBold, {marginBottom: 23}]}>
                Liste du matériel
            </Text>

            <View style={{marginBottom: 23}}>
                <View style={{ flexDirection: 'column', rowGap: 10 }}>
                    <Text style={[Texts.textBodySmall2, Texts.textSemiBold]}>
                        Sélectionnez le matériel souhaité
                    </Text>
                    <TextInputFlat rightIcon={'search'} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Rechercher un matériel" />
                </View>

                {materiels.map((materiel, index) => (
                    <MaterielComponent key={index} materiel={materiel} showPrice={true} />
                ))}
            </View>
        </View>
    )
}
export default DemandeListeView;
