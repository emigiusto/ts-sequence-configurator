//Interfaces
import { ISequenceItem } from '../../interfaces'

//MU
import { Typography, Box, Paper } from '@mui/material';

export interface ResultContainerProps {
    seqList:  ISequenceItem[]
}

function ResultContainer({seqList}: ResultContainerProps) {
    return (
        <div>
            <Typography variant="h6" align="left" mt={4}>Resulting sequence</Typography>
            <Box sx={{'& > :not(style)': {mt: 2,p: 3,mb: 4,}}}>
                <Paper elevation={2}>
                    [
                        {   seqList.map( (seq: ISequenceItem) => 
                                <div key={seq.id}>
                                    <code style={{"paddingLeft": "8px"}}>
                                                    [   
                                                        "{seq.name}" , 
                                                        "{seq.selector}" , 
                                                        "{seq.value === "" ? seq.url : seq.value }"
                                                    ],
                                    </code>
                                </div>
                        )}
                    ]
                </Paper>
            </Box>
        </div>
    )
}

export default ResultContainer