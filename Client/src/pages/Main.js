import React from 'react'
import '../styles/Main.css'
import Content from '../components/Content'
import { Button } from 'antd';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const cardData = [
  {
    imgUrl: require('../assets/images/landing-card-1.png'),
    title: 'Ekskavatörler',
    description: 'Güçlü ve dayanıklı ekskavatörler'
  },
  {
    imgUrl: require('../assets/images/landing-card-2.png'),
    title: 'Kompaktörler',
    description: 'Yüksek performanslı kompaktörler'
  },
  {
    imgUrl: require('../assets/images/landing-card-4.png'),
    title: 'Greyderler',
    description: 'İş makinelerinin vazgeçilmezi greyderler'
  }
]

const Main = () => {
  const navigate = useNavigate();
  return (
    <Content children={
      <div className='body'>
        {/* HERO SECTION */}
        <div className="hero-section">
          <div className='hero-section-text'>
            <h1 className='hero-section-header'>
              Makine Kiralama ve Satışta Güvenilir Adres
            </h1>
            <h3 className='hero-section-paragraph'>
              İşinizde Fark Yaratan Makineler
            </h3>
            <Button type="primary" size='large' onClick={()=> navigate('/machine/list')}>Hemen Ara</Button>
          </div>
        </div>
        {/* SERVICES SECTION */}
        <div className='section-services'>
          <h1 className='section-header'>Hizmetlerimiz</h1>
          <p className='section-paragraph'>
            Sizlere sunduğumuz hizmetlerle işlerinizi hızlandırın ve kolaylaştırın.
          </p>
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