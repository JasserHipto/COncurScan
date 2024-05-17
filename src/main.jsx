import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './page/dashboard/Dashboard';
import Keywords from './page/keywords/Keywords';
import Pages from './page/pages/Pages';
import Login from './page/authentification/login';
import Concurents from './page/concurents/Concurents';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Login />} />
      <Route path='dashboard'  element={<Dashboard />} />
      <Route path='keywords' element={<Keywords/>} />
      <Route path='pages' element={<Pages/>} />  
      <Route path='concurents' element={<Concurents/>} />  
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

