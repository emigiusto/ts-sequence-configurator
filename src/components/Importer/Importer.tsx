import { useState, useEffect } from 'react'

//Interfaces
import { ILogEvent } from '../../interfaces'

//MU
import { Backdrop, Box, Modal, Fade, Typography, TextField, Button } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ErrorIcon from '@mui/icons-material/Error';

//Custom Styles
import './Importer.css'

export interface Props {
    importerOpen: boolean,
    setImporterOpen: Function
}

export default function Importer({ importerOpen, setImporterOpen } : Props) {

    const handleClose = () => setImporterOpen(false)

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
                                    <Typography variant='h5' mb={6} >Paste your sequence in the box below</Typography>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        placeholder='[    [ "navigate" , "" , "https://example.com" ], [....]     ]'
                                        multiline
                                        rows={20}/>
                                    <Button variant="contained" color="success" className='importer__import-button'/* onClick={handleTestClick} */>Import</Button>
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