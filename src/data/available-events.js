import { inputFieldEnum, eventTypeEnum } from '../interfaces.js';

const availableEvents = [
    {
        name: eventTypeEnum.Navigate,
        required: [inputFieldEnum.URL],
    },
    {
        name: eventTypeEnum.SetValue,
        required: [inputFieldEnum.Selector, inputFieldEnum.Value],
    },
    {
        name: eventTypeEnum.Click,
        required: [inputFieldEnum.Selector],
    },
    {
        name: eventTypeEnum.WaitUntil,
        required: [inputFieldEnum.Selector],
    },
    {
        name: eventTypeEnum.Submit,
        required: [inputFieldEnum.Selector],
    },
    {
        name: eventTypeEnum.Timeout,
        required: [inputFieldEnum.Value],
    },
];

export default availableEvents;
