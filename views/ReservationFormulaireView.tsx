// react-native
import { View, Text, TouchableOpacity, Platform  } from "react-native";
import {Picker} from '@react-native-picker/picker';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';

// models
import { Reservation } from "@/models/Reservation";

// Props
type Props = {
    reservation: Reservation
}

const ReservationFormulaireView: React.FC<Props> = ({ reservation }) => {

    const [dateReservation, setDateReservation] = React.useState(reservation.dateReservation);
    const [statutReservation, setStatutReservation] = React.useState(reservation.statutReservation);
    const [dateRetour, setDateRetour] = React.useState(reservation.dateRetour);
    const [showDateReservation, setShowDateReservation] = useState(false);
    const [showDateRetour, setShowDateRetour] = useState(false);
    const [estSupprimee, setEstSupprimee] = React.useState(false);

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
          });
        } else {
            setShowDateRetour(true);
        }
      };

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[Texts.textTitle, Texts.textBold]} >
                Modifier la réservation
                </Text>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 8, borderRadius: 8, backgroundColor: Colors.colorDanger }}>
                    <Text style={[Texts.textSubtitle, Texts.textBold, {color: Colors.colorWhite}]}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        
            <Line marginBottom={20} marginTop={7} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
                        
            <View style={{ flexDirection: 'column', rowGap: 23 }}>
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

        </View>
            
    )
}
export default ReservationFormulaireView;