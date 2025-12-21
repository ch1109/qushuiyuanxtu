import { Order } from '../types'
import { MOCK_ORDERS, sleep } from './mock/mockData'

export const OrderService = {
    // Get user order list
    getOrders: async (): Promise<Order[]> => {
        await sleep(800)
        return MOCK_ORDERS
    },

    // Create recharge order
    createRechargeOrder: async (amount: number) => {
        await sleep(1000)
        return { orderId: 'O_NEW_RECHARGE_' + Date.now(), status: 'PAID' }
    }
}
