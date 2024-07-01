import { Materiel } from "./Materiel";
import { ReservationCreation } from "./ReservationCreation";

export class ReservationMateriel {
    id: number;
    reservation: ReservationCreation;
    materiel: Materiel;
    quantite: number;

    constructor(id: number, reservation: ReservationCreation, materiel: Materiel, quantite: number) {
        this.id = id;
        this.reservation = reservation;
        this.materiel = materiel;
        this.quantite = quantite;
    }

    static fromJson(json: any): ReservationMateriel {
        const jsonObject = JSON.parse(json);
        const reservation = new ReservationCreation(new Date(jsonObject.reservation.dateReservation), new Date(jsonObject.reservation.dateRetour), jsonObject.reservation.reservationMateriels, jsonObject.reservation.statutReservation, jsonObject.reservation.association, jsonObject.reservation.particulier);
        reservation.setId(jsonObject.reservation.id);

        return new ReservationMateriel(
            jsonObject.id,
            reservation,
            new Materiel(jsonObject.materiel.id, jsonObject.materiel.libelle, jsonObject.materiel.prix, jsonObject.materiel.pourAssociation, jsonObject.materiel.nbExemplaires, jsonObject.materiel.nbExemplairesDisponibles, jsonObject.materiel.imageUrl),
            jsonObject.quantite
        );
    }

    static toJson(reservation: ReservationMateriel): string {
        return JSON.stringify(reservation);
    }
}