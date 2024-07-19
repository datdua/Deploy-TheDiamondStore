import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

 function EmailConfirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const email = queryParams.get('email');
    const otp = queryParams.get('otp');

    let apiUrl = "https://diamondstore.lemonhill-6b585cc3.eastasia.azurecontainerapps.io/api/auth/verify-account"

    apiUrl += `?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`;
    useEffect(()=>{
        fetch(apiUrl, {
            method: 'PUT'
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
        .finally(()=>{
            navigate('/dangnhap')
        })
    },[apiUrl, navigate])
  return null;
}
export default EmailConfirm
