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
        return new ReservationMateriel(
            json.id,
            json.reservation,
            json.materiel,
            json.quantite
        );
    }

    static toJson(reservation: ReservationMateriel): string {
        return JSON.stringify(reservation);
    }
}