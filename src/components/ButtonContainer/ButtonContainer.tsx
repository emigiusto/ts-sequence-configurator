//MU
import { Box ,Stack ,Button ,TextField } from '@mui/material';

//Custom styles
import './ButtonContainer.css';

export interface Props {
    testSequence: Function,
    setTestModalOpen: Function,
    setDefaultDelay: Function,
    defaultDelay: number,
    clearAll: Function,
    setScreenshot: Function,
    copyToClipboard: Function,
    setImporterOpen: Function
    setToastOpen: Function,
    setToastMessage: Function,
}

function ButtonContainer({  testSequence,
                            setTestModalOpen, setDefaultDelay, 
                            defaultDelay,clearAll,setScreenshot,
                            copyToClipboard,setImporterOpen, 
                            setToastOpen, setToastMessage 
                        } : Props) {

    const handleTestClick = () : void => {
        testSequence()
        setTestModalOpen(true)
        setScreenshot("")
    }

    const handleImportClick = () : void => {
        setImporterOpen(true)
    }

    const handleClear = () : void => {
        setToastMessage("Cleared!")
        setToastOpen(true)
        clearAll()
    }
    
    const handleCopyToClipboard = (): void  => {
        setToastMessage("Copied!")
        setToastOpen(true)
        copyToClipboard()
    }

    const handleChange = (e: { target: { value: string; }; }) => {
        let inputValue = parseInt(e.target.value)
        if (inputValue>90) {
            setDefaultDelay(90)
            e.target.value = "90"
        } else {
            setDefaultDelay(inputValue)
        }
        
    }
    
    return (
        <div>
            {/* Button bar */}
            <Box sx={{'& > :not(style)': {mt: 6,p: 0}}}>
                    <Stack spacing={3} mt={8} direction="row" justifyContent="start">
                        <TextField label="Default delay (secs)" 
                                onChange={handleChange} 
                                placeholder={defaultDelay.toString()}
                                id="outlined-size-normal" margin="none" size="small"
                                className='delay-input'/>
                        <Button variant="contained" color="secondary" onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
                        <Button variant="contained" color="success" onClick={handleTestClick}>Test</Button>
                        <Button variant="contained" color="error" onClick={handleClear} >Clear All</Button>
                        <Button variant="outlined" color="secondary" onClick={handleImportClick} className="import-button" >Import</Button>
                    </Stack>
            </Box>
        </div>
    )
}

export default ButtonContainer