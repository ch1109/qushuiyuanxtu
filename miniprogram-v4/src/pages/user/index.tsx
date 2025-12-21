import React, { useState } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../components/common/NavBar'
import CustomTabBar from '../../components/common/CustomTabBar'
import AuthModal from '../../components/common/AuthModal'
import { useAuthStore } from '../../store/auth'
import { People, Order, Share, Service, Setting, Cart, Star } from '@nutui/icons-react-taro'
import './index.scss'

export default function UserCenter() {
    const { user, isLogged } = useAuthStore()
    const [showAuth, setShowAuth] = useState(false)
    const [currentTab, setCurrentTab] = useState(2)

    const handleAuth = () => {
        if (!isLogged) {
            setShowAuth(true)
        }
    }

    const handleNav = (path: string) => {
        Taro.navigateTo({ url: path })
    }

    return (
        <View className='page-user'>
            {/* Dark Blue Header Background */}
            <View className='header-bg' />

            <NavBar title='个人中心' transparent color='#fff' />

            {/* Profile Section (Centered) */}
            <View className='user-profile-section'>
                <View className='avatar-container' onClick={handleAuth}>
                    <Image
                        className='avatar'
                        src={isLogged && user ? user.avatar : 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'}
                    />
                </View>
                <View className='user-name-box' onClick={handleAuth}>
                    <Text className='nickname'>
                        {isLogged && user ? user.nickname : '点击登录'}
                    </Text>
                    {/* Phone number usually below name in screenshot 1 */}
                    <Text className='subtitle'>
                        {isLogged && user?.mobile ? user.mobile : '完善您的头像和昵称，获得更好的服务体验'}
                    </Text>
                </View>
            </View>

            {/* Floating Assets Card */}
            <View className='assets-card glass-card'>
                {/* Row 1: Total Remaining */}
                <View className='main-balance-row'>
                    <View className='left'>
                        {/* Water Drop Icon could be an Image or Icon */}
                        <Text className='icon-drop'>💧</Text>
                        <Text className='label'>剩余水币</Text>
                    </View>
                    <Text className='amount-big'>{isLogged && user ? user.balance.reward + user.balance.recharge + user.balance.give : '500'}</Text>
                </View>
                <View className='divider-line' />
                {/* Row 2: 3 Columns */}
                <View className='sub-stats-row'>
                    <View className='stat-item'>
                        <Text className='val'>{isLogged && user ? user.balance.recharge || 0 : '0'}</Text>
                        <Text className='label'>购买水币</Text>
                    </View>
                    <View className='stat-item'>
                        <Text className='val'>{isLogged && user ? user.balance.give || 500 : '500'}</Text>
                        <Text className='label'>赠送水币</Text>
                    </View>
                    <View className='stat-item'>
                        <Text className='val'>{isLogged && user ? user.balance.reward || 0 : '0'}</Text>
                        <Text className='label'>奖励水币</Text>
                    </View>
                </View>
            </View>

            {/* Menu List */}
            <View className='menu-card'>
                {/* Group 1 */}
                <View className='menu-item' onClick={() => handleNav('/pages/mall/group')}>
                    <View className='icon-box'><People size={20} color='#333' /></View>
                    <Text className='label'>套餐拼团</Text>
                    <Text className='arrow'>{'>'}</Text>
                </View>
                <View className='menu-item' onClick={() => handleNav('/pages/user/orders')}>
                    <View className='icon-box'><Order size={20} color='#333' /></View>
                    <Text className='label'>消费明细</Text>
                    <Text className='arrow'>{'>'}</Text>
                </View>
                <View className='menu-item' onClick={() => handleNav('/pages/user/recharge-log')}>
                    <View className='icon-box'><Star size={20} color='#333' /></View>
                    <Text className='label'>充值记录</Text>
                    <Text className='arrow'>{'>'}</Text>
                </View>
                <View className='menu-item' onClick={() => handleNav('/pages/user/recharge')}>
                    <View className='icon-box'><Cart size={20} color='#333' /></View>
                    <Text className='label'>购买水币</Text>
                    <Text className='arrow'>{'>'}</Text>
                </View>
                <View className='menu-item' open-type="share">
                    <View className='icon-box'><Share size={20} color='#333' /></View>
                    <Text className='label'>邀请好友</Text>
                    <Text className='arrow'>{'>'}</Text>
                </View>
                <View className='menu-item' onClick={() => handleNav('/pages/partner/dashboard')}>
                    <View className='icon-box'><People size={20} color='#333' /></View>
                    <Text className='label'>合伙人</Text>
                    <Text className='arrow'>{'>'}</Text>
                </View>
                <View className='menu-item' open-type="contact">
                    <View className='icon-box'><Service size={20} color='#333' /></View>
                    <Text className='label'>帮助反馈</Text>
                    <Text className='arrow'>{'>'}</Text>
                </View>
                <View className='menu-item' onClick={() => handleNav('/pages/user/settings')}>
                    <View className='icon-box'><Setting size={20} color='#333' /></View>
                    <Text className='label'>设置</Text>
                    <Text className='arrow'>{'>'}</Text>
                </View>
            </View>

            <CustomTabBar
                current={currentTab}
                role={user?.roleTags.includes('PARTNER_CITY') ? 'PARTNER' : 'USER'}
                onChange={(idx) => {
                    if (idx === 0) Taro.navigateTo({ url: '/pages/index/index' })
                    if (idx === 1) Taro.navigateTo({ url: '/pages/device/index' })
                    setCurrentTab(idx)
                }}
            />

            <AuthModal visible={showAuth} onClose={() => setShowAuth(false)} />
        </View>
    )
}
