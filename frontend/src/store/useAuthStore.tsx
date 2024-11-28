import { axiosInstance } from "@/lib/axios";
import { create } from 'zustand'

interface AuthStore {
    user: null
    isAdmin: boolean
    error: String | null
    userId: String | null
    isLoading: boolean,
    isAuthenticated: boolean,
    isCheckingAuth: boolean,
    signup: (email: String, password: String, firstName: String, lastName: String) => Promise<void>
    checkAdminStatus: () => Promise<void>
    reset: () => void;
    login: (email:String, password: String) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    user: null,
    userId: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    error: null,
    isLoading: false,
    signup: async (email: String, password: String, firstName: String, lastName: String) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post('/auth/createUser', { email, password, firstName, lastName })
            set({ isAuthenticated: true, isLoading: false })
            const url = response.data.url
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'; 
            link.rel = 'noopener noreferrer'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } catch (error: any) {
            set({ error: error.message || 'Error signing up', isLoading: false })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    login: async (email: String, password: String) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post('/login', { email, password })
            set({ user: response.data.user, isAuthenticated: true, error: null, isLoading: false })
        } catch (error) {
            set({ error: 'Error logging out', isLoading: false })
            throw error;
        }
    },
    checkAdminStatus: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get('/admin/check-admin')
            set({ user: response.data.user, isAdmin: response.data.admin, isAuthenticated: true, isCheckingAuth: false })
        } catch (error: any) {
            set({ isAdmin: false, error: error.message, isAuthenticated: false })
        } finally {
            set({ isLoading: false })
        }
    },
    reset: () => {
        set({ isLoading: false, isAdmin: false, error: null })
    }
}))
