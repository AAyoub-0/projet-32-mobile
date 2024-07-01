import axios from 'axios';
import { Materiel } from '@/models/Materiel';
import { Reservation } from '@/models/Reservation';
import { ReservationCreation } from '@/models/ReservationCreation';
import { Association } from '@/models/Association';
import { createIfNotExist } from './AssociationService';
import { createParticulierIfNotExists } from './ParticulierService';
import { createReservationMateriel } from './ReservationMaterielService';
import { ReservationMateriel } from '@/models/ReservationMateriel';

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

export const createReservation = async (reservation: Reservation): Promise<ReservationCreation> => {
    try {
        if(reservation.association){
            const association = await createIfNotExist(reservation.association);
            reservation.association = association;
        }
        if(reservation.particulier){
            const particulier = await createParticulierIfNotExists(reservation.particulier);
            reservation.particulier = particulier;
        }

        let statutId = 0;
        switch (reservation.statutReservation) {
            case 'En attente':
                statutId = 1;
                break;
            case 'En cours':
                statutId = 2;
                break;
            case 'Terminée':
                statutId = 3;
            default:
                statutId = 1;
                break;
        }

        const reservationCreation = new ReservationCreation (
            reservation.dateReservation,
            reservation.dateRetour,
            [],
            "/api/statut_reservations/" + statutId,
            reservation.association != null ? '/api/associations/' + reservation.association.id : null,
            reservation.particulier != null ? '/api/particuliers/' + reservation.particulier.id : null
        )

        const response = await api.post('/reservations', JSON.stringify(reservationCreation));

        reservationCreation.setId(response.data.id);
        
        await createReservationMateriel(new ReservationMateriel(
            0,
            reservationCreation,
            reservation.materiel,
            reservation.quantite,
        ))
        
        return new ReservationCreation(
            response.data.dateReservation,
            response.data.dateRetour,
            response.data.reservationMateriels,
            response.data.statutReservation,
            response.data.association ? '/api/associations/' + response.data.association.id : null,
            response.data.particulier ? '/api/particuliers/' + response.data.particulier.id : null
        );

    } catch (error) {
        console.error('Erreur lors de la création de la réservation:', error);
        throw error;
    }
};

export const patchReservation = async (reservation: ReservationCreation, id: number): Promise<ReservationCreation> => {
    try {
        let statutId = 0;
        switch (reservation.statutReservation) {
            case 'En attente':
                statutId = 2;
                break;
            case 'En cours':
                statutId = 2;
                break;
            case 'Terminée':
                statutId = 3;
                break;
            case 'Supprimée':
                statutId = 4;
                break;
            default:
                statutId = 2;
                break;
        }
        console.log('reservation', reservation);
        const json = {
            dateReservation: reservation.dateReservation,
            dateRetour: reservation.dateRetour,
            reservationMateriels: reservation.reservationMateriels,
            statutReservation: '/api/statut_reservations/' + statutId,
            association: reservation.association ? reservation.association : null,
            particulier: reservation.particulier ? reservation.particulier : null
        }
        console.log('json:', json);

        const response = await api.patch('/reservations/' + id, JSON.stringify(json), {
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }
        });

        return reservation;
    } catch (error) {
        console.error('Erreur lors de la modification de la réservation:', error);
        throw error;
    }
}

export const getReservationsByUri = async (uri: string): Promise<ReservationCreation | null> => {
    try {
        const response = await server.get(uri);

        if(response.data.statutReservation.libelle === 'Supprimée'){
            return null;
        }

        const reservation = new ReservationCreation(
            response.data.dateReservation,
            response.data.dateRetour,
            response.data.reservationMateriels,
            response.data.statutReservation.libelle,
            response.data.association,
            response.data.particulier
        );
        reservation.setId(response.data.id);
        return reservation;
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
        throw error;
    }
}