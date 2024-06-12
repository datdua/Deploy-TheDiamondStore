import axios from "axios";

export async function getAllAccount() {
  const response = await axios.get(
    "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/accounts/accounts"
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch account data");
  }
  return response.data;
}

export async function getAccountByID(accountID) {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/accounts/get/${accountID}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch account by ID");
  }
}

export async function getAccountByRole(role) {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/accounts/getByRole/${role}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch account by role");
  }
}

export async function updateAccount(accountID, account) {
  try {
    const response = await axios.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/accounts/update/${accountID}`,
      account
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update account");
  }
}

export async function deleteAccount(accountID) {
  try {
    const response = await axios.delete(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/accounts/delete/${accountID}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete account");
  }
}

export async function createAccount(account) {
  try {
    const response = await axios.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/accounts/create",
      account
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create account");
  }
}
export const getContactInfo = async (accountId) => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/accounts/contactInfo/${accountId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    throw error;
  }
};
