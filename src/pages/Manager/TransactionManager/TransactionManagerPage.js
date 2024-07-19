import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Container,
  Card,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import { getOrdersHaveTransactionNo } from "../../../api/OrderAPI";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import UpdateOrderForm from "../../../components/OrderCRUD/OrderUpdate";
import { Pagination, Tooltip } from "@mui/material";
import "../ProductManager.css";

function TransactionManagerPage() {
  const [orderData, setOrderData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const size = 8;

  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const currentPageData = orderData.slice(startIndex, endIndex);

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const handleShowUpdate = (order) => {
    setSelectedOrder(order);
    setIsUpdating(true);
    setShowModal(true);
  };


  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const refreshTable = () => {
    getOrdersHaveTransactionNo().then((data) => {
      setOrderData(data);
    });
  };

  const handleShowImage = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImage("");
  };

  useEffect(() => {
    getOrdersHaveTransactionNo()
      .then((data) => setOrderData(data))
      .catch((error) => console.error("Failed to fetch order data:", error));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title
                as="h4"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                }}
              >
                <div>
                  Giao Dịch
                  <Button
                    variant="link"
                    style={{ textDecoration: "none" }}
                    onClick={refreshTable}
                  >
                    <RefreshIcon style={{ margin: "0 5px 5px 0" }} /> Tải Lại
                  </Button>
                </div>
                <Button
                  variant="primary"
                  onClick={() =>
                    window.open(
                      "https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm",
                      "_blank"
                    )
                  }
                >
                  Quản lí giao dịch VNPay
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table striped bordered hover className="account-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Mã Giao Dịch</th>
                      <th>Mã Đơn Hàng</th>
                      <th>Mã Tài Khoản</th>
                      <th>Ngày Bắt Đầu Đơn Hàng</th>
                      <th>Tình Trạng Đơn Hàng</th>
                      <th>Ngày Giao Hàng</th>
                      <th>Tổng Đơn</th>
                      <th>Địa Chỉ Giao Hàng</th>
                      <th>Số Điện Thoại</th>
                      <th>Giấy Chứng Nhận</th>
                      <th>Giấy Bảo Hành</th>
                      <th>Mã Khuyến Mãi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((order, index) => (
                      <tr key={index}>
                        <td>{startIndex + index + 1}</td>
                        <td>
                          <a
                            href={`https://sandbox.vnpayment.vn/merchantv2/Transaction/PaymentDetail/${order.transactionNo}.htm`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "blue",
                              textDecoration: "underline",
                            }}
                          >
                            {order.transactionNo}
                          </a>
                        </td>
                        <td>{order.orderID}</td>
                        <td>{order.account.accountID}</td>
                        <td>{order.startorderDate}</td>
                        <td>{order.orderStatus}</td>
                        <td>{order.deliveryDate}</td>
                        <td>
                          {order.totalOrder
                            ? order.totalOrder.toLocaleString() + " VNĐ"
                            : "N/A"}
                        </td>
                        <td>{order.deliveryAddress}</td>
                        <td>{order.phoneNumber}</td>
                        <td>
                          <img
                            src={order.certificateImage}
                            style={{ width: "50px", height: "50px", cursor: "pointer" }}
                            onClick={() => handleShowImage(order.certificateImage)}
                          />
                        </td>
                        <td>
                          <img
                            src={order.warrantyImage}
                            style={{ width: "50px", height: "50px", cursor: "pointer" }}
                            onClick={() => handleShowImage(order.warrantyImage)}
                          />
                        </td>
                        <td>{order.promotionCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <Card.Footer>
              <Pagination
                count={Math.ceil(orderData.length / size)}
                page={currentPage}
                onChange={handleChangePage}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isUpdating ? "Cập Nhật Đơn Hàng" : "Thêm Đơn Hàng"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <UpdateOrderForm order={selectedOrder} onClose={handleClose} />
          ) : (
            <div>Add Order Form Here</div>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showImageModal} onHide={handleCloseImageModal} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={selectedImage}
            alt="Hình ảnh bị lỗi. Vui lòng kiểu tra lại địa chỉ hình ảnh"
            style={{ width: "100%"}}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default TransactionManagerPage;