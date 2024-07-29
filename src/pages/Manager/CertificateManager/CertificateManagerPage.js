import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Container,
  Card,
  Table,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import {
  deleteCertificate,
  getAllCertificates,
} from "../../../api/CertificateAPI";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCertificateForm from "../../../components/CertificateCRUD/AddCertificateForm";
import UpdateCertificateForm from "../../../components/CertificateCRUD/UpdateCertificateForm";
import { Pagination, Tooltip, Checkbox, FormControlLabel } from "@mui/material";
import "../ProductManager.css";
import { toast } from "react-toastify";

function CertificateManagerPage() {
  const [certificateData, setCertificateData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const userRole = localStorage.getItem("role");
  const size = 8;
  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const currentPageData = certificateData.slice(startIndex, endIndex);

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const showAlert = () => {
    toast.warning("Chức năng này chỉ dành cho quản lý")
  }

  const handleShowUpdate = (certificate) => {
    if (userRole !== "ROLE_MANAGER") {
      showAlert();
    } else {
      setSelectedCertificate(certificate);
      setIsUpdating(true);
      setShowModal(true);
    }
  };

  const handleStatus = (Status) => {
    if (Status === "Còn Hạn") {
      return (
        <h6 style={{ marginTop: '10px' }}>
          <Badge pill bg="success">Còn hạn</Badge>
        </h6>
      );
    } else if (Status === "Hết Hạn") {
      return (
        <h6 style={{ marginTop: '10px' }}>
          <Badge pill bg="danger" text="dark">Hết hạn</Badge>
        </h6>
      );
    }
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
    setSelectAll(newSelected.length === certificateData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < certificateData.length);
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
    setSelectAll(newSelected.length === certificateData.length);
    setIndeterminate(newSelected.length > 0 && newSelected.length < certificateData.length);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    setSelected(event.target.checked ? certificateData.map((certificate) => certificate.certificateID) : []);
    setIndeterminate(false);
  };

  const handleDeleteCertificate = async () => {
    if (userRole !== "ROLE_MANAGER") {
      showAlert();
    } else {
      if (window.confirm("Bạn có chắc muốn XÓA các chứng chỉ này?")) {
        try {
          await deleteCertificate(selected);
          setCertificateData(certificateData.filter((certificate) => !selected.includes(certificate.certificateID)));
          setSelected([]);
          alert("Xóa thành công");
        } catch (error) {
          alert("Xóa thất bại");
        }
      }
    }
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                Danh Sách Chứng Chỉ
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
                  <AddIcon style={{ margin: "0 5px 5px 0" }} /> Thêm Chứng Chỉ
                </Button>
                {selected.length > 0 && (
                  <Tooltip describeChild title="Xóa các chứng chỉ đã chọn" arrow placement="top">
                    <Button variant="link" onClick={handleDeleteCertificate} style={{ color: "red" }}>
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                )}
              </Card.Title>
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
                      <th>Mã Chứng Chỉ</th>
                      <th>Ngày Hết Hạn</th>
                      <th>Giấy</th>
                      <th>Trạng Thái</th>
                      <th>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((certificate) => {
                      const isItemSelected = isSelected(
                        certificate.certificateID
                      );

                      return (
                        <tr
                          key={certificate.certificateID}
                          style={{ cursor: "pointer" }}
                        >
                          <td
                            onClick={(event) =>
                              handleClick(event, certificate.certificateID)
                            }
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onChange={(event) =>
                                handleCheckboxChange(
                                  event,
                                  certificate.certificateID
                                )
                              }
                            />
                          </td>
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
                                handleShowImage(
                                  certificate.certificateImage
                                )
                              }
                            />
                          </td>
                          <td>{handleStatus(certificate.certificateStatus)}</td>
                          <td>
                            <Tooltip
                              describeChild
                              title="Cập nhật thông tin"
                              arrow
                              placement="top"
                            >
                              <Button
                                variant="link"
                                onClick={() =>
                                  handleShowUpdate(certificate)
                                }
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
            {isUpdating ? "Cập nhật chứng chỉ" : "Thêm chứng chỉ"}
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
          <Modal.Title>Giấy chứng chỉ</Modal.Title>
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
