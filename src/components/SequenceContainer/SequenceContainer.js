import React from 'react'

//Custom components
import SequenceItem from "../SequenceItem/SequenceItem";

//MU
import { Typography, Paper, Grid, Box } from '@mui/material';

//Custom CSS
import './SequenceContainer.css'

function SequenceContainer({removeSequence,updateSequence,seqList}) {
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
                        {seqList.map(seq => {
                            return <SequenceItem 
                                        key={seq.id}
                                        removeSequence={removeSequence}
                                        updateSequence={updateSequence}
                                        seqItem={seq}
                                    ></SequenceItem>
                        })}
                    </Grid>
                </Paper>
            </Box>
        </div>
    )
}

export default SequenceContainer
