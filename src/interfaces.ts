/* 
@Josh
Am I using Record utility type correctly?
I only added so I can run this line: newSeqItem[e.target.name] = e.target.value on InputGroup
But I don't fully understand its implicance 
*/
export interface ISequenceItem extends Record<string,any>{
    id: number
    name: string
    required: string[]
    selector?: string
    url?: string
    value?: string
}

export interface IResultSequenceItem {
    0?: string;
    1?: string;
    2?: string;
}

export interface ILogEvent {
    key: string
    type: string 
    value: string
}

export interface IEvent {
    name: EeventTypeEnum
    required: EeventTypeEnum[]
}

export enum EeventTypeEnum {
    Navigate = "navigate",
    SetValue = "setValue",
    Click = "click",
    Submit = "submit",
    WaitUntil = "waitUntil",
}