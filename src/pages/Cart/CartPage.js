import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllCartItems, removeCartItem, getTotalCart, updateCart } from "../../api/addToCart";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@mui/material/Tooltip';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalCart, setTotalCart] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const { accountId } = useParams();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (accountId) {
                    const items = await getAllCartItems(accountId);
                    setCartItems(items || []);
                    const total = await getTotalCart(accountId);
                    setTotalCart(total);
                } else {
                    console.error("Account ID is undefined");
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [accountId]);

    const handleRemoveItem = async (cartID) => {
        try {
            await removeCartItem(cartID);
            setCartItems(prevItems => prevItems.filter(item => item.cartID !== cartID));
            toast.success("Xoá sản phẩm thành công");
            recalculateTotalCart();
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Xoá sản phẩm thất bại");
        }
    };

    const handleUpdateCartItem = async (cartID, newQuantity, newSizeJewelry, diamondID, jewelryID) => {
        try {
            await updateCart(cartID, accountId, diamondID, jewelryID, newQuantity, newSizeJewelry);
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.cartID === cartID ? { ...item, quantity: newQuantity, sizeJewelry: newSizeJewelry } : item
                )
            );
            toast.success("Cập nhật giỏ hàng thành công");
            recalculateTotalCart();
        } catch (error) {
            console.error("Error updating cart item:", error);
            toast.error("Cập nhật giỏ hàng thất bại");
        }
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const recalculateTotalCart = async () => {
        try {
            const total = await getTotalCart(accountId);
            setTotalCart(total);
        } catch (error) {
            console.error("Error calculating total cart:", error);
        }
    };

    return (
        <div>
            <div id="wrapper" className="wrapper">
                {/* Header and Breadcrumbs */}
                {/* Main Content */}
                <main className="page-content">
                    {/* Shopping Cart Area */}
                    <div className="tm-section shopping-cart-area bg-white tm-padding-section">
                        <div className="container">
                            {/* Cart Table */}
                            <div className="tm-cart-table table-responsive">
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th className="tm-cart-col-image" scope="col">Hình ảnh</th>
                                            <th className="tm-cart-col-productname" scope="col">Sản phẩm</th>
                                            <th className="tm-cart-col-price" scope="col">Giá</th>
                                            <th className="tm-cart-col-quantity" scope="col">Số lượng</th>
                                            <th className="tm-cart-col-size" scope="col">Kích thước</th>
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
                                                <td className="tm-cart-price">{item.price ? item.price.toLocaleString() : 'N/A'} VND</td>
                                                <td>
                                                    <div className="tm-quantitybox">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) => handleUpdateCartItem(item.cartID, parseInt(e.target.value, 10), item.sizeJewelry, item.diamondID, item.jewelryID)}
                                                            className="w-12 text-center"
                                                            style={{ textAlign: 'center' }}
                                                            disabled={!isEditing}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="tm-sizebox">
                                                        <input
                                                            type="number"
                                                            value={item.sizeJewelry}
                                                            onChange={(e) => handleUpdateCartItem(item.cartID, item.quantity, parseInt(e.target.value, 10), item.diamondID, item.jewelryID)}
                                                            className="w-12 text-center"
                                                            disabled={!isEditing || !!item.diamondID}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="tm-cart-totalprice">{item.grossCartPrice ? item.grossCartPrice.toLocaleString() : 'N/A'} VND</span>
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
                            {/* Cart Bottom Area */}
                            <div className="tm-cart-bottomarea">
                                <div className="row">
                                    <div className="col-lg-8 col-md-6">
                                        <div className="tm-buttongroup">
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4">
                                                    <Link to="/sanpham" className="tm-button">Mua Tiếp </Link>
                                                </div>
                                                <div className="col-lg-3 col-md-4">
                                                    <button className="tm-button" onClick={toggleEditing}>
                                                        {isEditing ? "Lưu" : "Cập nhật "}
                                                    </button>
                                                </div>
                                                <div className="col-lg-3 col-md-4">
                                                    <Tooltip title="Để sử dụng thông tin cá nhân (bao gồm: địa chỉ, số điện thoại) áp dụng cho các đơn hàng sau, vui lòng nhấp vào đây để tiến hành cập nhật." arrow>
                                                    <Link to={`/account/${accountId}`} style={{ marginTop: '10px',  }} className="tm-button " >ⓘ</Link>
                                                    </Tooltip>
                                                </div>
                                            </div>
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
            </div>
        </div>
    );
}

export default CartPage;
