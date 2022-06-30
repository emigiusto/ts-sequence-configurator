import React from 'react'

//Custom components
import Event from "./Event/Event";

//MU
import { Typography, Box, Stack, Paper } from '@mui/material';

//Available Events
import eventData from '../../data/available-events.json';

function EventContainer({addSequence,idCount}) {
    return (
        <div>
            <Box sx={{'& > :not(style)': {mt: 2,p: 3,mb: 4,},}}>
                <Paper elevation={2}>
                    <Typography variant="h6" align="center" mb={4}>Add Events</Typography>
                    <Stack spacing={2} direction="column">
                        {eventData.map(event => {
                            return <Event   
                                        key={event.name} 
                                        event={event}
                                        addSequence={addSequence}
                                        idCount={idCount}
                                    ></Event>
                        })}
                    </Stack>
                </Paper>
            </Box>
        </div>
    )
}

export default EventContainer