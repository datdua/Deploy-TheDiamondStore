import React from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css"

function AboutPage() {
    return (
        <div>
            <div id="wrapper" className="wrapper">

                {/* Breadcrumb Area */}
                <div className="tm-breadcrumb-area tm-padding-section bg-grey" style={{ backgroundImage: `url(assets/images/breadcrumb-bg.jpg)` }}>
                    <div className="container">
                        <div className="tm-breadcrumb">
                            <h2>About Us</h2>
                            <ul>
                                <li><Link to="/home">Home</Link></li>
                                <li>About</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* //Breadcrumb Area */}

                {/* Page content */}
                <main className="page-content">
                    <div className="tm-section tm-feature-area bg-grey">
                        <div className="container">
                            <div className="row mt-30-reverse">

                                {/*Single Feature*/}
                                <div className="col-lg-4 mt-30">
                                    <div className="tm-feature">
                                        <span className="tm-feature-icon">
                                            <img src="assets/images/icons/icon-free-shipping.png" alt="free shipping" />
                                        </span>
                                        <div className="tm-feature-content">
                                            <h6>Free Shipping</h6>
                                            <p>We provide free shipping for all order over $200.00</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Single Feature */}

                                <div className="col-lg-4 mt-30">
                                    <div className="tm-feature">
                                        <span className="tm-feature-icon">
                                            <img src="assets/images/icons/icon-fast-delivery.png" alt="fast delivery" />
                                        </span>
                                        <div className="tm-feature-content">
                                            <h6>Fast Delivery</h6>
                                            <p>We always deliver our customers very quickly.</p>
                                        </div>
                                    </div>
                                </div>

                                { /*// Single Feature*/}

                                { /* Single Feature*/}

                                <div className="col-lg-4 mt-30">
                                    <div className="tm-feature">
                                        <span className="tm-feature-icon">
                                            <img src="assets/images/icons/icon-247-support.png" alt="24/7 Support" />
                                        </span>
                                        <div className="tm-feature-content">
                                            <h6>24/7 Support</h6>
                                            <p>We provide support to our customers within 24 hours. </p>
                                        </div>
                                    </div>
                                </div>

                                { /*// Single Feature*/}

                            </div>
                        </div>
                    </div>

                    {/* //Feature Area */}

                    {/* About Area */}

                    <div className="tm-about-area tm-padding-section bg-white">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="tm-about-image">
                                        <img src="assets/images/about-image.jpg" alt="about image" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="tm-about-content">
                                        <h4>WELCOME TO SUROSE STORE</h4>
                                        <h6>Lorem ipsum dolor sit amet consectetur adipisicing elitsed do
                                            eiusmod ncididunt ametfh consectetur.</h6>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quisnos trud
                                            exercitation ullamco laboris nisi ut aliquip ex ea com modo consequat. Duis aute
                                            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur.</p>
                                        <p>Excepteur sint occaecat cupidatat non proident.sunt in culpa qui officia deserunt
                                            mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incid
                                            idunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* //About Area */}

                    {/* Team Members */}
                    <div className="tm-team-members tm-padding-section bg-grey">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-12">
                                    <div className="tm-sectiontitle text-center">
                                        <h3>MEET OUR TEAM</h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed aci erat dales vitakse
                                            dalesnon estin vitae egestas.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row tm-member-slider">

                                {/* Single Team Member */}
                                <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                                    <div className="tm-member">
                                        <div className="tm-member-topside">
                                            <img src="assets/images/team-member-1.jpg" alt="team member" />
                                            <ul>
                                                <li><a href="#"><i className="ion-social-facebook"></i></a></li>
                                                <li><a href="#"><i className="ion-social-instagram-outline"></i></a></li>
                                                <li><a href="#"><i className="ion-social-skype-outline"></i></a></li>
                                                <li><a href="#"><i className="ion-social-pinterest-outline"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="tm-member-bottomside">
                                            <h6>Henry Todd</h6>
                                            <p>Founder & CEO</p>
                                        </div>
                                    </div>
                                </div>

                                {/* //Single Team Members */}

                                {/* Single Team Members */}
                                <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                                    <div className="tm-member">
                                        <div className="tm-member-topside">
                                            <img src="assets/images/team-member-2.jpg" alt="team member" />
                                            <ul>
                                                <li><a href="#"><i className="ion-social-facebook"></i></a></li>
                                                <li><a href="#"><i className="ion-social-instagram-outline"></i></a></li>
                                                <li><a href="#"><i className="ion-social-skype-outline"></i></a></li>
                                                <li><a href="#"><i className="ion-social-pinterest-outline"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="tm-member-bottomside">
                                            <h6>Jamie McGuirk</h6>
                                            <p>Managing Director</p>
                                        </div>
                                    </div>
                                </div>

                                {/* //Single Team Members */}

                                {/* Single Team Members */}

                                <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                                    <div className="tm-member">
                                        <div className="tm-member-topside">
                                            <img src="assets/images/team-member-3.jpg" alt="team member" />
                                            <ul>
                                                <li><a href="#"><i className="ion-social-facebook"></i></a></li>
                                                <li><a href="#"><i className="ion-social-instagram-outline"></i></a></li>
                                                <li><a href="#"><i className="ion-social-skype-outline"></i></a></li>
                                                <li><a href="#"><i className="ion-social-pinterest-outline"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="tm-member-bottomside">
                                            <h6>Sebastian Goudie</h6>
                                            <p>Sales Director</p>
                                        </div>
                                    </div>
                                </div>

                                {/* //Single Team Members */}

                                {/* Single Team Members */}
                                <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                                    <div className="tm-member">
                                        <div className="tm-member-topside">
                                            <img src="assets/images/team-member-4.jpg" alt="team member" />
                                            <ul>
                                                <li><a href="#"><i className="ion-social-facebook"></i></a></li>
                                                <li><a href="#"><i className="ion-social-instagram-outline"></i></a></li>
                                                <li><a href="#"><i className="ion-social-skype-outline"></i></a></li>
                                                <li><a href="#"><i className="ion-social-pinterest-outline"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="tm-member-bottomside">
                                            <h6>Bailey Beggs</h6>
                                            <p>Support Guru</p>
                                        </div>
                                    </div>
                                </div>

                                {/* //Single Team Members */}

                            </div>
                        </div>
                    </div>

                    {/* //Team Members */}

                    {/* Brand Logos */}

                    <div className="tm-section tm-brandlogo-area tm-padding-section bg-white">
                        <div className="container">
                            <div id="brandLogoCarousel" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row tm-brandlogo-slider">

                                            {/* Brand Logo Single */}

                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 tm-brandlogo">
                                                <a href="#">
                                                    <img src="assets/images/brandlogo-1.png" alt="brand-logo" />
                                                </a>
                                            </div>

                                            {/* //Brand Logo Single */}

                                            {/* Brand Logo Single */}

                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 tm-brandlogo">
                                                <a href="#">
                                                    <img src="assets/images/brandlogo-2.png" alt="brand-logo" />
                                                </a>
                                            </div>

                                            {/* //Brand Logo Single */}

                                            {/* Brand Logo Single */}

                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 tm-brandlogo">
                                                <a href="#">
                                                    <img src="assets/images/brandlogo-3.png" alt="brand-logo" />
                                                </a>
                                            </div>

                                            {/* //Brand Logo Single */}

                                            {/* Brand Logo Single */}

                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 tm-brandlogo">
                                                <a href="#">
                                                    <img src="assets/images/brandlogo-4.png" alt="brand-logo" />
                                                </a>
                                            </div>

                                            {/* //Brand Logo Single */}

                                            {/* Brand Logo Single */}

                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 tm-brandlogo">
                                                <a href="#">
                                                    <img src="assets/images/brandlogo-5.png" alt="brand-logo" />
                                                </a>
                                            </div>

                                            {/* //Brand Logo Single */}

                                            {/* Brand Logo Single */}

                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 tm-brandlogo">
                                                <a href="#">
                                                    <img src="assets/images/brandlogo-1.png" alt="brand-logo" />
                                                </a>
                                            </div>

                                            {/* //Brand Logo Single */}

                                            {/* Brand Logo Single */}

                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 tm-brandlogo">
                                                <a href="#">
                                                    <img src="assets/images/brandlogo-2.png" alt="brand-logo" />
                                                </a>
                                            </div>

                                            {/* //Brand Logo Single */}

                                            {/* Brand Logo Single */}

                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 tm-brandlogo">
                                                <a href="#">
                                                    <img src="assets/images/brandlogo-3.png" alt="brand-logo" />
                                                </a>
                                            </div>

                                            {/* //Brand Logo Single */}

                                            {/* Brand Logo Single */}

                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 tm-brandlogo">
                                                <a href="#">
                                                    <img src="assets/images/brandlogo-4.png" alt="brand-logo" />
                                                </a>
                                            </div>

                                            {/* //Brand Logo Single */}

                                            {/* Brand Logo Single */}

                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 tm-brandlogo">
                                                <a href="#">
                                                    <img src="assets/images/brandlogo-5.png" alt="brand-logo" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#brandLogoCarousel" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#brandLogoCarousel" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* //Brand Logos */}

                </main>

                {/* //Page Content */}
            </div >
        </div >
    );
}
export default AboutPage;
