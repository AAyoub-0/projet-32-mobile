import { Association } from '@/models/Association';
import axios from 'axios';

const API_URL = 'http://192.168.1.83:8000/api';
const SERVER_URL = 'http://192.168.1.83:8000';

// Configuration d'axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
const server = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


export const getAssociations = async (): Promise<Association[]> => {
    try {
        const response = await api.get('/associations');
        const associationsData = response.data;
        
        // Mapper les résultats en instances de la classe Association
        const associations = associationsData.map((data: any) => {
            return new Association(
                data.id,
                data.nom,
                data.telephone,
                data.email,
                data.reservations,
                data.utilisateur
            );
        });

        return associations;
    } catch (error) {
        console.error('Erreur lors de la récupération des associations:', error);
        throw error;
    }
};

export const getAssociationByUri = async (uri: string): Promise<Association | null> => {
    try {
        console.log('uri', uri);
        const response = await server.get(uri);
        const associationData = response.data;
        if (associationData) {
            return new Association(
                associationData.id,
                associationData.nom,
                associationData.telephone,
                associationData.email,
                associationData.reservations,
                associationData.utilisateur
            );
        }
        return null;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'association:', error);
        throw error;
    }
}

export const getAssociationByEmail = async (email: string): Promise<Association | null> => {
    try {
        const response = await api.get('/associations?email=' + email);
        const associationData = response.data[0];
        if (associationData) {
            return Association.fromJson(associationData);
        }
        return null;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'association:', error);
        throw error;
    }
};

export const createIfNotExist = async (association: Association): Promise<Association> => {
    try {
        const associationExist = await getAssociationByEmail(association.email);

        if (associationExist) {
            const associationData = await getAssociationByEmail(association.email);
            return associationData as Association;
        }

        const jsonAssociation = {
            nom: association.nom,
            telephone: association.telephone,
            email: association.email,
            reservation: [],
            utilisateur: null,
            reservations: []
        }
        
        const response = await api.post('/associations', JSON.stringify(jsonAssociation));
        return new Association(
            response.data.id,
            response.data.nom,
            response.data.telephone,
            response.data.email,
            response.data.reservations,
            response.data.utilisateur
        );
    } catch (error) {
        console.error('Erreur lors de la création de l\'association:', error);
        throw error;
    }
};
