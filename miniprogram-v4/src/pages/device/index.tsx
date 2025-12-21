import React, { useState, useEffect } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CustomTabBar from '../../components/common/CustomTabBar'
import { DeviceService } from '../../services/device'
import { Device } from '../../types'
import { Search, Location, Clock } from '@nutui/icons-react-taro'
import './index.scss'

export default function DeviceIndex() {
    const [currentTab, setCurrentTab] = useState(1)
    const [devices, setDevices] = useState<Device[]>([])

    // Mock data matching Screenshot 0
    const mockDevices = [
        {
            id: 1,
            name: '东莞市大朗镇新世纪明上居',
            distance: 44.5,
            address: '东莞市东莞市大朗镇新世纪明上居',
            status: 'OPEN',
            hours: '全天24小时',
            tags: ['唯德优'] // "Weideyou" from screenshot
        },
        // Duplicate for list feel
        {
            id: 2,
            name: '东莞市大朗镇新世纪明上居',
            distance: 44.5,
            address: '东莞市东莞市大朗镇新世纪明上居',
            status: 'OPEN',
            hours: '全天24小时',
            tags: ['唯德优']
        }
    ]

    useEffect(() => {
        // In real app, fetch from DeviceService
        setDevices(mockDevices as any)
    }, [])

    const handleNav = (path: string) => {
        Taro.navigateTo({ url: path })
    }

    return (
        <View className='page-device-index'>
            {/* 1. Custom Header & Search */}
            <View className='custom-header'>
                <View className='nav-title'>附近水站</View>
                <View className='search-bar-row'>
                    <View className='location-picker'>
                        <Text className='city'>东莞</Text>
                        <Text className='arrow'>▼</Text>
                    </View>
                    <View className='search-input'>
                        <Search size={16} color='#ccc' className='icon-search' />
                        <Input className='input' placeholder='搜索关键词' placeholderClass='placeholder' />
                    </View>
                </View>
            </View>

            {/* 2. List Content */}
            <View className='content-area'>
                <View className='section-title'>附近门店</View>

                {devices.map(dev => (
                    <View key={dev.id} className='station-item'>
                        <View className='title-row'>
                            <View className='left'>
                                {dev.tags?.map((t, i) => <Text key={i} className='tag'>{t}</Text>)}
                                <Text className='name'>{dev.name}</Text>
                            </View>
                            <Text className='distance'>{dev.distance}km</Text>
                        </View>

                        <View className='time-row'>
                            <Clock size={12} color='#999' className='icon' />
                            <Text>{dev.hours}</Text>
                        </View>

                        <View className='address-row'>
                            <View className='left'>
                                <Location size={12} color='#999' className='icon' />
                                <Text className='text'>{dev.address}</Text>
                            </View>
                            <Text className='nav-link'>地图导航</Text>
                        </View>
                    </View>
                ))}
            </View>

            <CustomTabBar
                current={currentTab}
                role={'USER'} // Assuming user role for general view
                onChange={(idx) => {
                    if (idx === 0) Taro.navigateTo({ url: '/pages/index/index' })
                    if (idx === 2) Taro.navigateTo({ url: '/pages/user/index' })
                    setCurrentTab(idx)
                }}
            />
        </View>
    )
}
