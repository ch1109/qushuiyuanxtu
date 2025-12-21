import React, { useState } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import classNames from 'classnames'
import './RedPacket.scss'

interface Props {
    visible: boolean
    amount?: number
    onClose: () => void
}

const RedPacket: React.FC<Props> = ({ visible, amount = 8.88, onClose }) => {
    const [status, setStatus] = useState<'CLOSED' | 'OPENING' | 'OPENED'>('CLOSED')

    if (!visible) return null

    const handleOpen = () => {
        setStatus('OPENING')
        setTimeout(() => {
            setStatus('OPENED')
        }, 1000)
    }

    return (
        <View className='red-packet-mask'>
            <View className={classNames('packet-card', { 'opened': status === 'OPENED' })}>
                {/* Background Shapes */}
                <View className='bg-curve' />

                {/* Content Area */}
                <View className='content'>
                    <View className='avatar-wrapper'>
                        <Image className='avatar' src='https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png' />
                    </View>
                    <Text className='username'>水博士</Text>
                    <Text className='greeting'>给您发了一个红包</Text>

                    {status !== 'OPENED' ? (
                        <View className='blessing'>恭喜发财，万事如意</View>
                    ) : (
                        <View className='amount-display'>
                            <Text className='unit'>¥</Text>
                            <Text className='num'>{amount}</Text>
                        </View>
                    )}

                    {status !== 'OPENED' && (
                        <View className={classNames('btn-open', { 'spinning': status === 'OPENING' })} onClick={handleOpen}>
                            <Text className='txt'>開</Text>
                        </View>
                    )}

                    {status === 'OPENED' && (
                        <View className='result-actions'>
                            <Text className='note'>已存入余额，可用于购水</Text>
                            <Button className='btn-use' onClick={onClose}>立即使用</Button>
                        </View>
                    )}
                </View>

                {/* Close Button */}
                <View className='close-btn' onClick={onClose}>
                    <Text className='icon-close'>×</Text>
                </View>
            </View>
        </View>
    )
}

export default RedPacket
