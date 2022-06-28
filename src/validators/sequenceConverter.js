export function sequenceConverter(seqList) {
    var transformed = seqList.map(seq => {
        switch (seq.name) {
            case "navigate": return ["navigate","",seq.url]
            case "setValue": return ["setValue",seq.selector,seq.value]
            case "click": return ["click",seq.selector,""]
            case "waitUntil": return ["waitUntil",seq.selector,""]
            default:
                return ["InvalidSequence","",""]
        }
    })
    return transformed
}

/* 
Converts from:
{
    "id": 5,
    "name": "navigate",
    "url": "https://employeewebsite.kawarthalakes.ca/login.aspx",
    "selector": "",
    "value": "",
    "required": ["url"]
}

To:
[
    "navigate",
    "",
    "https://employeewebsite.kawarthalakes.ca/login.aspx"
]
*/