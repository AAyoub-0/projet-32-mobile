// react-native
import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack, router } from 'expo-router';
import React, { useState, useEffect } from 'react';

// constants
import * as Colors from '../../constants/Colors';
import * as Texts from '../../constants/Texts';

// components
import TextInputFlat from '../../components/TextInputFlat';
import MaterielComponent from "@/components/MaterielComponent";
import ActionButton from "@/components/ActionButton";

// models
import { Materiel } from "../../models/Materiel";
import { Reservation } from "@/models/Reservation";
import { Association } from "@/models/Association";
import { Particulier } from "@/models/Particulier";
import { StatutReservationEnum } from "@/models/StatutReservationEnum";

const DemandeMateriel: React.FC  = () => {

    const { parameter } = useLocalSearchParams();

    const [materiel, setMateriel] = useState<Materiel>(new Materiel(0, '', 0, false, 1, 1, 'http://image.com'));
    const [quantite, setQuantite] = useState<string>('1');
    const [dateReservation, setDateReservation] = useState<Date>(new Date());
    const [dateRendu, setDateRendu] = useState<Date>(new Date());
    const [showDateReservation, setShowDateReservation] = useState(false);
    const [showDateRetour, setShowDateRetour] = useState(false);
    const [association, setAssociation] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (parameter) {
            const materielParsed = Materiel.fromJson(parameter as any);
            setMateriel(materielParsed);
            if (materielParsed.pourAssociation) {
                setAssociation(true);
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
            value: dateRendu,
            onChange: (_: any, selectedDate: Date) => {
              const currentDate = selectedDate || dateRendu;
              setDateRendu(currentDate);
            },
            mode: 'date',
            locale: 'fr'
          });
        } else {
            setShowDateRetour(true);
        }
      };

    const HandleCancelAsync = async () => {
        setIsLoading(true);
        try{
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Cancel the reservation
            router.push('/demande');
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    const handleNextAsync = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        try{
            if (validationSubmit()) {
                const reservation = new Reservation(0, dateReservation, dateRendu, materiel, parseInt(quantite), StatutReservationEnum.EN_ATTENTE, null, null);
                if(association) reservation.association = new Association(0, '', '', '', [], null);
                else reservation.particulier = new Particulier(0, '', '', '', [], '');
                router.push({
                    pathname: '/demande/DemandeValidation',
                    params: { parameter: Reservation.toJson(reservation) }
                });
            }
            return;
        } 
        catch(error){
            console.log(error);
        } 
        finally{
            setIsLoading(false);
        }
    }

    const validationSubmit = () => {
        if (parseInt(quantite) === 0 || parseInt(quantite) < 0 || dateReservation === new Date() || dateRendu === new Date()) {
            alert('Veuillez remplir les champs obligatoires');
            return false;
        }

        if (dateReservation < new Date()) {
            alert('La date de réservation doit être supérieure à la date du jour');
            return false;
        }

        if (dateReservation > dateRendu) {
            alert('La date de réservation doit être inférieure à la date de retour');
            return false;
        }

        return true;
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
                    <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]}>
                        Demande de matériel
                    </Text>

                    <Text style={[Texts.textBodyPrimary, Texts.textBold, {marginBottom: 23}]}>
                        Matériel souhaité
                    </Text>

                    <Text style={[Texts.textSubtitle, Texts.textSemiBold, {marginBottom: 23}]}>
                        Veuillez remplir les informations suivantes pour votre demande de matériel
                    </Text>

                    <View style={{ flexDirection: 'column', rowGap: 23 }}>
                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>
                                Vous êtes
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', backgroundColor: Colors.colorPrimaryLight2, borderRadius: 8, height: 60 }}>
                                <TouchableOpacity onPress={() => setAssociation(true)} style={{ flex: .5, alignItems: 'center', justifyContent: 'center', backgroundColor: association ? Colors.colorPrimary : 'transparent', borderRadius: 8 }}>
                                    <Text style={[Texts.textBody, Texts.textBold, {color: Colors.colorWhite}]}>
                                        Association
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                        if(materiel.pourAssociation) { alert('Ce matériel est réservé aux associations'); return };
                                        setAssociation(false)
                                    }} style={{ flex: .5, alignItems: 'center', justifyContent: 'center', backgroundColor: !association ? Colors.colorPrimary : 'transparent', borderRadius: 8 }}>
                                    <Text style={[Texts.textBody, Texts.textBold, {color: Colors.colorWhite}]}>
                                        Particulier
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {materiel.pourAssociation && (
                                <Text style={[Texts.textCaption, Texts.textBold, {color: Colors.colorDanger, marginTop: 5}]}>
                                    Ce matériel est réservé aux associations
                                </Text>
                            
                            )}
                        </View>

                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold]}>Matériel choisi</Text>
                            <MaterielComponent materiel={materiel} showPrice={true} disabled={true} />
                        </View>
                        
                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Quantité souhaitée <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <TextInputFlat value={quantite} onChangeText={(text) => setQuantite(text)} keyboardType="number-pad" border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez la quantité souhaitée" />
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
                                value={dateRendu}
                                mode="date"
                                display="default"
                                locale="fr"
                                onChange={(_: any, selectedDate: Date) => {
                                    const currentDate = selectedDate || dateRendu;
                                    setShowDateRetour(false);
                                    setDateRendu(currentDate);}}/>)}
                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', columnGap: 10 }}>
                            <ActionButton text="Annuler" type="danger" isLoading={isLoading} onPress={HandleCancelAsync} />

                            <ActionButton text="Suivant" type="success" isLoading={isLoading} onPress={handleNextAsync} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView> 
    )
}
export default DemandeMateriel;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    }
});
