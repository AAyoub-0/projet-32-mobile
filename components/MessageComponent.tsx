import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import * as Texts from '../constants/Texts';
import * as Colors from '../constants/Colors';

import { Contact } from "@/models/Contact";

type Props = {
    contact: Contact;
    onPress?: () => void;
}

const MessageComponent: React.FC<Props> = ({ contact, onPress }) => {

    const titre = contact.nom + ' ' + contact.prenom;

    return (
        <View style={{ width: '100%', backgroundColor: Colors.colorPrimaryLight3, borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ padding: 12, borderBottomWidth: 1, borderColor: Colors.colorBg, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[Texts.textTitle, Texts.textBold, { color: Colors.colorBlackLight }]}>
                        {titre}
                    </Text>
                </View>
                <TouchableOpacity onPress={onPress} style={{ padding: 16, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: Colors.colorBg, justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="eye" size={24} color={Colors.colorBlackLight} />
                </TouchableOpacity>
            </View>
            <View style={{padding: 16}}>
                <Text style={[Texts.textBody, Texts.textBold, { color: Colors.colorBlackLight }]}>
                    {contact.objet}
                </Text>
                
                <Text style={[Texts.textBodySmall, { color: Colors.colorBlackLight }]}>
                    {contact.message}
                </Text>
            </View>
        </View>
    )
}
export default MessageComponent;