'use client'
import { fetch_listening, uploadMedia } from '@/utils/postListening'
import React, { use } from 'react'
import { useState } from 'react'
function TestConnection() {
    const [file, setFile] = useState<any>()
    //fetch_listening()
    if(file !== undefined) {
        file.files !== undefined? console.log(file.files) :  console.log('no result')
    }
  return (
    <div>
        <form onSubmit={()=>{
            console.log(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/upload`);
            
            uploadMedia(file.files[0], `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/upload`).then(res=>{console.log(res);})
                console.log(file.files);
        }}>
            <input type="file" name="files" onChange={(e)=>{setFile(e.target)}} />
            <input type="submit" value="Submit" />
        </form>
        
    </div>
  )
}

export default TestConnection