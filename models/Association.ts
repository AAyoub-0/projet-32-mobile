import { Reservation } from './Reservation';
import { Utilisateur } from './Utilisateur';

export class Association {
    id: number;
    nom: string;
    telephone: string;
    email: string;
    reservations?: string[]
    utilisateur?: string | null;

    constructor(id: number, nom: string, telephone: string, email: string, reservations: string[], utilisateur: string | null) {
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;
        this.reservations = reservations;
        this.utilisateur = utilisateur;
    }

    static fromJson(data: any): Association {
        return new Association(
            data.id,
            data.nom,
            data.telephone,
            data.email,
            data.reservations,
            data.utilisateur
        );
    }
}