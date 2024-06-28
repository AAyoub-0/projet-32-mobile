import { Reservation } from './Reservation';
import { Utilisateur } from './Utilisateur';

export class Association {
    id: number;
    nom: string;
    telephone: string;
    email: string;
    reservations?: Reservation[]
    utilisateur?: Utilisateur

    constructor(id: number, nom: string, telephone: string, email: string, reservations: Reservation[], utilisateur: Utilisateur) {
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;
        this.reservations = reservations;
        this.utilisateur = utilisateur;
    }
}