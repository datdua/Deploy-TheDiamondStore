import React, { useState } from "react";
import { updateCertificate } from "../../api/CertificateAPI.js";
import { Form, Button } from "react-bootstrap";

function UpdateCertificateForm({ certificate }) {
  const [updatedCertificate, setUpdatedCertificate] = useState({
    diamondID: certificate.diamondID,
    expirationDate: certificate.expirationDate.split(" ")[0],
    expirationTime: certificate.expirationDate.split(" ")[1].slice(0, 5),
    certificateImage: certificate.certificateImage,
  });

  const handleChange = (event) => {
    setUpdatedCertificate({
      ...updatedCertificate,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateTimeCertificate = {
        ...updatedCertificate,
        expirationDate: `${updatedCertificate.expirationDate} ${updatedCertificate.expirationTime}:00`,
      };
      await updateCertificate(certificate.certificateID, dateTimeCertificate);
      alert("Cập nhật thông tin Chứng Chỉ thành công");
    } catch (error) {
      alert("Cập nhật thông tin Chứng Chỉ thất bại");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Diamond ID</Form.Label>
        <Form.Control
          type="text"
          name="diamondID"
          value={updatedCertificate.diamondID}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Expiration Date</Form.Label>
        <Form.Control
          type="date"
          name="expirationDate"
          value={updatedCertificate.expirationDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Expiration Time</Form.Label>
        <Form.Control
          type="time"
          name="expirationTime"
          value={updatedCertificate.expirationTime}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Certificate Image</Form.Label>
        <Form.Control
          type="text"
          name="certificateImage"
          value={updatedCertificate.certificateImage}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update certificate
      </Button>
    </Form>
  );
}

export default UpdateCertificateForm;
