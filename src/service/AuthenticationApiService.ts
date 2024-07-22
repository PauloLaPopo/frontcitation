import axios from 'axios';

interface LoginDto {
    email: string;
    password: string;
}

interface RegisterDto {
    fullName: string;
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    role: string;
}

const API_URL = 'http://localhost:8080/api/auth';

export const login = async (loginDto: LoginDto): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/login`, loginDto);
        return response.data;
    } catch (error: any) {
        throw new Error(`Login failed: ${error.response?.data?.message || error.message}`);
    }
};

export const register = async (registerDto: RegisterDto): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/signup`, registerDto);
        return response.data;
    } catch (error: any) {
        throw new Error(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
};

export const logout= async (token: string) : Promise<boolean> => {
    try {
        await axios.post(`${API_URL}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return true;
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        return false;
    }
};