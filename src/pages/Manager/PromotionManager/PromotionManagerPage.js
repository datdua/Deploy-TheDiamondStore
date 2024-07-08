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
import { getAllPromotions, deletePromotion } from "../../../api/PromotionAPI";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPromotionForm from "../../../components/PromotionCRUD/AddPromotionForm";
import UpdatePromotionForm from "../../../components/PromotionCRUD/UpdatePromotionForm";
import DeletePromotionForm from "../../../components/PromotionCRUD/DeletePromotionForm";
import { Pagination, Tooltip, Checkbox, FormControlLabel } from "@mui/material";
import "../ProductManager.css";

function PromotionManagerPage() {
  const [promotionData, setPromotionData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
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

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];
    }

    setSelected(newSelected);
    setSelectAll(newSelected.length === promotionData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < promotionData.length);
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    setSelected(event.target.checked ? promotionData.map((promotion) => promotion.promotionID) : []);
    setIndeterminate(false);
  };

  const handleCheckboxChange = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];
    }

    setSelected(newSelected);
    setSelectAll(newSelected.length === promotionData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < promotionData.length);
  };

  const handleDeletePromotion = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA các giá kim cương này?")) {
      try {
        await deletePromotion(selected);
        setPromotionData(promotionData.filter((promotion) => !selected.includes(promotion.promotionID)));
        setSelected([]);
        alert("Xóa thành công");
      } catch (error) {
        alert("Xóa thất bại");
      }
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

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
                Danh Sách Mã Giảm Giá
                <Button
                  variant="link"
                  style={{ textDecoration: "none" }}
                  onClick={refreshTable}
                >
                  <RefreshIcon style={{ margin: "0 5px 5px 0" }} /> Tải Lại
                </Button>
                <Button
                  variant="link"
                  style={{ textDecoration: "none" }}
                  onClick={() => setShowModal(true)}
                >
                  <AddIcon style={{ margin: "0 5px 5px 0" }} /> Thêm Mã Khuyến Mãi
                </Button>
                {selected.length > 0 && (
                  <Tooltip describeChild title="Xóa các mã khuyến mãi đã chọn" arrow placement="top">
                    <Button variant="link" onClick={handleDeletePromotion} style={{ color: "red" }}>
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                )}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table striped bordered hover className="account-table">
                  <thead>
                    <tr>
                      <th>
                        <FormControlLabel
                          className="checkbox-align"
                          control={
                            <Checkbox
                              color="primary"
                              indeterminate={indeterminate}
                              checked={selectAll}
                              onChange={handleSelectAllChange}
                            />
                          }
                        />
                      </th>
                      <th>Mã Code Khuyến Mãi</th>
                      <th>Ngày Bắt Đầu</th>
                      <th>Ngày Kết Thúc</th>
                      <th>Số Tiền Giảm Giá</th>
                      <th>Tình Trạng</th>
                      <th>Mô Tả</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((promotion) => {
                      const isItemSelected = isSelected(promotion.promotionID);

                      return (
                        <tr
                          key={promotion.promotionI}
                          style={{ cursor: 'pointer' }}
                        >
                          <td onClick={(event) => handleClick(event, promotion.promotionID)}>
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onChange={(event) => handleCheckboxChange(event, promotion.promotionID)}
                            />
                          </td>
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
                          </td>
                        </tr>
                      );
                    })}
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
            {isUpdating ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}
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
