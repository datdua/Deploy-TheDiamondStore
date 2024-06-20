import React, { useState } from "react";
import { createCertificate } from "../../api/CertificateAPI.js";
import { Form, Button } from "react-bootstrap";

function AddCertificateForm() {
  const [certificate, setCertificate] = useState({
    certificateID: "",
    diamondID: "",
    expirationDate: "",
    expirationTime: "",
    certificateImage: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setCertificate({ ...certificate, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateTimeCertificate = {
        ...certificate,
        expirationDate: `${certificate.expirationDate} ${certificate.expirationTime}:00`,
      };
      const response = await createCertificate(dateTimeCertificate);
      console.log(response);
      setMessage("Tạo mới Chứng Chỉ thành công");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Chứng Chỉ thất bại");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {Object.keys(certificate).map((key) => (
          <Form.Group controlId={key} key={key}>
            <Form.Label>{key}</Form.Label>
            <Form.Control
              type={
                key.includes("Date")
                  ? "date"
                  : key.includes("Time")
                  ? "time"
                  : "text"
              }
              name={key}
              value={certificate[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Create certificate
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddCertificateForm;
