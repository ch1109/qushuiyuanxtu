import React, { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
// 全局样式
import './app.scss'

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {
    if (process.env.TARO_ENV !== 'h5') return

    const className = 'hide-system-nav'
    const roots = [document.documentElement, document.body, document.getElementById('app')].filter(Boolean) as HTMLElement[]
    const selector = 'taro-page-head, .taro_page_head, .taro-page-head, page-head, .page-head, taro-navigation-bar, .taro-navigation-bar'

    const hideNav = () => {
      document.querySelectorAll<HTMLElement>(selector).forEach((node) => {
        node.style.setProperty('display', 'none', 'important')
      })
    }

    roots.forEach((node) => node.classList.add(className))
    document.title = ''
    hideNav()

    const observer = new MutationObserver(hideNav)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      roots.forEach((node) => node.classList.remove(className))
      observer.disconnect()
      document.querySelectorAll<HTMLElement>(selector).forEach((node) => {
        node.style.removeProperty('display')
      })
    }
  }, [])

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return props.children
}

export default App
