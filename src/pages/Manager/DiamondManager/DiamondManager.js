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
  getAllDiamond,
  getCertificateImage,
  getWarrantityImage,
  deleteDiamond
} from "../../../api/DiamondAPI.js";
import AddDiamondForm from "../../../components/DiamondCRUD/AddDiamondForm.js";
import UpdateDiamondForm from "../../../components/DiamondCRUD/UpdateDiamondForm.js";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip, Pagination, Checkbox, FormControlLabel } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import "../ProductManager.css";

function DiamondManagerPage() {
  const [diamondData, setDiamondData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDiamond, setSelectedDiamond] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [certificateImage, setCertificateImage] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [warrantyImg, setWarrantyImg] = useState(null);
  const [showWarrantityModal, setShowWarrantityModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const size = 8;
  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;

  // Slice the array to get only the items for the current page
  const currentPageData = diamondData.slice(startIndex, endIndex);

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleShowAdd = () => {
    setSelectedDiamond(null);
    setIsUpdating(false);
    setShowModal(true);
  };

  const handleShowUpdate = (item) => {
    setSelectedDiamond(item);
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


  const handleShowCertificate = async (certificationID) => {
    try {
      const imageUrl = await getCertificateImage(certificationID);
      console.log("Certificate Image URL:", imageUrl);
      setCertificateImage(imageUrl);
      setShowCertificateModal(true);
    } catch (error) {
      console.error("Error fetching certificate image:", error);
    }
  };

  const handleCloseCertificateModal = () => {
    setShowCertificateModal(false);
    setCertificateImage(null);
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
    setSelectAll(newSelected.length === diamondData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < diamondData.length);
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    setSelected(event.target.checked ? diamondData.map((diamond) => diamond.diamondID) : []);
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
    setSelectAll(newSelected.length === diamondData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < diamondData.length);
  };

  const handleShowWarrantity = async (warrantyID) => {
    try {
      const imageUrl = await getWarrantityImage(warrantyID);
      console.log("Warrantity Image URL:", imageUrl);
      setWarrantyImg(imageUrl);
      setShowWarrantityModal(true);
    } catch (error) {
      console.error("Error fetching warranty image:", error);
    }
  };

  const handleDeleteDiamonds = async () => {
    if (window.confirm("Bạn có chắc muốn XÓA các kim cương này?")) {
      try {
        await deleteDiamond(selected);
        setDiamondData(diamondData.filter((diamond) => !selected.includes(diamond.diamondID)));
        setSelected([]);
        alert("Xóa thành công");
      } catch (error) {
        alert("Xóa thất bại");
      }
    }
  };

  const handleCloseWarrantityModal = () => {
    setShowWarrantityModal(false);
    setWarrantyImg(null);
  };

  const refreshTable = () => {
    getAllDiamond().then((data) => {
      setDiamondData(data);
    });
  };

  useEffect(() => {
    getAllDiamond()
      .then((data) => setDiamondData(data))
      .catch((error) => console.error(error));
  }, []);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h4" style={{ marginRight: "10px" }}>
                Danh Sách Kim Cương
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
                  <AddIcon style={{ margin: "0 5px 5px 0" }} /> Thêm Kim Cương
                </Button>
                {selected.length > 0 && (
                  <Tooltip describeChild title="Xóa các kim cương đã chọn" arrow placement="top">
                    <Button variant="link" onClick={handleDeleteDiamonds} style={{ color: "red" }}>
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
                      <th>Mã Kim Cương</th>
                      <th>Mã Giấy Bảo Hành</th>
                      <th>Mã Chứng Chỉ</th>
                      <th>Tên Kim Cương</th>
                      <th>Giá Nhập Kim Cương</th>
                      <th>Giá Bán Kim Cương</th>
                      <th>Hình Ảnh Kim Cương</th>
                      <th>Trọng lượng</th>
                      <th>Kích cỡ</th>
                      <th>Màu Sắc</th>
                      <th>Vết Cắt</th>
                      <th>Độ Trong</th>
                      <th>Hình Dạng</th>
                      <th>Xuất Xứ</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((diamond) => {
                      const isItemSelected = isSelected(diamond.diamondID);

                      return (
                        <tr
                          key={diamond.diamondID}
                          style={{ cursor: 'pointer' }}
                        >
                          <td onClick={(event) => handleClick(event, diamond.diamondID)}>
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onChange={(event) => handleCheckboxChange(event, diamond.diamondID)}
                            />
                          </td>
                          <td>{diamond.diamondID}</td>
                          <td>
                            <a
                              href="#"
                              onClick={() =>
                                handleShowWarrantity(diamond.warrantyID)
                              }
                            >
                              {diamond.warrantyID ? diamond.warrantyID : "N/A"}
                            </a>
                          </td>
                          <td>
                            <a
                              href="#"
                              onClick={() =>
                                handleShowCertificate(diamond.certificationID)
                              }
                            >
                              {diamond.certificationID ? diamond.certificationID : "N/A"}
                            </a>
                          </td>
                          <td>{diamond.diamondName}</td>
                          <td>
                            {diamond.diamondEntryPrice
                              ? diamond.diamondEntryPrice.toLocaleString() +
                              " VNĐ"
                              : "N/A"}
                          </td>
                          <td>
                            {diamond.grossDiamondPrice
                              ? diamond.grossDiamondPrice.toLocaleString() +
                              " VNĐ"
                              : "N/A"}
                          </td>
                          <td>
                            <img
                              src={diamond.diamondImage}
                              alt={diamond.diamondName}
                              style={{
                                width: "50px",
                                height: "50px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleShowImage(diamond.diamondImage)
                              }
                            />
                          </td>
                          <td>{diamond.weight}</td>
                          <td>{diamond.caratSize}</td>
                          <td>{diamond.color}</td>
                          <td>{diamond.cut}</td>
                          <td>{diamond.clarity}</td>
                          <td>{diamond.shape}</td>
                          <td>{diamond.origin}</td>
                          <td>
                            <Tooltip
                              describeChild
                              title="Cập nhật thông tin"
                              arrow
                              placement="top"
                            >
                              <Button
                                variant="link"
                                onClick={() => handleShowUpdate(diamond)}
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
                count={Math.ceil(diamondData.length / size)}
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
            {isUpdating ? "Cập nhật kim cương" : "Thêm kim cương"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <UpdateDiamondForm
              diamond={selectedDiamond}
              onClose={handleClose}
            />
          ) : (
            <AddDiamondForm onClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showCertificateModal} onHide={handleCloseCertificateModal}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {certificateImage ? (
            <img
              src={certificateImage}
              alt="Certificate"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <CircularProgress color="success" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCertificateModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showWarrantityModal} onHide={handleCloseWarrantityModal}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {warrantyImg ? (
            <img
              src={warrantyImg}
              alt="Warranty"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <CircularProgress color="success" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWarrantityModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showImageModal} onHide={handleCloseImageModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Diamond Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={selectedImage}
            alt="Diamond"
            style={{ width: "100%", height: "500px" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default DiamondManagerPage;
