import MultilineTextFields from '@/component/UtilsComponent/TextAreaAutoSize'
import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

const Multiplechoice = ({questions ,setQuestions}:any) => {
    const [question, setQuestion] = useState<string>()
    const [isAdd, setAdd] = useState<boolean>(false)
    const [buttonState, setButtonState] = useState<boolean>(false)
    const [subOpComponent, setSubOpComponent] = useState<React.JSX.Element[]>()
    const [answer, setAnswer] = useState<string>()
    const [option_key, setOptionKey] = useState<number>(0)
    const [multiple_ops, setMultipleOps] = useState<object>({})

    const multiple_options = useRef<object>()
    const addOption = ()=>{
        //console.log(subOpComponent);
        setOptionKey(option_key + 1)
        const OptionCompo = (
            <Box
                key={option_key}
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
                    label='option'
                    multiline
                    minRows={1}
                    onChange={(e)=>{
                        const option = {
                            [String.fromCharCode(option_key + 65)]: e.target.value
                        }
                        if(Object.keys(multiple_options).length === 0 || Object.keys(multiple_ops).length === 0) {
                            multiple_options.current = {...multiple_options.current ,...option}
                        }else {
                            multiple_options.current = {...multiple_options.current, ...option}
                        }
                        
                    }}
                    
                    />
                </div>
      
            </Box>
        )
        //console.log(multiple_ops);
        
        if(subOpComponent !== undefined) {
            setSubOpComponent([...subOpComponent, OptionCompo])
        } else {
            setSubOpComponent([OptionCompo])
        }
    }
    useEffect(()=>{
        console.log(question);
        console.log(multiple_options.current);        
        console.log(answer);
        if(buttonState) {
            const question_data = {
                type: 'multiple',
                question: question,
                options: multiple_options.current,
                answer: answer
            }
            setQuestions([...questions, question_data])
        }
        
    }, [multiple_options, question, answer, multiple_ops, buttonState])
            

  return (
    <div className="mulitple-quest">
        <MultilineTextFields setContent={setQuestion} label='Question' minRows={2}/>
        {subOpComponent ? subOpComponent.map((item:any)=>{
            return item
        }): <></>}
        <MultilineTextFields 
        setContent={setAnswer} 
        label='Answer' minRows={1}/>
        <Button 
        variant='contained'
        onClick={()=>{addOption()}}>Add option</Button>
        <Button 
        variant='contained'
        disabled={buttonState}
        sx={{
            backgroundColor : '#0F171F',
            transform: "translateX(200%)",
            marginBottom: 2,
            marginTop: 2
        }}
        onClick={()=>{
            setButtonState(true)
        }}>Finish Add Question</Button>
    </div>
  )
}

export default Multiplechoice