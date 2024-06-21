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
    console.log('Token:', token)
    console.log('Account ID:', localStorage.getItem('accountID'));

    return (
        <div>
            <div id="wrapper" className="wrapper">

                {/* <!-- Heroslider Area --> */}

                <HeroSlider />

                {/* <!--// Heroslider Area --> 
        <!-- Page Content --> */}
                <main className="page-content">

                    {/* <!-- Banners Area --> */}
                    <div className="tm-section tm-banners-area tm-padding-section">
                        <div className="container">
                            <div className="row mt-30-reverse">

                                {/* <!-- Single Banner --> */}
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-30">
                                    <a href="#" className="tm-banner ">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fbanner-home-3.png?alt=media&token=5e4cf140-24e0-4a76-a5df-d63541a60412" alt="banner image" />
                                    </a>
                                </div>
                                {/* <!--// Single Banner -->

                        <!-- Single Banner --> */}
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-30">
                                    <a href="#" className="tm-banner ">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fbanner-home-1.png?alt=media&token=46c190d2-838e-43ef-9a9e-d5ed09e9e037" alt="banner image" />
                                    </a>
                                </div>
                                {/* <!--// Single Banner -->

                        <!-- Single Banner --> */}
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-30">
                                    <a href="#" className="tm-banner ">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fbanner-home-2.png?alt=media&token=a2cc4d47-102b-43e5-9ce8-a4ecee01705c" alt="banner image" />
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
                                        <img className="tm-offer" src="assets/images/voucher.png" alt="voucher" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    )
}

export default HomePage;