import { Link } from "react-router-dom";
import { useState } from "react";

export default function Landing1() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* ================= NAVBAR ================= */}
      <nav className="absolute top-0 left-0 w-full flex items-center px-10 py-6 z-20 space-x-10">

        <img
          src={`${import.meta.env.BASE_URL}hclogo.jpeg`}
          alt="EduPlus Logo"
          className="h-14 hover:scale-105 transition duration-300"
        />

        <div className="flex space-x-8 text-white font-semibold text-lg">

          <Link
            to="/"
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 500);
            }}
            className="hover:text-orange-400 transition duration-300"
          >
            HOME
          </Link>

          <Link
            to="/auth"
            className="hover:text-orange-400 transition duration-300"
          >
            LOGIN
          </Link>

        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section
        className="h-screen bg-cover bg-center flex items-center justify-center text-center text-white relative"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}background.jpg)`
        }}
      >
        <div className="bg-black/60 backdrop-blur-md p-12 rounded-3xl max-w-3xl shadow-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            One Step Solution <br /> for Campus Placement Training
          </h1>

          <Link
            to="/dashboard"
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 500);
            }}
            className="bg-orange-500 px-8 py-4 rounded-full text-white text-lg font-semibold hover:bg-orange-600 hover:scale-105 transition duration-300 shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* ================= OUR FEATURES ================= */}
      <section className="bg-[#F2E4D8] py-24 px-6">
        <h2 className="text-5xl font-bold text-center mb-16">Our Features</h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

          <FeatureCard
            icon="📊"
            title="Performance Based Questions"
            description="Questions adapt based on your performance."
          />

          <FeatureCard
            icon="⚡"
            title="Dynamic Question Adjustment"
            description="Difficulty adjusts in real time."
          />

          <FeatureCard
            icon="🌍"
            title="Global Platform Readiness"
            description="Compete with learners worldwide."
          />

          <FeatureCard
            icon="📈"
            title="Personalized Competency Profile"
            description="Detailed analytics and skill reports."
          />

        </div>
      </section>

      {/* ================= TRENDING CATEGORIES ================= */}
      <section className="bg-[#F7EEE6] py-24 px-6 text-center">
        <h2 className="text-5xl font-bold mb-6">Trending Categories</h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-16 text-lg">
          Stay ahead with in-demand training in aptitude, reasoning,
          technical skills, communication, and industry-focused preparation.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">

          <CategoryCard icon="📘" title="Aptitude" description="Sharpen your problem-solving skills." />
          <CategoryCard icon="🧠" title="Reasoning" description="Develop logical reasoning skills." />
          <CategoryCard icon="💻" title="Coding" description="Master programming concepts." />
          <CategoryCard icon="📚" title="Verbal Ability" description="Enhance communication skills." />
          <CategoryCard icon="🌍" title="General Knowledge" description="Stay updated globally." />
          <CategoryCard icon="📊" title="Data Structures" description="Build strong CS foundation." />
          <CategoryCard icon="🗄️" title="Database Management" description="Learn DBMS & SQL fundamentals." />
          <CategoryCard icon="🔐" title="Cyber Security" description="Understand modern security principles." />

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#EFE1D5] py-8 text-center border-t">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} EduPlus. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white rounded-xl p-10 shadow-md hover:shadow-2xl hover:-translate-y-3 transition duration-300 text-black text-center">
      <div className="text-4xl mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

/* ================= CATEGORY CARD ================= */

function CategoryCard({ icon, title, description }: any) {
  return (
    <div className="bg-white rounded-3xl p-10 shadow-md hover:shadow-2xl hover:-translate-y-3 hover:bg-orange-50 transition duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}