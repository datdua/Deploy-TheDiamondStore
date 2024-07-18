import axios from "axios";

export const getAllPromotions = async () => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.get("https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/promotion-management/promotions/get-all",
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
    const token = localStorage.getItem('jwt');
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/promotion-management/promotions/${promotionID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching promotion by ID:", error);
    throw error;
  }
};

export const createPromotion = async (promotion) => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/promotion-management/promotions/add",
      promotion,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating promotion:", error);
    throw error;
  }
};

export const updatePromotion = async (promotionID, promotion) => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/promotion-management/promotions/update/${promotionID}`,
      promotion,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating promotion:", error);
    throw error;
  }
};

export const deletePromotion = async (promotionIDs) => {
  try {
    const token = localStorage.getItem('jwt');
    await axios.delete(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/promotion-management/promotions/delete`
      , { 
        headers: { Authorization: `Bearer ${token}` },
        data: promotionIDs }
    );
  } catch (error) {
    console.error("Error deleting promotion:", error);
    throw error;
  }
};
