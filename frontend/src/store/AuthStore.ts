import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // 1. Import persist

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            isAuthenticated: false,
            user: null,
            login: (user) => set({ isAuthenticated: true, user: user }),
            logout: () => set({ isAuthenticated: false, user: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);