import { useState } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Mall() {
    // 0: Rental, 1: Service, 2: Sale
    const [activeTab, setActiveTab] = useState(0)

    // Mock Data: Service (New)
    const services = [
        { id: 201, name: '上门清洗服务', price: 128, desc: '深度高温杀菌 30分钟/次', img: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png', tags: ['专业师傅', '免拆机'] },
        { id: 202, name: '滤芯更换套餐', price: 298, desc: '包含全套滤芯+上门安装', img: 'https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png', tags: ['原厂正品'] },
    ]

    // Mock Data: Sale (Existing Products)
    const products = [
        { id: 1, name: '定制TDS检测笔', price: 29.9, img: 'https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png', sales: 1200 },
        { id: 2, name: '便携式运动水杯', price: 49.9, img: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png', sales: 850 },
        { id: 3, name: '7.5L 专用水桶', price: 15.0, img: 'https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png', sales: 5000 },
    ]

    // Mock Data: Rental (自助取水设备 - 家用/办公/工厂食堂)
    const rentals = [
        { id: 101, name: '家用自助取水机', price: 299, period: '年', img: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png', desc: '智能净化 | 冷热双温 | 适合3-5口之家', category: '家用' },
        { id: 102, name: '办公室自助取水机', price: 599, period: '年', img: 'https://img14.360buyimg.com/imagetools/jfs/t1/165930/17/16781/15720/60c806a4E52156827/e6de9fb7b8490f38.png', desc: '大容量 | 快速制水 | 适合20-50人', category: '办公' },
        { id: 103, name: '工厂食堂取水机', price: 1299, period: '年', img: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png', desc: '工业级 | 大流量 | 适合100+人', category: '工厂食堂' },
    ]

    const handleBuy = (item: any, type: 'SALE' | 'RENTAL' | 'SERVICE') => {
        const url = `/pages/mall/checkout?type=${type}&name=${encodeURIComponent(item.name)}&price=${item.price}&img=${encodeURIComponent(item.img)}`
        Taro.navigateTo({ url })
    }

    return (
        <View className='page-mall'>
            {/* Custom Header & Nav */}
            <View className='custom-header safe-area-top'>
                <View className='header-row'>
                    {/* Left: Back Button */}
                    <View className='back-btn' onClick={() => Taro.switchTab({ url: '/pages/index/index' })}>
                        <Text className='icon-back'>←</Text>
                    </View>

                    {/* Right: Tag Tabs */}
                    <View className='tag-tabs'>
                        {['设备租赁', '安装服务', '好物甄选'].map((title, idx) => (
                            <View
                                key={idx}
                                className={`tag-item ${activeTab === idx ? 'active' : ''}`}
                                onClick={() => setActiveTab(idx)}
                            >
                                {title}
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* List */}
            <View className='goods-list'>
                {/* Tab 0: Rental */}
                {activeTab === 0 && rentals.map(item => (
                    <View key={item.id} className='rental-item'>
                        <Image className='img' src={item.img} mode='aspectFill' />
                        <View className='info'>
                            <Text className='name'>{item.name}</Text>
                            <Text className='desc'>{item.desc}</Text>
                            <View className='bottom'>
                                <Text className='price'>¥{item.price}/{item.period}</Text>
                                <Button className='btn-rent' onClick={() => handleBuy(item, 'RENTAL')}>立即租赁</Button>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Tab 1: Service */}
                {activeTab === 1 && services.map(item => (
                    <View key={item.id} className='rental-item service-item'>
                        <Image className='img' src={item.img} mode='aspectFill' />
                        <View className='info'>
                            <Text className='name'>{item.name}</Text>
                            <View className='tags'>
                                {item.tags.map(t => <Text key={t} className='tag'>{t}</Text>)}
                            </View>
                            <Text className='desc'>{item.desc}</Text>
                            <View className='bottom'>
                                <Text className='price'>¥{item.price}</Text>
                                <Button className='btn-rent service-btn' onClick={() => handleBuy(item, 'SERVICE')}>预约服务</Button>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Tab 2: Sale */}
                {activeTab === 2 && products.map(item => (
                    <View key={item.id} className='goods-item'>
                        <Image className='img' src={item.img} mode='aspectFill' />
                        <View className='info'>
                            <Text className='name'>{item.name}</Text>
                            <Text className='sales'>已售 {item.sales}</Text>
                            <View className='bottom'>
                                <Text className='price'>¥{item.price}</Text>
                                <Button className='btn-buy' onClick={() => handleBuy(item, 'SALE')}>+</Button>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}
