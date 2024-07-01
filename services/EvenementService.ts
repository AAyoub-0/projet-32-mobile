import { Evenement } from '@/models/Evenement';
import axios from 'axios';

const API_URL = 'http://192.168.1.83:8000/api';

// Configuration d'axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// GET: Récupérer tous les événements
export const getEvenements = async (): Promise<Evenement[]> => {
    try {
        const response = await api.get('/evenements');
        const evenementsData = response.data;
        
        // Mapper les résultats en instances de la classe Evenement
        const evenements = evenementsData.map((data: any) => {
            return new Evenement(
                data.id,
                data.nom,
                data.date,
                data.lieu,
                data.commentaire,
                data.is_actuality,
                data.imageUrl
            );
        });

        return evenements;
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        throw error;
    }
};

export const getEvenementsByYear = async (year: number): Promise<Evenement[]> => {
    try {
        const response = await api.get(`/evenements?date_year=${year}`);
        const evenementsData = response.data;
        
        // Mapper les résultats en instances de la classe Evenement
        const evenements = evenementsData.map((data: any) => {
            return new Evenement(
                data.id,
                data.nom,
                data.date,
                data.lieu,
                data.commentaire,
                data.is_actuality,
                data.imageUrl
            );
        });

        return evenements;
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        throw error;
    }
}

export const getTwoLastActualities = async (): Promise<Evenement[]> => {
    try {
        const response = await api.get('/evenements?is_actuality=true&_limit=2&_sort=date:DESC');
        const evenementsData = response.data;
        // console.error('evenementsData', evenementsData);
        
        // Mapper les résultats en instances de la classe Evenement
        const evenements = evenementsData.map((data: any) => {
            let image: string = "";
            if(data.media.length > 0) {
                image = data.media[0].chemin;
            }
            return new Evenement(
                data.id,
                data.nom,
                data.date,
                data.lieu,
                data.commentaire,
                data.is_actuality,
                image
            );
        });

        evenements.sort((a: Evenement, b: Evenement) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const topTwoEvenements = evenements.slice(0, 2);

        return topTwoEvenements;
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        throw error;
    }
}

export const getFourNextEvents = async (): Promise<Evenement[]> => {
    try {
        const response = await api.get('/evenements?is_actuality=false');
        const evenementsData = response.data;
        
        // Mapper les résultats en instances de la classe Evenement
        const evenements = evenementsData.map((data: any) => {
            let image: string = "";
            if(data.media.length > 0) {
                image = data.media[0].chemin;
            }
            return new Evenement(
                data.id,
                data.nom,
                data.date,
                data.lieu,
                data.commentaire,
                data.is_actuality,
                image
            );
        });

        // get the four events that are after today
        const today = new Date();
        const topFourEvenements = evenements.filter((evenement: Evenement) => new Date(evenement.date).getTime() >= today.getTime()).slice(0, 4);

        return topFourEvenements;
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        throw error;
    }
}

// GET: Récupérer un événement par ID
export const getEvenementById = async (id: number) => {
    try {
        const response = await api.get(`/evenements/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'événement avec ID ${id}:`, error);
        throw error;
    }
};

// POST: Créer un nouvel événement
export const createEvenement = async (evenement: Evenement) => {
    try {
        const json = {
            nom: evenement.nom,
            date: evenement.date,
            lieu: evenement.lieu,
            commentaire: evenement.commentaire,
            is_actuality: false,
            organisateur: null,
            media: [],
            isActuality: false
        }

        const response = await api.post('/evenements', JSON.stringify(json));

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'événement:', error);
        throw error;
    }
};

// PUT: Mettre à jour un événement par ID
export const updateEvenement = async (evenement: Evenement) => {
    try {
        const json = {
            nom: evenement.nom,
            date: evenement.date,
            lieu: evenement.lieu,
            commentaire: evenement.commentaire,
            is_actuality: false,
            organisateur: null,
            media: [],
            isActuality: false
        }

        const response = await api.put(`/evenements/${evenement.id}`, JSON.stringify(json));
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'événement avec ID ${evenement.id}:`, error);
        throw error;
    }
};

// DELETE: Supprimer un événement par ID
export const deleteEvenement = async (id: number) => {
    try {
        const response = await api.delete(`/evenements/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la suppression de l'événement avec ID ${id}:`, error);
        throw error;
    }
};
