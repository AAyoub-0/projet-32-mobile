import { Association } from "./Association";
import { Particulier } from "./Particulier";
import { Materiel } from "./Materiel";

export class Reservation {
    id: number;
    dateReservation: Date;
    dateRetour: Date;
    statutReservation: string;
    materiel: Materiel;
    quantite: number;
    association: Association | null;
    particulier: Particulier | null;

    constructor(id: number, dateReservation: Date, dateRetour: Date, materiel: Materiel, quantite: number, statutReservation: string, association: Association | null, particulier: Particulier | null) {
        this.id = id;
        this.dateReservation = dateReservation;
        this.dateRetour = dateRetour;
        this.materiel = materiel;
        this.quantite = quantite;
        this.statutReservation = statutReservation;
        this.association = association;
        this.particulier = particulier;
    }
}