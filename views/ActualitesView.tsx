// react-native
import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

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

    const isFocused = useIsFocused();

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
        if (isFocused) {
            fetchActualites();
            fetchEvenements();
        }
    }, [isFocused]);

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