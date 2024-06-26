import axios from "axios";

export const getAllWarranties = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/warranties");
    return response.data;
  } catch (error) {
    console.error("Error fetching warranties:", error);
    throw error;
  }
};

export const getWarrantyById = async (warrantyId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/warranties/${warrantyId}`
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
      "http://localhost:8080/api/warranties/create",
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
      `http://localhost:8080/api/warranties/update/${warrantyId}`,
      warranty
    );
    return response.data;
  } catch (error) {
    console.error("Error updating warranty:", error);
    throw error;
  }
};

export const deleteWarranty = async (warrantyIDs) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/warranties/delete`
      , { data: warrantyIDs }
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
      `http://localhost:8080/api/warranties/page?page=${page}&size=${size}`
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
      `http://localhost:8080/api/warranties/diamondIDIsNull`
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
      `http://localhost:8080/api/warranties/jewelryIDIsNull`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching warranty by diamondID is null:", error);
    throw error;
  }
};
