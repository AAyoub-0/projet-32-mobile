import axios from 'axios';
import { ReservationMateriel } from '@/models/ReservationMateriel';
import { Reservation } from '@/models/Reservation';
import { Materiel } from '@/models/Materiel';
import { getMaterielByUri } from './MaterielService';
import { getReservationsByUri } from './ReservationService';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const API_URL = 'http://192.168.1.83:8000/api';
const SERVER_URL = 'http://192.168.1.83:8000'

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

export const getReservationMateriels = async (): Promise<ReservationMateriel[]> => {
    try {
        const response = await api.get('/reservation_materiels');

        const reservationMateriels: ReservationMateriel[] = [];
        
        for (const json of response.data) {
            const reservation = await getReservationsByUri(json.reservation);
            const materiel = await getMaterielByUri(json.materiel);
            reservationMateriels.push(new ReservationMateriel(json.id, reservation, materiel, json.quantite));
        }

        return reservationMateriels;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createReservationMateriel = async (reservation: ReservationMateriel): Promise<ReservationMateriel> => {
    try {
        
        const json = {
            reservation: '/api/reservations/' + reservation.reservation.id,
            materiel: '/api/materiels/' + reservation.materiel.id,
            quantite: reservation.quantite
        }
        console.log('json:', json);
        const response = await api.post('/reservation_materiels', JSON.stringify(json));
        return response.data as ReservationMateriel;
    } catch (error) {
        throw error;
    }
}