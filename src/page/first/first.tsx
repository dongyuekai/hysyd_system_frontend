import React from 'react';
import { UserOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import './first.css';

export function First() {
  return <div id="index-container">
    <div className="header">
      <h1>会议室预定系统</h1>
      <UserOutlined className="icon" />
    </div>
    <div className="body">
      <Outlet></Outlet>
    </div>
  </div>
}
