import React, { useState } from 'react';
import { createAccount } from '../../api/accountCrud'; // Adjust this import to your file structure

function AddAccountForm() {
    const [account, setAccount] = useState({
        accountName: '',
        email:'',
        password: '',
        phoneNumber: '',
        role: '',
    });
    
    const [message, setMessage] = useState(''); // New state variable for the message
    
    const handleChange = (event) => {
        setAccount({ ...account, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await createAccount(account);
        console.log(response);
        setMessage('Tạo mới tài khoản thành công'); // Set the message on success
        } catch (error) {
        console.error(error);
        setMessage('Tạo mới tài khoản thất bại'); // Set the message on failure
        }
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input name="accountName" value={account.accountName} onChange={handleChange} placeholder="accountname" required />
            <input name="email" value={account.email} onChange={handleChange} placeholder="email" required />
            <input name="password" value={account.password} onChange={handleChange} placeholder="password" required />
            <input name="phoneNumber" value={account.phoneNumber} onChange={handleChange} placeholder="phoneNumber" />
            <input name="role" value={account.role} onChange={handleChange} placeholder="role" required/>
            <button type="submit">Create account</button>
        </form>
        {message && <p>{message}</p>} {/* Render the message if it exists */}
        </div>
    );
    }

export default AddAccountForm;
