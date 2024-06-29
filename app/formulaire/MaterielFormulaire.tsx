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

// models
import { Materiel } from "@/models/Materiel";

const MaterielFormulaire: React.FC = () => {

    const { parameter } = useLocalSearchParams();
    const [materiel, setMateriel] = useState<Materiel>(new Materiel(0, '', 1, false, 0, 0, ''));
    const [titre, setTitre] = useState<string>('Ajouter du matériel');
    const [isChecked, setChecked] = React.useState(materiel.pourAssociation);
    const [libelle, setLibelle] = React.useState(materiel.libelle);
    const [prix, setPrix] = React.useState('1');

    useEffect(() => {
        if (parameter) {
            const materielParsed = Materiel.fromJson(parameter as any);
            setMateriel(materielParsed);
            setLibelle(materielParsed.libelle);
            setPrix(materielParsed.prix.toString());
            setChecked(materielParsed.pourAssociation);
            setTitre('Modifier du matériel');
        }
    }, []);

    const onSubmitAsync = async () => {
        materiel.libelle = libelle;
        materiel.prix = parseFloat(prix);
        materiel.pourAssociation = isChecked;
        alert(`${materiel.libelle} - ${materiel.prix} - ${materiel.pourAssociation}`);
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
                <ScrollView style={styles.container}>
                    <Text style={[Texts.textTitle, Texts.textBold]} >
                        {titre}
                    </Text>
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

                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Image <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <TextInputFlat border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez l'URL de l'image" />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox value={isChecked} onValueChange={setChecked}  />
                            <Text style={[Texts.textBody, Texts.textSemiBold, {marginLeft: 5}]}>Seulement pour les associations <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', columnGap: 10 }}>
                            <TouchableOpacity style={{borderRadius: 8, backgroundColor: Colors.colorDanger, width: 100, height: 37, justifyContent: 'center'}}>
                                <Text style={[Texts.textBodyWhite, Texts.textBold, {textAlign: 'center'}]}>Annuler</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onSubmitAsync} style={{borderRadius: 8, backgroundColor: Colors.colorSuccess, paddingHorizontal: 25, height: 37, justifyContent: 'center'}}>
                                <Text style={[Texts.textBodyWhite, Texts.textBold, {textAlign: 'center'}]}>Ajouter</Text>
                            </TouchableOpacity>
                        </View>
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