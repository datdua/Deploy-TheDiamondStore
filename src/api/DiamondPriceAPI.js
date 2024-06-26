import axios from "axios";

export const getAllDiamondPrice = async () => {
  try {
    const response = await axios.get(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/diamondprices/getAll"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDiamondPriceById = async (diamondPriceID) => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/diamondprices/${diamondPriceID}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createDiamondPrice = async (diamondPrice) => {
  try {
    const response = await axios.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/diamondprices/create",
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
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/diamondprices/${diamondPriceID}`,
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
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/diamondprices`
      , { data: diamondPriceIDs }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
