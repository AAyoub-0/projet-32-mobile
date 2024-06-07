export class Evenement {
    id: number;
    nom: string;
    date: Date;
    lieu: string;
    commentaire: string;
    isActualite: boolean;
    imageUrl?: string;

    constructor(id: number, nom: string, date: Date, lieu: string, commentaire: string, isActualite: boolean, imageUrl?: string) {
        this.id = id;
        this.nom = nom;
        this.date = date;
        this.lieu = lieu;
        this.commentaire = commentaire;
        this.isActualite = isActualite;
        this.imageUrl = imageUrl;
    }

    getJour(): number {
        return this.date.getDate();
    }

    getMois(): string {
        const options: Intl.DateTimeFormatOptions = { month: 'long' };
        const month = new Intl.DateTimeFormat('fr-FR', options).format(this.date);
        return month.charAt(0).toUpperCase() + month.slice(1);
    }

    getAnnee(): number {
        return this.date.getFullYear();
    }
}