import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api",
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      return Promise.reject(new Error("Bạn không có thẩm quyền thực hiện"));
    }
    return Promise.reject(error);
  }
);

export async function getAllDiamond() {
  const response = await axios.get(
    "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamonds"
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch diamond data");
  }
  return response.data;
}

export async function getAllDiamond_Manager() {
  const token = localStorage.getItem('jwt');
  const response = await axios.get(
    "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/diamonds/get-all",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch diamond data");
  }
  return response.data;
}

const BASE_URL = 'https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamonds';

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
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamonds/get-paging?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch diamond by page");
  }
}

export async function createDiamond(diamond) {
  try {
    const token = localStorage.getItem('jwt');
    const response = await apiClient.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/diamond-management/diamonds/add",
      diamond,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateDiamond(diamondID, diamond) {
  try {
    const token = localStorage.getItem('jwt');
    const response = await apiClient.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/diamond-management/diamonds/update/${diamondID}`,
      diamond,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteDiamond(diamondIDs) {
  try {
    const token = localStorage.getItem('jwt');
    const response = await apiClient.delete(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/diamond-management/diamonds/delete",
      {
        headers: { Authorization: `Bearer ${token}` },
        data: diamondIDs, 
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCertificateImage(certificationID) {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/customer/certificates/get-certificate-image/${certificationID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("API Response:", response.data); // Debug line
    return response.data.certificateImage; // Correctly extract the certificateImage URL
  } catch (error) {
    throw new Error("Failed to fetch diamond certificate image");
  }
}

export async function getWarrantityImage(warrantyID) {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/customer/warranty-management/warranties/warrantyImg/${warrantyID}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamonds/search?diamondNameLike=${name}`
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

export const searchDiamond = async (filters, page = 1, size = 9) => {
  try {
    const params = { ...filters, page, size };
    const queryString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/diamonds/search/get-paging?${queryString}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch diamonds");
    }
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch diamonds");
  }
};
