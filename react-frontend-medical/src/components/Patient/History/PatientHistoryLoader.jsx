import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const PatientHistoryLoader = ({ loading }) => {
  return (
    <>
      {loading ? (
        <div className="patient-history-loader-form">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PatientHistoryLoader;
