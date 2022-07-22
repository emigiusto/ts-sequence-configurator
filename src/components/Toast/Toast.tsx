import React from 'react'

//MU
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export interface Props {
    toastOpen: boolean,
    setToastOpen: Function,
    toastMessage: string
}

function Toast({toastOpen, setToastOpen, toastMessage} : Props) {

    const handleToastClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastOpen(false);
    };

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <Snackbar open={toastOpen} autoHideDuration={1200} onClose={handleToastClose} anchorOrigin={{vertical: "bottom",horizontal: "center"}}>
                <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
    );
}

export default Toast;