import axios from 'axios';


export const getAuthToken = () => {
    return localStorage.getItem('jwt'); 
};

export async function getAllProduct() {
    try {
        const response = await axios.get(
          "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/products/get-all",{
          },
        );
        console.log('Response:', response); 
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

export async function getProductPage(page = 1, size = 4) {
  try {
      page = typeof page === 'object' ? 1 : Number(page);

      const response = await axios.get(
        `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/products/get-paging?page=${page}&size=${size}`,
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
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/guest/products/search/get-paging`,
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