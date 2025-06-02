import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function ConfirmDelete({ open, handleClose, handleConfirm, setOpenConfirmDelete }) {
    const handleCancel = () => {
        handleClose(false); // Pass false to indicate cancel
        setOpenConfirmDelete(false);
    };

    const handleConfirmDelete = () => {
        handleConfirm(true); // Pass true to indicate confirmation
        setOpenConfirmDelete(false);
    };
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="draggable-dialog-title">
                <DialogContent>
                    <DialogContentText>Bạn có xác nhận muốn xóa ?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                        Không
                    </Button>
                    <Button onClick={handleConfirmDelete}>Có</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
