import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main.js';
import NotFound from '../pages/NotFound.js';
import MachineList from '../pages/machine/MachineList.js';
import UpdateMachine from '../pages/machine/UpdateMachine.js';
import CreateMachine from '../pages/machine/CreateMachine.js';
import MachineDetail from '../pages/machine/MachineDetail.js';


const Router = () => (
  <BrowserRouter>
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
  </BrowserRouter>
)

export default Router;