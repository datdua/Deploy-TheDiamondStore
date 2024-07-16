import axios from "axios";

export const getAllPromotions = async () => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.get("http://localhost:8080/api/promotion/get-all",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching promotions:", error);
    throw error;
  }
};

export const getPromotionById = async (promotionID) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/promotion/${promotionID}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching promotion by ID:", error);
    throw error;
  }
};

export const createPromotion = async (promotion) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/promotion/create",
      promotion
    );
    return response.data;
  } catch (error) {
    console.error("Error creating promotion:", error);
    throw error;
  }
};

export const updatePromotion = async (promotionID, promotion) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/promotion/update/${promotionID}`,
      promotion
    );
    return response.data;
  } catch (error) {
    console.error("Error updating promotion:", error);
    throw error;
  }
};

export const deletePromotion = async (promotionIDs) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/promotion/delete`
      , { data: promotionIDs }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting promotion:", error);
    throw error;
  }
};
