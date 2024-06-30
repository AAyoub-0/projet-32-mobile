// react-native
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams, Stack } from 'expo-router';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import ActionButton from "@/components/ActionButton";

// models
import { Materiel } from "@/models/Materiel";

const MaterielFormulaire: React.FC = () => {

    const { parameter } = useLocalSearchParams();
    
    const [titre, setTitre] = useState<string>('Ajouter du matériel');
    const [isChecked, setChecked] = React.useState(false);
    const [libelle, setLibelle] = React.useState('');
    const [prix, setPrix] = React.useState('1');
    const [nbExemplaires, setNbExemplaires] = React.useState('1');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (parameter) {
            const materielParsed = Materiel.fromJson(parameter as any);
            setLibelle(materielParsed.libelle);
            setPrix(materielParsed.prix.toString());
            setChecked(materielParsed.pourAssociation);
            setTitre('Modifier du matériel');
        }
    }, []);

    const onSubmitAsync = async () => {
        const materiel = new Materiel(0, libelle, parseInt(prix), isChecked, 0, 0, '');
        alert(`${materiel.libelle} - ${materiel.prix} - ${materiel.pourAssociation}`);
    }

    const HandleSaveAsync = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await onSubmitAsync();
        setIsLoading(false);
    }

    const HandleDeleteAsync = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
             <Stack.Screen options={
                {
                    headerTitle: titre,
                    headerBackTitle: 'Retour',
                }
            }> 
            </Stack.Screen>

            <View>
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', columnGap: 10 }}>
                        <Text style={[Texts.textTitle, Texts.textBold]} >
                            {titre}
                        </Text>
                        <ActionButton
                            text=""
                            icon="trash"
                            isLoading={isLoading}
                            onPress={HandleSaveAsync}
                            type="danger"
                        />
                    </View>
                    <Line marginBottom={20} marginTop={7} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
                                
                    <View style={{ flexDirection: 'column', rowGap: 23 }}>
                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Nom du matériel <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <TextInputFlat value={libelle} onChangeText={text => setLibelle(text)} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez le nom du matériel" />
                        </View>
                        
                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Prix de location <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <TextInputFlat value={prix} onChangeText={text => setPrix(text)} keyboardType="number-pad" border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez le prix de location" />
                        </View>

                        {titre === 'Ajouter du matériel' && (
                            <View>
                                <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Nombre d'exemplaires <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                                <TextInputFlat value={nbExemplaires} onChangeText={text => setNbExemplaires(text)} keyboardType="number-pad" border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez le nombre d'exemplaires" />
                            </View>
                        )}

                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Image <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez l'URL de l'image" />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox value={isChecked} onValueChange={setChecked}  />
                            <Text style={[Texts.textBody, Texts.textSemiBold, {marginLeft: 5}]}>Seulement pour les associations <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                        </View>

                        <ActionButton 
                        text="Enregistrer"
                        type="success"
                        icon="save"
                        style={{ alignSelf: 'flex-end' }} 
                        onPress={HandleSaveAsync} 
                        isLoading={isLoading} />
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}
export default MaterielFormulaire;


const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    },
});