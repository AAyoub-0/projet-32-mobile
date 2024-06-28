// react-native
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import ActualiteFuture from "@/components/ActualiteFuture";

// models
import { Evenement } from "@/models/Evenement";

// Props
type Props = {
    evenements: Evenement[]
}

const GestionCalendrierView: React.FC<Props> = ({ evenements }) => {

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[Texts.textTitle, Texts.textBold, {maxWidth: '70%'}]} >
                    Gérer le calendrier des événements
                </Text>

                <TouchableOpacity style={styles.ajoutBouton}>
                    <Text style={[Texts.textSubtitle, Texts.textBold, {color: Colors.colorWhite}]}>
                        Ajouter
                    </Text>
                    <FontAwesome name="plus" size={20} color={Colors.colorWhite} />
                </TouchableOpacity>
            </View>

            <Line margin={20} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
            <TextInputFlat placeholder="Rechercher un événement" border={[1, 1, 1, 1]} borderRadius={8} rightIcon={'search'} />
            
            <View style={{flexDirection: 'column', rowGap: 20, marginTop: 23}}>
                {evenements.map((evenement, index) => (
                        <ActualiteFuture key={index} evenement={evenement} />
                    ))}
            </View>
        </View> 
    )
}
export default GestionCalendrierView;

const styles = StyleSheet.create({
    ajoutBouton: {
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        backgroundColor: Colors.colorSuccess,
    },
});