import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function SizeInstructionModal(props) {
  const [selectedSize, setSelectedSize] = useState(''); // State for selected size

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); // Update selected size when dropdown changes
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title className="text-center" id="contained-modal-title-vcenter">
          Cách đo size nhẫn
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        {/* Instruction Row 1 */}
        <Row className="mb-3">
          <Col className="text-center">
            1. Dùng chỉ hoặc giấy bản nhỏ đo quấn quanh khớp tay, đánh dấu vị trí cắt nhau
            <br />
            <img src='https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-other%2FHDDN-1.svg?alt=media&token=42f6373a-415a-4c57-9d8d-9bf42c9c0b3e' />
          </Col>
        </Row>

        {/* Instruction Row 2 */}
        <Row className="mb-3">
          <Col className="text-center">
            2. Dùng thước đo chiều dài đoạn dây vừa đo được (đơn vị cm)
            <br />
            <img src='https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-other%2FHDDN-2.svg?alt=media&token=130dd236-5c4e-41de-b139-4e0cf00ba75f' />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <b>Kết quả bạn đo được là</b>
            <Form.Select value={selectedSize} onChange={handleSizeChange}>
              <option value="">Chọn size nhẫn</option>
              <option value="6">4.6 cm</option>
              <option value="7">4.7 cm</option>
              <option value="8">4.9 cm</option>
              <option value="9">5 cm</option>
              <option value="10">5.2 cm</option>
              <option value="11">5.3 cm</option>
              <option value="12">5.4 cm</option>
              <option value="13">5.5 cm</option>
              <option value="14">5.6 cm</option>
              <option value="15">5.7 cm</option>
              <option value="16">5.8 cm</option>
              <option value="17">6.0 cm</option>
              <option value="18">6.1 cm</option>
              <option value="19">6.3 cm</option>
              <option value="20">6.4 cm</option>
            </Form.Select>
          </Col>

          <Col xs={6}>
            <b>Bảng size phổ biến</b><br />

            <b>Size nhẫn của bạn là: </b>
            {selectedSize ? ` ${selectedSize}` : 'Chưa chọn size'}
          </Col>
        </Row>
      </Modal.Body>

    </Modal>
  );
}

export default SizeInstructionModal;
