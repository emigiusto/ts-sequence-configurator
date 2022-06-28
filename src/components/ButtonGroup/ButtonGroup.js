import React,{useState} from 'react'

//MU
import { Box ,Stack ,Button ,TextField ,Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

//Custom styles
import './ButtonGroup.css';

function ButtonGroup({  testSequence,setTestModalOpen, setDefaultDelay, 
                        defaultDelay,clearAll,setScreenshot,copyToClipboard}) {

    const [open, setOpen] = useState(false);

    const handleTestClick = () => {
        testSequence()
        setTestModalOpen(true)
        setScreenshot({})
    }
    
    const handleCopyToClipboard = () => {
        setOpen(true)
        copyToClipboard()
    }

    //Toast handlers
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleChange = (e) => {
        setDefaultDelay(e.target.value)
    }
    const Alert = React.forwardRef(function Alert(props, ref) {
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
                        <Button variant="contained" onClick={clearAll} color="error">Clear All</Button>
                        
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

export default ButtonGroup