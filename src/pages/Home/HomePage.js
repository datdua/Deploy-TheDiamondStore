import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "fancybox/dist/css/jquery.fancybox.css"
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import "./HomePage.css"
import { toast } from "react-toastify";

function HomePage() {
    const [value, setValue] = useState('Default value');
    const token = localStorage.getItem('jwt')
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const [isCurrencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

    const toggleAccountDropdown = () => {
        setAccountDropdownOpen(!isAccountDropdownOpen);
        setCurrencyDropdownOpen(false);
        setLanguageDropdownOpen(false);
    };

    const toggleCurrencyDropdown = () => {
        setCurrencyDropdownOpen(!isCurrencyDropdownOpen);
        setAccountDropdownOpen(false);
        setLanguageDropdownOpen(false);
    };

    const toggleLanguageDropdown = () => {
        setLanguageDropdownOpen(!isLanguageDropdownOpen);
        setAccountDropdownOpen(false);
        setCurrencyDropdownOpen(false);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log('Token:', token)
    
    return (
        <div>

            {/* <!-- Preloader --> 
            <div className="tm-preloader">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="tm-preloader-logo">
                                <img src="assets/images/logo.png" alt="logo" />
                            </div>
                            <span className="tm-preloader-progress"></span>
                        </div>
                    </div>
                </div>
                <button className="tm-button tm-button-small">Cancel Preloader</button>
            </div>
            /* <!--// Preloader -->
    <!-- Wrapper --> */}
            <div id="wrapper" className="wrapper">

                {/* <!-- Heroslider Area --> */}
                
                        <HeroSlider/>
                
                {/* <!--// Heroslider Area --> 
        <!-- Page Content --> */}
                <main className="page-content">
                    <div id="tm-popular-products-area" className="tm-section tm-popular-products-area tm-padding-section bg-white">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-12">
                                    <div className="tm-sectiontitle text-center">
                                        <h3>BỘ SƯU TẬP</h3>
                                        <p>Tổng hợp các bộ sưu tập mới và hot đến từ The Diamond Store</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row tm-products-slider">

                                {/* <!-- Single Product --> */}
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-1.jpg" alt="product image" />
                                                <img src="assets/images/products/product-image-2.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-new">New</span>
                                                <span className="tm-product-badges-sale">Sale</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><a href="/product">Stylist daimond
                                                earring</a></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-3.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-sale">Sale</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><a href="/product">Stylist daimond
                                                earring</a></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-4.jpg" alt="product image" />
                                                <img src="assets/images/products/product-image-5.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-soldout">Sold out</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-6.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-new">New</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-7.jpg" alt="product image" />
                                                <img src="assets/images/products/product-image-8.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-new">New</span>
                                                <span className="tm-product-badges-sale">Sale</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-9.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-sale">Sale</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-10.jpg" alt="product image" />
                                                <img src="assets/images/products/product-image-1.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-soldout">Sold out</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-12.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-new">New</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product --> */}

                            </div>
                        </div>
                    </div>
                    {/* <!--// Popular Products Area -->

            <!-- Banners Area --> */}
                    <div className="tm-section tm-banners-area">
                        <div className="container">
                            <div className="row mt-30-reverse">

                                {/* <!-- Single Banner --> */}
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-30">
                                    <a href="#" className="tm-banner ">
                                        <img src="assets/images/banner-image-1.jpg" alt="banner image" />
                                    </a>
                                </div>
                                {/* <!--// Single Banner -->

                        <!-- Single Banner --> */}
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-30">
                                    <a href="#" className="tm-banner ">
                                        <img src="assets/images/banner-image-2.jpg" alt="banner image" />
                                    </a>
                                </div>
                                {/* <!--// Single Banner -->

                        <!-- Single Banner --> */}
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-30">
                                    <a href="#" className="tm-banner ">
                                        <img src="assets/images/banner-image-3.jpg" alt="banner image" />
                                    </a>
                                </div>
                                {/* <!--// Single Banner --> */}

                            </div>
                        </div>
                    </div>
                    {/* <!--// Banners Area -->

            <!-- Popular Products Area --> */}
                    <div id="tm-latest-products-area" className="tm-section tm-latest-products-area tm-padding-section bg-white">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-12">
                                    <div className="tm-sectiontitle text-center">
                                        <h3>SẢN PHẨM NỔI BẬT</h3>
                                        <p>Các sản phẩm được đánh giá cao và đạt top số lượt mua trong các tháng qua</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-50-reverse">

                                {/* <!-- Single Product --> */}
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-50">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-4.jpg" alt="product image" />
                                                <img src="assets/images/products/product-image-5.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-new">New</span>
                                                <span className="tm-product-badges-sale">Sale</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-50">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-6.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-new">New</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-50">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-7.jpg" alt="product image" />
                                                <img src="assets/images/products/product-image-8.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-new">New</span>
                                                <span className="tm-product-badges-soldout">Sold out</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-50">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-9.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-new">New</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-50">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-10.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-new">New</span>
                                                <span className="tm-product-badges-sale">Sale</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-50">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-11.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-sale">Sale</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-50">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-12.jpg" alt="product image" />
                                                <img src="assets/images/products/product-image-1.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product -->

                        <!-- Single Product --> */}
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-50">
                                    <div className="tm-product ">
                                        <div className="tm-product-topside">
                                            <div className="tm-product-images">
                                                <img src="assets/images/products/product-image-2.jpg" alt="product image" />
                                            </div>
                                            <ul className="tm-product-actions">
                                                <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                </li>
                                                <li><a href="#"><i className="ion-heart"></i></a></li>
                                            </ul>
                                            <div className="tm-product-badges">
                                                <span className="tm-product-badges-new">New</span>
                                            </div>
                                        </div>
                                        <div className="tm-product-bottomside">
                                            <h6 className="tm-product-title"><Link to="/product">Stylist daimond
                                                earring</Link></h6>
                                            <div className="tm-ratingbox">
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                <span><i className="ion-android-star-outline"></i></span>
                                            </div>
                                            <span className="tm-product-price">$29.99</span>
                                            <div className="tm-product-content">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                    Lorem
                                                    Ipsum has been the industry's standard dummy text ever since the
                                                    when an unknown printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries, but also the
                                                    leap into electronic typesetting.</p>
                                                <ul className="tm-product-actions">
                                                    <li><a href="#"><i className="ion-android-cart"></i> Add to cart</a></li>
                                                    <li><button data-fancybox="true" data-src="#tm-product-quickview" aria-label="Product Quickview"><i className="ion-eye"></i></button>
                                                    </li>
                                                    <li><a href="#"><i className="ion-heart"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Single Product --> */}

                            </div>
                            <div className="tm-product-loadmore text-center mt-50">
                                <a href="/sanpham" className="tm-button">Tất Cả Sản Phẩm</a>
                            </div>
                        </div>
                    </div>
                    {/* <!--// Popular Products Area -->

            <!-- Offer Area --> */}
                    <div className="tm-section tm-offer-area tm-padding-section bg-grey">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-12 order-2 order-lg-1">
                                    <div className="tm-offer-content">
                                        <h6>Siêu đại tiệc voucher</h6>
                                        <h1>Nhanh tay mua hàng để nhận được <span>Voucher</span> siêu to khổng lồ</h1>
                                        <div className="tm-countdown" data-countdown="2020/10/12"></div>
                                        <a href="/sanpham" className="tm-button">Mua ngay</a>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12 order-1 order-lg-2">
                                    <div className="tm-offer-image">
                                        <img className="tm-offer" src="assets/images/voucher.png" alt="voucher"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--// Offer Area -->

            <!-- Latest Blogs Area --> 
                    <div id="tm-news-area" className="tm-section tm-blog-area tm-padding-section bg-pattern-transparent">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-12">
                                    <div className="tm-sectiontitle text-center">
                                        <h3>LATEST BLOGS</h3>
                                        <p>A blog is a discussion or informational website published on the World Wide Web
                                            consisting of discrete</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row tm-blog-slider">

                                {/* <!-- Blog Single Item --> 
                                <div className="col-lg-4 col-md-6">
                                    <div className="tm-blog ">
                                        <div className="tm-blog-topside">
                                            <div className="tm-blog-thumb">
                                                <img src="assets/images/blog/blog-image-1.jpg" alt="blog image" />
                                            </div>
                                            <span className="tm-blog-metahighlight"><span>Apr</span>17</span>
                                        </div>
                                        <div className="tm-blog-content">
                                            <h6 className="tm-blog-title"><a href="blog-details.html">Woman wearing gold-colore ring
                                                pendant necklaces</a></h6>
                                            <ul className="tm-blog-meta">
                                                <li><a href="blog.html"><i className="ion-android-person"></i> Anderson</a></li>
                                                <li><a href="blog-details.html"><i className="ion-chatbubbles"></i> 3 Comments</a>
                                                </li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                incdidunt ut labore et dolore magna aliqua [....]</p>
                                            <a href="blog-details.html" className="tm-readmore">Read more</a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Blog Single Item -->

                        <!-- Blog Single Item --> 
                                <div className="col-lg-4 col-md-6">
                                    <div className="tm-blog ">
                                        <div className="tm-blog-topside">
                                            <div className="tm-blog-thumb">
                                                <img src="assets/images/blog/blog-image-2.jpg" alt="blog image" />
                                            </div>
                                            <span className="tm-blog-metahighlight"><span>Apr</span>17</span>
                                        </div>
                                        <div className="tm-blog-content">
                                            <h6 className="tm-blog-title"><a href="blog-details.html">Shallow focus photo of person
                                                putting gold-colored ring</a></h6>
                                            <ul className="tm-blog-meta">
                                                <li><a href="blog.html"><i className="ion-android-person"></i> Anderson</a></li>
                                                <li><a href="blog-details.html"><i className="ion-chatbubbles"></i> 3 Comments</a>
                                                </li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                incdidunt ut labore et dolore magna aliqua [....]</p>
                                            <a href="blog-details.html" className="tm-readmore">Read more</a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Blog Single Item -->

                        <!-- Blog Single Item --> 
                                <div className="col-lg-4 col-md-6">
                                    <div className="tm-blog ">
                                        <div className="tm-blog-topside">
                                            <div className="tm-blog-thumb">
                                                <img src="assets/images/blog/blog-image-3.jpg" alt="blog image" />
                                            </div>
                                            <span className="tm-blog-metahighlight"><span>Apr</span>17</span>
                                        </div>
                                        <div className="tm-blog-content">
                                            <h6 className="tm-blog-title"><a href="blog-details.html">Silver-colored tiara rings
                                                with clear
                                                gemstones</a></h6>
                                            <ul className="tm-blog-meta">
                                                <li><a href="blog.html"><i className="ion-android-person"></i> Anderson</a></li>
                                                <li><a href="blog-details.html"><i className="ion-chatbubbles"></i> 3 Comments</a>
                                                </li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                incdidunt ut labore et dolore magna aliqua [....]</p>
                                            <a href="blog-details.html" className="tm-readmore">Read more</a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Blog Single Item -->

                        <!-- Blog Single Item --> 
                                <div className="col-lg-4 col-md-6">
                                    <div className="tm-blog ">
                                        <div className="tm-blog-topside">
                                            <div className="tm-blog-thumb">
                                                <img src="assets/images/blog/blog-image-4.jpg" alt="blog image" />
                                            </div>
                                            <span className="tm-blog-metahighlight"><span>Apr</span>17</span>
                                        </div>
                                        <div className="tm-blog-content">
                                            <h6 className="tm-blog-title"><a href="blog-details.html">Diamond ring is worn on top of
                                                the
                                                engagement band</a></h6>
                                            <ul className="tm-blog-meta">
                                                <li><a href="blog.html"><i className="ion-android-person"></i> Anderson</a></li>
                                                <li><a href="blog-details.html"><i className="ion-chatbubbles"></i> 3 Comments</a>
                                                </li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                incdidunt ut labore et dolore magna aliqua [....]</p>
                                            <a href="blog-details.html" className="tm-readmore">Read more</a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Blog Single Item -->

                        <!-- Blog Single Item --> 
                                <div className="col-lg-4 col-md-6">
                                    <div className="tm-blog ">
                                        <div className="tm-blog-topside">
                                            <div className="tm-blog-thumb">
                                                <img src="assets/images/blog/blog-image-5.jpg" alt="blog image" />
                                            </div>
                                            <span className="tm-blog-metahighlight"><span>Apr</span>17</span>
                                        </div>
                                        <div className="tm-blog-content">
                                            <h6 className="tm-blog-title"><a href="blog-details.html">White gold engagement rings
                                                for
                                                couples</a></h6>
                                            <ul className="tm-blog-meta">
                                                <li><a href="blog.html"><i className="ion-android-person"></i> Anderson</a></li>
                                                <li><a href="blog-details.html"><i className="ion-chatbubbles"></i> 3 Comments</a>
                                                </li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                incdidunt ut labore et dolore magna aliqua [....]</p>
                                            <a href="blog-details.html" className="tm-readmore">Read more</a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--// Blog Single Item --> 

                            </div>
                        </div>
                    </div>
                    {/* <!--// Latest Blogs Area -->

            <!-- Brand Logos --> */}
                   {/* <div className="tm-section tm-brandlogo-area tm-padding-section bg-grey" >
                        <div className="container" >
                            <div className="row tm-brandlogo-slider" >

                                {/* <!-- Brang Logo Single --> 
                                <div className="col-12 tm-brandlogo">
                                    <a href="#">
                                        <img src="assets/images/brandlogo-1.png" alt="brand-logo" />
                                    </a>
                                </div>
                                {/* <!--// Brang Logo Single -->

                        <!-- Brang Logo Single --> 
                                <div className="col-12 tm-brandlogo">
                                    <a href="#">
                                        <img src="assets/images/brandlogo-2.png" alt="brand-logo" />
                                    </a>
                                </div>
                                {/* <!--// Brang Logo Single -->

                        <!-- Brang Logo Single --> 
                                <div className="col-12 tm-brandlogo">
                                    <a href="#">
                                        <img src="assets/images/brandlogo-3.png" alt="brand-logo" />
                                    </a>
                                </div>
                                {/* <!--// Brang Logo Single -->

                        <!-- Brang Logo Single --> 
                                <div className="col-12 tm-brandlogo">
                                    <a href="#">
                                        <img src="assets/images/brandlogo-4.png" alt="brand-logo" />
                                    </a>
                                </div>
                                {/* <!--// Brang Logo Single -->

                        <!-- Brang Logo Single --> 
                                <div className="col-12 tm-brandlogo">
                                    <a href="#">
                                        <img src="assets/images/brandlogo-5.png" alt="brand-logo" />
                                    </a>
                                </div>
                                {/* <!--// Brang Logo Single -->

                        <!-- Brang Logo Single --> 
                                <div className="col-12 tm-brandlogo">
                                    <a href="#">
                                        <img src="assets/images/brandlogo-1.png" alt="brand-logo" />
                                    </a>
                                </div>
                                {/* <!--// Brang Logo Single -->

                        <!-- Brang Logo Single --> 
                                <div className="col-12 tm-brandlogo">
                                    <a href="#">
                                        <img src="assets/images/brandlogo-2.png" alt="brand-logo" />
                                    </a>
                                </div>
                                {/* <!--// Brang Logo Single -->

                        <!-- Brang Logo Single --> 
                                <div className="col-12 tm-brandlogo">
                                    <a href="#">
                                        <img src="assets/images/brandlogo-3.png" alt="brand-logo" />
                                    </a>
                                </div>
                                {/* <!--// Brang Logo Single -->

                        <!-- Brang Logo Single --> 
                                <div className="col-12 tm-brandlogo">
                                    <a href="#">
                                        <img src="assets/images/brandlogo-4.png" alt="brand-logo" />
                                    </a>
                                </div>
                                {/* <!--// Brang Logo Single -->

                        <!-- Brang Logo Single --> 
                                <div className="col-12 tm-brandlogo">
                                    <a href="#">
                                        <img src="assets/images/brandlogo-5.png" alt="brand-logo" />
                                    </a>
                                </div>
                                {/* <!--// Brang Logo Single --> 

                            </div>
                        </div>
                    </div>
                    {/* <!--// Brand Logos --> */}

                </main>
                {/* <!--// Page Content -->

        <!-- Footer --> */}
                {/* <Footer/> */}
                {/* <!--// Footer -->

        <!-- Product Quickview --> */}
                <div className="tm-product-quickview" id="tm-product-quickview">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-9 col-lg-10 col-12">
                                <div className="tm-product-quickview-inner">

                                    {/* <!-- Product Details --> */}
                                    <div className="tm-prodetails">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-10 col-12">
                                                <div className="tm-prodetails-images">
                                                    <div className="tm-prodetails-largeimages">
                                                        <div className="tm-prodetails-largeimage">
                                                            <img src="assets/images/products/product-image-1.jpg"
                                                                alt="product image" />
                                                        </div>
                                                        <div className="tm-prodetails-largeimage">
                                                            <img src="assets/images/products/product-image-2.jpg"
                                                                alt="product image" />
                                                        </div>
                                                        <div className="tm-prodetails-largeimage">
                                                            <img src="assets/images/products/product-image-3.jpg"
                                                                alt="product image" />
                                                        </div>
                                                        <div className="tm-prodetails-largeimage">
                                                            <img src="assets/images/products/product-image-4.jpg"
                                                                alt="product image" />
                                                        </div>
                                                        <div className="tm-prodetails-largeimage">
                                                            <img src="assets/images/products/product-image-6.jpg"
                                                                alt="product image" />
                                                        </div>
                                                        <div className="tm-prodetails-largeimage">
                                                            <img src="assets/images/products/product-image-6.jpg"
                                                                alt="product image" />
                                                        </div>
                                                    </div>
                                                    <div className="tm-prodetails-thumbnails">
                                                        <div className="tm-prodetails-thumbnail">
                                                            <img src="assets/images/products/product-image-1-thumb.jpg"
                                                                alt="product image" />
                                                        </div>
                                                        <div className="tm-prodetails-thumbnail">
                                                            <img src="assets/images/products/product-image-2-thumb.jpg"
                                                                alt="product image" />
                                                        </div>
                                                        <div className="tm-prodetails-thumbnail">
                                                            <img src="assets/images/products/product-image-3-thumb.jpg"
                                                                alt="product image" />
                                                        </div>
                                                        <div className="tm-prodetails-thumbnail">
                                                            <img src="assets/images/products/product-image-4-thumb.jpg"
                                                                alt="product image" />
                                                        </div>
                                                        <div className="tm-prodetails-thumbnail">
                                                            <img src="assets/images/products/product-image-5-thumb.jpg"
                                                                alt="product image" />
                                                        </div>
                                                        <div className="tm-prodetails-thumbnail">
                                                            <img src="assets/images/products/product-image-6-thumb.jpg"
                                                                alt="product image" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="tm-prodetails-content">
                                                    <h4 className="tm-prodetails-title">Stylist daimond ring</h4>
                                                    <span className="tm-prodetails-price"><del>$75.99</del> $59.99</span>
                                                    <div className="tm-ratingbox">
                                                        <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                        <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                        <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                        <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                        <span><i className="ion-android-star-outline"></i></span>
                                                    </div>
                                                    <div className="tm-prodetails-infos">
                                                        <div className="tm-prodetails-singleinfo">
                                                            <b>Product ID : </b>010
                                                        </div>
                                                        <div className="tm-prodetails-singleinfo">
                                                            <b>Category : </b><a href="#">Ring</a>
                                                        </div>
                                                        <div className="tm-prodetails-singleinfo tm-prodetails-tags">
                                                            <b>Tags : </b>
                                                            <ul>
                                                                <li><a href="#">bracelets</a></li>
                                                                <li><a href="#">diamond</a></li>
                                                                <li><a href="#">ring</a></li>
                                                                <li><a href="#">necklaces</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="tm-prodetails-singleinfo">
                                                            <b>Available : </b>
                                                            <span className="color-theme">In Stock</span>
                                                        </div>
                                                        <div className="tm-prodetails-singleinfo tm-prodetails-share">
                                                            <b>Share : </b>
                                                            <ul>
                                                                <li><a href="#"><i className="ion-social-facebook"></i></a></li>
                                                                <li><a href="#"><i className="ion-social-instagram-outline"></i></a>
                                                                </li>
                                                                <li><a href="#"><i className="ion-social-skype-outline"></i></a>
                                                                </li>
                                                                <li><a href="#"><i className="ion-social-pinterest-outline"></i></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis quemi
                                                        dolor, malesuada id metus a, mattis eleifend elit. Nullam pharetra
                                                        consequat ex in dapibus. Vestibulum ante ipsum primis in faucibus
                                                        orciluctus curae.</p>
                                                    <div className="tm-prodetails-quantitycart">
                                                        <h6>Quantity :</h6>
                                                        <div className="tm-quantitybox">
                                                            <label htmlFor="myInput">My Input:</label>
                                                            <input
                                                                type="text"
                                                                id="myInput"
                                                                value={value}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <a href="#" className="tm-button tm-button-dark">Add To Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!--// Product Details --> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--// Product Quickview --> */}
            </div>
            {/* <!--// Wrapper --> */}
        </div>

    )
}

export default HomePage;