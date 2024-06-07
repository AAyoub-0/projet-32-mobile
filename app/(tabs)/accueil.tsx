// react-native
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { FontAwesome } from '@expo/vector-icons';
import { Stack } from "expo-router";

// constants
import * as Colors from '../../constants/Colors';
import * as Texts from '../../constants/Texts';

// components
import DernieresActualite from '../../components/DerniereActualite';
import ActualiteFuture from '../../components/ActualiteFuture';
import Line from '../../components/Line';
import TextInputFlat from '../../components/TextInputFlat';

// models
import { Evenement } from '../../models/Evenement';

const Accueil = () => {
    const evenement = new Evenement(1, 'Fête des classes', new Date(2022, 6, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://hips.hearstapps.com/hmg-prod/images/large-cat-breed-1553197454.jpg?crop=1.00xw:0.505xh;0,0.0817xh&resize=640:*');
    const evenement2 = new Evenement(2, "Fête de l'Eté à la Halle organisée en partenariat avec la Mairie", new Date(2022, 4, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');

    const evenementFutur = new Evenement(3, 'CSV - TOURNOI u6 u7 - GYMNASE', new Date(2024, 3, 2), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur2 = new Evenement(4, 'CSV - TOURNOI u8 u9 - GYMNASE', new Date(2024, 3, 9), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur3 = new Evenement(5, 'CSV - TOURNOI u10 u11 - GYMNASE', new Date(2024, 3, 16), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur4 = new Evenement(6, 'CSV - TOURNOI u12 u13 - GYMNASE', new Date(2024, 3, 23), 'Salle des fêtes', 'Venez nombreux', false);

    const headerHeight = useHeaderHeight()

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerBackground: () => (
                        <View style={{ backgroundColor: Colors.colorPrimary, paddingBottom: 5 }} >
                            <View style={styles.hamburger}>
                                <TouchableOpacity>
                                    <FontAwesome name="bars" size={24} color={Colors.colorWhite} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.menus}>
                                <TouchableOpacity style={styles.menuSelected}>
                                    <Text style={Texts.textLinkWhite}>Dernières actualités</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={Texts.textLinkWhite}>Le Comité</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={Texts.textLinkWhite}>Nous contacter</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}>  
            </Stack.Screen>

            <View style={{paddingTop: headerHeight + 40 }}>
                <ScrollView style={styles.container}>
                    <Text style={[Texts.textTitle, Texts.textBold]} >Bienvenue sur le site du comité des fêtes de Vaulx-Milieu</Text>
                    
                    <Text style={[Texts.textTitleBlue, Texts.textBold, { marginTop: 23, marginBottom: 15 }]}>Dernières actualités</Text>
                    <DernieresActualite evenement={evenement} />
                    <Line margin={10} width={'100%'} backgroundColor={Colors.colorBorderLight} rounded={true} />
                    <DernieresActualite evenement={evenement2} />

                    <Text style={[Texts.textTitleBlue, Texts.textBold, { marginTop: 23, marginBottom: 15 }]}>Actualités à venir</Text>
                    <View style={styles.actualiteFuture}>
                        <ActualiteFuture evenement={evenementFutur} />
                        <ActualiteFuture evenement={evenementFutur2} />
                        <ActualiteFuture evenement={evenementFutur3} />
                        <ActualiteFuture evenement={evenementFutur4} />
                    </View>

                    <Line margin={46} width={'100%'} backgroundColor={Colors.colorBorderLight} rounded={true} />

                    <View style={styles.leComite}>
                        <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]}>Le Comité</Text>
                        <Text style={[Texts.textBody]}>
                            Le Comité des Fêtes se compose des 7 membres du bureau et de 37 membres actifs {"\n"}{"\n"}
                            Le Comité des Fêtes est une <Text style={Texts.textBold}>association</Text> régie par la loi du 1er juillet 1901. Elle a pour but de <Text style={Texts.textBold}>fédérer</Text> toutes celles et ceux qui ont le désir d'apporter leurs idées et leur savoir-faire et de les mettre en œuvre au sein d'une équipe dans le but d'apporter leur contribution à l'animation de la commune. {"\n"}{"\n"}
                            Il organise diverses <Text style={Texts.textBold}>manifestations</Text> ainsi que la <Text style={Texts.textBold}>Fête des Classes</Text> (fête qui se déroule le 14 Juillet dans la commune de Vaulx Milieu). {"\n"}{"\n"}
                            Le Comité des Fêtes est ouvert à <Text style={Texts.textBold}>toutes les associations</Text> locales ainsi qu'à <Text style={Texts.textBold}>toute personne</Text> désirant s'investir dans la vie associative de la commune. {"\n"}{"\n"}
                            Alors, n'hésitez pas, venez nous rejoindre au sein d'une équipe motivée !
                        </Text>
                    </View>

                    <Text style={[Texts.textTitleBlue, Texts.textBold, {marginBottom: 30, marginTop: 23}]}>Les membres du bureau</Text>

                    <View style={styles.membre}>
                        <Image style={{ width: 95, height: 93, transform: [{ translateX: -20 }, {translateY: -15}] }} source={{ uri: 'https://static.ess.com/uploads/Unknown-Female.jpg' }} />
                        <View>
                            <Text style={[Texts.textBig, Texts.textBold, Texts.textUnderline, {marginTop: 5, marginBottom: 6}]}>Présidente : </Text>
                            <Text style={[Texts.textBodyWhite, Texts.textBold]}>Magali Goudet</Text>
                        </View>
                    </View>

                    <Line margin={46} width={'100%'} backgroundColor={Colors.colorBorderLight} rounded={true} />

                    <Text style={[Texts.textTitle, Texts.textBold, { marginBottom: 15 }]}>Contactez nous</Text>

                    <Text style={[Texts.textSubtitle, Texts.textBold]}>Vous souhaitez nous contacter ?</Text>
                    <Text style={[Texts.textCaptionBlue, Texts.textSemiBold, { marginTop: 3 }]}>Remplissez le formulaire ci-dessous :</Text>
                    <Line marginTop={3} marginBottom={23} width={'99%'} backgroundColor={Colors.colorBorderLight} rounded={true} align="center" />
                    
                    <TextInputFlat placeholder={"Entrez votre Nom"} border={[0, 1, 0, 0]} />
                    <TextInputFlat placeholder={"Entrez votre prénom"} border={[0, 1, 0, 0]} />
                    <TextInputFlat placeholder={"Entrez votre adresse mail"} border={[0, 1, 0, 0]} />
                    <TextInputFlat placeholder={"Entrez l'objet du message"} border={[0, 1, 0, 0]} />
                    <TextInputFlat height={400} placeholder={"Entrez votre message"} border={[0, 1, 0, 0]} multiline={true} numberOfLines={5} />

                    <View style={{ marginBottom: 50 }} />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>

    )
}
export default Accueil;

const styles = StyleSheet.create({
    hamburger: {
        marginTop: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    menus: {
        flexDirection: 'row',
        columnGap: 20,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuSelected: {
        backgroundColor: Colors.colorBorderLight,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 28
    },
    actualiteFuture: {
        flexDirection: 'column',
        rowGap: 23
    },
    leComite: {
        backgroundColor: Colors.colorWhite,
        paddingHorizontal: 15,
        paddingVertical: 17,
        borderRadius: 10,
        shadowColor: Colors.colorBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    membre: {
        flexDirection: 'row',
        backgroundColor: Colors.colorSecondary,
        marginHorizontal: 20,
    }
});