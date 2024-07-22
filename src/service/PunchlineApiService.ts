import axios from "axios";
import {Punchline} from "../models/Punchline";
import {shuffle} from "../utils/Shuffle";


const API_URL = 'http://localhost:8080/api/punchlines'; // Remplacez par l'URL de votre API

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const punchlineApiService = {

    async getAllPunchlines(): Promise<Punchline[]> {
        try {
            const response = await axios.get<Punchline[]>(`${API_URL}/all`, {
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                });
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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des auteurs différents:', error);
            return [];
        }
    },

    async getAllAuthors(): Promise<string[]> {
        try {
            const response = await axios.get<string[]>(`${API_URL}/authors`, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de tous les auteurs:', error);
            return [];
        }
    },

    getRandomAuthors(authors: string[], excludeAuthor: string, count: number): string[] {
        const filteredAuthors = authors.filter(author => author !== excludeAuthor);
        return shuffle(filteredAuthors).slice(0, count);
    },

    async addPunchline(punchline: Punchline): Promise<Punchline | null> {
        try {
            const response = await axios.post<Punchline>(`${API_URL}/add`, punchline, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la citation', error);
            return null;
        }
    },

    async deletePunchline(id: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de la punchline', error);
        }
    },

    async updatePunchline(punchline: Punchline): Promise<void> {
      try {
          await axios.put(`${API_URL}/${punchline.id}`, punchline, {
              headers: {
                  'Authorization': `Bearer ${getAuthToken()}`
              }
          });
      }  catch (error) {
          console.error('Erreur lors de la modification de la punchline :', error);
      }
    },

    async getPunchlineById(id: string): Promise<Punchline | null> {
        try {
            const response = await axios.get<Punchline>(`${API_URL}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération de la punchline :', error);
            return null;
        }
    }
};

export default punchlineApiService;