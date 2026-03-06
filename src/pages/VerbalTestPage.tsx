import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const questionPool: Question[] = [
  {
    id: 1,
    question: "Choose the correct synonym for 'Rapid'.",
    options: ["Slow", "Fast", "Late", "Weak"],
    correctAnswer: "Fast",
    explanation:
      "'Rapid' means happening quickly. 'Fast' is the correct synonym.",
  },
  {
    id: 2,
    question: "Identify the correct sentence.",
    options: [
      "She don't like coffee.",
      "She doesn't likes coffee.",
      "She doesn't like coffee.",
      "She not like coffee."
    ],
    correctAnswer: "She doesn't like coffee.",
    explanation:
      "With 'doesn't', the base verb form is used. So it should be 'like', not 'likes'.",
  },
  {
    id: 3,
    question: "Fill in the blank: He has been working here ___ 2019.",
    options: ["since", "for", "from", "by"],
    correctAnswer: "since",
    explanation:
      "'Since' is used to indicate the starting point of time (2019).",
  },
  {
    id: 4,
    question: "Choose the correct antonym of 'Expand'.",
    options: ["Increase", "Grow", "Reduce", "Multiply"],
    correctAnswer: "Reduce",
    explanation:
      "'Expand' means to increase in size. The opposite is 'Reduce'.",
  },
  {
    id: 5,
    question: "Select the correct article: ___ apple a day keeps the doctor away.",
    options: ["A", "An", "The", "No article"],
    correctAnswer: "An",
    explanation:
      "'Apple' begins with a vowel sound, so we use 'An'.",
  },
];

export default function VerbalTestPage() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5));
  }, []);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    setShowExplanation(true);

    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/results/verbal", {
        state: {
          score,
          total: questions.length,
        },
      });
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6">
        {currentQuestion.question}
      </h2>

      <div className="space-y-3">
        {currentQuestion.options.map((option) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selectedAnswer;

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-3 rounded-lg border transition ${
                showExplanation
                  ? isCorrect
                    ? "bg-green-100 border-green-500"
                    : isSelected
                    ? "bg-red-100 border-red-500"
                    : "bg-gray-100"
                  : "hover:bg-blue-50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <p className="font-semibold">
            Correct Answer: {currentQuestion.correctAnswer}
          </p>
          <p className="text-gray-600 mt-2">
            {currentQuestion.explanation}
          </p>

          <button
            onClick={handleNext}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}