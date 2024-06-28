// react-native
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from 'react';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';

// models
import { Contact } from "@/models/Contact";


// Props
type Props = {
    contact: Contact
}

const ContactFormulaireView: React.FC<Props> = ({ contact }) => {

    const titre = contact.nom + ' ' + contact.prenom;
    const [reponse, setReponse] = React.useState('');
    const [objetReponse, setObjetReponse] = React.useState('Re: ' + contact.objet);

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Text style={[Texts.textBody, Texts.textSemiBold]}>
                {titre} - {contact.email}
            </Text>
            
            <Line margin={20} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
            
            <View style={{flexDirection: 'column', rowGap: 23}}>
                <Text style={[Texts.textTitle, Texts.textBold]}>
                    {contact.objet}
                </Text>

                <Text style={[Texts.textBodySmall, Texts.textSemiBold]}>
                    {contact.message}
                </Text>

                <TouchableOpacity onPress={_ => setModalVisible(true)} style={{backgroundColor: Colors.colorSuccess, padding: 8, borderRadius: 8, alignSelf: 'flex-end', flexDirection: 'row', columnGap: 10}}>
                  <Text style={[Texts.textSubtitle, Texts.textBold, {color: Colors.colorWhite}]}>
                      Répondre
                  </Text>
                  <FontAwesome name="reply" size={15} color={Colors.colorWhite} />
              </TouchableOpacity>
            </View>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ rowGap: 23, flexDirection: 'column', backgroundColor: Colors.colorWhite, padding: 20, borderRadius: 10, width: '80%' }}>
                        <Text style={[Texts.textTitle, Texts.textBold]}>
                            Réponse
                        </Text>
                        <TextInputFlat
                            placeholder="Entrez l'objet de votre réponse"
                            value={objetReponse}
                            onChangeText={setObjetReponse}
                            border={[1, 1, 1, 1]}
                            borderRadius={8}
                        />
                        <TextInputFlat
                            placeholder="Entrez votre message de réponse"
                            value={reponse}
                            onChangeText={setReponse}
                            height={300}
                            multiline={true}
                            numberOfLines={10}
                            border={[1, 1, 1, 1]}
                            borderRadius={8}
                        />
                        <TouchableOpacity onPress={_ => setModalVisible(false)} style={{backgroundColor: Colors.colorSuccess, padding: 8, borderRadius: 8, alignSelf: 'flex-end', flexDirection: 'row', columnGap: 10}}>
                            <Text style={[Texts.textSubtitle, Texts.textBold, {color: Colors.colorWhite}]}>
                                Envoyer
                            </Text>
                            <FontAwesome name="send" size={15} color={Colors.colorWhite} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}
export default ContactFormulaireView;