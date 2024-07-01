// react-native
import { View, Text, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack, router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';

// services
import { createReservation } from '@/services/ReservationService';

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
import { Particulier } from "@/models/Particulier";
import { Association } from "@/models/Association";


const DemandeValidation: React.FC = () => {

    const { parameter } = useLocalSearchParams();

    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [materiel, setMateriel] = useState<Materiel>(new Materiel(0, '', 1, false, 1, 1, 'http://image.com'));
    const [association, setAssociation] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('ayoub@gmail.com');
    const [nom, setNom] = useState<string>('Boumallassa');
    const [prenom, setPrenom] = useState<string>('Ayoub');
    const [telephone, setTelephone] = useState<string>('0617876766');
    const [remarques, setRemarques] = useState<string>('dsqdqsdsqdqsd');
    const [conditions, setConditions] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (parameter) {
            const reservationParsed = Reservation.fromJson(parameter as any);
            setReservation(reservationParsed);
            setMateriel(reservationParsed.materiel);
            
            if (reservationParsed.association != null) {
                setAssociation(true);
            } 
            if (reservationParsed.particulier != null) {
                setAssociation(false);
            }
        }
    }, []);

    const handleCancelAsync = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/demande');
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const SubmitAsync = async () => {
        setLoading(true);
        try{
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (ValidateSubmit() == false) {
                console.log(errorMessage)
                alert(errorMessage as any);
                return;
            }
            if (reservation == null) {
                alert('Une erreur est survenue lors de la réservation');
                return;
            }
            if(reservation.association) {
                const association = new Association(0, nom, telephone, email, [], null);
                reservation.association = association;
            }
            if(reservation.particulier) {
                const particulier = new Particulier(0, nom, prenom, telephone, [], email);
                reservation.particulier = particulier;
            }
            
            await createReservationAsync();
        }
        catch (error) {
            console.log(error);
            alert('Une erreur est survenue lors de la réservation');
        }
        finally {
            setLoading(false);
        }
    }

    const ValidateSubmit = () => {
        if (email == '' || nom == '' || prenom == '' || telephone == '' || remarques == '') {
            setErrorMessage('Veuillez remplir tous les champs obligatoires');
            return false;
        }
        
        if (RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$').test(email) == false) {
            setErrorMessage('Adresse e-mail invalide');
            return false;
        }

        if (RegExp('^[0-9]{10}$').test(telephone) == false) {
            setErrorMessage('Numéro de téléphone invalide');
            return false;
        }

        if (conditions == false) {
            setErrorMessage('Veuillez accepter les conditions générales');
            return false;
        }
        
        setErrorMessage('');
        return true;
    }

    const createReservationAsync = async () => {
        if (reservation == null) {
            console.log('La réservation est vide');
            return;
        }
        createReservation(reservation).then((reservationCreated) => {
            console.log('Réservation créée:', reservationCreated);
            if(reservationCreated) {
                alert('Votre demande a bien été prise en compte !');
                router.push('/demande');
            }
        });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={
                {
                    headerTitle: 'Validation de la demande',
                    headerBackTitle: 'Retour'
                }
            } />

            <View>
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>
                    <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]} >
                        Demande de matériel
                    </Text>

                    <Text style={[Texts.textBodyPrimary, Texts.textBold, {marginBottom: 23}]}>
                        Informations personnelles {association ? 'de l\'association' : 'du particulier'}
                    </Text>

                    <Text style={[Texts.textSubtitle, Texts.textSemiBold, {marginBottom: 23}]}>
                        Veuillez remplir les informations suivantes pour valider votre demande de matériel
                    </Text>

                    <View style={{ flexDirection: 'column', rowGap: 23 }}>
                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Adresse e-mail <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <TextInputFlat value={email} onChangeText={(text) => setEmail(text)} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre adresse mail" />
                        </View>
                        
                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Nom <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <TextInputFlat value={nom} onChangeText={(text) => setNom(text)} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre nom" />
                        </View>
                        
                        {association == false && (
                            <View>
                                <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Prénom <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                                <TextInputFlat value={prenom} onChangeText={(text) => setPrenom(text)} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre prénom" />
                            </View>
                        )}
                        
                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Téléphone <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                            <TextInputFlat value={telephone} onChangeText={(text) => setTelephone(text)} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez votre numéro de téléphone" />
                        </View>

                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold]}>Matériel sélectionné</Text>
                            <MaterielComponent  materiel={materiel} showQuantity={false} showPrice={true} disabled={true} />
                            <Text style={[Texts.textCaption, Texts.textSemiBold, {marginTop: 5}]}>
                                Quantité voulu : {reservation?.quantite} {'\n'}
                                Prix total : {reservation && (materiel.prix * reservation?.quantite)} €
                            </Text>
                            <Text style={[Texts.textCaption, Texts.textSemiBold, {marginTop: 5}]}>
                                Date de réservation : Le {reservation && Reservation?.dateToText(reservation?.dateReservation)}{'\n'}
                                Date de retour : Le {reservation && Reservation?.dateToText(reservation?.dateRetour)}
                            </Text>
                        </View>

                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Remarques et questions</Text>
                            <TextInputFlat value={remarques} onChangeText={(text) => setRemarques(text)} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Entrez vos remarques et questions" />
                        </View>

                        <View>
                            <Text style={[Texts.textLabel, Texts.textSemiBold, {marginBottom: 5}]}>Conditions générales</Text>
                            <Text style={[Texts.textLink, {marginBottom: 5}]}>
                                •	Toute demande doit parvenir au moins 3 semaines à l'avance.{'\n'}
                                •	La réponse sera faite dans les meilleurs délais au plus tard 2 semaines avant la date demandée de réservation{'\n'}
                                •	Les associations sont prioritaires sur les particuliers. {'\n'}
                                    •	Le particulier s’engage à venir chercher le matériel au local du comité des fêtes et le ramener en état à l'heure convenu avec le responsable du CdF de permanence, qui effectuera un état du matériel avant et après utilisation. Une caution de 250 euros est exigée ainsi que la photocopie d'une pièce d'identité.{'\n'}
                                    •	En cas de dégradation, une facture sera présentée au particulier emprunteur pour rembourser les dégâts.{'\n'}
                                    •	Le règlement de la location sera réalisé au retour du matériel (espèces ou chèque à l'ordre du comité des fêtes de Vaulx Milieu).{'\n'}
                                    •	Le particulier s'engage à respecter les dispositions ci-dessus
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Checkbox value={conditions} onValueChange={(value) => setConditions(value)} color={Colors.colorPrimary} />
                                    <Text style={[Texts.textBody, Texts.textSemiBold, {marginLeft: 5}]}>J'ai lu et j'accepte les conditions générales <Text style={[Texts.textLabelRequired, Texts.textBold]}>*</Text></Text>
                                </View>
                        </View>
                            
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', columnGap: 10 }}>
                            <ActionButton text="Annuler" type="danger" isLoading={loading} onPress={handleCancelAsync} />

                            <ActionButton text="Valider" type="success" isLoading={loading} onPress={SubmitAsync} />
                        </View>
                    </View>

                    <View style={{marginTop: 80}} />

                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}
export default DemandeValidation;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    }
});
