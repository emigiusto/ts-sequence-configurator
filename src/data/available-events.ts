import { IEvent, inputFieldEnum, eventTypeEnum } from '../interfaces'

let availableEvents: IEvent[] = 
[
    {
        "name": eventTypeEnum.Navigate,
        "required": [ inputFieldEnum.URL ]
    },
    {
        "name": eventTypeEnum.SetValue,
        "required": [inputFieldEnum.Selector,inputFieldEnum.Value]
    },
    {
        "name": eventTypeEnum.Click,
        "required": [inputFieldEnum.Selector]
    },
    {
        "name": eventTypeEnum.WaitUntil,
        "required": [inputFieldEnum.Selector]
    },
    {
        "name": eventTypeEnum.Submit,
        "required": [inputFieldEnum.Selector]
    }
]

export default availableEvents;