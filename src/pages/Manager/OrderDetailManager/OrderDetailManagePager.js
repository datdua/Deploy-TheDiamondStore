import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Container,
  Card,
  Table,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { getAllOrder, getOrderDetailManager, fetchOrderDetailManager } from "../../../api/OrderAPI";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from '@mui/icons-material/Search';
import OrderSidebar from "../../../components/OrderSidebar/OrderSidebar";
import UpdateOrderForm from "../../../components/OrderCRUD/OrderUpdate";
import { Pagination, Tooltip } from "@mui/material";
import { toast } from "react-toastify";
import "../ProductManager.css";

function OrderManagerPage() {
  const [orderData, setOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const userRole = localStorage.getItem("role");
  const size = 9;

  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const showAlert = () => {
    toast.warning("Rất tiếc, chức năng này chỉ dành cho quản lý và nhân viên bán hàng!");
  };


  const handleViewOrder = async (orderID) => {
    try {
      const orderDetails = await fetchOrderDetailManager(orderID);
      setSelectedOrder(orderDetails);
      setShowSidebar(true);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
    setSelectedOrder(null);
  };

  const handleStatusOrder = (orderStatus) => {
    if (orderStatus === "Đã thanh toán") {
      return (
        <h6 style={{ marginTop: '10px' }}>
          <Badge pill bg="success">Đã thanh toán</Badge>
        </h6>
      );
    } else if (orderStatus === "Đang xử lý") {
      return (
        <h6 style={{ marginTop: '10px' }}>
          <Badge pill bg="warning" text="dark">Đang xử lý</Badge>
        </h6>
      );
    } else {
      return (
        <h6 style={{ marginTop: '10px' }}>
          <Badge pill bg="danger">Thanh toán thất bại</Badge>
        </h6>
      );
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImage("");
  };

  const handleShowUpdate = (order) => {
    if (userRole !== "ROLE_SALE-STAFF" && userRole !== "ROLE_MANAGER") {
      showAlert();
    } else {
      setSelectedOrder(order);
      setIsUpdating(true);
      setShowModal(true);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const refreshTable = () => {
    getAllOrder().then((data) => {
      setOrderData(data);
      setFilteredData(data);
    });
  };

  const handleShowImage = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowImageModal(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orderData.filter((order) => {
      const orderIDSearch = String(order.orderID).toLowerCase();
      const accountNameSearch = String(order.account.accountName).toLowerCase();
      const transactionNoSearch = String(order.transactionNo).toLowerCase();
  
      return orderIDSearch.includes(query) || accountNameSearch.includes(query) || transactionNoSearch.includes(query);
    });
  
    setFilteredData(filtered);
  };

  useEffect(() => {
    getAllOrder()
      .then((data) => {
        setOrderData(data);
        setFilteredData(data);
      })
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
                  Quản Lý Đơn Hàng
                  <Button
                    variant="link"
                    style={{ textDecoration: "none", color: "#000000", border: "2px solid #F9B115", marginLeft: "10px" }}
                    onClick={refreshTable}
                  >
                    <RefreshIcon style={{ margin: "0 5px 5px 0" }} /> Tải Lại
                  </Button>
                </div>

                <div className="input-box" style={{ display: "flex", alignItems: "center" }}>
                  <SearchIcon style={{ marginRight: "8px" }} />
                  <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    style={{ margin: "0 5px 5px 0", width: "370px", height: "50px" }}
                    onChange={handleSearch}
                    placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng"
                  />
                </div>

                <Button
                  variant="warning"
                  onClick={() =>
                    window.open(
                      "https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm",
                      "_blank"
                    )
                  }
                >
                  Quản lý giao dịch VNPay
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table hover className="account-table">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Mã giao dịch</th>
                      <th>Ngày tạo đơn</th>
                      <th>Tên khách hàng</th>
                      <th>Trạng thái đơn hàng</th>
                      <th>Ngày giao hàng</th>
                      <th>Tổng tiền</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((order, index) => (
                      <tr key={index}>
                        <td>
                          <button
                            onClick={() => handleViewOrder(order.orderID)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'blue',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                            }}
                          >
                            {order.orderID}
                          </button>
                        </td>
                        <td>
                          {order.transactionNo ? (
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
                          ) : (
                            "------"
                          )}
                        </td>
                        <td>{order.startorderDate}</td>
                        <td>{order.account.accountName}</td>
                        <td>{handleStatusOrder(order.orderStatus)}</td>
                        <td>{order.deliveryDate}</td>
                        <td>
                          {order.totalOrder
                            ? order.totalOrder.toLocaleString() + " VNĐ"
                            : "------"}
                        </td>
                        <td>
                          <Tooltip
                            describeChild
                            title="Cập nhật thông tin"
                            arrow
                            placement="top"
                          >
                            <Button
                              variant="link"
                              onClick={() => handleShowUpdate(order)}
                            >
                              <EditIcon />
                            </Button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {selectedOrder && (
                  <OrderSidebar
                    name="Order Details"
                    order={selectedOrder}
                    show={showSidebar}
                    onHide={handleCloseSidebar}
                  />
                )}
              </div>
            </Card.Body>
            <Card.Footer>
              <Pagination
                count={Math.ceil(filteredData.length / size)}
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
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default OrderManagerPage;