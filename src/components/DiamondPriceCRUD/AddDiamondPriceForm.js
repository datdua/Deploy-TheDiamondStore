import React, { useState } from "react";
import { createCertificate } from "../../api/CertificateAPI.js";
import { Form, Button } from "react-bootstrap";
import { createDiamondPrice } from "../../api/DiamondPriceAPI.js";

function AddCertificateForm() {
  const [diamondPrice, setCertificate] = useState({
    diamondID: "",
    diamondEntryPrice: "",
    clarity: "",
    color: "",
    carat_size: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setCertificate({
      ...diamondPrice,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createDiamondPrice(diamondPrice);
      console.log(response);
      if (response.status === 200) {
        alert("Tạo mới Giá Kim Cương thành công"); // Set the message on success
      } else {
        alert(response.data.message); // Set the message from the server response
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data.message === "Giá kim cương này đã tồn tại"
      ) {
        alert("Giá cho kim cương đã tồn tại"); // Set the message if diamond price already exists
      } else {
        alert("Tạo mới Giá Kim Cương thất bại"); // Set the message on failure
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {Object.keys(diamondPrice).map((key) => (
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
              value={diamondPrice[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Create diamondPrice
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddCertificateForm;
