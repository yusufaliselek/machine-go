import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react'

const Spinner = () => {
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Spin indicator={<LoadingOutlined spin />} size='large'/></div>
  )
}

export default Spinner