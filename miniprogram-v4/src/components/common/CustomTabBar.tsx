import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import './CustomTabBar.scss'

interface Props {
    current: number
    role: 'USER' | 'PARTNER'
    onChange: (index: number) => void
}

const CustomTabBar: React.FC<Props> = ({ current, role, onChange }) => {
    type TabItem = {
        title: string
        icon: string
        isMain?: boolean
    }

    const userTabs: TabItem[] = [
        { title: '首页', icon: 'home' },
        { title: '附近水站', icon: 'location', isMain: true },
        { title: '我的', icon: 'user' }
    ]

    const partnerTabs: TabItem[] = [
        { title: '首页', icon: 'dashboard' },
        { title: '附近水站', icon: 'apps' },
        { title: '我的', icon: 'money' }
    ]

    const tabs = role === 'USER' ? userTabs : partnerTabs

    return (
        <View className='custom-tab-bar safe-area-bottom glass-card'>
            {tabs.map((tab, index) => (
                <View
                    key={index}
                    className={classNames('tab-item', {
                        'active': current === index,
                        'main-action': tab.isMain
                    })}
                    onClick={() => onChange(index)}
                >
                    <View className={`icon icon-${tab.icon}`} />
                    <Text className='title'>{tab.title}</Text>
                </View>
            ))}
        </View>
    )
}

export default CustomTabBar
