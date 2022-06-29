import React, { useState, useEffect } from 'react'

//MU
import { Backdrop, Box, Modal, Fade, Typography } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ErrorIcon from '@mui/icons-material/Error';

//Custom Styles
import './Tester.css'

const style = {
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Tester({ testModalOpen, screenshot, eventLog, setTestModalOpen, errorMessage }) {
    const [loader, setLoader] = useState(true);
    const handleClose = () => setTestModalOpen(false);

    useEffect(() => {
        setLoader(true)
    }, [testModalOpen]);

    useEffect(() => {
        if (!(screenshot && Object.keys(screenshot).length === 0)){
            setLoader(false)
        }
    }, [screenshot]);

    if(!testModalOpen){
        return(null)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={testModalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={testModalOpen}>
                    <Box sx={style} className="tester">
                        {errorMessage ? 
                            <div className="tester-image-container">
                                <Typography variant='h5' mb={4} >Error!</Typography>
                                <code className="error-message">{errorMessage}</code>
                                { //Renders log events
                                    eventLog ? 
                                        <><Typography variant='h6' className='event-log-title' mt={4}>Event log:</Typography>
                                        <ul className="event-log-list"> 
                                            {eventLog.map((step, i, elog) => {
                                                if (i+1 === elog.length) {
                                                    return(
                                                        <li key={"" + step.type + step.key} mt={3} className="event-log-list_item">
                                                            <code >{JSON.stringify(step)}</code>
                                                            <ErrorIcon style={{float: "right"}}></ErrorIcon>
                                                        </li>)
                                                } else {
                                                    return(
                                                        <li key={"" + step.type + step.key} mt={3} className="event-log-list_item">
                                                            <code >{JSON.stringify(step)}</code>
                                                            <AssignmentTurnedInIcon style={{float: "right"}}></AssignmentTurnedInIcon>
                                                        </li>)
                                                }
                                                
                                            })}
                                        </ul></> : null
                                }
                            </div>
                            :
                                (loader ?
                                <div className="loader-container">
                                        <p>Loading...</p>
                                        <span>This process may take up to 30 seconds</span>
                                        <div className="loader"></div>
                                </div>
                                :
                                <div className="tester-image-container">
                                    <h4>Success!</h4>
                                    <p>The sequence has been executed. This is an screenshot of the last screen:</p>
                                    <img 
                                        src={'data:image/png;base64,'+ screenshot} 
                                        alt={"tool-screenshot"}
                                        className="tester-image"/>
                                </div>)
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}