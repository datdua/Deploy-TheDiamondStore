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
  cilAddressBook,
  cilStrikethrough,
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
          />
          <CSidebarBrand> THE DIAMOND STORE </CSidebarBrand>
        </CSidebarHeader>
        <CSidebarNav>
          <CNavTitle style={{ marginTop: "0", fontSize: "15px" }}>
            MENU
          </CNavTitle>

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
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/transaction-manager"
            className="sidebar-nav-item"
            activeClassName="active"
          >
            <CIcon customClassName="nav-icon" icon={cilBank} />
            Quản Lý Giao Dịch
          </NavLink>
          <CNavGroup
            toggler={
              <>
                <CIcon
                  className="sidebar-nav-item"
                  customClassName="nav-icon"
                  icon={cilPuzzle}
                />{" "}
                Quản lý
              </>
            }
          >
            <CNavGroup toggler={<>Sản phẩm</>}>
              <CNavGroup
                toggler={
                  <>
                    <span className="nav-icon">
                      <span className="nav-icon-bullet"></span>
                    </span>{" "}
                    Kim cương
                  </>
                }
              >
                <NavLink
                  to="/admin/diamond/diamond-manager"
                  className="sidebar-nav-item"
                  activeClassName="active"
                >
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>{" "}
                  Kim cương
                </NavLink>
                <NavLink
                  to="/admin/diamond/certificate-manager"
                  className="sidebar-nav-item"
                  activeClassName="active"
                >
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>{" "}
                  Chứng chỉ kim cương
                </NavLink>
                <NavLink
                  to="/admin/diamond/price/diamond-price-manager"
                  className="sidebar-nav-item"
                  activeClassName="active"
                >
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>{" "}
                  Giá kim cương
                </NavLink>
                <NavLink
                  to="/admin/diamond/warranty-manager"
                  className="sidebar-nav-item"
                  activeClassName="active"
                >
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>{" "}
                  Giấy bảo hành kim cương
                </NavLink>
              </CNavGroup>
              <CNavGroup
                toggler={
                  <>
                    <span className="nav-icon">
                      <span className="nav-icon-bullet"></span>
                    </span>{" "}
                    Trang sức
                  </>
                }
              >
                <NavLink
                  to="/admin/jewelry/jewelry-manager"
                  className="sidebar-nav-item"
                  activeClassName="active"
                >
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>{" "}
                  Trang sức
                </NavLink>
                <NavLink
                  to="/admin/jewelry/warranty-manager"
                  className="sidebar-nav-item"
                  activeClassName="active"
                >
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>{" "}
                  Giấy bảo hành trang sức
                </NavLink>
                <NavLink
                  to="/admin/jewelry/price/gold-price-manager"
                  className="sidebar-nav-item"
                  activeClassName="active"
                >
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>{" "}
                  Giá vàng
                </NavLink>
              </CNavGroup>
            </CNavGroup>
            <NavLink
              to="/admin/account-manager"
              className="sidebar-nav-item"
              activeClassName="active"
            >
              <CIcon customClassName="nav-icon" icon={cilAddressBook} />
              Tài khoản
            </NavLink>
            <NavLink
              to="/admin/promotion-manager"
              className="sidebar-nav-item"
              activeClassName="active"
            >
              <CIcon customClassName="nav-icon" icon={cilStrikethrough} />
              Mã Giảm Giá
            </NavLink>
            <NavLink
              to="/admin/order-manager"
              className="sidebar-nav-item"
              activeClassName="active"
            >
              <CIcon className="nav-icon" icon={cilCart} />
              Đơn hàng
            </NavLink>
          </CNavGroup>
        </CSidebarNav>
        <CSidebarHeader className="border-top">
          <NavLink to="/" className="sidebar-nav-item" activeClassName="active">
            <CSidebarToggler style={{ marginRight: "10px" }} /> Đăng xuất
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
