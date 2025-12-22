import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../components/common/NavBar'
import Loading from '../../components/common/Loading'
import { PartnerService } from '../../services/partner'
import { PartnerStats } from '../../types'
import './dashboard.scss'

export default function PartnerDashboard() {
    const [stats, setStats] = useState<PartnerStats | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        setLoading(true)
        try {
            const data = await PartnerService.getStats()
            setStats(data)
        } finally {
            setLoading(false)
        }
    }

    const handleNav = (feature: string) => {
        switch (feature) {
            case 'device':
                Taro.navigateTo({ url: '/pages/partner/device/index' })
                break
            case 'group':
                Taro.navigateTo({ url: '/pages/partner/group/index' })
                break
            case 'ai':
                Taro.navigateTo({ url: '/pages/partner/ai/index' })
                break
            case 'poster':
                Taro.navigateTo({ url: '/pages/marketing/poster' })
                break
            default:
                Taro.showToast({ title: '功能开发中...', icon: 'none' })
        }
    }

    return (
        <View className='page-partner-dashboard'>
            {/* Standard White Header with Back Button */}
            <NavBar title='合伙人工作台' showBack />

            {/* Header Stats - Removed glass-card since we are on white background now mostly, keep simple or check SCSS later */}
            <View className='stats-header glass-card'>
                {stats?.partnerTags?.length ? (
                    <View className='partner-tags'>
                        {stats.partnerTags.map((tag) => (
                            <Text key={tag} className='tag'>
                                {tag}
                            </Text>
                        ))}
                    </View>
                ) : null}
                <View className='total-section'>
                    <Text className='label'>本月预估收益(元)</Text>
                    <Text className='value'>{stats?.month.toFixed(2) || '0.00'}</Text>
                </View>
                <View className='sub-stats'>
                    <View className='item'>
                        <Text className='label'>昨日收益</Text>
                        <Text className='val'>{stats?.yesterday.toFixed(2)}</Text>
                    </View>
                    <View className='item'>
                        <Text className='label'>可提现金额</Text>
                        <Text className='val'>{stats?.totalRefill.toFixed(2)}</Text>
                    </View>
                    <View className='item'>
                        <Text className='label'>商品推广佣金</Text>
                        <Text className='val'>{stats?.totalMall.toFixed(2)}</Text>
                    </View>
                </View>
            </View>

            {/* Main Tools Grid */}
            <View className='tools-section'>
                <Text className='section-title'>常用工具</Text>
                <View className='grid'>
                    <View className='grid-item' onClick={() => handleNav('device')}>
                        <View className='icon-box device'><View className='icon' /></View>
                        <Text>设备管理 {stats?.deviceCount}</Text>
                    </View>
                    <View className='grid-item' onClick={() => handleNav('team')}>
                        <View className='icon-box team'><View className='icon' /></View>
                        <Text>团队管理 {stats?.teamSize}</Text>
                    </View>
                    <View className='grid-item' onClick={() => handleNav('withdraw')}>
                        <View className='icon-box money'><View className='icon' /></View>
                        <Text>提现中心</Text>
                    </View>
                    <View className='grid-item' onClick={() => handleNav('qrcode')}>
                        <View className='icon-box code'><View className='icon' /></View>
                        <Text>推广码</Text>
                    </View>
                </View>
            </View>

            {/* Marketing Tools */}
            <View className='tools-section'>
                <Text className='section-title'>营销增长</Text>
                <View className='grid'>
                    <View className='grid-item' onClick={() => handleNav('ai')}>
                        <View className='icon-box ai'><View className='icon' /></View>
                        <Text>数字员工</Text>
                    </View>
                    <View className='grid-item' onClick={() => handleNav('group')}>
                        <View className='icon-box group'><View className='icon' /></View>
                        <Text>社区拼团</Text>
                    </View>
                    <View className='grid-item' onClick={() => handleNav('poster')}>
                        <View className='icon-box img'><View className='icon' /></View>
                        <Text>海报生成</Text>
                    </View>
                </View>
            </View>

            <Loading visible={loading} />
        </View>
    )
}
