import React, { useState } from 'react'

//MU
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

//Custom components
import SequenceContainer from "./components/SequenceContainer/SequenceContainer";
import EventContainer from "./components/EventContainer/EventContainer"
import ButtonGroup from "./components/ButtonGroup/ButtonGroup"
import ResultContainer from "./components/ResultContainer/ResultContainer"
import Tester from "./components/Tester/Tester"

//Custom Styles
import './App.css'

//Helper Functions
import { sequenceConverter } from "./validators/sequenceConverter";
/* import { sequenceValidator } from "./validators/sequenceValidator"; */

//Default Sequence List
import sequenceData from './data/example-sequence.json';

function App() {

  const [seqList, setSeqList] = useState(sequenceData);
  /* const [validatedSeq, setValidatedSeq] = useState([]); */
  const [idCount, setIdCount] = useState(5);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [screenshot, setScreenshot] = useState({});
  const [eventLog, setEventLog] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultDelay, setDefaultDelay] = useState(30);

  const addSequence = (newSeq) => {
    let newList = [...seqList, newSeq]
    setSeqList(newList)
    setIdCount(idCount + 1)
  }

  const removeSequence = (SeqIDToDelete) => {
    let filteredSeqList = seqList.filter(seq => seq.id !== SeqIDToDelete)
    setSeqList(filteredSeqList)
  }

  const clearAll = () => {
    setSeqList([])
  }

  const updateSequence = (newSeq) => {
    let newList = seqList.map(seq => seq.id === newSeq.id ? newSeq : seq)
    setSeqList(newList)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(sequenceConverter(seqList)))
  }

  //Sequence pre-validations to improve the experience?
  /*
    const generateSequence = () => {
    if (sequenceValidator(seqList)) {
      setValidatedSeq(seqList)
    }
  } 
  useEffect(() => {
    generateSequence()
  }, [seqList]);
  */

  const testSequence = async () => {
    setErrorMessage("")
    setEventLog([])
    const requestBody = { sequence: sequenceConverter(seqList) }

    fetch('http://localhost:3005/screenshot?delay='+ (defaultDelay*1000),
      { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(requestBody) })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setEventLog(data.log)
        setScreenshot(data.screenshot)
        setErrorMessage(data.error)
      }
      ).catch(err => {
        console.log(err)
        console.log("WebRenderService might not be available")  
        setErrorMessage("WebRenderService might not be available or timeout exceeded")
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
      <ButtonGroup
          testSequence={testSequence}
          setTestModalOpen={setTestModalOpen}
          screenshot={screenshot}
          setDefaultDelay={setDefaultDelay}
          defaultDelay={defaultDelay}
          clearAll={clearAll}
          setScreenshot={setScreenshot}
          copyToClipboard={copyToClipboard}
      ></ButtonGroup>
      <ResultContainer seqList={seqList}></ResultContainer>
      <Tester testModalOpen={testModalOpen} 
              screenshot={screenshot} 
              setTestModalOpen={setTestModalOpen} 
              errorMessage={errorMessage}
              eventLog={eventLog}>
      </Tester>
    </div>
  );
}

export default App;
