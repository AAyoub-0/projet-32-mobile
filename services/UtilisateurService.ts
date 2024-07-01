import { Utilisateur } from '@/models/Utilisateur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventEmitter from 'events';
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

class AuthService extends EventEmitter {
    async login(email: string, password: string) {
        try {
            const json = {
                username: email,
                password: password,
            }

            const response = await api.post('/login', JSON.stringify(json));
            const token = response.data.token;
            await AsyncStorage.setItem('token', 'ConnectionSuperSecureToken');

            // Emit login event
            this.emit('login', { email, token });

            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async logout() {
        await AsyncStorage.removeItem('token');

        this.emit('logout');
    }

    async getToken() {
        return await AsyncStorage.getItem('token');
    }

    async isLoggedIn() {
        const token = await this.getToken();
        return !!token;
    }
}

const authService = new AuthService();
export default authService;

