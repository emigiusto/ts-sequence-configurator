//Interfaces
import { ISequenceItem } from '../../interfaces'

//Custom components
import Item from "./Item/Item";

//MU
import { Typography, Paper, Grid, Box } from '@mui/material';

//Custom CSS
import './SequenceContainer.css'

export interface SequenceContainerProps {
    seqList:  ISequenceItem[]
    updateSequence: Function
    removeSequence: Function
}

function SequenceContainer({removeSequence,updateSequence,seqList} : SequenceContainerProps) {
    return (
        <div>
            <Box sx={{'& > :not(style)': {mt: 2,p: 3}}}>
                <Paper elevation={2}>
                <Typography variant="h6" mb={4}>Your Sequence</Typography>
                    <Grid container
                        rowSpacing={5}
                        columnSpacing={6}
                        direction="row"
                        justifyContent="flex-start"
                        className='sequence-grid-container'>
                        {seqList.map((seq: ISequenceItem) => {
                            return <Item 
                                        key={seq.id}
                                        removeSequence={removeSequence}
                                        updateSequence={updateSequence}
                                        seqItem={seq}/>
                        })}
                    </Grid>
                </Paper>
            </Box>
        </div>
    )
}

export default SequenceContainer