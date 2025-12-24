import { useState } from 'react'
import { View, Text, Image, Button, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../components/common/NavBar'
import './index.scss'

export default function Mall() {
    const formatDate = (date: Date) => {
        const year = date.getFullYear()
        const month = `${date.getMonth() + 1}`.padStart(2, '0')
        const day = `${date.getDate()}`.padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    // Mock Data: 安装到家（安装服务 + 设备租赁）
    const installItems = [
        { id: 201, name: '家用自助取水机', price: 299, desc: '智能净化 | 冷热双温 | 适合3-5口之家', img: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png', tags: ['上门安装', '免押金'] },
        { id: 202, name: '办公室自助取水机', price: 599, desc: '大容量 | 快速制水 | 适合20-50人', img: 'https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png', tags: ['安装到家', '年度服务'] },
        { id: 203, name: '工厂食堂取水机', price: 1299, desc: '工业级 | 大流量 | 适合100+人', img: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png', tags: ['专属方案', '驻场维护'] },
    ]

    // Mock Data: Sale (Existing Products)
    const products = [
        { id: 1, name: '定制TDS检测笔', price: 29.9, img: 'https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png', sales: 1200 },
        { id: 2, name: '便携式运动水杯', price: 49.9, img: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png', sales: 850 },
        { id: 3, name: '7.5L 专用水桶', price: 15.0, img: 'https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png', sales: 5000 },
    ]

    const durationOptions = ['1年', '2年', '3年']
    const defaultStartDate = formatDate(new Date())
    const [rentalSelections, setRentalSelections] = useState<Record<number, { durationIndex: number; startDate: string }>>(() => {
        const initial: Record<number, { durationIndex: number; startDate: string }> = {}
        installItems.forEach((item) => {
            initial[item.id] = { durationIndex: 0, startDate: defaultStartDate }
        })
        return initial
    })

    const updateSelection = (id: number, changes: Partial<{ durationIndex: number; startDate: string }>) => {
        setRentalSelections((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                ...changes,
            },
        }))
    }

    const handleDurationChange = (id: number, index: number) => {
        updateSelection(id, { durationIndex: index })
    }

    const handleDateChange = (id: number, date: string) => {
        updateSelection(id, { startDate: date })
    }

    const handleShare = (item: any, mode: 'poster' | 'link') => {
        if (mode === 'link') {
            const link = `https://example.com/goods/${item.id}`
            Taro.setClipboardData({
                data: link,
                success: () => {
                    Taro.showToast({ title: '已复制分享链接', icon: 'none' })
                }
            })
            return
        }
        Taro.showToast({ title: '分享海报已生成', icon: 'none' })
    }

    const handleBuy = (item: any, type: 'SALE' | 'INSTALL') => {
        let url = `/pages/mall/checkout?type=${type}&name=${encodeURIComponent(item.name)}&price=${item.price}&img=${encodeURIComponent(item.img)}`
        if (type === 'INSTALL') {
            const selection = rentalSelections[item.id] || { durationIndex: 0, startDate: defaultStartDate }
            const duration = durationOptions[selection.durationIndex] || durationOptions[0]
            url += `&duration=${encodeURIComponent(duration)}&startDate=${encodeURIComponent(selection.startDate)}`
        }
        Taro.navigateTo({ url })
    }

    return (
        <View className='page-mall'>
            <NavBar title='帮卖商品列表' showBack />

            <View className='section'>
                <View className='section-header'>
                    <Text className='section-title'>安装到家</Text>
                    <Text className='section-sub'>安装服务 + 设备租赁合并展示</Text>
                </View>
                <View className='goods-list'>
                    {installItems.map((item) => {
                        const selection = rentalSelections[item.id] || { durationIndex: 0, startDate: defaultStartDate }
                        return (
                            <View key={item.id} className='goods-item'>
                                <Image className='img' src={item.img} mode='aspectFill' />
                                <View className='info'>
                                    <Text className='name'>{item.name}</Text>
                                    <Text className='desc'>{item.desc}</Text>
                                    <View className='tags'>
                                        {item.tags.map((tag) => (
                                            <Text key={tag} className='tag'>{tag}</Text>
                                        ))}
                                    </View>
                                    <View className='rental-options'>
                                        <View className='option'>
                                            <Text className='label'>租赁时长</Text>
                                            <Picker
                                                mode='selector'
                                                range={durationOptions}
                                                onChange={(e) => handleDurationChange(item.id, Number(e.detail.value))}
                                            >
                                                <View className='picker'>
                                                    <Text>{durationOptions[selection.durationIndex] || durationOptions[0]}</Text>
                                                    <Text className='chevron'>v</Text>
                                                </View>
                                            </Picker>
                                        </View>
                                        <View className='option'>
                                            <Text className='label'>起始日期</Text>
                                            <Picker
                                                mode='date'
                                                value={selection.startDate}
                                                onChange={(e) => handleDateChange(item.id, e.detail.value)}
                                            >
                                                <View className='picker'>
                                                    <Text>{selection.startDate}</Text>
                                                    <Text className='chevron'>v</Text>
                                                </View>
                                            </Picker>
                                        </View>
                                    </View>
                                    <View className='bottom'>
                                        <View className='price'>
                                            <Text className='amount'>¥{item.price}</Text>
                                            <Text className='unit'>/年</Text>
                                        </View>
                                        <View className='action-group'>
                                            <View className='share-actions'>
                                                <Button className='btn-share' onClick={() => handleShare(item, 'poster')}>分享海报</Button>
                                                <Button className='btn-share link' onClick={() => handleShare(item, 'link')}>分享链接</Button>
                                            </View>
                                            <Button className='btn-buy' onClick={() => handleBuy(item, 'INSTALL')}>立即下单</Button>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>

            <View className='section'>
                <View className='section-header'>
                    <Text className='section-title'>好物甄选</Text>
                    <Text className='section-sub'>高转化商品精选</Text>
                </View>
                <View className='goods-list'>
                    {products.map(item => (
                        <View key={item.id} className='goods-item'>
                            <Image className='img' src={item.img} mode='aspectFill' />
                            <View className='info'>
                                <Text className='name'>{item.name}</Text>
                                <Text className='sales'>已售 {item.sales}</Text>
                                <View className='bottom'>
                                    <View className='price'>
                                        <Text className='amount'>¥{item.price}</Text>
                                    </View>
                                    <View className='action-group'>
                                        <View className='share-actions'>
                                            <Button className='btn-share' onClick={() => handleShare(item, 'poster')}>分享海报</Button>
                                            <Button className='btn-share link' onClick={() => handleShare(item, 'link')}>分享链接</Button>
                                        </View>
                                        <Button className='btn-buy' onClick={() => handleBuy(item, 'SALE')}>立即购买</Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}
