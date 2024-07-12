'use client'
import { postRequest } from '@/utils/postRequest'
import WritingArea from '@/component/InputWitingArea/WritingArea'
import ScrollableTextArea from '@/component/ScrollableTextArea/ScrollableTextArea'
import TimerCustom from '@/component/Timer/TimerCustom'
import { get_minute_from_seconds } from '@/utils/utilsFunction'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { updateRelation } from '@/utils/updateRelationRequest'

function WritingLayout({writing, test, writingID}:any) {
    const [isDisplay1, setDisPlay1] = useState(true)
    const [isDisplay2, setDisPlay2] = useState(false)
    const initDuration = test.attributes.Duration
    const check_dur = '30'
    const init_minute = get_minute_from_seconds(initDuration)
    const init_sec = init_minute === 0 ? parseInt(initDuration) : parseInt(initDuration) % init_minute
    const [minute, setMinute] = useState(init_minute)
    const [sec, setSec] = useState(init_sec)
    const [isRunning, setRunning] = useState(true)
    const [isSubmit, setSubmit] = useState(false)
    const [writing1, setWriting1] = useState('')
    const [writing2, setWriting2] = useState('')
    const [wordCnt1, setWordCnt1] = useState(0)
    const [wordCnt2, setWordCnt2] = useState(0)
    //console.log(init_sec);
    
    
    useEffect(()=>{
      let interval: string | number | NodeJS.Timeout | undefined
      if(isRunning && !isSubmit) {
        interval = setInterval(() => {
          if(sec > 0) {
              setSec(sec - 1)
          } else if(minute > 0){
              setMinute(minute - 1)
              setSec(59)
          } else if(sec <= 0 && minute <= 0){
              setRunning(false)
              alert('end timer')
              const request_link = `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/answer-wrtings`
              const writing_link = `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings/${writingID}?populate=*`
            //console.log(writingID);
        
              postRequest(gathering_data(writing1, writing2, wordCnt1, wordCnt2), request_link).then((item)=>{
              //console.log(item.data.id)
              updateRelation(item.data.id, writing_link, 'answer_wrtings')
        })
            return ()=> clearInterval(interval) 
          } 
        }, 1000) 
      } else if(isSubmit) {
        alert('submitted')
        //console.log(gathering_data(writing1, writing2, wordCnt1, wordCnt2));
        const request_link = `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/answer-wrtings`
        const writing_link = `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings/${writingID}?populate=*`
        //console.log(writingID);
        
        postRequest(gathering_data(writing1, writing2, wordCnt1, wordCnt2), request_link).then((item)=>{
              //console.log(item.data.id)
              updateRelation(item.data.id, writing_link, 'answer_wrtings')
        })
        
        
        return ()=> clearInterval(interval)
      }
      return () => clearInterval(interval)
    },[minute, sec, isRunning, isSubmit])

    const test_name = test.attributes.name
    const task1_data = {
      task: writing.task1,
      img: writing.img1,
      order: 1
    }
    const task2_data = {
      task: writing.task2,
      img: writing.img2,
      order: 2
    }
    
    const gathering_data = (in_writing1:string, in_writing2:string, wordcount1:number, wordcount2:number) => {
      const data_writing = {
        task1Answer: in_writing1,
        task2Answer: in_writing2,
        wordcount1: wordcount1,
        wordcount2: wordcount2
      }
      return data_writing
    }

    const handdleSubmit = () => {
      setSubmit(true)
    }
   
    const handdleClick1 = () => {
        setDisPlay1(true)
        setDisPlay2(false)
    }
    const handdleClick2 = () => {
        setDisPlay1(false)
        setDisPlay2(true)
    }




  return (
    <div className="content">
          <h1>{test_name}</h1>
          <TimerCustom minutes={minute} seconds={sec}/>
          <div className="button-component" style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
              <Button onClick={handdleSubmit} variant="contained" style={{marginTop: '2%', marginRight: '24%', marginBottom: '4%'}}>Nộp bài</Button>
              <Button onClick={handdleClick1} sx={{
                marginTop: '3%',
                marginRight: '4%',
                height: 25,
                width: 100,
                opacity: isDisplay1 ? 1 : 0.6,  
                textDecoration: isDisplay1? 'underline':'none',
                color: 'black',
                borderRadius: 10,
                backgroundColor: '#e7eaf3'   
              }}>Task 1</Button>
              <Button onClick={handdleClick2} sx={{
                marginTop: '3%',
                marginRight: '4%',
                height: 25,
                width: 100,
                opacity: isDisplay2 ? 1 : 0.6,
                textDecoration: isDisplay2? 'underline':'none',
                color: 'black',
                borderRadius: 10,
                backgroundColor: '#e7eaf3'
              }}>Task 2</Button>
          </div>
          <div className="main-content task1" style={{
                display: isDisplay1 ? 'flex' : 'none'
          }}>
              <ScrollableTextArea data={{...task1_data}}/>
              <WritingArea setWriting={setWriting1} setWordCount={setWordCnt1}/>
          </div>
          <div className="main-content task2" style={{
                display: isDisplay2 ? 'flex' : 'none'
          }}>
              <ScrollableTextArea data={{...task2_data}}/>
              <WritingArea setWriting={setWriting2} setWordCount={setWordCnt2}/>
          </div>
      </div>
  )
}

export default WritingLayout