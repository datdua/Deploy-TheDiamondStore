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
} from "../../../api/DiamondAPI.js";
import AddDiamondForm from "../../../components/DiamondCRUD/AddDiamondForm.js";
import UpdateDiamondForm from "../../../components/DiamondCRUD/UpdateDiamondForm.js";
import DeleteDiamondButton from "../../../components/DiamondCRUD/DeleteDiamondForm.js";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import CircularProgress from '@mui/material/CircularProgress';
import "../ProductManager.css";

function DiamondManagerPage() {
  const [diamondData, setDiamondData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [certificateImage, setCertificateImage] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [warrantyImg, setWarrantyImg] = useState(null);
  const [showWarrantityModal, setShowWarrantityModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleDelete = (diamondID) => {
    setDiamondData(
      diamondData.filter((diamond) => diamond.diamondID !== diamondID)
    );
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
                  <RefreshIcon style={{ margin: "0 5px 5px 0" }} /> REFRESH
                </Button>
                <Button
                  variant="link"
                  style={{ textDecoration: "none" }}
                  onClick={handleShowAdd}
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
                      <th>Mã kim cương</th>
                      <th>Warranty ID</th>
                      <th>Certification ID</th>
                      <th>Diamond Name</th>
                      <th>Diamond Entry Price</th>
                      <th>Diamond Gross Price</th>
                      <th>Diamond Image</th>
                      <th>Carat Weight</th>
                      <th>Carat Size</th>
                      <th>Color</th>
                      <th>Cut</th>
                      <th>Clarity</th>
                      <th>Shape</th>
                      <th>Origin</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((diamond, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{diamond.diamondID}</td>
                        <td>
                          <a
                            href="#"
                            onClick={() =>
                              handleShowWarrantity(diamond.warrantyID)
                            }
                          >
                            {diamond.warrantyID}
                          </a>
                        </td>
                        <td>
                          <a
                            href="#"
                            onClick={() =>
                              handleShowCertificate(diamond.certificationID)
                            }
                          >
                            {diamond.certificationID}
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
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>{diamond.carat_weight}</td>
                        <td>{diamond.caratSize}</td>
                        <td>{diamond.color}</td>
                        <td>{diamond.cut}</td>
                        <td>{diamond.clarity}</td>
                        <td>{diamond.shape}</td>
                        <td>{diamond.origin}</td>
                        <td>
                          <Button
                            variant="link"
                            onClick={() => handleShowUpdate(diamond)}
                          >
                            <EditIcon />
                          </Button>
                          <DeleteDiamondButton
                            diamondID={diamond.diamondID}
                            onDelete={() => handleDelete(diamond.diamondID)}
                          >
                            <DeleteIcon />
                          </DeleteDiamondButton>
                        </td>
                      </tr>
                    ))}
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
          <Modal.Title>Giấy chứng chỉ</Modal.Title>
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
          <Modal.Title>Warrantity Image</Modal.Title>
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
    </Container>
  );
}

export default DiamondManagerPage;
