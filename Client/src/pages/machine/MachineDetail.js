import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Content from '../../components/Content';
import machine from '../../api/machine';
import { Image, Button } from 'antd';
import '../../styles/machine/MachineDetail.css';
import categories from '../../assets/constants/categories';

const resetDetail = {
  categoryId: "",
  subcategoryId: "",
  description: "",
  price: "",
  status: "",
  manufacturingDate: ""
}

const images = [
  require('../../assets/images/landing-card-1.png'),
  require('../../assets/images/machine-detail-2.png'),
  require('../../assets/images/machine-detail-1.png'),
  require('../../assets/images/machine-detail-4.png'),
  require('../../assets/images/machine-detail-5.png'),
]

const formatPrice = (price) => {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
};

const MachineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(resetDetail);

  const getMachine = async (id) => {
    try {
      const response = await machine.get(id);
      setDetail(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMachine(id);
    // eslint-disable-next-line
  }, []);

  const onCancel = () => {
    navigate('/machine/list');
  };

  const category = categories.find(x => x.value === detail.categoryId);
  const subcategoryName = category?.subcategories.find(x => x.value === detail.subcategoryId)?.label;

  return (
    <Content pageName={"Makineler"} children={
      <div className='section-main'>
        <div className="product-card">
          <div className="product-image">
            <Image.PreviewGroup>
              <Image className='main-image' src={images[0]} />
              <div className="thumbnail-images">
                <Image className='detail-image' src={images[1]} />
                <Image className='detail-image' src={images[2]} />
                <Image className='detail-image' src={images[3]} />
                <Image className='detail-image' src={images[4]} />
              </div>
            </Image.PreviewGroup>
          </div>
          <div className="product-info">
            <h1>{subcategoryName}</h1>
            <h2>{category?.label}</h2>
            <p className="free-delivery">{formatPrice(detail.price)}</p>
            <p className="description">
              {detail.description}
            </p>
            <p className="status">{detail.status}</p>
            <div className="order-section">
              <Button type="default" onClick={onCancel}>Geri Dön</Button>
              <Button type="primary">Şimdi Kirala</Button>
            </div>
          </div>
        </div>
      </div>
    } />
  )
};

export default MachineDetail;
