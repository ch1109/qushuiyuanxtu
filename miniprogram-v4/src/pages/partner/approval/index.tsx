import { useMemo, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '../../../components/common/NavBar'
import './index.scss'

type ApprovalItem = {
    id: string
    title: string
    desc: string
    reason: string
    time: string
}

export default function ApprovalManagement() {
    const approvals = useMemo<ApprovalItem[]>(() => ([
        {
            id: 'AP-2025-001',
            title: '下级合伙人申请',
            desc: '李四 · 市场合伙人申请',
            reason: '具备社区资源，已完成50人拼团目标，申请开通市场合伙人权限。',
            time: '2025-12-21 10:30'
        },
        {
            id: 'AP-2025-002',
            title: '特殊退款审批',
            desc: '设备 SH-1021 · 退款金额 ¥120',
            reason: '用户重复扣费，需按订单号 O202512210091 进行退款处理。',
            time: '2025-12-21 09:10'
        }
    ]), [])

    const [showRejectModal, setShowRejectModal] = useState(false)
    const [rejectReason, setRejectReason] = useState('')
    const [currentItem, setCurrentItem] = useState<ApprovalItem | null>(null)

    const handleApprove = () => {
        Taro.showToast({ title: '已通过', icon: 'success' })
    }

    const handleRejectOpen = (item: ApprovalItem) => {
        setCurrentItem(item)
        setRejectReason('')
        setShowRejectModal(true)
    }

    const handleRejectConfirm = () => {
        if (!rejectReason.trim()) {
            Taro.showToast({ title: '请填写驳回原因', icon: 'none' })
            return
        }
        Taro.showToast({ title: '已驳回', icon: 'none' })
        setShowRejectModal(false)
    }

    return (
        <View className='page-partner-approval'>
            <NavBar title='审批管理' showBack />

            <View className='summary-card'>
                <Text className='summary-title'>待审批事项</Text>
                <Text className='summary-count'>{approvals.length}</Text>
            </View>

            <View className='approval-list'>
                {approvals.map(item => (
                    <View className='approval-card' key={item.id}>
                        <View className='approval-head'>
                            <Text className='title'>{item.title}</Text>
                            <Text className='time'>{item.time}</Text>
                        </View>
                        <Text className='desc'>{item.desc}</Text>
                        <View className='reason-box'>
                            <Text className='reason-label'>申请理由</Text>
                            <Text className='reason-text'>{item.reason}</Text>
                        </View>
                        <View className='actions'>
                            <View className='btn reject' onClick={() => handleRejectOpen(item)}>驳回</View>
                            <View className='btn approve' onClick={handleApprove}>通过</View>
                        </View>
                    </View>
                ))}
            </View>

            {showRejectModal && (
                <View className='modal-overlay'>
                    <View className='modal-content'>
                        <Text className='modal-title'>填写驳回原因</Text>
                        {currentItem && (
                            <View className='modal-summary'>
                                <Text className='summary-title'>{currentItem.title}</Text>
                                <Text className='summary-desc'>{currentItem.desc}</Text>
                            </View>
                        )}
                        <textarea
                            className='modal-textarea'
                            value={rejectReason}
                            placeholder='请输入驳回原因'
                            // @ts-ignore
                            onInput={(e) => setRejectReason(e.detail.value)}
                        />
                        <View className='modal-btns'>
                            <View className='btn cancel' onClick={() => setShowRejectModal(false)}>取消</View>
                            <View className='btn confirm' onClick={handleRejectConfirm}>确认驳回</View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}
