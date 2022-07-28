//Interfaces
import { IEvent } from '../../../interfaces'
//MU
import Button from '@mui/material/Button';

export interface EventProps {
    event: IEvent,
    addSequence: Function,
    idCount: number
}

export default function Event({event,addSequence,idCount}: EventProps) {

    const handleAddEvent = (event: IEvent) : void =>{
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
