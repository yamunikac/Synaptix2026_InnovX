import React from "react";

interface CertificationPortal {
  name: string;
  category: string;
  url: string;
}

const portals: CertificationPortal[] = [
  {
    name: "Google Skillshop",
    category: "Marketing & Tech Certifications",
    url: "https://skillshop.withgoogle.com/"
  },
  {
    name: "Microsoft Learn",
    category: "Cloud & Development Certifications",
    url: "https://learn.microsoft.com/"
  },
  {
    name: "freeCodeCamp",
    category: "Programming Certifications",
    url: "https://www.freecodecamp.org/"
  },
  {
    name: "Coursera",
    category: "University Certifications",
    url: "https://www.coursera.org/"
  },
  {
    name: "edX",
    category: "Academic Certifications",
    url: "https://www.edx.org/"
  },
  {
    name: "Cisco Networking Academy",
    category: "Networking Certifications",
    url: "https://www.netacad.com/"
  },
  {
    name: "HubSpot Academy",
    category: "Digital Marketing Certifications",
    url: "https://academy.hubspot.com/"
  },
  {
    name: "LinkedIn Learning",
    category: "Professional Certifications",
    url: "https://www.linkedin.com/learning/"
  }
];

const CertificationsPage: React.FC = () => {
  const handleRedirect = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-12 transition-all duration-500">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          🎓 Online Free Certification Platforms
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Click on any platform below to get certified for free!
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {portals.map((portal, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => handleRedirect(portal.url)}
          >
            {/* Logo using Google favicon API */}
            <img
              src={`https://www.google.com/s2/favicons?sz=128&domain_url=${portal.url}`}
              alt={portal.name}
              className="w-16 h-16 object-contain mx-auto mb-4 bg-white p-2 rounded-lg shadow"
            />

            <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
              {portal.name}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
              {portal.category}
            </p>

            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
              Get Certified
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsPage;