import React from 'react'
import { View, Text } from '@tarojs/components'
import './Loading.scss'

interface Props {
    visible: boolean
    text?: string
}

const Loading: React.FC<Props> = ({ visible, text = '加载中...' }) => {
    if (!visible) return null

    return (
        <View className='loading-mask'>
            <View className='loading-content glass-card'>
                <View className='spinner' />
                <Text className='text'>{text}</Text>
            </View>
        </View>
    )
}

export default Loading
