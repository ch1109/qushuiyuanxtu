import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../../components/common/NavBar'
import Loading from '../../../components/common/Loading'
import { PartnerService } from '../../../services/partner'
import { RedPacket } from '../../../types'
import './index.scss'

type RedPacketStatus = RedPacket['status']

const TAB_LABELS: Record<RedPacketStatus, string> = {
    AVAILABLE: '可发放',
    SENT: '已发放',
    EXPIRED: '已过期'
}

export default function RedPacketPage() {
    const [packets, setPackets] = useState<RedPacket[]>([])
    const [activeTab, setActiveTab] = useState<RedPacketStatus>('AVAILABLE')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const list = await PartnerService.getRedPackets()
            setPackets(list)
        } finally {
            setLoading(false)
        }
    }

    const handleSend = (packet: RedPacket) => {
        if (packet.status !== 'AVAILABLE') {
            return
        }
        Taro.showToast({ title: '红包分享海报已保存', icon: 'none' })
    }

    const counts = {
        AVAILABLE: packets.filter(item => item.status === 'AVAILABLE').length,
        SENT: packets.filter(item => item.status === 'SENT').length,
        EXPIRED: packets.filter(item => item.status === 'EXPIRED').length
    }

    const filtered = packets.filter(item => item.status === activeTab)

    return (
        <View className='page-partner-red-packet'>
            <NavBar title='红包分享' showBack />

            <View className='intro-card'>
                <Text className='title'>红包分享工具</Text>
                <View className='subtitle'>
                    <Text>管理可发放、已发放与过期红包</Text>
                    <Text>支持一键保存分享海报</Text>
                </View>
            </View>

            <View className='tabs'>
                {(Object.keys(TAB_LABELS) as RedPacketStatus[]).map((key) => (
                    <View
                        key={key}
                        className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}
                    >
                        <Text className='tab-label'>{TAB_LABELS[key]}</Text>
                        <Text className='tab-count'>{counts[key]}</Text>
                    </View>
                ))}
            </View>

            <View className='packet-list'>
                {filtered.length ? filtered.map((packet) => (
                    <View className='packet-card' key={packet.id}>
                        <View className='packet-header'>
                            <View className='title-group'>
                            <Text className='packet-title'>{packet.title}</Text>
                            <Text className={`status-tag ${packet.status.toLowerCase()}`}>
                                {TAB_LABELS[packet.status]}
                            </Text>
                        </View>
                            <Text className='amount'>{packet.amount}水币</Text>
                        </View>

                        <View className='packet-meta'>
                            <View className='meta-item'>
                                <Text className='label'>可领取人数</Text>
                                <Text className='value'>{packet.totalCount}</Text>
                            </View>
                            <View className='meta-item'>
                                <Text className='label'>已发放</Text>
                                <Text className='value'>{packet.sentCount}</Text>
                            </View>
                            <View className='meta-item'>
                                <Text className='label'>有效期</Text>
                                <View className='value expire'>
                                    <Text className='date'>{packet.expireAt.split(' ')[0]}</Text>
                                    <Text className='time'>{packet.expireAt.split(' ')[1]}</Text>
                                </View>
                            </View>
                        </View>

                        <View className='packet-actions'>
                            <View
                                className={`btn-send ${packet.status !== 'AVAILABLE' ? 'disabled' : ''}`}
                                onClick={() => handleSend(packet)}
                            >
                                发送
                            </View>
                        </View>
                    </View>
                )) : (
                    <View className='empty-state'>
                        <Text>暂无红包记录</Text>
                    </View>
                )}
            </View>

            <Loading visible={loading} />
        </View>
    )
}
