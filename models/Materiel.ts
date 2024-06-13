export class Materiel {
    id: number;
    libelle: string;
    prix: number;
    pourAssociation: boolean;
    nbExemplaires: number;
    nbExemplairesDisponibles: number;
    imageUrl?: string;

    constructor(id: number, libelle: string, prix: number, pourAssociation: boolean, nbExemplaires: number, nbExemplairesDisponibles: number, imageUrl?: string) {
        this.id = id;
        this.libelle = libelle;
        this.prix = prix;
        this.pourAssociation = pourAssociation;
        this.nbExemplaires = nbExemplaires;
        this.nbExemplairesDisponibles = nbExemplairesDisponibles;
        this.imageUrl = imageUrl;
    }
}