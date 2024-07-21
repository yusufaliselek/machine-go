import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import '../styles/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };


  return (
    <div className="container">
      <h1 className="title">404</h1>
      <p className="message">Sayfa Bulunamadı</p>
      <Button
        type="primary"
        icon={<HomeOutlined />}
        size='large'
        onClick={handleButtonClick}
      >
        Ana Sayfaya Dön
      </Button>
    </div>
  );
};

export default NotFound;