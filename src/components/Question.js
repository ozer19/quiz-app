import React from 'react';

const Question = ({ question, timeLeft, canClick, handleAnswer, selectedAnswer }) => {
  const getChoices = (body) => {
    const words = body.split(' ');
    return words.slice(0, 4).map((word, index) => ({
      id: String.fromCharCode(65 + index),
      text: word,
    }));
  };

  return (
    <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">{question.title}</h2>
      <ul className="mb-6">
        {getChoices(question.body).map((choice) => (
          <li key={choice.id} className="mb-4">
            <button
              className={`w-full p-3 rounded text-left text-lg ${
                canClick
                  ? selectedAnswer === choice.text
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!canClick}
              onClick={() => handleAnswer(choice)}
            >
              {choice.id}: {choice.text}
            </button>
          </li>
        ))}
      </ul>
      <p className="text-right text-gray-500">Time left: {timeLeft} seconds</p>
    </div>
  );
};

export default Question;
