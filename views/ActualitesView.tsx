// react-native
import { View, Text } from "react-native";

// constants
import * as Colors from '../constants/Colors';
import * as Texts from '../constants/Texts';

// components
import DernieresActualite from '../components/DerniereActualite';
import ActualiteFuture from '../components/ActualiteFuture';
import Line from '../components/Line';

// models
import { Evenement } from '../models/Evenement';

const ActualitesView = () => {
    const evenement = new Evenement(1, 'Fête des classes', new Date(2022, 6, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://hips.hearstapps.com/hmg-prod/images/large-cat-breed-1553197454.jpg?crop=1.00xw:0.505xh;0,0.0817xh&resize=640:*');
    const evenement2 = new Evenement(2, "Fête de l'Eté à la Halle organisée en partenariat avec la Mairie", new Date(2022, 4, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');

    const evenementFutur = new Evenement(3, 'CSV - TOURNOI u6 u7 - GYMNASE', new Date(2024, 3, 2), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur2 = new Evenement(4, 'CSV - TOURNOI u8 u9 - GYMNASE', new Date(2024, 3, 9), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur3 = new Evenement(5, 'CSV - TOURNOI u10 u11 - GYMNASE', new Date(2024, 3, 16), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur4 = new Evenement(6, 'CSV - TOURNOI u12 u13 - GYMNASE', new Date(2024, 3, 23), 'Salle des fêtes', 'Venez nombreux', false);

    return (
        <View>
            <Text style={[Texts.textTitle, Texts.textBold]} >Bienvenue sur le site du comité des fêtes de Vaulx-Milieu</Text>
                    
            <Text style={[Texts.textTitleBlue, Texts.textBold, { marginTop: 23, marginBottom: 15 }]}>Dernières actualités</Text>
            <DernieresActualite evenement={evenement} />
            <Line margin={10} width={'100%'} backgroundColor={Colors.colorBorderLight} rounded={true} />
            <DernieresActualite evenement={evenement2} />

            <Text style={[Texts.textTitleBlue, Texts.textBold, { marginTop: 23, marginBottom: 15 }]}>Actualités à venir</Text>
            <View style={{ flexDirection: 'column', rowGap: 23}}>
                <ActualiteFuture evenement={evenementFutur} />
                <ActualiteFuture evenement={evenementFutur2} />
                <ActualiteFuture evenement={evenementFutur3} />
                <ActualiteFuture evenement={evenementFutur4} />
            </View>
        </View>
    )
}
export default ActualitesView;