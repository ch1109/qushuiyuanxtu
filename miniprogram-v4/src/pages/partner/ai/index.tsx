import React, { useState } from 'react'
import { View, Text, Button, Textarea, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../../components/common/NavBar'
import Loading from '../../../components/common/Loading'
import { PartnerService } from '../../../services/partner'
import './index.scss'

export default function PartnerAI() {
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const [resultUrl, setResultUrl] = useState('')

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            Taro.showToast({ title: '请输入活动主题', icon: 'none' })
            return
        }

        setLoading(true)
        try {
            const res = await PartnerService.generatePoster(prompt)
            if (res.success && res.url) {
                setResultUrl(res.url)
                Taro.showToast({ title: '生成成功', icon: 'success' })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View className='page-partner-ai'>
            <NavBar title='数字员工' color='#000' showBack />

            <View className='input-section'>
                <Text className='label'>我想策划一个...</Text>
                <Textarea
                    className='prompt-input'
                    placeholder='例如：中秋节促销海报，主色调红色，突出团圆氛围...'
                    value={prompt}
                    onInput={(e) => setPrompt(e.detail.value)}
                    maxlength={200}
                />

                <Button
                    className={`btn-generate ${loading ? 'loading' : ''}`}
                    onClick={handleGenerate}
                    disabled={loading}
                >
                    {loading ? 'AI 正在思考...' : '开始生成'}
                </Button>
            </View>

            {resultUrl && (
                <View className='result-section'>
                    <Text className='result-title'>生成结果</Text>
                    <Image
                        className='poster-img'
                        src={resultUrl}
                        mode='widthFix'
                        showMenuByLongpress
                    />
                </View>
            )}

            <Loading visible={loading} />
        </View>
    )
}
