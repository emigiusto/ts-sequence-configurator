//Interfaces
import { ISequenceItem } from '../../../interfaces'

//MU
import TextField from '@mui/material/TextField';

export interface Props {
    name: string
    seqItem:  ISequenceItem
    updateSequence: Function
}

function InputGroup({name, seqItem, updateSequence}:Props) {

    const handleOnChange = (e: { target: { name: string; value: string; }; }) : void =>{
        let newSeqItem:  ISequenceItem  = {...seqItem}
        newSeqItem[e.target.name] = e.target.value
        updateSequence(newSeqItem)
    }

    switch (name) {
        case "navigate":
            return (<form className='sequence-item_more-inputs'>
                        <TextField  label="URL" 
                                placeholder="https://www.example.com/" 
                                name="url" fullWidth 
                                onChange={handleOnChange} 
                                value={seqItem.url}
                                id="outlined-size-normal" margin="normal" size="small" />
                    </form>)
        case "click":
            return (<form className='sequence-item_more-inputs'>
                        <TextField  label="SELECTOR" 
                                placeholder="#idExample"
                                name="selector" fullWidth 
                                onChange={handleOnChange} 
                                value={seqItem.selector}
                                id="outlined-size-normal" margin="normal"  size="small" />
                    </form>)
        case "waitUntil":
            return (<form className='sequence-item_more-inputs'>
                    <TextField  label="SELECTOR" 
                                placeholder="#idExample"
                                name="selector" fullWidth 
                                onChange={handleOnChange} 
                                value={seqItem.selector}
                            id="outlined-size-normal" margin="normal"  size="small" />
                    </form>)
        case "setValue":
            return (<form className='sequence-item_more-inputs'> 
                        <TextField  label="SELECTOR" 
                                placeholder="#idExample"
                                name="selector" fullWidth 
                                onChange={handleOnChange} 
                                value={seqItem.selector}
                                id="outlined-size-normal" margin="normal"  size="small" />
                        <TextField  label="VALUE" 
                                placeholder="myUserName"
                                name="value" fullWidth 
                                onChange={handleOnChange} 
                                value={seqItem.value}
                                id="outlined-size-normal" margin="normal"  size="small" />
                    </form>)
        default:
            return <></>
    }
}

export default InputGroup;