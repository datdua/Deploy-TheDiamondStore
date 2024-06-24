import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
          <Form.Label>Giá tương đối</Form.Label>
          <Form.Control
            type="number"
            value={relativePrice}
            onChange={(e) => setRelativePrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="caratSize">
          <Form.Label>Kích cỡ Carat</Form.Label>
          <Form.Control
            type="number"
            value={caratSize}
            onChange={(e) => setCaratSize(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleCalculate}>Tính Giá</Button>
      </Form>
      {diamondPriceUSD !== null && (
        <div>
          <p>Giá Kim Cương (USD): {diamondPriceUSD.toLocaleString()} USD</p>
          <p>Giá Kim Cương (VND): {diamondPriceVND.toLocaleString()} VND</p>
        </div>
      )}
    </div>
  );
}

export default CalculatorForm;
