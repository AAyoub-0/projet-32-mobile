import { Reservation } from './Reservation';

export class Particulier {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    reservations?: Reservation[];
    email: string;

    constructor(id: number, nom: string, prenom: string, telephone: string, reservations: Reservation[], email: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.reservations = reservations;
        this.email = email;
    }
}