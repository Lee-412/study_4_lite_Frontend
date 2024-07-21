import MultilineTextFields from '@/component/UtilsComponent/TextAreaAutoSize';
import { Button } from '@mui/material';
import React, { use, useState } from 'react'

const Questionair = ({questions, setQuestions}:any) => {
    const [questionair, setQuestionair] = useState<string>()
    const [isFinish, setFinish] = useState<boolean>(false)
  return (
    <>
        <MultilineTextFields 
            minRows={6} 
            content={questionair} 
            setContent={setQuestionair}
            label="Questionair" />
            <Button 
            disabled={isFinish}
            onClick={()=>{
                console.log(questionair);
                setFinish(true)
                const question = {
                    type: 'questionair',
                    content: questionair
                }
                setQuestions([...questions, question])
            }}
            sx={{
            backgroundColor: '#0F171F'
            }}
            variant='contained'>Finish add questionair</Button>
    </>
    
  )
}

export default Questionair