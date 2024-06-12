import React, { useState } from "react";
import { createDiamond } from "../../api/DiamondAPI.js";
import { Form, Button } from "react-bootstrap";

function AddDiamondForm() {
  const [diamond, setDiamond] = useState({
    diamondID: "",
    warrantyID: "",
    certificationID: "",
    diamondName: "",
    diamondEntryPrice: "",
    diamondImage: "",
    carat_weight: "",
    carat_size: "",
    color: "",
    cut: "",
    clarity: "",
    shape: "",
    origin: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setDiamond({ ...diamond, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createDiamond(diamond);
      console.log(response);
      setMessage("Tạo mới Kim Cương thành công");
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Kim Cương thất bại");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {Object.keys(diamond).map((key) => (
          <Form.Group controlId={key} key={key}>
            <Form.Label>{key}</Form.Label>
            <Form.Control
              type="text"
              name={key}
              value={diamond[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Create diamond
        </Button>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddDiamondForm;
