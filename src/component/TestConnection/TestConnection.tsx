'use client'
import { ListeningTest } from '@/utils/postListening'
import { uploadMedia } from '@/utils/postRequest'
import React, { useEffect } from 'react'
import { useState } from 'react'
function TestConnection() {
    const [file, setFile] = useState<any>()
    const [file_in, setFileIn] = useState<File>()
    //fetch_listening()
    useEffect(()=>{
        if(file !== undefined) {
            file.files !== undefined? console.log(file.files) :  console.log('no result')
            setFileIn(file.files[0])
        }
    }, [file_in, file])
    
    function onClick () {
        // console.log(file_in);
        // const form = new FormData()
        // if(file !== undefined) {
        //     form.append('files', file.files[0])
        //     uploadMedia(form)
        //     .then((data)=>{console.log(data);
        //     })
        // } 
        if(file !== undefined) {
            let listening_test = new ListeningTest()
            listening_test.addImage(file.files[0]).then(()=>{
                listening_test.addQuestion('Question 789')
                listening_test.addFilling('question 4444446', 'answer 123')
                listening_test.addMultiplechoice('multiple choice 123', 'B', {
                    A: '1',
                    B: '2',
                    C: '3'
                  })
                listening_test.addRelationTest(8)
                .then(()=>{
                    listening_test.submitForm()
                    .then((data)=>{console.log(data);
                    })
                })
            })
        }
       
        // .then((item)=>{console.log(item);
        // })
        }
  return (
    <div>
        <form>
            <input type="file" name="files" onChange={(e)=>
                {setFile(e.target)}} />
        </form>
        <button onClick={()=>{onClick()}}>Click</button>
    </div>
  )
}

export default TestConnection