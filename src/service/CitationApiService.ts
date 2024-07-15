import axios from 'axios';
import { Citation } from '../models/Citation'; // Assurez-vous d'importer correctement votre modèle Citation

const API_URL = 'http://localhost:8080/api/citations'; // Remplacez par l'URL de votre API

const citationApiService = {

    async getCitation(): Promise<Citation | null> {
        try {
            const response = await axios.get<Citation>(`${API_URL}/dujour`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de la citation du jour:', error);
            return null;
        }
    },

    async getCitationById(id: string): Promise<Citation | null> {
        try {
            const response = await axios.get<Citation>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de la citation :', error);
            return null;
        }
    },

    async updateCitation(citation: Citation): Promise<void> {
        try {
            await axios.put(`${API_URL}/${citation.id}`, citation);
        } catch (error) {
            console.error('Erreur lors de la modification de la citation :', error);
        }
    },

    async deleteCitation(id: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/delete/${id}`);
        } catch (error) {
            console.error('Erreur lors de la suppression de la citation', error);
        }
    },

    async getDifferentCitation(currentCitation: Citation): Promise<Citation | null> {
        try {
            const response = await axios.post<Citation>(`${API_URL}/different`, currentCitation);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération d\'une citation différente:', error);
            return null;
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

    async getAllCitations(): Promise<Citation[]> {
        try {
            const response = await axios.get<Citation[]>(`${API_URL}/all`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les citations:', error);
            return [];
        }
    },

    async addCitation(newCitation: Citation): Promise<Citation | null> {
        try {
            const response = await axios.post<Citation>(`${API_URL}/add`, newCitation);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la citation:', error);
            return null;
        }
    },
};

export default citationApiService;
