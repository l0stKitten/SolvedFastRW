import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function AlertMessage({ openAlert, handleOpenAlert, severity, message }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        handleOpenAlert(false);
    };

    return (
        <Snackbar 
            open={openAlert} 
            autoHideDuration={3000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}