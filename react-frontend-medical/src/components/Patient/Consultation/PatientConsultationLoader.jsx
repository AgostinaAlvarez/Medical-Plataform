import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const PatientConsultationLoader = ({ loading }) => {
  return (
    <>
      {loading ? (
        <div className="patient-consultation-loader-form" style={{}}>
          <div className="patient-consultation-loader-form-content">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PatientConsultationLoader;
