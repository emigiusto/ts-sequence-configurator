import React, {useState} from 'react'

//Helper Functions
import { sequenceParser } from "../../validators/sequenceParser";

//MU
import { Backdrop, Box, Modal, Fade, Typography, TextField, Button } from '@mui/material';

//Custom Styles
import './Importer.css'

export interface ImporterProps {
    importerOpen: boolean,
    setImporterOpen: Function,
    setSeqList: Function,
    setToastOpen: Function,
    setToastMessage: Function,
}

export default function Importer({ importerOpen, setImporterOpen, setSeqList, setToastOpen, setToastMessage } : ImporterProps) {
    const [newSequence, setNewSequence] = useState<string>("");

    const handleClose = () => setImporterOpen(false)

    const handleImportClick = () => {
        setSeqList(sequenceParser(newSequence))
        setImporterOpen(false)
        setToastMessage("Imported")
        setToastOpen(true)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSequence(event.target.value);
    };

    if(!importerOpen){
        return(null)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={importerOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={importerOpen}>
                    <Box sx={BoxStyle} className="importer">
                                <div className="importer-inner">
                                    <Typography variant='h5' mb={4} >Paste your sequence in the box below</Typography>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        placeholder='[    [ "navigate" , "" , "https://example.com" ], [....]     ]'
                                        multiline
                                        rows={15}
                                        onChange={handleChange}/>
                                    <Button variant="contained" color="success" className='importer__import-button' onClick={handleImportClick}>Import</Button>
                                </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

const BoxStyle = {
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};