import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { resetPassword, regenerateOTP } from '../../api/accountCrud'; 
import { Link } from 'react-router-dom'; 
import Close from '@mui/icons-material/Close';

function ForgetPasswordModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await resetPassword(email);
            toast.success('Email đặt lại mật khẩu đã gửi thành công');
            onClose(); 
        } catch (error) {
            toast.error('Email đặt lại mật khẩu đã gửi thất bại');
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
                        <div className="modal-header text-white justify-content-between" style={{ backgroundColor: '#f2ba59', display: 'flex', alignItems: 'center' }}>
                            <h5 className="modal-title text-white" id="exampleModalLabel" style={{marginLeft:'50px'}}>Đặt lại mật khẩu</h5>
                            <button type="button" className="btn" onClick={onClose} style={{ padding: 0,  }}>
                                <Close />
                            </button>
                        </div>
                        <div className="modal-body px-5">
                            <p className="py-2">
                                Nhập địa chỉ email và chúng tôi sẽ gửi một email xác thực về tài khoản gmail dựa trên địa chỉ email của bạn
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
                                className="btn w-100 my-2 text-white"
                                onClick={handleSubmit}
                                disabled={loading}
                                style={{ backgroundColor: '#f2ba59' }}
                            >
                                {loading ? 'Đang gửi...' : 'Gửi email xác thực'}
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default ForgetPasswordModal;
