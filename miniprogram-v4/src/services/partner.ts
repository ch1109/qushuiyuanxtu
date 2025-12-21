import { PartnerStats, Device } from '../types'
import { MOCK_PARTNER_STATS, MOCK_DEVICES, MOCK_AI_POSTER_URL, sleep } from './mock/mockData'

export const PartnerService = {
    // Get partner dashboard stats
    getStats: async (): Promise<PartnerStats> => {
        await sleep(600)
        return MOCK_PARTNER_STATS
    },

    // Apply to become a partner
    applyPartner: async (data: any) => {
        await sleep(1500)
        console.log('Applying partner with:', data)
        return { success: true }
    },

    // AI Poster Generation
    generatePoster: async (prompt: string) => {
        await sleep(2000) // Simulate AI processing
        console.log('Generating poster for:', prompt)
        return {
            success: true,
            url: MOCK_AI_POSTER_URL
        }
    },

    // Create Group Buying
    createGroupBuy: async (data: any) => {
        await sleep(1000)
        console.log('Creating group buy:', data)
        return { success: true, id: 'G' + Date.now() }
    },

    // Get Devices List
    getDevices: async (): Promise<Device[]> => {
        await sleep(800)
        return MOCK_DEVICES
    },

    // Get Device Detail
    getDeviceDetail: async (id: string): Promise<Device | undefined> => {
        await sleep(500)
        return MOCK_DEVICES.find(d => d.id === id)
    }
}
