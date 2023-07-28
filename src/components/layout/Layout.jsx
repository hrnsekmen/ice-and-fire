/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Header";
const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname === "/") navigate("/houses");
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Layout;
