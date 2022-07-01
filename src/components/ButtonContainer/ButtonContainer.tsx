import React, {useState} from 'react'

//MU
import { Box ,Stack ,Button ,TextField ,Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

//Custom styles
import './ButtonContainer.css';

export interface Props {
    testSequence: Function,
    setTestModalOpen: Function,
    setDefaultDelay: Function,
    defaultDelay: number,
    clearAll: Function,
    setScreenshot: Function,
    copyToClipboard: Function
}

function ButtonContainer({  testSequence,setTestModalOpen, setDefaultDelay, 
                        defaultDelay,clearAll,setScreenshot,copyToClipboard} : Props) {

    const [open, setOpen] = useState<boolean>(false);

    const handleTestClick = () : void => {
        testSequence()
        setTestModalOpen(true)
        setScreenshot("")
    }

    const handleClear = () : void => {
        clearAll()
    }
    
    const handleCopyToClipboard = (): void  => {
        setOpen(true)
        copyToClipboard()
    }

    //Toast handlers
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleChange = (e: { target: { value: string; }; }) => {
        let inputValue = parseInt(e.target.value)
        if (inputValue>90) {
            setDefaultDelay(90)
            e.target.value = "90"
        } else {
            setDefaultDelay(inputValue)
        }
        
    }

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    //End of toast handlers
    
    return (
        <div>
            {/* Button bar */}
            <Box sx={{'& > :not(style)': {mt: 6,p: 0}}}>
                    <Stack spacing={4} mt={8} direction="row" justifyContent="start">
                        <TextField label="Default delay (secs)" 
                                onChange={handleChange} 
                                placeholder={defaultDelay.toString()}
                                id="outlined-size-normal" margin="none" size="small"
                                className='delay-input'/>
                        <Button variant="contained" color="secondary" onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
                        <Button variant="contained" color="success" onClick={handleTestClick}>Test</Button>
                        <Button variant="contained" color="error" onClick={handleClear} >Clear All</Button>
                    </Stack>
            </Box>
            {/* Toast */}
            <Snackbar open={open} autoHideDuration={1200} onClose={handleClose} anchorOrigin={{vertical: "bottom",horizontal: "center"}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Copied
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ButtonContainer