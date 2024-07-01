// react-native
import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, StyleSheet  } from "react-native";
import {Picker} from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import Checkbox from 'expo-checkbox';
import { useNavigation } from 'expo-router';

// services
import { patchReservation } from '@/services/ReservationService';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import ActionButton from "@/components/ActionButton";

// models
import { Reservation } from "@/models/Reservation";
import { ReservationMateriel } from "@/models/ReservationMateriel";
import { Association } from "@/models/Association";
import { Particulier } from "@/models/Particulier";
import { ReservationCreation } from "@/models/ReservationCreation";

const ReservationFormulaire: React.FC = () => {

    const navigation = useNavigation();

    const { parameter } = useLocalSearchParams();

    const [reservationMateriels, setReservationMateriels] = useState<string[]>([]);
    const [dateReservation, setDateReservation] = React.useState<Date>(new Date());
    const [statutReservation, setStatutReservation] = React.useState('En cours');
    const [dateRetour, setDateRetour] = React.useState<Date>(new Date());
    const [showDateReservation, setShowDateReservation] = useState(false);
    const [showDateRetour, setShowDateRetour] = useState(false);
    const [estSupprimee, setEstSupprimee] = React.useState(false);
    const [titre, setTitre] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [association, setAssociation] = useState<Association | null>(null);
    const [particulier, setParticulier] = useState<Particulier | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (parameter) {
            const reservationParsed = ReservationMateriel.fromJson(parameter as any);
            console.log('parameter', (parameter as any));
            reservationParsed.reservation.dateReservation = new Date(reservationParsed.reservation.dateReservation);
            reservationParsed.reservation.dateRetour = new Date(reservationParsed.reservation.dateRetour);
            
            const reservationMaterielsString: string[] = [];

            reservationParsed.reservation.reservationMateriels.forEach((reservationMateriel: any) => {
                reservationMaterielsString.push('/api/reservation_materiels/' + reservationMateriel.id);
            });

            setReservationMateriels(reservationMaterielsString);

            setDateReservation(reservationParsed.reservation.dateReservation as Date);
            setStatutReservation(reservationParsed.reservation.statutReservation);
            setDateRetour(reservationParsed.reservation.dateRetour as Date);
            setId(reservationParsed.reservation.id as number);
            
            if(reservationParsed.reservation.association) {
                const association = Association.fromJson(reservationParsed.reservation.association);
                setAssociation(association);
                setTitre(association.nom);
            } 
            else if(reservationParsed.reservation.particulier) {
                const particulier = Particulier.fromJson(reservationParsed.reservation.particulier);
                setParticulier(particulier);
                setTitre(particulier.nom + ' ' + particulier.prenom);
            }
            else {
                setTitre('Inconnu');
            }
        }
    }, []);


    let DateTimePickerComponent;
    if (Platform.OS === 'android') {
      DateTimePickerComponent = require('@react-native-community/datetimepicker').DateTimePickerAndroid;
    } else {
      DateTimePickerComponent = require('@react-native-community/datetimepicker').default;
    }

    const ShowDateReservation = () => {
        if (Platform.OS === 'android') {
          DateTimePickerComponent.open({
            value: dateReservation,
            onChange: (_: any, selectedDate: Date) => {
              const currentDate = selectedDate || dateReservation;
              setDateReservation(currentDate);
            },
            mode: 'date',
            locale: 'fr'
          });
        } else {
            setShowDateReservation(true);
        }
    };

    const ShowDateRetour = () => {
        if (Platform.OS === 'android') {
            DateTimePickerComponent.open({
            value: dateRetour,
            onChange: (_: any, selectedDate: Date) => {
                const currentDate = selectedDate || dateRetour;
                setDateRetour(currentDate);
            },
            mode: 'date',
            locale: 'fr'
            });
        } else {
            setShowDateRetour(true);
        }
    };

    const HandleDeleteAsync = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        try{
            await patchReservation(new ReservationCreation(
                dateReservation,
                dateRetour,
                reservationMateriels,
                'Supprimée',
                association ? '/api/associations/' + association?.id : null,
                particulier ? '/api/particuliers/' + particulier?.id : null
            ), id);
            alert('La réservation a été supprimée avec succès');
            navigation.goBack();
        }
        catch(error){
            console.error(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    const HandleSaveAsync = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        try{

            setIsLoading(true);
            await patchReservation(new ReservationCreation(
                dateReservation,
                dateRetour,
                reservationMateriels,
                statutReservation,
                association ? '/api/associations/' + association?.id : null,
                particulier ? '/api/particuliers/' + particulier?.id : null
            ), id);
            alert('La réservation a été modifiée avec succès');
        }
        catch(error){
            console.error(error);
        }
        finally{
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={
                {
                    headerTitle: 'Modifier la réservation',
                    headerBackTitle: 'Retour',
                }
            }>
            </Stack.Screen>

            <View>
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>

                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[Texts.textTitle, Texts.textBold]} >
                        Modifier la réservation n°{id}
                    </Text>
                    <ActionButton text="" icon="trash" type="danger" onPress={HandleDeleteAsync} isLoading={isLoading} />
                  </View>
              
                  <Line marginBottom={20} marginTop={7} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
                              
                  <View style={{ flexDirection: 'column', rowGap: 23 }}>

                      <View>
                          <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Créateur </Text>
                          <Text style={[Texts.textBody, Texts.textSemiBold]}>{titre}</Text>
                          <Text style={[Texts.textLabel, Texts.textSemiBold, {color: Colors.colorBlackLight2}]}>
                                {association && association.nom ? 'Association' : 'Particulier'}
                          </Text>
                      </View>

                      <View>
                          <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Date de réservation <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                          {Platform.OS === 'android' && (
                              <TouchableOpacity onPress={ShowDateReservation}>
                                  <Text>Changer la date de réservation</Text>
                              </TouchableOpacity>
                          )}
                          {Platform.OS !== 'android' && (
                              <DateTimePickerComponent
                                style={{alignSelf: 'flex-start'}}
                                value={dateReservation}
                                mode="date"
                                display="default"
                                locale="fr"
                                onChange={(_: any, selectedDate: Date) => {
                                    const currentDate = selectedDate || dateReservation;
                                    setShowDateReservation(false);
                                  setDateReservation(currentDate);}}/>)}
                      </View>
                      
                      <View>
                          <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Date de retour <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                          {Platform.OS === 'android' && (
                              <TouchableOpacity onPress={ShowDateRetour}>
                                  <Text>Changer la date de retour</Text>
                              </TouchableOpacity>
                          )}
                          {Platform.OS !== 'android' && (
                              <DateTimePickerComponent
                                style={{alignSelf: 'flex-start'}}
                                value={dateRetour}
                                mode="date"
                                display="default"
                                locale="fr"
                                onChange={(_: any, selectedDate: Date) => {
                                    const currentDate = selectedDate || dateRetour;
                                    setShowDateRetour(false);
                                    setDateRetour(currentDate);}}/>)}
                      </View>

                      <View>
                          <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Statut de la réservation <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                          <Picker
                              selectedValue={statutReservation}
                              onValueChange={(itemValue, itemIndex) => setStatutReservation(itemValue)}
                              style={{width: '100%', height: 90, position: 'relative', top: -70}}>
                                <Picker.Item label="En attente" value="En attente" />
                                <Picker.Item label="En cours" value="En cours" />
                                <Picker.Item label="Terminée" value="Terminée" />
                          </Picker>
                      </View>

                    <ActionButton text="Enregistrer" type="success" icon="save" style={{ alignSelf: 'flex-end' }} onPress={HandleSaveAsync} isLoading={isLoading} />
                  </View>

                  <View style={{ marginBottom: 80 }} />

                </ScrollView>
            </View>

        </KeyboardAvoidingView>
            
    )
}
export default ReservationFormulaire;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    }
});