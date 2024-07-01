export class Contact {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    message: string;

    constructor(id: number, nom: string, prenom: string, email: string, message: string) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.message = message;
    }

    static fromJson(json: any): Contact {
        const jsonParsed = JSON.parse(json);
        return jsonParsed as Contact;
    }

    static toJson(contact: Contact): string {
        return JSON.stringify(contact);
    }
}