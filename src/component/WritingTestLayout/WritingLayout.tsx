'use client'
import WritingArea from '@/component/InputWitingArea/WritingArea'
import ScrollableTextArea from '@/component/ScrollableTextArea/ScrollableTextArea'
import TimerCustom from '@/component/Timer/TimerCustom'
import { get_minute_from_seconds } from '@/utils/utilsFunction'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

function WritingLayout({writing, test}:any) {
    const [isDisplay1, setDisPlay1] = useState(true)
    const [isDisplay2, setDisPlay2] = useState(false)
    const initDuration = test.attributes.Duration
    const init_minute = get_minute_from_seconds(initDuration)
    const init_sec = initDuration % init_minute
    const [minute, setMinute] = useState(init_minute)
    const [sec, setSec] = useState(init_sec)
    const [isRunning, setRunning] = useState(true)

    useEffect(()=>{
      let interval: string | number | NodeJS.Timeout | undefined
      if(isRunning) {
        interval = setInterval(() => {
          if(sec > 0) {
              setSec(sec - 1)
          } else if(minute > 0){
              setMinute(minute - 1)
              setSec(59)
          } else if(sec <= 0 && minute <= 0){
            setRunning(false)
            return ()=> clearInterval(interval)
          }
        }, 1000) 
      }
      return () => clearInterval(interval)
    },[minute, sec, isRunning])

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
  //  const timer_interval = setInterval(()=>{
  //     setDuration(duration - 1)
      
  //   }, 1000)
  //   if(duration === 0) {
  //     clearInterval(timer_interval)
  //   }

    //console.log(duration);
    
   
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
              <Button variant="contained" style={{marginTop: '2%', marginRight: '24%', marginBottom: '4%'}}>Nộp bài</Button>
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
              <WritingArea />
          </div>
          <div className="main-content task2" style={{
                display: isDisplay2 ? 'flex' : 'none'
          }}>
              <ScrollableTextArea data={{...task2_data}}/>
              <WritingArea />
          </div>
      </div>
  )
}

export default WritingLayout