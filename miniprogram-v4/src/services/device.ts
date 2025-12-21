import { Device } from '../types'
import { MOCK_DEVICES, sleep } from './mock/mockData'

export const DeviceService = {
    // Get nearby devices (LBS simulation)
    getNearbyDevices: async (lat: number, lng: number): Promise<Device[]> => {
        await sleep(500)
        return MOCK_DEVICES
    },

    // Get device details by QR code or ID
    getDeviceById: async (id: string): Promise<Device | undefined> => {
        await sleep(300)
        return MOCK_DEVICES.find(d => d.id === id || d.no === id)
    },

    // Start water output (simulation)
    startWater: async (deviceId: string) => {
        await sleep(500)
        return { success: true, message: 'Start success' }
    },

    // Stop water output
    stopWater: async (deviceId: string) => {
        await sleep(500)
        return { success: true, volume: 5.5, cost: 2.5 }
    }
}
