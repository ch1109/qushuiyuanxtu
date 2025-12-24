import { useEffect, useState } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CustomTabBar from '../../components/common/CustomTabBar'
import Loading from '../../components/common/Loading'
import AuthModal from '../../components/common/AuthModal'
// import { DeviceService } from '../../services/device'
import { useAuthStore } from '../../store/auth'
import { Device } from '../../types'
import { Scan } from '@nutui/icons-react-taro'
import bannerImage from '../../assets/images/banner.png'
import './index.scss'

export default function Index() {
  const [devices, setDevices] = useState<Device[]>([])
  const [currentTab, setCurrentTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  // MOCK: Force user as Partner for prototype visualization
  // In real app, this comes from useAuthStore
  const { user: realUser, isLogged } = useAuthStore()
  const user = {
    ...realUser,
    roleTags: ['PARTNER_CITY'], // Mocking partner role
    nickname: realUser?.nickname || '微信用户_1765',
    avatar: realUser?.avatar || 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png'
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const mockDevices = [
        {
          id: '1001',
          name: '广东省东莞市大朗镇新世纪明上居',
          location: { distance: 0.8 },
          status: 'NORMAL'
        },
        {
          id: '1002',
          name: '广东省东莞市大朗镇富华楼',
          location: { distance: 1.6 },
          status: 'MAINTENANCE'
        },
        {
          id: '1003',
          name: '广东省东莞市大朗镇松朗广场',
          location: { distance: 2.4 },
          status: 'FAULT'
        }
      ]
      setTimeout(() => {
        setDevices(mockDevices as any)
      }, 500)
    } finally {
      setLoading(false)
    }
  }

  const handleScan = () => {
    if (!isLogged) {
      setShowAuth(true)
      return
    }
    Taro.navigateTo({ url: '/pages/device/scan' })
  }

  const handleNav = (path: string) => {
    if (!path) return
    Taro.navigateTo({ url: path })
  }

  const getStatusInfo = (status?: string) => {
    switch (status) {
      case 'MAINTENANCE':
        return { label: '维护', className: 'maintenance' }
      case 'FAULT':
        return { label: '故障', className: 'fault' }
      default:
        return { label: '正常', className: 'normal' }
    }
  }

  return (
    <View className='page-index'>
      {/* Hero Banner */}
      <View className='hero-section'>
        <View className='nav-bar-slot' />
        <Image className='hero-img' src={bannerImage} mode='aspectFill' />
        <View className='hero-overlay'>
          <View className='hero-actions'>
            <View className='hero-action'>
              <Text className='dots'>...</Text>
            </View>
            <View className='hero-action'>
              <Text className='minus'>-</Text>
            </View>
            <View className='hero-action'>
              <View className='circle' />
            </View>
          </View>
        </View>
      </View>

      <View className='content-card'>
        {/* User Strip */}
        <View className='user-strip'>
          <Image className='avatar' src={user.avatar} mode='aspectFill' />
          <Text className='user-name'>{user.nickname}</Text>
          <View className='coins'>
            <Text className='coins-val'>500</Text>
            <Text className='coins-unit'>水币</Text>
          </View>
        </View>

        {/* Nearby Stations */}
        {devices.length > 0 && (
          <View className='nearby-section'>
            <Text className='section-title'>附近水站</Text>
            <View className='station-list'>
              {devices.slice(0, 3).map((device) => {
                const statusInfo = getStatusInfo((device as any).status)
                return (
                  <View
                    key={device.id}
                    className='station-item'
                    onClick={() => handleNav('/pages/device/index')}
                  >
                    <View className='station-main'>
                      <Text className='station-name'>{device.name}</Text>
                      <View className={`status-badge ${statusInfo.className}`}>
                        <Text>{statusInfo.label}</Text>
                      </View>
                    </View>
                    <Text className='station-distance'>距您{device.location?.distance}km</Text>
                  </View>
                )
              })}
            </View>
          </View>
        )}

        {/* Primary Operations */}
        <Button className='scan-btn' onClick={handleScan}>
          <Scan size={22} style={{ marginRight: 8 }} />
          <Text>扫码取水</Text>
        </Button>
        <Button className='device-btn' onClick={() => handleNav('/pages/device/input')}>
          <View className='device-icon' />
          <Text>设备号取水</Text>
        </Button>
      </View>

      <CustomTabBar
        current={currentTab}
        role={user?.roleTags.includes('PARTNER_CITY') ? 'PARTNER' : 'USER'}
        onChange={(idx) => {
          setCurrentTab(idx)
          if (idx === 1) Taro.navigateTo({ url: '/pages/device/index' })
          if (idx === 2) Taro.navigateTo({ url: '/pages/user/index' })
        }}
      />

      <Loading visible={loading} />
      <AuthModal visible={showAuth} onClose={() => setShowAuth(false)} />
    </View>
  )
}
