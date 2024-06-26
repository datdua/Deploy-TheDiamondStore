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
import { getAllJewelry, deleteJewelry } from "../../../api/JewelryAPI.js";
import AddJewelryForm from "../../../components/JewelryCRUD/AddJewelryForm.js";
import UpdateJewelryForm from "../../../components/JewelryCRUD/UpdateJewelryForm.js";
import DeleteJewelryButton from "../../../components/JewelryCRUD/DeleteJewelryForm.js";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Pagination, Tooltip, Checkbox, FormControlLabel } from "@mui/material";
import "../ProductManager.css";

function JewelryManagerPage() {
  const [jewelryData, setJewelryData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJewelry, setSelectedJewelry] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const size = 8;
  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  // Slice the array to get only the items for the current page
  const currentPageData = jewelryData.slice(startIndex, endIndex);

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleShowAdd = () => {
    setSelectedJewelry(null);
    setIsUpdating(false);
    setShowModal(true);
  };

  const handleShowUpdate = (item) => {
    setSelectedJewelry(item);
    setIsUpdating(true);
    setShowModal(true);
  };

  const handleShowImage = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImage("");
  };

  const handleDelete = (jewelryID) => {
    setJewelryData(
      jewelryData.filter((jewelry) => jewelry.jewelryID !== jewelryID)
    );
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
    setSelectAll(newSelected.length === jewelryData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < jewelryData.length);
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    setSelected(event.target.checked ? jewelryData.map((jewelry) => jewelry.jewelryID) : []);
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
    setSelectAll(newSelected.length === jewelryData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < jewelryData.length);
  };


  const handleDeleteJewelry = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA các trang sức này?")) {
      try {
        await deleteJewelry(selected);
        setJewelryData(jewelryData.filter((jewelry) => !selected.includes(jewelry.jewelryID)));
        setSelected([]);
        alert("Xóa thành công");
      } catch (error) {
        alert("Xóa thất bại");
      }
    }
  };

  const refreshTable = () => {
    getAllJewelry().then((data) => {
      setJewelryData(data);
    });
  };

  useEffect(() => {
    getAllJewelry()
      .then((data) => setJewelryData(data))
      .catch((error) => console.error(error));
  }, []);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                Jewelry List
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
                  onClick={handleShowAdd}
                >
                  <AddIcon style={{ margin: "0 5px 5px 0" }} /> ADD
                </Button>
                {selected.length > 0 && (
                  <Tooltip describeChild title="Xóa các trang sức đã chọn" arrow placement="top">
                    <Button variant="link" onClick={handleDeleteJewelry} style={{ color: "red" }}>
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
                      <th>Jewelry ID</th>
                      <th>Jewelry Name</th>
                      <th>Gender</th>
                      <th>Jewelry Image</th>
                      <th>Jewelry Entry Price</th>
                      <th>Jewelry Gross Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((jewelry) => {
                      const isItemSelected = isSelected(jewelry.jewelryID)

                      return (
                        <tr
                          key={jewelry.jewelryID}
                          style={{ cursor: 'pointer' }}
                        >
                          <td onClick={(event) => handleClick(event, jewelry.jewelryID)}>
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onChange={(event) => handleCheckboxChange(event, jewelry.jewelryID)}
                            />
                          </td>
                        <td>{jewelry.jewelryID}</td>
                        <td>{jewelry.jewelryName}</td>
                        <td>{jewelry.gender}</td>
                        <td>
                          <img
                            src={jewelry.jewelryImage}
                            alt={jewelry.jewelryName}
                            style={{
                              width: "50px",
                              height: "50px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleShowImage(jewelry.jewelryImage)
                            }
                          />{" "}
                        </td>
                        <td>
                          {jewelry.jewelryEntryPrice
                            ? jewelry.jewelryEntryPrice.toLocaleString() +
                              " VNĐ"
                            : "N/A"}
                        </td>
                        <td>
                          {jewelry.grossJewelryPrice
                            ? jewelry.grossJewelryPrice.toLocaleString() +
                              " VNĐ"
                            : "N/A"}
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
                              onClick={() => handleShowUpdate(jewelry)}
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
                count={Math.ceil(jewelryData.length / size)}
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
            {isUpdating ? "Update Jewelry" : "Add Jewelry"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <UpdateJewelryForm
              jewelry={selectedJewelry}
              onClose={handleClose}
            />
          ) : (
            <AddJewelryForm onClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showImageModal} onHide={handleCloseImageModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Jewelry Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={selectedImage}
            alt="Jewelry"
            style={{ width: "100%", height: "500px" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default JewelryManagerPage;
