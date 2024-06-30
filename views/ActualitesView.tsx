// react-native
import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

// services
import { getTwoLastActualities, getFourNextEvents } from '@/services/EvenementService';

// constants
import * as Colors from '@/constants/Colors';
import * as Texts from '@/constants/Texts';

// components
import DernieresActualite from '@/components/DerniereActualite';
import ActualiteFuture from '@/components/ActualiteFuture';
import Line from '@/components/Line';

// models
import { Evenement } from '@/models/Evenement';

const ActualitesView = () => {
    const evenement = new Evenement(1, 'Fête des classes', new Date(2022, 6, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://hips.hearstapps.com/hmg-prod/images/large-cat-breed-1553197454.jpg?crop=1.00xw:0.505xh;0,0.0817xh&resize=640:*');
    const evenement2 = new Evenement(2, "Fête de l'Eté à la Halle organisée en partenariat avec la Mairie", new Date(2022, 4, 1), 'Salle des fêtes', 'Venez nombreux', true, 'https://img.lemde.fr/2019/05/17/240/0/3553/1773/1342/671/60/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg');

    const evenementFutur = new Evenement(3, 'CSV - TOURNOI u6 u7 - GYMNASE', new Date(2024, 3, 2), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur2 = new Evenement(4, 'CSV - TOURNOI u8 u9 - GYMNASE', new Date(2024, 3, 9), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur3 = new Evenement(5, 'CSV - TOURNOI u10 u11 - GYMNASE', new Date(2024, 3, 16), 'Salle des fêtes', 'Venez nombreux', false);
    const evenementFutur4 = new Evenement(6, 'CSV - TOURNOI u12 u13 - GYMNASE', new Date(2024, 3, 23), 'Salle des fêtes', 'Venez nombreux', false);

    const [evenements, setEvenements] = useState<Evenement[]>([]);
    const [actualites, setActualites] = useState<Evenement[]>([]);
    const [loading, setLoading] = useState<boolean>();

    const fetchActualites = async () => {
        setLoading(true);
        try {
            const actualites = await getTwoLastActualities();
            setActualites(actualites);
        } catch (error) {
            alert('Erreur lors de la récupération des événements');
        } finally {
            setLoading(false);
        }
    }

    const fetchEvenements = async () => {
        setLoading(true);
        try {
            const evenements = await getFourNextEvents();
            setEvenements(evenements);
        } catch (error) {
            alert('Erreur lors de la récupération des événements');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchActualites();
        fetchEvenements();
    }, []);

    if (loading) {
        return (
            <ActivityIndicator size="large" color={Colors.colorPrimary} />
        );
    }

    return (
        <View>
            <Text style={[Texts.textTitle, Texts.textBold]} >Bienvenue sur le site du comité des fêtes de Vaulx-Milieu</Text>
                    
            <Text style={[Texts.textTitleBlue, Texts.textBold, { marginTop: 23, marginBottom: 15 }]}>Dernières actualités</Text>
            {actualites.map((evenement, index) => {
                if (index < 1) return (
                    <View key={index}>
                        <DernieresActualite evenement={evenement} />
                        <Line margin={10} orientation="horizontal" backgroundColor={Colors.colorGrayLight} rounded width='100%' />
                    </View>
                )
                return <DernieresActualite key={index} evenement={evenement} />
            }
            )}

            <Text style={[Texts.textTitleBlue, Texts.textBold, { marginTop: 23, marginBottom: 15 }]}>Actualités à venir</Text>
            <View style={{ flexDirection: 'column', rowGap: 23}}>
                {evenements.map((evenement, index) => {
                    return <ActualiteFuture key={index} evenement={evenement} />
                })}
            </View>
        </View>
    )
}
export default ActualitesView;