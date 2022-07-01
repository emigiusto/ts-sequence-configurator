//Custom components
import Event from "./Event/Event";
//Interfaces
import { IEvent } from '../../interfaces'

//MU
import { Typography, Box, Stack, Paper } from '@mui/material';

//Available Events
import _eventData from '../../data/available-events.json';
const eventData = _eventData as IEvent[];   //@Josh: Even though I'm adding an static type, I can't see errors on compile time.
                                            // Is it because I should import it from a Ts/Js file and not a Json?
export interface Props {
    addSequence: Function,
    idCount: number
}

function EventContainer({ addSequence , idCount }: Props) {
    return (
        <div>
            <Box sx={{'& > :not(style)': {mt: 2,p: 3,mb: 4,},}}>
                <Paper elevation={2}>
                    <Typography variant="h6" align="center" mb={4}>Add Events</Typography>
                    <Stack spacing={2} direction="column">
                        {   eventData.map((event: IEvent) => {
                                return <Event   key={event.name} 
                                                event={event}
                                                addSequence={addSequence}
                                                idCount={idCount}/>
                            })
                        }
                    </Stack>
                </Paper>
            </Box>
        </div>
    )
}

export default EventContainer