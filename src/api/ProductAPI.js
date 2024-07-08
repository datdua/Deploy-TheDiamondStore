import axios from 'axios';

// Function to fetch products with authentication token
export const getAuthToken = () => {
    return localStorage.getItem('jwt'); // Adjust based on where you store the token
};

export async function getAllProduct() {
  const token = getAuthToken();
    try {
// Logging token for debugging
        const response = await axios.get(
          "http://localhost:8080/api/production/customer/all",{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Response:', response); // Logging entire response object for inspection

        // Check if response.data is an object and contains properties 'jewelry' and 'diamonds'
        if (typeof response.data === 'object' && response.data.jewelry && response.data.diamonds) {
            // Combine the two arrays into one
            return [...response.data.jewelry, ...response.data.diamonds];
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
}
// In ProductAPI.js
export async function getProductPage(page = 1, size = 4) {
  try {
      // Ensure page is a number
      page = typeof page === 'object' ? 1 : Number(page);

      const response = await axios.get(
        `http://localhost:8080/api/production/guest/paged?page=${page}&size=${size}`,
      );
      
      if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response.data;
  } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
  }
}
export const searchProductionByName = async (name, page = 1, size = 9) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/production/guest/search/filter/page`,
      {
        params: {
          name: name,
          page: page,
          size: size,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching production by name:", error);
    throw error;
  }
};