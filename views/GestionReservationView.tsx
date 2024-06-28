// react-native
import { View, Text } from "react-native";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import ReservationComponent from "@/components/ReservationComponent";

// models
import { Reservation } from "@/models/Reservation";

// Props
type Props = {
    reservations: Reservation[]
}

const GestionReservationView: React.FC<Props> = ({ reservations }) => {

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[Texts.textTitle, Texts.textBold, {maxWidth: '70%'}]} >
                    Gérer les réservations
                </Text>
            </View>

            <Line margin={20} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
            <TextInputFlat placeholder="Rechercher une réservation" border={[1, 1, 1, 1]} borderRadius={8} rightIcon={'search'} />
            <View style={{ marginVertical: 20, rowGap: 10 }} >
                {reservations.map((reservation, index) => (
                    <ReservationComponent key={index} reservation={reservation} />
                ))}
            </View>
        </View> 
    )
}
export default GestionReservationView;