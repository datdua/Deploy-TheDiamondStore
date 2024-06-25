import axios from "axios";

export async function getAllAccount() {
  const response = await axios.get(
    "http://localhost:8080/api/accounts/accounts"
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch account data");
  }
  return response.data;
}

export async function getAccountByID(accountID) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/accounts/get/${accountID}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch account by ID");
  }
}

export async function getAccountByRole(role) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/accounts/getByRole/${role}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch account by role");
  }
}

export async function updateAccount(accountID, account) {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/accounts/update/${accountID}`,
      account
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update account");
  }
}


export async function deleteAccounts(accountIDs) {
  try {
    const response = await axios.delete("http://localhost:8080/api/accounts/delete", {
      data: accountIDs,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete accounts");
  }
}



export async function createAccount(account) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/accounts/create",
      account
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create account");
  }
}
export const getContactInfo = async (accountId) => {
  try {
      const response = await axios.get(`http://localhost:8080/api/accounts/contactInfo/${accountId}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching contact info:', error);
      throw error;
  }
};
export const getAccountIDByEmail = async (email) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(
      `http://localhost:8080/api/accounts/getByEmail/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.accountID;
  } catch (error) {
    console.error("Error fetching account ID:", error);
    throw new Error("Failed to fetch account information: " + error.message);
  }
};
export const getCustomerPoints = async (accountId) => {
  try {
      const response = await axios.get(`http://localhost:8080/api/customers/${accountId}`);
      if (response.status === 200) {
          return response.data.point;
      } else {
          throw new Error('Failed to fetch customer points');
      }
  } catch (error) {
      console.error('Error fetching customer points:', error);
      throw error;
  }
};

export const resetPassword = async (email) => {
  try {
      const response = await axios.post(`http://localhost:8080/api/accounts/forget-password?email=${email}`,
      );
      return response.data;
  } catch (error) {
      console.error('Error resetting password:', error);
      throw error; // Throw the error for higher level handling
  }
};



export const setPassword = async (email, newPassword) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/accounts/set-password?email=${encodeURIComponent(email)}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'newPassword': newPassword, // Add newPassword to the headers
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error setting password');
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(error.message);
    }
  }
};

export const countCustomer = async () => {
  try {
      const response = await axios.get(`http://localhost:8080/api/customers/total`,
      );
      return response.data;
  } catch (error) {
      console.error('Error fetching customer count:', error);
      throw error; // Throw the error for higher level handling
  }
};

export const countRevenue = async () => {
  try {
      const response = await axios.get(`http://localhost:8080/api/orders/totalOrderPaid`,
      );
      return response.data;
  } catch (error) {
      console.error('Error fetching revenue count:', error);
      throw error; // Throw the error for higher level handling
  }
};



