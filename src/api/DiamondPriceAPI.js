import axios from "axios";

export const getAllDiamondPrice = async () => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.get(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamond-prices/get-all",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDiamondPriceById = async (diamondPriceID) => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamond-prices/${diamondPriceID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createDiamondPrice = async (diamondPrice) => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/diamond-price-management/diamond-prices/add",
      diamondPrice,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const updateDiamondPrice = async (diamondPriceID, diamondPrice) => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/diamond-price-management/diamond-prices/update/${diamondPriceID}`,
      diamondPrice,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const getDiamondPriceByCaratSize = async (caratSize) => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamond-prices/prices/${caratSize}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAllClarity = async () => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamond-prices/clarity`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAllColor = async () => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamond-prices/color`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAllCaratSize = async () => {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamond-prices/caratsize`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteDiamondPrice = async (diamondPriceIDs) => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.delete(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/diamond-price-management/diamond-prices/delete`
      , {
        headers: { Authorization: `Bearer ${token}` },
        data: diamondPriceIDs
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
