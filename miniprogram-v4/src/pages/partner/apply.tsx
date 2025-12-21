import React, { useState } from 'react'
import { View, Text, Input, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { PartnerService } from '../../services/partner'
import './apply.scss'

export default function PartnerApply() {
    const [step, setStep] = useState(1)
    const [form, setForm] = useState({
        name: '',
        phone: '',
        city: '',
        idCard: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!form.name || !form.phone) {
            Taro.showToast({ title: '请完善信息', icon: 'none' })
            return
        }

        setLoading(true)
        try {
            await PartnerService.applyPartner(form)
            setStep(2) // Success Step
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className='page-apply'>
            {/* Step Indicator */}
            <View className='steps'>
                <View className={`step-item ${step >= 1 ? 'active' : ''}`}>
                    <View className='circle'>1</View>
                    <Text>填写资料</Text>
                </View>
                <View className='line' />
                <View className={`step-item ${step >= 2 ? 'active' : ''}`}>
                    <View className='circle'>2</View>
                    <Text>等待审核</Text>
                </View>
            </View>

            {step === 1 ? (
                <View className='form-content'>
                    <View className='form-group'>
                        <Text className='label'>姓名</Text>
                        <Input
                            className='input'
                            placeholder='请输入真实姓名'
                            value={form.name}
                            onInput={e => setForm({ ...form, name: e.detail.value })}
                        />
                    </View>
                    <View className='form-group'>
                        <Text className='label'>手机号</Text>
                        <Input
                            className='input'
                            type='number'
                            placeholder='请输入联系电话'
                            value={form.phone}
                            onInput={e => setForm({ ...form, phone: e.detail.value })}
                        />
                    </View>
                    <View className='form-group'>
                        <Text className='label'>意向城市</Text>
                        <Input
                            className='input'
                            placeholder='例如：广州市天河区'
                            value={form.city}
                            onInput={e => setForm({ ...form, city: e.detail.value })}
                        />
                    </View>

                    <View className='upload-section'>
                        <Text className='label'>身份证上传</Text>
                        <View className='upload-box'>
                            <Text className='icon-plus'>+</Text>
                            <Text>上传正面照片</Text>
                        </View>
                    </View>

                    <Button
                        className='btn-submit'
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        提交申请
                    </Button>
                </View>
            ) : (
                <View className='result-content'>
                    <View className='icon-success-circle' />
                    <Text className='title'>申请已提交</Text>
                    <Text className='desc'>工作人员将在3个工作日内联系您</Text>
                    <Button className='btn-back' onClick={() => Taro.navigateBack()}>
                        返回首页
                    </Button>
                </View>
            )}
        </View>
    )
}
