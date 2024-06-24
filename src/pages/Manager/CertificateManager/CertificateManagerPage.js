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
  getCertificateByPage,
  deleteCertificate,
  getAllCertificates,
} from "../../../api/CertificateAPI";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCertificateForm from "../../../components/CertificateCRUD/AddCertificateForm";
import UpdateCertificateForm from "../../../components/CertificateCRUD/UpdateCertificateForm";
import DeleteCertificateForm from "../../../components/CertificateCRUD/DeleteCertificateForm";
import { Pagination, Tooltip } from "@mui/material";
import "../ProductManager.css";

function CertificateManagerPage() {
  const [certificateData, setCertificateData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const size = 8;

  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const currentPageData = certificateData.slice(startIndex, endIndex);

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const handleShowUpdate = (certificate) => {
    setSelectedCertificate(certificate);
    setIsUpdating(true);
    setShowModal(true);
  };

  const handleDelete = async (certificateID) => {
    setCertificateData(
      certificateData.filter(
        (certificate) => certificate.certificateID !== certificateID
      )
    );
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const refreshTable = () => {
    getAllCertificates().then((data) => {
      setCertificateData(data);
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

  useEffect(() => {
    getAllCertificates()
      .then((data) => {
        setCertificateData(data);
      })
      .catch((error) => {
        console.error("Error fetching certificate data:", error);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                Certificate List
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
                      <th>Certificate ID</th>
                      <th>Expiration Date</th>
                      <th>Certificate Image</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((certificate, index) => (
                      <tr key={index}>
                        <td>{startIndex + index + 1}</td>
                        <td>{certificate.certificateID}</td>
                        <td>{certificate.expirationDate}</td>
                        <td>
                          <img
                            src={certificate.certificateImage}
                            alt="Certificate"
                            style={{
                              width: "50px",
                              height: "50px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleShowImage(certificate.certificateImage)
                            }
                          />
                        </td>
                        <td>{certificate.certificateStatus}</td>
                        <td>
                          <Tooltip
                            describeChild
                            title="Cập nhật thông tin"
                            arrow
                            placement="top"
                          >
                            <Button
                              variant="link"
                              onClick={() => handleShowUpdate(certificate)}
                            >
                              <EditIcon />
                            </Button>
                          </Tooltip>
                          <DeleteCertificateForm
                            certificateID={certificate.certificateID}
                            onDelete={() =>
                              handleDelete(certificate.certificateID)
                            }
                          >
                            <DeleteIcon />
                          </DeleteCertificateForm>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <Card.Footer>
              <Pagination
                count={Math.ceil(certificateData.length / size)}
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
            {isUpdating ? "Update Certificate" : "Add Certificate"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <UpdateCertificateForm
              certificate={selectedCertificate}
              onClose={handleClose}
            />
          ) : (
            <AddCertificateForm onClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showImageModal} onHide={handleCloseImageModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Certificate Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={selectedImage}
            alt="Certificate"
            style={{ width: "100%", height: "500px" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default CertificateManagerPage;
