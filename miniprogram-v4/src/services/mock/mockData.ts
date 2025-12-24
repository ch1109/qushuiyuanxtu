import { User, Device, Order, PartnerStats, PromoUser, RedPacket } from '../../types';

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
        province: '广东省',
        city: '广州市',
        installDate: '2024-09-12',
        installLocation: '广州塔西门岗亭内侧',
        contractStartDate: '2024-10-01',
        contractEndDate: '2027-09-30',
        contactName: '张经理',
        contactPhone: '13800001111',
        contractPrice: 98000,
        profitRate: 0.12,
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
        province: '广东省',
        city: '广州市',
        installDate: '2023-06-18',
        installLocation: '花城广场北侧入口',
        contractStartDate: '2023-07-01',
        contractEndDate: '2026-06-30',
        contactName: '刘老师',
        contactPhone: '13600002222',
        contractPrice: 88000,
        profitRate: 0.1,
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
        province: '广东省',
        city: '广州市',
        installDate: '2025-01-05',
        installLocation: '地铁B口外侧',
        contractStartDate: '2025-02-01',
        contractEndDate: '2028-01-31',
        contactName: '王主管',
        contactPhone: '13500003333',
        contractPrice: 92000,
        profitRate: 0.15,
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

export const MOCK_PROMO_USERS: PromoUser[] = [
    {
        id: 'PU-001',
        nickname: '王小敏',
        avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
        source: 'SHARE_CODE',
        registeredAt: '2025-12-10 09:12',
        lastWater: { time: '2025-12-18 09:20', detail: '饮用水 5L · 设备 广州塔西门岗亭站' },
        lastHelpSell: { time: '2025-12-14 11:06', detail: '净水壶滤芯 x1' }
    },
    {
        id: 'PU-002',
        nickname: '李晓晨',
        avatar: 'https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png',
        source: 'RED_PACKET',
        registeredAt: '2025-12-11 18:40',
        lastWater: { time: '2025-12-19 08:05', detail: '饮用水 10L · 设备 珠江新城花城广场站' },
        lastHelpSell: { time: '2025-12-12 20:18', detail: 'TDS检测笔 x1' }
    },
    {
        id: 'PU-003',
        nickname: '赵珂',
        avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        source: 'SHARE_CODE',
        registeredAt: '2025-12-12 12:10',
        lastWater: { time: '2025-12-16 15:22', detail: '饮用水 5L · 设备 客村地铁站B口站' }
    },
    {
        id: 'PU-004',
        nickname: '陈雨欣',
        avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
        source: 'OTHER',
        registeredAt: '2025-12-15 21:35',
        lastHelpSell: { time: '2025-12-19 09:45', detail: '便携水杯 x1' }
    }
];

export const MOCK_PARTNER_STATS: PartnerStats = {
    totalRefill: 12580.00,
    totalMall: 3200.00,
    yesterday: 850.50,
    month: 25800.00,
    teamSize: 128,
    deviceCount: 15,
    partnerTags: ['营销合伙人', '投资合伙人']
};

export const MOCK_RED_PACKETS: RedPacket[] = [
    {
        id: 'RP-001',
        title: '新用户取水红包',
        amount: 500,
        totalCount: 100,
        sentCount: 72,
        expireAt: '2025-12-31 23:59',
        status: 'AVAILABLE'
    },
    {
        id: 'RP-002',
        title: '门店开业助力红包',
        amount: 8,
        totalCount: 150,
        sentCount: 150,
        expireAt: '2025-12-20 23:59',
        status: 'SENT'
    },
    {
        id: 'RP-003',
        title: '节日拉新红包',
        amount: 10,
        totalCount: 80,
        sentCount: 80,
        expireAt: '2025-12-01 23:59',
        status: 'EXPIRED'
    }
];

// Simulation delay helper
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MOCK_AI_POSTER_URL = 'https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png';
