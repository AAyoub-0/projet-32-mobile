export class Contact {
    id: number;
    nom: string;
    prenom: string;
    objet: string;
    email: string;
    message: string;

    constructor(id: number, nom: string, prenom: string, objet: string, email: string, message: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.objet = objet;
        this.email = email;
        this.message = message;
    }
}