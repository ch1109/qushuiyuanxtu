import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import './NavBar.scss'

interface Props {
    title?: string
    transparent?: boolean
    showBack?: boolean
    color?: string
    showCapsule?: boolean
    size?: 'tall' | 'compact'
}

const NavBar: React.FC<Props> = ({
    title,
    transparent = false,
    showBack = false,
    color,
    showCapsule = true,
    size = 'tall'
}) => {
    const { statusBarHeight } = Taro.getSystemInfoSync()
    // Explicitly fallback for environments where statusBarHeight might be missing/wrong
    const safeTop = statusBarHeight || 0
    const navHeight = size === 'compact' ? 44 : 52
    const titleSize = size === 'compact' ? 19 : 17
    const capsuleHeight = size === 'compact' ? 28 : 30
    const totalHeight = safeTop + navHeight

    const handleBack = () => {
        Taro.navigateBack({
            delta: 1,
            fail: () => Taro.showToast({ title: '暂无上一页', icon: 'none' })
        })
    }

    return (
        <>
            <View
                className={classNames('nav-bar', { 'transparent': transparent }, `size-${size}`)}
                style={{ paddingTop: `${safeTop}px` }}
            >
                <View className='nav-content' style={{ height: `${navHeight}px`, color: color || '#fff' }}>
                    {showBack && (
                        <View className='back-btn' onClick={handleBack}>
                            {/* Simple back arrow icon using CSS */}
                            <View className='icon-back' style={{ borderColor: color || '#fff' }} />
                        </View>
                    )}
                    <Text className='title' style={{ color: color || '#fff', fontSize: `${titleSize}px` }}>{title}</Text>
                    {showCapsule && (
                        <View className='capsule' style={{ height: `${capsuleHeight}px` }}>
                            <View className='capsule-dots'>
                                <View className='dot' />
                                <View className='dot' />
                                <View className='dot' />
                            </View>
                            <View className='capsule-divider' />
                            <View className='capsule-circle' />
                        </View>
                    )}
                </View>
            </View>

            {/* Placeholder to prevent content overlap if not transparent */}
            {!transparent && (
                <View
                    className='nav-bar-placeholder'
                    style={{ height: `${totalHeight}px` }}
                />
            )}
        </>
    )
}

export default NavBar
