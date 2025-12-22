import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../../components/common/NavBar'
import Loading from '../../../components/common/Loading'
import { PartnerService } from '../../../services/partner'
import { Device } from '../../../types'
import './index.scss'

export default function DeviceList() {
    const [devices, setDevices] = useState<Device[]>([])
    const [loading, setLoading] = useState(true)
    // Pricing Modal State
    const [showPriceModal, setShowPriceModal] = useState(false)
    const [currentDevice, setCurrentDevice] = useState<Device | null>(null)
    const [newPrice, setNewPrice] = useState('')

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const list = await PartnerService.getDevices()
            setDevices(list)
        } finally {
            setLoading(false)
        }
    }

    const goDetail = (id: string) => {
        Taro.navigateTo({ url: `/pages/partner/device/detail?id=${id}` })
    }

    const stats = {
        total: devices.length,
        online: devices.filter(d => d.status === 'ONLINE').length,
        offline: devices.filter(d => d.status === 'OFFLINE').length
    }

    const getStatusText = (status: string) => {
        const map = {
            'ONLINE': '在线',
            'OFFLINE': '离线',
            'MAINTENANCE': '维护'
        }
        return map[status] || status
    }

    const getStatusClass = (status: string) => status.toLowerCase()

    const openPriceModal = (e: any, device: Device) => {
        e.stopPropagation() // Prevent navigation to detail
        setCurrentDevice(device)
        setNewPrice(device.chargingConfig?.rentalPrice?.toString() || '')
        setShowPriceModal(true)
    }

    const handleSavePrice = async () => {
        if (!newPrice || isNaN(Number(newPrice))) {
            Taro.showToast({ title: '请输入有效金额', icon: 'none' })
            return
        }

        Taro.showLoading({ title: '保存中...' })
        // Simulate API
        setTimeout(() => {
            Taro.hideLoading()
            Taro.showToast({ title: '设置成功', icon: 'success' })
            setShowPriceModal(false)
            // Update local state mock
            setDevices(prev => prev.map(d =>
                d.id === currentDevice?.id
                    ? { ...d, chargingConfig: { ...d.chargingConfig, rentalPrice: Number(newPrice) } }
                    : d
            ))
        }, 1000)
    }

    return (
        <View className='page-partner-device'>
            <NavBar title='设备管理' showBack />

            <View className='stats-bar'>
                <View className='stat-item'>
                    <Text className='num'>{stats.total}</Text>
                    <Text className='text'>全部设备</Text>
                </View>
                <View className='stat-item'>
                    <Text className='num online'>{stats.online}</Text>
                    <Text className='text'>在线运行</Text>
                </View>
                <View className='stat-item'>
                    <Text className='num offline'>{stats.offline}</Text>
                    <Text className='text'>离线/故障</Text>
                </View>
            </View>

            <View className='device-list'>
                {devices.map(device => (
                    <View
                        className='device-card'
                        key={device.id}
                        onClick={() => goDetail(device.id)}
                    >
                        <View className='info'>
                            <View className='name-row'>
                                <Text className='name'>{device.name}</Text>
                                <View className={`tag ${getStatusClass(device.status)}`}>
                                    {getStatusText(device.status)}
                                </View>
                            </View>
                            <View className='location'>
                                <Text>{device.location.name}</Text>
                                <Text className='dist'>{device.location.distance}km</Text>
                            </View>

                            {/* New: Earnings & Actions */}
                            <View className='earnings-row'>
                                <Text className='label'>今日收益: </Text>
                                <Text className='val'>¥{device.todayEarnings?.toFixed(2) || '0.00'}</Text>
                            </View>

                            <View className='actions'>
                                <View
                                    className='btn-action'
                                    onClick={(e) => openPriceModal(e, device)}
                                >
                                    设置租赁价
                                </View>
                            </View>
                        </View>

                        <View className={`status-bulb ${getStatusClass(device.status)}`} />
                    </View>
                ))}
            </View>

            <Loading visible={loading} />

            {/* Simple Custom Modal Overlay */}
            {showPriceModal && (
                <View className='modal-overlay'>
                    <View className='modal-content'>
                        <Text className='modal-title'>设置租赁价格 (元/年)</Text>
                        <input
                            className='modal-input'
                            type='number'
                            value={newPrice}
                            placeholder='请输入价格'
                            // @ts-ignore
                            onInput={(e) => setNewPrice(e.detail.value)}
                        />
                        <View className='modal-btns'>
                            <View className='btn cancel' onClick={() => setShowPriceModal(false)}>取消</View>
                            <View className='btn confirm' onClick={handleSavePrice}>确定</View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}
