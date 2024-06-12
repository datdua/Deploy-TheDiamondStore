import axios from "axios";

export async function getAllProduct() {
  try {
    const response = await axios.get(
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/production/all"
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

export async function getProductPage(pageNumber = 1, pageSize = 4) {
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/production/paged?page=${pageNumber}&size=${pageSize}`
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
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/production/search`,
      {
        params: {
          diamondName: diamondName,
          jewelryName: jewelryName,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error searching for productions:", error);
    throw error;
  }
};
