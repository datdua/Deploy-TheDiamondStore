import axios from "axios";

export const getAccountIDByEmail = async (email) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(
      `http://localhost:8080/api/accounts/getByEmail/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.accountID; // Adjust this line according to your actual API response
  } catch (error) {
    console.error("Error fetching account ID:", error);
    throw new Error("Failed to fetch account information: " + error.message);
  }
};

export const addJewelryToCart = async (
  accountID,
  jewelryId,
  quantity,
  size
) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(
      `http://localhost:8080/api/cart/add?accountID=${accountID}&jewelryID=${jewelryId}&quantity=${quantity}&sizeJewelry=${size}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw new Error("Failed to add item to cart");
  }
};
export const addDiamondToCart = async (accountID, diamondId, quantity) => {
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.post(
            `http://localhost:8080/api/cart/add?accountID=${accountID}&diamondID=${diamondId}&quantity=${quantity}`,
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data; 
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw new Error("Failed to add item to cart");
    }
};
export const getAllCartItems = async (accountID) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(
      `http://localhost:8080/api/cart?accountID=${accountID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to fetch cart items");
  }
};

export const removeCartItem = async (cartID) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/cart/remove/${cartID}`
    );
    console.log("Item removed successfully:", response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error removing item:", error);
    throw error;
  }
};
export const getTotalCart = async (accountID) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(
      `http://localhost:8080/api/cart/totalCart?accountID=${accountID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Adjust this line according to your actual API response
  } catch (error) {
    console.error("Error fetching total cart value:", error);
    throw new Error("Failed to fetch total cart value: " + error.message);
  }
};
