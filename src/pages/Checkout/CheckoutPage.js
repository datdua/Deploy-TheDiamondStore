import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllCartItems, getTotalCart } from "../../api/addToCart";
import "./CheckoutPage.css";
import { createOrder, getPromotion } from "../../api/OrderAPI";
import { toast } from "react-toastify";
import { getContactInfo, getCustomerPoints } from "../../api/accountCrud";
import { Button } from "react-bootstrap";
import { Checkbox, FormControlLabel } from "@mui/material";
import CountdownToast from "../../components/CountDownToast";

function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const [totalCart, setTotalCart] = useState(0);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pointsToRedeem, setPointsToRedeem] = useState(0);
    const [totalAccumulatedPoints, setTotalAccumulatedPoints] = useState(0);
    const [promotionCode, setPromotionCode] = useState("");
    const [promotionDescription, setPromotionDescription] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [usePoints, setUsePoints] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const { accountId } = useParams();
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
        const fetchCustomerPoints = async () => {
            try {
                if (accountId) {
                    const points = await getCustomerPoints(accountId);
                    setTotalAccumulatedPoints(points);
                } else {
                    console.error("Account ID is undefined");
                }
            } catch (error) {
                console.error("Error fetching customer points:", error);
            }
        };

        fetchCustomerPoints();
    }, [accountId]);

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
                const discount = totalCart * promotion.discountAmount;
                setDiscountAmount(discount);
            } else {
                toast.error("Mã giảm giá không hợp lệ");
            }
        } catch (error) {
            console.error("Error applying promotion:", error);
        }
    };

    const handlePlaceOrder = async () => {
        if (!deliveryAddress || !phoneNumber) {
            toast.error("Xin cung cấp địa chỉ giao hàng và số điện thoại");
            return;
        }

        try {
            const orderData = await createOrder(accountId, deliveryAddress, phoneNumber, usePoints ? totalAccumulatedPoints : 0, promotionCode);

            toast(<CountdownToast />, {
                autoClose: 90000,
                closeButton: false,
                style: {
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid #ccc'
                },
            });

            navigate(`/account/${accountId}`);
        } catch (error) {
            toast.error("Đặt hàng thất bại");
        }
    };

    const handleUsePoints = () => {
        if (pointsToRedeem <= totalAccumulatedPoints) {
            setUsePoints(true);
            setPointsToRedeem(totalAccumulatedPoints);
        } else {
            toast.error("Số điểm tích lũy không đủ để sử dụng.");
        }
    };

    const handleCancelUsePoints = () => {
        setUsePoints(false);
        setPointsToRedeem(0);
    };

    const pointsDiscount = usePoints ? totalAccumulatedPoints * 10000 : 0;
    const finalTotal = totalCart - discountAmount - pointsDiscount;

    return (
        <div>
            <div id="wrapper" className="wrapper">
                <main className="page-content">
                    <div className="tm-section tm-checkout-area bg-white tm-padding-section">
                        <div className="container">
                            <form className="tm-form tm-checkout-form" onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h4 className="small-title">THÔNG TIN HOÁ ĐƠN </h4>
                                        <div className="tm-checkout-billingform">
                                            <div className="tm-form-inner">
                                                <div className="tm-form-field">
                                                    <label htmlFor="billingform-phone">Số điện thoại </label>
                                                    <input type="text" id="billingform-phone" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                </div>
                                                <div className="tm-form-field">
                                                    <label htmlFor="billingform-address">Địa chỉ</label>
                                                    <input type="text" id="billingform-address" name="address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Vui lòng điền thông tin địa chỉ cụ thể" />
                                                </div>
                                            </div>
                                            <div className="tm-cart-coupon">
                                                <label htmlFor="coupon-field">Có mã giảm giá?</label>
                                                <input type="text" id="coupon-field" name="promotionCode" value={promotionCode} onChange={(e) => setPromotionCode(e.target.value)} placeholder="Nhập mã giảm giá tại đây" />
                                                <button type="button" className="tm-button" onClick={handleApplyPromotion}>Áp dụng</button>
                                            </div>
                                        </div>
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
                                                            <tr key={index}>
                                                                <td>
                                                                    {item?.diamond?.diamondID && (
                                                                        <span className="tm-checkout-productlink">{item.diamond.diamondName} * {item.diamond.quantity}</span>
                                                                    )}
                                                                    {item?.jewelry?.jewelryID && (
                                                                        <span className="tm-checkout-productlink">{item.jewelry.jewelryName} * {item.jewelry.quantity}</span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {item?.grossCartPrice ? item.grossCartPrice.toLocaleString() + ' VND' : ''}
                                                                </td>
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
                                                        <tr className="tm-checkout-points">
                                                            <td>Điểm tích luỹ khả dụng</td>
                                                            <td>{totalAccumulatedPoints}</td>
                                                        </tr>
                                                        {usePoints && (
                                                            <tr className="tm-checkout-points-discount">
                                                                <td>Giảm giá từ điểm tích luỹ</td>
                                                                <td>- {pointsDiscount.toLocaleString()} VND</td>
                                                            </tr>
                                                        )}
                                                        <tr className="tm-checkout-final-total highlight">
                                                            <td>TỔNG TIỀN THANH TOÁN</td>
                                                            <td>{finalTotal.toLocaleString()} VND</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            <div className="tm-cart-collaterals">
                                                <p>
                                                    Tổng giá tiền thanh toán đã bao gồm thuế và phí gia công (chỉ áp dụng cho sản phẩm trang sức)
                                                </p>
                                                <div className="checkbox">
                                                    <FormControlLabel
                                                        control={<Checkbox checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />}
                                                        label="VNPay"
                                                    />
                                                </div>
                                                <div className="tm-cart-btns">
                                                    {usePoints ? (
                                                        <button type='button' className="tm-button" onClick={handleCancelUsePoints}>Huỷ bỏ sử dụng điểm tích luỹ</button>
                                                    ) : (
                                                        <button type="button" className="tm-button" onClick={handleUsePoints}>Sử dụng điểm tích luỹ</button>
                                                    )}
                                                    <button className="button-order" type="submit" disabled={!termsChecked}>
                                                        <span>Đặt hàng</span>
                                                    </button>
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
