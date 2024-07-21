import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function MultilineTextFields({setContent, minRows, label}:any) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '60ch' },
        width: "100%"
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label={label? label:"Content"}
          multiline
          minRows={minRows}
          onChange={(e)=>{setContent(e.target.value)}}
        />
      </div>
      
    </Box>
  );
}