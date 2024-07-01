import { View, Text, TouchableOpacity, ColorValue } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";

import * as Texts from '../constants/Texts';
import * as Colors from '../constants/Colors';

import Chip from './Chip';
import Line from './Line';

import { ReservationMateriel } from '../models/ReservationMateriel';
import { Association } from "@/models/Association";
import { Particulier } from "@/models/Particulier";

type Props = {
    reservationMateriel: ReservationMateriel;
    onPress: () => void;
}

let bgColorStatus: ColorValue;
let colorStatus: ColorValue;

const ReservationComponent: React.FC<Props> = ({ reservationMateriel, onPress }, ref) => {
    
    const [association, setAssociation] = useState<Association | null>(null);
    const [particulier, setParticulier] = useState<Particulier | null>(null);

    useEffect(() => {
        const getAssociation = async () => {
            if(reservationMateriel.reservation.association) {
                const response = Association.fromJson(reservationMateriel.reservation.association);
                setAssociation(response);
            }
        }
        const getParticulier = async () => {
            if(reservationMateriel.reservation.particulier) {
                const response = Particulier.fromJson(reservationMateriel.reservation.particulier);	
                setParticulier(response);
            }
        }
        if(reservationMateriel.reservation.association) {
            getAssociation();
        } else {
            getParticulier();
        }
    }, []);

    
    const titre = association
    ? association.nom
    : particulier
    ? particulier.nom + ' ' + particulier.prenom
    : 'Réservation n°' + reservationMateriel.reservation.id;

    switch (reservationMateriel.reservation.statutReservation) {
        case 'En attente':
            bgColorStatus = Colors.colorWarningLight;
            colorStatus = Colors.colorWhite;
            break;
        case 'Terminée':
            bgColorStatus = Colors.colorSuccessLight;
            colorStatus = Colors.colorWhite;
            break;
        case 'Annulée':
            bgColorStatus = Colors.colorDangerLight;
            colorStatus = Colors.colorWhite;
            break;
        default:
            bgColorStatus = Colors.colorGrayLight;
            colorStatus = Colors.colorWhite;
            break;
    }

    return (
        <View style={{ width: '100%', backgroundColor: Colors.colorPrimaryLight3, borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ padding: 16, borderRightWidth: 1, borderBottomWidth: 1, borderColor: Colors.colorBg, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[Texts.textBody, Texts.textBold, { color: Colors.colorBlackLight }]}>
                        {reservationMateriel.id}
                    </Text>
                </View>
                <View style={{ padding: 12, borderBottomWidth: 1, borderColor: Colors.colorBg, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[Texts.textBody, Texts.textBold, { color: Colors.colorBlackLight }]}>
                        {titre}
                    </Text>
                    <Text style={[Texts.textBodySmall2, Texts.textBold, { color: Colors.colorBlackLight2 }]} >
                        {association ? 'Association' : 'Particulier'}
                    </Text>
                </View>
                <TouchableOpacity onPress={onPress} style={{ padding: 16, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: Colors.colorBg, justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="pencil" size={24} color={Colors.colorBlackLight} />
                </TouchableOpacity>
            </View>
            <View style={{padding: 16}}>
                <Text style={[Texts.textBody, Texts.textBold, { color: Colors.colorBlackLight }]}>
                    Matériel
                </Text>
                
                <View style={{ marginVertical: 5, paddingVertical: 3, paddingHorizontal: 6, backgroundColor: Colors.colorPrimaryLight3, borderRadius: 8,}}>
                    <View style={{position: 'absolute', backgroundColor: Colors.colorWarning, padding: 3, borderRadius: 10, right: -10, top: -5, zIndex: 10}}>
                        <Text style={[Texts.textBodySmall2, { color: Colors.colorWhite }]}>
                            x{reservationMateriel.quantite}
                        </Text>
                    </View>
                    <Text style={[Texts.textBody, { color: Colors.colorBlackLight }]}>
                        {reservationMateriel.materiel.libelle}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', columnGap: 23 }}>
                    <View>
                        <Text style={[Texts.textBodySmall, Texts.textBold, { color: Colors.colorBlackLight }]}>
                            Date de réservation
                        </Text>
                        <Text style={[Texts.textBodySmall2, { color: Colors.colorBlackLight }]}>
                            {new Date(reservationMateriel.reservation.dateReservation).toLocaleDateString()}
                        </Text>
                    </View>
                    <View>
                        <Text style={[Texts.textBodySmall, Texts.textBold, { color: Colors.colorBlackLight }]}>
                            Date de retour
                        </Text>
                        <Text style={[Texts.textBodySmall2, { color: Colors.colorBlackLight }]}>
                            {new Date(reservationMateriel.reservation.dateRetour).toLocaleDateString()}
                        </Text>
                    </View>
                </View>
                

                <Line margin={10} width={'100%'} backgroundColor={Colors.colorBg} rounded={true} />
                
                <Chip text={reservationMateriel.reservation.statutReservation} bgColor={bgColorStatus} color={colorStatus} />
            </View>
        </View>
    )
}
export default ReservationComponent;