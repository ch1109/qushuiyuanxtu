import React, { useEffect, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import NavBar from '../../../components/common/NavBar'
import Loading from '../../../components/common/Loading'
import { PartnerService } from '../../../services/partner'
import { Device } from '../../../types'
import './detail.scss'

export default function DeviceDetail() {
    const router = useRouter()
    const { id } = router.params
    const [device, setDevice] = useState<Device | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            loadDetail(id)
        }
    }, [id])

    const loadDetail = async (deviceId: string) => {
        try {
            const data = await PartnerService.getDeviceDetail(deviceId)
            if (data) {
                setDevice(data)
            } else {
                Taro.showToast({ title: '设备不存在', icon: 'none' })
            }
        } finally {
            setLoading(false)
        }
    }

    const handleAction = (action: string) => {
        Taro.showToast({ title: `执行操作: ${action}`, icon: 'success' })
    }

    if (!device && !loading) return <View>设备未找到</View>

    return (
        <View className='page-device-detail'>
            <NavBar title='设备详情' color='#000' showBack />

            {device && (
                <>
                    <View className='header-card'>
                        <View className='title-row'>
                            <Text className='name'>{device.name}</Text>
                            <View className={`status-tag ${device.status.toLowerCase()}`}>
                                {device.status}
                            </View>
                        </View>
                        <View className='info-list'>
                            <View className='row'>
                                <Text className='label'>设备编号</Text>
                                <Text className='val'>{device.no}</Text>
                            </View>
                            <View className='row'>
                                <Text className='label'>详细地址</Text>
                                <Text className='val'>{device.location.name}</Text>
                            </View>
                        </View>
                    </View>

                    <View className='water-card'>
                        <Text className='section-title'>实时水质</Text>
                        <View className='quality-grid'>
                            <View className='quality-item'>
                                <Text className='val'>{device.waterQuality.tds}</Text>
                                <Text className='lbl'>TDS值</Text>
                            </View>
                            <View className='quality-item'>
                                <Text className='val'>{device.waterQuality.temp}°C</Text>
                                <Text className='lbl'>水温</Text>
                            </View>
                            <View className='quality-item'>
                                <Text className='val'>{device.waterQuality.status}</Text>
                                <Text className='lbl'>状态</Text>
                            </View>
                        </View>
                    </View>

                    <View className='action-grid'>
                        <View className='action-btn' onClick={() => handleAction('远程校准')}>
                            <View className='icon' />
                            <Text className='txt'>远程校准</Text>
                        </View>
                        <View className='action-btn' onClick={() => handleAction('重启设备')}>
                            <View className='icon' />
                            <Text className='txt'>重启设备</Text>
                        </View>
                        <View className='action-btn' onClick={() => handleAction('修改定价')}>
                            <View className='icon' />
                            <Text className='txt'>修改定价</Text>
                        </View>
                        <View className='action-btn' onClick={() => handleAction('暂停服务')}>
                            <View className='icon' />
                            <Text className='txt'>暂停服务</Text>
                        </View>
                    </View>
                </>
            )}

            <Loading visible={loading} />
        </View>
    )
}
