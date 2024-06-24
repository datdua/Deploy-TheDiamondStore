import React, { useState } from "react";
import { createWarranty } from "../../api/WarrantyAPI.js";
import { Form, Button } from "react-bootstrap";

function AddWarrantyForm() {
  const [warranty, setWarranty] = useState({
    warrantyID: "",
    diamondID: "",
    jewelryID: "",
    expirationDate: "",
    expirationTime: "",
    warrantyImage: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setWarranty({ ...warranty, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dateTimeWarranty = {
        ...warranty,
        expirationDate: `${warranty.expirationDate} ${warranty.expirationTime}:00`,
      };
      const response = await createWarranty(dateTimeWarranty);
      console.log(response);
      setMessage("Tạo mới Giấy Bảo Hành thành công");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Giấy Bảo Hành thất bại");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {Object.keys(warranty).map((key) => (
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
              value={warranty[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Create warranty
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddWarrantyForm;
