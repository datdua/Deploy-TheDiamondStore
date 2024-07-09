import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Footer.css"
import { AuthContext } from "../Auth/AuthContext";
import { getAccountIDByEmail } from "../../api/accountCrud";

function Footer() {
    const { isLoggedIn, onLogout } = useContext(AuthContext);
    const navigate = useNavigate();
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
    return (
        /* Footer */

        <div className="tm-footer">

            {/* Instagram Photos */}

            <ul id="instafeed" className="tm-instaphotos"></ul>

            {/* //Instagram Photos */}

            {/* Footer Top Area */}


            <div className="tm-footer-toparea tm-padding-section tm-footer-bottomarea">
                <div className="container">
                    <div className="widgets widgets-footer row">

                        {/* Single Widget */}

                        <div className="col-lg-4 col-md-7 col-12">
                            <div className="single-widget widget-info">
                                <a className="widget-info-logo" href="/trangchu"><img src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-logo%2Flogo.png?alt=media&token=64cf8af5-a8ac-42be-9983-88c3935af287"
                                    alt="logo" /></a>
                                <p>Cửa hàng bán kim cương và trang sức</p>
                                <ul>
                                    <li><b>Địa chỉ :</b>Lô E2a-7, Đường D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh</li>
                                    <li><b>SĐT :</b><a href="tel:0912051433">0912051433</a></li>
                                    <li><b>Email :</b><a href="mailto:thediamondstore.info24@gmail.com">thediamondstore.info24@gmail.com</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* //Single Widget */}

                        <div className="col-lg-4 col-md-7 col-12">
                            <div className="single-widget widget-quicklinks">
                                <h6 className="widget-title">Lối Tắt</h6>
                                <ul>
                                    <li><Link to="/gioithieu">Giới Thiệu</Link></li>
                                    <li><Link to="/sanpham">Sản Phẩm</Link></li>
                                    <li><Link to="/banggia">Bảng Giá</Link></li>
                                    <li><Link to="/kienthuckimcuong">Kiến Thức Kim Cương</Link></li>
                                    <li><Link to="/lienhe">Liên Hệ</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* //Single Widget */}

                        {/* Single Widget */}

                        <div className="col-lg-4 col-md-7 col-12">
                            <div className="single-widget widget-quicklinks">
                                <h6 className="widget-title">Tài Khoản Của Tôi</h6>
                                {isLoggedIn ? (
                                    <ul>
                                        <li><Link onClick={handleCartClick}>Giỏ Hàng</Link></li>
                                        <li><Link onClick={handleAccountClick}>Tài Khoản</Link></li>
                                        <li><Link onClick={onLogout}>Đăng Xuất</Link></li>
                                    </ul>
                                ) : (
                                        <ul>
                                            <li><Link to="/dangnhap">Đăng Nhập/Đăng Ký</Link></li>
                                        </ul>
                                )}
                            </div>
                        </div>

                        {/* Single Widget */}
                        {/* Single Widget */}

                    </div>
                </div>
            </div>

            {/* //Footer Top Area */}

        </div>

        /* Footer */
    )
}
export default Footer