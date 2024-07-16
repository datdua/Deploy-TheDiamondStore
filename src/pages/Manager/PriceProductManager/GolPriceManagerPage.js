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
import { getAllGoldPrice, deleteGoldPrice } from "../../../api/GoldPriceAPI.js";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddGoldPriceForm from "../../../components/GoldPriceCRUD/AddGoldPriceForm.js";
import UpdateGoldPriceForm from "../../../components/GoldPriceCRUD/UpdateGoldPriceForm.js";
import DeleteGoldPriceForm from "../../../components/GoldPriceCRUD/DeleteGoldPriceForm.js";
import { Pagination, Tooltip, Checkbox, FormControlLabel } from "@mui/material";
import "../ProductManager.css";

function GoldPriceManager() {
  const [goldPriceData, setGoldPriceData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGoldPrice, setSelectedGoldPrice] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const size = 8;
  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const currentPageData = goldPriceData.slice(startIndex, endIndex);

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleShowAdd = () => {
    setSelectedGoldPrice(null);
    setIsUpdating(false);
    setShowModal(true);
  };

  const handleShowUpdate = (item) => {
    setSelectedGoldPrice(item);
    setIsUpdating(true);
    setShowModal(true);
  };

  const handleDelete = (goldpriceID) => {
    setGoldPriceData(
      goldPriceData.filter((goldPrice) => goldPrice.goldpriceID !== goldpriceID)
    );
  };

  const refreshTable = () => {
    getAllGoldPrice().then((data) => {
      setGoldPriceData(data);
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
    setSelectAll(newSelected.length === goldPriceData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < goldPriceData.length);
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    setSelected(event.target.checked ? goldPriceData.map((goldPrice) => goldPrice.goldpriceID) : []);
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
    setSelectAll(newSelected.length === goldPriceData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < goldPriceData.length);
  };

  const handleDeleteGoldPrice = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA các giá vàng này?")) {
      try {
        await deleteGoldPrice(selected);
        setGoldPriceData(goldPriceData.filter((goldPrice) => !selected.includes(goldPrice.goldpriceID)));
        setSelected([]);
        alert("Xóa thành công");
      } catch (error) {
        alert("Xóa thất bại");
      }
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  useEffect(() => {
    getAllGoldPrice()
      .then((data) => setGoldPriceData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                Quản lý giá vàng
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
                  <AddIcon style={{ margin: "0 5px 5px 0" }} /> Thêm Giá Vàng
                </Button>
                {selected.length > 0 && (
                  <Tooltip describeChild title="Xóa các giá kim cương đã chọn" arrow placement="top">
                    <Button variant="link" onClick={handleDeleteGoldPrice} style={{ color: "red" }}>
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
                      <th>Mã Giá Vàng</th>
                      <th>Mã Trang Cức</th>
                      <th>Giá Vàng</th>
                      <th>Lượng</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((goldPrice) => {
                      const isItemSelected = isSelected(goldPrice.goldpriceID);

                      return (
                        <tr
                          key={goldPrice.goldpriceID}
                          style={{ cursor: 'pointer' }}
                        >
                          <td onClick={(event) => handleClick(event, goldPrice.goldpriceID)}>
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onChange={(event) => handleCheckboxChange(event, goldPrice.goldpriceID)}
                            />
                          </td>
                          <td>{goldPrice.goldpriceID}</td>
                          <td>{goldPrice.jewelryID}</td>
                          <td>
                            {goldPrice.goldPrice
                              ? goldPrice.goldPrice.toLocaleString() + " VNĐ"
                              : "N/a"}
                          </td>
                          <td>{goldPrice.goldAge + "K"}</td>
                          <td>
                            <Tooltip
                              describeChild
                              title="Cập nhật thông tin"
                              arrow placement="top"
                            >
                              <Button
                                variant="link"
                                onClick={() => handleShowUpdate(goldPrice)}
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
                count={Math.ceil(goldPriceData.length / size)}
                page={currentPage}
                onChange={handleChangePage}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <div className="iframe-container">
            <iframe
              title="Gold Price"
              srcDoc={`<script type="text/javascript" src="https://tygiausd.org/GiavangFullScript/dat-gia-vang/Widgets"></script>
                        <noscript> Vui lòng bật javascript để xem <a href="https://tygiausd.org/giavang/gia-vang-hom-nay">giá vàng</a></noscript>`}
              style={{ width: "100%", height: "1000px", border: "none" }}
            />
          </div>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isUpdating ? "Cập Nhật Giá Vàng" : "Thêm Giá Vàng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <UpdateGoldPriceForm goldPrice={selectedGoldPrice} />
          ) : (
            <AddGoldPriceForm />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default GoldPriceManager;
