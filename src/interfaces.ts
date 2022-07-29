export interface ISequenceItem {
    id: number
    name: eventTypeEnum
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
    Timeout = "timeout",
    Invalid = "invalid",
    Empty = ""
}

export enum inputFieldEnum {
    Selector = "selector",
    Value = "value",
    URL = "url",
}