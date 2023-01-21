import React from 'react';
import { Route, Routes } from "react-router-dom";
import Findings from "../components/Findings/Findings";

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/dashboard" />
      <Route path="/findings" element={<Findings />} />
      <Route path="/remediation" />
      <Route path="/rules" />
    </Routes>
  )

}

export default AppRoutes