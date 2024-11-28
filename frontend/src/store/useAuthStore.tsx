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
    checkAdminStatus: () => Promise<void>
    reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    user: null,
    userId: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    error: null,
    isLoading: false,
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
