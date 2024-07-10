import React from 'react'
import '@/component/ScrollableTextArea/ScrollableText.css'
function ScrollableTextArea({data}:any) {
  //console.log(data);
  const task = data.task
  //console.log(data);
  
  let img = data.img
  if(img.data === null) {
  } else {
    
    img = img.data[0].attributes.formats.medium.url
    const link_image = `${process.env.NEXT_PUBLIC_STRAPI_LINK_URL}${img}`
    
  }
  return (
    <div className="text-container">
        <textarea rows={15} cols={64} name="usrtxt" wrap="hard" className="text-field" disabled={true} value={task}>
        </textarea>
        <div className="image">
            <img src={`${process.env.NEXT_PUBLIC_STRAPI_LINK_URL}${img}`} alt=""/>
        </div>
    </div>
  )
}

export default ScrollableTextArea