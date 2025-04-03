import React, { useState } from 'react';
import Quiz from '../components/Quiz';
import QuizResult from '../components/QuizResult';

const EasyQuiz = () => {
    const questions = [
        {
            question: 'What is phishing?',
            options: [
                { text: 'A type of malware', isCorrect: false },
                { text: 'A social engineering attack', isCorrect: true },
                { text: 'A firewall', isCorrect: false },
            ],
            explanation: 'Phishing is a social engineering attack to steal sensitive information.',
        },
        // Add more questions here
    ];

    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);

    const handleFinish = (finalScore, finalAnswers) => {
        setScore(finalScore);
        setAnswers(finalAnswers);
        setFinished(true);
    };

    return (
        <div>
            {!finished ? (
                <Quiz questions={questions} onFinish={handleFinish} />
            ) : (
                <QuizResult score={score} total={questions.length} answers={answers} />
            )}
        </div>
    );
};

export default EasyQuiz;