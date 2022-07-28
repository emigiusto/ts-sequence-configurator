/* 
@Josh
Am I using Record utility type correctly?
I only added so I can run this line: newSeqItem[e.target.name] = e.target.value on InputGroup
But I don't fully understand its implicance 
*/

//Remove key:string ....
//separate metadata from data
// move required to Item
export interface ISequenceItem {
    [key: string]: number | string | string[]
    id: number
    name: eventTypeEnum
    required: inputFieldEnum[]
    selector: string
    url: string
    value: string
}

export interface IResultSequenceItem {
    0: eventTypeEnum;
    1: string;
    2: string;
}

export interface ILogEvent {
    key: string
    type: string 
    value: string
}

export interface IEvent {
    name: eventTypeEnum
    required: inputFieldEnum[]  
}
export interface IScreenshotResponse {
    error: string;
    log: ILogEvent[] | null;
    screenshot: string | null;
}

export enum eventTypeEnum {
    Navigate = "navigate",
    SetValue = "setValue",
    Click = "click",
    Submit = "submit",
    WaitUntil = "waitUntil",
    Invalid = "invalid",
    Empty = ""
}

export enum inputFieldEnum {
    Selector = "selector",
    Value = "value",
    URL = "url",
}