export class Materiel {
    id: number;
    libelle: string;
    prix: number;
    pourAssociation: boolean;
    nbExemplaires: number;
    nbExemplairesDisponibles: number;
    imageUrl?: string;
    imageFile?: string;

    constructor(id: number, libelle: string, prix: number, pourAssociation: boolean, nbExemplaires: number, nbExemplairesDisponibles: number, imageUrl?: string) {
        this.id = id;
        this.libelle = libelle;
        this.prix = prix;
        this.pourAssociation = pourAssociation;
        this.nbExemplaires = nbExemplaires;
        this.nbExemplairesDisponibles = nbExemplairesDisponibles;
        this.imageUrl = imageUrl;
    }

    static fromJson(json: any): Materiel {
        const parsedJson = JSON.parse(json as string);
        return parsedJson as Materiel;
    }

    static toJson(materiel: Materiel): string {
        return JSON.stringify(materiel);
    }

    setFile(file: string) {
        this.imageFile = file;
    }

    static apiImageUrl = 'http://192.168.1.83:8000/uploads/materiels/'
}