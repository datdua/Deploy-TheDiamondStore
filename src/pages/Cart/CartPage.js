import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getAllCartItems, removeCartItem, getTotalCart } from "../../api/addToCart";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalCart, setTotalCart] = useState(0);
    const { accountId } = useParams();
    
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (accountId) {
                    const items = await getAllCartItems(accountId);
                    setCartItems(Array.isArray(items) ? items : []);
                } else {
                    console.error("Account ID is undefined");
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        const fetchTotalCart = async () => {
            try {
                if (accountId) {
                    const total = await getTotalCart(accountId);
                    setTotalCart(total);
                } else {
                    console.error("Account ID is undefined");
                }
            } catch (error) {
                console.error("Error fetching total cart value:", error);
            }
        };

        fetchCartItems();
        fetchTotalCart();
    }, [accountId]);
    const handleRemoveItem = async (cartID) => {
        try {
            await removeCartItem(cartID);
            const updatedCartItems = cartItems.filter(item => item.cartID !== cartID);
            setCartItems(updatedCartItems);
            toast.success("Xoá sản phẩm thành công");

            // Fetch the updated total cart value
            const total = await getTotalCart(accountId);
            setTotalCart(total);
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Xoá sản phẩm thất bại");
        }
    };

    return (
        <div>
            <div id="wrapper" className="wrapper">
                <div className="tm-breadcrumb-area tm-padding-section bg-grey" style={{ backgroundImage: `url(assets/images/breadcrumb-bg.jpg)` }}>
                    <div className="container">
                        <div className="tm-breadcrumb">
                            <h2>Giỏ hàng</h2>
                            <ul>
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/product">Shop</Link></li>
                                <li>Shopping Cart</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <main className="page-content">
                    <div className="tm-section shopping-cart-area bg-white tm-padding-section">
                        <div className="container">
                            <div className="tm-cart-table table-responsive">
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th className="tm-cart-col-image" scope="col">Hình ảnh</th>
                                            <th className="tm-cart-col-productname" scope="col">Sản phẩm</th>
                                            <th className="tm-cart-col-price" scope="col">Giá</th>
                                            <th className="tm-cart-col-quantity" scope="col">Số lượng</th>
                                            <th className="tm-cart-col-total" scope="col">Tổng</th>
                                            <th className="tm-cart-col-remove" scope="col">Hành Động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={`${item.cartID}-${index}`}>
                                                <td>
                                                    {item.diamondID && (
                                                        <Link to={`/product-detail/diamond/${item.diamondID}`} className="tm-cart-productimage">
                                                            <img src={item.diamondImage} alt="Diamond" />
                                                        </Link>
                                                    )}
                                                    {item.jewelryID && (
                                                        <Link to={`/product-detail/jewelry/${item.jewelryID}`} className="tm-cart-productimage">
                                                            <img src={item.jewelryImage} alt="Jewelry" />
                                                        </Link>
                                                    )}
                                                </td>
                                                <td>
                                                    {item.diamondID && (
                                                        <Link to={`/product-detail/diamond/${item.diamondID}`} className="tm-cart-productname">{item.diamondName}</Link>
                                                    )}
                                                    {item.jewelryID && (
                                                        <Link to={`/product-detail/jewelry/${item.jewelryID}`} className="tm-cart-productname">{item.jewelryName}</Link>
                                                    )}
                                                </td>
                                                <td className="tm-cart-price">{item.price.toLocaleString()} VND</td>
                                                <td>
                                                    <div className="tm-quantitybox">
                                                        <div className="flex items-center">
                                                            <input id={`quantity-${index}`} type="text" value={item.quantity} readOnly className="w-12 text-center" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="tm-cart-totalprice">{item.totalPrice.toLocaleString()} VND</span>
                                                </td>
                                                <td>
                                                    <button className="tm-cart-removeproduct" onClick={() => handleRemoveItem(item.cartID)}>
                                                        <i className="ion-close"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="tm-cart-bottomarea">
                                <div className="row">
                                    <div className="col-lg-8 col-md-6">
                                        <div className="tm-buttongroup">
                                            <a href="/sanpham" className="tm-button">Tiếp tục mua sắm</a>
                                            <a href="#" className="tm-button">Cập nhật giỏ hàng</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="tm-cart-pricebox">
                                            <h2>Thanh toán giỏ hàng</h2>
                                            <div className="table-responsive">
                                                <table className="table table-borderless">
                                                    <tbody>
                                                        <tr className="tm-cart-pricebox-total">
                                                            <td>Tổng tiền</td>
                                                            <td>{totalCart ? totalCart.toLocaleString() : 0} VND</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Link to={`/checkout/${accountId}`} className="tm-button">Tiến hành tạo đơn hàng</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <button id="back-top-top"><i className="ion-arrow-up-c"></i></button>
            </div>
        </div>
    );
}

export default CartPage;
