import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { getAccountByID_AdminManager, updateProfile } from "../../api/accountCrud";

const ProfilePage = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const accountID = localStorage.getItem("accountID");

  useEffect(() => {
    if (!accountID) {
      setError("Account ID is not provided");
      return;
    }

    const fetchAccount = async () => {
      try {
        const accountData = await getAccountByID_AdminManager(accountID);
        setAccount(accountData);
      } catch (error) {
        setError("Failed to fetch account");
        console.error("Failed to fetch account", error);
      }
    };

    fetchAccount();
  }, [accountID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(accountID, account);
      setIsEditing(false);
      setOpenSnackbar(true);
    } catch (error) {
      setError("Failed to update account");
      console.error("Failed to update account", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!account) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Avatar
            alt={account.accountName}
            src="broken-image.jpg"
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          {isEditing ? (
            <TextField
              label="Account Name"
              name="accountName"
              value={account.accountName}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          ) : (
            <Typography variant="h4" gutterBottom>
              {account.accountName}
            </Typography>
          )}
          {isEditing ? (
            <TextField
              label="Email"
              name="email"
              value={account.email}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          ) : (
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {account.email}
            </Typography>
          )}
        </Box>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Vai Trò</Typography>
              <Typography>{account.role}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Số Điện Thoại</Typography>
            {isEditing ? (
              <TextField
                name="phoneNumber"
                value={account.phoneNumber}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography>{account.phoneNumber}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Địa Chỉ</Typography>
            {isEditing ? (
              <TextField
                name="addressAccount"
                value={account.addressAccount}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography>{account.addressAccount || "N/A"}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Mật Khẩu</Typography>
            {isEditing ? (
              <TextField
                name="password"
                type="password"
                value={account.password}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <Typography>{account.password ? "********" : "N/A"}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Trạng Thái</Typography>
            <Typography>{account.active ? "Đã kích họat" : "Khóa tài khoản"}</Typography>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" marginTop={4}>
          {isEditing ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsEditing(false)}
                sx={{ marginLeft: 2 }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Cập nhật thông tin thành công!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
