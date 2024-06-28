// react-native
import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';

// models
import { Evenement } from "@/models/Evenement";

// Props
type Props = {
    evenement?: Evenement | null
}

const EvenementFormulaireView: React.FC<Props> = ({ evenement }) => {

    const titre = evenement == undefined || evenement == null
    ? 'Ajouter un événement' : 'Modifier un événement';
    const [nom, setNom] = React.useState(evenement?.nom);
    const [date, setDate] = React.useState(evenement?.date);
    const [showDate, setShowDate] = useState(false);
    const [lieu, setLieu] = React.useState(evenement?.lieu);
    const [commentaire, setCommentaire] = React.useState(evenement?.commentaire);


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
          });
        } else {
            setShowDate(true);
        }
      };

    return (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[Texts.textTitle, Texts.textBold, {maxWidth: '70%'}]} >
                {titre}
            </Text>
            <TouchableOpacity style={{backgroundColor: Colors.colorDanger, padding: 8, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={[Texts.textSubtitle, Texts.textBold, {color: Colors.colorWhite}]}>
                    Supprimer
                </Text>
            </TouchableOpacity>
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
            
              <TouchableOpacity style={{backgroundColor: Colors.colorSuccess, padding: 8, borderRadius: 8, alignSelf: 'flex-end'}}>
                  <Text style={[Texts.textSubtitle, Texts.textBold, {color: Colors.colorWhite}]}>
                      Enregistrer
                  </Text>
              </TouchableOpacity>
          </View>
        </View>
    )
}
export default EvenementFormulaireView;