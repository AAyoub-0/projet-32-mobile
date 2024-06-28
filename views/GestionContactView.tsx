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
import MessageComponent from "@/components/MessageComponent";

// models
import { Contact } from "@/models/Contact";

// Props
type Props = {
    contacts: Contact[]
}

const GestionContactView: React.FC<Props> = ({ contacts }) => {

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[Texts.textTitle, Texts.textBold, {maxWidth: '70%'}]} >
                    Gérer les messages
                </Text>
            </View>

            <Line margin={20} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
            <TextInputFlat placeholder="Rechercher un message" border={[1, 1, 1, 1]} borderRadius={8} rightIcon={'search'} />
            
            <View style={{flexDirection: 'column', rowGap: 20, marginTop: 23}}>
                {contacts.map((contact, index) => (
                    <MessageComponent key={index} contact={contact} />
                ))}
            </View>
        </View> 
    )
}
export default GestionContactView;

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