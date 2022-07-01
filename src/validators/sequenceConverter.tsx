//Interfaces
import { ISequenceItem, IResultSequenceItem } from '../interfaces'


export function sequenceConverter(seqList: ISequenceItem[]) : IResultSequenceItem[] {
    var transformed = seqList.map((seq: ISequenceItem ) : IResultSequenceItem => {
        switch (seq.name) {
            case "navigate": return ["navigate","", seq.url]
            case "setValue": return ["setValue",seq.selector,seq.value]
            case "click": return ["click",seq.selector,""]
            case "waitUntil": return ["waitUntil",seq.selector,""]
            case "submit": return ["submit",seq.selector,""]
            default:
                return ["InvalidSequence","",""]
        }
    })
    return transformed;
}

/* 
Converts from: ISequenceItem[]
{
    "id": 5,
    "name": "navigate",
    "url": "https://employeewebsite.kawarthalakes.ca/login.aspx",
    "selector": "",
    "value": "",
    "required": ["url"]
}

To: IResultSequenceItem[]
[
    "navigate",
    "",
    "https://employeewebsite.kawarthalakes.ca/login.aspx"
]
*/