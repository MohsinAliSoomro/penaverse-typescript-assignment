import React from "react";
import { IAnswer, IQuestion } from "../types";

interface IProps {
  loading: boolean;
  questions: IQuestion[];
  questionNumber: number;
  handleAnswer: ({ answer, questionId }: IAnswer) => void;
  questionAnswer: string[][];
}
function Questions({
  loading,
  questions,
  handleAnswer,
  questionNumber,
  questionAnswer,
}: IProps) {
  return loading ? (
    <div className="font-bold text-center">Loading...</div>
  ) : (
    <div>
      {questions.length > 0 && (
        <div className="p-4">
          <h1 className="font-bold">Question {questionNumber + 1}</h1>
          <p className="text-2xl font-bold">
            {questions[questionNumber].question}
          </p>
          <p>Category : {questions[questionNumber].tags[0]}</p>
          <ul>
            {questionAnswer[questionNumber].map((item, index) => (
              <li
                onClick={() =>
                  handleAnswer({
                    questionId: questions[questionNumber].id,
                    answer: item,
                  })
                }
                className="border p-3 my-2 rounded-lg font-bold cursor-pointer hover:bg-sky-400"
                key={index}
              >
                <span>{index + 1}</span> {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Questions;
