import axios from "axios";
import {Punchline} from "../models/Punchline";


const API_URL = 'http://localhost:8080/api/punchlines'; // Remplacez par l'URL de votre API

const punchlineApiService = {

    async getAllPunchlines(): Promise<Punchline[]> {
        try {
            const response = await axios.get<Punchline[]>(`${API_URL}/all`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les citations:', error);
            return [];
        }
    },

    async getDifferentAuthors(author: string): Promise<string[] | null> {
        try {
            const response = await axios.post<string[]>(`${API_URL}/different-authors`, { author }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des auteurs différents:', error);
            return [];
        }
    },
};

export default punchlineApiService;