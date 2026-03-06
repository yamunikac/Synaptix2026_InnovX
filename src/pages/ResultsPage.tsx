import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, ArrowLeft } from 'lucide-react';

interface Session {
  id: string;
  total_questions: number;
  correct_count: number;
  incorrect_count: number;
  accuracy: number;
  avg_response_time: number;
  final_difficulty: string;
  completed_at: string | null;
}

interface Response {
  id: string;
  is_correct: boolean;
  difficulty_at_time: string;
  question_number: number;
}

export default function ResultsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) { navigate('/auth'); return; }

    (async () => {
      const [sessionRes, responsesRes] = await Promise.all([
        supabase.from('test_sessions')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single(),
        supabase.from('test_responses')
          .select('*')
          .eq('session_id', id)
          .eq('user_id', user.id)
          .order('question_number'),
      ]);

      if (sessionRes.data) setSession(sessionRes.data as Session);
      if (responsesRes.data) setResponses(responsesRes.data as Response[]);
      setLoading(false);
    })();
  }, [user, id, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) return <div className="min-h-screen flex items-center justify-center">Session not found.</div>;

  const accuracy = Number(session.accuracy);

  // Difficulty Breakdown
  const difficultyBreakdown = responses.reduce((acc, r) => {
    if (!acc[r.difficulty_at_time])
      acc[r.difficulty_at_time] = { correct: 0, total: 0 };

    acc[r.difficulty_at_time].total += 1;
    if (r.is_correct)
      acc[r.difficulty_at_time].correct += 1;

    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  // Strengths & Weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  Object.entries(difficultyBreakdown).forEach(([diff, stats]) => {
    const pct = Math.round((stats.correct / stats.total) * 100);
    if (pct >= 70) strengths.push(diff);
    else weaknesses.push(diff);
  });

  const finalStrengths = strengths.slice(0, 2);
  const finalWeaknesses = weaknesses.slice(0, 2);

  // Mastery
  let masteryLevel = "Beginner";
  if (accuracy >= 75) masteryLevel = "Advanced";
  else if (accuracy >= 50) masteryLevel = "Intermediate";

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10">
      <div className="max-w-4xl mx-auto px-6 space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-700">
            <Trophy className="h-7 w-7" />
            Assessment Report
          </h1>
        </div>

        {/* Score */}
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center space-y-3">
          <div className="text-6xl font-bold text-blue-600">{accuracy}%</div>
          <div className="text-xl font-semibold text-purple-600">
            {masteryLevel} ({accuracy}% Mastery)
          </div>
          <p className="text-gray-500">
            {session.correct_count} correct out of {session.total_questions}
          </p>
        </div>

        {/* Difficulty Breakdown */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-bold">Difficulty Breakdown</h2>

          {Object.entries(difficultyBreakdown).map(([diff, stats]) => {
            const pct = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={diff} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{diff}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Competency Profile */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6">
          <h2 className="text-xl font-bold">Competency Profile</h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="text-green-700 font-semibold mb-2">Strengths</h3>
              {finalStrengths.length > 0
                ? finalStrengths.map(s => (
                    <p key={s}>• Strong in {s} questions</p>
                  ))
                : <p>• Strong conceptual clarity</p>}
            </div>

            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="text-red-700 font-semibold mb-2">Weaknesses</h3>
              {finalWeaknesses.length > 0
                ? finalWeaknesses.map(w => (
                    <p key={w}>• Needs improvement in {w}</p>
                  ))
                : <p>• Needs more practice consistency</p>}
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="text-blue-700 font-semibold mb-2">Mastery Level</h3>
              <p className="text-lg font-bold">{masteryLevel}</p>
              <p className="text-sm text-gray-500">
                Overall proficiency level
              </p>
            </div>

          </div>
        </div>

        {/* Response Timeline */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">Response Timeline</h2>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {responses.map(r => (
              <div
                key={r.id}
                className={`h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                  r.is_correct
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {r.question_number}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-3">
          <h2 className="text-lg font-bold">Recommendations</h2>

          <p>• Focus on improving consistency across difficulty levels.</p>
          <p>• Practice medium and hard questions daily.</p>
          <p>• Review incorrect answers and understand the concepts deeply.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/test')}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Retake Test
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}