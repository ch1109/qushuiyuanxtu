import { create } from 'zustand'
import { User } from '../types'
import { MOCK_USER, sleep } from '../services/mock/mockData'

interface AuthState {
    user: User | null
    isLogged: boolean
    isLoading: boolean

    // Actions
    login: () => Promise<void>
    logout: () => void
    updateBalance: (amount: number) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLogged: false,
    isLoading: false,

    login: async () => {
        set({ isLoading: true })
        await sleep(1000) // Simulate network
        set({
            user: MOCK_USER,
            isLogged: true,
            isLoading: false
        })
    },

    logout: () => {
        set({ user: null, isLogged: false })
    },

    updateBalance: (amount: number) => {
        set((state) => {
            if (!state.user) return state
            return {
                user: {
                    ...state.user,
                    balance: {
                        ...state.user.balance,
                        recharge: state.user.balance.recharge + amount // Simplified logic
                    }
                }
            }
        })
    }
}))
