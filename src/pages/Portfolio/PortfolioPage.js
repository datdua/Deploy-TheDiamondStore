import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./PortfolioPage.css"
function PortfolioPage() {
    return (
        <div>
            {/* <!-- Preloader --> 
            <div className="tm-preloader">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="tm-preloader-logo">
                                <img src="assets/images/logo.png" alt="logo"/>
                            </div>
                            <span className="tm-preloader-progress"></span>
                        </div>
                    </div>
                </div>
                <button className="tm-button tm-button-small">Cancel Preloader</button>
            </div>
            {/* <!--// Preloader -->

            <!-- Wrapper --> */}
            <div id="wrapper" className="wrapper">

                {/* <!-- Header --> */}
                <Header/>
                {/* <!--// Header --> 

                <!-- Breadcrumb Area --> */}
                <div className="tm-breadcrumb-area tm-padding-section bg-grey" style={{backgroundImage:`url(assets/images/breadcrumb-bg.jpg)`}}>
                    <div className="container">
                        <div className="tm-breadcrumb">
                            <h2>Portfolios</h2>
                            <ul>
                                <li><Link to="/home">Home</Link></li>
                                <li>Portfolios</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <!--// Breadcrumb Area -->

                <!-- Page Content --> */}
                <main className="page-content">

                    {/* <!-- Portfolios Area --> */}
                    <div className="tm-section tm-portfolios-area tm-padding-section bg-white">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="tm-portfolio-filters text-center">
                                        <button data-filter="*" className="is-active">All</button>
                                        <button data-filter=".portfolio-cat-jewellery">Jewellery</button>
                                        <button data-filter=".portfolio-cat-earrings">Earrings</button>
                                        <button data-filter=".portfolio-cat-nacklace">Nacklace</button>
                                        <button data-filter=".portfolio-cat-bracelet">Bracelet</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row tm-portfolio-wrapper mt-30-reverse">

                                {/* <!-- Single Portfolio --> */}
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 tm-portfolio-item portfolio-cat-jewellery mt-30">
                                    <a href="assets/images/portfolios/portfolio-image-1-lg.jpg" className="tm-portfolio"
                                        data-fancybox="portfolio-gallery" data-caption="Self makeup at home">
                                        <img src="assets/images/portfolios/portfolio-image-1.jpg" alt="portfolio image"/>
                                    </a>
                                </div>
                                {/* <!--// Single Portfolio -->

                                <!-- Single Portfolio --> */}
                                <div
                                    className="col-lg-4 col-md-6 col-sm-6 col-12 tm-portfolio-item portfolio-cat-earrings portfolio-cat-nacklace mt-30">
                                    <a href="assets/images/portfolios/portfolio-image-2-lg.jpg" className="tm-portfolio"
                                        data-fancybox="portfolio-gallery" data-caption="Self makeup at home">
                                        <img src="assets/images/portfolios/portfolio-image-2.jpg" alt="portfolio image"/>
                                    </a>
                                </div>
                                {/* <!--// Single Portfolio -->

                                <!-- Single Portfolio --> */}
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 tm-portfolio-item portfolio-cat-jewellery mt-30">
                                    <a href="assets/images/portfolios/portfolio-image-3-lg.jpg" className="tm-portfolio"
                                        data-fancybox="portfolio-gallery" data-caption="Self makeup at home">
                                        <img src="assets/images/portfolios/portfolio-image-3.jpg" alt="portfolio image"/>
                                    </a>
                                </div>
                                {/* <!--// Single Portfolio -->

                                <!-- Single Portfolio --> */}
                                <div
                                    className="col-lg-4 col-md-6 col-sm-6 col-12 tm-portfolio-item portfolio-cat-jewellery portfolio-cat-nacklace mt-30">
                                    <a href="assets/images/portfolios/portfolio-image-4-lg.jpg" className="tm-portfolio"
                                        data-fancybox="portfolio-gallery" data-caption="Self makeup at home">
                                        <img src="assets/images/portfolios/portfolio-image-4.jpg" alt="portfolio image"/>
                                    </a>
                                </div>
                                {/* <!--// Single Portfolio -->

                                <!-- Single Portfolio --> */}
                                <div
                                    className="col-lg-4 col-md-6 col-sm-6 col-12 tm-portfolio-item portfolio-cat-earrings portfolio-cat-bracelet mt-30">
                                    <a href="assets/images/portfolios/portfolio-image-6-lg.jpg" className="tm-portfolio"
                                        data-fancybox="portfolio-gallery" data-caption="Self makeup at home">
                                        <img src="assets/images/portfolios/portfolio-image-6.jpg" alt="portfolio image"/>
                                    </a>
                                </div>
                                {/* <!--// Single Portfolio -->

                                <!-- Single Portfolio --> */}
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 tm-portfolio-item portfolio-cat-jewellery mt-30">
                                    <a href="assets/images/portfolios/portfolio-image-5-lg.jpg" className="tm-portfolio"
                                        data-fancybox="portfolio-gallery" data-caption="Self makeup at home">
                                        <img src="assets/images/portfolios/portfolio-image-5.jpg" alt="portfolio image"/>
                                    </a>
                                </div>
                                {/* <!--// Single Portfolio -->

                                <!-- Single Portfolio --> */}
                                <div
                                    className="col-lg-4 col-md-6 col-sm-6 col-12 tm-portfolio-item portfolio-cat-nacklace portfolio-cat-bracelet mt-30">
                                    <a href="assets/images/portfolios/portfolio-image-8-lg.jpg" className="tm-portfolio"
                                        data-fancybox="portfolio-gallery" data-caption="Self makeup at home">
                                        <img src="assets/images/portfolios/portfolio-image-8.jpg" alt="portfolio image"/>
                                    </a>
                                </div>
                                {/* <!--// Single Portfolio -->

                                <!-- Single Portfolio --> */}
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 tm-portfolio-item portfolio-cat-jewellery mt-30">
                                    <a href="assets/images/portfolios/portfolio-image-7-lg.jpg" className="tm-portfolio"
                                        data-fancybox="portfolio-gallery" data-caption="Self makeup at home">
                                        <img src="assets/images/portfolios/portfolio-image-7.jpg" alt="portfolio image"/>
                                    </a>
                                </div>
                                {/* <!--// Single Portfolio -->

                                <!-- Single Portfolio --> */}
                                <div
                                    className="col-lg-4 col-md-6 col-sm-6 col-12 tm-portfolio-item portfolio-cat-earrings portfolio-cat-bracelet mt-30">
                                    <a href="assets/images/portfolios/portfolio-image-9-lg.jpg" className="tm-portfolio"
                                        data-fancybox="portfolio-gallery" data-caption="Self makeup at home">
                                        <img src="assets/images/portfolios/portfolio-image-9.jpg" alt="portfolio image"/>
                                    </a>
                                </div>
                                {/* <!--// Single Portfolio --> */}

                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="tm-portfolio-loadmore text-center mt-50">
                                        <button className="tm-button">Load more</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--// Portfolios Area --> */}

                </main>
                {/* <!--// Page Content -->

                <!-- Footer --> */}
                <Footer/>
                {/* <!--// Footer --> */}

                <button id="back-top-top"><i className="ion-arrow-up-c"></i></button>

            </div>
            {/* <!--// Wrapper --> */}
        </div>
    )
}
export default PortfolioPage;