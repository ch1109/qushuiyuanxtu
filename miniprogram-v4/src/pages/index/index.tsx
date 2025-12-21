import { useEffect, useState } from 'react'
import { View, Text, Image, Swiper, SwiperItem, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CustomTabBar from '../../components/common/CustomTabBar'
import Loading from '../../components/common/Loading'
import AuthModal from '../../components/common/AuthModal'
// import { DeviceService } from '../../services/device'
import { useAuthStore } from '../../store/auth'
import { Device } from '../../types'
import { Scan, Share, Location, People } from '@nutui/icons-react-taro' // Hypothetical icons, will adjust if needed
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

  // Banner Data Mock with Video Support
  const banners = [
    { type: 'image', url: 'https://img12.360buyimg.com/imagetools/jfs/t1/196130/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png' },
    { type: 'video', url: 'https://storage.jd.com/about/big-final.mp4?Expires=3730193075&AccessKey=3LoYX1dQWa6ZXzZP&Signature=ViGT7VLtJd2E2x%2F%2F3n%2F%2F3n%2F' } // Mock video
  ]

  // KingKong Grid Menu Items
  // Icons are mapped from NutUI or just using placeholders/images if specific icons missing
  // Using NutUI icons: People, Share, Cart, Shop, Star, etc.
  // Since we don't have all icons imported, we will use a helper to render generic icons or images
  const gridItems = [
    { id: 'service', label: '专享服务', sub: '精选好物', icon: 'Shop', path: '/pages/mall/index', color: '#FFB800' }, // Service Store
    { id: 'group', label: '拼团活动', sub: '合伙人专享', icon: 'People', path: '/pages/partner/group/index', color: '#FF4D4F', role: 'PARTNER' }, // Group Buy
    { id: 'lucky', label: '每日抽奖', sub: '赢水币', icon: 'Star', path: '/pages/marketing/lucky/index', color: '#722ED1' }, // Lucky Draw
    { id: 'recharge', label: '购买水币', sub: '多买多送', icon: 'Cart', path: '/pages/user/recharge', color: '#1890FF' }, // Recharge
    { id: 'share', label: '邀请赚钱', sub: '裂变分润', icon: 'Share', path: '', openType: 'share', color: '#52C41A' }, // Share
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Mocking 1 recommended device with Water Quality Data
      const mockDevice = {
        id: '1001',
        name: '广东省东莞市大朗镇新世纪明上居',
        location: { distance: 0.8 },
        status: 'ONLINE',
        // New: Water Quality Mock
        waterQuality: {
          tds: 18,
          temp: 26,
          turbidity: 0.1,
          eval: '优',
          status: 'EXCELLENT',
          updateTime: '10:42:00'
        }
      }
      // Simulate API delay
      setTimeout(() => {
        setDevices([mockDevice as any])
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

  const recommendedDevice = devices[0]

  return (
    <View className='page-index'>
      {/* 1. Header Section with Banner */}
      <View className='header-section'>
        <View className='nav-bar-slot' />

        <View className='banner-container'>
          <Swiper
            className='banner-swiper'
            circular
            autoplay
            interval={5000}
            indicatorDots
            indicatorColor='rgba(255,255,255,0.4)'
            indicatorActiveColor='#fff'
          >
            {banners.map((item, idx) => (
              <SwiperItem key={idx}>
                {item.type === 'video' ? (
                  <View className='video-placeholder'>
                    {/* Simulating Video Player */}
                    <Text className='video-tag'>▶ 品牌宣传片</Text>
                    <Image className='banner-img' src={banners[0].url} mode='aspectFill' />
                  </View>
                ) : (
                  <Image className='banner-img' src={item.url} mode='aspectFill' />
                )}
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>

      <View className='main-content'>

        {/* 2. KingKong Grid Area (New!) */}
        <View className='king-kong-card'>
          {gridItems.map((item) => {
            // Permission Check
            if (item.role === 'PARTNER' && !user.roleTags.some(t => t.startsWith('PARTNER'))) return null

            return (
              <View
                key={item.id}
                className='grid-item'
                onClick={() => item.path ? handleNav(item.path) : null}
                // @ts-ignore
                open-type={item.openType}
              >
                <View className='icon-box' style={{ backgroundColor: `${item.color}15` }}>
                  {/* Dynamic Icon Rendering based on name - simplifying mapping for prototype */}
                  {item.icon === 'Shop' && <Location color={item.color} size={20} />}
                  {item.icon === 'People' && <People color={item.color} size={20} />}
                  {item.icon === 'Star' && <Scan color={item.color} size={20} />} {/* Placeholder for Star */}
                  {item.icon === 'Cart' && <People color={item.color} size={20} />} {/* Placeholder for Cart */}
                  {item.icon === 'Share' && <Share color={item.color} size={20} />}
                </View>
                <Text className='label'>{item.label}</Text>
                <Text className='sub-label'>{item.sub}</Text>
              </View>
            )
          })}
        </View>

        {/* 3. Recommended Station with Quality Dashboard (Updated) */}
        {recommendedDevice && (
          <View className='rec-station-card' onClick={() => handleNav('/pages/device/index')}>
            <View className='card-header'>
              <View className='left'>
                <Text className='tag'>最近常去</Text>
                <Text className='name'>{recommendedDevice.name}</Text>
              </View>
              <Text className='distance'>{recommendedDevice.location?.distance}km</Text>
            </View>

            {/* Water Quality Dashboard */}
            <View className='quality-dashboard'>
              <View className='metric'>
                <Text className='val'>{recommendedDevice.waterQuality?.tds}</Text>
                <Text className='unit'>TDS</Text>
              </View>
              <View className='divider' />
              <View className='metric'>
                <Text className='val'>{recommendedDevice.waterQuality?.temp}°C</Text>
                <Text className='unit'>水温</Text>
              </View>
              <View className='divider' />
              <View className='metric'>
                <Text className='val'>{recommendedDevice.waterQuality?.turbidity}</Text>
                <Text className='unit'>浊度</Text>
              </View>

              <View className='eval-badge'>
                <Text>水质{recommendedDevice.waterQuality?.eval}</Text>
              </View>
            </View>
          </View>
        )}

        {/* 4. Primary Operations Buttons */}
        <View className='primary-operations'>
          <Button className='main-btn scan-btn' onClick={handleScan}>
            <Scan size={24} style={{ marginRight: 8 }} />
            <Text>扫码取水</Text>
          </Button>

          <Button className='main-btn manual-btn' onClick={() => handleNav('/pages/device/input')}>
            <Text>输入编码</Text>
          </Button>
        </View>
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
