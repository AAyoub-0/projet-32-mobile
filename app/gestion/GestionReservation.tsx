// react-native
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Stack, router } from "expo-router";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import ReservationComponent from "@/components/ReservationComponent";

// models
import { Reservation } from "@/models/Reservation";
import { Materiel } from "@/models/Materiel";


const GestionReservation = () => {

    const materiel = new Materiel(1, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel2 = new Materiel(2, 'Parapluie', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel3 = new Materiel(3, 'Chaise de camping', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel4 = new Materiel(4, 'Table 10x2m', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel5 = new Materiel(5, 'Camion', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const nullMateriel = new Materiel(0, '', 0, false, 0, 0, '');

    const reservation = new Reservation(1, new Date(), new Date(), materiel, 1, 'En attente', null, null);
    const reservation2 = new Reservation(2, new Date(), new Date(), materiel2, 3, 'En attente', null, null);
    const reservation3 = new Reservation(3, new Date(), new Date(), materiel3, 20, 'Terminée', null, null);
    const reservation4 = new Reservation(4, new Date(), new Date(), materiel4, 2, 'En attente', null, null);
    const reservation5 = new Reservation(5, new Date(), new Date(), materiel5, 1, 'Terminée', null, null);

    const reservations = [reservation, reservation2, reservation3, reservation4, reservation5];

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={
                {
                    headerTitle: 'Gestion des réservations',
                    headerBackTitle: 'Retour',
                }
            }> 
            </Stack.Screen>

            <View>
                <ScrollView style={styles.container}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[Texts.textTitle, Texts.textBold, {maxWidth: '70%'}]} >
                            Gérer les réservations
                        </Text>
                    </View>

                    <Line margin={20} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
                    <TextInputFlat placeholder="Rechercher une réservation" border={[1, 1, 1, 1]} borderRadius={8} rightIcon={'search'} />
                    <View style={{ marginVertical: 20, rowGap: 10 }} >
                        {reservations.map((reservation, index) => (
                            <ReservationComponent key={index} reservation={reservation} onPress={() => {
                                router.push({
                                    pathname: '/formulaire/ReservationFormulaire',
                                    params: { parameter: Reservation.toJson(reservation) }
                                });
                            }} />
                        ))}
                    </View>

                    <View style={{ marginBottom: 80 }} />

                </ScrollView>
            </View>
        </KeyboardAvoidingView> 
    )
}
export default GestionReservation;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    },
});