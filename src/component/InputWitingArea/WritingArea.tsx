import React from 'react'
import '@/component/InputWitingArea/WritingArea.css'
function WritingArea() {
    let wordCount = 0;
  return (
    <div className="writing-container">
        <textarea rows={20} cols={64} name="usrtxt" wrap="hard" className="writing-field" placeholder='Viết essay tại đây...'>
        </textarea>
        <div className="word-count">
            <label htmlFor="">Wordcount: {wordCount}</label>
        </div>
    </div>
  )
}

export default WritingArea