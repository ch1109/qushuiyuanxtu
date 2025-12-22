import React, { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../components/common/NavBar'
import { useAuthStore } from '../../store/auth'
import { OrderService } from '../../services/order'
import './recharge.scss'

export default function Recharge() {
    const { user, updateBalance } = useAuthStore()
    const [selectedBottle, setSelectedBottle] = useState(3)
    const [count, setCount] = useState(1)
    const [loading, setLoading] = useState(false)

    const waterCoins = Math.round((user?.balance.recharge || 0) + (user?.balance.give || 0) + (user?.balance.reward || 0)) || 500
    const bottleOptions = [
        { id: 1, volume: '500ML', coins: 10 },
        { id: 2, volume: '1.5L', coins: 30 },
        { id: 3, volume: '5.00L', coins: 100 },
        { id: 4, volume: '18.00L', coins: 360 }
    ]
    const basePackage = { coins: 2000, amount: 100 }
    const totalCoins = basePackage.coins * count
    const totalAmount = basePackage.amount * count

    const handlePay = async () => {
        setLoading(true)
        try {
            const res = await OrderService.createRechargeOrder(totalAmount)
            if (res.status === 'PAID') {
                updateBalance(totalCoins)
                Taro.showToast({ title: '充值成功', icon: 'success' })
                setTimeout(() => Taro.navigateBack(), 1500)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className='page-recharge'>
            <NavBar title='购买水币' showBack />
            {/* Hero Card */}
            <View className='hero-card'>
                <View className='hero-top'>
                    <View className='hero-left'>
                        <View className='drop-icon' />
                        <Text className='hero-label'>剩余水币</Text>
                    </View>
                    <Text className='hero-link' onClick={() => Taro.navigateTo({ url: '/pages/user/recharge-log' })}>
                        充值记录
                    </Text>
                </View>
                <Text className='hero-amount'>{waterCoins}</Text>
                <View className='hero-bottom'>
                    <View className='coin-dot' />
                    <Text className='hero-expire'>有效期:0天</Text>
                </View>
            </View>

            {/* VIP Card */}
            <View className='vip-card'>
                <View className='vip-left'>
                    <View className='vip-badge' />
                    <View className='vip-info'>
                        <Text className='vip-title'>超级会员</Text>
                        <Text className='vip-subtitle'>全网买水5折优惠</Text>
                        <Text className='vip-bonus'>开通超级会员立刻获得2000水币</Text>
                    </View>
                </View>
                <View className='vip-right'>
                    <Text className='vip-price'>¥198/年</Text>
                    <Text className='vip-origin'>价值198元</Text>
                    <View className='vip-action'>立即办理</View>
                </View>
            </View>

            {/* Recharge Section */}
            <View className='recharge-section'>
                <Text className='section-title'>水币充值</Text>
                <View className='rate-row'>
                    <View className='rate-left'>
                        <View className='drop-outline' />
                        <Text className='rate-title'>每个水币=0.05元</Text>
                    </View>
                    <Text className='rate-subtitle'>开通超级会员，享受5折优惠</Text>
                </View>

                <View className='bottle-grid'>
                    {bottleOptions.map((item) => (
                        <View
                            key={item.id}
                            className={`bottle-item ${selectedBottle === item.id ? 'active' : ''}`}
                            onClick={() => setSelectedBottle(item.id)}
                        >
                            <View className={`bottle-shape bottle-${item.id}`} />
                            <Text className='bottle-volume'>{item.volume}</Text>
                            <Text className='bottle-coins'>{item.coins}水币</Text>
                        </View>
                    ))}
                </View>

                <View className='package-card'>
                    <View className='package-left'>
                        <Text className='currency'>¥</Text>
                        <Text className='amount'>{totalAmount}</Text>
                    </View>
                    <View className='package-mid'>
                        <Text className='coin-amount'>{totalCoins}水币</Text>
                        <Text className='coin-sub'>全网通用</Text>
                    </View>
                    <View className='package-stepper'>
                        <View
                            className={`step-btn ${count === 1 ? 'disabled' : ''}`}
                            onClick={() => count > 1 && setCount(count - 1)}
                        >
                            -
                        </View>
                        <Text className='step-num'>{count}</Text>
                        <View
                            className='step-btn primary'
                            onClick={() => setCount(count + 1)}
                        >
                            +
                        </View>
                    </View>
                </View>
            </View>

            {/* Agreement */}
            <View className='agreement-row'>
                <View className='agreement-check' />
                <Text className='agreement-text'>我已阅读并同意《支付协议》</Text>
            </View>

            {/* Bottom Action */}
            <View className='bottom-bar safe-area-bottom'>
                <View className='bar-price'>
                    <Text className='bar-currency'>¥</Text>
                    <Text className='bar-value'>{totalAmount}</Text>
                </View>
                <Button className='btn-pay' loading={loading} onClick={handlePay}>
                    确认充值
                </Button>
            </View>
        </View>
    )
}
