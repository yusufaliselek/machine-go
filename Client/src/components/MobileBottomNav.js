import React from 'react'
import '../styles/MobileBottomNav.css'
import { HomeOutlined, AppstoreOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next';

const MobileBottomNav = () => {
  const { t } = useTranslation()
  return (
    <div className='mobile-bottom-nav'>
      <div className='mobile-bottom-nav-item'>
        <HomeOutlined style={{ fontSize: "20px" }} />
        <p>{t('mobileBottomNav.home')}</p>
      </div>
      <div className='mobile-bottom-nav-item'>
        <AppstoreOutlined style={{ fontSize: "20px" }} />
        <p>{t('mobileBottomNav.categories')}</p>
      </div>
      <div className='mobile-bottom-nav-item'>
        <HeartOutlined style={{ fontSize: "20px" }} />
        <p>{t('mobileBottomNav.favorites')}</p>
      </div>
      <div className='mobile-bottom-nav-item'>
        <UserOutlined style={{ fontSize: "20px" }} />
        <p>{t('mobileBottomNav.profile')}</p>
      </div>
    </div>
  )
}

export default MobileBottomNav