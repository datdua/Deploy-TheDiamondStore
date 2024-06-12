import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllCartItems, getTotalCart } from "../../api/addToCart";
import "./CheckoutPage.css";
import { createOrder, getPromotion } from "../../api/OrderAPI";
import { toast } from "react-toastify";
import { getContactInfo } from "../../api/accountCrud";

function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalCart, setTotalCart] = useState(0);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pointsToRedeem, setPointsToRedeem] = useState(0);
    const [promotionCode, setPromotionCode] = useState("");
    const [promotionDescription, setPromotionDescription] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const { accountId } = useParams(); // Extract accountId from useParams
    const navigate = useNavigate();

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

    useEffect(() => {
        calculatePointsToRedeem();
    }, [totalCart]);

    const calculatePointsToRedeem = () => {
        const points = Math.floor(totalCart / 100000); // Assuming 1 point = 100,000 VND
        setPointsToRedeem(points);
    };

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                if (accountId) {
                    const contactInfo = await getContactInfo(accountId);
                    setPhoneNumber(contactInfo.phoneNumber);
                    setDeliveryAddress(contactInfo.addressAccount || '');
                } else {
                    console.error("Account ID is undefined");
                }
            } catch (error) {
                console.error("Error fetching contact info:", error);
            }
        };

        fetchContactInfo();
    }, [accountId]);

    const handleApplyPromotion = async (e) => {
        e.preventDefault();
        try {
            const promotion = await getPromotion(promotionCode);
            if (promotion) {
                setPromotionDescription(promotion.description);
                const discount = totalCart * promotion.discountAmount; // Calculate discount based on totalCart * discountAmount
                setDiscountAmount(discount);
                toast.success("Promotion applied successfully");
            } else {
                toast.error("Invalid promotion code");
            }
        } catch (error) {
            toast.error("Failed to apply promotion");
        }
    };

    const handlePlaceOrder = async () => {
        if (!deliveryAddress || !phoneNumber) {
            toast.error("Please provide delivery address and phone number.");
            return;
        }

        try {
            const orderData = await createOrder(accountId, deliveryAddress, phoneNumber, pointsToRedeem, promotionCode);
            toast.success("Order placed successfully");
            navigate(`/account/${accountId}`); // Redirect to order confirmation page or wherever you want
        } catch (error) {
            toast.error("Failed to place order");
        }
    };

    // Calculate final total including discounts
    const finalTotal = totalCart - discountAmount;

    return (
        <div>
            <div id="wrapper" className="wrapper">
                {/* Header */}

                {/* Breadcrumb Area */}
                <div className="tm-breadcrumb-area tm-padding-section bg-grey" style={{ backgroundImage: `url(assets/images/breadcrumb-bg.jpg)` }}>
                    <div className="container">
                        <div className="tm-breadcrumb">
                            <h2>Checkout</h2>
                            <ul>
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/product">Shop</Link></li>
                                <li>Checkout</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Page Content */}
                <main className="page-content">
                    {/* Checkout Area */}
                    <div className="tm-section tm-checkout-area bg-white tm-padding-section">
                        <div className="container">
                            <form action="#" className="tm-form tm-checkout-form" onSubmit={handleApplyPromotion}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h4 className="small-title">THÔNG TIN HOÁ ĐƠN</h4>
                                        {/* Billing Form */}
                                        <div className="tm-checkout-billingform">
                                            <div className="tm-form-inner">
                                                <div className="tm-form-field">
                                                    <label htmlFor="billingform-phone">Số điện thoại </label>
                                                    <input type="text" id="billingform-phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                </div>
                                                <div className="tm-form-field">
                                                    <label htmlFor="billingform-address">Địa chỉ</label>
                                                    <input type="text" id="billingform-address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Apartment, Street Address" />
                                                </div>
                                            </div>
                                            <div className="tm-cart-coupon">
                                                <label htmlFor="coupon-field">Có mã giảm giá?</label>
                                                <input type="text" id="coupon-field" value={promotionCode} onChange={(e) => setPromotionCode(e.target.value)} placeholder="Enter coupon code" required />
                                                <button type="submit" className="tm-button">Áp dụng</button>

                                            </div>
                                        </div>
                                        {/* Different Address Form */}
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="tm-checkout-orderinfo">
                                            <h4 className="small-title">THÔNG TIN ĐƠN HÀNG</h4>
                                            <div className="table-responsive">
                                                <table className="table table-borderless tm-checkout-ordertable">
                                                    <thead>
                                                        <tr>
                                                            <th>Sản phẩm</th>
                                                            <th>Tổng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cartItems.map((item, index) => (
                                                            <tr key={`${item.diamondID || item.jewelryID}-${index}`}>
                                                                <td>
                                                                    {item.diamondID && (
                                                                        <Link to={`/product-detail/diamond/${item.diamondID}`} className="tm-checkout-productlink">{item.diamondName} * {item.quantity}</Link>
                                                                    )}
                                                                    {item.jewelryID && (
                                                                        <Link to={`/product-detail/jewelry/${item.jewelryID}`} className="tm-checkout-productlink">{item.jewelryName} * {item.quantity}</Link>
                                                                    )}
                                                                </td>
                                                                <td>{item.totalPrice.toLocaleString()} VND</td>
                                                            </tr>
                                                        ))}
                                                        {promotionDescription && (
                                                            <tr>
                                                                <td colSpan="2">
                                                                    <p className="promotion-description">{promotionDescription}</p>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr className="tm-checkout-totals">
                                                            <td>Tổng</td>
                                                            <td>{totalCart.toLocaleString()} VND</td>
                                                        </tr>
                                                        <tr className="tm-checkout-discount">
                                                            <td>Giảm giá</td>
                                                            <td>- {discountAmount.toLocaleString()} VND</td>
                                                        </tr>
                                                        <tr className="tm-checkout-final-total highlight"> {/* Add a CSS class to highlight the final total */}
                                                            <td>TỔNG TIỀN THANH TOÁN</td>
                                                            <td>{finalTotal.toLocaleString()} VND</td>
                                                        </tr>
                                                        <tr className="tm-checkout-points">
                                                            <td>Điểm tích luỹ</td>
                                                            <td>{pointsToRedeem}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            <div className="tm-checkout-paymentmethods">
                                                <div className="tm-form-inner">
                                                    <div className="tm-form-field">
                                                        <input type="radio" name="paymentmethod" id="paymentmethod-paypal" />
                                                        <label htmlFor="paymentmethod-paypal">VNPay</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tm-checkout-submit">
                                                <p>Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng của bạn, hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này, và cho các mục đích khác được mô tả trong chính sách bảo mật của chúng tôi.</p>
                                                <div className="tm-form-inner">
                                                    <div className="tm-form-field">
                                                        <input type="checkbox" name="checkout-read-terms" id="checkout-read-terms" />
                                                        <label htmlFor="checkout-read-terms">Tôi đã đọc và đồng ý với các chính sách và điều kiện của cửa hàng</label>
                                                    </div>
                                                    <div className="tm-form-field">
                                                        <button type="button" className="tm-button tm-button-block" onClick={handlePlaceOrder}>Đặt hàng</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CheckoutPage;
