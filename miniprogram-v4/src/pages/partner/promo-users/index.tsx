import { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import NavBar from '../../../components/common/NavBar'
import Loading from '../../../components/common/Loading'
import { PartnerService } from '../../../services/partner'
import { PromoUser } from '../../../types'
import './index.scss'

const SOURCE_LABELS: Record<PromoUser['source'], string> = {
    SHARE_CODE: '分享码',
    RED_PACKET: '红包',
    OTHER: '其他渠道'
}

export default function PromoUsers() {
    const [users, setUsers] = useState<PromoUser[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const list = await PartnerService.getPromoUsers()
            setUsers(list)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className='page-partner-promo-users'>
            <NavBar title='我的推广用户' showBack />

            <View className='intro-card'>
                <Text className='title'>推广来源用户</Text>
                <Text className='subtitle'>展示通过分享码、红包等渠道注册的用户</Text>
            </View>

            <View className='user-list'>
                {users.map(user => (
                    <View className='user-card' key={user.id}>
                        <View className='user-header'>
                            <Image className='avatar' src={user.avatar} mode='aspectFill' />
                            <View className='meta'>
                                <View className='name-row'>
                                    <Text className='name'>{user.nickname}</Text>
                                    <View className={`source-tag ${user.source.toLowerCase()}`}>
                                        <Text>{SOURCE_LABELS[user.source]}</Text>
                                    </View>
                                </View>
                                <Text className='registered'>注册时间：{user.registeredAt}</Text>
                            </View>
                        </View>

                        <View className='record'>
                            <Text className='label'>最近取水</Text>
                            <View className='record-body'>
                                <Text className='detail'>{user.lastWater?.detail || '暂无记录'}</Text>
                                <Text className='time'>{user.lastWater?.time || '-'}</Text>
                            </View>
                        </View>

                        <View className='record'>
                            <Text className='label'>帮卖商品</Text>
                            <View className='record-body'>
                                <Text className='detail'>{user.lastHelpSell?.detail || '暂无记录'}</Text>
                                <Text className='time'>{user.lastHelpSell?.time || '-'}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            <Loading visible={loading} />
        </View>
    )
}
