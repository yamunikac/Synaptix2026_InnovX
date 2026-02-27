import { useNavigate } from "react-router-dom";
import {
  Brain,
  Code2,
  BookOpen,
  Globe2,
  Database,
  ShieldCheck
} from "lucide-react";

const subjects = [
  {
    name: "Aptitude",
    description: "Sharpen quantitative & analytical skills.",
    icon: Brain,
    path: "/aptitude-test"
  },
  {
    name: "Technical Skills",
    description: "Programming & development concepts.",
    icon: Code2,
    path: "/technical-test"
  },
  {
    name: "Verbal Ability",
    description: "Improve grammar & communication.",
    icon: BookOpen,
    path: "/verbal-test"   // ✅ FIXED HERE
  },
  {
    name: "General Knowledge",
    description: "Stay updated with world affairs.",
    icon: Globe2,
    path: "/test"
  },
  {
    name: "Data Science",
    description: "Statistics, ML & analytics.",
    icon: Database,
    path: "/test"
  },
  {
    name: "Cyber Security",
    description: "Modern security principles.",
    icon: ShieldCheck,
    path: "/test"
  }
];

export default function AssessmentsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Choose Your Subject
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Select a subject to begin your adaptive assessment journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <div
            key={subject.name}
            onClick={() => navigate(subject.path)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 cursor-pointer group"
          >
            <div className="flex justify-center mb-4">
              <subject.icon className="w-12 h-12 text-primary group-hover:scale-110 transition" />
            </div>

            <h2 className="text-xl font-semibold text-center text-gray-800">
              {subject.name}
            </h2>

            <p className="text-gray-500 text-center mt-2 text-sm">
              {subject.description}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(subject.path);
              }}
              className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              Start Assessment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}