import { Association } from './Association';

export class Utilisateur {
    id: number;
    login: string;
    password: string;
    role: string;
    association: Association;

    constructor(id: number, login: string, password: string, role: string, association: Association) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.role = role;
        this.association = association;
    }
}