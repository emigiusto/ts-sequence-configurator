import React, { useState} from 'react'

//Custom Components
import Item from "./Item/Item"

//MU
import Grid from '@mui/material/Grid';

export default function SequenceItem({seqItem,removeSequence,updateSequence}) {
    const [open, setOpen] = useState(false);

    return (
        <Grid item className='sequence-grid-item'  xs={12} sm={6} md={4} lg={4} >
            <Item 
                seqItem={seqItem}
                open={open}
                setOpen={setOpen}
                removeSequence={removeSequence}
                updateSequence={updateSequence}>
            </Item>
        </Grid>
    )
}
