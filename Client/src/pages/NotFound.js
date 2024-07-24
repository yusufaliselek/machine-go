import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import '../styles/NotFound.css';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleButtonClick = () => {
    navigate('/');
  };


  return (
    <div className="container">
      <h1 className="title">404</h1>
      <p className="message">{t('notFound.desc')}</p>
      <Button
        type="primary"
        icon={<HomeOutlined />}
        size='large'
        onClick={handleButtonClick}
      >
        {t('notFound.button')}
      </Button>
    </div>
  );
};

export default NotFound;