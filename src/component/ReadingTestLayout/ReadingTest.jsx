"use client";
import React, { useState } from "react";
import Question from "./Question";
import Timer from "./Timer";
import "../../app/globals.css";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function ReadingTest({ data, testID, userId, duration }) {
  const [currentPassage, setCurrentPassage] = useState(1);
  const answers = [];
  data.map((passage) => {
    passage.questions.map((question) => {
      question.questionAndAnswer.map((q) => {
        answers.push(q.answer);
      });
    });
  });

  const studentAnswers = [];
  answers.map((answer) => studentAnswers.push(""));
  const [stuAns, setStuAns] = useState(studentAnswers);
  const callbackHandler = (e) => {
    const newStuAns = [...stuAns];
    newStuAns[e.target.attributes["data-number"].nodeValue] = e.target.value;
    setStuAns(newStuAns);
  };

  const params_extraction = testID.split("-");

  const test_id = params_extraction[params_extraction.length - 1];

  const handleSubmit = () => {
    // Trigger form submission
    const form = document.getElementById("submit-form");
    form.click();
  };

  return (
    <div className="bg-[#F8F9FA]">
      <h1 className="p-4 font-bold text-2xl">
        IELTS Simulation Reading test 3
      </h1>
      <div className="m-4 flex flex-row gap-5">
        <div className="p-4 flex flex-col w-10/12 bg-white rounded-xl border border-gray-300 gap-5">
          <div className="flex flex-row">
            {Array.from({ length: data.length }, (_, i) => (
              <button
                onClick={() => setCurrentPassage(i + 1)}
                className="bg-[#F8F9FA] hover:bg-[#E7EAF3] focus:bg-[#e8f2ff] focus:text-[#35509a] text-md px-4 py-2 rounded-3xl font-semibold"
              >
                {`Passage ${i + 1}`}
              </button>
            ))}
          </div>
          {data.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`w-full flex flex-row gap-6 ${
                currentPassage === itemIndex + 1 ? "block" : "hidden"
              }`}
            >
              <div className="w-6/12 max-h-[700px] overflow-y-scroll">
                <ReactMarkdown>{item.paragraph}</ReactMarkdown>
              </div>
              <div className="w-6/12 max-h-[700px] overflow-y-scroll">
                {item.questions.map((question, questionIndex) => (
                  <div key={questionIndex}>
                    <ReactMarkdown>{question.questionair}</ReactMarkdown>
                    {question.image && (
                      <img src={`http://127.0.0.1:1337${question.image}`} />
                    )}
                    {question.questionAndAnswer.map((q, qIndex) => (
                      <Question
                        key={qIndex}
                        question={q}
                        handleInput={callbackHandler}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white shadow-xl flex flex-col gap-3">
          <p className="text-xl">Thời gian làm bài:</p>
          <Timer initialSeconds={duration} onTimeUp={handleSubmit} />
          <Link
            id="submit-form"
            className="text-center w-full py-1 text-[#35509a] hover:text-white hover:bg-[#35509a] font-semibold border border-[#35509a] rounded-lg"
            href={{
              pathname: `/course/test/${testID}/answer`,
              query: {
                studentAnswers: JSON.stringify(stuAns),
                answers: JSON.stringify(answers),
                testId: test_id,
                userId: userId,
              },
            }}
          >
            Nộp bài
          </Link>
          <div className="flex flex-col gap-4">
            <p className="font-bold">{`Passage ${currentPassage}`}</p>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: answers.length }, (_, i) => (
                <button
                  key={i}
                  number={i + 1}
                  className={`w-8 h-7 font-semibold border border-black hover:text-white hover:bg-[#35509a] hover:border-[#35509a] ${
                    stuAns[i] !== ""
                      ? "bg-[#ffad3b] text-white border-[#ffad3b]"
                      : ""
                  } flex justify-center items-center rounded-sm`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
