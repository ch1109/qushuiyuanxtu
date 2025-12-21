import React, { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAuthStore } from '../../store/auth'
import { OrderService } from '../../services/order'
import './recharge.scss'

export default function Recharge() {
    const { user, updateBalance } = useAuthStore()
    const [selectedPkg, setSelectedPkg] = useState(1)
    const [loading, setLoading] = useState(false)

    const packages = [
        { id: 1, amount: 50, give: 5, tag: '新用户专享' },
        { id: 2, amount: 100, give: 15, tag: '热销' },
        { id: 3, amount: 200, give: 40, tag: '' },
        { id: 4, amount: 500, give: 120, tag: '超值' },
    ]

    const handlePay = async () => {
        setLoading(true)
        try {
            const pkg = packages.find(p => p.id === selectedPkg)
            if (!pkg) return

            const res = await OrderService.createRechargeOrder(pkg.amount)
            if (res.status === 'PAID') {
                updateBalance(pkg.amount + pkg.give)
                Taro.showToast({ title: '充值成功', icon: 'success' })
                setTimeout(() => Taro.navigateBack(), 1500)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className='page-recharge'>
            {/* Balance Card */}
            <View className='balance-header'>
                <Text className='label'>当前余额 (元)</Text>
                <Text className='amount'>{user?.balance.money.toFixed(2) || '0.00'}</Text>
            </View>

            {/* Package List */}
            <View className='package-section'>
                <Text className='section-title'>选择充值金额</Text>
                <View className='package-grid'>
                    {packages.map(pkg => (
                        <View
                            key={pkg.id}
                            className={`package-item ${selectedPkg === pkg.id ? 'active' : ''}`}
                            onClick={() => setSelectedPkg(pkg.id)}
                        >
                            {pkg.tag && <View className='tag'>{pkg.tag}</View>}
                            <Text className='price'>
                                <Text className='symbol'>¥</Text>
                                {pkg.amount}
                            </Text>
                            <Text className='give'>送 {pkg.give} 元</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* VIP Benefits */}
            <View className='vip-benefits glass-card'>
                <Text className='title'>SVIP 特权</Text>
                <View className='list'>
                    <View className='item'>💧 饮水享 5 折优惠</View>
                    <View className='item'>🎂 生日当天免费取水</View>
                    <View className='item'>🛡️ 专属客服通道</View>
                </View>
            </View>

            {/* Footer Action */}
            <View className='footer-action safe-area-bottom'>
                <View className='agreement'>
                    点击立即充值，即代表同意《充值协议》
                </View>
                <Button
                    className='btn-pay'
                    loading={loading}
                    onClick={handlePay}
                >
                    立即充值
                </Button>
            </View>
        </View>
    )
}
