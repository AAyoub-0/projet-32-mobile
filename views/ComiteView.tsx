// react-native
import { StyleSheet, View, Text, Image } from "react-native";

// constants
import * as Colors from '../constants/Colors';
import * as Texts from '../constants/Texts';


const ComiteView = () => {
    return (
        <View>
            <View>
                <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 23}]}>Le Comité</Text>
                <Text style={[Texts.textBody]}>
                    Le Comité des Fêtes se compose des 7 membres du bureau et de 37 membres actifs {"\n"}{"\n"}
                    Le Comité des Fêtes est une <Text style={Texts.textBold}>association</Text> régie par la loi du 1er juillet 1901. Elle a pour but de <Text style={Texts.textBold}>fédérer</Text> toutes celles et ceux qui ont le désir d'apporter leurs idées et leur savoir-faire et de les mettre en œuvre au sein d'une équipe dans le but d'apporter leur contribution à l'animation de la commune. {"\n"}{"\n"}
                    Il organise diverses <Text style={Texts.textBold}>manifestations</Text> ainsi que la <Text style={Texts.textBold}>Fête des Classes</Text> (fête qui se déroule le 14 Juillet dans la commune de Vaulx Milieu). {"\n"}{"\n"}
                    Le Comité des Fêtes est ouvert à <Text style={Texts.textBold}>toutes les associations</Text> locales ainsi qu'à <Text style={Texts.textBold}>toute personne</Text> désirant s'investir dans la vie associative de la commune. {"\n"}{"\n"}
                    Alors, n'hésitez pas, venez nous rejoindre au sein d'une équipe motivée !
                </Text>
            </View>

            <Text style={[Texts.textTitle, Texts.textBold, {marginBottom: 30, marginTop: 23}]}>Les membres du bureau</Text>

            <View style={styles.membre}>
                <Image style={{ width: 95, height: 93, transform: [{ translateX: -20 }, {translateY: -15}] }} source={{ uri: 'https://static.ess.com/uploads/Unknown-Female.jpg' }} />
                <View>
                    <Text style={[Texts.textBig, Texts.textBold, Texts.textUnderline, {marginTop: 5, marginBottom: 6}]}>Présidente : </Text>
                    <Text style={[Texts.textBodyWhite, Texts.textBold]}>Magali Goudet</Text>
                </View>
            </View>
        </View>
        
    )
}
export default ComiteView;

const styles = StyleSheet.create({
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