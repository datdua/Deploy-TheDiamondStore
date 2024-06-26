import axios from "axios";

export const getAllDiamondPrice = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/diamondprices/getAll"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDiamondPriceById = async (diamondPriceID) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/diamondprices/${diamondPriceID}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createDiamondPrice = async (diamondPrice) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/diamondprices/create",
      diamondPrice
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateDiamondPrice = async (diamondPriceID, diamondPrice) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/diamondprices/${diamondPriceID}`,
      diamondPrice
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDiamondPrice = async (diamondPriceIDs) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/diamondprices`
      , { data: diamondPriceIDs }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
