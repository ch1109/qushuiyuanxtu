import React, { useState } from 'react'
import { View, Text, Button, Input, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../../components/common/NavBar'
import Loading from '../../../components/common/Loading'
import { PartnerService } from '../../../services/partner'
import './index.scss'

export default function PartnerGroup() {
    const [form, setForm] = useState({
        product: '',
        price: '',
        minPeople: '3',
        hours: '24'
    })
    const [loading, setLoading] = useState(false)

    const handleCreate = async () => {
        if (!form.product || !form.price) {
            Taro.showToast({ title: '请完善拼团信息', icon: 'none' })
            return
        }

        setLoading(true)
        try {
            const res = await PartnerService.createGroupBuy(form)
            if (res.success) {
                Taro.showToast({ title: '发布成功', icon: 'success' })
                setTimeout(() => Taro.navigateBack(), 1500)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className='page-partner-group'>
            <NavBar title='社区拼团' color='#000' showBack />

            <View className='form-card'>
                <View className='form-item'>
                    <Text className='label'>拼团商品</Text>
                    <Input
                        className='input'
                        placeholder='例如：5L 桶装水'
                        value={form.product}
                        onInput={e => setForm({ ...form, product: e.detail.value })}
                    />
                </View>

                <View className='form-item'>
                    <Text className='label'>拼团价格 (元)</Text>
                    <Input
                        className='input'
                        type='digit'
                        placeholder='0.00'
                        value={form.price}
                        onInput={e => setForm({ ...form, price: e.detail.value })}
                    />
                </View>

                <View className='form-item'>
                    <Text className='label'>成团人数</Text>
                    <Picker
                        mode='selector'
                        range={['3人', '5人', '10人']}
                        onChange={e => {
                            const map = ['3', '5', '10']
                            setForm({ ...form, minPeople: map[e.detail.value] })
                        }}
                    >
                        <View className='picker-view'>
                            <Text className='picker-text'>{form.minPeople}人团</Text>
                            <Text className='icon-arrow'>{'>'}</Text>
                        </View>
                    </Picker>
                </View>

                <View className='form-item'>
                    <Text className='label'>持续时间</Text>
                    <Picker
                        mode='selector'
                        range={['12小时', '24小时', '48小时']}
                        onChange={e => {
                            const map = ['12', '24', '48']
                            setForm({ ...form, hours: map[e.detail.value] })
                        }}
                    >
                        <View className='picker-view'>
                            <Text className='picker-text'>{form.hours}小时</Text>
                            <Text className='icon-arrow'>{'>'}</Text>
                        </View>
                    </Picker>
                </View>
            </View>

            <Button
                className={`btn-submit ${loading ? 'loading' : ''}`}
                onClick={handleCreate}
                disabled={loading}
            >
                发起拼团
            </Button>

            <Loading visible={loading} />
        </View>
    )
}
