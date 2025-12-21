import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Canvas, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import NavBar from '../../components/common/NavBar'
import { DeviceService } from '../../services/device'
import { Device } from '../../types'
import './scan.scss'

export default function Scan() {
    const router = useRouter()
    // Simulate device ID from QR code
    const deviceId = router.params.scene || '1'

    const [device, setDevice] = useState<Device | null>(null)
    const [status, setStatus] = useState<'IDLE' | 'POURING' | 'PAUSED' | 'FINISHED'>('IDLE')
    const [volume, setVolume] = useState(0)
    const [cost, setCost] = useState(0)

    const timerRef = useRef<any>(null)

    useEffect(() => {
        loadDevice()
        return () => stopTimer()
    }, [])

    const loadDevice = async () => {
        const data = await DeviceService.getDeviceById(deviceId)
        if (data) setDevice(data)
    }

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setVolume(v => parseFloat((v + 0.05).toFixed(2)))
            setCost(c => parseFloat((c + 0.02).toFixed(2)))
        }, 100)
    }

    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current)
    }

    const handleTouchStart = async () => {
        if (status === 'FINISHED') return
        setStatus('POURING')
        startTimer()
        await DeviceService.startWater(deviceId)
    }

    const handleTouchEnd = async () => {
        if (status === 'FINISHED') return
        setStatus('PAUSED')
        stopTimer()
        await DeviceService.stopWater(deviceId)
    }

    const handleFinish = () => {
        setStatus('FINISHED')
        stopTimer()
        Taro.showToast({ title: '取水完成', icon: 'success' })
        setTimeout(() => Taro.navigateBack(), 1500)
    }

    if (!device) return <View className='loading'>初始化设备...</View>

    return (
        <View className='page-scan'>
            <NavBar title='智能取水' transparent color='#fff' showBack />

            {/* Dynamic Wave Background */}
            <View className={`wave-bg ${status === 'POURING' ? 'active' : ''}`}>
                <View className='wave wave1' />
                <View className='wave wave2' />
            </View>

            <View className='content'>
                {/* Quality Dashboard */}
                <View className='dashboard glass-card'>
                    <View className='quality-row'>
                        <View className='item'>
                            <Text className='val'>{device.waterQuality.tds}</Text>
                            <Text className='label'>TDS值</Text>
                        </View>
                        <View className='divider' />
                        <View className='item'>
                            <Text className='val'>{device.waterQuality.temp}°C</Text>
                            <Text className='label'>水温</Text>
                        </View>
                        <View className='divider' />
                        <View className='item'>
                            <Text className='val ok'>优</Text>
                            <Text className='label'>水质</Text>
                        </View>
                    </View>

                    {device.promotion?.isActive && (
                        <View className='promotion-banner'>
                            <Text className='icon-gift'>🎁</Text>
                            <Text>本次取水由 {device.promotion.sponsorName} 买单</Text>
                        </View>
                    )}
                </View>

                {/* Main Display */}
                <View className='main-display'>
                    <Text className='unit'>已取水量 (L)</Text>
                    <Text className='volume'>{volume.toFixed(2)}</Text>
                    <Text className='cost'>
                        {device.promotion?.isActive ? '免费畅饮' : `¥ ${cost.toFixed(2)}`}
                    </Text>
                </View>

                {/* Control Area */}
                <View className='control-area'>
                    <View
                        className={`btn-water ${status === 'POURING' ? 'active' : ''}`}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <View className='ripple r1' />
                        <View className='ripple r2' />
                        <View className='inner-circle'>
                            <Text className='icon-drop' />
                            <Text>{status === 'POURING' ? '取水中' : '长按取水'}</Text>
                        </View>
                    </View>

                    {volume > 0 && status !== 'POURING' && (
                        <View className='btn-finish' onClick={handleFinish}>
                            结束取水
                        </View>
                    )}
                </View>

                <View className='tips'>
                    松开按钮自动暂停，点击结束完成订单
                </View>
            </View>
        </View>
    )
}
