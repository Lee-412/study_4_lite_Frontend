import React from 'react'
import '@/component/Timer/Timer.css'

function TimerCustom({minutes, seconds}:any) {
  const minute = minutes + ''
  let second = seconds
  if(seconds < 10) {
     second = '0' + seconds
  }
  return (
    <div className='timer-container'>
      <p className='label-time'>Thời gian còn lại: &nbsp;</p>
      <div className="time">
        <p>{minute}</p>
      </div>
      <p className='divider'>:</p>
      <div className="time">
        <p>{second}</p>
      </div>
    </div>
  )
}

export default TimerCustom