import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react'; 
import { setPassword } from '../../api/accountCrud';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import queryString from 'query-string'; 
function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const queryParams = queryString.parse(location.search); 
    const emailParam = queryParams.email;
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location.search]); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Mật khẩu không trùng khớp');
      return;
    }

    try {
      await setPassword(email, newPassword);
      setMessage('Mật khẩu đã được thay đổi');
      toast.success('Mật khẩu đã được đổi thành công, vui lòng quay lại trang đăng nhập')
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };
  return (
    <div className="container" style={{ marginTop: "40px", maxWidth: "50%" }}>
      <div className="row">
        <div className="col-sm-12">
          <div className="horizontal-container">
            <div className="horizontal-form-box">
              <div className="horizontal-info-container text-center">
                <p style={{fontSize:'30px', fontWeight:'bold', marginTop:'30px'}} className="horizontal-heading">Đổi Mật Khẩu Mới</p>
              </div>
              <form className="horizontal-form" onSubmit={handleSubmit}>
                <div className="o3-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="o3-form-control o3-input-lg"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled
                  />
                </div>
                <div className="o3-form-group">
                  <label htmlFor="new_password">Mật khẩu mới</label>
                  <input
                    type="password"
                    className="o3-form-control o3-input-lg"
                    id="new_password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="o3-form-group">
                  <label htmlFor="confirm_password">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    className="o3-form-control o3-input-lg"
                    id="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="o3-form-group">
                  <Button style={{margin: '10px 0px'}} type="submit" className="tm-button">Đặt mật khẩu mới</Button>
                </div>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;