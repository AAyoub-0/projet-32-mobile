import { Reservation } from './Reservation';

export class Particulier {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    reservations?: Reservation[];

    constructor(id: number, nom: string, prenom: string, telephone: string, reservations: Reservation[]) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.reservations = reservations;
    }
}