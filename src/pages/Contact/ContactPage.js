import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ContactPage.css";

function ContactPage() {
    return (
        <div>
            {/* <!-- Wrapper --> */}
            <div id="wrapper" className="wrapper">
                {/* <!-- Header --> */}
                {/* <!--// Header --> */}
                {/* <!-- Breadcrumb Area --> */}
                <div className="tm-breadcrumb-area tm-padding-section bg-grey" style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fimg-banner-nhan2.png?alt=media&token=5dba9bcc-dfe4-466e-be5a-d9a7c9f1c0b3)` }}>
                    <div className="container">
                        <div className="tm-breadcrumb">
                            <h2>Liên Hệ</h2>
                            <ul className="add-back">
                                <li>
                                    <Link to="/trangchu">Trang chủ</Link>
                                </li>
                                <li>Liên hệ</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <!--// Breadcrumb Area --> */}
                {/* <!-- Page Content --> */}
                <main className="page-content">
                    {/* <!-- Contact Area --> */}
                    <div className="tm-section tm-contact-area bg-white" style={{paddingBottom: '20px'}}>
                        <div className="container">
                            <div className="tm-contact-blocks">
                                <div className="row mt-30-reverse justify-content-center">
                                    {/* <!-- Contact block --> */}
                                    <div className="col-lg-4 col-md-6 mt-30">
                                        <div className="tm-contact-block text-center">
                                            <i className="ion-android-call"></i>
                                            <h6>Hotline</h6>
                                            <p>Số điện thoại: <a href="tel:+0905558630">09 0555 8630</a></p>
                                            <p>Fax: <a href="tel:+02873005588">02 873 005 588</a></p>
                                        </div>
                                    </div>
                                    {/* <!--// Contact block --> */}

                                    {/* <!-- Contact block --> */}
                                    <div className="col-lg-4 col-md-6 mt-30">
                                        <div className="tm-contact-block text-center">
                                            <i className="ion-location"></i>
                                            <h6>Vị trí</h6>
                                            <p>Lô E2a-7, Đường D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh</p>
                                        </div>
                                    </div>
                                    {/* <!--// Contact block --> */}

                                    {/* <!-- Contact block --> */}
                                    <div className="col-lg-4 col-md-6 mt-30">
                                        <div className="tm-contact-block text-center">
                                            <i className="ion-email"></i>
                                            <h6>Email</h6>
                                            <p><a href="mailto:thediamondstore.info24@gmail.com">thediamondstore.info24@gmail.com</a></p>
                                            <p><a href="mailto:info@surose.com">info24@thediamondstore.com</a></p>
                                        </div>
                                    </div>
                                    {/* <!--// Contact block --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--// Contact Area --> */}  
                    <div id="google-map" className="google-map mt-20-reverse text-center">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415305157!2d106.80730807573657!3d10.841132857995461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1720273434671!5m2!1svi!2s" width={1175} height={500} style={{border: 0, paddingBottom:'30px'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                </main>
                {/* <!--// Page Content --> */}
                {/* <!-- Footer --> */}
                {/* <!--// Footer --> */}
                <button id="back-top-top"><i className="ion-arrow-up-c"></i></button>
            </div>
            {/* <!--// Wrapper --> */}
        </div>
    );
}

export default ContactPage;
