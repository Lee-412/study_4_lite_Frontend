import React from 'react'
import '@/component/ScrollableTextArea/ScrollableText.css'
function ScrollableTextArea() {
    const task  = 'The table below shows population figures for 4 countries for 2003 and projected figures for 2025 and 2050.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.'
  return (
    <div className="text-container">
        <textarea rows={15} cols={64} name="usrtxt" wrap="hard" className="text-field" disabled={true}>
            {task}
        </textarea>
        <div className="image">
            <img src="http://localhost:1337/uploads/medium_image12_1d7e7071f0.png" alt=""/>
        </div>
    </div>
  )
}

export default ScrollableTextArea