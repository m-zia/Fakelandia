import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Misdemeanours from "./Misdemeanours";
import ConfessForm from "./ConfessForm";
import MainLayout from "./MainLayout";
import NotFound from "./NotFound";
import { MisdemeanourProvider } from "../context/MisdemeanourContext";

const FakeLandiaRouter: React.FC = () => (
  <MisdemeanourProvider>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="misdemeanours" element={<Misdemeanours />} />
        <Route path="confess" element={<ConfessForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </MisdemeanourProvider>
);

export default FakeLandiaRouter;
