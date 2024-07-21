import MultilineTextFields from '@/component/UtilsComponent/TextAreaAutoSize'
import { Button } from '@mui/material'
import React, { use, useState } from 'react'

const Filling = ({questions, setQuestions}:any) => {
  const [ques, setQues] = useState<string>()
  const [ans, setAns] = useState<string>()
  const [isFinish, setFinish] = useState<boolean>()

  return (
    <>
      <MultilineTextFields content={ques} setContent={setQues} minRows={1} label='question'/>
      <MultilineTextFields content={ans} setContent={setAns} minRows={1} label='answer'/>
      <Button 
            disabled={isFinish}
            onClick={()=>{
                setFinish(true)
                const filling = {
                  type: 'filling',
                  question: ques,
                  answer: ans
                }
                setQuestions([...questions, filling])
            }}
            sx={{
            backgroundColor: '#0F171F'
            }}
            variant='contained'>Finish add filling</Button>
    </>
  )
}

export default Filling