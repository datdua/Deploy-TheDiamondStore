import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Tooltip } from "@mui/material";

function CalculatorForm() {
  const [relativePrice, setRelativePrice] = useState("");
  const [caratSize, setCaratSize] = useState("");
  const [diamondPriceUSD, setDiamondPriceUSD] = useState(null);
  const [diamondPriceVND, setDiamondPriceVND] = useState(null);

  const handleCalculate = () => {
    const priceUSD = relativePrice * 100 * caratSize;
    const priceVND = priceUSD * 23000; // Giả sử 1 USD = 23000 VND
    setDiamondPriceUSD(priceUSD);
    setDiamondPriceVND(priceVND);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="relativePrice">
          <Tooltip
            describeChild
            title="Giá trị đã được tính dựa theo các tiêu chí trong bảng RAPAPORT"
            arrow
            placement="left"
          >
            <Form.Label>Giá tương đối ⓘ</Form.Label>
          </Tooltip>
          <Form.Control
            type="number"
            value={relativePrice}
            onChange={(e) => setRelativePrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{marginTop: '10px'}} controlId="caratSize">
          <Form.Label>Kích cỡ</Form.Label>
          <Form.Control
            type="number"
            value={caratSize}
            onChange={(e) => setCaratSize(e.target.value)}
          />
        </Form.Group>
        <Button style={{ marginTop: '10px' }} onClick={handleCalculate}>Tính Giá</Button>
      </Form>
      {diamondPriceUSD !== null && (
        <div style={{ marginTop: '10px' }}>
          <p>Giá Kim Cương (USD): <b>{diamondPriceUSD.toLocaleString()} USD</b></p>
          <p>Giá Kim Cương (VND): <b>{diamondPriceVND.toLocaleString()} VND</b></p>
        </div>
      )}
    </div>
  );
}

export default CalculatorForm;
