// react-native
import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

import { FontAwesome } from "@expo/vector-icons";

// constants
import * as Colors from '../constants/Colors';
import * as Texts from '../constants/Texts';

// components
import Line from '../components/Line';
import TextInputFlat from '../components/TextInputFlat';
import ActionButton from "@/components/ActionButton";
import { A } from "@expo/html-elements";

const ContactView = () => {

    const [isLoading, setIsLoading] = useState(false)

    const SubmitAsync = async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsLoading(false)
    }

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

            <ActionButton text="Envoyer" icon={"send"} type="success" isLoading={isLoading} style={styles.submit} onPress={SubmitAsync} />
        </View>
    )
}
export default ContactView;

const styles = StyleSheet.create({
    submit: {
        alignSelf: 'flex-end',
        borderRadius: 8,
        marginTop: 23,
    }
})