// react-native
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

// constants
import * as Colors from '../constants/Colors';
import * as Texts from '../constants/Texts';

// components
import Line from '../components/Line';
import TextInputFlat from '../components/TextInputFlat';

const ContactView = () => {
    return(
        <View>
            <Text style={[Texts.textTitle, Texts.textBold, { marginBottom: 15 }]}>Contactez nous</Text>

            <Text style={[Texts.textSubtitle, Texts.textBold]}>Vous souhaitez nous contacter ?</Text>
            <Text style={[Texts.textCaptionBlue, Texts.textSemiBold, { marginTop: 3 }]}>Remplissez le formulaire ci-dessous :</Text>
            <Line marginTop={3} marginBottom={23} width={'99%'} backgroundColor={Colors.colorBorderLight} rounded={true} align="center" />

            <TextInputFlat placeholder={"Entrez votre Nom"} border={[0, 1, 0, 0]} />
            <TextInputFlat placeholder={"Entrez votre prénom"} border={[0, 1, 0, 0]} />
            <TextInputFlat placeholder={"Entrez votre adresse mail"} border={[0, 1, 0, 0]} />
            <TextInputFlat placeholder={"Entrez l'objet du message"} border={[0, 1, 0, 0]} />
            <TextInputFlat height={300} placeholder={"Entrez votre message"} border={[0, 1, 0, 0]} multiline={true} numberOfLines={5} />

            <TouchableOpacity style={styles.submit}>
                <Text style={{ color: Colors.colorWhite }}>Envoyer</Text>
                <FontAwesome name="paper-plane" size={20} color={Colors.colorWhite} />
            </TouchableOpacity>
        </View>
    )
}
export default ContactView;

const styles = StyleSheet.create({
    submit: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 16,
        alignSelf: 'flex-end',
        backgroundColor: Colors.colorSuccess,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 23,
    }
})