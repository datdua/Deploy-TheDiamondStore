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
import { getAllPromotions } from "../../../api/PromotionAPI";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPromotionForm from "../../../components/PromotionCRUD/AddPromotionForm";
import UpdatePromotionForm from "../../../components/PromotionCRUD/UpdatePromotionForm";
import DeletePromotionForm from "../../../components/PromotionCRUD/DeletePromotionForm";
import { Pagination, Tooltip } from "@mui/material";
import "../ProductManager.css";

function PromotionManagerPage() {
  const [promotionData, setPromotionData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const size = 8;

  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const currentPageData = promotionData.slice(startIndex, endIndex);

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const handleShowUpdate = (promotion) => {
    setSelectedPromotion(promotion);
    setIsUpdating(true);
    setShowModal(true);
  };

  const handleDelete = async (promotionID) => {
    setPromotionData(
      promotionData.filter((promotion) => promotion.promotionID !== promotionID)
    );
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const refreshTable = () => {
    getAllPromotions().then((data) => {
      setPromotionData(data);
    });
  };

  useEffect(() => {
    getAllPromotions()
      .then((data) => {
        setPromotionData(data);
      })
      .catch((error) => {
        console.error("Error fetching promotion data:", error);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                Promotion List
                <Button
                  variant="link"
                  style={{ textDecoration: "none" }}
                  onClick={refreshTable}
                >
                  <RefreshIcon style={{ margin: "0 5px 5px 0" }} /> REFRESH
                </Button>
                <Button
                  variant="link"
                  style={{ textDecoration: "none" }}
                  onClick={() => setShowModal(true)}
                >
                  <AddIcon style={{ margin: "0 5px 5px 0" }} /> ADD
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table striped bordered hover className="account-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Promotion ID</th>
                      <th>Promotion Code</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Discount Amount</th>
                      <th>Status</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((promotion, index) => (
                      <tr key={index}>
                        <td>{startIndex + index + 1}</td>
                        <td>{promotion.promotionID}</td>
                        <td>{promotion.promotionCode}</td>
                        <td>{promotion.startDate}</td>
                        <td>{promotion.endDate}</td>
                        <td>{promotion.discountAmount}</td>
                        <td>{promotion.promotionStatus}</td>
                        <td>{promotion.description}</td>
                        <td>
                          <Tooltip
                            describeChild
                            title="Cập nhật thông tin"
                            arrow placement="top"
                          >
                            <Button
                              variant="link"
                              onClick={() => handleShowUpdate(promotion)}
                            >
                              <EditIcon />
                            </Button>
                          </Tooltip>
                          <DeletePromotionForm
                            promotionID={promotion.promotionID}
                            onDelete={() => handleDelete(promotion.promotionID)}
                          >
                            <DeleteIcon />
                          </DeletePromotionForm>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <Card.Footer>
              <Pagination
                count={Math.ceil(promotionData.length / size)}
                page={currentPage}
                onChange={handleChangePage}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isUpdating ? "Update Promotion" : "Add Promotion"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <UpdatePromotionForm
              promotion={selectedPromotion}
              onClose={handleClose}
            />
          ) : (
            <AddPromotionForm onClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default PromotionManagerPage;
