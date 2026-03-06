import React from "react";

interface Platform {
  name: string;
  category: string;
  url: string;
}

const platforms: Platform[] = [
  {
    name: "LeetCode",
    category: "Coding Platform",
    url: "https://leetcode.com"
  },
  {
    name: "HackerRank",
    category: "Coding Platform",
    url: "https://www.hackerrank.com"
  },
  {
    name: "CodeChef",
    category: "Coding Platform",
    url: "https://www.codechef.com"
  },
  {
    name: "Codeforces",
    category: "Coding Platform",
    url: "https://codeforces.com"
  },
  {
    name: "edX",
    category: "Learning Platform",
    url: "https://www.edx.org"
  },
  {
    name: "Coursera",
    category: "Learning Platform",
    url: "https://www.coursera.org"
  },
  {
    name: "Udemy",
    category: "Learning Platform",
    url: "https://www.udemy.com"
  },
  {
    name: "Khan Academy",
    category: "Learning Platform",
    url: "https://www.khanacademy.org"
  }
];

const GlobalPlatformPage: React.FC = () => {

  const handleRedirect = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-12 transition-all duration-500">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          🌍 Global Learning & Coding Platforms
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Explore top global platforms to enhance your skills and knowledge.
        </p>
      </div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer text-center"
            onClick={() => handleRedirect(platform.url)}
          >

            {/* REAL LOGO */}
            <img
              src={`https://www.google.com/s2/favicons?sz=128&domain_url=${platform.url}`}
              alt={platform.name}
              className="w-16 h-16 object-contain mx-auto mb-4 bg-white p-2 rounded-lg shadow"
            />

            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {platform.name}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {platform.category}
            </p>

            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
              Visit Platform
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalPlatformPage;