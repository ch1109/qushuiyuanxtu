import React from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import { useAuthStore } from '../../store/auth'
import './AuthModal.scss'

interface Props {
    visible: boolean
    onClose: () => void
}

const AuthModal: React.FC<Props> = ({ visible, onClose }) => {
    const { login } = useAuthStore()

    if (!visible) return null

    const handleLogin = async () => {
        await login()
        onClose()
    }

    return (
        <View className='auth-mask'>
            <View className='auth-card glass-card'>
                <Image
                    className='logo'
                    src='https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png'
                />
                <Text className='title'>欢迎来到水博士</Text>
                <Text className='subtitle'>高端智能售水平台</Text>

                <View className='features'>
                    <View className='feature-item'>💧 实时水质监测</View>
                    <View className='feature-item'>🎁 注册送20元水币</View>
                </View>

                <Button
                    className='login-btn'
                    onClick={handleLogin}
                >
                    微信一键登录
                </Button>

                <Text className='cancel-btn' onClick={onClose}>暂不登录</Text>
            </View>
        </View>
    )
}

export default AuthModal
