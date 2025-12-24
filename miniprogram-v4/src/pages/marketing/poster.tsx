import React from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../components/common/NavBar'
import posterBanner from '../../assets/images/poster-banner.png'
import './poster.scss'

export default function Poster() {
    const handleGenerate = () => {
        Taro.showToast({ title: '海报已生成', icon: 'none' })
    }

    const handleShare = () => {
        Taro.showToast({ title: '已准备分享', icon: 'none' })
    }

    return (
        <View className='page-poster'>
            <NavBar title='邀请好友' showBack />

            <View className='poster-hero'>
                <View className='hero-content'>
                    <Text className='hero-title'>邀请你身边的人</Text>
                    <Text className='hero-subtitle'>
                        送好友<Text className='hero-highlight'>100</Text>个水币
                    </Text>
                    <View className='hero-pill'>
                        <Text>10个水币相当于1瓶500ml饮用水</Text>
                    </View>
                </View>
            </View>

            <View className='poster-banner'>
                <Image
                    className='banner-img'
                    src={posterBanner}
                    mode='aspectFill'
                />
            </View>

            <View className='poster-body'>
                <View className='flow-card'>
                    <View className='flow-steps'>
                        <View className='step'>
                            <Text>分享链接给</Text>
                            <Text>好友</Text>
                        </View>
                        <View className='step'>
                            <Text>好友注册并</Text>
                            <Text>获得100个水币</Text>
                        </View>
                        <View className='step'>
                            <Text>好友注册</Text>
                            <Text>完成</Text>
                        </View>
                        <View className='step'>
                            <Text>邀请达成</Text>
                            <Text>获得奖励</Text>
                        </View>
                    </View>
                    <View className='action-row'>
                        <Button className='btn primary' onClick={handleGenerate}>生成海报</Button>
                        <Button className='btn secondary' onClick={handleShare}>分享海报给好友</Button>
                    </View>
                </View>

                <View className='stats-card'>
                    <View className='stat'>
                        <Text className='value'>0</Text>
                        <Text className='label'>成功邀请(人)</Text>
                    </View>
                    <View className='divider' />
                    <View className='stat'>
                        <Text className='value accent'>100</Text>
                        <Text className='label'>赠送水币</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
