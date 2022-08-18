import React from 'react';

// MU
import Button from '@mui/material/Button';

// Interfaces
import { IEvent } from '../../../interfaces';

export interface EventProps {
    event: IEvent,
    addSequence: Function,
    idCount: number
}

export default function Event({ event, addSequence, idCount }: EventProps) {
  const handleAddEvent = (newEventObject: IEvent) : void => {
    const newEvent = {
      ...newEventObject,
      id: idCount + 1,
      url: '',
      selector: '',
      value: '',
    };
    addSequence(newEvent);
  };

  return (
    <Button
      variant="outlined"
      onClick={() => handleAddEvent(event)}
    >
      {event.name}
    </Button>
  );
}
