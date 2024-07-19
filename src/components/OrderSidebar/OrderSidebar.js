import Offcanvas from 'react-bootstrap/Offcanvas';
import './OrderSidebar.css';

function OrderSidebar({ order, show, onHide }) {
  console.log("OrderSidebar props:", order, show);

  return (
    <Offcanvas show={show} onHide={onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="order-detail">Thông tin chi tiết</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {order && order.length > 0 ? (
          <>
            <div className="order-section">
              <h5>Thông tin tài khoản</h5>
              <p><span className="detail-title">Tên Tài Khoản:</span> <span className="detail-info">{order[0].order.account?.accountName}</span></p>
              <p><span className="detail-title">Số điện thoại:</span> <span className="detail-info">{order[0].order.account?.phoneNumber}</span></p>
              <p><span className="detail-title">Email:</span> <span className="detail-info">{order[0].order.account?.email}</span></p>
              <p><span className="detail-title">Địa chỉ:</span> <span className="detail-info">{order[0].order.account?.addressAccount}</span></p>
            </div>
            <hr />
            <div className="order-section">
              <h5>Thông tin đơn hàng</h5>
              <p><span className="detail-title">ID Đơn hàng:</span> <span className="detail-info">{order[0].order.orderID}</span></p>
              <p><span className="detail-title">Ngày đặt hàng:</span> <span className="detail-info">{order[0].order.startorderDate}</span></p>
              <p><span className="detail-title">Ngày giao hàng:</span> <span className="detail-info">{order[0].order.deliveryDate}</span></p>
              <p><span className="detail-title">Tình trạng:</span> <span className="detail-info">{order[0].order.orderStatus}</span></p>
              <p><span className="detail-title">Địa chỉ giao hàng:</span> <span className="detail-info">{order[0].order.deliveryAddress}</span></p>
            </div>
            <hr />
            <h5 style={{ fontWeight: "bold" }}>Thông tin sản phẩm</h5>
            {order.map((orderItem) => (
              <div key={orderItem.orderDetailID} className="order-section">
                <div>
                  <p><span className="detail-title">Tên kim cương:</span> <span className="detail-info">{orderItem.diamondName}</span></p>
                  {orderItem.jewelryName && <p><span className="detail-title">Tên trang sức:</span> <span className="detail-info">{orderItem.jewelryName}</span></p>}
                  <p><span className="detail-title">Số lượng:</span> <span className="detail-info">{orderItem.quantity}</span></p>
                  <p><span className="detail-title">Giá:</span> <span className="detail-info">{orderItem.price.toLocaleString()}</span></p>
                  <p><span className="detail-title">Tổng giá:</span> <span className="detail-info">{orderItem.totalPrice.toLocaleString()}</span></p>
                </div>
                <hr />
                <div className="order-section">
                  <h5>Hình ảnh</h5>
                  {orderItem.diamondImage ? (
                    <p><span className="detail-title">Hình ảnh kim cương:</span> <br /><a href={orderItem.diamondImage} target="_blank" rel="noopener noreferrer"><img src={orderItem.diamondImage} alt="Diamond" className="diamond-image" /></a></p>
                  ) : (
                    <p><span className="detail-title">Hình ảnh kim cương:</span> N/A</p>
                  )}
                  {orderItem.jewelryImage ? (
                    <p><span className="detail-title">Hình ảnh trang sức:</span> <br /><a href={orderItem.jewelryImage} target="_blank" rel="noopener noreferrer"><img src={orderItem.jewelryImage} alt="Jewelry" className="jewelry-image" /></a></p>
                  ) : (
                    <p><span className="detail-title">Hình ảnh trang sức:</span> N/A</p>
                  )}
                </div>
                <hr />
                <div className="order-section">
                  <h5>Thông tin tổng </h5>
                  <p><span className="detail-title">Giá chưa phí:</span> <span className="detail-info">{orderItem.grossCartPrice.toLocaleString()}</span></p>
                </div>
                <hr />
                <div className="order-section">
                  <h5>Thông tin chứng nhận</h5>
                  {order[0].order.certificateImage ? (
                    <p><span className="detail-title">Chứng nhận:</span> <br /><a href={order[0].order.certificateImage} target="_blank" rel="noopener noreferrer"><img src={order[0].order.certificateImage} alt="Certificate" className="certificate-image" /></a></p>
                  ) : (
                    <p><span className="detail-title">Chứng nhận:</span> N/A</p>
                  )}
                  {order[0].order.warrantyImage ? (
                    <p><span className="detail-title">Bảo hành:</span> <br /><a href={order[0].order.warrantyImage} target="_blank" rel="noopener noreferrer"><img src={order[0].order.warrantyImage} alt="Warranty" className="warranty-image" /></a></p>
                  ) : (
                    <p><span className="detail-title">Bảo hành:</span> N/A</p>
                  )}
                </div>
                <hr />
              </div>
            ))}
            <div className="order-section">
              <h5>Thông tin tổng đơn đặt hàng</h5>
              <p><span className="detail-title">Tổng giá đơn hàng:</span> <span className="detail-info">{order[0].order.totalOrder.toLocaleString()}</span></p>
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