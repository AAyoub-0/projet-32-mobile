import axios from 'axios';
import { Materiel } from '@/models/Materiel';
import { Reservation } from '@/models/Reservation';
import { ReservationCreation } from '@/models/ReservationCreation';
import { Association } from '@/models/Association';
import { createIfNotExist } from './AssociationService';
import { createParticulier } from './ParticulierService';

const API_URL = 'http://192.168.1.83:8000/api';

const api = axios.create({
    baseURL: API_URL,
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
            const particulier = await createParticulier(reservation.particulier);
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
            reservation.association ? '/api/associations/' + reservation.association.id : null,
            reservation.particulier ? '/api/particuliers/' + reservation.particulier.id : null
        )

        const response = await api.post('/reservations', JSON.stringify(reservationCreation));
        
        return new ReservationCreation(
            response.data.dateReservation,
            response.data.dateRetour,
            response.data.reservationMateriels,
            response.data.statutReservation,
            response.data.association,
            response.data.particulier
        );

    } catch (error) {
        console.error('Erreur lors de la création de la réservation:', error);
        throw error;
    }
};