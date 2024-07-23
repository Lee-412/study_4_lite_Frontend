export async function fetchListeningData(id) {
    let numberOfQuestion = 0;
    const response = await fetch(`http://127.0.0.1:1337/api/listening-tests/${id}?populate=*`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
    });
    let data = await response.json();
    data = data.data.attributes.Listening;
    const result = [];
    for (let i = 0; i < data.length; ++ i) {
        if (data[i].__component === "ielts-listening.audio-url") {
            const newRecording = {
                audio: data[i].Url,
                questions: []
            }
            result.push(newRecording)
        } else if (data[i].__component === "ielts-listening.questionair") {
            const newQuestion = {
                questionair: data[i].Questionaire,
                questionAndAnswer:[]
            }
            result[result.length - 1].questions.push(newQuestion);
        } else if (data[i].__component === "ielts-listening.img-url") {
            const q = result[result.length - 1].questions;
            q[q.length - 1].image = data[i].url
        } else if (data[i].__component === "ielts-listening.filling") {
            numberOfQuestion ++;
            const newQuestionAndAnswer = {
                number: numberOfQuestion,
                type: "filling",
                question: data[i].Question,
                answer: data[i].Answer
            }
            const q = result[result.length - 1].questions;
            q[q.length - 1].questionAndAnswer.push(newQuestionAndAnswer);
        } else if (data[i].__component === "ielts-listening.multiple-choice") {
            numberOfQuestion ++;
            const newQuestionAndAnswer = {
                number: numberOfQuestion,
                type: "multiple choice",
                question: data[i].Question,
                choices: data[i].Choices,
                answer: data[i].Answer
            }
            const q = result[result.length - 1].questions;
            q[q.length - 1].questionAndAnswer.push(newQuestionAndAnswer);
        } else {
            continue;
        }
    }
    return result;
}