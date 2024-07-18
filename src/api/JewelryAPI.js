import axios from "axios";

// Jewelry API functions
export async function getAllJewelry() {
  const response = await axios.get(
    "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/jewelry-management/jewelries/get-all"
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch jewelry data");
  }
  return response.data;
}

export async function searchJewelryByName(name) {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/jewelry-management/jewelries/searchByName?name=${name}`
    );
    console.log(response.data); 
    return response.data;
  } catch (error) {
    throw new Error("Failed to search jewelry by name");
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

export async function getJewelryById(jewelryId) {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/jewelry-management/jewelries/${jewelryId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch jewelry by ID");
  }
}

export async function getPage(page = 1, size = 9) {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/jewelry-management/jewelries/get-paging?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch jewelry by page");
  }
}

export async function createJewelry(jewelry) {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/jewelry-management/jewelries/add",
      jewelry,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create jewelry");
  }
}

export async function updateJewelry(jewelryID, jewelry) {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/jewelry-management/jewelries/update/${jewelryID}`,
      jewelry,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update jewelry");
  }
}

export async function deleteJewelry(jewelryIDs) {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.delete(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/manager/jewelry-management/jewelries/delete`
      , { 
        headers: { Authorization: `Bearer ${token}` },
        data: jewelryIDs }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete jewelry");
  }
}

// Cart API functions
export const addToCart = async (accountId, jewelryId, quantity, size) => {
  try {
    const response = await axios.post(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/cart/customer/add?accountID=${accountId}&jewelryID=${jewelryId}&quantity=${quantity}&sizeJewelry=${size}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add jewelry to cart");
  }
};

export async function searchJewelry(page = 1, filters = {}) {
  try {
    // Construct the query parameters including filters and pagination
    const params = new URLSearchParams({
      ...filters, // Spread the filters object to include its properties as individual parameters
      page, 
      size: 9, 
    });

    const response = await axios.get(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/jewelry-management/jewelries/search/get-paging",
      { params }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch jewelry");
    }

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch jewelry");
  }
}

