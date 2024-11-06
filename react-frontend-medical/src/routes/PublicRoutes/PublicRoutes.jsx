import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "../../screens/PublicScreens/LoginScreen";
import SigninScreen from "../../screens/PublicScreens/SigninScreen";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signin" element={<SigninScreen />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default PublicRoutes;
