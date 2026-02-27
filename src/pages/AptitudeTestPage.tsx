import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

/* ================= QUESTION POOL ================= */

const questionPool: Question[] = [
  {
    id: 1,
    question: "If 5 + 3 × 2 = ?",
    options: ["16", "11", "13", "10"],
    correctAnswer: "11",
    explanation:
      "According to BODMAS rule, multiplication is performed before addition. So 3 × 2 = 6, then 5 + 6 = 11.",
  },
  {
    id: 2,
    question: "What is 20% of 150?",
    options: ["25", "30", "35", "40"],
    correctAnswer: "30",
    explanation:
      "20% means 20/100. So (20/100) × 150 = 30.",
  },
  {
    id: 3,
    question: "If a train travels 60 km in 1 hour, how far in 3 hours?",
    options: ["120 km", "150 km", "180 km", "200 km"],
    correctAnswer: "180 km",
    explanation:
      "Distance = Speed × Time → 60 × 3 = 180 km.",
  },
  {
    id: 4,
    question: "Find the missing number: 2, 4, 8, 16, ?",
    options: ["24", "32", "30", "20"],
    correctAnswer: "32",
    explanation:
      "Each number is multiplied by 2. 16 × 2 = 32.",
  },
  {
    id: 5,
    question: "What is the square of 15?",
    options: ["225", "215", "205", "235"],
    correctAnswer: "225",
    explanation:
      "15 × 15 = 225.",
  },
];

/* ================= COMPONENT ================= */

export default function AptitudeTestPage() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  /* ===== Generate Random 20 Questions ===== */

  useEffect(() => {
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 5)); // Change to 20 when pool is larger
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
      navigate("/results", {
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

      {/* Progress */}
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

      {/* Question */}
      <h2 className="text-xl font-semibold mb-6">
        {currentQuestion.question}
      </h2>

      {/* Options */}
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

      {/* Explanation */}
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