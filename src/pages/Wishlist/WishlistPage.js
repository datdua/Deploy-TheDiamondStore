import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./WishlistPage.css"
function Wishlist() {
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
                            <h2>Shopping Cart</h2>
                            <ul>
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/product">Shop</Link></li>
                                <li>Shopping Cart</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <!--// Breadcrumb Area -->

                <!-- Page Content --> */}
                <main className="page-content">

                    {/* <!-- Wishlist Area --> */}
                    <div className="tm-section wishlist-area bg-white tm-padding-section">
                        <div className="container">

                            {/* <!-- Wishlist Table --> */}
                            <div className="tm-wishlist-table table-responsive">
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th className="tm-wishlist-col-image" scope="col">Image</th>
                                            <th className="tm-wishlist-col-productname" scope="col">Product</th>
                                            <th className="tm-wishlist-col-price" scope="col">Price</th>
                                            <th className="tm-wishlist-col-quantity" scope="col">Quantity</th>
                                            <th className="tm-wishlist-col-addcart" scope="col">Add to Cart</th>
                                            <th className="tm-wishlist-col-remove" scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Link to="/product-detail" className="tm-wishlist-productimage">
                                                    <img src="assets/images/products/product-image-1-thumb.jpg"
                                                        alt="product image"/>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to="/product-detail" className="tm-cart-productname">Stylist
                                                    daimond
                                                    earring</Link>
                                            </td>
                                            <td className="tm-wishlist-price">$75.00</td>
                                            <td>
                                                <div className="tm-quantitybox">
                                                    <input type="text" value="1"/>
                                                </div>
                                            </td>
                                            <td>
                                                <a href="#" className="tm-button tm-button-small">Add to Cart</a>
                                            </td>
                                            <td>
                                                <button className="tm-wishlist-removeproduct"><i className="ion-close"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link to="/product-detail" className="tm-wishlist-productimage">
                                                    <img src="assets/images/products/product-image-2-thumb.jpg"
                                                        alt="product image"/>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to="/product-detail" className="tm-wishlist-productname">Stylist
                                                    daimond
                                                    earring</Link>
                                            </td>
                                            <td className="tm-wishlist-price">$75.00</td>
                                            <td>
                                                <div className="tm-quantitybox">
                                                    <input type="text" value="1"/>
                                                </div>
                                            </td>
                                            <td>
                                                <a href="#" className="tm-button tm-button-small">Add to Cart</a>
                                            </td>
                                            <td>
                                                <button className="tm-wishlist-removeproduct"><i className="ion-close"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link to="/product-detail" className="tm-wishlist-productimage">
                                                    <img src="assets/images/products/product-image-3-thumb.jpg"
                                                        alt="product image"/>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to="/product-detail" className="tm-wishlist-productname">Stylist
                                                    daimond
                                                    earring</Link>
                                            </td>
                                            <td className="tm-wishlist-price">$78.00</td>
                                            <td>
                                                <div className="tm-quantitybox">
                                                    <input type="text" value="1"/>
                                                </div>
                                            </td>
                                            <td>
                                                <a href="#" className="tm-button tm-button-small">Add to Cart</a>
                                            </td>
                                            <td>
                                                <button className="tm-wishlist-removeproduct"><i className="ion-close"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* <!--// Wishlist Table --> */}

                        </div>
                    </div>
                    {/* <!--// Wishlist Area --> */}

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
export default Wishlist;