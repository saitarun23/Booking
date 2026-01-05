import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiMapPin, 
  FiCheckCircle, 
  FiClock, 
  FiShield, 
  FiArrowRight 
} from "react-icons/fi";

export default function About() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiClock className="text-blue-600" size={24} />,
      title: "Real-time Booking",
      desc: "Instant access to available time slots for your favorite sports courts."
    },
    {
      icon: <FiMapPin className="text-blue-600" size={24} />,
      title: "Wide Coverage",
      desc: "Find and book venues across multiple cities and premium sports complexes."
    },
    {
      icon: <FiShield className="text-blue-600" size={24} />,
      title: "Secure Payments",
      desc: "Your transactions are protected with industry-leading encryption standards."
    },
    {
      icon: <FiCheckCircle className="text-blue-600" size={24} />,
      title: "Verified Venues",
      desc: "We manually verify every facility to ensure quality playing conditions."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
            We simplify your <span className="text-blue-600">Game Day.</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our platform connects athletes with premium sports facilities, making 
            booking as easy as scoring a tap-in.
          </p>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <p className="text-4xl font-black text-blue-600">500+</p>
            <p className="text-gray-500 font-bold uppercase text-xs mt-2">Venues Registered</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <p className="text-4xl font-black text-blue-600">50k+</p>
            <p className="text-gray-500 font-bold uppercase text-xs mt-2">Active Players</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <p className="text-4xl font-black text-blue-600">1M+</p>
            <p className="text-gray-500 font-bold uppercase text-xs mt-2">Hours Booked</p>
          </div>
        </div>

        {/* MAIN CONTENT: MISSION & IMAGE */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded in 2024, our goal is to eliminate the friction between 
              finding a place to play and actually getting on the court. Whether 
              it's Badminton, Football, or Cricket, we believe everyone should 
              have access to professional-grade facilities with just a few clicks.
            </p>
            <div className="space-y-4">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-2 bg-blue-50 rounded-lg">{f.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{f.title}</h4>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="aspect-video bg-gray-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
              <img 
                src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=1000" 
                alt="Sports Facility"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
          <h3 className="text-3xl md:text-4xl font-black mb-6 relative">Ready to start your next match?</h3>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto relative">
            Join thousands of players who book their sessions through us every day. 
            Experience the smoothest sports booking workflow ever created.
          </p>
          <button 
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black transition-all flex items-center gap-2 mx-auto active:scale-95 shadow-xl shadow-blue-600/20"
          >
            Book A Court Now <FiArrowRight />
          </button>
        </div>

      </div>

      
    </div>
  );
}