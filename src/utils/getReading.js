export async function fetchAllData(id) {
    let numberOfQuestion = 0;
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/reading-tests/${id}?populate=*`);
    let data = await response.json();
    data = data.data.attributes.ReadingComponent;
    const result = [];
    for (let i = 0; i < data.length; ++ i) {
        if (data[i].__component === "ielts-reading.paragraph") {
            const newParagraph = {
                paragraph: data[i].Content,
                questions: []
            }
            result.push(newParagraph)
        } else if (data[i].__component === "ielts-reading.questionair") {
            const newQuestion = {
                questionair: data[i].Content,
                questionAndAnswer:[]
            }
            result[result.length - 1].questions.push(newQuestion);
        } else if (data[i].__component === "ielts-reading.image") {
            const q = result[result.length - 1].questions;
            q[q.length - 1].image = data[i].url
        } else if (data[i].__component === "ielts-reading.filling") {
            numberOfQuestion ++;
            const newQuestionAndAnswer = {
                number: numberOfQuestion,
                type: "filling",
                question: data[i].Question,
                answer: data[i].Answer
            }
            const q = result[result.length - 1].questions;
            q[q.length - 1].questionAndAnswer.push(newQuestionAndAnswer);
        } else if (data[i].__component === "ielts-reading.multiple-choice") {
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
