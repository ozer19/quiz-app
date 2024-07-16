import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";
import Result from "./Result";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canClick, setCanClick] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const shuffledQuestions = shuffleArray(response.data.slice(0, 10));
      setQuestions(shuffledQuestions);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        if (timeLeft === 20) setCanClick(true);
      }, 1000);

      return () => clearInterval(timer);
    } else if (quizStarted && timeLeft === 0) {
      setTimeLeft(30);
      setCanClick(false);
      setAnswers((prev) => [
        ...prev,
        {
          question: questions[currentQuestionIndex]?.title,
          answer: selectedAnswer,
        },
      ]);
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setQuizStarted(false);
      }
    }
  }, [timeLeft, quizStarted, currentQuestionIndex, questions, selectedAnswer]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (choice) => {
    if (canClick) {
      setSelectedAnswer(choice.text);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
      {!quizStarted && answers.length === 0 ? (
        <div className="bg-white p-20 w-full max-w-2xl flex flex-col gap-4 rounded-3xl shadow-lg items-center text-center">
          <h2 className="text-5xl font-extrabold mb-6">Welcome to the Quiz</h2>
          <p className="text-2xl mb-6">
            Press the button below to start the quiz.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-16 rounded"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      ) : quizStarted &&
        questions.length > 0 &&
        currentQuestionIndex < questions.length ? (
        <Question
          question={questions[currentQuestionIndex]}
          timeLeft={timeLeft}
          canClick={canClick}
          handleAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
        />
      ) : (
        <Result answers={answers} />
      )}
    </div>
  );
};

export default Quiz;
