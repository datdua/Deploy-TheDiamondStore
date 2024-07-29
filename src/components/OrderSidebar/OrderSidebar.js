import { Modal, Card, Row, Col, Image, Button } from 'react-bootstrap';
import './OrderSidebar.css';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

function OrderSidebar({ order, show, onHide }) {
  console.log("OrderSidebar props:", order, show);
  const printOrderDetails = () => {
    const printWindow = window.open('', '', 'height=600,width=800');

    printWindow.document.write('<html><head><title>The Diamond Store</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; } .order-section { margin-bottom: 20px; } .card-header-custom { font-weight: bold; font-size: 1.5rem; color: #f2ba59; background-color: #ffffff; border-bottom: 2px solid #f2ba59; } img { max-width: 300px; max-height: 300px; margin-top: 10px; display: block; margin-left: auto; margin-right: auto; }</style>');
    printWindow.document.write('</head><body >');
    printWindow.document.write('<h1>Hoá đơn mua hàng</h1>');
    order.forEach(orderItem => {
      printWindow.document.write(`<h2>ID đơn hàng: ${orderItem.orderDetailID}</h2>`);
      if (orderItem.diamond) printWindow.document.write(`<p><strong>Tên kim cương:</strong> ${orderItem.diamond.diamondName}</p>`);
      if (orderItem.jewelry) printWindow.document.write(`<p><strong>Tên trang sức:</strong> ${orderItem.jewelry.jewelryName}</p>`);
      printWindow.document.write(`<p><strong>Số lượng:</strong> ${orderItem.quantity}</p>`);
      if (orderItem.sizeJewelry) printWindow.document.write(`<p><strong>Size nhẫn:</strong> ${orderItem.sizeJewelry}</p>`);
      if (orderItem.diamond) printWindow.document.write(`<p><strong>Đơn giá:</strong> ${orderItem.diamond.diamondEntryPrice.toLocaleString()} VND</p>`);
      if (orderItem.jewelry) printWindow.document.write(`<p><strong>Đơn giá:</strong> ${orderItem.jewelry.jewelryEntryPrice.toLocaleString()} VND</p>`);
      if (orderItem.diamond) printWindow.document.write(`<p><strong>Giá đã bao gồm phí:</strong> ${orderItem.diamond.grossDiamondPrice.toLocaleString()} VND</p>`);
      if (orderItem.jewelry) printWindow.document.write(`<p><strong>Giá đã bao gồm phí:</strong> ${orderItem.jewelry.grossJewelryPrice.toLocaleString()} VND</p>`);

      if (orderItem.diamond && orderItem.diamond.diamondImage) printWindow.document.write(`<p><strong>Hình ảnh kim cương:</strong><br /><img src="${orderItem.diamond.diamondImage}" /></p>`);
      if (orderItem.jewelry && orderItem.jewelry.jewelryImage) printWindow.document.write(`<p><strong>Hình ảnh trang sức:</strong><br /><img src="${orderItem.jewelry.jewelryImage}" /></p>`);
      if (orderItem.diamondCertificateImage) printWindow.document.write(`<p><strong>DChứng chỉ kim cương:</strong><br /><img src="${orderItem.diamondCertificateImage}" /></p>`);
      if (orderItem.warranty) {
        if (orderItem.warranty.diamondID) {
          printWindow.document.write(`<p><strong>Bảo hành kim cương:</strong><br /><img src="${orderItem.warranty.warrantyImage}" /></p>`);
          printWindow.document.write(`<p><strong>Ngày bắt đầu:</strong> ${new Date(orderItem.warrantyHistories[0].effectiveDate).toLocaleDateString()}</p>`);
          printWindow.document.write(`<p><strong>Ngày hết hạn bảo hành:</strong> ${new Date(orderItem.warrantyHistories[0].expirationDate).toLocaleDateString()}</p>`);
        }
        if (orderItem.warranty.jewelryID) {
          printWindow.document.write(`<p><strong>Bảo hành trang sức:</strong><br /><img src="${orderItem.warranty.warrantyImage}" /></p>`);
          printWindow.document.write(`<p><strong>Ngày bắt đầu:</strong> ${new Date(orderItem.warrantyHistories[0].effectiveDate).toLocaleDateString()}</p>`);
          printWindow.document.write(`<p><strong>Ngày hết hạn bảo hành:</strong> ${new Date(orderItem.warrantyHistories[0].expirationDate).toLocaleDateString()}</p>`);
        }
      }
    });

    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const renderOrderInfo = (orderItem) => (
    <Card key={orderItem.orderDetailID} className="order-section mb-3" >
      <Card.Body>
        {orderItem.diamond && orderItem.diamond.diamondName && <Card.Text><strong>Tên kim cương:</strong> {orderItem.diamond.diamondName}</Card.Text>}
        {orderItem.jewelry && orderItem.jewelry.jewelryName && <Card.Text><strong>Tên trang sức:</strong> {orderItem.jewelry.jewelryName}</Card.Text>}
        <Card.Text><strong>Số lượng:</strong> {orderItem.quantity}</Card.Text>
        {orderItem.sizeJewelry && <Card.Text><strong>Kích thước trang sức:</strong> {orderItem.sizeJewelry}</Card.Text>}
        {orderItem.diamond && orderItem.diamond.diamondEntryPrice && <Card.Text><strong>Đơn giá:</strong> {orderItem.diamond.diamondEntryPrice.toLocaleString()} VND</Card.Text>}
        {orderItem.jewelry && orderItem.jewelry.jewelryEntryPrice && <Card.Text><strong>Đơn giá:</strong> {orderItem.jewelry.jewelryEntryPrice.toLocaleString()} VND</Card.Text>}
        {orderItem.diamond && orderItem.diamond.grossDiamondPrice && <Card.Text><strong>Giá đã bao gồm phí:</strong> {orderItem.diamond.grossDiamondPrice.toLocaleString()} VND</Card.Text>}
        {orderItem.jewelry && orderItem.jewelry.grossJewelryPrice && <Card.Text><strong>Giá đã bao gồm phí:</strong> {orderItem.jewelry.grossJewelryPrice.toLocaleString()} VND</Card.Text>}
      </Card.Body>
      <Card.Footer>      
        <h5>Hình ảnh sản phẩm</h5>
        <Row>
          {orderItem.diamond && orderItem.diamond.diamondImage && (
            <Col>
              <a href={orderItem.diamond.diamondImage} target="_blank" rel="noopener noreferrer">
                <Image src={orderItem.diamond.diamondImage} alt="Diamond" thumbnail className='diamond-image'/>
              </a>
            </Col>
          )}
          {orderItem.jewelry && orderItem.jewelry.jewelryImage && (
            <Col>
              <a href={orderItem.jewelry.jewelryImage} target="_blank" rel="noopener noreferrer">
                <Image src={orderItem.jewelry.jewelryImage} alt="Jewelry" thumbnail className='jewelry-image'/>
              </a>
            </Col>
          )}
        </Row>
        <h5>Thông tin chứng nhận</h5>
        {orderItem.diamondCertificateImage && (
          <p><strong>Chứng nhận kim cương:</strong> <br /><a href={orderItem.diamondCertificateImage} target="_blank" rel="noopener noreferrer"><Image src={orderItem.diamondCertificateImage} alt="Diamond Certificate" thumbnail className='certificate-image'/></a></p>
        )}
        {orderItem.warranty && orderItem.warranty.diamondID && (
          <>
            <p><strong>Bảo hành kim cương:</strong> <br /><a href={orderItem.warranty.warrantyImage} target="_blank" rel="noopener noreferrer"><Image src={orderItem.warranty.warrantyImage} alt="Diamond Warranty" thumbnail className='warranty-image'/></a></p>
            <p><strong>Ngày bắt đầu bảo hành:</strong> {new Date(orderItem.warrantyHistories[0].effectiveDate).toLocaleDateString()}</p>
            <p><strong>Ngày hết hạn bảo hành:</strong> {new Date(orderItem.warrantyHistories[0].expirationDate).toLocaleDateString()}</p>
          </>
        )}
        {orderItem.warranty && orderItem.warranty.jewelryID && (
          <>
            <p><strong>Bảo hành trang sức:</strong> <br /><a href={orderItem.warranty.warrantyImage} target="_blank" rel="noopener noreferrer"><Image src={orderItem.warranty.warrantyImage} alt="Jewelry Warranty" thumbnail className='warranty-image'/></a></p>
            <p><strong>Ngày bắt đầu bảo hành:</strong> {new Date(orderItem.warrantyHistories[0].effectiveDate).toLocaleDateString()}</p>
            <p><strong>Ngày hết hạn bảo hành:</strong> {new Date(orderItem.warrantyHistories[0].expirationDate).toLocaleDateString()}</p>
          </>
        )}
      </Card.Footer>
    </Card>
  );

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
      <div className="d-flex justify-content-between align-items-center w-100">
        <Modal.Title className="order-detail">Thông tin đơn hàng chi tiết</Modal.Title>
        <Button variant="warning" onClick={printOrderDetails}><PrintOutlinedIcon/></Button>
      </div>
      </Modal.Header>
      <Modal.Body>
        {order && order.length > 0 ? (
          <>
            <Card className="order-section mb-3" style={{
                marginBottom: '20px',
                border: '2px solid #f2ba59'
            }}>
              <Card.Header className="card-header-custom" style={{
                fontWeight: 'bold',
                fontSize: '1.5rem', 
                backgroundColor: '#ffffff',
                borderBottom: '2px solid #f2ba59'
              }}>
                Thông tin tài khoản
              </Card.Header>
              <Card.Body>
                {order[0].account && (
                  <>
                    <Card.Text><strong>Tên Tài Khoản:</strong> {order[0].account.accountName}</Card.Text>
                    {order[0].account.phoneNumber && <Card.Text><strong>Số điện thoại:</strong> {order[0].account.phoneNumber}</Card.Text>}
                    {order[0].account.email && <Card.Text><strong>Email:</strong> {order[0].account.email}</Card.Text>}
                    {order[0].account.addressAccount && <Card.Text><strong>Địa chỉ:</strong> {order[0].account.addressAccount}</Card.Text>}
                  </>
                )}
              </Card.Body>
            </Card>

            <Card className="order-section mb-3" style={{
                marginBottom: '20px',
                border: '2px solid #f2ba59'
            }}>
              <Card.Header className="card-header-custom" style={{
                fontWeight: 'bold',
                fontSize: '1.5rem', 
                backgroundColor: '#ffffff',
                borderBottom: '2px solid #f2ba59'

              }}>
                Thông tin đơn hàng
              </Card.Header>
              <Card.Body>
                {order[0].order && (
                  <>
                    {order[0].order.phoneNumber && <Card.Text><strong>Số điện thoại:</strong> {order[0].order.phoneNumber}</Card.Text>}
                    {order[0].order.deliveryAddress && <Card.Text><strong>Địa chỉ giao hàng:</strong> {order[0].order.deliveryAddress}</Card.Text>}             
                    {order[0].order.startorderDate && <Card.Text><strong>Ngày đặt hàng:</strong> {new Date(order[0].order.startorderDate).toLocaleString()}</Card.Text>}
                    {order[0].order.deliveryDate && <Card.Text><strong>Ngày giao hàng dự kiến:</strong> {new Date(order[0].order.deliveryDate).toLocaleString()}</Card.Text>}
                    {order[0].order.transactionNo && <Card.Text><strong>Mã giao dịch:</strong> {order[0].order.transactionNo}</Card.Text>}
                  </>
                )}
              </Card.Body>
            </Card>

            <Card className="order-section mb-3" style={{
                marginBottom: '20px',
                border: '2px solid #f2ba59'
            }}>
              <Card.Header className="card-header-custom" style={{
                fontWeight: 'bold',
                fontSize: '1.5rem', 
                backgroundColor: '#ffffff',
                borderBottom: '2px solid #f2ba59'
              }}>Chi tiết sản phẩm</Card.Header>
              <Card.Body>
                {order.map(renderOrderInfo)}
              </Card.Body>
            </Card>

            <Card className="order-section mb-3" style={{
                marginBottom: '20px',
                border: '2px solid #f2ba59'
            }}>
              <Card.Header className="card-header-custom" style={{
                fontWeight: 'bold',
                fontSize: '1.5rem', 
                backgroundColor: '#ffffff',
                borderBottom: '2px solid #f2ba59'
              }}>Thông tin tổng đơn đặt hàng</Card.Header>
              <Card.Body>
                {order[0].order && (
                  <>                
                    {order[0].order.promotionCode && <Card.Text><strong>Mã khuyến mãi:</strong> {order[0].order.promotionCode} | {order[0].promotion.description}</Card.Text>} 
                    {order[0].order.accountPoint != null && <Card.Text><strong>Điểm sử dụng:</strong> {order[0].order.accountPoint} (100 điểm = 1,000,000 VND)</Card.Text>}
                    <hr/>
                    <Card.Text><strong>Tổng giá (đã bao gồm phí):</strong> {order[0].order.subtotalOrder.toLocaleString()} VND</Card.Text>                                    
                    <Card.Text><strong>Tổng giảm giá:</strong> - {(order[0].order.subtotalOrder - order[0].order.totalOrder).toLocaleString()} VND</Card.Text>
                    <hr/>
                    <Card.Text><strong>Tổng giá đơn hàng:</strong> {order[0].order.totalOrder.toLocaleString()} VND</Card.Text>
                  </>
                )}
              </Card.Body>
            </Card>
          </>
        ) : (
          <p>Thông tin chi tiết của đơn hàng sẽ được hiển thị khi bạn đã thanh toán thành công</p>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default OrderSidebar;
