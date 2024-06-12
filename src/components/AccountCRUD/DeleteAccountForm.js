import React from "react";
import { Button } from 'react-bootstrap';
import { deleteAccount } from "../../api/accountCrud";


function DeleteAccountForm({ accountID, onDelete }) {
    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc muốn XÓA tài khoản này ?')) {
            try {
                await deleteAccount(accountID);
                onDelete(accountID);
                alert('Xóa thành công');
            } catch (error) {
                alert('Xóa thất bại');
            }
        }
    };

    return (
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
    );
}
export default DeleteAccountForm;