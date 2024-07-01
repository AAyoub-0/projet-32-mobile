export class Evenement {
    id: number;
    nom: string;
    date: Date;
    lieu: string;
    commentaire: string;
    isActualite: boolean;
    imageUrl?: string;

    constructor(id: number, nom: string, date: Date | string, lieu: string, commentaire: string, isActualite: boolean, imageUrl?: string) {
        this.id = id;
        this.nom = nom;
        this.date = new Date(date);
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
        const stringMonth =  month.charAt(0).toUpperCase() + month.slice(1);

        if(stringMonth.length > 6) {
            let i = 0;

            switch(stringMonth) {
                case 'Janvier': i = 3; break;
                case 'Février': i = 3; break;
                case 'Juillet': i = 4; break;
                case 'Septembre': i = 4; break;
                case 'Octobre': i = 3; break;
                case 'Novembre': i = 3; break;
                case 'Décembre': i = 3; break;
            }

            return stringMonth.slice(0, i) + '.';
        }
        return stringMonth;
    }

    getAnnee(): number {
        return this.date.getFullYear();
    }

    static fromJson(json: any): Evenement {
        const jsonParsed = JSON.parse(json);
        return jsonParsed as Evenement;
    }

    static toJson(evenement: Evenement): string {
        return JSON.stringify(evenement);
    }

    static apiImageUrl = 'http://192.168.1.83:8000/uploads/medias/';
}