import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/machine/MachineList.css';
import { Button, Input, Drawer, Card, Pagination, Tooltip, Empty, Tree, InputNumber } from 'antd';
import { FilterOutlined, EditOutlined, EyeOutlined, DollarOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import categories from '../../assets/constants/categories';
import machine from '../../api/machine';
import Content from '../../components/Content';
import formatPrice from '../../assets/functions/formatPrice';

const resetList = { items: [], totalCount: 0 }

const images = [
  require('../../assets/images/landing-card-1.png'),
  require('../../assets/images/machine-detail-2.png'),
  require('../../assets/images/machine-detail-1.png'),
  require('../../assets/images/machine-detail-4.png'),
  require('../../assets/images/machine-detail-5.png'),
]

const transformCategories = (categories) => {
  return categories.map(category => ({
    key: category.value,
    title: category.label,
    children: category.subcategories.map(subcategory => ({
      key: subcategory.value,
      title: subcategory.label
    }))
  }));
};


const treeData = transformCategories(categories)


const MachineList = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, searchTerm: "" });
  const [machines, setMachines] = useState(resetList);

  // TreeView
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  // Multi Filter
  const [priceRange, setPriceRange] = useState({ min: null, max: null });
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSearch = value => {
    setPagination({ ...pagination, searchTerm: value, page: 1 });
  }

  const createMachine = () => {
    navigate('/machine/create');
  }

  const updateMachine = (id) => {
    navigate(`/machine/update/${id}`);
  }

  const rentMachine = (id) => {
    navigate(`/machine/${id}`);
  }

  const getMachines = async ({ page, pageSize, searchTerm }) => {
    try {
      const response = await machine.list(page, pageSize, searchTerm, checkedKeys, priceRange);
      setMachines({
        items: response.items,
        totalCount: response.totalCount
      });
    } catch (error) {
      console.log(error);
    }
  }

  const multiFilterMachines = async () => {
    try {
      const response = await machine.list(pagination.page, pagination.pageSize, pagination.searchTerm, checkedKeys, priceRange);
      setMachines({
        items: response.items,
        totalCount: response.totalCount
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  const clearFilters = () => {
    setCheckedKeys([]);
    setPriceRange({ min: 0, max: 0 });
    setPagination({ ...pagination, page: 1 });
    getMachines(pagination);
    onClose();
  }

  useEffect(() => {
    getMachines(pagination);
  }, [pagination]);

  const CardContentText = ({ title, content, icon }) => {
    return (
      <div className='card-content-detail'>
        {icon}
        <div className='card-content-text'>
          <p className='card-content-title'>{title}</p>
          <p className='card-content-content'>
            {content.length > 10 ? <Tooltip title={content}>{content.substring(0, 10) + "..."}</Tooltip> : content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Content pageName={"Makineler"} children={
      <div className='section-main'>
        <div className='section-main-search'>
          <Input.Search
            placeholder="Makine Arayın"
            onSearch={onSearch}
            enterButton
          />
          <Tooltip title="Filtrele">
            <Button type="primary" icon={<FilterOutlined />} onClick={showDrawer} style={{ padding: "0 20px" }} />
          </Tooltip>
          <Tooltip title="Yeni Makine Ekle">
            <Button type="primary" icon={<PlusOutlined />} onClick={createMachine} style={{ padding: "0 20px" }} />
          </Tooltip>
        </div>
        <Drawer title="Makineleri Filtreleyin" onClose={onClose} open={open}>
          <div className='drawer-filter-main'>
            <div>
              <p>Kategori ve Alt Kategori</p>
              <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                treeData={treeData}
              />
            </div>
            <div>
              <p>Fiyat Aralığı</p>
              <Input.Group compact style={{ display: "flex" }}>
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  placeholder="Minimum" value={priceRange.min} step={100} onChange={value => setPriceRange({ ...priceRange, min: value })} />
                <Input placeholder="~" disabled
                  style={{
                    width: '10%',
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                  }} />
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  placeholder="Maksimum" value={priceRange.max} step={100} onChange={value => setPriceRange({ ...priceRange, max: value })} />
              </Input.Group>
            </div>
          </div>
          <br />
          <div className='drawer-actions'>
            <Button onClick={clearFilters}>Sıfırla</Button>
            <Button type="primary" onClick={multiFilterMachines}>Filtrele</Button>
          </div>
        </Drawer>
        {machines.totalCount === 0 ?
          <div className='section-main-empty'><Empty description={"Makine Bulunamadı"} /></div>
          :
          <div className='section-main-content'>

            <div className='grid-container'>
              {machines.items.map((machine, index) => {
                const subcategoryLabel = categories.find(x => x.value === machine.categoryId)?.subcategories.find(x => x.value === machine.subcategoryId)?.label;
                return (
                  <div className='grid-col' key={index}>
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
                  </div>
                )
              })}
            </div>
          </div>
        }
        {machines.totalCount !== 0 && <Pagination
          style={{ marginTop: "auto", paddingBottom: "5px" }}
          total={machines.totalCount}
          showTotal={(total) => `Toplam ${total} Makine`}
          current={pagination.page}
          pageSize={pagination.pageSize}
          pageSizeOptions={[10]}
          showTitle={false}
          onChange={(page, pageSize) => setPagination({ ...pagination, page, pageSize })}
        />}
      </div >
    } />
  )
}

export default MachineList;
