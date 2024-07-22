import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Content from '../../components/Content';
import '../../styles/machine/CreateMachine.css';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import categories from '../../assets/constants/categories';

const CreateMachine = () => {
  const navigate = useNavigate();

  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  const onCancel = () => {
    navigate('/machine/list');
  }

  const onFinish = (e) => {
    console.log(e);
  }

  const handleCategoryChange = (value) => {
    const category = categories.find(x => x.value === value);
    setFilteredSubcategories(category.subcategories);
  }

  return (
    <Content pageName={"Makineler"} children={
      <div className='section-main'>
        <div className='form'>
          <h2 className='form-title'>Makine Ekle</h2>
          <hr />
          <Form layout={"vertical"} onFinish={onFinish}>

            <Form.Item
              label="Kategori"
              name="categoryId"
              rules={[{ required: true, message: 'Lütfen kategori seçiniz!' }]}
            >
              <Select options={categories} onChange={handleCategoryChange}/>
            </Form.Item>

            <Form.Item label="Alt Kategori" name="subcategoryId"
              rules={[{ required: true, message: 'Lütfen alt kategori seçiniz!' }]}
            >
              <Select options={filteredSubcategories}/>
            </Form.Item>

            <Form.Item
              label="Makine Açıklaması"
              name="description"
              rules={[{ required: true, message: 'Lütfen makine açıklaması giriniz!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Makine Fiyatı"
              name="price"
              rules={[{ required: true, message: 'Lütfen makine fiyatı giriniz!' }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Makine Durumu"
              name="status"
              rules={[{ required: true, message: 'Lütfen makine durumunu giriniz!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Üretim Tarihi" name="manufacturingDate"
              rules={[{ required: true, message: 'Lütfen üretim tarihi seçiniz!' }]}>
              <DatePicker style={{ width: '100%', cursor: "pointer" }} format={"DD/MM/YYYY"} placeholder='' />
            </Form.Item>

            <div className='form-footer'>
              <Button type="default" htmlType="button" style={{ width: "100%" }} onClick={onCancel}>
                İptal
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Kaydet
              </Button>
            </div>
          </Form>
        </div>
      </div>
    } />
  )
}

export default CreateMachine