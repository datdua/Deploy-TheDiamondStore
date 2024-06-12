import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"

function Footer(){
    return(
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
                            <a className="widget-info-logo" href="/trangchu"><img src="assets/images/logo-minisize.png"
                                alt="logo" /></a>
                            <p>Cửa hàng bán kim cương và trang sức</p>
                            <ul>
                                <li><b>Địa chỉ :</b>Lô E2a-7, Đường D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh</li>
                                <li><b>SĐT :</b><a href="tel:02873005588">02873005588</a></li>
                                <li><b>Email :</b><a href="mailto:thediamondstore.info@gmail.com">thediamondstore.info@gmail.com</a></li>
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
                                <li><Link to="/kienthuc">Kiến Thức Kim Cương</Link></li>
                                <li><Link to="/lienhe">Liên Hệ</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* //Single Widget */}

                    {/* Single Widget */}

                    <div className="col-lg-4 col-md-7 col-12">
                        <div className="single-widget widget-quicklinks">
                            <h6 className="widget-title">Tài Khoản Của Tôi</h6>
                            <ul>
                                <li><Link to="/giohang">Giỏ Hàng</Link></li>
                                <li><Link to="/thanhtoan">Thanh Toán</Link></li>
                                <li><Link to="/dangxuat">Đăng Xuất</Link></li>

                            </ul>
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