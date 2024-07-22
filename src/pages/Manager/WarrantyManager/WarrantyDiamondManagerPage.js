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
import {
  deleteWarranty,
  getWarrantyJewelryIDIsNull,
} from "../../../api/WarrantyAPI";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddWarrantyDiamondForm from "../../../components/WarrantyCRUD/AddWarrantyDiamondForm";
import UpdateWarrantyDiamondForm from "../../../components/WarrantyCRUD/UpdateWarrantyDiamondForm";
import { Pagination, Tooltip, Checkbox, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";
import "../ProductManager.css";

function WarrantyManagerPage() {
  const [warrantyData, setWarrantyData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const userRole = localStorage.getItem("role");
  const size = 8;
  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const currentPageData = warrantyData.slice(startIndex, endIndex);

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const showAlert = () => {
    toast.warning("Rất tiếc, chức năng này chỉ dành cho quản lý!")
  }

  const handleShowUpdate = (warranty) => {
    if (userRole !== "ROLE_MANAGER") {
      showAlert();
    } else {
    setSelectedWarranty(warranty);
    setIsUpdating(true);
    setShowModal(true);
    }
  };


  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const refreshTable = () => {
    getWarrantyJewelryIDIsNull().then((data) => {
      setWarrantyData(data);
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
    setSelectAll(newSelected.length === warrantyData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < warrantyData.length);
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
    setSelectAll(newSelected.length === warrantyData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < warrantyData.length);
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    setSelected(event.target.checked ? warrantyData.map((warranty) => warranty.warrantyID) : []);
    setIndeterminate(false);
  };

  const handleDeleteWarranty = async () => {
    if (userRole !== "ROLE_MANAGER") {
      showAlert();
    } else {
    if (window.confirm("Bạn có chắc muốn XÓA các chứng chỉ này?")) {
      try {
        await deleteWarranty(selected);
        setWarrantyData(warrantyData.filter((warranty) => !selected.includes(warranty.warrantyID)));
        setSelected([]);
        alert("Xóa thành công");
      } catch (error) {
        alert("Xóa thất bại");
      }
    }
  }
  };

  useEffect(() => {
    getWarrantyJewelryIDIsNull()
      .then((data) => {
        setWarrantyData(data);
      })
      .catch((error) => {
        console.error("Error fetching warranty data:", error);
      });
  }, []);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                Danh Sách Giấy Bảo Hành
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
                  onClick={() => {
                    if (userRole !== "ROLE_MANAGER") {
                      showAlert();
                    } else {
                      setShowModal(true);
                    }
                  }}
                >
                  <AddIcon style={{ margin: "0 5px 5px 0" }} /> Thêm Giấy Bảo Hành
                </Button>
                {selected.length > 0 && (
                  <Tooltip describeChild title="Xóa các giấy bảo hành đã chọn" arrow placement="top">
                    <Button variant="link" onClick={handleDeleteWarranty} style={{ color: "red" }}>
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
                      <th>Mã Bảo Hành</th>
                      <th>Mã Kim Cương</th>
                      <th>Ngày Hết Hạn</th>
                      <th>Giấy Bảo Hành</th>
                      <th>Tình Trạng</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((warranty) => {
                      const isItemSelected = isSelected(warranty.warrantyID);
                      return (
                        <tr
                          key={warranty.warrantyID}
                          style={{ cursor: 'pointer' }}
                        >
                          <td onClick={(event) => handleClick(event, warranty.warrantyID)}>
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onChange={(event) => handleCheckboxChange(event, warranty.warrantyID)}
                            />
                          </td>
                          <td>{warranty.warrantyID}</td>
                          <td>{warranty.diamondID || "N/A"}</td>
                          <td>{warranty.expirationDate}</td>
                          <td>
                            <img
                              src={warranty.warrantyImage}
                              alt="Warranty"
                              style={{
                                width: "50px",
                                height: "50px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleShowImage(warranty.warrantyImage)
                              }
                            />
                          </td>
                          <td>{warranty.warrantyStatus}</td>
                          <td>
                            <Tooltip
                              describeChild
                              title="Cập nhật thông tin"
                              arrow
                              placement="top"
                            >
                              <Button
                                variant="link"
                                onClick={() => handleShowUpdate(warranty)}
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
                count={Math.ceil(warrantyData.length / size)}
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
            {isUpdating ? "Cập nhật giấy bảo hành" : "Thêm giấy bảo hành"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <UpdateWarrantyDiamondForm
              warranty={selectedWarranty}
              onClose={handleClose}
            />
          ) : (
            <AddWarrantyDiamondForm onClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showImageModal} onHide={handleCloseImageModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Giấy Bảo Hành</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={selectedImage}
            alt="Warranty"
            style={{ width: "100%", height: "500px" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default WarrantyManagerPage;
