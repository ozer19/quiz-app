import React from "react";

const Result = ({ answers }) => {
  return (
    <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>
      <table className="table-auto w-full text-left text-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">Question</th>
            <th className="px-4 py-2">Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{answer.question}</td>
              <td className="px-4 py-2">{answer.answer || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
