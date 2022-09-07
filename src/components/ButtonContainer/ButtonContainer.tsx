import React, { useEffect, useState } from 'react';

// MU
import { Box, Stack, Button, TextField, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Custom styles
import './ButtonContainer.css';

export interface ButtonContainerProps {
    testSequence: Function,
    setDefaultDelay: Function,
    defaultDelay: number,
    clearAll: Function,
    copyToClipboard: Function,
    setImporterOpen: Function
    setToastOpen: Function,
    setToastMessage: Function,
    setEnvironmentPath: Function,
    environmentPath: string,
}

function ButtonContainer({
  testSequence, setDefaultDelay,
  defaultDelay, clearAll,
  copyToClipboard, setImporterOpen,
  setToastOpen, setToastMessage,
  setEnvironmentPath, environmentPath,
} : ButtonContainerProps) {
  const [domainList, setDomainList] = useState<string[]>([]);

  const handleTestClick = () : void => {
    testSequence();
  };

  const handleImportClick = () : void => {
    setImporterOpen(true);
  };

  const handleClear = () : void => {
    setToastMessage('Cleared!');
    setToastOpen(true);
    clearAll();
  };

  const handleCopyToClipboard = (): void => {
    setToastMessage('Copied!');
    setToastOpen(true);
    copyToClipboard();
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setEnvironmentPath(event.target.value as string);
  };

  const handleChange = (e: { target: { value: string; }; }) => {
    const inputValue = parseInt(e.target.value, 10);
    if (inputValue > 90) {
      setDefaultDelay(90);
      e.target.value = '90';
    } else {
      setDefaultDelay(inputValue);
    }
  };

  useEffect(() => {
    setDomainList(process.env.REACT_APP_SCREENSHOT_PATH
      ? process.env.REACT_APP_SCREENSHOT_PATH.split(',') : []);
    setEnvironmentPath(process.env.REACT_APP_SCREENSHOT_PATH ? process.env.REACT_APP_SCREENSHOT_PATH.split(',')[0] : 'No Path');
  }, []);

  return (
    <div>
      {/* Button bar */}
      <Box sx={{
        '& > :not(style)': {
          mt: 6, p: 0,
        },
      }}
      >
        <Stack spacing={3} mt={8} direction="row" justifyContent="start">
          <TextField
            label="Default delay (secs)"
            onChange={handleChange}
            placeholder={defaultDelay.toString()}
            id="outlined-size-normal"
            margin="none"
            size="small"
            className="delay-input"
          />
          <Button variant="contained" color="secondary" onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
          <Button variant="contained" color="success" onClick={handleTestClick}>Test</Button>
          <Button variant="contained" color="error" onClick={handleClear}>Clear All</Button>
          <Button variant="outlined" color="secondary" onClick={handleImportClick} className="import-button">Import</Button>
          <FormControl
            id="domain-path-select-form"
            sx={
              {
                p: 1,
                minWidth: 120,
                maxHeight: 40,
                backgroundColor: 'white',
                marginBottom: 0,
                paddingBottom: 0,
                border: '1px solid lightgrey',
                borderRadius: '4px',
              }
            }
            variant="standard"
            size="medium"
          >
            <Select
              labelId="domain-path-select-label"
              id="domain-path-select"
              value={environmentPath}
              label="Domain Path"
              variant="standard"
              onChange={handleSelectChange}
              disableUnderline
              sx={{
                backgroundColor: 'white',
              }}
            >
              { domainList.map((domain: string, index: number) => (
                <MenuItem
                  value={domain}
                  key={index.toString() && domain}
                >
                  {domain}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </div>
  );
}

export default ButtonContainer;
