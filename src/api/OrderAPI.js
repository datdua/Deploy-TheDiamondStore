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
      "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/orders/customer/create",
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
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/orders/customer/${accountID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Failed to fetch orders: ${response.status} - ${response.statusText}`);
    }

    // Axios automatically parses JSON response data
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}


export async function createPayment(orderID) {
  try {
    // URL to make the GET request
    const url = `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/payment/customer/createPayment?orderID=${orderID}`;

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
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/payment/customer/vnpay_return`,
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
  const token = localStorage.getItem('jwt')
  try {
    const response = await axios.get(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/promotion/customer/code/${promotionCode}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/orderDetail/customer/getOrderDetail?orderID=${orderID}`,
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
    const token = getAuthToken();
    const response = await axios.put(
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/orders/manager/update/${orderId}`,
      updatedOrder,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

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
  const token = localStorage.getItem('jwt')
  try {
    const url = `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/orders/customer/cancel/${orderId}`;
    const response = await axios.delete(url,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

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
      `https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/orders/getOrder/paged?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders by page:", error);
    throw error;
  }
};

export async function getAllOrder() {
  try{
  const token = getAuthToken();
  const response = await axios.get("https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/orders/get-all",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch jewelry data");
  }
  return response.data;
} catch (error) {
  console.error("Error fetching orders:", error);
  throw error;
}
}

export async function getOrdersHaveTransactionNo() {
  try{
  const token = getAuthToken();
  const response = await axios.get(
    "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/orders/getOrderHaveTransactionNo",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch order data");
  }
  return response.data;
} catch (error) {
  console.error("Error fetching orders:", error);
  throw error;
}
}
