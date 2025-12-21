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
}

const NavBar: React.FC<Props> = ({ title, transparent = false, showBack = false, color }) => {
    const { statusBarHeight } = Taro.getSystemInfoSync()
    // Explicitly fallback for environments where statusBarHeight might be missing/wrong
    const safeTop = statusBarHeight || 0
    const navHeight = 44 // Standard nav bar height
    const totalHeight = safeTop + navHeight

    const handleBack = () => {
        Taro.navigateBack()
    }

    return (
        <>
            <View
                className={classNames('nav-bar', { 'transparent': transparent })}
                style={{ paddingTop: `${safeTop}px` }}
            >
                <View className='nav-content' style={{ height: `${navHeight}px`, color: color || '#333' }}>
                    {showBack && (
                        <View className='back-btn' onClick={handleBack}>
                            {/* Simple back arrow icon using CSS */}
                            <View className='icon-back' style={{ borderColor: color || '#333' }} />
                        </View>
                    )}
                    <Text className='title' style={{ color: color || '#333' }}>{title}</Text>
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
