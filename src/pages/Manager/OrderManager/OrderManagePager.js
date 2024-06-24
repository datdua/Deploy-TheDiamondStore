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
import { deleteOrder, getAllOrder } from "../../../api/OrderAPI";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateOrderForm from "../../../components/OrderCRUD/OrderUpdate";
import DeleteOrderForm from "../../../components/OrderCRUD/OrderDelete";
import { Pagination, Tooltip } from "@mui/material";
import "../ProductManager.css";

function OrderManagerPage() {
  const [orderData, setOrderData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleDelete = async (orderID) => {
    try {
      await deleteOrder(orderID);
      setOrderData(orderData.filter((order) => order.orderID !== orderID));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const refreshTable = () => {
    getAllOrder().then((data) => {
      setOrderData(data);
    });
  };

  useEffect(() => {
    getAllOrder()
      .then((data) => setOrderData(data))
      .catch((error) => console.error("Failed to fetch order data:", error));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                Order List
                <Button
                  variant="link"
                  style={{ textDecoration: "none" }}
                  onClick={refreshTable}
                >
                  <RefreshIcon style={{ margin: "0 5px 5px 0" }} /> REFRESH
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table striped bordered hover className="account-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Order ID</th>
                      <th>Account ID</th>
                      <th>Start Order Date</th>
                      <th>Order Status</th>
                      <th>Delivery Date</th>
                      <th>Total Order</th>
                      <th>Delivery Address</th>
                      <th>Phone Number</th>
                      <th>Certificate Image</th>
                      <th>Warranty Image</th>
                      <th>Promotion Code</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((order, index) => (
                      <tr key={index}>
                        <td>{startIndex + index + 1}</td>
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
                            alt="Certificate"
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>
                          <img
                            src={order.warrantyImage}
                            alt="Warranty"
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>{order.promotionCode}</td>
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
                          <DeleteOrderForm
                            orderID={order.orderID}
                            onDelete={handleDelete}
                          />
                        </td>
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
          <Modal.Title>{isUpdating ? "Update Order" : "Add Order"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <UpdateOrderForm order={selectedOrder} onClose={handleClose} />
          ) : (
            <div>Add Order Form Here</div> // Placeholder for Add Order Form if needed
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default OrderManagerPage;
