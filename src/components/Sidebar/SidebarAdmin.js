import React from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavTitle,
  CNavGroup,
  CSidebarToggler,
  CNavLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { NavLink, Outlet } from "react-router-dom";
import { cilSpeedometer, cilPuzzle, cilUser, cilBank } from "@coreui/icons";
import "../../components/Sidebar/SidebarAdmin.css";

function SideBarAdmin() {
  return (
    <div className="sidebar-admin" style={{ display: "flex" }}>
      <CSidebar className="sidebar-full-height border-end" colorScheme="dark">
        <CSidebarHeader className="border-bottom">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-logo%2Ftest.png?alt=media&token=6d383b90-8cd5-48d5-81d2-c82991379de4"
            alt="Logo"
          />
          <CSidebarBrand> THE DIAMOND STORE </CSidebarBrand>
        </CSidebarHeader>
        <CSidebarNav>
          <CNavTitle style={{ marginTop: "0", fontSize: "15px" }}>
            MENU
          </CNavTitle>

          <NavLink
            to="/admin/profile"
            className="nav-item"
            activeClassName="active"
          >
            <CIcon className="nav-icon" icon={cilUser} /> Thông tin cá nhân
          </NavLink>

          <NavLink
            to="/admin/dashboard"
            className="nav-item"
            activeClassName="active"
          >
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
          </NavLink>
          <NavLink
            to="https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm"
            className="nav-item"
          >
            <CIcon customClassName="nav-icon" icon={cilBank} />
            Quản Lý Giao Dịch
          </NavLink>
          <CNavGroup
            toggler={
              <>
                <CIcon
                  className="nav-item"
                  customClassName="nav-icon"
                  icon={cilPuzzle}
                />{" "}
                Quản lý
              </>
            }
          >
            <NavLink
              to="/admin/diamond-manager"
              className="nav-item"
              activeClassName="active"
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Kim cương
            </NavLink>
            <NavLink
              to="/admin/jewelry-manager"
              className="nav-item"
              activeClassName="active"
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Trang sức
            </NavLink>
            <NavLink
              to="/admin/account-manager"
              className="nav-item"
              activeClassName="active"
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Tài khoản
            </NavLink>
            <NavLink
              to="/admin/order-manager"
              className="nav-item"
              activeClassName="active"
            >
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Đơn hàng
            </NavLink>
          </CNavGroup>
        </CSidebarNav>
        <CSidebarHeader className="border-top">
          <CSidebarToggler />
        </CSidebarHeader>
      </CSidebar>
      <div
        style={{
          flex: 1,
          paddingTop: "10px",
          overflowX: "auto",
          overflowY: "hidden",
          maxHeight: "100vh",
        }}
      >
        <div className="sidebar-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SideBarAdmin;
