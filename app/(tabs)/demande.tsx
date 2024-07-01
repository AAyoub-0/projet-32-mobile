// react-native
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Modal } from "react-native";
import React, { useState, useEffect } from 'react';
import Octicons from '@expo/vector-icons/Octicons';
import { Stack, router } from "expo-router";

// services
import { getMateriels } from "@/services/MaterielService";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import TextInputFlat from '@/components/TextInputFlat';
import MaterielComponent from "@/components/MaterielComponent";

// models
import { Materiel } from "@/models/Materiel";
import ActionButton from "@/components/ActionButton";

const Demande = () => {

    const [loading, setLoading] = useState(true);
    const [materiels, setMateriels] = useState<Materiel[]>([]);
    const [showAssociationModal, setShowAssociationModal] = useState(false);
    const [selectedMateriel, setSelectedMateriel] = useState<Materiel | undefined>(undefined);

    useEffect(() => {
        getMateriels().then((materiels) => {
            setMateriels(materiels);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if(selectedMateriel?.pourAssociation == true) {
            setShowAssociationModal(true);
        } else HandleNext();

    }, [selectedMateriel]);

    const HandleNext = () => {
        if (selectedMateriel == undefined) return;
        if (showAssociationModal) setShowAssociationModal(false);
        router.push({
            pathname: '/demande/DemandeMateriel',
            params: { 
                parameter: Materiel.toJson(selectedMateriel)
            }
        })
    }

    if (loading) {
        return (
            <ActivityIndicator size="large" color={Colors.colorPrimary} />
        )
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={
                {
                    headerTitle: '',
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.colorBlack }}>Réserver</Text>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-end', marginRight: 20 }}>
                            <TouchableOpacity onPress={() => router.push('/utilisateur/Profile')}>
                                <Octicons name="feed-person" size={24} color={Colors.colorBlack} />
                            </TouchableOpacity>
                        </View>
                    ),
                }
            }> 
            </Stack.Screen>

            <View>
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>

                    <View>
                        <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]} >
                            Demande de matériel
                        </Text>

                        <Text style={[Texts.textSubtitle, Texts.textBold, {marginBottom: 23}]}>
                            Les demandes de locations sont destinées uniquement aux habitants de Vaulx Milieu. Le matériel loué ne peut pas quitter la commune de Vaulx Milieu.
                        </Text>

                        <Text style={[Texts.textBodyPrimary, Texts.textBold, {marginBottom: 23}]}>
                            Liste du matériel
                        </Text>

                        <View style={{marginBottom: 23}}>
                            <View style={{ flexDirection: 'column', rowGap: 10 }}>
                                <Text style={[Texts.textBodySmall2, Texts.textSemiBold]}>
                                    Sélectionnez le matériel souhaité
                                </Text>
                                <TextInputFlat rightIcon={'search'} border={[1, 1, 1, 1]} borderRadius={8} placeholder="Rechercher un matériel" />
                            </View>

                            {materiels.map((materiel, index) => {
                                return (
                                    <MaterielComponent key={index} materiel={materiel} showPrice={true} onPress={() => {setSelectedMateriel(materiel)}} />
                                )
                            })}
                        </View>
                    </View>
                    
                    <View style={{ height: 50 }}></View>

                </ScrollView>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showAssociationModal}
                onRequestClose={() => setShowAssociationModal(false)}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: Colors.colorWhite, borderRadius: 8, padding: 20, width: '80%' }}>
                        <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]}>
                            Attention ce matériel est réservé aux associations
                        </Text>
                        <Text style={[Texts.textBody, Texts.textBold, {marginBottom: 23, color: Colors.colorDanger}]}>
                            Ce matériel est destiné uniquement aux associations. Veuillez nous contacter pour plus d'informations.
                            <Text style={[Texts.textBody, Texts.textBold]}>
                                {'\n'}Si vous êtes une association, veuillez continuer.
                            </Text>
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <ActionButton text="Annuler" type="danger" onPress={() => setShowAssociationModal(false)} isLoading={false} />
                            <ActionButton text="Continuer" type="warning" icon={'arrow-circle-right'} onPress={HandleNext} isLoading={loading} />
                        </View>
                    </View>
                </View>
            </Modal>

        </KeyboardAvoidingView>
    )
}
export default Demande;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    }
});