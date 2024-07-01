// react-native
import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

// services
import { 
  deleteEvenement, 
  updateEvenement, 
  createEvenement 
} from "@/services/EvenementService";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import ActionButton from "@/components/ActionButton";

// models
import { Evenement } from "@/models/Evenement";

const EvenementFormulaire: React.FC = () => {

    const navigation = useNavigation();

    const { parameter } = useLocalSearchParams();

    const [titre, setTitre] = useState<string>('Ajouter un événement');
    const [nom, setNom] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [lieu, setLieu] = React.useState('');
    const [commentaire, setCommentaire] = React.useState('');
    const [id, setId] = React.useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (parameter) {
            const evenementParsed = Evenement.fromJson(parameter as any);
            evenementParsed.date = new Date(evenementParsed.date);
            setNom(evenementParsed.nom);
            setDate(evenementParsed.date);
            setLieu(evenementParsed.lieu);
            setCommentaire(evenementParsed.commentaire);
            setTitre('Modifier un événement');
            setId(evenementParsed.id);
        }
    }, []);

    let DateTimePickerComponent1;
    if (Platform.OS === 'android') {
      DateTimePickerComponent1 = require('@react-native-community/datetimepicker').DateTimePickerAndroid;
    } else {
      DateTimePickerComponent1 = require('@react-native-community/datetimepicker').default;
    }

    const ShowDate = () => {
        if (Platform.OS === 'android') {
          DateTimePickerComponent1.open({
            value: date,
            onChange: (_: any, selectedDate: Date) => {
              const currentDate = selectedDate || date;
              setDate(currentDate);
            },
            mode: 'date',
            locale: 'fr'
          });
        } else {
            setShowDate(true);
        }
    };

    const HandleDeleteAsync = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        try{
          await deleteEvenement(id);
          alert('Evénement supprimé avec succès');
          navigation.goBack();
        }
        catch(error){
          alert('Erreur lors de la suppression de l\'événement');
        }
        finally{
          setLoading(false);
        }
    }

    const HandleSaveAsync = async () => {
        setLoading(true);
        if(!validateForm()) {setLoading(false); return;}
        await new Promise(resolve => setTimeout(resolve, 2000));
        try{
          if(titre === 'Ajouter un événement'){
            await createEvenement(new Evenement(0, nom, date, lieu, commentaire, false));
            alert('Evénement ajouté avec succès');
            navigation.goBack();
          } else {
            await updateEvenement(new Evenement(id, nom, date, lieu, commentaire, false));
            alert('Evénement modifié avec succès');
          }
        }
        catch(error){
          alert('Erreur lors de l\'enregistrement de l\'événement');
        }
        finally{
          setLoading(false);
        }
    }

    const validateForm = () => {
        if(nom === '' && lieu === '' && commentaire === '') {alert('Veuillez remplir tous les champs obligatoires'); return false};

        if(nom === '') {alert('Le nom de l\'événement est obligatoire'); return false};
        if(lieu === '') {alert('Le lieu de l\'événement est obligatoire'); return false};
        if(commentaire === '') {alert('Le commentaire de l\'événement est obligatoire'); return false};

        if (date === null) {alert('La date de l\'événement est obligatoire'); return false}
        if(date <= new Date()) {alert('La date de l\'événement doit être supérieure à la date actuelle'); return false}

        return true;
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[Texts.textTitle, Texts.textBold, {maxWidth: '70%'}]} >
                    {titre}
                </Text>
                {titre === 'Modifier un événement' && (
                  <ActionButton text="" icon="trash" type="danger" onPress={HandleDeleteAsync} isLoading={loading} />
                )}
              </View>
              
              <Line margin={20} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />

              <View style={{ flexDirection: 'column', rowGap: 23 }}>
                <View>
                  <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Nom de l'événement <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                  <TextInputFlat value={nom} onChangeText={text => setNom(text)} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez le nom de l'événement" />
                </View>

                <View>
                  <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Date de l'événement <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                  {Platform.OS === 'android' && (
                        <TouchableOpacity onPress={ShowDate}>
                            <Text>Changer la date de l'événement</Text>
                        </TouchableOpacity>
                      )}
                    {Platform.OS !== 'android' && (
                        <DateTimePickerComponent1
                          style={{alignSelf: 'flex-start'}}
                          value={date}
                          mode="date"
                          display="default"
                          locale="fr"
                          onChange={(_: any, selectedDate: Date) => {
                              const currentDate = selectedDate || date;
                            setShowDate(false);
                            setDate(currentDate);}}/>)}
                </View>

                <View>
                  <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Lieu de l'événement <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                  <TextInputFlat value={lieu} onChangeText={text => setLieu(text)} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez le lieu de l'événement" />
                </View>

                <View>
                  <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Commentaire <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                  <TextInputFlat value={commentaire} onChangeText={text => setCommentaire(text)} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez un commentaire" />
                </View>
                
                  <ActionButton style={{ alignSelf: 'flex-end' }} text="Enregistrer" icon="save" type="success" onPress={HandleSaveAsync} isLoading={loading} />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
    )
}
export default EvenementFormulaire;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    }
});