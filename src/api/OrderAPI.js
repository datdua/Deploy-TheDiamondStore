import axios from 'axios';

// Function to get the authentication token (example)
export const getAuthToken = () => {
    return localStorage.getItem('jwt'); // Adjust based on where you store the token
};

export const createOrder = async (accountId, deliveryAddress, phoneNumber, pointsToRedeem, promotionCode) => {
    try {
        const token = getAuthToken();
        const data = new URLSearchParams();
        data.append('accountID', accountId);
        data.append('deliveryAddress', deliveryAddress);
        data.append('phoneNumber', phoneNumber);
        if (pointsToRedeem) data.append('pointsToRedeem', pointsToRedeem);
        if (promotionCode) data.append('promotionCode', promotionCode);

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
        console.error('Error creating order:', error);
        throw error;
    }
};

export async function fetchOrders(accountID) {
    if (!accountID) {
        throw new Error('Invalid accountID. Please provide a valid accountID.');
    }

    const token = getAuthToken();
    try {
        const response = await fetch(`http://localhost:8080/api/orders/account/${accountID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorDetail = await response.text(); // Get the response text for more details
            throw new Error(`Network response was not ok: ${response.status} - ${errorDetail}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch orders:', error);
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
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
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
            throw new Error('Failed to create payment');
        }
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
}
export const handleVnpayReturn = async (params) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`http://localhost:8080/api/payment/vnpay_return`, {
            params: params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('VNPAY return request failed with status:', error.response.status);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};
export const getPromotion = async (promotionCode) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/promotion/{promotionCode}?${promotionCode}`, {
            params: { promotionCode }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching promotion:', error);
        throw error;
    }
};