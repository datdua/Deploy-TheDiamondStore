import Offcanvas from 'react-bootstrap/Offcanvas';
import './OrderSidebar.css';

function OrderSidebar({ order, show, onHide }) {
  console.log("OrderSidebar props:", order, show, onHide);

  return (
    <Offcanvas show={show} onHide={onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="order-detail">Order Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {order && order.length > 0 ? (
          <>
            {/* Account Information */}
            <div className="order-section">
              <h5>Account Information</h5>
              <p><span className="detail-title">Account Name:</span> <span className="detail-info">{order[0].order.account?.accountName}</span></p>
              <p><span className="detail-title">Phone Number:</span> <span className="detail-info">{order[0].order.account?.phoneNumber}</span></p>
              <p><span className="detail-title">Email:</span> <span className="detail-info">{order[0].order.account?.email}</span></p>
              <p><span className="detail-title">Address:</span> <span className="detail-info">{order[0].order.account?.addressAccount}</span></p>
            </div>
            <hr />

            {/* Order Information */}
            <div className="order-section">
              <h5>Order Information</h5>
              <p><span className="detail-title">Order ID:</span> <span className="detail-info">{order[0].order.orderID}</span></p>
              <p><span className="detail-title">Start Order Date:</span> <span className="detail-info">{order[0].order.startorderDate}</span></p>
              <p><span className="detail-title">Delivery Date:</span> <span className="detail-info">{order[0].order.deliveryDate}</span></p>
              <p><span className="detail-title">Status:</span> <span className="detail-info">{order[0].order.orderStatus}</span></p>
              <p><span className="detail-title">Delivery Address:</span> <span className="detail-info">{order[0].order.deliveryAddress}</span></p>
            </div>
            <hr />

            {/* Order Items */}
            <h5 style={{ fontWeight: "bold" }}>Product Information</h5>
            {order.map((orderItem) => (
              <div key={orderItem.orderDetailID} className="order-section">
                {/* Product Information */}
                <div>
                  <p><span className="detail-title">Diamond Name:</span> <span className="detail-info">{orderItem.diamondName}</span></p>
                  {orderItem.jewelryName && <p><span className="detail-title">Jewelry Name:</span> <span className="detail-info">{orderItem.jewelryName}</span></p>}
                  <p><span className="detail-title">Quantity:</span> <span className="detail-info">{orderItem.quantity}</span></p>
                  <p><span className="detail-title">Price:</span> <span className="detail-info">{orderItem.price.toLocaleString()}</span></p>
                  <p><span className="detail-title">Total Price:</span> <span className="detail-info">{orderItem.totalPrice.toLocaleString()}</span></p>
                </div>
                <hr />

                {/* Images */}
                <div className="order-section">
                  <h5>Images</h5>
                  <p><span className="detail-title">Diamond Image:</span> <br /><a href={orderItem.diamondImage} target="_blank" rel="noopener noreferrer"><img src={orderItem.diamondImage} alt="Diamond" className="diamond-image" /></a></p>
                  {orderItem.jewelryImage && <p><span className="detail-title">Jewelry Image:</span> <br /><a href={orderItem.jewelryImage} target="_blank" rel="noopener noreferrer"><img src={orderItem.jewelryImage} alt="Jewelry" className="jewelry-image" /></a></p>}
                </div>
                <hr />

                {/* Total Amount Information */}
                <div className="order-section">
                  <h5>Total Amount Information</h5>
                  <p><span className="detail-title">Gross Cart Price:</span> <span className="detail-info">{orderItem.grossCartPrice.toLocaleString()}</span></p>
                </div>
                <hr />
                <div className="order-section">
                  <h5>Certificate Information</h5>
                  <p><span className="detail-title">Certificate:</span> <br /><a href={order[0].order.certificateImage} target="_blank" rel="noopener noreferrer"><img src={order[0].order.certificateImage} alt="Certificate" className="certificate-image" /></a></p>
                  <p><span className="detail-title">Warranty Image:</span> <br /><a href={order[0].order.warrantyImage} target="_blank" rel="noopener noreferrer"><img src={order[0].order.warrantyImage} alt="Warranty" className="warranty-image" /></a></p>
                </div>
                <hr />
              </div>
            ))}
            <div className="order-section">
                  <h5>Total Order Information</h5>
                  <p><span className="detail-title">Total Order:</span> <span className="detail-info">{order[0].order.totalOrder.toLocaleString()}</span></p>
                </div>
          </>
        ) : (
          <p>Thông tin chi tiết của đơn hàng sẽ được hiển thị khi bạn đã thanh toán thành công</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OrderSidebar;