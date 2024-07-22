import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Content from '../../components/Content'
import '../../styles/machine/MachineList.css';
import { Button, Input, Drawer, Card } from 'antd';
import { FilterOutlined, EditOutlined, ShoppingFilled, DollarOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Tooltip } from "antd";

const { Search } = Input;

const MachineList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSearch = value => console.log(value);

  /* Yeni Makine Route*/
  const createMachine = () => {
    navigate('/machine/create');
  }

  /* Makine Güncelle Route*/
  const updateMachine = (id) => {
    navigate(`/machine/update/${id}`);
  }

  /* Makine Detay Route*/
  const rentMachine = (id) => {
    navigate(`/machine/${id}`);
  }

  const machineData = [
    {
      id: 1,
      categoryId: 1,
      subCategoryId: 1,
      manufacturingDate: new Date(),
      status: "Kullanılmış",
      description: "10 Tonluk X makinesi",
      price: "1000 TL"
    },
    {
      id: 2,
      categoryId: 2,
      subCategoryId: 2,
      manufacturingDate: new Date(),
      status: "Kullanılmış",
      description: "10 Tonluk X makinesi",
      price: "1000 TL"
    },
    {
      id: 3,
      categoryId: 3,
      subCategoryId: 3,
      manufacturingDate: new Date(),
      status: "Kullanılmış",
      description: "10 Tonluk X makinesi",
      price: "1000 TL"
    },
    {
      id: 4,
      categoryId: 4,
      subCategoryId: 4,
      manufacturingDate: new Date(),
      status: "Kullanılmış",
      description: "10 Tonluk X makinesi",
      price: "1000 TL"
    },
    {
      id: 5,
      categoryId: 5,
      subCategoryId: 5,
      manufacturingDate: new Date(),
      status: "Kullanılmış",
      description: "BEKO",
      price: "1000 TL"
    },
    {
      id: 6,
      categoryId: 6,
      subCategoryId: 6,
      manufacturingDate: new Date(),
      status: "Kullanılmış",
      description: "10 Tonluk X makinesi",
      price: "1000 TL"
    },
  ]

  const CardContentText = ({ title, content, icon }) => {
    return (
      <div className='card-content-detail'>
        {icon}
        <div className='card-content-text'>
          <p className='card-content-title'>{title}</p>
          <p className='card-content-content'>{content}</p>
        </div>
      </div>

    )
  }

  return (
    <Content pageName={"Makineler"} children={
      <div className='section-main'>
        <div className='section-main-search'>
          <Search placeholder="Makine Arayın" onSearch={onSearch} enterButton />
          <Tooltip title="Filtrele"><Button type="primary" icon={<FilterOutlined />} onClick={showDrawer} style={{ padding: "0 20px" }} /></Tooltip>
          <Tooltip title="Yeni Makine Ekle"><Button type="primary" icon={<PlusOutlined />} onClick={createMachine} style={{ padding: "0 20px" }} /></Tooltip>
        </div>
        <div className='section-main-content'>
          <Drawer title="Makineleri Filtreleyin" onClose={onClose} open={open}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
          {machineData.map((machine, index) => {
            return (
              <Card
                style={{ width: 200 }}
                cover={
                  <img
                    alt={machine.description}
                    src={require(`../../assets/landing-card-${1}.png`)}
                  />
                }
                actions={[
                  <Tooltip title="Düzenle"><EditOutlined className='card-icon' key="setting" onClick={() => updateMachine(machine.id)} /></Tooltip>,
                  <Tooltip title="Kirala"><ShoppingFilled className='card-icon' key="shop" onClick={() => rentMachine(machine.id)} /></Tooltip>,
                ]}
              >
                <div className='card-content'>
                  <h3 style={{ paddingLeft: "5px" }}>{machine.description}</h3>
                  <CardContentText title='Durum' content={machine.status} icon={<InfoCircleOutlined className='card-content-icon' />} />
                  <CardContentText title='Fiyat' content={machine.price} icon={<DollarOutlined className='card-content-icon' />} />
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    } />
  )
}

export default MachineList