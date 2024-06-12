import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createJewelry } from "../../api/JewelryAPI.js"; // Adjust this import to your file structure

function AddJewelryForm() {
  const [jewelry, setJewelry] = useState({
    jewelryID: "",
    jewelryName: "",
    gender: "",
    jewelryImage: "",
    jewelryEntryPrice: "",
  });

  const [message, setMessage] = useState(""); // New state variable for the message

  const handleChange = (event) => {
    setJewelry({ ...jewelry, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createJewelry(jewelry);
      console.log(response);
      setMessage("Tạo mới Trang Sức thành công "); // Set the message on success
    } catch (error) {
      console.error(error);
      setMessage("Tạo mới Trang Sức thất bại"); // Set the message on failure
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {Object.keys(jewelry).map((key) => (
          <Form.Group controlId={key} key={key}>
            <Form.Label>{key}</Form.Label>
            <Form.Control
              type="text"
              name={key}
              value={jewelry[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
      {message && <p>{message}</p>} {/* Render the message if it exists */}
    </div>
  );
}

export default AddJewelryForm;
