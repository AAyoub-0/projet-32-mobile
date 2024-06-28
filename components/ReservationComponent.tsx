import { View, Text, TouchableOpacity, ColorValue } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import * as Texts from '../constants/Texts';
import * as Colors from '../constants/Colors';

import Chip from './Chip';
import Line from './Line';

import { Reservation } from '../models/Reservation';

type Props = {
    reservation: Reservation;
}

let bgColorStatus: ColorValue;
let colorStatus: ColorValue;

const ReservationComponent: React.FC<Props> = ({ reservation }) => {

    const titre = reservation.association 
    ? reservation.association.nom 
    : reservation.particulier 
    ? reservation.particulier.nom 
    : 'Réservation n°' + reservation.id;

    switch (reservation.statutReservation) {
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
        <View style={{ width: '100%', backgroundColor: '#00148925', borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ padding: 16, borderRightWidth: 1, borderBottomWidth: 1, borderColor: Colors.colorBg, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[Texts.textBody, Texts.textBold, { color: Colors.colorBlackLight }]}>
                        {reservation.id}
                    </Text>
                </View>
                <View style={{ padding: 12, borderBottomWidth: 1, borderColor: Colors.colorBg, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[Texts.textBody, Texts.textBold, { color: Colors.colorBlackLight }]}>
                        {titre}
                    </Text>
                </View>
                <TouchableOpacity style={{ padding: 16, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: Colors.colorBg, justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="pencil" size={24} color={Colors.colorBlackLight} />
                </TouchableOpacity>
            </View>
            <View style={{padding: 16}}>
                <Text style={[Texts.textBody, Texts.textBold, { color: Colors.colorBlackLight }]}>Matériel</Text>
                
                <View style={{ marginVertical: 5, paddingVertical: 3, paddingHorizontal: 6, backgroundColor: '#00148920', borderRadius: 8,}}>
                    <View style={{position: 'absolute', backgroundColor: Colors.colorWarning, padding: 3, borderRadius: 10, right: -10, top: -5, zIndex: 10}}>
                        <Text style={[Texts.textBodySmall2, { color: Colors.colorWhite }]}>
                            x{reservation.quantite}
                        </Text>
                    </View>
                    <Text style={[Texts.textBody, { color: Colors.colorBlackLight }]}>
                        {reservation.materiel.libelle}
                    </Text>
                </View>

                <Line margin={10} width={'100%'} backgroundColor={Colors.colorBg} rounded={true} />
                
                <Chip text={reservation.statutReservation} bgColor={bgColorStatus} color={colorStatus} />
            </View>
        </View>
    )
}
export default ReservationComponent;