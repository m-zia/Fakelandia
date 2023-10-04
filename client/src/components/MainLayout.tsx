import { Outlet } from "react-router-dom";
import Nav from "./Header";

const MainLayout: React.FC = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default MainLayout;
