// react-native
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Stack, Link, router } from "expo-router";

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import Line from '@/components/Line';
import TextInputFlat from '@/components/TextInputFlat';
import MaterielComponent from "@/components/MaterielComponent";

// models
import { Materiel } from "@/models/Materiel";


const GestionMateriel = ({ }) => {

    const materiel = new Materiel(1, 'Remorque réfrigérée de 6m3 en Mono 230 V', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel2 = new Materiel(2, 'Parapluie', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel3 = new Materiel(3, 'Chaise de camping', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel4 = new Materiel(4, 'Table 10x2m', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');
    const materiel5 = new Materiel(5, 'Camion', 1, false, 4, 2, 'https://m.media-amazon.com/images/I/61pCWRdyhbL._AC_UF1000,1000_QL80_.jpg');

    const materiels = [materiel, materiel2, materiel3, materiel4, materiel5];

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen options={
                {
                    headerTitle: 'Gestion du matériel',
                    headerBackTitle: 'Retour',
                }
            }> 
            </Stack.Screen>


            <View>
                <ScrollView style={styles.container} alwaysBounceVertical={false} bounces={false}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[Texts.textTitle, Texts.textBold, {maxWidth: '70%'}]} >
                            Gérer le matériel
                        </Text>

                        <TouchableOpacity style={styles.ajoutBouton} onPress={_ => {
                            router.push({
                                pathname: '/formulaire/MaterielFormulaire',
                                params: { parameter: null }
                            })
                        }}>
                            <Text style={[Texts.textSubtitle, Texts.textBold, {color: Colors.colorWhite}]}>
                                Ajouter du matériel
                            </Text>
                            <FontAwesome name="plus" size={20} color={Colors.colorWhite} />
                        </TouchableOpacity>
                    </View>

                    <Line margin={20} width={'100%'} orientation="horizontal" backgroundColor={Colors.colorGray} rounded={false} />
                    <TextInputFlat placeholder="Rechercher du matériel" border={[1, 1, 1, 1]} borderRadius={8} rightIcon={'search'} />
                    
                    {materiels.map((materiel, index) => (
                            <MaterielComponent key={index} materiel={materiel} showPrice={true} onPress={() => {
                                router.push({
                                    pathname: '/formulaire/MaterielFormulaire',
                                    params: { parameter: Materiel.toJson(materiel) }
                                });
                            }} />
                        ))}

                    <View style={{ marginBottom: 80 }} />

                </ScrollView>
            </View>
        </KeyboardAvoidingView> 
    )
}
export default GestionMateriel;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    },
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