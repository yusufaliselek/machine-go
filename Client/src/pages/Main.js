import React from 'react'
import '../styles/Main.css'
import Content from '../components/Content'
import { Button } from 'antd';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Meta } = Card;


const Main = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();


  const cardData = [
    {
      imgUrl: require('../assets/images/landing-card-1.png'),
      title: t('main.card1.title'),
      description: t('main.card1.description')
    },
    {
      imgUrl: require('../assets/images/landing-card-2.png'),
      title: t('main.card2.title'),
      description: t('main.card2.description')
    },
    {
      imgUrl: require('../assets/images/landing-card-4.png'),
      title: t('main.card3.title'),
      description: t('main.card3.description')
    }
  ]

  return (
    <Content children={
      <div className='body'>
        {/* HERO SECTION */}
        <div className="hero-section">
          <div className='hero-section-text'>
            <h1 className='hero-section-header'>
              {t('main.title')}
            </h1>
            <h3 className='hero-section-paragraph'>
              {t('main.subTitle')}
            </h3>
            <Button type="primary" size='large' onClick={() => navigate('/machine/list')}>{t('main.button')}</Button>
          </div>
        </div>
        {/* SERVICES SECTION */}
        <div className='section-services'>
          <h1 className='section-header'>{t('main.ourServices')}</h1>
          <p className='section-paragraph'>{t('main.ourServicesDesc')}</p>
        </div>
        {/* DETAIL SECTION */}
        <div className='detail-section'>
          {cardData.map((card, index) =>
            <Card
              hoverable
              style={{ width: 240, padding: "10px" }}
              cover={<img alt={card.title} src={card.imgUrl} style={{ maxHeight: "240px" }} />}
            >
              <Meta title={card.title} description={card.description} />
            </Card>
          )}
        </div>

      </div>
    } />
  )
}

export default Main