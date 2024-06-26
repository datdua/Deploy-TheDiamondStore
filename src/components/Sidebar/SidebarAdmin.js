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
import {
  cilSpeedometer,
  cilPuzzle,
  cilUser,
  cilBank,
  cilCart,
  cilInbox,
  cilPeople,
  cilTextStrike,
  cilDiamond,
  cilWatch
} from "@coreui/icons";
import "../../components/Sidebar/SidebarAdmin.css";

function SideBarAdmin() {
  return (
    <div className="sidebar-admin" style={{ display: "flex" }}>
      <CSidebar className="sidebar-full-height border-end" colorScheme="dark">
        <CSidebarHeader className="border-bottom">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-logo%2Ftest.png?alt=media&token=6d383b90-8cd5-48d5-81d2-c82991379de4"
            alt="Logo"
            className="sidebar-logo"
          />
          <CSidebarBrand> THE DIAMOND STORE </CSidebarBrand>
        </CSidebarHeader>
        <CSidebarNav>
          <CNavTitle style={{ marginTop: "0", fontSize: "15px" }}>MENU</CNavTitle>

          <NavLink
            to="/admin/profile"
            className="sidebar-nav-item"
            activeClassName="active"
          >
            <CIcon className="nav-icon" icon={cilUser} /> Thông tin cá nhân
          </NavLink>

          <NavLink
            to="/admin/dashboard"
            className="sidebar-nav-item"
            activeClassName="active"
          >
            <CIcon className="nav-icon" icon={cilSpeedometer} /> Dashboard
          </NavLink>

          <NavLink
            to="/admin/transaction-manager"
            className="sidebar-nav-item"
            activeClassName="active"
          >
            <CIcon className="nav-icon" icon={cilBank} /> Quản lý giao dịch
          </NavLink>

          <CNavGroup
            toggler={
              <>
                <CIcon className="nav-icon" icon={cilPuzzle} /> Quản lý
              </>
            }
          >
            <CNavGroup toggler={<>Sản phẩm</>}>
              <CNavGroup toggler={<> <CIcon className="icon-nav-group" icon={cilDiamond} />Kim cương</>} style={{paddingLeft: "5px"}}>
                <NavLink
                  to="/admin/diamond/diamond-manager"
                  className="sidebar-nav-item-group"
                  activeClassName="active"
                >
                  Kim cương
                </NavLink>
                <NavLink
                  to="/admin/diamond/certificate-manager"
                  className="sidebar-nav-item-group"
                  activeClassName="active"
                >
                  Chứng chỉ kim cương
                </NavLink>
                <NavLink
                  to="/admin/diamond/price/diamond-price-manager"
                  className="sidebar-nav-item-group"
                  activeClassName="active"
                >
                  Giá kim cương
                </NavLink>
                <NavLink
                  to="/admin/diamond/warranty-manager"
                  className="sidebar-nav-item-group"
                  activeClassName="active"
                >
                  Giấy bảo hành kim cương
                </NavLink>
              </CNavGroup>
              <CNavGroup toggler={<> <CIcon className="icon-nav-group" icon={cilWatch} />Trang sức</>} style={{paddingLeft: "5px"}} >
                <NavLink
                  to="/admin/jewelry/jewelry-manager"
                  className="sidebar-nav-item-group"
                  activeClassName="active"
                >
                  Trang sức
                </NavLink>
                <NavLink
                  to="/admin/jewelry/warranty-manager"
                  className="sidebar-nav-item-group"
                  activeClassName="active"
                >
                  Giấy bảo hành trang sức
                </NavLink>
                <NavLink
                  to="/admin/jewelry/price/gold-price-manager"
                  className="sidebar-nav-item-group"
                  activeClassName="active"
                >
                  Giá vàng
                </NavLink>
              </CNavGroup>
            </CNavGroup>
            <NavLink
              to="/admin/account-manager"
              className="sidebar-nav-item-manager"
              activeClassName="active"
            >
              <CIcon className="nav-icon" icon={cilPeople} /> Tài khoản
            </NavLink>
            <NavLink
              to="/admin/promotion-manager"
              className="sidebar-nav-item-manager"
              activeClassName="active"
            >
              <CIcon className="nav-icon" icon={cilTextStrike} /> Mã giảm giá
            </NavLink>
            <NavLink
              to="/admin/order-manager"
              className="sidebar-nav-item-manager"
              activeClassName="active"
            >
              <CIcon className="nav-icon" icon={cilInbox} /> Đơn hàng
            </NavLink>
          </CNavGroup>
        </CSidebarNav>
        <CSidebarHeader className="border-top" style={{ height: "50px" }}>
          <NavLink to="/" className="sidebar-nav-item" activeClassName="active">
            <CSidebarToggler style={{ marginRight: "10px"}} /> Đăng xuất
          </NavLink>
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
