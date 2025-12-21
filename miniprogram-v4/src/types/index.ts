export interface User {
  uid: string;
  nickname: string;
  avatar: string;
  mobile: string;
  balance: {
    recharge: number;
    give: number;
    reward: number;
    money: number; // 现金余额
  };
  roleTags: ('USER' | 'PARTNER_CITY' | 'PARTNER_DISTRICT' | 'PARTNER_DEVICE' | 'PARTNER_MAINTAIN')[];
  vipStatus: boolean;
  vipEndDate?: string;
}

export interface Device {
  id: string;
  no: string;
  name: string;
  status: 'ONLINE' | 'OFFLINE' | 'FAULT' | 'MAINTENANCE' | 'OPEN';
  location: {
    name: string;
    lat: number;
    lng: number;
    distance: number; // km
  };
  address?: string;
  hours?: string;
  tags?: string[];
  distance?: number; // flat distance for display
  waterQuality: {
    tds: number;
    temp: number;
    turbidity?: number;
    updateTime?: string;
    eval?: string;
    status: 'EXCELLENT' | 'GOOD' | 'NORMAL';
  };
  promotion?: {
    isActive: boolean;
    sponsorName: string;
  };
  todayEarnings?: number;
  chargingConfig?: {
    rentalPrice: number; // yearly rental price
  };
}

export interface Order {
  id: string;
  type: 'WATER' | 'RECHARGE' | 'MALL' | 'RENTAL';
  status: 'PENDING' | 'PAID' | 'COMPLETED' | 'REFUNDED';
  amount: number;
  time: string;
  detail: string;
}

export interface PartnerStats {
  totalRefill: number; // 总加水收益
  totalMall: number;   // 商城佣金
  yesterday: number;
  month: number;
  teamSize: number;
  deviceCount: number;
}
