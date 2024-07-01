import { Contact } from '@/models/Contact';
import axios from 'axios';

const API_URL = 'http://192.168.1.83:8000/api';

// Configuration d'axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// GET: Récupérer tous les contact
export const getContacts = async (): Promise<Contact[]> => {
    try {
        const response = await api.get('/contacts');
        const contactsData = response.data;
        
        // Mapper les résultats en instances de la classe Contact
        const contacts = contactsData
        .filter((data: any) => data.email !== 'admin@admin.com')
        .map((data: any) => {
            return new Contact(
                data.id,
                data.lastname,
                data.name,
                data.email,
                data.message,
            );
        });

        return contacts;
    } catch (error) {
        console.error('Erreur lors de la récupération des contacts:', error);
        throw error;
    }
};

// POST: Créer un nouveau contact
export const createContact = async (contact: Contact): Promise<Contact> => {
    try {

        const json = {
            name: contact.prenom,
            email: contact.email,
            message: contact.message,
            lastname: contact.nom,
        }

        const response = await api.post('/contacts', JSON.stringify(json));
        const contactData = response.data;
        
        // Mapper les résultats en instances de la classe Contact
        const newContact = new Contact(
            contactData.id,
            contactData.nom,
            contactData.prenom,
            contactData.email,
            contactData.message,
        );

        return newContact;
    } catch (error) {
        console.error('Erreur lors de la création du contact:', error);
        throw error;
    }
};

// DELETE: Supprimer un contact
export const deleteContact = async (id: number): Promise<void> => {
    try {
        await api.delete(`/contacts/${id}`);
    } catch (error) {
        console.error('Erreur lors de la suppression du contact:', error);
        throw error;
    }
};