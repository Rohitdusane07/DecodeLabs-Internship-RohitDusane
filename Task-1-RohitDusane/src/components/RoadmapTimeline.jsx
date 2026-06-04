import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquareCode, FileText, Cpu, Brain, Network, Award } from 'lucide-react';

const ROADMAP_STEPS = [
  {
    step: "Step 1",
    title: "Rule-Based Chatbot",
    icon: MessageSquareCode,
    color: "from-blue-500 to-indigo-500",
    desc: "Master coding core concepts, control flow logic, regular expressions, and state management. You'll build your first rule-based expert conversationalist.",
    techs: ["Python", "Control Flow", "RegEx"]
  },
  {
    step: "Step 2",
    title: "NLP Fundamentals",
    icon: FileText,
    color: "from-cyan-500 to-blue-500",
    desc: "Step into natural language processing. Learn text preprocessing, tokenization, stemming, TF-IDF, and simple vector matching for sentiment classification.",
    techs: ["NLTK", "TF-IDF", "Tokenization"]
  },
  {
    step: "Step 3",
    title: "Machine Learning",
    icon: Cpu,
    color: "from-teal-500 to-emerald-500",
    desc: "Learn supervised and unsupervised learning. Construct decision trees, train classification algorithms, and evaluate models using real-world data.",
    techs: ["Scikit-Learn", "Pandas", "Regression"]
  },
  {
    step: "Step 4",
    title: "Deep Learning",
    icon: Network,
    color: "from-purple-500 to-pink-500",
    desc: "Dive deep into artificial neural networks. Learn weights, biases, backpropagation, and build convolutional networks (CNNs) for image detection.",
    techs: ["PyTorch", "ANNs", "Computer Vision"]
  },
  {
    step: "Step 5",
    title: "Generative AI",
    icon: Brain,
    color: "from-fuchsia-500 to-purple-500",
    desc: "Harness LLM platforms. Construct prompt sequences, learn Retrieval Augmented Generation (RAG), write chains, and manage vector databases.",
    techs: ["LangChain", "VectorDB", "Transformers"]
  },
  {
    step: "Step 6",
    title: "AI Engineer",
    icon: Award,
    color: "from-amber-500 to-orange-500",
    desc: "Combine deep intelligence with responsive app logic. Create microservice APIs, containerize models, deploy onto clouds, and build product prototypes.",
    techs: ["FastAPI", "Docker", "Model Deployment"]
  }
];

export default function RoadmapTimeline() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-12 px-4">
      {/* Central Glowing Line (Desktop only) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 opacity-20 transform -translate-x-1/2 hidden md:block" />
      
      {/* Glowing line overlay */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 opacity-40 blur-[2px] transform -translate-x-1/2 hidden md:block" />

      <div className="space-y-12 md:space-y-24 relative">
        {ROADMAP_STEPS.map((item, idx) => {
          const Icon = item.icon;
          const isEven = idx % 2 === 0;

          return (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-center justify-between w-full ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content Panel */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full md:w-[45%] glass-card rounded-2xl p-6 border-slate-800 relative group overflow-hidden"
              >
                {/* Gradient background hover shimmer */}
                <div className={`absolute -inset-px bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-sm rounded-2xl`} />

                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r ${item.color} text-slate-900 mb-3 uppercase tracking-wider`}>
                  {item.step}
                </span>
                
                <h3 className="text-xl font-bold text-slate-100 mb-2 font-sans group-hover:text-glow-blue transition-all">
                  {item.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.desc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {item.techs.map((t, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Icon Center Node */}
              <div className="relative flex items-center justify-center my-6 md:my-0 z-10">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className={`w-12 h-12 rounded-full bg-slate-950 border-2 border-slate-800 group-hover:border-cyan-500 flex items-center justify-center text-slate-300 shadow-xl relative
                    before:content-[''] before:absolute before:-inset-2 before:rounded-full before:bg-gradient-to-r before:${item.color} before:opacity-10 before:-z-10
                  `}
                >
                  <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-r ${item.color} opacity-20 blur-[1px]`} />
                  <Icon size={20} className="text-slate-100" />
                </motion.div>
              </div>

              {/* Spacer matching layout */}
              <div className="hidden md:block w-[45%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
