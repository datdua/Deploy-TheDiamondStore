import React, { useState } from "react";
import { updateAccount } from "../../api/accountCrud";
import { Form, Button } from "react-bootstrap";

function UpdateAccountForm({ account }) {
  const [updatedAccount, setUpdateAccount] = useState(account);

  const handleChange = (event) => {
    setUpdateAccount({
      ...updatedAccount,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateAccount(account.accountID, updatedAccount);
      alert("Cập nhật thông tin Tài Khoản thành công");
    } catch (error) {
      alert("Cập nhật thông tin Tài Khoản thất bại");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Account Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={updatedAccount.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Account Name</Form.Label>
        <Form.Control
          type="text"
          name="accountName"
          value={updatedAccount.accountName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Account Password</Form.Label>
        <Form.Control
          type="text"
          name="password"
          value={updatedAccount.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Account Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={updatedAccount.phoneNumber}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Account Role</Form.Label>
        <Form.Control
          type="text"
          name="role"
          value={updatedAccount.role}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Account Address</Form.Label>
        <Form.Control
          type="text"
          name="addressAccount"
          value={updatedAccount.addressAccount}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );

}
export default UpdateAccountForm;
