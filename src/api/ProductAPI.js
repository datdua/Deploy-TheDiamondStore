import axios from "axios";

// Function to fetch products with authentication token
export const getAuthToken = () => {
  return localStorage.getItem("jwt"); // Adjust based on where you store the token
};

export async function getAllProduct() {
  try {
    const token = getAuthToken();
    console.log("Token:", token); // Logging token for debugging
    const response = await axios.get(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/production/all",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Example of using Bearer token authentication
        },
      }
    );
    console.log("Response:", response); // Logging entire response object for inspection

    // Check if response.data is an object and contains properties 'jewelry' and 'diamonds'
    if (
      typeof response.data === "object" &&
      response.data.jewelry &&
      response.data.diamonds
    ) {
      // Combine the two arrays into one
      return [...response.data.jewelry, ...response.data.diamonds];
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}
// In ProductAPI.js
export async function getProductPage(pageNumber = 1, pageSize = 4) {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/production/paged?page=${pageNumber}&size=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}
export const searchProductionByName = async (diamondName, jewelryName) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/production/search`,
      {
        params: {
          diamondName: diamondName,
          jewelryName: jewelryName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error searching for productions:", error);
    throw error;
  }
};
