import { useState } from 'react'

//MU
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

//Custom Styles
import './App.css'

import { ISequenceItem, ILogEvent, IScreenshotResponse } from './interfaces'

//Custom components
import SequenceContainer from "./components/SequenceContainer/SequenceContainer";
import EventContainer from "./components/EventContainer/EventContainer"
import ButtonContainer from "./components/ButtonContainer/ButtonContainer"
import ResultContainer from "./components/ResultContainer/ResultContainer"
import Tester from "./components/Tester/Tester"

//Helper Functions
import { sequenceConverter } from "./validators/sequenceConverter";

//Default Sequence List
import _sequenceData from './data/example-sequence.json';
const sequenceData = _sequenceData as ISequenceItem[];

function App() {
  const [seqList, setSeqList] = useState<ISequenceItem[]>(sequenceData);
  const [idCount, setIdCount] = useState<number>(5);
  const [testModalOpen, setTestModalOpen] = useState<boolean>(false);
  const [screenshot, setScreenshot] = useState<string>("");
  const [eventLog, setEventLog] = useState<ILogEvent[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [defaultDelay, setDefaultDelay] = useState<number>(30);

  const addSequence = (newSeq: ISequenceItem) : void => {
    let newList = [...seqList, newSeq]
    setSeqList(newList)
    setIdCount(idCount + 1)
  }

  const removeSequence = (SeqIDToDelete: number) : void => {
    let filteredSeqList = seqList.filter(seq => seq.id !== SeqIDToDelete)
    setSeqList(filteredSeqList)
  }

  const clearAll = () => {
    setSeqList([])
  }

  const updateSequence = (newSeq: ISequenceItem) : void => {
    let newList = seqList.map(seq => seq.id === newSeq.id ? newSeq : seq) //In-order replacement
    setSeqList(newList)
  }

  const copyToClipboard = () : void  => {
    navigator.clipboard.writeText(JSON.stringify(sequenceConverter(seqList)))
  }

  const testSequence = async () => {
    setErrorMessage("")
    setEventLog([])
    const requestBody = { sequence: sequenceConverter(seqList) }

    fetch('http://localhost:3005/screenshot?delay='+ (defaultDelay*1000),
      { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(requestBody) })
      .then(response => response.json())
      .then( (data: IScreenshotResponse ) => { //@Josh: I would really like to improve the type safety and good practices in this requests, any advice?
        setEventLog(data.log || [])
        setScreenshot(data.screenshot || "")
        setErrorMessage(data.error || "")
      }
      ).catch(err => {
        console.log(err)
        console.log("Puppeteer service might not be available")  
        setErrorMessage("Puppeteer service might not be available")
      })
  };


  return (
    <div className="App">
      <Typography mt={4} mb={4} variant="h4" align="center">Puppeteer Sequence Configurator</Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <SequenceContainer seqList={seqList} removeSequence={removeSequence} updateSequence={updateSequence}></SequenceContainer>
        </Grid>
        <Grid item xs={2}>
          <EventContainer addSequence={addSequence} idCount={idCount}></EventContainer>
        </Grid>
      </Grid>
      <ButtonContainer
          testSequence={testSequence}
          setTestModalOpen={setTestModalOpen}
          setDefaultDelay={setDefaultDelay}
          defaultDelay={defaultDelay}
          clearAll={clearAll}
          setScreenshot={setScreenshot}
          copyToClipboard={copyToClipboard}
      />
      <ResultContainer seqList={seqList}></ResultContainer>
      <Tester testModalOpen={testModalOpen} 
              screenshot={screenshot} 
              setTestModalOpen={setTestModalOpen} 
              errorMessage={errorMessage}
              eventLog={eventLog}/>
    </div>
  );
}

export default App;
