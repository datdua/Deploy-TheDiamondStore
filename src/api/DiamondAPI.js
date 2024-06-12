import axios from 'axios';

// Diamond API functions
export async function getAllDiamond() {
  const response = await axios.get(
    "http://localhost:8080/api/diamonds"
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch diamond data");
  }
  return response.data;
}

const BASE_URL = 'http://localhost:8080/api/diamonds/get';

export const getDiamondById = async (diamondId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${diamondId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching diamond data');
    }
};

export async function getPage(page = 1, size = 9) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/diamonds/paged/diamonds?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch diamond by page");
  }
}



export async function createDiamond(diamond) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/diamonds/create",
      diamond
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create jewelry");
  }
}

export async function updateDiamond(diamondID, diamond) {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/diamonds/update/${diamondID}`,
      diamond
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update Diamond");
  }
}

export async function deleteDiamond(diamondID) {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/diamonds/delete/${diamondID}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete diamond");
  }
}

export async function getCertificateImage(certificationID) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/certificates/get/certificateImg/${certificationID}`
    );
    console.log("API Response:", response.data); // Debug line
    return response.data.certificateImage; // Correctly extract the certificateImage URL
  } catch (error) {
    throw new Error("Failed to fetch diamond certificate image");
  }
}

export async function getWarrantityImage(warrantyID) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/warranties/get/warrantyImg/${warrantyID}`
    );
    console.log("API Response:", response.data); // Debug line
    return response.data.warrantyImage; // Correctly extract the warrantityImage URL
  } catch (error) {
    throw new Error("Failed to fetch diamond warranty image");
  }
}

export async function searchDiamondByName(name) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/diamonds/search/filter?diamondNameLike=${name}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to search diamonds by name");
    }
    const data = response.data;
    console.log("Diamond search results:", data);
    return data;
  } catch (error) {
    console.error("Error searching for diamonds:", error);
    throw error;
  }
}

export const searchDiamond = async (filters, page = 1) => {
  try {
    const params = { ...filters, page };
    const queryString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const response = await axios.get(
      `http://localhost:8080/api/diamonds/search/filter?${queryString}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch diamonds");
    }
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch diamonds");
  }
};


