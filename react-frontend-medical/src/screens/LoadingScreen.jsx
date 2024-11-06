import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};

export default LoadingScreen;
