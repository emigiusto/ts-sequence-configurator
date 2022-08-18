import React, { useState } from 'react';

// MU
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Custom Styles
import './App.css';

import { ISequenceItem, ILogEvent, IScreenshotResponse, eventTypeEnum } from './interfaces';

// Custom components
import SequenceContainer from './components/SequenceContainer/SequenceContainer';
import EventContainer from './components/EventContainer/EventContainer';
import ButtonContainer from './components/ButtonContainer/ButtonContainer';
import ResultContainer from './components/ResultContainer/ResultContainer';
import Tester from './components/Tester/Tester';
import Importer from './components/Importer/Importer';
import Toast from './components/Toast/Toast';

// Helper Functions
import sequenceConverter from './validators/sequenceConverter';

// Default Sequence List
import _sequenceData from './data/example-sequence.json';

const sequenceData = _sequenceData as ISequenceItem[];

function App() {
  const [seqList, setSeqList] = useState<ISequenceItem[]>(sequenceData);
  const [idCount, setIdCount] = useState<number>(1000);
  const [testModalOpen, setTestModalOpen] = useState<boolean>(false);
  const [importerOpen, setImporterOpen] = useState<boolean>(false);
  const [screenshot, setScreenshot] = useState<string>('');
  const [eventLog, setEventLog] = useState<ILogEvent[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [defaultDelay, setDefaultDelay] = useState<number>(30);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const addSequence = (newSeq: ISequenceItem) : void => {
    let newList = [];
    // Enforces First Event to be Navigate
    if (seqList.length === 0 && newSeq.name !== eventTypeEnum.Navigate) {
      newList = [{
        id: idCount,
        name: eventTypeEnum.Navigate,
        selector: '',
        url: '',
        value: '',
      },
      {
        ...newSeq, id: idCount + 1,
      }];
      setIdCount(idCount + 2);
    } else {
      newList = [...seqList, newSeq];
      setIdCount(idCount + 1);
    }
    setSeqList(newList);
  };

  const removeSequence = (SeqIDToDelete: number) : void => {
    const filteredSeqList = seqList.filter((seq) => seq.id !== SeqIDToDelete);
    setSeqList(filteredSeqList);
  };

  const clearAll = () => {
    setSeqList([]);
  };

  const updateSequence = (newSeq: ISequenceItem) : void => {
    const newList = seqList.map(
      (seq) => ((seq.id === newSeq.id) ? {
        ...newSeq,
      } : seq),
    );
    setSeqList(newList);
  };

  const copyToClipboard = () : void => {
    navigator.clipboard.writeText(JSON.stringify(sequenceConverter(seqList)));
  };

  const testSequence = async () => {
    setScreenshot('');
    setEventLog([]);
    setErrorMessage('');

    if (seqList.length === 0) {
      setErrorMessage('No events to process');
      return;
    }

    setTestModalOpen(true);

    const requestBody = {
      sequence: sequenceConverter(seqList),
    };
    fetch(
      `${process.env.REACT_APP_SCREENSHOT_PATH}/screenshot?delay=${defaultDelay * 1000}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    )
      .then((response) => response.json())
      .then((data: IScreenshotResponse) => {
        if (data) {
          setEventLog(data.log || []);
          setScreenshot(data.screenshot || '');
          setErrorMessage(data.error || '');
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('The service may be unavailable');
      });
  };

  return (
    <div className="App">
      <Typography mt={4} mb={4} variant="h4" align="center">Puppeteer Sequence Configurator</Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <SequenceContainer
            seqList={seqList}
            removeSequence={removeSequence}
            updateSequence={updateSequence}
          />
        </Grid>
        <Grid item xs={2}>
          <EventContainer addSequence={addSequence} idCount={idCount} />
        </Grid>
      </Grid>
      <ButtonContainer
        testSequence={testSequence}
        setDefaultDelay={setDefaultDelay}
        defaultDelay={defaultDelay}
        clearAll={clearAll}
        copyToClipboard={copyToClipboard}
        setImporterOpen={setImporterOpen}
        setToastOpen={setToastOpen}
        setToastMessage={setToastMessage}
      />
      <ResultContainer seqList={seqList} />
      <Tester
        testModalOpen={testModalOpen}
        screenshot={screenshot}
        setTestModalOpen={setTestModalOpen}
        errorMessage={errorMessage}
        eventLog={eventLog}
        defaultDelay={defaultDelay}
        eventCount={seqList.length}
      />
      <Importer
        importerOpen={importerOpen}
        setImporterOpen={setImporterOpen}
        setSeqList={setSeqList}
        setToastOpen={setToastOpen}
        setToastMessage={setToastMessage}
      />
      <Toast
        toastOpen={toastOpen}
        setToastOpen={setToastOpen}
        toastMessage={toastMessage}
      />
    </div>
  );
}

export default App;