import React, { useEffect } from 'react';
import '../../styles/utils/AnswerFeedback.css';

interface AnswerFeedbackProps {
    isCorrect: boolean;
    onAnimationEnd: () => void;
}

const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({ isCorrect, onAnimationEnd }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationEnd();
        }, 2000); // Durée de l'animation (2 secondes)
        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    return (
        <div className={`answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse !'}
        </div>
    );
};

export default AnswerFeedback;
