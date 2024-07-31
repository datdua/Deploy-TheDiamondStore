import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../api/ProductAPI';
import { getAccountIDByEmail } from '../../api/accountCrud';

function PaymentConfirm() {
    const navigate = useNavigate();
    const [accountId, setAccountId] = useState(null);
    const location = useLocation();
    const token = getAuthToken();
    const queryParams = new URLSearchParams(location.search);

    const vnp_BankCode = queryParams.get('vnp_BankCode');
    let vnp_BankTranNo = queryParams.get('vnp_BankTranNo');
    if (vnp_BankTranNo) {
        vnp_BankTranNo = vnp_BankTranNo.split('VNP')[1];
    }
    let vnp_OrderInfo = queryParams.get('vnp_OrderInfo');
    if (vnp_OrderInfo) {
        vnp_OrderInfo = decodeURIComponent(vnp_OrderInfo).split(':')[1];
    }
    const vnp_ResponseCode = queryParams.get('vnp_ResponseCode');

    let apiUrl = "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/customer/payments/vnpay-return";

    apiUrl += `?vnp_BankCode=${encodeURIComponent(vnp_BankCode)}&vnp_OrderInfo=${encodeURIComponent(vnp_OrderInfo)}&vnp_ResponseCode=${encodeURIComponent(vnp_ResponseCode)}`;
    
    // Only add vnp_TransactionNo to the URL if it has a value
    if (vnp_BankTranNo) {
        apiUrl += `&vnp_TransactionNo=${encodeURIComponent(vnp_BankTranNo)}`;
    }

    useEffect(() => {
        const fetchAccount = async () => {
            const email = localStorage.getItem("email");
            const accountId = await getAccountIDByEmail(email);
            setAccountId(accountId);
        };

        fetchAccount();
    }, []);

    useEffect(() => {
        if (accountId) {
            fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    navigate(`/account/${accountId}`);
                });
        }
    }, [apiUrl, navigate, accountId, token]);

    return null;
}

export default PaymentConfirm;