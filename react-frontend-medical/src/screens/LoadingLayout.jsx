import { Spin } from "antd";
import React from "react";

const LoadingLayout = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <div className="loading-bg">
          <Spin size="large" />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default LoadingLayout;
