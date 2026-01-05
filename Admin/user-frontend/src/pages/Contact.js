import React, { useState, useEffect } from "react";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiMessageSquare, 
  FiActivity,
  FiCheckCircle,
  FiZap,
  FiHelpCircle
} from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Booking Issue", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('support'); // support, partnership, general

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white selection:bg-blue-500/30">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        
        {/* TOP HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-4 tracking-widest">
              <FiZap size={14} className="animate-pulse" /> 24/7 CONCIERGE
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic">
              CONTACT <span className="text-blue-500 uppercase">BookingHub</span>
            </h1>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              Experience zero-latency support. Our high-performance team is 
              standing by to resolve your technical hurdles.
            </p>
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-4xl font-black text-white/5 uppercase">Support</p>
            <p className="text-4xl font-black text-white/5 uppercase">Partners</p>
            <p className="text-4xl font-black text-white/5 uppercase">Inquiry</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: STATUS & QUICK ACTIONS (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* LIVE SYSTEM STATUS */}
            <div className="bg-[#14171C] border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">System Status</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                        <span className="text-green-500 text-[10px] font-black uppercase">Operational</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 italic">Booking Engine</span>
                        <span className="font-bold">99.9%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 italic">Payment Gateway</span>
                        <span className="font-bold text-blue-500">Fast</span>
                    </div>
                </div>
            </div>

            {/* CONTACT CARDS */}
            <div className="group bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 transition-transform hover:-rotate-2 cursor-pointer relative overflow-hidden">
                <FiMessageSquare size={100} className="absolute -bottom-4 -right-4 text-white/10 rotate-12" />
                <h4 className="text-2xl font-black mb-1 italic">Live Chat</h4>
                <p className="text-blue-100 text-sm mb-6 font-medium">Chat with our elite support agents.</p>
                <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider">Start Session</button>
            </div>

            <div className="bg-[#14171C] border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500">
                        <FiMail size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Email Us</p>
                        <p className="text-lg font-bold">help@bookinghub.com</p>
                    </div>
                </div>
            </div>

            <div className="bg-[#14171C] border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500">
                        <FiPhone size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Hotline</p>
                        <p className="text-lg font-bold">+91 1800-BOOK-HUB</p>
                    </div>
                </div>
            </div>
          </div>

          {/* RIGHT: ADVANCED FORM (8 COLS) */}
          <div className="lg:col-span-8">
            <div className="bg-[#14171C] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
              {submitted ? (
                <div className="py-20 text-center animate-in fade-in zoom-in">
                  <div className="w-24 h-24 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
                    <FiCheckCircle size={48} />
                  </div>
                  <h2 className="text-4xl font-black mb-4 uppercase italic">Transmission Received</h2>
                  <p className="text-gray-400 mb-10 max-w-sm mx-auto">We've locked your ticket into our queue. An agent will respond shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="text-blue-500 font-black uppercase tracking-widest text-xs hover:underline">New Transmission</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 block ml-1 transition-colors group-focus-within:text-blue-500">Client Identity</label>
                      <input 
                        required
                        className="w-full bg-white/5 border-b-2 border-white/10 focus:border-blue-500 p-4 outline-none transition-all text-white font-bold text-lg"
                        placeholder="NAME"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 block ml-1 transition-colors group-focus-within:text-blue-500">Digital Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-white/5 border-b-2 border-white/10 focus:border-blue-500 p-4 outline-none transition-all text-white font-bold text-lg"
                        placeholder="EMAIL"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 block ml-1 transition-colors group-focus-within:text-blue-500">Category</label>
                    <select 
                      className="w-full bg-white/5 border-b-2 border-white/10 focus:border-blue-500 p-4 outline-none transition-all text-white font-bold uppercase cursor-pointer"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option className="bg-[#14171C]">Booking Assistance</option>
                      <option className="bg-[#14171C]">Payment Security</option>
                      <option className="bg-[#14171C]">Venue Partnership</option>
                      <option className="bg-[#14171C]">Press Inquiry</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 block ml-1 transition-colors group-focus-within:text-blue-500">Detailed Brief</label>
                    <textarea 
                      required
                      rows="4"
                      className="w-full bg-white/5 border-b-2 border-white/10 focus:border-blue-500 p-4 outline-none transition-all text-white font-bold text-lg resize-none"
                      placeholder="DESCRIBE YOUR REQUEST..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="group relative w-full h-16 bg-blue-600 overflow-hidden rounded-2xl transition-all hover:bg-blue-500 active:scale-95"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-4 text-white font-black uppercase tracking-widest">
                      {isSubmitting ? "ENCRYPTING..." : <>Deploy Message <FiSend /></>}
                    </div>
                    {/* BUTTON GLOW EFFECT */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

     
      </div>
    </div>
  );
}