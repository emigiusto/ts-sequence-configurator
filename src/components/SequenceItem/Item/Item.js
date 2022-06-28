import React, { useState, useEffect} from 'react'

//Custom Components
import InputGroup from '../InputGroup/InputGroup';

//MU
import { styled, Typography, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//Custom css
import './Item.css'

function Item({seqItem,open,removeSequence,setOpen,updateSequence}) {
    const [valid, setValid] = useState(false);

    useEffect(() => {
        let validation = seqItem.required.every(reqSelector =>  seqItem[reqSelector])
        setValid(validation);
    }, [seqItem]);

    const ItemBox = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleOpenClick = () =>{
        setOpen(!open)
    }

    const handleRemoveClick = (id) =>{
        removeSequence(id)
    }

    return (
        <div className='sequence-item' valid={valid.toString()}>
            <ItemBox className='sequence-item_box' onClick={handleOpenClick}>
                <Typography variant="button"> {seqItem.name}</Typography>
                <CloseIcon onClick={()=>handleRemoveClick(seqItem.id)} style={{float: "right"}}></CloseIcon>
            </ItemBox>
            {   open ?
                <InputGroup name={seqItem.name}
                            required={seqItem.required} 
                            seqItem={seqItem} 
                            setValid={setValid} 
                            updateSequence={updateSequence}>
                </InputGroup>
                : null
            }
        </div>
    );
}

export default Item;