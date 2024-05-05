import Atoms from "component/templates/Atoms";
import Home from "component/templates/Home";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/atoms" element={<Atoms />} />
    </Routes>
  );
};
