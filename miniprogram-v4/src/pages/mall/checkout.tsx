import React, { useState } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import NavBar from '../../components/common/NavBar'
import './checkout.scss'

export default function Checkout() {
    const router = useRouter()
    // type: 'INSTALL' | 'RENTAL' | 'SERVICE' | 'SALE'
    const { type = 'SALE', name, price, img, duration, startDate } = router.params
    const isInstall = type === 'INSTALL'
    const isRental = type === 'RENTAL'
    const isService = type === 'SERVICE'
    const isSale = type === 'SALE'

    const formatDate = (dateValue: Date) => {
        const year = dateValue.getFullYear()
        const month = `${dateValue.getMonth() + 1}`.padStart(2, '0')
        const day = `${dateValue.getDate()}`.padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const rentalDuration = duration ? decodeURIComponent(duration) : '1年'
    const rentalStartDate = startDate ? decodeURIComponent(startDate) : formatDate(new Date())
    const decodedName = decodeURIComponent(name || '商品名称')
    const decodedImg = decodeURIComponent(img || '')

    const [loading, setLoading] = useState(false)

    // Mock Form Data
    const [address, setAddress] = useState('广东省深圳市南山区科技园北区C栋101')
    const [contact, setContact] = useState('张三 13800138000')
    const [date, setDate] = useState('2025-12-22 14:00')

    const handlePay = () => {
        setLoading(true)
        Taro.showLoading({ title: '正在支付...' })

        setTimeout(() => {
            Taro.hideLoading()
            setLoading(false)

            // Success Feedback
            Taro.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
            })

            // Navigate back after toast
            setTimeout(() => {
                Taro.switchTab({ url: '/pages/index/index' })
            }, 2000)
        }, 1500)
    }

    return (
        <View className='page-checkout'>
            <NavBar title='确认订单' showBack />

            {/* Scrollable Content */}
            <View className='content-scroll'>
                {/* 1. Address / Contact Section */}
                <View className='section-card address-card'>
                    {(isSale || isRental) && (
                        <View className='row'>
                            <Text className='label'>收货地址</Text>
                            <Text className='value'>{address}</Text>
                            <Text className='icon-arrow'>&gt;</Text>
                        </View>
                    )}

                    {(isService || isInstall) && (
                        <>
                            <View className='row'>
                                <Text className='label'>服务地址</Text>
                                <Text className='value'>{address}</Text>
                            </View>
                            <View className='divider' />
                            <View className='row'>
                                <Text className='label'>预约时间</Text>
                                <Text className='value blue'>{date}</Text>
                                <Text className='icon-arrow'>&gt;</Text>
                            </View>
                        </>
                    )}

                    <View className='divider' />
                    <View className='row'>
                        <Text className='label'>联系人</Text>
                        <Text className='value'>{contact}</Text>
                    </View>
                </View>

                {/* 2. Product Info */}
                <View className='section-card product-card'>
                    <Image className='img' src={decodedImg} mode='aspectFill' />
                    <View className='info'>
                        <Text className='name'>{decodedName}</Text>
                        <Text className='tags'>
                            {isInstall ? '安装到家 | 上门安装' :
                                isRental ? '免押金 | 免费上门安装' :
                                    isService ? '官方服务 | 售后无忧' : '极速发货 | 七天无理由'}
                        </Text>
                        <Text className='price-row'>
                            <Text className='symbol'>¥</Text>
                            <Text className='amount'>{price}</Text>
                            {(isRental || isInstall) && <Text className='unit'>/年</Text>}
                        </Text>
                    </View>
                </View>

                {isInstall && (
                    <View className='section-card rental-card'>
                        <View className='row'>
                            <Text className='label'>租赁时长</Text>
                            <Text className='val'>{rentalDuration}</Text>
                        </View>
                        <View className='row'>
                            <Text className='label'>起始日期</Text>
                            <Text className='val'>{rentalStartDate}</Text>
                        </View>
                    </View>
                )}

                {/* 3. Cost Breakdown */}
                <View className='section-card cost-card'>
                    <View className='row'>
                        <Text className='label'>商品金额</Text>
                        <Text className='val'>¥{price}</Text>
                    </View>
                    <View className='row'>
                        <Text className='label'>运费/上门费</Text>
                        <Text className='val'>¥0.00</Text>
                    </View>
                    {(isRental || isInstall) && (
                        <View className='row'>
                            <Text className='label'>设备押金</Text>
                            <Text className='val'>¥0.00 <Text className='desc'>(信用免押)</Text></Text>
                        </View>
                    )}
                    <View className='divider' />
                    <View className='total-row'>
                        <Text className='label'>合计</Text>
                        <Text className='val price'>¥{price}</Text>
                    </View>
                </View>

                {/* Bottom Bar - Moved inside scroll to follow content immediately */}
                <View className='bottom-bar safe-area-bottom'>
                    <View className='total'>
                        <Text>实付：</Text>
                        <Text className='price'>¥{price}</Text>
                    </View>
                    <Button className='btn-pay' onClick={handlePay} disabled={loading}>
                        立即支付
                    </Button>
                </View>
            </View>
        </View>
    )
}
