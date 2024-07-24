import React from 'react'
import '../styles/MobileBottomNav.css'

import { HomeOutlined, AppstoreOutlined, UserOutlined, HeartOutlined    } from '@ant-design/icons'

const MobileBottomNav = () => {
  return (
    <div className='mobile-bottom-nav'>
      <div className='mobile-bottom-nav-item'>
        <HomeOutlined style={{ fontSize: "20px" }} />
        <p>Anasayfa</p>
      </div>
      <div className='mobile-bottom-nav-item'>
        <AppstoreOutlined style={{ fontSize: "20px" }} />
        <p>Kategoriler</p>
      </div>
      <div className='mobile-bottom-nav-item'>
        <HeartOutlined style={{ fontSize: "20px" }} />
        <p>Favoriler</p>
      </div>
      <div className='mobile-bottom-nav-item'>
        <UserOutlined style={{ fontSize: "20px" }} />
        <p>Üye Girişi</p>
      </div>
    </div>
  )
}

export default MobileBottomNav