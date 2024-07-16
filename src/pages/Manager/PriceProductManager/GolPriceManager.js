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
import { getAllGoldPrice } from "../../../api/GoldPriceAPI.js";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddGoldPriceForm from "../../../components/GoldPriceCRUD/AddGoldPriceForm";
import UpdateGoldPriceForm from "../../../components/GoldPriceCRUD/UpdateGoldPriceForm";
import DeleteGoldPriceForm from "../../../components/GoldPriceCRUD/DeleteGoldPriceForm";
import { Pagination } from "@mui/material";
import "../ProductManager.css";

function GoldPriceManager() {
  const [goldPriceData, setGoldPriceData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGoldPrice, setSelectedGoldPrice] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleDelete = (goldPriceID) => {
    setGoldPriceData(
      goldPriceData.filter((goldPrice) => goldPrice.goldPriceID !== goldPriceID)
    );
  };

  const refreshTable = () => {
    getAllGoldPrice().then((data) => {
      setGoldPriceData(data);
    });
  };

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
                Gold Price Manager
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
                      <th>Mã trang sức</th>
                      <th>Gold Price</th>
                      <th>Gold Age</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goldPriceData.length > 0 ? (
                      currentPageData.map((goldPrice) => (
                        <tr key={goldPrice.goldPriceID}>
                          <td>{goldPrice.jewelryID}</td>
                          <td>
                            {goldPrice.goldPrice
                              ? goldPrice.goldPrice.toLocaleString() + " VNĐ"
                              : "N/a"}
                          </td>
                          <td>{goldPrice.goldAge}</td>
                          <td>
                            <Button
                              variant="link"
                              onClick={() => handleShowUpdate(goldPrice)}
                            >
                              <EditIcon />Edit
                            </Button>
                            <DeleteGoldPriceForm
                              goldPriceID={goldPrice.goldPriceID}
                              onDelete={handleDelete}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
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
            {isUpdating ? "Update Gold Price" : "Add Gold Price"}
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
