import React from 'react'
import Navbar from './Navbar'
import '../styles/Content.css'
import MobileBottomNav from './MobileBottomNav'

const Content = ({ pageName, children }) => {
  return (
    <div className='content-main'>
      <Navbar pageName={pageName} />

      {/* Content */}
      <div className='content-sub'>
        {children}
      </div>

      <MobileBottomNav />
    </div>
  )
}

export default Content