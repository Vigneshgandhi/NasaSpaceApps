"use client";
import { useState } from 'react';
import Navbar from '../Components/Navbar';
const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('mission');

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      description: "Specializes in 3D web experiences with Three.js and React Three Fiber"
    },
    {
      name: "Maria Garcia",
      role: "UI/UX Designer",
      description: "Creates immersive interfaces inspired by space exploration aesthetics"
    },
    {
      name: "Dr. James Wilson",
      role: "Space Researcher",
      description: "Astrophysicist providing scientific accuracy and historical context"
    },
    {
      name: "Sam Chen",
      role: "AI Specialist",
      description: "Implemented AI tools for content generation and data visualization"
    }
  ];

  const features = [
    {
      icon: "🌎",
      title: "3D Earth & ISS Visualization",
      description: "Real-time rendering using Three.js and React Three Fiber"
    },
    {
      icon: "📅",
      title: "Interactive Timeline",
      description: "Explore 25 years of milestones from 1998 to 2023"
    },
    {
      icon: "👨‍🚀",
      title: "Astronaut Stories",
      description: "Personal accounts from international crew members"
    },
    {
      icon: "🔬",
      title: "Scientific Discoveries",
      description: "Breakthrough research in medicine, robotics, and Earth science"
    }
  ];

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454789548928-9a7310581f18?auto=format&fit=crop')" }}></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Orbit25
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Celebrating 25 Years of Humanity's Home in Space
            </p>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              An interactive experience honoring the International Space Station's legacy of scientific discovery and international cooperation
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Journey Through Space and Time</h2>
          <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
            Orbit25 is an interactive web experience dedicated to celebrating the 25th Anniversary of the International Space Station (ISS). 
            Built to inspire curiosity and honor global collaboration, it lets visitors explore the station's history, scientific achievements, 
            and the boundless spirit of exploration that defines human progress in space.
          </p>
        </div>
      </div>

      {/* Mission & Vision Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveSection('mission')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeSection === 'mission'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Our Mission
          </button>
          <button
            onClick={() => setActiveSection('vision')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeSection === 'vision'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Our Vision
          </button>
          <button
            onClick={() => setActiveSection('inspiration')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeSection === 'inspiration'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            The Inspiration
          </button>
        </div>

        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-2xl p-8 md:p-12">
          {activeSection === 'mission' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Our Mission</h3>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Our mission is to bring the story of the ISS closer to people everywhere — not just as a scientific marvel, 
                but as a symbol of peace, partnership, and perseverance. Orbit25 connects audiences to how the ISS transformed 
                space research, international cooperation, and our understanding of Earth from orbit.
              </p>
            </div>
          )}

          {activeSection === 'vision' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Our Vision</h3>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                To inspire future explorers, educate the next generation, and celebrate global teamwork through a creative 
                fusion of design, data, and interactive storytelling. We envision a world where everyone can experience 
                the wonder of space exploration and understand the importance of international collaboration in scientific discovery.
              </p>
            </div>
          )}

          {activeSection === 'inspiration' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-indigo-400">The Inspiration</h3>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                The ISS is more than a spacecraft — it's a testament to human unity. For 25 years, astronauts from over 20 countries 
                have lived and worked together in orbit. Orbit25 seeks to capture that human spirit — reminding us that even in space, 
                collaboration keeps us grounded. This project celebrates not just technological achievement, but the power of nations 
                working together toward a common goal.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* What You'll Discover */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-16">What You'll Discover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-30 border border-gray-700 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Technology Stack</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span><span className="font-semibold">Next.js</span> – for performance and SEO-friendly rendering</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span><span className="font-semibold">Three.js + React Three Fiber</span> – for immersive 3D experiences</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span><span className="font-semibold">Tailwind CSS</span> – for responsive, elegant UI components</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Data Sources</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                  <span><span className="font-semibold">NASA Open APIs</span> – real mission data and imagery</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                  <span><span className="font-semibold">Public Datasets</span> – historical records and scientific publications</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                  <span><span className="font-semibold">ESA & JAXA Archives</span> – international collaboration data</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-16">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6 text-center hover:border-blue-500 transition-all"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                👨‍💻
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-blue-400 mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold mb-3">AI Support</h3>
          <p className="text-gray-400 max-w-3xl mx-auto">
            AI tools were used to assist with content structuring, creative generation, and data visualization. 
            All AI-assisted content is clearly marked and reviewed by our team for accuracy and authenticity.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-30 border border-gray-700 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Join us on a journey through 25 years of human achievement in space
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all">
            Launch Experience
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutPage;