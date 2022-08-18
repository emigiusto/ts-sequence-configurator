import React from 'react';

// MU
import TextField from '@mui/material/TextField';

// Interfaces
import { ISequenceItem } from '../../../interfaces';

export interface InputGroupProps {
    name: string
    seqItem: ISequenceItem
    updateSequence: Function
}

function InputGroup({ name, seqItem, updateSequence }:InputGroupProps) {
  switch (name) {
  case 'navigate':
    return (
      <form className="sequence-item_more-inputs">
        <TextField
          label="URL"
          placeholder="https://www.example.com/"
          name="url"
          fullWidth
          onChange={((event) => {
            updateSequence({
              ...seqItem, url: event.target.value,
            });
          })}
          value={seqItem.url}
          id="outlined-size-normal"
          margin="normal"
          size="small"
        />
      </form>
    );
  case 'click':
    return (
      <form className="sequence-item_more-inputs">
        <TextField
          label="SELECTOR"
          placeholder="#idExample"
          name="selector"
          fullWidth
          onChange={((event) => {
            updateSequence({
              ...seqItem, selector: event.target.value,
            });
          })}
          value={seqItem.selector}
          id="outlined-size-normal"
          margin="normal"
          size="small"
        />
      </form>
    );
  case 'waitUntil':
    return (
      <form className="sequence-item_more-inputs">
        <TextField
          label="SELECTOR"
          placeholder="#idExample"
          name="selector"
          fullWidth
          onChange={((event) => {
            updateSequence({
              ...seqItem, selector: event.target.value,
            });
          })}
          value={seqItem.selector}
          id="outlined-size-normal"
          margin="normal"
          size="small"
        />
      </form>
    );
  case 'setValue':
    return (
      <form className="sequence-item_more-inputs">
        <TextField
          label="SELECTOR"
          placeholder="#idExample"
          name="selector"
          fullWidth
          onChange={((event) => {
            updateSequence({
              ...seqItem, selector: event.target.value,
            });
          })}
          value={seqItem.selector}
          id="outlined-size-normal"
          margin="normal"
          size="small"
        />
        <TextField
          label="VALUE"
          placeholder="myUserName"
          name="value"
          fullWidth
          onChange={((event) => {
            updateSequence({
              ...seqItem, value: event.target.value,
            });
          })}
          value={seqItem.value}
          id="outlined-size-normal"
          margin="normal"
          size="small"
        />
      </form>
    );
  case 'submit':
    return (
      <form className="sequence-item_more-inputs">
        <TextField
          label="SELECTOR"
          placeholder="#idExample"
          name="selector"
          fullWidth
          onChange={((event) => {
            updateSequence({
              ...seqItem, selector: event.target.value,
            });
          })}
          value={seqItem.selector}
          id="outlined-size-normal"
          margin="normal"
          size="small"
        />
      </form>
    );
  case 'timeout':
    return (
      <form className="sequence-item_more-inputs">
        <TextField
          label="VALUE"
          type="number"
          placeholder="Timeout value in milisecs"
          name="value"
          fullWidth
          onChange={((event) => {
            updateSequence({
              ...seqItem, value: event.target.value,
            });
          })}
          value={seqItem.value}
          id="outlined-size-normal"
          margin="normal"
          size="small"
        />
      </form>
    );
  default:
    return null;
  }
}

export default InputGroup;
