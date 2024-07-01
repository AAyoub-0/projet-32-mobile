// react-native
import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

// services
import { createContact } from "@/services/ContactService";

import { FontAwesome } from "@expo/vector-icons";

// constants
import * as Colors from '../constants/Colors';
import * as Texts from '../constants/Texts';

// components
import Line from '../components/Line';
import TextInputFlat from '../components/TextInputFlat';
import ActionButton from "@/components/ActionButton";

// models
import { Contact } from "@/models/Contact";

const ContactView = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const SubmitAsync = async () => {
        setIsLoading(true)
        try{
            await createContact(new Contact(
                0,
                name,
                firstName,
                email,
                message
            ))
            alert('Votre message a bien été envoyé !')
            setName('')
            setFirstName('')
            setEmail('')
            setMessage('')
        }
        catch(error){
            console.error('Erreur lors de la création du contact:', error);
        }
        finally{
            setIsLoading(false)
        }
    }

    const validate = () => {
        if(name === '' && firstName === '' && email === '' && message === ''){
            alert('Veuillez remplir tous les champs')
            return false
        }

        if(name === ''){
            alert('Veuillez renseigner votre nom')
            return false
        }
        if(firstName === ''){
            alert('Veuillez renseigner votre prénom')
            return false
        }
        if(email === ''){
            alert('Veuillez renseigner votre adresse mail')
            return false
        }
        if(message === ''){
            alert('Veuillez renseigner votre message')
            return false
        }

        if(RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).test(email) === false){
            alert('Veuillez renseigner une adresse mail valide')
            return false
        }

        return true
    }

    return(
        <View>
            <Text style={[Texts.textTitle, Texts.textBold, { marginBottom: 15 }]}>Contactez nous</Text>

            <Text style={[Texts.textSubtitle, Texts.textBold]}>Vous souhaitez nous contacter ?</Text>
            <Text style={[Texts.textCaptionBlue, Texts.textSemiBold, { marginTop: 3 }]}>Remplissez le formulaire ci-dessous :</Text>
            <Line marginTop={3} marginBottom={23} width={'99%'} backgroundColor={Colors.colorBorderLight} rounded={true} align="center" />

            <TextInputFlat value={name} onChangeText={(text) => setName(text)} placeholder={"Entrez votre Nom"} border={[0, 1, 0, 0]} />
            <TextInputFlat value={firstName} onChangeText={(text) => setFirstName(text)} placeholder={"Entrez votre prénom"} border={[0, 1, 0, 0]} />
            <TextInputFlat value={email} onChangeText={(text) => setEmail(text)} placeholder={"Entrez votre adresse mail"} border={[0, 1, 0, 0]} />
            <TextInputFlat value={message} onChangeText={(text) => setMessage(text)} height={300} placeholder={"Entrez votre message"} border={[0, 1, 0, 0]} multiline={true} numberOfLines={5} />

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