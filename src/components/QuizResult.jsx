import React from 'react';

const QuizResult = ({ score, total, answers }) => {
    return (
        <div>
            <h2>Quiz Results</h2>
            <p>
                You scored {score} out of {total}.
            </p>
            <h3>Answer Explanations:</h3>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        <strong>{answer.question}</strong>: {answer.isCorrect ? 'Correct' : 'Incorrect'} -{' '}
                        {answer.explanation}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizResult;