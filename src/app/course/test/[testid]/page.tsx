import WritingLayout from '@/component/WritingTestLayout/WritingLayout'
import React, { useRef } from 'react'
import ReadingTest from '@/component/ReadingTestLayout/ReadingTest'
import  ListeningTest  from '@/component/ListeningTestLayout/ListeningTest'
import {fetchAllData} from '@/utils/getReading'
import {fetchListeningData} from '@/utils/getListening'

async function page({params}:any) {

  const params_extraction = params.testid.split('-')
  const test_id = params_extraction[params_extraction.length - 1]
  const user_id = params_extraction[params_extraction.length - 2]
  //console.log(params);
  console.log(user_id);
  
  if(params.testid.includes('Wrting')){
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL }/tests/${test_id}?populate=*`)
    const data = await response.json()
    const writing_id = data.data.attributes.wrting.data.id
    const response_w = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL }/wrtings/${writing_id}?populate=*`)
    const data_w = await response_w.json()
    const writing_data = data_w.data.attributes
    const test_data = data.data    
    
    return (
      <WritingLayout writing={writing_data} test={test_data} writingID = {writing_id} userid={user_id}/>
    )
  } else if (params.testid.includes('Reading')) {

    const params_extraction = params.testid.split('-')
    
    const test_id = params_extraction[params_extraction.length - 1]
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL }/tests/${test_id}?populate=*`)
    const dt= await response.json()
    const reading_id = dt.data.attributes.reading_test.data.id;

    const data = await fetchAllData(reading_id);
    return (
      <ReadingTest data={data} testID={params.testid} userId={user_id} />
    );
  } else if (params.testid.includes('Listening')) {
    const params_extraction = params.testid.split('-')
    
    const test_id = params_extraction[params_extraction.length - 1]
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL }/tests/${test_id}?populate=*`)
    const dt= await response.json()
    const listening_id = dt.data.attributes.listening_test.data.id;
    const data = await fetchListeningData(listening_id)
    return (
      <ListeningTest data={data} testID={params.testid} userId={user_id}/>
    )
  }
  return (
    <div className="hehe">
      check
    </div>
  )
}

export default page