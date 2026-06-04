import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Brain, Cpu, MessageSquare, Code, 
  Layout, GraduationCap, Users, FolderCode, Trophy, Star, 
  Send, BookOpen, Layers, CheckCircle2, ChevronRight, Menu, X 
} from 'lucide-react';

import ThreeBackground from './components/ThreeBackground';
import Hologram3D from './components/Hologram3D';
import ChatbotDemo from './components/ChatbotDemo';
import RoadmapTimeline from './components/RoadmapTimeline';

// ----------------------------------------------------
// Stat Counter Sub-component with Intersection Observer
// ----------------------------------------------------
function Counter({ target, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    let startTime = null;
    const end = parseInt(target.replace(/[^0-9]/g, ''));

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animationFrame = requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

// ----------------------------------------------------
// Main App Landing Page
// ----------------------------------------------------
export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Track Mouse for Spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Demo Console", href: "#demo" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Connect", href: "#contact" }
  ];

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-purple-500/30 overflow-x-hidden font-sans">
      
      {/* 3D Particle Background */}
      <ThreeBackground />

      {/* Mouse Follow Glow Aura */}
      <div 
        className="glow-spotlight hidden md:block" 
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px` 
        }} 
      />

      {/* ----------------------------------------------------
          NAVBAR
          ---------------------------------------------------- */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel-heavy border-b border-slate-900/60 py-4 px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center border border-blue-400/30 group-hover:scale-105 transition-transform duration-300">
            <Brain size={18} className="text-white animate-pulse" />
          </div>
          <span className="text-lg font-bold font-sans tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-blue-200 to-cyan-300">
            AI Foundations Lab
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              className="text-xs font-medium text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-wider font-mono"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a 
            href="#contact" 
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 hover:from-blue-600/50 hover:to-purple-600/50 border border-blue-500/30 hover:border-blue-400/50 text-xs font-semibold tracking-wider font-mono text-cyan-300 transition-all shadow-md shadow-blue-950/20"
          >
            Start Learning
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-40 glass-panel-heavy p-6 border-b border-slate-800 lg:hidden flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-300 hover:text-cyan-400 font-mono tracking-wide py-2 border-b border-slate-900/50"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-blue-600 text-sm font-semibold tracking-wider font-mono"
            >
              Start Learning
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------
          HERO SECTION
          ---------------------------------------------------- */}
      <section className="relative min-h-screen pt-24 flex items-center justify-center px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Lights */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative z-10 py-12">
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-cyan-400 tracking-wider w-fit uppercase">
              <Sparkles size={12} className="animate-spin" />
              <span>Next-Gen Training Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-sans">
              Master Artificial Intelligence Through <span className="gradient-text text-glow-blue">Real Projects</span>
            </h1>

            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-lg font-sans">
              Build Rule-Based AI Systems, Learn Logic Design, and Start Your Journey as an AI Engineer. Create robust portfolios and understand intelligent code logic.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#demo"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs tracking-wider uppercase font-mono border border-cyan-400/20 hover:border-cyan-400/40 text-center transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] shadow-lg shadow-blue-950/40"
              >
                Start Learning
              </a>
              <a 
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-xs tracking-wider uppercase font-mono text-center transition-all"
              >
                View Projects
              </a>
            </div>
          </motion.div>

          {/* Hero 3D Hologram */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center relative"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px] animate-pulse-slow" />
            </div>
            <Hologram3D />
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------
          FEATURES SECTION
          ---------------------------------------------------- */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold tracking-wider text-purple-400 uppercase">Core Framework</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Structured AI Logic Design</h2>
          <p className="text-xs md:text-sm text-slate-400">
            Skip the math-heavy abstraction and build tangible rule systems, logic trees, and neural networks block-by-block.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 border-slate-800 flex flex-col text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 transition-transform duration-300">
              <MessageSquare size={22} />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-cyan-300 transition-colors">Rule-Based AI Chatbot</h3>
            <ul className="space-y-3 text-xs text-slate-400 mb-6 flex-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>Regex & conditional Greetings Detection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>Static & dynamic Smart Response mapping</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>Continuous input-response Conversation Loops</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card rounded-2xl p-8 border-slate-800 flex flex-col text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-105 transition-transform duration-300">
              <Code size={22} />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-purple-300 transition-colors">AI Logic Building</h3>
            <ul className="space-y-3 text-xs text-slate-400 mb-6 flex-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-purple-400 mt-0.5 shrink-0" />
                <span>Hierarchical Decision Tree setups</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-purple-400 mt-0.5 shrink-0" />
                <span>Nested structures and If-Else Architecture</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-purple-400 mt-0.5 shrink-0" />
                <span>Control Flow Design & logic node routing</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl p-8 border-slate-800 flex flex-col text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap size={22} />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-cyan-300 transition-colors">Hands-On Learning</h3>
            <ul className="space-y-3 text-xs text-slate-400 mb-6 flex-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>Implementation of Real Projects</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>Interactive syntax Exercises</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                <span>High-grade engineering Portfolio Building</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------
          INTERACTIVE CHATBOT DEMO
          ---------------------------------------------------- */}
      <section id="demo" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 flex flex-col text-left space-y-6">
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">Live Simulation</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Interactive Chatbot Demo</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Test out the intelligence of a rule-based virtual system. Write inquiries about the platform, curriculum stages, or building files to see conditional matching logic trigger live.
            </p>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-900">
                <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                <span>Typing indicator triggers to simulate latency</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-900">
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <span>Rules mapping searches for core keyword vectors</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 w-full">
            <ChatbotDemo />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          CURRICULUM ROADMAP
          ---------------------------------------------------- */}
      <section id="roadmap" className="py-24 px-6 md:px-12 bg-slate-950/30 border-y border-slate-900/40 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold tracking-wider text-purple-400 uppercase">Syllabus Path</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">AI Engineering Roadmap</h2>
            <p className="text-xs md:text-sm text-slate-400">
              Trace your learning journey from standard programmatic rules to building and orchestrating neural pipelines.
            </p>
          </div>

          <RoadmapTimeline />
        </div>
      </section>

      {/* ----------------------------------------------------
          SKILLS SHOWCASE
          ---------------------------------------------------- */}
      <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">Acquired Tech</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Core Competence Matrix</h2>
          <p className="text-xs md:text-sm text-slate-400">
            Skills designed to construct robust architectures, parse natural patterns, and coordinate logic threads.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "Python", val: "Advanced", color: "border-blue-500/20 text-blue-400" },
            { name: "Artificial Intelligence", val: "Neural Nets", color: "border-purple-500/20 text-purple-400" },
            { name: "Decision Logic", val: "Trees & Gates", color: "border-cyan-500/20 text-cyan-400" },
            { name: "Problem Solving", val: "Algorithms", color: "border-teal-500/20 text-teal-400" },
            { name: "Machine Learning", val: "Regressions", color: "border-pink-500/20 text-pink-400" },
            { name: "NLP", val: "Tokenization", color: "border-amber-500/20 text-amber-400" }
          ].map((skill, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`glass-card rounded-xl p-5 border text-center relative group overflow-hidden ${skill.color}`}
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">{skill.val}</div>
              <h4 className="text-sm font-bold text-slate-100 font-sans tracking-wide">{skill.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------
          STATISTICS COUNTERS
          ---------------------------------------------------- */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-blue-950/20 via-purple-950/20 to-cyan-950/20 border-y border-slate-900/60 relative overflow-hidden">
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center">
          {[
            { label: "Students Trained", num: "1000", suffix: "+" },
            { label: "Practical Projects", num: "50", suffix: "+" },
            { label: "AI Modules Ready", num: "20", suffix: "+" },
            { label: "Completion Rate", num: "95", suffix: "%" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl md:text-5xl font-black font-mono tracking-tight text-white bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                <Counter target={stat.num} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-wide font-sans">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------
          SHOWCASE SECTION
          ---------------------------------------------------- */}
      <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono font-bold tracking-wider text-purple-400 uppercase">Product Library</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Hands-On Showcase</h2>
          <p className="text-xs md:text-sm text-slate-400">
            Preview the production-grade projects you will assemble, optimize, and include in your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { 
              title: "Rule-Based Chatbot", 
              tag: "Stage 1", 
              desc: "Deploy regex state flow controllers for chat automation.", 
              color: "hover:border-blue-500/40" 
            },
            { 
              title: "Smart Assistant", 
              tag: "Stage 2", 
              desc: "Inject classification routing keys to process calendar tags.", 
              color: "hover:border-purple-500/40" 
            },
            { 
              title: "AI Quiz Generator", 
              tag: "Stage 3", 
              desc: "Automate custom flashcard arrays based on text uploads.", 
              color: "hover:border-cyan-500/40" 
            },
            { 
              title: "Learning Companion", 
              tag: "Stage 4", 
              desc: "Analyze learning gaps and trace study schedules logically.", 
              color: "hover:border-teal-500/40" 
            },
            { 
              title: "Virtual Tutor", 
              tag: "Stage 5", 
              desc: "Deploy an LLM powered RAG system for educational databases.", 
              color: "hover:border-amber-500/40" 
            }
          ].map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`glass-card rounded-xl p-5 border border-slate-800 flex flex-col justify-between group ${project.color}`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] font-mono text-slate-400 mb-4 uppercase tracking-wider">
                  {project.tag}
                </span>
                <h4 className="text-sm font-bold text-slate-100 font-sans mb-2 group-hover:text-glow-blue transition-all">
                  {project.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {project.desc}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-[10px] text-cyan-400 font-semibold font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>View Details</span>
                <ChevronRight size={10} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------
          TESTIMONIALS SECTION
          ---------------------------------------------------- */}
      <section id="testimonials" className="py-24 px-6 md:px-12 bg-slate-950/20 border-t border-slate-900/60 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">Success Logs</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Alumni Feedback</h2>
            <p className="text-xs md:text-sm text-slate-400">
              Read how developers transformed their logical capabilities and built careers in AI engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The rule-based modules clarified so much. I finally understood how decision gates parse text arrays before throwing them into heavy deep learning matrices.",
                name: "Valerie Chen",
                role: "Platform Engineer @ NeoTech",
                rating: 5
              },
              {
                quote: "Building the custom RAG chatbot companion was the star project of my resume. It helped me secure a machine learning deployment internship within weeks.",
                name: "Marcus Vance",
                role: "AI Dev @ CloudScale",
                rating: 5
              },
              {
                quote: "Highly structured. The transition from regular syntax to token layers and deep nodes made total logical sense, unlike other math-dense tutorials I've tried.",
                name: "Dimitri Volkov",
                role: "Software Architect @ SyncCode",
                rating: 5
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 border-slate-800 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(card.rating)].map((_, sIdx) => (
                      <Star key={sIdx} size={13} className="fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
                    "{card.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-900/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs text-cyan-400">
                    {card.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-100">{card.name}</h5>
                    <p className="text-[10px] text-slate-500 font-mono">{card.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          CONTACT SECTION
          ---------------------------------------------------- */}
      <section id="contact" className="py-24 px-6 md:px-12 max-w-5xl mx-auto scroll-mt-20">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border-slate-800/80 shadow-2xl relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col text-left space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
                <Send size={18} />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 font-sans">Initialize Journey</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect with our lab advisors. Register for custom enrollment options, corporate cohort training, or syllabus details.
              </p>
              
              <div className="pt-4 space-y-2 font-mono text-[11px] text-slate-500">
                <div>HQ Coordinate: Sector 9, Digital Sphere</div>
                <div>Connection: link@aifoundations.lab</div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 w-full">
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-2xl p-6 border-green-500/20 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-green-950/40 border border-green-500/30 text-green-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-100 font-sans">Secure Transmission Complete</h4>
                  <p className="text-xs text-slate-400">
                    Your logic queries have bypassed our sorting filters and reached our core routers. We will reply shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase mb-1.5 tracking-wider">Ident Name</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e)=>setContactForm({...contactForm, name: e.target.value})}
                        placeholder="e.g. Valerie" 
                        className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 focus:border-purple-500/60 focus:outline-none text-slate-100 placeholder-slate-600 text-xs focus:ring-1 focus:ring-purple-500/20 transition-all font-mono"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase mb-1.5 tracking-wider">Secure Email</label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e)=>setContactForm({...contactForm, email: e.target.value})}
                        placeholder="e.g. val@sky.net" 
                        className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 focus:border-purple-500/60 focus:outline-none text-slate-100 placeholder-slate-600 text-xs focus:ring-1 focus:ring-purple-500/20 transition-all font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-mono text-slate-400 uppercase mb-1.5 tracking-wider">Transmission Payload</label>
                    <textarea 
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e)=>setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Type your query or learning goals..." 
                      className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 focus:border-purple-500/60 focus:outline-none text-slate-100 placeholder-slate-600 text-xs focus:ring-1 focus:ring-purple-500/20 transition-all font-mono resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wider uppercase font-mono border border-purple-400/20 hover:border-purple-400/40 transition-all text-center"
                  >
                    Submit Query
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          FOOTER
          ---------------------------------------------------- */}
      <footer className="py-12 border-t border-slate-900 px-6 md:px-12 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-6 relative z-10 bg-darkBg/60">
        <div>© 2026 AI Foundations Lab. Built for next-gen AI education.</div>
        <div>Developed by Rohit Vijay Dusane</div>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-cyan-400">Features</a>
          <a href="#demo" className="hover:text-cyan-400">Demo</a>
          <a href="#roadmap" className="hover:text-cyan-400">Roadmap</a>
        </div>
      </footer>

    </div>
  );
}
