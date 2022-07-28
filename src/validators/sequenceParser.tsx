//Interfaces
import { ISequenceItem, IResultSequenceItem, eventTypeEnum, inputFieldEnum } from '../interfaces'

export function sequenceParser(seq: string) : ISequenceItem[] {
    if (seq[0] !== "[" || seq[seq.length-1] !=="]") {
        return [{id: 9999, name: eventTypeEnum.Invalid,url: "",selector: "",value: "",required: []}] //Invalid sequence
    }
    let arrStringSequences: string[] = stringToArray(seq.replace(/\s/g, ''))
    let arrSequenceItems: IResultSequenceItem[] = arrayStringToSeqItemArray(arrStringSequences)

    let counter = 0
    var transformed = arrSequenceItems.map((sequence: IResultSequenceItem ) : ISequenceItem => {
        let newSeq: ISequenceItem = {
            id: counter,
            name: eventTypeEnum.Empty,
            url: "",
            selector: "",
            value: "",
            required: []
        }
        switch (sequence[0]) {
            case "navigate": 
                newSeq.name = eventTypeEnum.Navigate
                newSeq.url = sequence[2]
                newSeq.required = [inputFieldEnum.URL]
                break;
            case "setValue": 
                newSeq.name = eventTypeEnum.SetValue
                newSeq.selector = sequence[1]
                newSeq.value = sequence[2]
                newSeq.required = [inputFieldEnum.Selector, inputFieldEnum.Value]
                break;
            case "click": 
                newSeq.name = eventTypeEnum.Click
                newSeq.selector = sequence[1]
                newSeq.required = [inputFieldEnum.Selector]
                break;
            case "waitUntil": 
                newSeq.name = eventTypeEnum.WaitUntil
                newSeq.selector = sequence[1]
                newSeq.required = [inputFieldEnum.Selector]
                break;
            case "submit": 
                newSeq.name = eventTypeEnum.Submit
                newSeq.selector = sequence[1]
                newSeq.required = [inputFieldEnum.Selector]
                break;
            case "timeout": 
                newSeq.name = eventTypeEnum.Timeout
                newSeq.value = sequence[2]
                newSeq.required = [inputFieldEnum.Value]
                break;
            default:
                newSeq.name = eventTypeEnum.Invalid
                break;
        }
        counter++;
        return newSeq;
    })
    return transformed;
}

/* 
Converts from: IResultSequenceItem[]

[
    "navigate",
    "",
    "https://employeewebsite.kawarthalakes.ca/login.aspx"
]

To: ISequenceItem[]
{
    "id": 5,
    "name": "navigate",
    "url": "https://employeewebsite.kawarthalakes.ca/login.aspx",
    "selector": "",
    "value": "",
    "required": ["url"]
}

*/

function stringToArray(string: string) : string[] {
    let withoutOutBrackets = string.substring(1,string.length-2)
    return withoutOutBrackets.split('],[').map(str => {
        let withFrontBracket = str[0] !== "[" ? "[" + str : str 
        let strFull = withFrontBracket[withFrontBracket.length-1] !== "]" ?  withFrontBracket + "]" : withFrontBracket 
        return strFull
    })
}

function arrayStringToSeqItemArray(arr: string[]) : IResultSequenceItem[] {
    return arr.map((st:string) => {
        let itemArray = st.substring(1,st.length-2).replace(/['"]+/g, '').split(',')
        switch (itemArray[0]) {
            case "navigate": return { 0: eventTypeEnum.Navigate, 1: itemArray[1], 2: itemArray[2] }
            case "setValue": return { 0: eventTypeEnum.SetValue, 1: itemArray[1], 2: itemArray[2] }
            case "click": return { 0: eventTypeEnum.Click, 1: itemArray[1], 2: itemArray[2] }
            case "submit": return { 0: eventTypeEnum.Submit, 1: itemArray[1], 2: itemArray[2] }
            case "waitUntil": return { 0: eventTypeEnum.WaitUntil, 1: itemArray[1], 2: itemArray[2] }
            default: return { 0: eventTypeEnum.Invalid, 1: "", 2: "" }
        }
    }) 
}