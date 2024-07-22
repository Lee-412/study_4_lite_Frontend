'use server'

class readingTest {
    constructor() {
        this.form = {
            ReadingComponent: []
        }
    }
    addParagraph(paragraph) {
        this.form.ReadingComponent.push({
            __component: 'ielts-reading.paragraph',
            Content: paragraph
        })
    }
  
    addQuestionair(questionair) {
        this.form.ReadingComponent.push({
            __component: 'ielts-reading.questionair',
            Content: questionair
        })
    }
  
    addFillingQuestion(question, answer) {
        this.form.ReadingComponent.push({
            __component: "ielts-reading.filling",
            Question: question,
            Answer: answer
        })
    }
  
    addMultiplechoiceQuestion(question, choices, answer) {
        this.form.ReadingComponent.push({
            __component: "ielts-reading.multiple-choice",
            Question: question,
            Answer: answer,
            Choices: choices
        })
    }
  
    async addRelationTest(id) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests`, {
            headers: {
            'Cache-Control': 'no-cache',
            },
        });
        let data = await response.json();
        data = data.data;
        const test = data.filter(item => item.id === id);
        if (test.length == 0) {
            console.log("There is no test with that id");
            return;
        }
        this.form['test'] = test[0];
    }

    async submitForm() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/reading-tests`, { 
        method: "POST", 
        body: JSON.stringify({data :this.form}), 
        headers: { 
            "Content-type": "application/json"
        }});
        const dt = await response.json();
        console.log(dt);
    }
  }
  //khởi tạo object
  const rt = new readingTest();

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
  await rt.addRelationTest(5);
  await rt.submitForm();

  // add theo thứ tự paragraph -> questionair -> các questions -> paragraph -> ...., sau đó addRelation và cuối cùng là submit form