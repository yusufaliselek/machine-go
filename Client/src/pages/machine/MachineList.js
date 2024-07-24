import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/machine/MachineList.css';
import { Button, Input, Drawer, Pagination, Tooltip, Empty, Tree, InputNumber } from 'antd';
import { FilterOutlined, PlusOutlined, FileExcelOutlined } from '@ant-design/icons';
import categories from '../../assets/constants/categories';
import machine from '../../api/machine';
import Content from '../../components/Content';
import MachineCard from '../../components/MachineCard';
import exportMachineListToXlsx from '../../assets/functions/exportMachineListToXlsx';
import { useTranslation } from 'react-i18next';
import Spinner from '../../components/Spinner';

const resetList = { items: [], totalCount: 0 }


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
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
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

  const exportToExcel = () => {
    exportMachineListToXlsx(machines.items);
  }

  const getMachines = async ({ page, pageSize, searchTerm }) => {
    try {
      const response = await machine.list(page, pageSize, searchTerm, checkedKeys, priceRange);
      setMachines({
        items: response.items,
        totalCount: response.totalCount
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const multiFilterMachines = async () => {
    try {
      setIsLoading(true);
      const response = await machine.list(pagination.page, pagination.pageSize, pagination.searchTerm, checkedKeys, priceRange);
      setMachines({
        items: response.items,
        totalCount: response.totalCount
      });
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  const clearFilters = () => {
    setCheckedKeys([]);
    setPriceRange({ min: null, max: null });
    setPagination({ ...pagination, page: 1 });
    getMachines(pagination);
    onClose();
  }

  useEffect(() => {
    getMachines(pagination);
  }, [pagination]);


  return (
    // isLoading ? <Spinner /> :
      <Content pageName={t('machineList.pageName')} children={
        <div className='section-main'>
          <div className='section-main-search'>
            <Input.Search
              placeholder={t('machineList.search')}
              onSearch={onSearch}
              enterButton
            />
            <Tooltip title={t('machineList.filter')}>
              <Button type="primary" icon={<FilterOutlined />} onClick={showDrawer} style={{ padding: "0 20px" }} />
            </Tooltip>
            <Tooltip title={t('machineList.export')}>
              <Button type="primary" icon={<FileExcelOutlined />} onClick={exportToExcel} style={{ padding: "0 20px" }} />
            </Tooltip>
            <Tooltip title={t('machineList.create')}>
              <Button type="primary" icon={<PlusOutlined />} onClick={createMachine} style={{ padding: "0 20px" }} />
            </Tooltip>
          </div>
          <Drawer title={t('machineList.multiFilter.title')} onClose={onClose} open={open}>
            <div className='drawer-filter-main'>
              <div>
                <p>{t('machineList.multiFilter.categoryAndSubcategory')}</p>
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
                <p>{t('machineList.multiFilter.priceRange')}</p>
                <Input.Group compact style={{ display: "flex" }}>
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder={t('machineList.multiFilter.min')} value={priceRange.min} step={100} onChange={value => setPriceRange({ ...priceRange, min: value })} />
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
                    placeholder={t('machineList.multiFilter.max')} value={priceRange.max} step={100} onChange={value => setPriceRange({ ...priceRange, max: value })} />
                </Input.Group>
              </div>
            </div>
            <br />
            <div className='drawer-actions'>
              <Button onClick={clearFilters}>{t('machineList.multiFilter.reset')}</Button>
              <Button type="primary" onClick={multiFilterMachines}>{t('machineList.multiFilter.apply')}</Button>
            </div>
          </Drawer>
          {machines.totalCount === 0 ?
            <div className='section-main-empty'><Empty description={t('machineList.notFound')} /></div>
            :
            <div className='section-main-content'>

              <div className='grid-container'>
                {machines.items.map((machine, index) => {
                  const subcategoryLabel = categories.find(x => x.value === machine.categoryId)?.subcategories.find(x => x.value === machine.subcategoryId)?.label;
                  return (
                    <div className='grid-col' key={index}>
                      <MachineCard index={index} machine={machine} subcategoryLabel={subcategoryLabel} rentMachine={rentMachine} updateMachine={updateMachine} />
                    </div>
                  )
                })}
              </div>
            </div>
          }
          {machines.totalCount !== 0 &&
            <Pagination
              className='section-main-pagination'
              style={{ marginTop: "auto", paddingBottom: "5px" }}
              total={machines.totalCount}
              showTotal={(total) => `${t('machineList.total')} ${total} ${t('machineList.machines')}`}
              current={pagination.page}
              pageSize={pagination.pageSize}
              pageSizeOptions={[10]}
              showTitle={false}
              onChange={(page, pageSize) => setPagination({ ...pagination, page, pageSize })}
            />
          }
        </div >
      } />
  )
}

export default MachineList;
