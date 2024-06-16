// react-native
import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';

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

const DemandeValidationView: React.FC<Props> = ({ materiel }) => {
    return (
        <View>
            <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]} >
                Demande de matériel : Particuliers
            </Text>

            <Text style={[Texts.textBodyPrimary, Texts.textBold, {marginBottom: 23}]}>
                Informations personnelles
            </Text>

            <Text style={[Texts.textSubtitle, Texts.textSemiBold, {marginBottom: 23}]}>
                Veuillez remplir les informations suivantes pour valider votre demande de matériel
            </Text>

            <View style={{ flexDirection: 'column', rowGap: 23 }}>
                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Adresse e-mail <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                    <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre adresse mail" />
                </View>
                
                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Nom <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                    <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre nom" />
                </View>
                
                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Prénom <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                    <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre prénom" />
                </View>
                
                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Téléphone <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                    <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre numéro de téléphone" />
                </View>

                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold]}>Matériel sélectionné</Text>
                    <MaterielComponent materiel={materiel} showPrice={true} disabled={true} />
                </View>

                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Remarques et questions</Text>
                    <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez vos remarques et questions" />
                </View>

                <View>
                    <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Conditions générales</Text>
                    <Text style={[Texts.textLink, {marginBottom: 5}]}>
                        •	Toute demande doit parvenir au moins 3 semaines à l'avance.{'\n'}
                        •	La réponse sera faite dans les meilleurs délais au plus tard 2 semaines avant la date demandée de réservation{'\n'}
                        •	Les associations sont prioritaires sur les particuliers. {'\n'}
                        •	Le particulier s’engage à venir chercher le matériel au local du comité des fêtes et le ramener en état à l'heure convenu avec le responsable du CdF de permanence, qui effectuera un état du matériel avant et après utilisation. Une caution de 250 euros est exigée ainsi que la photocopie d'une pièce d'identité.{'\n'}
                        •	En cas de dégradation, une facture sera présentée au particulier emprunteur pour rembourser les dégâts.{'\n'}
                        •	Le règlement de la location sera réalisé au retour du matériel (espèces ou chèque à l'ordre du comité des fêtes de Vaulx Milieu).{'\n'}
                        •	Le particulier s'engage à respecter les dispositions ci-dessus
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox value={true} onValueChange={() => {}} color={Colors.colorPrimary} />
                        <Text style={[Texts.textBodyPrimary, Texts.textSemiBold, {marginLeft: 5}]}>J'ai lu et j'accepte les conditions générales <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                    </View>
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', columnGap: 10 }}>
                    <TouchableOpacity style={{borderRadius: 8, backgroundColor: Colors.colorDanger, width: 100, height: 37, justifyContent: 'center'}}>
                        <Text style={[Texts.textBodyWhite, Texts.textBold, {textAlign: 'center'}]}>Annuler</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderRadius: 8, backgroundColor: Colors.colorSuccess, paddingHorizontal: 25, height: 37, justifyContent: 'center'}}>
                        <Text style={[Texts.textBodyWhite, Texts.textBold, {textAlign: 'center'}]}>Valider la réservation</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default DemandeValidationView;
