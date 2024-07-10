'use client'
import React, { useState } from 'react'
import '@/component/InputWitingArea/WritingArea.css'
import { counting_words } from '@/utils/utilsFunction'
function WritingArea() {
    const [wordCount, setWordCount] = useState(0)
  return (
    <div className="writing-container">
        <textarea onChange={(e)=>{setWordCount(counting_words(e.target.value))
          console.log(e.target.value);
          
        }} rows={20} cols={64} name="usrtxt" wrap="hard" className="writing-field" placeholder='Viết essay tại đây...'>
        </textarea>
        <div className="word-count">
            <label htmlFor="">Wordcount: {wordCount}</label>
        </div>
    </div>
  )
}

export default WritingArea