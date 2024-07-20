import React, { useContext } from "react";
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavTitle,
    CNavGroup,
    CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { NavLink, Outlet } from "react-router-dom";
import {
    cilPuzzle,
    cilUser,
    cilBank,
    cilInbox,
    cilPeople,
    cilTextStrike,
    cilDiamond,
    cilWatch
} from "@coreui/icons";
import { AuthContext } from "../Auth/AuthContext";
import "../../components/Sidebar/SidebarAdmin.css";

function SideBarAdmin() {
    const { onLogout } = useContext(AuthContext);
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
                    <CNavTitle style={{ marginTop: "0", fontSize: "15px" }}>MANAGER</CNavTitle>

                    <NavLink
                        to="/manager/profile"
                        className="sidebar-nav-item"
                        activeClassName="active"
                    >
                        <CIcon className="nav-icon" icon={cilUser} /> Thông tin cá nhân
                    </NavLink>

                    <NavLink
                        to="/manager/transaction-manager"
                        className="sidebar-nav-item"
                        activeClassName="active"
                    >
                        <CIcon className="nav-icon" icon={cilBank} /> Quản lý giao dịch
                    </NavLink>

                    <NavLink
                        to="/manager/order-manager"
                        className="sidebar-nav-item"
                        activeClassName="active"
                    >
                        <CIcon className="nav-icon" icon={cilInbox} /> Đơn hàng
                    </NavLink>

                    <CNavGroup
                        toggler={
                            <>
                                <CIcon className="nav-icon" icon={cilPuzzle} /> Quản lý
                            </>
                        }
                    >
                        <CNavGroup toggler={<>Sản phẩm</>}>
                            <CNavGroup toggler={<> <CIcon className="icon-nav-group" icon={cilDiamond} />Kim cương</>} style={{ paddingLeft: "5px" }}>
                                <NavLink
                                    to="/manager/diamond/diamond-manager"
                                    className="sidebar-nav-item-group"
                                    activeClassName="active"
                                >
                                    Kim cương
                                </NavLink>
                                <NavLink
                                    to="/manager/diamond/certificate-manager"
                                    className="sidebar-nav-item-group"
                                    activeClassName="active"
                                >
                                    Chứng chỉ kim cương
                                </NavLink>
                                <NavLink
                                    to="/manager/diamond/price/diamond-price-manager"
                                    className="sidebar-nav-item-group"
                                    activeClassName="active"
                                >
                                    Giá kim cương
                                </NavLink>
                                <NavLink
                                    to="/manager/diamond/warranty-manager"
                                    className="sidebar-nav-item-group"
                                    activeClassName="active"
                                >
                                    Giấy bảo hành kim cương
                                </NavLink>
                            </CNavGroup>
                            <CNavGroup toggler={<> <CIcon className="icon-nav-group" icon={cilWatch} />Trang sức</>} style={{ paddingLeft: "5px" }} >
                                <NavLink
                                    to="/manager/jewelry/jewelry-manager"
                                    className="sidebar-nav-item-group"
                                    activeClassName="active"
                                >
                                    Trang sức
                                </NavLink>
                                <NavLink
                                    to="/manager/jewelry/warranty-manager"
                                    className="sidebar-nav-item-group"
                                    activeClassName="active"
                                >
                                    Giấy bảo hành trang sức
                                </NavLink>
                                <NavLink
                                    to="/manager/jewelry/price/gold-price-manager"
                                    className="sidebar-nav-item-group"
                                    activeClassName="active"
                                >
                                    Giá vàng
                                </NavLink>
                            </CNavGroup>
                        </CNavGroup>
                        <NavLink
                            to="/manager/account-manager"
                            className="sidebar-nav-item-manager"
                            activeClassName="active"
                        >
                            <CIcon className="nav-icon" icon={cilPeople} /> Tài khoản
                        </NavLink>
                        <NavLink
                            to="/manager/promotion-manager"
                            className="sidebar-nav-item-manager"
                            activeClassName="active"
                        >
                            <CIcon className="nav-icon" icon={cilTextStrike} /> Mã giảm giá
                        </NavLink>
                    </CNavGroup>
                </CSidebarNav>
                <CSidebarHeader onClick={onLogout} className="border-top" style={{ height: "50px" }}>
                    <div className="sidebar-nav-item">
                        <CSidebarToggler style={{ marginRight: "10px" }} /> Đăng xuất
                    </div>
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
