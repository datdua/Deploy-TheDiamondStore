import axios from "axios";

export const getAllGoldPrice = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/goldPrices"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getGoldPriceById = async (goldPriceID) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/goldPrices/${goldPriceID}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createGoldPrice = async (goldPrice) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/goldPrices",
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
      `http://localhost:8080/api/goldPrices/${goldPriceID}`,
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
      `http://localhost:8080/api/goldPrices/${goldPriceID}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
