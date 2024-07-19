import axios from "axios";

export const getAllWarranties = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get("https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranty-management/warranties/get-all",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching warranties:", error);
    throw error;
  }
};

export const getWarrantyById = async (warrantyID) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/warranty-management/warranties/${warrantyID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching warranty by ID:", error);
    throw error;
  }
};

export const createWarranty = async (warranty) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/warranty-management/warranties/add",
      warranty,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating warranty:", error);
    throw error;
  }
};

export const updateWarranty = async (warrantyID, warranty) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/warranty-management/warranties/update/${warrantyID}`,
      warranty,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating warranty:", error);
    throw error;
  }
};

export async function deleteWarranty(warrantyIDs) {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.delete(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/warranty-management/warranties/delete`,
      { 
        headers: { Authorization: `Bearer ${token}` },
        data: warrantyIDs 
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting warranty:", error);
    throw error;
  }
}

export const getWarrantyByPage = async (page, size) => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranty-management/warranties/get-paging?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching warranty by page:", error);
    throw error;
  }
};

export const getWarrantyDiamondIDIsNull = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranty-management/warranties/get-jewelry-warranty`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching warranty by diamondID is null:", error);
    throw error;
  }
};

export const getWarrantyJewelryIDIsNull = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranty-management/warranties/get-diamond-warranty`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching warranty by diamondID is null:", error);
    throw error;
  }
};