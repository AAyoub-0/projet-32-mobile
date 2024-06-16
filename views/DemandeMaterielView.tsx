// react-native
import { View, Text, TouchableOpacity } from "react-native";

// constants
import * as Colors from '../constants/Colors';
import * as Texts from '../constants/Texts';

// components
import TextInputFlat from '../components/TextInputFlat';
import MaterielComponent from "@/components/MaterielComponent";

// models
import { Materiel } from "../models/Materiel";

// Props
type Props = {
    materiel: Materiel
}

const DemandeMaterielView: React.FC<Props>  = ({ materiel }) => {
    return (
        <View>
            <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]} >
                    Demande de matériel : Particuliers
            </Text>

            <Text style={[Texts.textBodyPrimary, Texts.textBold, {marginBottom: 23}]}>
                Matériel souhaité
            </Text>

            <Text style={[Texts.textSubtitle, Texts.textSemiBold, {marginBottom: 23}]}>
                Veuillez remplir les informations suivantes pour votre demande de matériel
            </Text>

            <View style={{ flexDirection: 'column', rowGap: 23 }}>
                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold]}>Matériel choisi</Text>
                    <MaterielComponent materiel={materiel} showPrice={true} disabled={true} />
                </View>
                
                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Quantité souhaitée <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                    <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez la quantité souhaitée" />
                </View>
                
                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Date de réservation souhaitée <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                    <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez la date de réservation souhaitée" />
                </View>
                
                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Date de rendu souhaitée <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                    <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez la date de rendu souhaitée" />
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', columnGap: 10 }}>
                    <TouchableOpacity style={{borderRadius: 8, backgroundColor: Colors.colorDanger, width: 100, height: 37, justifyContent: 'center'}}>
                        <Text style={[Texts.textBodyWhite, Texts.textBold, {textAlign: 'center'}]}>Retour</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderRadius: 8, backgroundColor: Colors.colorSuccess, width: 100, height: 37, justifyContent: 'center'}}>
                        <Text style={[Texts.textBodyWhite, Texts.textBold, {textAlign: 'center'}]}>Suivant</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View> 
    )
}
export default DemandeMaterielView;
