import axios from "axios";

// Function to get the authentication token (example)
export const getAuthToken = () => {
  return localStorage.getItem("jwt"); // Adjust based on where you store the token
};

export const createOrder = async (
  accountId,
  deliveryAddress,
  phoneNumber,
  pointsToRedeem,
  promotionCode
) => {
  try {
    const token = getAuthToken();
    const data = new URLSearchParams();
    data.append("accountID", accountId);
    data.append("deliveryAddress", deliveryAddress);
    data.append("phoneNumber", phoneNumber);
    if (pointsToRedeem) data.append("pointsToRedeem", pointsToRedeem);
    if (promotionCode) data.append("promotionCode", promotionCode);

    const response = await axios.post(
      "http://localhost:8080/api/orders/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export async function fetchOrders(accountID) {
  if (!accountID) {
    throw new Error("Account ID is undefined");
  }

  const token = getAuthToken();
  try {
    const response = await fetch(
      `http://localhost:8080/api/orders/account/${accountID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorDetail = await response.text(); // Get the response text for more details
      throw new Error(
        `Network response was not ok: ${response.status} - ${errorDetail}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

export async function createPayment(orderID) {
  try {
    // URL to make the GET request
    const url = `http://localhost:8080/api/payment/createPayment?orderID=${orderID}`;

    // Retrieve the token from localStorage (or wherever you store it)
    const token = getAuthToken();

    // Set up headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // Make the GET request using axios
    const response = await axios.get(url, config);

    // Check if the response status is OK
    if (response.status === 200) {
      // Extract the payment URL from the response body
      const { url } = response.data;

      // Return the URL
      return url;
    } else {
      throw new Error("Failed to create payment");
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}
export const handleVnpayReturn = async (params) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `http://localhost:8080/api/payment/vnpay_return`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "VNPAY return request failed with status:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};
export const getPromotion = async (promotionCode) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/promotion/{promotionCode}?${promotionCode}`,
      {
        params: { promotionCode },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching promotion:", error);
    throw error;
  }
};

export async function fetchOrderDetail(orderID) {
  const token = getAuthToken();
  try {
    const response = await axios.get(
      `http://localhost:8080/api/orderDetail/getOrderDetail?orderID=${orderID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch order details");
    }

    const orderDetails = response.data;
    console.log("Fetched order details:", orderDetails);
    return orderDetails;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
}

export async function updateOrder(orderId, updatedOrder) {
  try {
    const url = `http://localhost:8080/api/orders/update/${orderId}`;
    const response = await axios.put(url, updatedOrder);

    if (response.status === 200) {
      return response.data; // Return data if needed
    } else {
      throw new Error(`Failed to update order with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating order:", error.message);
    throw error; // Throw error to handle it in the calling code
  }
}

export const deleteOrder = async (orderId) => {
  try {
    const url = `http://localhost:8080/api/orders/cancel/${orderId}`;
    const response = await axios.delete(url);

    if (response.status === 200) {
      return response.data; // Return data if needed
    } else {
      throw new Error(`Failed to delete order with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting order:", error.message);
    throw error; // Throw error to handle it in the calling code
  }
};

export const fetchOrderByPaged = async (page, size) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/orders/getOrder/paged?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders by page:", error);
    throw error;
  }
};

export async function getAllOrder() {
  const response = await axios.get("http://localhost:8080/api/orders/getAll");
  if (response.status !== 200) {
    throw new Error("Failed to fetch jewelry data");
  }
  return response.data;
}

export async function getOrdersHaveTransactionNo() {
  const response = await axios.get(
    "http://localhost:8080/api/orders/getOrderHaveTransactionNo"
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch order data");
  }
  return response.data;
}
