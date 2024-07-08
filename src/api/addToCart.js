import axios from "axios";

export const addJewelryToCart = async (
  accountID,
  jewelryId,
  quantity,
  size
) => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.post(
      `http://localhost:8080/api/cart/customer/add?accountID=${accountID}&jewelryID=${jewelryId}&quantity=${quantity}&sizeJewelry=${size}`,
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
      `http://localhost:8080/api/cart/customer/add?accountID=${accountID}&diamondID=${diamondId}&quantity=${quantity}`,
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
      `http://localhost:8080/api/cart/customer?accountID=${accountID}`,
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
  const token = localStorage.getItem('jwt')
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/cart/customer/remove/${cartID}`,{
        headers: {
          Authorization: `Bearer ${token}`
          }
      }
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
      `http://localhost:8080/api/cart/customer/totalCart?accountID=${accountID}`,
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

export const updateCart = async (cartId, accountId, diamondId, jewelryId, quantity, sizeJewelry) => {
  const token = localStorage.getItem('jwt')
  try {
      let url = `http://localhost:8080/api/cart/customer/update/${cartId}?accountID=${accountId}&quantity=${quantity}`;
      
      if (diamondId) {
          url += `&diamondID=${diamondId}`;
      } else if (jewelryId) {
          url += `&jewelryID=${jewelryId}`;
      }

      if (sizeJewelry !== null) {
          url += `&sizeJewelry=${sizeJewelry}`;
      }

      const response = await axios.put(url,{
        headers: {
          Authorization: `Bearer ${token}`
          }
      });
      
      const result = response.data;
      if (response.status === 200 && !result.error) {
          return result;
      } else {
          throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }
  } catch (error) {
      console.error('Error updating the cart:', error);
      throw error;
  }
};
