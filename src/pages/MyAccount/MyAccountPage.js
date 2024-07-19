import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MyAccountPage.css";
import { deleteOrder, createPayment, fetchOrders, fetchOrderDetail } from "../../api/OrderAPI";
import { getAccountByID, updateAccount } from "../../api/accountCrud";
import { AuthContext } from "../../components/Auth/AuthContext";
import OrderSidebar from "../../components/OrderSidebar/OrderSidebar";
import { toast } from "react-toastify";
import { PointsContext } from "../../components/PointsContext/PointsContext";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageLoading from "../../components/LoadingImg/ImageLoading"

function MyAccountPage() {
  const { accountName } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accountDetails, setAccountDetails] = useState({
    accountName: "",
    addressAccount: "",
    email: "",
    phoneNumber: "",
    role: "",
    point: 0  // Include points in state
  });
  const { accountId } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { totalAccumulatedPoints, updatePointsToRedeem } = useContext(PointsContext);

  useEffect(() => {
    if (!accountId) {
      console.error("Account ID is not available in params");
      setError("Account ID is missing");
      return;
    }

    getAccountDetails();
    getOrders();
  }, [accountId]);

  const getAccountDetails = async () => {
    try {
      const accountData = await getAccountByID(accountId);
      setAccountDetails({
        accountName: accountData.account.accountName,
        addressAccount: accountData.account.addressAccount,
        email: accountData.account.email,
        phoneNumber: accountData.account.phoneNumber,
        role: accountData.account.role,
        point: accountData.point  
      });
    } catch (error) {
      console.error('Failed to fetch account details:', error);
      setError('Failed to fetch account details');
    }
  };

  const getOrders = async () => {
    setLoading(true);
    try {
      if (accountId) {
        const response = await fetchOrders(accountId);
        setOrders(response);
      } else {
        console.error('accountId is undefined');
        setError('Account ID is undefined');
      }
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAccountDetails({ ...accountDetails, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAccount(accountId, accountDetails);
      toast.success("Cập nhật thông tin thành công");
      await getAccountDetails();
    } catch (error) {
      console.error('Failed to update account details:', error);
      toast.error("Cập nhật thông tin thất bại");
    }
  };

  const PaymentButton = ({ orderID, orderStatus }) => {
    const handlePayment = async () => {
      try {
        const paymentUrl = await createPayment(orderID);
        window.location.href = paymentUrl;
      } catch (error) {
        console.error('Payment failed:', error);
      }
    };

    return (
      orderStatus !== "Đã thanh toán" && (
        <button onClick={handlePayment} className="tm-button tm-button-small" style={{backgroundColor:'#005aaa'}}>
          <AccountBalanceIcon/>
        </button>
      )
    );
  };

  const handleViewOrder = async (orderID) => {
    try {
      const orderDetails = await fetchOrderDetail(orderID);
      setSelectedOrder(orderDetails);
      setShowSidebar(true);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };

  const handleDeleteOrder = async (orderID) => {
    try {
      await deleteOrder(orderID);
      setOrders(orders.filter(order => order.orderID !== orderID));
      toast.success('Xoá đơn hàng thành công');
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div>
        <div className="tm-breadcrumb-area tm-padding-section bg-grey" style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fimg-banner2.png?alt=media&token=13ceeebc-e94b-4e57-95d7-ec5dbb2fa30e)` }}>
          <div className="container">
            <div className="tm-breadcrumb">
              <h2>Tài Khoản</h2>
              <ul className="add-back">
                <li><Link to="/">Trang Chủ</Link></li>
                <li>Tài Khoản</li>
              </ul>
            </div>
          </div>
        </div>
        <main className="page-content">
          <div className="tm-section tm-my-account-area bg-white tm-padding-section">
            <div className="container">
              <div className="tm-myaccount">
                <ul className="nav tm-tabgroup" id="account" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="account-acdetails-tab" data-toggle="tab"
                      href="#account-acdetails" role="tab" aria-controls="account-acdetails"
                      aria-selected="false">Thông tin chi tiết</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="account-orders-tab" data-toggle="tab" href="#account-orders"
                      role="tab" aria-controls="account-orders" aria-selected="false">Đơn hàng</a>
                  </li>
                </ul>
                <div className="tab-content" id="account-content">
                  <div className="tab-pane fade" id="account-orders" role="tabpanel"
                    aria-labelledby="account-orders-tab">
                    <div className="tm-myaccount-orders">
                      {loading && <ImageLoading />}
                      <div className="table-responsive">
                        <table className="table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th className="tm-myaccount-orders-col-id">ID</th>
                              <th className="tm-myaccount-orders-col-date">NGÀY</th>
                              <th className="tm-myaccount-orders-col-status">TRẠNG THÁI</th>
                              <th className="tm-myaccount-orders-col-total">TỔNG</th>
                              <th className="tm-myaccount-orders-col-view">XEM</th>
                              <th className="tm-myaccount-orders-col-action">HÀNH ĐỘNG</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.length > 0 ? (
                              orders.map(order => (
                                <tr key={order.orderID}>
                                  <td>{order.orderID}</td>
                                  <td>{order.deliveryDate}</td>
                                  <td>{order.orderStatus}</td>
                                  <td>{order.totalOrder !== undefined && order.totalOrder !== null ? order.totalOrder.toLocaleString() : 'N/A'}</td>                                   
                                  <td><button onClick={() => handleViewOrder(order.orderID)} className="tm-button tm-button-small"><i className="ion-eye"></i></button></td>
                                  <td>
                                    <PaymentButton orderID={order.orderID} orderStatus={order.orderStatus} />
                                    {order.orderStatus === "Đang xử lý" && <button onClick={() => handleDeleteOrder(order.orderID)} className="tm-button tm-button-small" style={{backgroundColor:'red', marginLeft:'10px'}}><DeleteIcon/></button>}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6">Không có đơn hàng.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade show active" id="account-acdetails" role="tabpanel"
                    aria-labelledby="account-acdetails-tab">
                    <div className="tm-myaccount-details">
                      <form onSubmit={handleSubmit}>
                        <div className="tm-form-inner">
                          <div className="tm-form-field">
                            <label htmlFor="accountName">Tên tài khoản</label>
                            <input
                              type="text"
                              id="accountName"
                              value={accountDetails.accountName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="tm-form-field">
                            <label htmlFor="addressAccount">Địa chỉ</label>
                            <input
                              type="text"
                              id="addressAccount"
                              value={accountDetails.addressAccount}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="tm-form-field">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              id="email"
                              value={accountDetails.email}
                              onChange={handleInputChange}
                              disabled
                            />
                          </div>
                          <div className="tm-form-field">
                            <label htmlFor="phoneNumber">Số điện thoại</label>
                            <input
                              type="tel"
                              id="phoneNumber"
                              value={accountDetails.phoneNumber}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="tm-form-field">
                            <label htmlFor="point">Điểm tích luỹ</label>
                            <input
                              type="number"
                              id="point"
                              value={accountDetails.point} // Display points here 
                              disabled
                            />
                          </div>
                          <div className="tm-form-field">
                            <input
                              type="role"
                              id="role"
                              value={accountDetails.role}
                              onChange={handleInputChange}
                              disabled
                              hidden
                            />
                          </div>                        
                          <div className="tm-form-field">
                            <button type="submit" className="tm-button">Cập nhật</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {selectedOrder && (
          <OrderSidebar
            name="Order Details"
            order={selectedOrder}
            show={showSidebar}
            onHide={handleCloseSidebar}
          />
        )}
      </div>
    </>
  );
}

export default MyAccountPage;
