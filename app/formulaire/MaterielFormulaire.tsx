// react-native
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Button, Image } from "react-native";
import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

// services
import { createMateriel, updateMateriel, deleteMateriel } from "@/services/MaterielService";

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

    const navigaion = useNavigation();

    const { parameter } = useLocalSearchParams();
    
    const [id, setId] = useState<number>(0)
    const [titre, setTitre] = useState<string>('Ajouter du matériel');
    const [isChecked, setChecked] = React.useState(false);
    const [libelle, setLibelle] = React.useState('');
    const [prix, setPrix] = React.useState('1');
    const [nbExemplaires, setNbExemplaires] = React.useState('1');
    const [nbExemplairesDispo, setNbExemplairesDispo] = React.useState('1');
    const [image, setImage] = useState<string>('');
    const [currentImage, setCurrentImage] = useState<string>('' as any)

    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
      };

    useEffect(() => {
        if (parameter) {
            const materielParsed = Materiel.fromJson(parameter as any);
            setLibelle(materielParsed.libelle);
            setPrix(materielParsed.prix.toString());
            setChecked(materielParsed.pourAssociation);
            setTitre('Modifier du matériel');
            setCurrentImage(materielParsed.imageUrl as string);
            setNbExemplaires(materielParsed.nbExemplaires.toString());
            setNbExemplairesDispo(materielParsed.nbExemplairesDisponibles.toString());
            setId(materielParsed.id);
        }
    }, []);

    const HandleSaveAsync = async () => {
        setIsLoading(true);
        try{
            await new Promise(resolve => setTimeout(resolve, 2000));

            const formData = new FormData();
            formData.append('libelle', libelle);
            formData.append('prix', prix);
            formData.append('pourAssociation', JSON.stringify(isChecked));
            formData.append('nbExemplaires', nbExemplaires);
            formData.append('nbExemplairesDispo', nbExemplairesDispo);
            
            if(image !== '') {
                formData.append('imageFile', {
                    uri: image,
                    name: 'image.jpg',
                    type: 'image/jpeg',
                } as any);
            }
            else{
                formData.append('imageFile', JSON.stringify(null));
            }
    
            if(titre === 'Ajouter du matériel') {
                await createMateriel(formData);
    
                alert('Materiel ajouté avec succès');
           
                navigaion.goBack();
                return;
            }
    
            // update materiel
            console.log('update materiel formulaire', id, formData);
            await updateMateriel(id, formData);

            alert('Materiel modifié avec succès');
        }
        catch(error) {
            console.error('Erreur lors de la sauvegarde du matériel:', error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const HandleDeleteAsync = async () => {
        if(id === 0) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await deleteMateriel(id);
        setIsLoading(false);

        navigaion.goBack();
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
                        {titre === 'Modifier du matériel' && (
                            <ActionButton
                            text=""
                            icon="trash"
                            isLoading={isLoading}
                            onPress={HandleDeleteAsync}
                            type="danger"
                        />)}
                        
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
                        
                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Nombre d'exemplaires <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <TextInputFlat value={nbExemplaires} onChangeText={text => setNbExemplaires(text)} keyboardType="number-pad" border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez le nombre d'exemplaires" />
                        </View>

                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Nombre d'exemplaires disponibles <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <TextInputFlat value={nbExemplairesDispo} onChangeText={text => setNbExemplairesDispo(text)} keyboardType="number-pad" border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez le nombre d'exemplaires disponibles" />
                        </View>

                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Image <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <Button title="Pick an image from camera roll" onPress={pickImage} />
                            <Image source={{ uri: (image != "" ? image : Materiel.apiImageUrl+currentImage) }} style={{ width: 100, height: 100 }} />
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