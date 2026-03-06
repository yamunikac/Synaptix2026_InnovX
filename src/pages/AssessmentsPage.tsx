import { useNavigate } from "react-router-dom";

export default function AssessmentsPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen">
      <iframe
        src="https://adapti-learn-quest-98.lovable.app/assessment/courses"
        className="w-full h-full border-0"
        title="Assessment Platform"
      />
    </div>
  );
}