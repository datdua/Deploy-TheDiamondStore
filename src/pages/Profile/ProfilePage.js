import React, { useEffect, useState } from "react";
import { Avatar, Box, Container, Typography, Paper, Grid } from "@mui/material";
import { getAccountByID } from "../../api/accountCrud";

const ProfilePage = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const accountID = localStorage.getItem("accountID");

  useEffect(() => {
    if (!accountID) {
      setError("Account ID is not provided");
      return;
    }

    const fetchAccount = async () => {
      try {
        const accountData = await getAccountByID(accountID);
        setAccount(accountData);
      } catch (error) {
        setError("Failed to fetch account");
        console.error("Failed to fetch account", error);
      }
    };

    fetchAccount();
  }, [accountID]);

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
          <Typography variant="h4" gutterBottom>
            {account.accountName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {account.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {account.addressAccount}
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Role</Typography>
            <Typography>{account.role}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Phone Number</Typography>
            <Typography>{account.phoneNumber}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Address</Typography>
            <Typography>{account.addressAccount || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Active</Typography>
            <Typography>{account.active ? "Yes" : "No"}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
