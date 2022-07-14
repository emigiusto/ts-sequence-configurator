/* 
@Josh
Am I using Record utility type correctly?
I only added so I can run this line: newSeqItem[e.target.name] = e.target.value on InputGroup
But I don't fully understand its implicance 
 
export interface ISequenceItem2 extends Record<string,any>{
    id: number
    name: string
    required: string[]
    selector: string
    url: string
    value: string
} */

export interface ISequenceItem {
    [key: string]: number | string | string[]
    id: number
    name: string
    required: string[]
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
    required: inputFieldEnum[]  //@Josh, I know this is not implemented correctly, but my intention was to set 
}                               // only the values on the enumerator as valid for this field. How can I do that?
export interface IScreenshotResponse {
    error: string;
    log?: ILogEvent[];
    screenshot?: string;
}

export enum eventTypeEnum {
    Navigate = "navigate",
    SetValue = "setValue",
    Click = "click",
    Submit = "submit",
    WaitUntil = "waitUntil",
    Invalid = "invalid",
}

export enum inputFieldEnum {
    Selector = "selector",
    Value = "value",
    URL = "url",
}