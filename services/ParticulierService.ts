import { Particulier } from '@/models/Particulier';
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


export const createParticulier = async (particulier: Particulier): Promise<Particulier> => {
    try {
        const json = {
            nom: particulier.nom,
            prenom: particulier.prenom,
            telephone: particulier.telephone,
            reservation: [],
            email: particulier.email,
        };

        const response = await api.post('/particuliers', JSON.stringify(json));
        return new Particulier(
            response.data.id,
            response.data.nom,
            response.data.prenom,
            response.data.telephone,
            response.data.reservations,
            response.data.email,
        );
    } catch (error) {
        console.error('Erreur lors de la création du particulier:', error);
        throw error;
    }
}