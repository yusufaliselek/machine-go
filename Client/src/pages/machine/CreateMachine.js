import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Content from '../../components/Content';
import '../../styles/machine/MachineFormPage.css';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import categories from '../../assets/constants/categories';
import machine from '../../api/machine';
import Toast from '../../components/Toast';
import { useTranslation } from 'react-i18next';

const CreateMachine = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  const handleCategoryChange = (value) => {
    const category = categories.find(x => x.value === value);
    setFilteredSubcategories(category.subcategories);
  }

  const onCancel = () => {
    navigate('/machine/list');
  }

  const onFinish = async (e) => {

    // Zaman formatı düzenleme
    const date = new Date(e.manufacturingDate.$d);
    const localISOTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    // Makine ekleme işlemi
    try {

      await machine.create({ ...e, manufacturingDate: localISOTime });
      Toast.Success("Makine başarıyla eklendi.");
      navigate('/machine/list');

    } catch (error) {

      console.log(error);
      Toast.Error("Makine eklenirken hata oluştu.");

    }
  }

  return (
    <Content pageName={t('createMachine.pageName')} children={
      <div className='section-main'>
        <div className='form'>
          <h2 className='form-title'>{t('createMachine.title')}</h2>
          <hr />
          <Form layout={"vertical"} onFinish={onFinish}>

            <Form.Item
              label={t('createMachine.form.category')}
              name="categoryId"
              rules={[{ required: true, message: t('createMachine.form.categoryRequired') }]}
            >
              <Select onChange={handleCategoryChange}>
                {categories.map((category, index) =>
                  <Select.Option key={index} value={category.value}>{category.label}</Select.Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item label={t('createMachine.form.subCategory')} name="subcategoryId"
              rules={[{ required: true, message: t('createMachine.form.subCategoryRequired') }]}
            >
              <Select>
                {filteredSubcategories.map((subcategory, index) =>
                  <Select.Option key={index} value={subcategory.value}>{subcategory.label}</Select.Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label={t('createMachine.form.description')}
              name="description"
              rules={[{ required: true, message: t('createMachine.form.descriptionRequired') }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label={t('createMachine.form.price')}
              name="price"
              rules={[{ required: true, message: t('createMachine.form.priceRequired') }]}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label={t('createMachine.form.status')}
              name="status"
              rules={[{ required: true, message: t('createMachine.form.statusRequired') }]}>
              <Input />
            </Form.Item>

            <Form.Item label={t('createMachine.form.manufacturingDate')} name="manufacturingDate"
              rules={[{ required: true, message: t('createMachine.form.manufacturingDateRequired') }]}>
              <DatePicker style={{ width: '100%', cursor: "pointer" }} format={"DD/MM/YYYY"} placeholder='' />
            </Form.Item>

            <div className='form-footer'>
              <Button type="default" htmlType="button" style={{ width: "100%" }} onClick={onCancel}>
                {t('createMachine.form.cancel')}
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                {t('createMachine.form.save')}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    } />
  )
}

export default CreateMachine