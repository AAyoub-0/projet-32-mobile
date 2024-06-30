import { Association } from "./Association";
import { Particulier } from "./Particulier";
import { Materiel } from "./Materiel";
import { Reservation } from "./Reservation";

export class ReservationMateriel {
    id: number;
    reservation: Reservation;
    materiel: Materiel;
    quantite: number;

    constructor(id: number, reservation: Reservation, materiel: Materiel, quantite: number) {
        this.id = id;
        this.reservation = reservation;
        this.materiel = materiel;
        this.quantite = quantite;
    }

    static fromJson(json: any): Reservation {
        const jsonParsed = JSON.parse(json as string);
        return jsonParsed as Reservation;
    }

    static toJson(reservation: Reservation): string {
        return JSON.stringify(reservation);
    }
}