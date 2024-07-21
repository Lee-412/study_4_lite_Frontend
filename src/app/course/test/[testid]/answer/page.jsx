import Answer from '@/component/ReadingTestLayout/Answer'
const AnswerPage = async ({ searchParams }) => {
  
    const studentAnswers = JSON.parse(searchParams.studentAnswers);
    const answers =  JSON.parse(searchParams.answers);
    const userId = JSON.parse(searchParams.userId);
    let score = 0;
    for (let i = 0; i < answers.length; ++ i) {
      if (answers[i] == studentAnswers[i]) {
        score ++;
      }
    }
    await postResult(score, '123', searchParams.testId, userId)

  return (
    <div className="m-4 flex flex-col">
      <h1 className="font-semibold text-xl">Kết quả thi</h1>
      <div className="grid grid-rows-10 grid-flow-col">
            {studentAnswers.map((studentAnswer, index) => (
                <Answer key={index} number={index + 1} studentAnswer={studentAnswer} answer={answers[index]} />
            ))}
      </div>
    </div>
    
  );
};

async function postResult(score, time_finish, testId, userId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests`);
  let data = await res.json();
  data = data.data;
  const test = data.filter(item => item.id == testId);
  if (test.length == 0) {
      console.log("There is no test with that id");
      return;
  }

  const r = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/users`, {
    headers: {
    'Cache-Control': 'no-cache',
    },
  });
  let d = await r.json();
  const user = d.filter(item => item.id === userId);
  if (user.length == 0) {
      console.log("There is no user with that id");
      return;
  }

  const form = {
    score: score,
    Time_finish: time_finish,
    date: new Date(),
    test: test[0],
    user: user[0]
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/student-tests`, { 
    method: "POST", 
    body: JSON.stringify({data :form}), 
    headers: { 
        "Content-type": "application/json"
    }});
    const dt = await response.json();
    console.log(dt);
}
export default AnswerPage;
