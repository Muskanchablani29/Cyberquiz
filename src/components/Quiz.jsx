import React, { useState } from 'react';

const Quiz = ({ questions, onFinish }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);

    const handleAnswer = (isCorrect, explanation) => {
        if (isCorrect) setScore(score + 1);
        setAnswers([...answers, { question: questions[currentQuestion].question, isCorrect, explanation }]);
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            onFinish(score + (isCorrect ? 1 : 0), answers);
        }
    };

    return (
        <div>
            <h2>{questions[currentQuestion].question}</h2>
            {questions[currentQuestion].options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswer(option.isCorrect, questions[currentQuestion].explanation)}
                >
                    {option.text}
                </button>
            ))}
        </div>
    );
};

export default Quiz;