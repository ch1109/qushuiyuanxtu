import React, { useState } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../components/common/NavBar'
import { useAuthStore } from '../../store/auth'
import './poster.scss'

export default function Poster() {
    const { user } = useAuthStore()

    return (
        <View className='page-poster'>
            <NavBar title='邀请好友' transparent color='#fff' showBack />

            {/* Poster Preview */}
            <View className='poster-preview'>
                <View className='poster-card glass-card'>
                    <Image className='bg-img' src='https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png' mode='aspectFill' />

                    <View className='user-info'>
                        <Image className='avatar' src={user?.avatar || ''} />
                        <View className='text'>
                            <Text className='name'>{user?.nickname} 邀请您</Text>
                            <Text className='desc'>加入水博士，喝健康好水</Text>
                        </View>
                    </View>

                    <View className='qrcode-area'>
                        <View className='qrcode-placeholder'>小程序码</View>
                        <Text className='tip'>长按识别二维码</Text>
                    </View>
                </View>
            </View>

            <View className='action-bar'>
                <Button className='btn-save'>保存到相册</Button>
            </View>
        </View>
    )
}
