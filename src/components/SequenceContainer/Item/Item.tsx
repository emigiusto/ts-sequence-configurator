import { useState, useEffect } from 'react'

//Interfaces
import { ISequenceItem , inputFieldEnum } from '../../../interfaces'

//Custom Components
import InputGroup from '../InputGroup/InputGroup';

//MU
import { styled, Typography, Paper, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//Custom css
import './Item.css'
export interface ItemProps {
    seqItem:  ISequenceItem
    updateSequence: Function
    removeSequence: Function
}

function Item({seqItem,removeSequence,updateSequence}: ItemProps) {
    const [valid, setValid] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(true);

    useEffect(() => {
        let validation = seqItem.required.every((reqSelector: inputFieldEnum) =>  {
            return (seqItem[reqSelector] !== "")
        })
        setValid(validation);
    }, [seqItem]);

    const ItemBox = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleOpenClick = () => {
        setOpen(!open)
    }

    const handleRemoveClick = (id:number) : void =>{
        removeSequence(id)
    }

    return (
        <Grid item className='sequence-grid-item'  xs={12} sm={6} md={4} lg={4} >
            <div className='sequence-item' data-valid={valid}>
                <ItemBox className='sequence-item_box' onClick={handleOpenClick}>
                    <Typography variant="button"> {seqItem.name}</Typography>
                    <CloseIcon onClick={()=>handleRemoveClick(seqItem.id)} style={{float: "right"}}></CloseIcon>
                </ItemBox>
                {   open ?
                    <InputGroup name={seqItem.name}
                                seqItem={seqItem} 
                                updateSequence={updateSequence}/>
                    : null
                }
            </div>
        </Grid>
    );
}

export default Item;