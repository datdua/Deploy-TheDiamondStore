import axios from "axios";

export const getAllWarranties = async () => {
  try {
    const response = await axios.get("https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranties");
    return response.data;
  } catch (error) {
    console.error("Error fetching warranties:", error);
    throw error;
  }
};

export const getWarrantyById = async (warrantyId) => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranties/${warrantyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching warranty by ID:", error);
    throw error;
  }
};

export const createWarranty = async (warranty) => {
  try {
    const response = await axios.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranties/create",
      warranty
    );
    return response.data;
  } catch (error) {
    console.error("Error creating warranty:", error);
    throw error;
  }
};

export const updateWarranty = async (warrantyId, warranty) => {
  try {
    const response = await axios.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranties/update/${warrantyId}`,
      warranty
    );
    return response.data;
  } catch (error) {
    console.error("Error updating warranty:", error);
    throw error;
  }
};

export const deleteWarranty = async (warrantyId) => {
  try {
    const response = await axios.delete(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranties/delete/${warrantyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting warranty:", error);
    throw error;
  }
};

export const getWarrantyByPage = async (page, size) => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranties/page?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching warranty by page:", error);
    throw error;
  }
};

export const getWarrantyDiamondIDIsNull = async () => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranties/diamondIDIsNull`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching warranty by diamondID is null:", error);
    throw error;
  }
};

export const getWarrantyJewelryIDIsNull = async () => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/warranties/jewelryIDIsNull`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching warranty by diamondID is null:", error);
    throw error;
  }
};
