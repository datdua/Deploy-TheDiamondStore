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
              <p><span className="detail-title">Tên Tài Khoản:</span> <span className="detail-info">{order[0].order.account.accountName}</span></p>
              {order[0].order.phoneNumber && <p><span className="detail-title">Số điện thoại:</span> <span className="detail-info">{order[0].order.phoneNumber}</span></p>}
              {order[0].order.account.email && <p><span className="detail-title">Email:</span> <span className="detail-info">{order[0].order.account.email}</span></p>}
              {order[0].order.deliveryAddress && <p><span className="detail-title">Địa chỉ:</span> <span className="detail-info">{order[0].order.deliveryAddress}</span></p>}
            </div>
            <hr />
            <div className="order-section">
              <h5>Thông tin đơn hàng</h5>
              <p><span className="detail-title">ID Đơn hàng:</span> <span className="detail-info">{order[0].order.orderID}</span></p>
              <p><span className="detail-title">Ngày đặt hàng:</span> <span className="detail-info">{order[0].order.startorderDate}</span></p>
              <p><span className="detail-title">Ngày giao hàng:</span> <span className="detail-info">{order[0].order.deliveryDate}</span></p>
              <p><span className="detail-title">Tình trạng:</span> <span className="detail-info">{order[0].order.orderStatus}</span></p>
              {order[0].order.deliveryAddress && <p><span className="detail-title">Địa chỉ giao hàng:</span> <span className="detail-info">{order[0].order.deliveryAddress}</span></p>}
              {order[0].order.promotionCode && <p><span className="detail-title">Mã khuyến mãi:</span> <span className="detail-info">{order[0].order.promotionCode}</span></p>}
              {order[0].order.transactionNo && <p><span className="detail-title">Số giao dịch:</span> <span className="detail-info">{order[0].order.transactionNo}</span></p>}
            </div>
            <hr />
            <h5 style={{ fontWeight: "bold" }}>Thông tin sản phẩm</h5>
            {order.map((orderItem) => (
              <div key={orderItem.orderDetailID} className="order-section">
                <div>
                  {orderItem.diamondName && <p><span className="detail-title">Tên kim cương:</span> <span className="detail-info">{orderItem.diamondName}</span></p>}
                  {orderItem.jewelryName && <p><span className="detail-title">Tên trang sức:</span> <span className="detail-info">{orderItem.jewelryName}</span></p>}
                  <p><span className="detail-title">Số lượng:</span> <span className="detail-info">{orderItem.quantity}</span></p>
                  {orderItem.sizeJewelry && <p><span className="detail-title">Kích thước trang sức:</span> <span className="detail-info">{orderItem.sizeJewelry}</span></p>}
                  <p><span className="detail-title">Giá:</span> <span className="detail-info">{orderItem.price.toLocaleString()}</span></p>
                  <p><span className="detail-title">Giá đã bao gồm phí</span> <span className="detail-info">{orderItem.totalPrice.toLocaleString()}</span></p>
                </div>
                <hr />
                <div className="order-section">
                  <h5>Hình ảnh</h5>
                  {orderItem.diamondImage && (
                    <p><span className="detail-title">Hình ảnh kim cương:</span> <br /><a href={orderItem.diamondImage} target="_blank" rel="noopener noreferrer"><img src={orderItem.diamondImage} alt="Diamond" className="diamond-image" /></a></p>
                  )}
                  {orderItem.jewelryImage && (
                    <p><span className="detail-title">Hình ảnh trang sức:</span> <br /><a href={orderItem.jewelryImage} target="_blank" rel="noopener noreferrer"><img src={orderItem.jewelryImage} alt="Jewelry" className="jewelry-image" /></a></p>
                  )}
                </div>
                <hr />
                <div className="order-section">
                  <p><span className="detail-title">Tổng giá giỏ hàng:</span> <span className="detail-info">{orderItem.grossCartPrice.toLocaleString()}</span></p>
                </div>
                <hr />
                <div className="order-section">
                  <h5>Thông tin chứng nhận</h5>
                  {orderItem.diamondCertificateImage && (
                    <p><span className="detail-title">Chứng nhận kim cương:</span> <br /><a href={orderItem.diamondCertificateImage} target="_blank" rel="noopener noreferrer"><img src={orderItem.diamondCertificateImage} alt="Diamond Certificate" className="certificate-image" /></a></p>
                  )}
                  {orderItem.diamondWarrantyImage && (
                    <p><span className="detail-title">Bảo hành kim cương:</span> <br /><a href={orderItem.diamondWarrantyImage} target="_blank" rel="noopener noreferrer"><img src={orderItem.diamondWarrantyImage} alt="Diamond Warranty" className="warranty-image" /></a></p>
                  )}
                  {orderItem.jewelryWarrantyImage && (
                    <p><span className="detail-title">Bảo hành trang sức:</span> <br /><a href={orderItem.jewelryWarrantyImage} target="_blank" rel="noopener noreferrer"><img src={orderItem.jewelryWarrantyImage} alt="Jewelry Warranty" className="warranty-image" /></a></p>
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