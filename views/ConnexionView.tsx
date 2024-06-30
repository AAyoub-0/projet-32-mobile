// react-native
import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

// components
import TextInputFlat from '../components/TextInputFlat';
import ActionButton from "@/components/ActionButton";

// constants
import * as Texts from '../constants/Texts';

const ConnexionView = () => {

    const [isLoading, setIsLoading] = useState(false);

    const SubmitAsync = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    }

    return (
        <View>
            <Image style={{ alignSelf: 'center' }} source={require('@/assets/images/logo-couleur.png')} />

            <View style={{ flexDirection: 'column', rowGap: 23, marginTop: 33 }}>
            <Text style={[Texts.textTitle, Texts.textSemiBold, {textAlign: 'center'}]}>Connexion</Text>

            <View>
                <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Identifiant <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre identifiant" />
            </View>

            <View>
                <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Mot de passe <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre mot de passe" />
                <TouchableOpacity style={{ alignSelf: 'center'}}>
                <Text style={[Texts.textLink, Texts.textBold, {marginTop: 10}]}>Mot de passe oublié ?</Text>
                </TouchableOpacity>
            </View>

            <ActionButton text="Connexion" type="success" isLoading={isLoading} onPress={SubmitAsync} style={{ marginTop: 23 }} />
            </View>
        </View>
    )
}
export default ConnexionView;