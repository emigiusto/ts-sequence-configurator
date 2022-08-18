// Interfaces
import { ISequenceItem, IResultSequenceItem, eventTypeEnum } from '../interfaces';

function sequenceConverter(seqList: ISequenceItem[]) : IResultSequenceItem[] {
  return seqList.map((seq: ISequenceItem) : IResultSequenceItem => {
    switch (seq.name) {
    case 'navigate': return [eventTypeEnum.Navigate, '', seq.url];
    case 'setValue': return [eventTypeEnum.SetValue, seq.selector, seq.value];
    case 'click': return [eventTypeEnum.Click, seq.selector, ''];
    case 'waitUntil': return [eventTypeEnum.WaitUntil, seq.selector, ''];
    case 'submit': return [eventTypeEnum.Submit, seq.selector, ''];
    case 'timeout': return [eventTypeEnum.Timeout, '', seq.value];
    default:
      return [eventTypeEnum.Invalid, '', ''];
    }
  });
}

export default sequenceConverter;

/*
Converts from: ISequenceItem[]
{
    'id': 5,
    'name': 'navigate',
    'url': 'https://employeewebsite.kawarthalakes.ca/login.aspx',
    'selector': '',
    'value': '',
    'required': ['url']
}

To: IResultSequenceItem[]
[
    'navigate',
    '',
    'https://employeewebsite.kawarthalakes.ca/login.aspx'
]
*/
