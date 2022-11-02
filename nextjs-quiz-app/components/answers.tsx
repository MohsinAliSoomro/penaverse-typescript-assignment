import React from "react";
import { IQuestion } from "../types";

interface IProps {
  questions: IQuestion[];
  answers: {
    questionId: string;
    answer: string;
  }[];
  fetchQuestion: () => void;
}
function Answers({ answers, questions, fetchQuestion }: IProps) {
  return (
    <div>
      {answers.map((answer) => {
        const correctAnswer = questions.find(
          (item) => item.id === answer.questionId
        )?.correctAnswer;
        return (
          <div
            key={answer.questionId}
            className={`${
              answer.answer === correctAnswer ? "bg-green-500" : "bg-red-500"
            }  border rounded-lg p-4`}
          >
            <p>Your Answer : {answer.answer}</p>
            <p>Correct Answer : {correctAnswer}</p>
          </div>
        );
      })}
      <button
        className="w-full p-3 border my-3 rounded-lg"
        onClick={fetchQuestion}
      >
        Again
      </button>
    </div>
  );
}

export default Answers;
