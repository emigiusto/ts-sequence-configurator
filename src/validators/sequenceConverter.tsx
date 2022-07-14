//Interfaces
import { ISequenceItem, IResultSequenceItem, eventTypeEnum } from '../interfaces'


export function sequenceConverter(seqList: ISequenceItem[]) : IResultSequenceItem[] {
    var transformed = seqList.map((seq: ISequenceItem ) : IResultSequenceItem => {
        switch (seq.name) {
            case "navigate": return [eventTypeEnum.Navigate,"", seq.url]
            case "setValue": return [eventTypeEnum.SetValue,seq.selector,seq.value]
            case "click": return [eventTypeEnum.Click,seq.selector,""]
            case "waitUntil": return [eventTypeEnum.WaitUntil,seq.selector,""]
            case "submit": return [eventTypeEnum.Submit,seq.selector,""]
            default:
                return [eventTypeEnum.Invalid,"",""]
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