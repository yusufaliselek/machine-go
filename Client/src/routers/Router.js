import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound.js';
import CreateMachine from '../pages/machine/CreateMachine.js';

const UpdateMachine = lazy(() => import('../pages/machine/UpdateMachine.js'));
const MachineDetail = lazy(() => import('../pages/machine/MachineDetail.js'));
const Main = lazy(() => import('../pages/Main.js'));
const MachineList = lazy(() => import('../pages/machine/MachineList.js'));


const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>

      <Routes>
        <Route path="/" element={<Main />} />

        {/* Machine */}
        <Route path="/machine/list" element={<MachineList />} />
        <Route path="/machine/:id" element={<MachineDetail />} />
        <Route path="/machine/create" element={<CreateMachine />} />
        <Route path="/machine/update/:id" element={<UpdateMachine />} />


        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense >
  </BrowserRouter>
)

export default Router;