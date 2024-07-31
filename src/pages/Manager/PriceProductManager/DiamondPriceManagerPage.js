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
import { getAllDiamondPrice, deleteDiamondPrice } from "../../../api/DiamondPriceAPI.js";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddDiamondPriceForm from "../../../components/DiamondPriceCRUD/AddDiamondPriceForm.js";
import UpdateDiamondPriceForm from "../../../components/DiamondPriceCRUD/UpdateDiamondPriceForm.js";
import CalculatorForm from "../../../components/Calculator/CalculatorForm.js";
import { Pagination, Tooltip, Checkbox, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";
import "../ProductManager.css";

function DiamondPriceManager() {
  const [diamondPriceData, setDiamondPriceData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDiamondPrice, setSelectedDiamondPrice] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const userRole = localStorage.getItem("role");
  const size = 8;
  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const currentPageData = diamondPriceData.slice(startIndex, endIndex);

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const showAlert = () => {
    toast.warning("Rất tiếc, chức năng này chỉ dành cho quản lý!")
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleShowAdd = () => {
    if (userRole !== "ROLE_MANAGER") {
      showAlert();
    } else {
    setSelectedDiamondPrice(null);
    setIsUpdating(false);
    setShowModal(true);
    }
  };

  const handleShowUpdate = (item) => {
    if (userRole !== "ROLE_MANAGER") {
      showAlert();
    } else {
    setSelectedDiamondPrice(item);
    setIsUpdating(true);
    setShowModal(true);
    }
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
    setSelectAll(newSelected.length === diamondPriceData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < diamondPriceData.length);
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    setSelected(event.target.checked ? diamondPriceData.map((diamondPrice) => diamondPrice.diamondPriceID) : []);
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
    setSelectAll(newSelected.length === diamondPriceData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < diamondPriceData.length);
  };

  const handleDeleteDiamondPrice = async () => {
    if (userRole !== "ROLE_MANAGER") {
      showAlert();
    } else {
    if (window.confirm("Bạn có chắc muốn XÓA các giá kim cương này?")) {
      try {
        await deleteDiamondPrice(selected);
        setDiamondPriceData(diamondPriceData.filter((diamondPrice) => !selected.includes(diamondPrice.diamondPriceID)));
        setSelected([]);
        alert("Xóa thành công");
      } catch (error) {
        alert("Xóa thất bại");
      }
    }
    }
  };

  const refreshTable = () => {
    getAllDiamondPrice().then((data) => {
      setDiamondPriceData(data);
    });
  };

  useEffect(() => {
    getAllDiamondPrice()
      .then((data) => setDiamondPriceData(data))
      .catch((error) => console.error(error));
  }, []);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                Quản Lý Giá Kim Cương
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
                  onClick={handleShowAdd}
                >
                  <AddIcon style={{ margin: "0 5px 5px 0" }} /> Thêm Giá Kim Cương
                </Button>
                {selected.length > 0 && (
                  <Tooltip describeChild title="Xóa các giá kim cương đã chọn" arrow placement="top">
                    <Button variant="link" onClick={handleDeleteDiamondPrice} style={{ color: "red" }}>
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                )}
              </Card.Title>
              <CalculatorForm />
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table hover className="account-table">
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
                      <th>Mã Giá Kim Cương</th>
                      <th>Giá Kim Cương</th>
                      <th>Trọng Lượng</th>
                      <th>Độ tinh khiết</th>
                      <th>Màu Sắc</th>
                      <th>Kích cỡ</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((diamondPrice) => {
                      const isItemSelected = isSelected(diamondPrice.diamondPriceID);

                      return (
                        <tr
                          key={diamondPrice.diamondPriceID}
                          style={{ cursor: 'pointer' }}
                        >
                          <td onClick={(event) => handleClick(event, diamondPrice.diamondPriceID)}>
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onChange={(event) => handleCheckboxChange(event, diamondPrice.diamondPriceID)}
                            />
                          </td>
                          <td>{diamondPrice.diamondPriceID}</td>
                          <td>
                            {diamondPrice.diamondEntryPrice
                              ? diamondPrice.diamondEntryPrice.toLocaleString() +
                              " VNĐ"
                              : "Chưa có giá!"}
                          </td>
                          <td>{diamondPrice.weight ? diamondPrice.weight : "N/A"}</td>
                          <td>{diamondPrice.clarity}</td>
                          <td>{diamondPrice.color}</td>
                          <td>{diamondPrice.caratSize}</td>
                          <td>
                            <Tooltip
                              describeChild
                              title="Cập nhật thông tin"
                              arrow
                              placement="top"
                            >
                              <Button
                                variant="link"
                                onClick={() => handleShowUpdate(diamondPrice)}
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
              <Pagination
                count={Math.ceil(diamondPriceData.length / size)}
                page={currentPage}
                onChange={handleChangePage}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <div className="iframe-container">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/RAPAPORT%2FRAPAPORT(1)-NEWEST.png?alt=media&token=76cb1815-f687-4d06-a269-fb1242d4964c"
              alt="Diamond Price Report"
              style={{ width: "100%", height: "800px" }}
            />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/RAPAPORT%2FRAPAPORT(2)-NEWEST.png?alt=media&token=cd60909d-5b3e-40e9-a5b9-f53ce2da5956"
              alt="Diamond Price Report"
              style={{ width: "100%", height: "800px" }}
            />
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isUpdating ? "Cập nhật giá kim cương" : "Thêm giá kim cương"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <UpdateDiamondPriceForm diamondPrice={selectedDiamondPrice} />
          ) : (
            <AddDiamondPriceForm />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default DiamondPriceManager;
