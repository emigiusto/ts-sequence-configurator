import React from 'react'

//MU
import Button from '@mui/material/Button';

export default function Event({event,addSequence,idCount}) {

    const handleAddEvent = (event) =>{
        let newEvent = {
            ...event,
            id: idCount+1,
            url: '',
            selector: '',
            value: ''
        }
        addSequence(newEvent);
    }

    return (
        <Button 
            variant="outlined"
            onClick={()=>handleAddEvent(event)}>
            {event.name}
        </Button>
    )
}
