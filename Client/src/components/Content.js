import React from 'react'
import Navbar from './Navbar'
import '../styles/Content.css'

const Content = ({
  pageName,
  children,
  ...props
}) => {
  return (
    <div className='content-main'>
      <Navbar pageName={pageName} />
      {/* Content */}
      <div className='content-sub'>
        {children}
      </div>
    </div>
  )
}

export default Content