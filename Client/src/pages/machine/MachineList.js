import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/machine/MachineList.css';
import { Button, Input, Drawer, Card, Pagination, Row, Col, Tooltip } from 'antd';
import { FilterOutlined, EditOutlined, ShoppingFilled, DollarOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import categories from '../../assets/constants/categories';
import machine from '../../api/machine';
import Content from '../../components/Content';

const MachineList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, searchTerm: "" });
  const [machines, setMachines] = useState({
    items: [],
    totalCount: 0
  });

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
      const response = await machine.list(page, pageSize, searchTerm);
      setMachines({
        items: response.items,
        totalCount: response.totalCount
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMachines(pagination);
  }, []);

  useEffect(() => {
    getMachines(pagination);
  }, [pagination]);

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
        <div className='section-main-content'>
          <Drawer title="Makineleri Filtreleyin" onClose={onClose} open={open}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
          <Row gutter={[16, 16]}>
            {machines.items.map((machine, index) => {
              const subcategoryLabel = categories.find(x => x.value === machine.categoryId)?.subcategories.find(x => x.value === machine.subcategoryId)?.label;
              return (
                <Col key={index} xs={24} sm={24} md={8} lg={6} xl={4} style={{ display: "flex", justifyContent: "center" }}>
                  <Card
                    style={{ width: "100%" }}
                    cover={
                      <img
                        alt={machine.description}
                        src={require(`../../assets/images/landing-card-${1}.png`)}
                      />
                    }
                    actions={[
                      <Tooltip title="Düzenle"><EditOutlined className='card-icon' key="setting" onClick={() => updateMachine(machine.id)} /></Tooltip>,
                      <Tooltip title="Kirala"><ShoppingFilled className='card-icon' key="shop" onClick={() => rentMachine(machine.id)} /></Tooltip>,
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
                      <CardContentText title='Fiyat' content={machine.price + " TL"} icon={<DollarOutlined className='card-content-icon' />} />
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>
        <Pagination
          style={{ marginTop: "auto", paddingBottom: "5px" }}
          total={machines.totalCount}
          showTotal={(total) => `Toplam ${total} Makine`}
          current={pagination.page}
          pageSize={pagination.pageSize}
          pageSizeOptions={[10]}
          showTitle={false}
          locale={{ items_per_page: '' }}
          onChange={(page, pageSize) => setPagination({ ...pagination, page, pageSize })}
        />
      </div>
    } />
  )
}

export default MachineList;
