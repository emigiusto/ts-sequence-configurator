import React, { useState, useEffect } from 'react';

// MU
import { styled, Typography, Paper, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Interfaces
import { ISequenceItem, inputFieldEnum } from '../../../interfaces';

// Available events
import availableEvents from '../../../data/available-events';

// Custom Components
import InputGroup from '../InputGroup/InputGroup';

// Custom css
import './Item.css';

export interface ItemProps {
    seqItem: ISequenceItem
    updateSequence: Function
    removeSequence: Function
    moveSequence: Function
}

function Item({ seqItem, removeSequence, updateSequence, moveSequence }: ItemProps) {
  const [valid, setValid] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setValid(validateEventItem(seqItem));
  }, [seqItem]);

  const ItemBox = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleOpenClick = () => {
    setOpen(!open);
  };

  const handleRemoveClick = (id: number) : void => {
    removeSequence(id);
  };

  return (
    <Grid item className="sequence-grid-item" xs={12} sm={6} md={4} lg={4}>
      <div className="sequence-item" data-valid={valid}>
        <ItemBox className="sequence-item_box" onClick={handleOpenClick}>
          <Typography variant="button">
            {' '}
            {seqItem.name}
          </Typography>
          <CloseIcon
            onClick={() => handleRemoveClick(seqItem.id)}
            style={{
              float: 'right',
            }}
          />
        </ItemBox>
        { open
          ? (
            <>
              <button
                type="button"
                className="arrow-left"
                aria-label="Move Backward"
                onClick={() => moveSequence(seqItem.id, 'left')}
                onKeyDown={() => moveSequence(seqItem.id, 'left')}
              />
              <InputGroup
                name={seqItem.name}
                seqItem={seqItem}
                updateSequence={updateSequence}
              />
              <button
                type="button"
                className="arrow-right"
                aria-label="Move Forward"
                onClick={() => moveSequence(seqItem.id, 'right')}
                onKeyDown={() => moveSequence(seqItem.id, 'right')}
              />
            </>
          )
          : null}
      </div>
    </Grid>
  );
}

export default Item;

// Validates if all the required constraints defined in available-events.ts for an certain Event
export function validateEventItem(seqItem: ISequenceItem) : boolean {
  const ItemEventFiltered = availableEvents.filter((ev) => ev.name === seqItem.name)[0];
  if (ItemEventFiltered) {
    return ItemEventFiltered.required.every((reqSelector: inputFieldEnum) => (seqItem[reqSelector] !== ''));
  }
  return false;
}
