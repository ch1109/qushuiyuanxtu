import { User, Device, Order, PartnerStats } from '../../types';

export const MOCK_USER: User = {
    uid: 'GD888888',
    nickname: '极速水博士',
    avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
    mobile: '138****8888',
    balance: {
        recharge: 100.00,
        give: 20.00,
        reward: 5.50,
        money: 888.00
    },
    roleTags: ['USER', 'PARTNER_CITY'],
    vipStatus: true,
    vipEndDate: '2025-12-31'
};

export const MOCK_DEVICES: Device[] = [
    {
        id: '1',
        no: 'D001',
        name: '广州塔西门岗亭站',
        status: 'ONLINE',
        location: {
            name: '广州市海珠区阅江西路222号',
            lat: 23.10647,
            lng: 113.32446,
            distance: 0.8
        },
        waterQuality: { tds: 12, temp: 25.5, status: 'EXCELLENT' },
        promotion: { isActive: true, sponsorName: '腾讯公益' }
    },
    {
        id: '2',
        no: 'D002',
        name: '珠江新城花城广场站',
        status: 'MAINTENANCE',
        location: {
            name: '广州市天河区珠江东路',
            lat: 23.12004,
            lng: 113.32623,
            distance: 2.5
        },
        waterQuality: { tds: 45, temp: 26.0, status: 'GOOD' }
    },
    {
        id: '3',
        no: 'D003',
        name: '客村地铁站B口站',
        status: 'OFFLINE',
        location: {
            name: '广州市海珠区新港中路',
            lat: 23.0965,
            lng: 113.3205,
            distance: 1.2
        },
        waterQuality: { tds: 0, temp: 0, status: 'NORMAL' },
        todayEarnings: 0.00,
        chargingConfig: { rentalPrice: 1299 }
    }
];

// Enrich first two devices
MOCK_DEVICES[0].todayEarnings = 125.50;
MOCK_DEVICES[0].chargingConfig = { rentalPrice: 365.00 };
MOCK_DEVICES[1].todayEarnings = 45.00;
MOCK_DEVICES[1].chargingConfig = { rentalPrice: 599.00 };

export const MOCK_ORDERS: Order[] = [
    { id: 'O1001', type: 'WATER', status: 'COMPLETED', amount: 2.5, time: '2025-12-19 10:30', detail: '饮用水 5L' },
    { id: 'O1002', type: 'RECHARGE', status: 'PAID', amount: 100, time: '2025-12-18 15:20', detail: '充值100送20' },
    { id: 'O1003', type: 'MALL', status: 'PENDING', amount: 299, time: '2025-12-15 09:00', detail: 'TDS检测笔 x1' }
];

export const MOCK_PARTNER_STATS: PartnerStats = {
    totalRefill: 12580.00,
    totalMall: 3200.00,
    yesterday: 850.50,
    month: 25800.00,
    teamSize: 128,
    deviceCount: 15
};

// Simulation delay helper
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MOCK_AI_POSTER_URL = 'https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png';
