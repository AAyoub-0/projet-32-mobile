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


const getParticulierByEmail = async (email: string): Promise<Particulier> => {
    try {
        const response = await api.get('/particuliers?page=1&email=' + email);
        return new Particulier(
            response.data[0].id,
            response.data[0].nom,
            response.data[0].prenom,
            response.data[0].telephone,
            response.data[0].reservations,
            response.data[0].email,
        );
    } catch (error) {
        console.error('Erreur lors de la récupération du particulier:', error);
        throw error;
    }
}

export const createParticulierIfNotExists = async (particulier: Particulier): Promise<Particulier> => {
    try {
        const particulierExist = await getParticulierByEmail(particulier.email);
        if (particulierExist) {
            return particulierExist;
        }

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