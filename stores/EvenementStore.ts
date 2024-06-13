import { Evenement } from "@/models/Evenement";
import AsyncStorage from '@react-native-async-storage/async-storage';

export class EvenementStore {
    evenements: Evenement[];

    constructor() {
        this.evenements = [];
    }


    async store(evenement: Evenement) {
        try{
            this.evenements.push(evenement);
            await AsyncStorage.setItem(
                'evenements',
                JSON.stringify(this.evenements)
            );
        }
        catch(e){
            console.log(e);
        }
    }

    async get() {
        try{
            const evenements = await AsyncStorage.getItem('evenements');
            if(evenements !== null){
                this.evenements = JSON.parse(evenements);
            }
        }
        catch(e){
            console.log(e);
        }
    }
}