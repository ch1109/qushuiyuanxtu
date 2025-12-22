import React, { useMemo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../../components/common/NavBar'
import './index.scss'

const categories = [
    { id: 'all', label: '全部' },
    { id: 'marketing', label: '营销增长' },
    { id: 'content', label: '内容生产' },
    { id: 'operation', label: '经营洞察' },
    { id: 'service', label: '客户运营' },
]

const modules = [
    {
        id: 'poster',
        name: '营销海报生成智能体',
        desc: '节日/促销海报一键出图，适配门店屏与社群分享',
        category: 'marketing',
        tags: ['海报', '活动', '社群'],
        tone: 'teal',
        status: '推荐',
        meta: '适合节庆推广',
        shortName: '海报',
    },
    {
        id: 'copywriting',
        name: '营销文案生成智能体',
        desc: '朋友圈、短信、群发话术多版本输出，提升转化',
        category: 'content',
        tags: ['文案', '转化', '多版本'],
        tone: 'amber',
        status: '新',
        meta: '适合拉新裂变',
        shortName: '文案',
    },
    {
        id: 'report',
        name: '经营报告总结智能体',
        desc: '自动汇总设备、销售与活动数据，生成周报月报',
        category: 'operation',
        tags: ['周报', '经营', '数据'],
        tone: 'blue',
        status: '重点',
        meta: '适合经营复盘',
        shortName: '报告',
    },
    {
        id: 'plan',
        name: '活动方案策划智能体',
        desc: '从目标、玩法到预算建议，快速生成完整活动方案',
        category: 'marketing',
        tags: ['方案', '节点', '预算'],
        tone: 'coral',
        status: '热门',
        meta: '适合大型活动',
        shortName: '活动',
    },
    {
        id: 'service',
        name: '客户答疑助手智能体',
        desc: '常见问题自动回复与关键词引导，提升响应效率',
        category: 'service',
        tags: ['客服', '自动', 'FAQ'],
        tone: 'green',
        status: '常用',
        meta: '适合高峰咨询',
        shortName: '客服',
    },
    {
        id: 'coupon',
        name: '优惠券组合智能体',
        desc: '按目标客群组合优惠券，兼顾拉新与复购',
        category: 'operation',
        tags: ['优惠券', '客群', '复购'],
        tone: 'sky',
        status: '即将上线',
        meta: '适合复购提升',
        shortName: '优惠',
    },
]

export default function PartnerAI() {
    const [activeCategory, setActiveCategory] = useState('all')
    const stats = {
        total: modules.length,
        recommended: modules.filter((item) => item.status === '推荐').length,
        categories: categories.length - 1,
    }

    const visibleModules = useMemo(() => {
        if (activeCategory === 'all') {
            return modules
        }
        return modules.filter((item) => item.category === activeCategory)
    }, [activeCategory])

    const handleQuickAction = (label: string) => {
        Taro.showToast({ title: `${label} 正在准备中`, icon: 'none' })
    }

    const handleModuleAction = (moduleName: string) => {
        Taro.showToast({ title: `${moduleName} 正在准备中`, icon: 'none' })
    }

    return (
        <View className='page-partner-ai'>
            <NavBar title='数字员工' showBack />

            <View className='hero'>
                <View className='hero-card'>
                    <Text className='hero-kicker'>一人公司理念</Text>
                    <Text className='hero-title'>每台设备都是一家公司</Text>
                    <Text className='hero-subtitle'>海报/文案/经营洞察随时待命</Text>
                    <View className='hero-stats'>
                        <View className='stat-item'>
                            <Text className='stat-value'>{stats.total}</Text>
                            <Text className='stat-label'>可用模块</Text>
                        </View>
                        <View className='stat-item'>
                            <Text className='stat-value'>{stats.recommended}</Text>
                            <Text className='stat-label'>重点推荐</Text>
                        </View>
                        <View className='stat-item'>
                            <Text className='stat-value'>{stats.categories}</Text>
                            <Text className='stat-label'>覆盖领域</Text>
                        </View>
                    </View>
                    <View className='hero-actions'>
                        <View
                            className='hero-action primary'
                            onClick={() => handleQuickAction('创建任务')}
                        >
                            <Text>创建任务</Text>
                        </View>
                        <View
                            className='hero-action ghost'
                            onClick={() => handleQuickAction('查看模板')}
                        >
                            <Text>查看模板</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View className='section'>
                <View className='section-card'>
                    <Text className='section-title'>模块分类</Text>
                    <View className='category-tabs'>
                        {categories.map((item) => (
                            <View
                                key={item.id}
                                className={`tab ${activeCategory === item.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(item.id)}
                            >
                                <Text>{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View className='section'>
                <View className='section-header'>
                    <Text className='section-title'>数字员工模块</Text>
                    <Text className='section-hint'>选择智能体即可开始创建任务</Text>
                </View>
                <View className='module-grid'>
                    {visibleModules.map((item) => (
                        <View key={item.id} className={`module-card tone-${item.tone}`}>
                            <View className='module-top'>
                                <View className='module-icon'>
                                    <Text>{item.shortName}</Text>
                                </View>
                                <Text className='module-status'>{item.status}</Text>
                            </View>
                            <Text className='module-name'>{item.name}</Text>
                            <Text className='module-desc'>{item.desc}</Text>
                            <View className='module-tags'>
                                {item.tags.map((tag) => (
                                    <Text key={tag} className='tag'>
                                        {tag}
                                    </Text>
                                ))}
                            </View>
                            <View className='module-footer'>
                                <Text className='module-meta'>{item.meta}</Text>
                                <View
                                    className='module-cta'
                                    onClick={() => handleModuleAction(item.name)}
                                >
                                    <Text>立即体验</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}
