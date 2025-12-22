import { useEffect, useMemo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../../components/common/NavBar'
import Loading from '../../../components/common/Loading'
import { PartnerService } from '../../../services/partner'
import { Device } from '../../../types'
import './index.scss'

export default function RentalManagement() {
    const [devices, setDevices] = useState<Device[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [currentDevice, setCurrentDevice] = useState<Device | null>(null)
    const [price, setPrice] = useState('')
    const [selectedProvince, setSelectedProvince] = useState('全部')
    const [selectedCity, setSelectedCity] = useState('全部')

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

    const openModal = (device: Device) => {
        setCurrentDevice(device)
        setPrice(device.chargingConfig?.rentalPrice?.toString() || '')
        setShowModal(true)
    }

    const handleSave = () => {
        if (!price || isNaN(Number(price))) {
            Taro.showToast({ title: '请输入有效金额', icon: 'none' })
            return
        }

        Taro.showLoading({ title: '保存中...' })
        setTimeout(() => {
            Taro.hideLoading()
            Taro.showToast({ title: '设置成功', icon: 'success' })
            setDevices(prev => prev.map(device =>
                device.id === currentDevice?.id
                    ? { ...device, chargingConfig: { ...device.chargingConfig, rentalPrice: Number(price) } }
                    : device
            ))
            setShowModal(false)
        }, 800)
    }

    const provinces = useMemo(() => {
        const list = devices.map(device => device.province).filter(Boolean) as string[]
        return ['全部', ...Array.from(new Set(list))]
    }, [devices])

    const cities = useMemo(() => {
        const list = devices
            .filter(device => selectedProvince === '全部' || device.province === selectedProvince)
            .map(device => device.city)
            .filter(Boolean) as string[]
        return ['全部', ...Array.from(new Set(list))]
    }, [devices, selectedProvince])

    const filteredDevices = useMemo(() => {
        return devices.filter(device => {
            const provinceMatch = selectedProvince === '全部' || device.province === selectedProvince
            const cityMatch = selectedCity === '全部' || device.city === selectedCity
            return provinceMatch && cityMatch
        })
    }, [devices, selectedProvince, selectedCity])

    return (
        <View className='page-partner-rental'>
            <NavBar title='租赁管理' showBack />

            <View className='filter-section'>
                <View className='filter-row'>
                    <Text className='filter-label'>省份</Text>
                    <View className='filter-tags'>
                        {provinces.map(province => (
                            <View
                                key={province}
                                className={`tag ${selectedProvince === province ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedProvince(province)
                                    setSelectedCity('全部')
                                }}
                            >
                                {province}
                            </View>
                        ))}
                    </View>
                </View>
                <View className='filter-row'>
                    <Text className='filter-label'>城市</Text>
                    <View className='filter-tags'>
                        {cities.map(city => (
                            <View
                                key={city}
                                className={`tag ${selectedCity === city ? 'active' : ''}`}
                                onClick={() => setSelectedCity(city)}
                            >
                                {city}
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View className='rental-list'>
                {filteredDevices.map(device => (
                    <View className='rental-card' key={device.id}>
                        <View className='info'>
                            <Text className='name'>{device.name}</Text>
                            <Text className='location'>{device.location.name}</Text>
                            <Text className='price'>
                                当前租赁价: ¥{device.chargingConfig?.rentalPrice || 0}/年
                            </Text>
                        </View>
                        <View className='action' onClick={() => openModal(device)}>
                            设置收费标准
                        </View>
                    </View>
                ))}
            </View>

            <Loading visible={loading} />

            {showModal && (
                <View className='modal-overlay'>
                    <View className='modal-content'>
                        <Text className='modal-title'>设置租赁价格 (元/年)</Text>
                        <input
                            className='modal-input'
                            type='number'
                            value={price}
                            placeholder='请输入价格'
                            // @ts-ignore
                            onInput={(e) => setPrice(e.detail.value)}
                        />
                        <View className='modal-btns'>
                            <View className='btn cancel' onClick={() => setShowModal(false)}>取消</View>
                            <View className='btn confirm' onClick={handleSave}>确定</View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}
