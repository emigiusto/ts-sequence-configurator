import React, { useState, useEffect } from 'react';

// MU
import { Backdrop, Box, Modal, Fade, Typography } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ErrorIcon from '@mui/icons-material/Error';

// Interfaces
import { ILogEvent } from '../../interfaces';

// Custom Styles
import './Tester.css';

export interface TesterProps {
    screenshot: string,
    testModalOpen: boolean,
    eventLog: ILogEvent[],
    setTestModalOpen: Function,
    errorMessage: string,
    defaultDelay: number,
    eventCount: number
}

export default function Tester({
  testModalOpen,
  screenshot,
  eventLog,
  setTestModalOpen,
  errorMessage,
  defaultDelay,
  eventCount,
} : TesterProps) {
  const [loader, setLoader] = useState(true);
  const handleClose = () => setTestModalOpen(false);

  useEffect(() => {
    setLoader(true);
  }, [testModalOpen]);

  useEffect(() => {
    if (Object.keys(screenshot).length !== 0 || errorMessage !== '') {
      setLoader(false);
    }
  }, [screenshot, errorMessage]);

  if (!testModalOpen) {
    return (null);
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
        }}
      >
        <Fade in={testModalOpen}>
          <Box sx={BoxStyle} className="tester">
            {!loader
              ? (
                <div className="tester-image-container">
                  {errorMessage ? (
                    <div className="title-container">
                      <Typography variant="h5" mr={6}>Error!</Typography>
                      <img src="/icons/cancel-40.png" alt="cancel-icon" className="tester-icon" />
                    </div>
                  )
                    : (
                      <div className="title-container">
                        <Typography variant="h5" mr={6}>Success!</Typography>
                        <img src="/icons/done-40.png" alt="done-icon" className="tester-icon" />
                      </div>
                    )}

                  <code className="error-message">{errorMessage}</code>

                  {// Renders screenshot if not null
                    screenshot
                      ? (
                        <>
                          <Typography variant="body2" mt={4} mb={3} align="left">Screenshot of the last screen:</Typography>
                          <img src={`data:image/png;base64,${screenshot}`} alt="tool-screenshot" className="tester-image" />
                        </>
                      ) : null
                  }
                  { // Renders log events if not null
                    eventLog
                      ? (
                        <>
                          <Typography variant="h6" className="event-log-title" mt={4}>Event log:</Typography>
                          <ul className="event-log-list">
                            {eventLog.map((step: ILogEvent, i:number, elog: ILogEvent[]) => {
                              if (i + 1 === elog.length && errorMessage) {
                                return (
                                  <li key={`${step.type}${step.key}`} className="event-log-list_item">
                                    <code>{JSON.stringify(step)}</code>
                                    <ErrorIcon style={{
                                      float: 'right',
                                    }}
                                    />
                                  </li>
                                );
                              }
                              return (
                                <li key={`${step.type}${step.key}`} className="event-log-list_item">
                                  <code>{JSON.stringify(step)}</code>
                                  <AssignmentTurnedInIcon style={{
                                    float: 'right',
                                  }}
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : null
                  }
                </div>
              )
            /* Loader */
              : (
                <div className="loader-container">
                  <p>Loading...</p>
                  <span>
                    This process may take up to {defaultDelay * eventCount} seconds
                  </span>
                  <div className="loader" />
                </div>
              )}
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
