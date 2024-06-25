import axios from "axios";

// Jewelry API functions
export async function getAllJewelry() {
  const response = await axios.get(
    "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/jewelry"
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch jewelry data");
  }
  return response.data;
}

export async function searchJewelryByName(name) {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/jewelry/search/filter?jewelryName=${name}`
    );
    console.log(response.data); // Log the response data
    return response.data;
  } catch (error) {
    throw new Error("Failed to search jewelry by name");
  }
}

export async function getJewelryById(jewelryId) {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/jewelry/get/${jewelryId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch jewelry by ID");
  }
}

export async function getPage(page = 1, size = 9) {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/jewelry/paged/jewelrys?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch jewelry by page");
  }
}

export async function createJewelry(jewelry) {
  try {
    const response = await axios.post(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/jewelry/create",
      jewelry
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create jewelry");
  }
}

export async function updateJewelry(jewelryID, jewelry) {
  try {
    const response = await axios.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/jewelry/update/${jewelryID}`,
      jewelry
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update jewelry");
  }
}

export async function deleteJewelry(jewelryID) {
  try {
    const response = await axios.delete(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/jewelry/delete/${jewelryID}`
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
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/cart/add?accountID=${accountId}&jewelryID=${jewelryId}&quantity=${quantity}&sizeJewelry=${size}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add jewelry to cart");
  }
};

export async function searchJewelry(filters) {
  try {
    const response = await axios.get(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/jewelry/search/filter",
      {
        params: filters,
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch jewelry");
    }

    return response.data;
  } catch (error) {
    console.error("Error searching for jewelry:", error);
    throw new Error("Failed to fetch jewelry");
  }
}
