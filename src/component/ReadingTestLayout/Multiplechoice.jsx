export default function MultipleChoice({ question, handleInput }) {
    console.log(question);
    return (
      <div className="mt-7 flex flex-row gap-3">
        <p className="bg-[#e8f2ff] text-[#35509a] w-8 h-8 flex justify-center items-center font-semibold rounded-full">{question.number}</p>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{question.question}</p>
          {Object.keys(question.choices).map((key) => (
            <div key={key}>
              <input type="radio" id={key} name={`name${question.number}`} value={key} data-number={question.number - 1} onClick={handleInput}/>
              <label className="ml-2" htmlFor={key}>{key + '. ' + question.choices[key]}</label><br />
            </div>
          ))}
        </div>
      </div>
    );
}
  