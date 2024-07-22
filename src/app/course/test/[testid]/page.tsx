import WritingArea from '@/component/InputWitingArea/WritingArea'
import ScrollableTextArea from '@/component/ScrollableTextArea/ScrollableTextArea'
import TimerCustom from '@/component/Timer/TimerCustom'
import WritingLayout from '@/component/WritingTestLayout/WritingLayout'
import { Button } from '@mui/material'
import React, { useRef } from 'react'

async function page({params}:any) {

  //console.log(params);
  if(params.testid.includes('Wrting')){
    const params_extraction = params.testid.split('-')
    
    const test_id = params_extraction[params_extraction.length - 1]
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL }/tests/${test_id}?populate=*`)
    const data = await response.json()
    const writing_id = data.data.attributes.wrting.data.id
    const response_w = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL }/wrtings/${writing_id}?populate=*`)
    const data_w = await response_w.json()
    const writing_data = data_w.data.attributes
    const test_data = data.data    
    
    return (
      <WritingLayout writing={writing_data} test={test_data} writingID = {writing_id}/>
    )
  }
  return (
    <div className="hehe">
      check
    </div>
  )
}

export default page