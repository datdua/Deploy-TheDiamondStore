// src/components/ForgetPasswordModal.js

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { resetPassword } from '../../api/accountCrud';

function ForgetPasswordModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await resetPassword(email);
            toast.success('Password reset email sent successfully');
            onClose(); // Close modal on success
        } catch (error) {
            toast.error('Failed to send password reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        isOpen && (
            <div className="modal top fade show" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true" style={{ display: 'block' }}>
                <div className="modal-dialog" style={{ width: '300px' }}>
                    <div className="modal-content text-center">
                        <div className="modal-header h5 text-white bg-primary justify-content-center">
                            Password Reset
                        </div>
                        <div className="modal-body px-5">
                            <p className="py-2">
                                Enter your email address and we'll send you an email with instructions to reset your password.
                            </p>
                            <div data-mdb-input-init className="form-outline">
                                <input
                                    type="email"
                                    id="typeEmail"
                                    className="form-control my-3"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Reset password'}
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default ForgetPasswordModal;
