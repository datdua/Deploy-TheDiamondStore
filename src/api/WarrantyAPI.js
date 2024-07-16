import axios from "axios";

export const getAllWarranties = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get("http://localhost:8080/api/warranties/get-all",
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
    const response = await axios.get(
      `http://localhost:8080/api/warranties/${warrantyID}`
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
      "http://localhost:8080/api/warranties/manager/create",
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
      `http://localhost:8080/api/warranties/manager/update/${warrantyID}`,
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
      `http://localhost:8080/api/warranties/manager/delete`,
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
    const token = localStorage.getItem("jwt");
    const response = await axios.get(
      `http://localhost:8080/api/warranties/diamondIDIsNull`,
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
      `http://localhost:8080/api/warranties/jewelryIDIsNull`,
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
