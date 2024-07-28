'use client'

import React, { useEffect, useRef, useState } from 'react'
import "@/component/Examination/Reading/ReadingTab.css"
import { Box, Button } from '@mui/material'
import PassageComponent from '@/component/Examination/Reading/PassageComponent'
import MultilineTextFields from '@/component/UtilsComponent/TextAreaAutoSize'
import { ReadingTest } from '@/utils/postReading'
function ReadingTab() {
  const [testName, setTestName] = useState<string>()
  const [duration, setDuration] = useState<number>()

  const [passageQues1, setPassageQues1] = useState<any[]>([])
  const [passageQues2, setPassageQues2] = useState<any[]>([])
  const [passageQues3, setPassageQues3] = useState<any[]>([])

  const [passageContent1, setPassageContent1] = useState<string>('')
  const [passageContent2, setPassageContent2] = useState<string>('')
  const [passageContent3, setPassageContent3] = useState<string>('')

  const [previewImg1, setPreviewImg1] = useState<any>()
  const [previewImg2, setPreviewImg2] = useState<any>()
  const [previewImg3, setPreviewImg3] = useState<any>()

  const [Img1, setImg1] = useState<any>()
  const [Img2, setImg2] = useState<any>()
  const [Img3, setImg3] = useState<any>()

  function previewFile1(e: any) {
    let url = URL.createObjectURL(e.target.files[0]);
    setPreviewImg1(url)
    console.log(url);

    console.log(previewImg1);

  }

  function previewFile2(e: any) {
    let url = URL.createObjectURL(e.target.files[0]);
    setPreviewImg2(url)
    console.log(url);

    console.log(previewImg2);
  }


  function previewFile3(e: any) {
    let url = URL.createObjectURL(e.target.files[0]);
    setPreviewImg3(url)
    console.log(url);

    console.log(previewImg3);

  }

  const handdleSubmit = () => {
    if(testName === undefined) {
      alert('Please enter the test name')
      return;
    } 
    if(duration === undefined){
      alert('Please enter the duration')
      return;
    }
    if(passageContent1 === ''){
      alert('Please enter the passage content 1')
      return;
    }
    if(passageContent2 === ''){
      alert('Please enter the passage content 2')
      return;
    }
    if(passageContent3 === ''){
      alert('Please enter the passage content 3')
      return;
    }
    const reading_test = {
      name: testName,
      type: 'Reading',
      Duration: duration
    }
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        data: reading_test
      })
    }).then((res) => {
      //console.log(res);
      return res.json()
    }).then((test) => {
      console.log(test);
      const test_id = test.data.id
      const rt = new ReadingTest()
      rt.addParagraph(passageContent1)
      rt.addImage(Img1)
        .then((img) => {
          passageQues1.map((ques) => {
            let ques_type = ques.type
            switch (ques_type) {
              case 'questionair':
                rt.addQuestionair(ques.content)
                break;
              case 'filling':
                rt.addFillingQuestion(ques.question, ques.answer)
                break;
              case 'multiple':
                rt.addMultiplechoiceQuestion(ques.question, ques.options, ques.answer)
            }
          })
        })
        .then(() => {
          rt.addParagraph(passageContent2)
          rt.addImage(Img2)
            .then((img) => {

              passageQues2.map((ques) => {
                let ques_type = ques.type
                switch (ques_type) {
                  case 'questionair':
                    rt.addQuestionair(ques.content)
                    break;
                  case 'filling':
                    rt.addFillingQuestion(ques.question, ques.answer)
                    break;
                  case 'multiple':
                    rt.addMultiplechoiceQuestion(ques.question, ques.options, ques.answer)
                }

              })
            })
            .then(() => {
              rt.addParagraph(passageContent3)
              rt.addImage(Img3)
                .then((img) => {

                  passageQues3.map((ques) => {
                    let ques_type = ques.type
                    switch (ques_type) {
                      case 'questionair':
                        rt.addQuestionair(ques.content)
                        break;
                      case 'filling':
                        rt.addFillingQuestion(ques.question, ques.answer)
                        break;
                      case 'multiple':
                        rt.addMultiplechoiceQuestion(ques.question, ques.options, ques.answer)
                    }

                  })
                })
                .then(() => {
                  rt.addRelationTest(test_id)
                    .then(() => {
                      return rt.submitForm()
                    })
                    .then((res) => {
                      console.log(res);
                    })
                })

            })
        })
    })
    alert('Test is created Successfully!')
    //window.location.reload()
  }

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "15px",
        backgroundColor: "white",
        // boxShadow: '0 0 11px rgba(33,33,33,.2)'
      }}>
      <div className="test-info">
        <div className="test-name">
          <MultilineTextFields
            setContent={setTestName}
            minRows={1}
            label='Test Name*'
            onChange={(e: { target: { value: React.SetStateAction<string | undefined> } }) => {
              setTestName(e.target.value)
            }} />
        </div>
        <div className="test-duration">
          <MultilineTextFields
            setContent={setDuration}
            minRows={1}
            label='Test Duration*'
            onChange={(e: { target: { value: string } }) => {
              setDuration(parseInt(e.target.value))
            }} />
        </div>
      </div>
      <div className="Passage p-part1">
        <div className="passage-order">
          <h3>Passage 1</h3>
        </div>
        <div className="passage">
          <PassageComponent
            content={passageContent1}
            setContent={setPassageContent1}
            questions={passageQues1}
            setQuestions={setPassageQues1} />
          <input
            type="file"
            name='file'
            onChange={(e) => {
              previewFile1(e)
              if (e.target.files !== null) {
                setImg1(e.target.files[0])
              }

            }}
            className='input-file'
          />
          <img src={previewImg1} alt="image-passage" width={150} height={200} />
        </div>
      </div>
      <div className="Passage p-part2">
        <div className="passage-order">
          <h3>Passage 2</h3>
        </div>
        <div className="passage">
          <PassageComponent
            content={passageContent2}
            setContent={setPassageContent2}
            questions={passageQues2}
            setQuestions={setPassageQues2} />
          <input
            type="file"
            name='file'
            onChange={(e) => {
              previewFile2(e)
              if (e.target.files !== null) {
                setImg2(e.target.files[0])
              }
            }}
            className='input-file'
          />
          <img src={previewImg2} alt="image-passage" width={150} height={200} />
        </div>
      </div>
      <div className="Passage p-part3">
        <div className="passage-order">
          <h3>Passage 3</h3>
        </div>
        <div className="passage">
          <PassageComponent
            content={passageContent3}
            setContent={setPassageContent3}
            questions={passageQues3}
            setQuestions={setPassageQues3} />
          <input
            type="file"
            name='file'
            onChange={(e) => {
              previewFile3(e)
              if (e.target.files !== null) {
                setImg3(e.target.files[0])
              }
            }}
            className='input-file'
          />
          <img src={previewImg3} alt="image-passage" width={150} height={200} />
        </div>
      </div>
      <div className="submit">
        <Button
          onClick={() => { handdleSubmit() }}
          variant='contained'
          sx={{
            marginTop: 5,
            transform: 'translateX(220%)',
            border: '0.8px solid wheat',
            boxShadow: '0 0 11px rgba(33,33,33,.2)',
            backgroundColor: "green"
          }}
        >Create Test</Button>
      </div>
    </Box>
  )
}

export default ReadingTab