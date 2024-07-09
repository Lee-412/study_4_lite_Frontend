import WritingArea from '@/component/InputWitingArea/WritingArea'
import ScrollableTextArea from '@/component/ScrollableTextArea/ScrollableTextArea'
import TimerCustom from '@/component/Timer/TimerCustom'
import { Button } from '@mui/material'
import React from 'react'

function page({params}:any) {

  console.log(params);
  if(params.testid.includes('Wrting')){
    return (
      <div className="content">
          <h1>Đề thi ABCXYZ</h1>
          <TimerCustom />
          <div className="main-content task1">
              <ScrollableTextArea />
              <WritingArea />
          </div>
          <div className="main-content task2 hidden">
              <ScrollableTextArea />
              <WritingArea />
          </div>
          <div className="button-component" style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
              <Button variant="contained" style={{marginTop: '2%', marginRight: '30%'}}>Nộp bài</Button>
              <Button sx={{
                marginTop: '2%',
                marginRight: '4%',
              }}>Task 1</Button>
              <Button sx={{
                marginTop: '2%',
                marginRight: '4%'
              }}>Task 2</Button>
          </div>
          
      </div>
    )
  }
  return (
    <div className="hehe">
      check
    </div>
  )
}

export default page