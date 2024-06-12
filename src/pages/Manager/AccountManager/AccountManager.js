import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";
import { getAllAccount } from "../../../api/accountCrud.js";
import AddAccountForm from "../../../components/AccountCRUD/AddAccountForm.js";
import UpdateAccountForm from "../../../components/AccountCRUD/UpdateAccountForm.js";
import DeleteAccountForm from "../../../components/AccountCRUD/DeleteAccountForm.js";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Pagination } from "@mui/material";
import "./AccountManager.css";

function AccountManager() {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const size = 8;
  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  // Slice the array to get only the items for the current page
  const currentPageData = accounts.slice(startIndex, endIndex);

  const handleClose = () => {
    setShowModal(false);
    setIsUpdating(false);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getAllAccount().then((data) => {
      setAccounts(data);
    });
  }, []);

  const handleShowAdd = () => {
    setSelectedAccount(null);
    setIsUpdating(false);
    setShowModal(true);
  };

  const handleShowUpdate = (account) => {
    setSelectedAccount(account);
    setIsUpdating(true);
    setShowModal(true);
  };

  const handleShowDeleteModal = (account) => {
    setSelectedAccount(account);
    setShowDeleteModal(true);
  };

  const handleDeleteAccount = (accountID) => {
    if (accountID !== null && accountID !== undefined) {
      setAccounts(
        accounts.filter((account) => account.accountID !== accountID)
      );
      setShowDeleteModal(false);
    }
  };

  const refreshTable = () => {
    getAllAccount().then((data) => {
      setAccounts(data);
    });
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                Account List
                <Button
                  variant="link"
                  style={{ textDecoration: "none" }}
                  onClick={refreshTable}
                >
                  <RefreshIcon style={{ margin: "0 5px 5px 0" }} /> REFRESH
                </Button>
                <Button
                  variant="link"
                  style={{ textDecoration: "none" }}
                  onClick={handleShowAdd}
                >
                  <AddIcon style={{ margin: "0 5px 5px 0" }} /> ADD
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table striped bordered hover className="account-table">
                  <thead>
                    <tr>
                      <th>Account ID</th>
                      <th>Email</th>
                      <th>Account Name</th>
                      <th>Password</th>
                      <th>Phone Number</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData.map((account) => (
                      <tr key={account.accountID}>
                        <td>{account.accountID}</td>
                        <td>{account.email}</td>
                        <td>{account.accountName}</td>
                        <td className="password-cell">{account.password}</td>
                        <td>{account.phoneNumber}</td>
                        <td>{account.role}</td>
                        <td>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleShowUpdate(account)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleShowDeleteModal(account)}
                          >
                            <DeleteIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
            <Card.Footer>
              <Pagination
                count={Math.ceil(accounts.length / size)}
                page={currentPage}
                onChange={handleChangePage}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isUpdating ? "Update Account" : "Add Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <UpdateAccountForm
              account={selectedAccount}
              onClose={handleClose}
            />
          ) : (
            <AddAccountForm onClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteAccountForm
            accountID={selectedAccount ? selectedAccount.accountID : null}
            onDelete={() =>
              handleDeleteAccount(
                selectedAccount ? selectedAccount.accountID : null
              )
            }
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AccountManager;
