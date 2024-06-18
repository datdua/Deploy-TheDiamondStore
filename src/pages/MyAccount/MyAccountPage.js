import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MyAccountPage.css";
import deleteOrder, { createPayment, fetchOrders, fetchOrderDetail } from "../../api/OrderAPI"; // Assuming you have a deleteOrder function in your API
import { AuthContext } from "../../components/Auth/AuthContext";
import OrderSidebar from "../../components/OrderSidebar/OrderSidebar";
import { toast } from "react-toastify";

function MyAccountPage() {
  const { accountName } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { accountId } = useParams();

  // State for managing the sidebar visibility and selected order
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!accountId) {
      console.error("Account ID is not available in params");
      setError("Account ID is missing");
      return;
    }
    const getOrders = async () => {
      setLoading(true);
      try {
        if (accountId) {
          const response = await fetchOrders(accountId);
          setOrders(response);
        } else {
          console.error('accountId is undefined');
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [accountId]);

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
        <button onClick={handlePayment} className="tm-button tm-button-small">
          Pay
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
      await deleteOrder(orderID); // Implement deleteOrder function in your API
      setOrders(orders.filter(order => order.orderID !== orderID));
      toast.success('Xoá đơn hàng thành công')
    } catch (error) {
      console.error('Failed to delete order:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
    setSelectedOrder(null);
  };

  return (
    <div>
      <div className="tm-breadcrumb-area tm-padding-section bg-grey">
        <div className="container">
          <div className="tm-breadcrumb">
            <h2>My Account</h2>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li>My Account</li>
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
                  <a className="nav-link" id="account-dashboard-tab" data-toggle="tab"
                    href="#account-dashboard" role="tab" aria-controls="account-dashboard"
                    aria-selected="true">Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" id="account-orders-tab" data-toggle="tab" href="#account-orders"
                    role="tab" aria-controls="account-orders" aria-selected="false">Orders</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="account-acdetails-tab" data-toggle="tab"
                    href="#account-acdetails" role="tab" aria-controls="account-acdetails"
                    aria-selected="false">Account Details</a>
                </li>
              </ul>

              <div className="tab-content" id="account-content">
                <div className="tab-pane fade" id="account-dashboard" role="tabpanel"
                  aria-labelledby="account-dashboard-tab">
                  <div className="tm-myaccount-dashboard">
                    <p>Hello <b>{accountName}</b></p>
                    <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                  </div>
                </div>
                <div className="tab-pane fade show active" id="account-orders" role="tabpanel"
                  aria-labelledby="account-orders-tab">
                  <div className="tm-myaccount-orders">
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    <div className="table-responsive">
                      <table className="table table-bordered mb-0">
                        <thead>
                          <tr>
                            <th className="tm-myaccount-orders-col-id">ORDER ID</th>
                            <th className="tm-myaccount-orders-col-date">DATE</th>
                            <th className="tm-myaccount-orders-col-status">STATUS</th>
                            <th className="tm-myaccount-orders-col-total">TOTAL</th>
                            <th className="tm-myaccount-orders-col-view">View</th>
                            <th className="tm-myaccount-orders-col-action">Action</th>
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
                                <td><button onClick={() => handleViewOrder(order.orderID)} className="tm-button tm-button-small">View</button></td>
                                <td>
                                  <PaymentButton orderID={order.orderID} orderStatus={order.orderStatus} />
                                  <button onClick={() => handleDeleteOrder(order.orderID)} className="tm-button tm-button-small">Delete</button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6">No orders found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="account-acdetails" role="tabpanel"
                  aria-labelledby="account-acdetails-tab">
                  <div className="tm-myaccount-details">
                    <form action="#">
                      <div className="tm-form-inner">
                        <div className="tm-form-field">
                          <label htmlFor="acdetails-firstname">First name</label>
                          <input type="text" id="acdetails-firstname" />
                        </div>
                        <div className="tm-form-field">
                          <label htmlFor="acdetails-lastname">Last name</label>
                          <input type="text" id="acdetails-lastname" />
                        </div>
                        <div className="tm-form-field">
                          <label htmlFor="acdetails-displayname">Display name</label>
                          <input type="text" id="acdetails-displayname" />
                        </div>
                        <div className="tm-form-field">
                          <label htmlFor="acdetails-email">Email address</label>
                          <input type="email" id="acdetails-email" />
                        </div>
                        <div className="tm-form-field">
                          <label htmlFor="acdetails-password">Old password</label>
                          <input type="password" id="acdetails-password" />
                        </div>
                        <div className="tm-form-field">
                          <label htmlFor="acdetails-newpassword">New password</label>
                          <input type="password" id="acdetails-newpassword" />
                        </div>
                        <div className="tm-form-field">
                          <label htmlFor="acdetails-confirmpass">Confirm password</label>
                          <input type="password" id="acdetails-confirmpass" />
                        </div>
                        <div className="tm-form-field">
                          <input type="checkbox" name="acdetails-agreeterms" id="acdetails-agreeterms" />
                          <label htmlFor="acdetails-agreeterms">I have read and agree to the Privacy Policy</label>
                        </div>
                        <div className="tm-form-field">
                          <button type="submit" className="tm-button">Save Changes</button>
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
  );
}

export default MyAccountPage;
