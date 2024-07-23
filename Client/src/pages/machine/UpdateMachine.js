import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Content from '../../components/Content';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import categories from '../../assets/constants/categories';
import machine from '../../api/machine';
import Toast from '../../components/Toast';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import '../../styles/machine/MachineFormPage.css';

const resetForm = {
  categoryId: "",
  subcategoryId: "",
  description: "",
  price: "",
  status: "",
  manufacturingDate: ""
}

const UpdateMachine = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);


  const getMachine = async (id) => {
    try {
      const response = await machine.get(id);
      form.setFieldsValue({ ...response, manufacturingDate: dayjs(response.manufacturingDate) });
      setFilteredSubcategories(getSubcategories(response.categoryId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMachine(id);
    // eslint-disable-next-line
  }, []);

  const handleCategoryChange = (value) => {
    const category = categories.find(x => x.value === value);
    setFilteredSubcategories(category.subcategories);
  };

  const getSubcategories = (categoryId) => {
    const category = categories.find(x => x.value === categoryId);
    return category ? category.subcategories : [];
  };

  const onCancel = () => {
    navigate('/machine/list');
  };

  const onDelete = async () => {
    Swal.fire({
      title: 'Emin misiniz?',
      text: "Makineyi silmek istediğinize emin misiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#fec74f',
      confirmButtonText: 'Evet, Sil',
      cancelButtonText: 'İptal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await machine.remove(id);
          Toast.Success("Makine başarıyla silindi.");
          navigate('/machine/list');
        } catch (error) {
          console.log(error);
          Toast.Error("Makine silinirken hata oluştu.");
        }
      }
    });
  }

  const onFinish = async (values) => {
    const date = new Date(values.manufacturingDate.$d);
    const localISOTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    try {
      await machine.update({ ...values, manufacturingDate: localISOTime, id }, id);
      Toast.Success("Makine başarıyla güncellendi.");
      navigate('/machine/list');
    } catch (error) {
      console.log(error);
      Toast.Error("Makine güncellenirken hata oluştu.");
    }
  };

  return (
    <Content pageName={"Makineler"} children={
      <div className='section-main'>
        <div className='form'>
          <h2 className='form-title'>Makine Düzenle</h2>
          <hr />
          <Form
            form={form}
            layout={"vertical"}
            onFinish={onFinish}
            initialValues={resetForm} // Use initialValues to set form fields
          >
            <Form.Item
              label="Kategori"
              name="categoryId"
              rules={[{ required: true, message: 'Lütfen kategori seçiniz!' }]}
            >
              <Select onChange={handleCategoryChange}>
                {categories.map((category, index) =>
                  <Select.Option key={index} value={category.value}>{category.label}</Select.Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item label="Alt Kategori" name="subcategoryId"
              rules={[{ required: true, message: 'Lütfen alt kategori seçiniz!' }]}
            >
              <Select>
                {filteredSubcategories.map((subcategory, index) =>
                  <Select.Option key={index} value={subcategory.value}>{subcategory.label}</Select.Option>
                )}
              </Select>
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
              <Button type="link" htmlType='button' style={{ width: "100%" }} onClick={onDelete}>Sil</Button>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Güncelle
              </Button>
            </div>
          </Form>
        </div>
      </div>
    } />
  )
};

export default UpdateMachine;
