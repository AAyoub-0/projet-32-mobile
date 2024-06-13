// react-native
import { View, Text, StyleSheet, Image } from "react-native";

// constants
import * as Colors from '../constants/Colors';
import * as Texts from '../constants/Texts';

// components
import MaterielComponent from "@/components/MaterielComponent";
import MaterielReservation from "@/components/MaterielReservation";
import Line from '../components/Line';

// models
import { Evenement } from '../models/Evenement';
import { Materiel } from "../models/Materiel";

const MaterielView = () => {

    const materiel = new Materiel(1, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel2 = new Materiel(2, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel3 = new Materiel(3, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel4 = new Materiel(4, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel5 = new Materiel(5, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');

    const materiels = [materiel, materiel2, materiel3, materiel4, materiel5];

    return (
        <View>
            <Text style={[Texts.textTitle, Texts.textBold]} >
                Du matériel est mis à disposition des associations et habitants du village pour leurs manifestations.
            </Text>

            <Text style={[Texts.textSubtitle, Texts.textBold, { marginTop: 23 }]}>
                Vous souhaitez réserver du matériel ?
            </Text>
            <Line marginTop={4} width={'100%'} backgroundColor={Colors.colorBorderLight} rounded={true} />

            <MaterielReservation text="Vous êtes un particulier ?" />

            <MaterielReservation style={{ marginTop: 20 }} text="Vous êtes une association ?" />

            <Text style={[Texts.textSubtitle, Texts.textSemiBold, { marginTop: 28 }]}>
                Liste du matériel
            </Text>
            <Line marginTop={4} width={'100%'} backgroundColor={Colors.colorBorderLight} rounded={true} />

            {materiels.map((materiel, index) => (
                <MaterielComponent key={index} materiel={materiel} />
            ))}
        </View>
    )
}
export default MaterielView;

const styles = StyleSheet.create({
    reservationBoutton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.colorWhite,
        borderColor: Colors.colorBorder,
        borderWidth: 1,
        height: 50,
    },
    materiel: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: Colors.colorWhite,
        borderRadius: 8,
        shadowColor: Colors.colorBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});