import { uploadMedia } from "@/utils/postRequest"
export class ReadingTest {
    form:any
    constructor() {
        this.form = {
            ReadingComponent: []
        }
    }
    addParagraph(paragraph:string) {
        this.form.ReadingComponent.push({
            __component: 'ielts-reading.paragraph',
            Content: paragraph
        })
    }
  
    addQuestionair(questionair:string) {
        this.form.ReadingComponent.push({
            __component: 'ielts-reading.questionair',
            Content: questionair
        })
    }
  
    addFillingQuestion(question:string, answer:string) {
        this.form.ReadingComponent.push({
            __component: "ielts-reading.filling",
            Question: question,
            Answer: answer
        })
    }
  
    addMultiplechoiceQuestion(question:string, choices:any, answer:string) {
        this.form.ReadingComponent.push({
            __component: "ielts-reading.multiple-choice",
            Question: question,
            Answer: answer,
            Choices: choices
        })
    }
  
    async addRelationTest(id:number) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests`);
        let data = await response.json();
        data = data.data;
        const test = data.filter((item:any) => item.id === id);
        if (test.length == 0) {
            console.log("There is no test with that id");
            return;
        }
        this.form['test'] = test[0];
    }

    async addImage(File:any) {
        if(File === undefined) return undefined
        const form = new FormData()
        form.append('files', File)
        const img_data = await uploadMedia(form)
        this.form.ReadingComponent.push({
            __component: "ielts-reading.image",
            url: img_data[0].url
            
        })
        console.log({
            __component: "ielts-reading.image",
            url: img_data[0].url
            
        });
        
        return img_data
        //console.log(img_data[0].url);
    }

    async submitForm() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/reading-tests`, { 
        method: "POST", 
        body: JSON.stringify({data :this.form}), 
        headers: { 
            "Content-type": "application/json"
        }});
        const dt = await response.json();
        //console.log(dt);
        return dt
    }
  }
  //khởi tạo object
  const rt = new ReadingTest();

  //nhận 1 string là paragraph
  rt.addParagraph('paragraph 123');

  // nhận 1 string là questionair
  rt.addQuestionair('questionair 456');

  // nhận 1 string là question, 1 string là answer
  rt.addFillingQuestion('question 4444446', 'answer 123');

  // nhận 1 string là question, 1 object theo định dạng bên dưới là các lựa chọn của câu hỏi, 1 string là đáp án của câu hỏi
  rt.addMultiplechoiceQuestion('multiple choice 123', {
    A: '1',
    B: '2',
    C: '3'
  }, 'B');

  // nhận 1 số là id của test cần relate đến
 
  // add theo thứ tự paragraph -> image(optional) -> questionair -> các questions -> paragraph -> ...., sau đó addRelation và cuối cùng là submit form