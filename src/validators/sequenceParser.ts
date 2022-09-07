// Interfaces
import { ISequenceItem, IResultSequenceItem, eventTypeEnum } from '../interfaces';

function sequenceParser(seq: string) : ISequenceItem[] {
  if (seq[0] !== '[' || seq[seq.length - 1] !== ']') {
    return [{
      id: 9999, name: eventTypeEnum.Invalid, url: '', selector: '', value: '',
    }]; // Invalid sequence
  }
  const arrStringSequences: string[] = stringToArray(seq.replace(/\s+(?="|\[|\]|,)+/g, '').replace(/(?<=")\s+/g, ''));
  const arrSequenceItems: IResultSequenceItem[] = arrayStringToSeqItemArray(arrStringSequences);

  let counter = 0;
  const transformed = arrSequenceItems.map((sequence: IResultSequenceItem) : ISequenceItem => {
    const newSeq: ISequenceItem = {
      id: counter,
      name: eventTypeEnum.Empty,
      url: '',
      selector: '',
      value: '',
    };

    switch (sequence[0]) {
    case 'navigate':
      newSeq.name = eventTypeEnum.Navigate;
      newSeq.url = sequence[2];
      break;
    case 'setValue':
      newSeq.name = eventTypeEnum.SetValue;
      newSeq.selector = sequence[1];
      newSeq.value = sequence[2];
      break;
    case 'click':
      newSeq.name = eventTypeEnum.Click;
      newSeq.selector = sequence[1];
      break;
    case 'waitUntil':
      newSeq.name = eventTypeEnum.WaitUntil;
      newSeq.selector = sequence[1];
      break;
    case 'submit':
      newSeq.name = eventTypeEnum.Submit;
      newSeq.selector = sequence[1];
      break;
    case 'timeout':
      newSeq.name = eventTypeEnum.Timeout;
      newSeq.value = sequence[2];
      break;
    default:
      newSeq.name = eventTypeEnum.Invalid;
      break;
    }
    counter += 1;
    return newSeq;
  });
  return transformed;
}

export default sequenceParser;

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

export function stringToArray(string: string) : string[] {
  const withoutOutBrackets = string.substring(1, string.length - 2);
  return withoutOutBrackets.split('],[').map((str) => {
    const withFrontBracket = str[0] !== '[' ? `[${str}` : str;
    const strFull = withFrontBracket[withFrontBracket.length - 1] !== ']' ? `${withFrontBracket}]` : withFrontBracket;
    return strFull;
  });
}

export function arrayStringToSeqItemArray(arr: string[]) : IResultSequenceItem[] {
  return arr.map((st:string) => {
    const itemArray = st.substring(1, st.length - 2).replace(/['"]+/g, '').split(',');
    switch (itemArray[0]) {
    case 'navigate': return {
      0: eventTypeEnum.Navigate, 1: itemArray[1], 2: itemArray[2],
    };
    case 'setValue': return {
      0: eventTypeEnum.SetValue, 1: itemArray[1], 2: itemArray[2],
    };
    case 'click': return {
      0: eventTypeEnum.Click, 1: itemArray[1], 2: itemArray[2],
    };
    case 'submit': return {
      0: eventTypeEnum.Submit, 1: itemArray[1], 2: itemArray[2],
    };
    case 'waitUntil': return {
      0: eventTypeEnum.WaitUntil, 1: itemArray[1], 2: itemArray[2],
    };
    case 'timeout': return {
      0: eventTypeEnum.Timeout, 1: itemArray[1], 2: itemArray[2],
    };
    default: return {
      0: eventTypeEnum.Invalid, 1: '', 2: '',
    };
    }
  });
}
