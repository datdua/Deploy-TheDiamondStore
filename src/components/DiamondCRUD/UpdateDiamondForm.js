import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { updateDiamond } from "../../api/DiamondAPI.js"; // Adjust this import to your file structure

function UpdateDiamondForm({ diamond }) {
  const [updatedDiamond, setUpdatedDiamond] = useState(diamond);

  const caratSizeOptions = [3.6, 3.9, 4.1, 4.5];
  const colorOptions = ["F", "E", "J", "D"];
  const clarityOptions = ["VS1", "VS2", "VVS1", "VVS2"];

  const handleChange = (event) => {
    setUpdatedDiamond({
      ...updatedDiamond,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDiamond(diamond.diamondID, updatedDiamond);
      alert("Cập nhật thông tin Kim Cương thành công");
    } catch (error) {
      alert("Cập nhật thông tin Kim Cương thất bại");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Mã trang sức</Form.Label>
        <Form.Control
          type="text"
          name="warrantyID"
          value={updatedDiamond.warrantyID}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Mã chứng chỉ</Form.Label>
        <Form.Control
          type="text"
          name="certificationID"
          value={updatedDiamond.certificationID}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Tên kim cương</Form.Label>
        <Form.Control
          type="text"
          name="diamondName"
          value={updatedDiamond.diamondName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Giá nhập kim cương</Form.Label>
        <Form.Control
          type="text"
          name="diamondEntryPrice"
          value={updatedDiamond.diamondEntryPrice}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Hình ảnh kim cương</Form.Label>
        <Form.Control
          type="text"
          name="diamondImage"
          value={updatedDiamond.diamondImage}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Trọng lượng</Form.Label>
        <Form.Control
          type="text"
          name="weight"
          value={updatedDiamond.weight}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Kích cỡ</Form.Label>
        <Form.Control
          as="select"
          name="caratSize"
          value={updatedDiamond.caratSize}
          onChange={handleChange}
        >
          {caratSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Màu</Form.Label>
        <Form.Control
          as="select"
          name="color"
          value={updatedDiamond.color}
          onChange={handleChange}
        >
          {colorOptions.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Vết cắt</Form.Label>
        <Form.Control
          type="text"
          name="cut"
          value={updatedDiamond.cut}
          onChange={handleChange}
          readOnly
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Độ tinh khiết</Form.Label>
        <Form.Control
          as="select"
          name="clarity"
          value={updatedDiamond.clarity}
          onChange={handleChange}
        >
          {clarityOptions.map((clarity) => (
            <option key={clarity} value={clarity}>
              {clarity}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Hình dạng</Form.Label>
        <Form.Control
          type="text"
          name="shape"
          value={updatedDiamond.shape}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Xuất xứ</Form.Label>
        <Form.Control
          type="text"
          name="origin"
          value={updatedDiamond.origin}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
        Cập nhật
      </Button>
    </Form>
  );
}

export default UpdateDiamondForm;
