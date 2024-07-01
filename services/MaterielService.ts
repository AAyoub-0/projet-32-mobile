import axios from 'axios';
import { Materiel } from '@/models/Materiel';

const API_URL = 'http://192.168.1.83:8000/api';
const SERVER_URL = 'http://192.168.1.83:8000';

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

export const getMateriels = async (): Promise<Materiel[]> => {
    try {
        const response = await api.get('/materiels');

        const materiels = response.data.map((data: any) => {
            return new Materiel(
                data.id,
                data.libelle,
                data.prix,
                data.pourAssociation,
                data.nbExemplaires,
                data.nbExemplairesDispo,
                data.image
            );
        });

        return materiels;
    } catch (error) {
        console.error('Erreur lors de la récupération des matériels:', error);
        throw error;
    }
};

export const getMaterielById = async (id: number): Promise<Materiel> => {
    try {
        const response = await api.get(`/materiels/${id}`);
        
        return new Materiel(
            response.data.id,
            response.data.libelle,
            response.data.prix,
            response.data.pourAssociation,
            response.data.nbExemplaires,
            response.data.nbExemplairesDispo,
            response.data.image
        );

    } catch (error) {
        console.error(`Erreur lors de la récupération du matériel avec ID ${id}:`, error);
        throw error;
    }
};

export const createMateriel = async (materiel: FormData): Promise<Materiel> => {
    try {
        const response = await api.post('/materiels', materiel, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
        
        return new Materiel(
            response.data.id,
            response.data.libelle,
            response.data.prix,
            response.data.pourAssociation,
            response.data.nbExemplaires,
            response.data.nbExemplairesDispo,
            response.data.image
        );
    } catch (error) {
        console.error('Erreur lors de la création du matériel:', error);
        throw error;
    }
};

export const updateMateriel = async (id: number, materiel: FormData): Promise<Materiel> => {
    try {
        console.log('updateMateriel', id, materiel);
        const response = await api.post(`/materiels/${id}`, materiel, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
        
        return new Materiel(
            response.data.id,
            response.data.libelle,
            response.data.prix,
            response.data.pourAssociation,
            response.data.nbExemplaires,
            response.data.nbExemplairesDispo,
            response.data.image
        );
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du matériel avec ID ${id}:`, error);
        throw error;
    }
};

export const deleteMateriel = async (id: number): Promise<void> => {
    try {
        await api.delete(`/materiels/${id}`);
    } catch (error) {
        console.error(`Erreur lors de la suppression du matériel avec ID ${id}:`, error);
        throw error;
    }
};

export const getMaterielByUri = async (uri: string): Promise<Materiel> => {
    try {
        const response = await server.get(uri);
        
        return new Materiel(
            response.data.id,
            response.data.libelle,
            response.data.prix,
            response.data.pourAssociation,
            response.data.nbExemplaires,
            response.data.nbExemplairesDispo,
            response.data.image
        );
    } catch (error) {
        console.error(`Erreur lors de la récupération du matériel avec URI ${uri}:`, error);
        throw error;
    }
}
