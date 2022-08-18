import React from 'react';

// MU
import { Typography, Box, Stack, Paper } from '@mui/material';

// Custom components
import Event from './Event/Event';

// Interfaces
import { IEvent } from '../../interfaces';

// Available Events
import _eventData from '../../data/available-events';

const eventData = _eventData as IEvent[];
export interface EventContainerProps {
    addSequence: Function,
    idCount: number
}

function EventContainer({ addSequence, idCount }: EventContainerProps) {
  return (
    <div>
      <Box sx={{
        '& > :not(style)': {
          mt: 2, p: 3, mb: 4,
        },
      }}
      >
        <Paper elevation={2}>
          <Typography variant="h6" align="center" mb={4}>Add Events</Typography>
          <Stack spacing={2} direction="column">
            { eventData.map((event: IEvent) => (
              <Event
                key={event.name}
                event={event}
                addSequence={addSequence}
                idCount={idCount}
              />
            ))}
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}

export default EventContainer;
