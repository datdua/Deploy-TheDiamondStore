import axios from "axios";

export const getAllDiamondPrice = async () => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.get(
      "http://localhost:8080/api/diamondprices/guest/getAll",
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
      `http://localhost:8080/api/diamondprices/${diamondPriceID}`,
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
      "http://localhost:8080/api/diamondprices/manager/create",
      diamondPrice,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateDiamondPrice = async (diamondPriceID, diamondPrice) => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.put(
      `http://localhost:8080/api/diamondprices/manager/${diamondPriceID}`,
      diamondPrice,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDiamondPriceByCaratSize = async (caratSize) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/diamondprices/guest/prices/${caratSize}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAllClarity = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/diamondprices/guest/api/clarity`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAllColor = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/diamondprices/guest/api/color`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAllCaratSize = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/diamondprices/guest/api/caratsize`
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
      `http://localhost:8080/api/diamondprices/manager/delete`
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
