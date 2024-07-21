'use client'
import Filling from '@/component/Examination/Reading/Filling'
import Multiplechoice from '@/component/Examination/Reading/Multiplechoice'
import Questionair from '@/component/Examination/Reading/Questionair'
import MultilineTextFields from '@/component/UtilsComponent/TextAreaAutoSize'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

function PassageComponent({content, setContent, questions, setQuestions}:any) {
  //const [questions, setQuestions] = useState<any[]>([])
  const [subComponent, setSubComponent] = useState<React.JSX.Element[]>()

  useEffect(()=>{
    console.log(questions);
  }, [questions])
  const addQuestionair = ()=>{
    const questionairComponent = (
      <Questionair questions={questions} setQuestions={setQuestions}/>
    )
    if(subComponent !== undefined) {
      setSubComponent([...subComponent, questionairComponent])
    } else {
      setSubComponent([questionairComponent])
    }
  }
  const addMultipleChoice = () => {
    const multipleChoiceComponent = (
      <Multiplechoice setQuestions={setQuestions} questions={questions}/>
    )
    if(subComponent !== undefined){
      setSubComponent([...subComponent, multipleChoiceComponent])
    } else {
      setSubComponent([multipleChoiceComponent])
    }
    
  }

  const addFillingQuestion = () => {
    const fillingComponent = (
      <Filling questions={questions} setQuestions={setQuestions}/>
    )
    if(subComponent !== undefined){
      setSubComponent([...subComponent, fillingComponent])
    } else {
      setSubComponent([fillingComponent])
    }
  }
  console.log(questions);
  
  return (
    <div className='passage-container'>
        <MultilineTextFields content={content} setContent={setContent} minRows={10}/>
        {subComponent ? subComponent.map((item:any)=>{
          return item
        }) : <></>}
        <Button onClick={()=>{
         // console.log('add questionair');
            addQuestionair()
        }}
        variant='contained' sx={{
          transform: "translateX(160%)",
          display: 'block'
        }}>Add Questionair</Button>
        <Button 
        onClick={()=>{addMultipleChoice()}}
        variant='outlined' 
        sx={{
          transform: "translateX(20%)",
          marginTop: 2
        }}>Add Multiplechoice Question</Button>
        <Button 
        onClick={()=>{addFillingQuestion()}}
        variant='outlined' 
        sx={{
          transform: "translateX(80%)",
          marginTop: 2
        }}>Add Filling Question</Button>
        
    </div>
  )
}

export default PassageComponent