import { Card, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined, DollarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import formatPrice from '../assets/functions/formatPrice';

const images = [
  require('../assets/images/landing-card-1.png'),
  require('../assets/images/machine-detail-2.png'),
  require('../assets/images/machine-detail-1.png'),
  require('../assets/images/machine-detail-4.png'),
  require('../assets/images/machine-detail-5.png'),
];

const CardContentText = ({ title, content, icon }) => (
  <div className='card-content-detail'>
    {icon}
    <div className='card-content-text'>
      <p className='card-content-title'>{title}</p>
      <p className='card-content-content'>
        {content.length > 10 ? <Tooltip title={content}>{content.substring(0, 10) + "..."}</Tooltip> : content}
      </p>
    </div>
  </div>
);

export const MachineCard = ({
  machine,
  index,
  subcategoryLabel,
  updateMachine,
  rentMachine
}) => (
  <Card
    style={{ width: "100%" }}
    cover={
      <img
        alt={machine.description}
        src={images[index % 5]}
      />
    }
    actions={[
      <Tooltip title="Düzenle"><EditOutlined className='card-icon' key="setting" onClick={() => updateMachine(machine.id)} /></Tooltip>,
      <Tooltip title="Detay"><EyeOutlined className='card-icon' key="shop" onClick={() => rentMachine(machine.id)} /></Tooltip>,
    ]}
  >
    <div className='card-content'>
      <h3 style={{ paddingLeft: "5px" }}>
        {
          subcategoryLabel.length > 15 ?
            <Tooltip title={subcategoryLabel}>{subcategoryLabel.substring(0, 15) + "..."}</Tooltip>
            :
            subcategoryLabel
        }
      </h3>
      <CardContentText title='Durum' content={machine.status} icon={<InfoCircleOutlined className='card-content-icon' />} />
      <CardContentText title='Fiyat' content={formatPrice(machine.price)} icon={<DollarOutlined className='card-content-icon' />} />
    </div>
  </Card>
);

export default MachineCard; // Ensure this is correct if you're using default export
