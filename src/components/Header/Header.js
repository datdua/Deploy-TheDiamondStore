import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { searchProductionByName } from "../../api/ProductAPI";
import { AuthContext } from "../Auth/AuthContext";
import { toast } from "react-toastify";
import { getAccountIDByEmail } from "../../api/accountCrud";
import { Button } from "@mui/material";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';

function Header() {
  const { isLoggedIn, accountName, onLogout } = useContext(AuthContext);
  const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const accountId = localStorage.getItem('accountID');

  const toggleDropdown = () => {
    setAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleCartClick = async () => {
    const email = localStorage.getItem("email");
    const accountId = await getAccountIDByEmail(email);
    if (accountId) {
      navigate(`/cart/${accountId}`);
    } else {
      navigate('/dangnhap');
    }
  };

  const handleAccountClick = async () => {
    const email = localStorage.getItem("email");
    const accountId = await getAccountIDByEmail(email);
    if (accountId) {
      navigate(`/account/${accountId}`);
    } else {
      navigate('/login');
    }
  };

  const handleSearch = async () => {
    try {
      const productResults = await searchProductionByName(searchTerm);
      if (productResults.length === 0) {
        toast.error("Không tìm thấy sản phẩm nào");
      } else {
        // Navigate to the search results page
        navigate('/sanpham', { state: { results: productResults } });
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tìm kiếm sản phẩm");
    }
  };

  return (
    <>
      <div className="tm-header tm-header-sticky">
        <div className="tm-header-toparea bg-black">
          <div className="container">
            <div className="row justify-between items-center">
              <div className="col-lg-6 col-12">
                <ul className="tm-header-info">
                  <li><a href="tel:18883456789"><i className="ion-ios-telephone"></i>0912051433</a></li>
                  <li><a href="mailto:thediamondstore.info24@gmail.com"><i className="ion-android-mail"></i>thediamondstore.info24@gmail.com</a></li>
                  {accountName && <li>Welcome, {accountName}!</li>}
                </ul>
              </div>
              <div className="col-lg-6 col-12">
                <div className="tm-header-options">
                  {isLoggedIn ? (
                    <div className="flex">
                      <Button onClick={handleAccountClick} className="tm-header-links">
                        <AccountCircleSharpIcon /> Tài Khoản
                      </Button>
                      <Button onClick={handleCartClick} className="tm-header-links">
                        <ShoppingCartSharpIcon /> Giỏ Hàng
                      </Button>
                      <Button onClick={onLogout} className="tm-logout-button">
                        <LogoutSharpIcon /> Đăng xuất
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => navigate('/dangnhap')} className="tm-login-button d-flex justify-content-center align-items-center" style={{marginLeft:"11rem"}}>
                      <LoginSharpIcon /> Đăng nhập/Đăng ký
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tm-header-middlearea bg-white">
          <div className="container">
            <div className="tm-mobilenav"></div>
            <div className="row align-items-center">
              <div className="col-lg-3 col-6 order-1 order-lg-1">
                <a href="/trangchu" className="tm-header-logo">
                  <img style={{ width: "220px" }} src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-logo%2Flogo.png?alt=media&token=64cf8af5-a8ac-42be-9983-88c3935af287" alt="thediamondstore" />
                </a>
              </div>
              <div className="col-lg-6 col-12 order-3 order-lg-2">
                <form className="tm-header-search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm kim cương viên hoặc trang sức..."
                  />
                  <button aria-label="Search" type="submit"><i className="ion-android-search"></i></button>
                </form>
              </div>
              <div className="col-lg-3 col-6 order-2 order-lg-3">
                <ul className="tm-header-icons">
                  <li><Link to="#"><i className="ion-android-favorite-outline"></i><span>0</span></Link></li>
                  {isLoggedIn ? (
                    <li><Link onClick={handleCartClick}><i className="ion-bag"></i><span>0</span></Link></li>
                  ) : (
                    <li><i className="ion-bag" style={{ opacity: 0.5 }} title="Please log in to access the cart"></i><span>0</span></li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="tm-header-bottomarea bg-white">
          <div className="container">
            <nav className="tm-header-nav">
              <ul>
                <li><Link to="/trangchu">Trang Chủ</Link></li>
                <li><Link to="/gioithieu">Giới Thiệu</Link></li>
                <li style={{ marginRight: '5px' }}><Link to="/sanpham">Sản Phẩm</Link></li>
                <li style={{ margin: '0px' }}>
                  <NavDropdown className="drop-hover" id="collapsible-nav-dropdown">
                    <NavDropdown.Item style={{ textAlign: 'center' }} href="/kimcuong">Kim Cương</NavDropdown.Item>
                    <NavDropdown.Item style={{ textAlign: 'center' }} href="/trangsuc">
                      Trang Sức
                    </NavDropdown.Item>
                  </NavDropdown>
                </li>
                <li><Link to="/banggia">Bảng Giá</Link></li>
                <li><Link to="/kienthuckimcuong">Kiến Thức Kim Cương</Link></li>
                <li><Link to="/lienhe">Liên Hệ</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
