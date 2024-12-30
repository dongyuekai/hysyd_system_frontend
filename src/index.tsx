import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Register } from './page/register/Register.tsx';
import { Login } from './page/login/Login.tsx';
import { UpdatePasswordCom } from './page/update_password/UpdatePassword.tsx';
import { ErrorPage } from './page/error/ErrorPage.tsx';
import { First } from './page/first/first.tsx';
import { UpdateInfo } from './page/update_info/UpdateInfo.tsx';

const routes = [
  {
    path: "/",
    element: <First />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "update_info",
        element: <UpdateInfo />,
      },
    ]
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePasswordCom />,
  }
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);