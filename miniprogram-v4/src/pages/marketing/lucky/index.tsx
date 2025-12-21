import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../../components/common/NavBar'
// import { useAuthStore } from '../../../store/auth'
import './index.scss'

export default function LuckyDraw() {
    // const { user } = useAuthStore()
    const [rotating, setRotating] = useState(false)
    const [rotateAngle, setRotateAngle] = useState(0)
    const [chances, setChances] = useState(3)

    // Prize Configuration (6 items for 360 deg)
    const prizes = [
        { id: 1, name: '10水币', angle: 30 },   // 0-60
        { id: 2, name: '谢谢参与', angle: 90 }, // 60-120
        { id: 3, name: '50水币', angle: 150 },  // 120-180
        { id: 4, name: '5元代金券', angle: 210 }, // 180-240
        { id: 5, name: '100水币', angle: 270 }, // 240-300
        { id: 6, name: '再来一次', angle: 330 }, // 300-360
    ]

    const handleDraw = () => {
        if (rotating) return
        if (chances <= 0) {
            Taro.showToast({ title: '今日次数已用完', icon: 'none' })
            return
        }

        setRotating(true)
        setChances(prev => prev - 1)

        // Random prize logic (Mock)
        // Weighted random can be implemented here, simple random for now
        const randIndex = Math.floor(Math.random() * prizes.length)
        const prize = prizes[randIndex]

        // Calculate target angle: 
        // We want to rotate at least 3-5 full circles (360 * 5)
        // Then end up at the prize angle.
        // Since styling rotates the BOARD, to point to 'angle' at top (0 deg), 
        // we essentially rotate negative or just add up.
        // Actually, let's say the pointer is at Top. 
        // If "10 Coins" is at 0-60deg (center 30) on the wheel...
        // If we rotate wheel -30deg, 30deg item is at top.

        const baseRotations = 360 * 5 // 5 spins
        // Target is 360 - prize.angle (because we rotate clockwise, bringing the item to top 0)
        // Add a random offset within +/- 20 deg for realism? simplified for now.
        const targetAngle = baseRotations + (360 - prize.angle)

        // We accumulate angle to prevent unwinding
        const newAngle = rotateAngle + targetAngle

        setRotateAngle(newAngle)

        setTimeout(() => {
            setRotating(false)
            // Show Result
            if (prize.name === '谢谢参与') {
                Taro.showToast({ title: '很遗憾，未中奖', icon: 'none' })
            } else if (prize.name === '再来一次') {
                Taro.showToast({ title: '再来一次！', icon: 'none' })
                setChances(c => c + 1)
            } else {
                Taro.showModal({
                    title: '🎉 中奖啦',
                    content: `恭喜获得：${prize.name}`,
                    showCancel: false,
                    confirmText: '开心收下'
                })
                // TODO: Call API to add water coins
            }
        }, 3200) // Match CSS transition time
    }

    return (
        <View className='page-lucky'>
            <NavBar title='每日幸运抽奖' color='#fff' transparent showBack />

            <View className='title-img'>幸运大转盘</View>

            <View className='wheel-container'>
                {/* Fixed Pointer */}
                <View className='pointer-arrow' />

                {/* Rotating Wheel */}
                <View
                    className='wheel-main'
                    style={{ transform: `rotate(${rotateAngle}deg)` }}
                >
                    {prizes.map((p, i) => (
                        <View key={p.id} className='item' style={{ transform: `rotate(${i * 60 + 30}deg)` }}>
                            <Text className='text'>{p.name}</Text>
                        </View>
                    ))}
                </View>

                {/* Center Button */}
                <View className='pointer' onClick={handleDraw} />
            </View>

            <View className='remaining-count'>
                今日剩余次数：{chances}
            </View>

            <View className='rules-card'>
                <Text className='h3'>活动规则</Text>
                <Text className='p'>1. 每位用户每日默认拥有3次抽奖机会。</Text>
                <Text className='p'>2. 抽中的水币将自动发放至您的账户余额。</Text>
                <Text className='p'>3. 代金券可在购买商城商品时抵扣使用。</Text>
                <Text className='p'>4. 每次抽奖消耗5水币（今日限免）。</Text>
            </View>
        </View>
    )
}
