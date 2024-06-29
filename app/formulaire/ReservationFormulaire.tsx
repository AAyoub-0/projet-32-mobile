// react-native
import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, StyleSheet  } from "react-native";
import {Picker} from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import Checkbox from 'expo-checkbox';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';

// models
import { Reservation } from "@/models/Reservation";

const ReservationFormulaire: React.FC = () => {

    const { parameter } = useLocalSearchParams();

    const [dateReservation, setDateReservation] = React.useState<Date>(new Date());
    const [statutReservation, setStatutReservation] = React.useState('En cours');
    const [dateRetour, setDateRetour] = React.useState<Date>(new Date());
    const [showDateReservation, setShowDateReservation] = useState(false);
    const [showDateRetour, setShowDateRetour] = useState(false);
    const [estSupprimee, setEstSupprimee] = React.useState(false);
    const [titre, setTitre] = useState<string>('');
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (parameter) {
            const reservationParsed = Reservation.fromJson(parameter as any);
            reservationParsed.dateReservation = new Date(reservationParsed.dateReservation);
            reservationParsed.dateRetour = new Date(reservationParsed.dateRetour);
            setDateReservation(reservationParsed.dateReservation as Date);
            setStatutReservation(reservationParsed.statutReservation);
            setDateRetour(reservationParsed.dateRetour as Date);
            setId(reservationParsed.id);
            
            if(reservationParsed.association) {
                setTitre(reservationParsed.association.nom);
            } 
            else if(reservationParsed.particulier) {
                setTitre(reservationParsed.particulier.nom);
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
                      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 8, borderRadius: 8, backgroundColor: Colors.colorDanger }}>
                          <Text style={[Texts.textSubtitle, Texts.textBold, {color: Colors.colorWhite}]}>Supprimer</Text>
                      </TouchableOpacity>
                  </View>
              
                  <Line marginBottom={20} marginTop={7} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
                              
                  <View style={{ flexDirection: 'column', rowGap: 23 }}>

                      <View>
                          <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Créateur </Text>
                          <Text style={[Texts.textBody, Texts.textSemiBold]}>{titre}</Text>
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
                              <Picker.Item label="En cours" value="En cours" />
                              <Picker.Item label="Terminée" value="Terminée" />
                          </Picker>
                      </View>

                      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 8, borderRadius: 8, backgroundColor: Colors.colorSuccess, alignSelf: 'flex-end' }}>
                          <Text style={[Texts.textSubtitle, Texts.textBold, {color: Colors.colorWhite}]}>Enregistrer</Text>
                      </TouchableOpacity>
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