import axios from "axios";

export const getAllGoldPrice = async () => {
  try {
    const response = await axios.get(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/goldPrices"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getGoldPriceById = async (goldPriceID) => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/goldPrices/${goldPriceID}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createGoldPrice = async (goldPrice) => {
  try {
    const response = await axios.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/goldPrices",
      goldPrice
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateGoldPrice = async (goldPriceID, goldPrice) => {
  try {
    const response = await axios.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/goldPrices/${goldPriceID}`,
      goldPrice
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteGoldPrice = async (goldPriceID) => {
  try {
    const response = await axios.delete(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/goldPrices/${goldPriceID}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
