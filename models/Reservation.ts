import { Association } from "./Association";
import { Particulier } from "./Particulier";
import { Materiel } from "./Materiel";
import { StatutReservationEnum } from "./StatutReservationEnum";

export class Reservation {
    id: number;
    dateReservation: Date;
    dateRetour: Date;
    statutReservation: StatutReservationEnum;
    materiel: Materiel;
    quantite: number;
    association: Association | null;
    particulier: Particulier | null;

    constructor(id: number, dateReservation: Date, dateRetour: Date, materiel: Materiel, quantite: number, statutReservation: StatutReservationEnum, association: Association | null, particulier: Particulier | null) {
        this.id = id;
        this.dateReservation = dateReservation;
        this.dateRetour = dateRetour;
        this.materiel = materiel;
        this.quantite = quantite;
        this.statutReservation = statutReservation;
        this.association = association;
        this.particulier = particulier;
    }

    static fromJson(json: any): Reservation {
        const jsonParsed = JSON.parse(json as string);
        return jsonParsed as Reservation;
    }

    static toJson(reservation: Reservation): string {
        // nedd to handle cyclic object value for association and particulier
        if (reservation.association != null) {
            reservation.association.reservations = [];
        }
        if (reservation.particulier != null) {
            reservation.particulier.reservations = [];
        }
        return JSON.stringify(reservation);
    }

    static dateToText(date: Date | undefined): string {
        if (date == undefined) {
            return "";
        }
        const dateParsed = new Date(date);
        return dateParsed.toLocaleDateString();
    }
}