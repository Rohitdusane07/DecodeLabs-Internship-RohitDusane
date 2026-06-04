import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Terminal, ArrowRight } from 'lucide-react';

const RESPONSE_RULES = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'hola'],
    reply: "System Connection Established. Hello, future Engineer! Welcome to the AI Foundations Lab. I am your neural assistant. Ready to build some rule-based intelligence today?"
  },
  {
    keywords: ['python', 'code', 'programming', 'language'],
    reply: "Python is the bedrock of AI. In our modules, you'll master Python syntax, loops, and conditional structures to code chatbots, decision networks, and data pipelines from scratch."
  },
  {
    keywords: ['project', 'projects', 'build', 'portfolio'],
    reply: "You'll build 6 production-grade projects: 1) A Rule-Based Chatbot, 2) NLP Spam Classifier, 3) Decision Tree Classifier, 4) Sentiment Analysis API, 5) Deep Learning Image Classifier, and 6) a Custom Generative AI Agent."
  },
  {
    keywords: ['roadmap', 'roadmap', 'timeline', 'steps', 'learn'],
    reply: "Our curriculum maps out your journey in 6 steps: Rule-Based Logic -> NLP Fundamentals -> Machine Learning -> Deep Learning -> Generative AI -> Full-Stack AI Engineer. Type 'roadmap' to see our timeline below!"
  },
  {
    keywords: ['logic', 'if-else', 'decision trees', 'flow'],
    reply: "AI is rooted in logic. Before complex deep networks, systems were built with expert rules. Mastering nested conditions, control flows, and state management helps you think like an AI architect."
  },
  {
    keywords: ['help', 'what can you do', 'commands', 'info'],
    reply: "Ask me about 'projects', 'roadmap', 'python', 'logic', or click the quick-tap command buttons on the left panel!"
  }
];

const DEFAULT_REPLY = "Data processed. Predefined match confidence: < 40%. However, my logical gates recommend you explore our curriculum. Ask about 'projects' or 'roadmap' to see what you will build.";

export default function ChatbotDemo() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Initializing logic gates... Core online. Ask me anything about our platform, learning roadmap, or projects!", timestamp: '14:02' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsgId = Date.now();
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: 'user', text: text, timestamp: timeString }
    ]);
    
    if (!textToSend) setInputText('');

    // Trigger typing state
    setIsTyping(true);

    // Formulate rule-based response after delay
    setTimeout(() => {
      const cleanedInput = text.toLowerCase().trim();
      let match = RESPONSE_RULES.find(rule => 
        rule.keywords.some(keyword => cleanedInput.includes(keyword))
      );

      const replyText = match ? match.reply : DEFAULT_REPLY;
      const botMsgId = Date.now() + 1;

      setMessages((prev) => [
        ...prev,
        { id: botMsgId, sender: 'bot', text: replyText, timestamp: timeString }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const quickPrompts = [
    { text: "Test Greetings", prompt: "Hello!" },
    { text: "Ask about Projects", prompt: "What projects will I build?" },
    { text: "Explore Roadmap", prompt: "Show me the learning roadmap" },
    { text: "Explain AI Logic", prompt: "Why start with rule-based logic?" }
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 glass-panel rounded-2xl p-6 border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Visual background accents inside card */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Left panel: Quick Actions */}
      <div className="lg:col-span-1 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-6 lg:pb-0 lg:pr-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
            <Terminal size={18} className="animate-pulse" />
            <span className="tracking-wider uppercase text-xs font-mono">Control Panel</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-1 font-sans">Query Console</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Test the platform's rule-based NLP response model. Tap any predefined query below to inject it into the chatbot.
          </p>

          <div className="space-y-2">
            {quickPrompts.map((btn, idx) => (
              <button
                key={idx}
                onClick={() => !isTyping && handleSendMessage(btn.prompt)}
                disabled={isTyping}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800/80 hover:border-cyan-500/30 text-left text-xs text-slate-300 hover:text-cyan-300 transition-all font-mono group"
              >
                <span>{btn.text}</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/50 hidden lg:block">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            <span>Rule Engine V1.0.0 Online</span>
          </div>
        </div>
      </div>

      {/* Right panel: Chat UI */}
      <div className="lg:col-span-3 flex flex-col h-[400px]">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-cyan-950 flex items-center justify-center border border-cyan-500/30 text-cyan-400">
              <Bot size={16} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                NeuralGate-1
                <Sparkles size={12} className="text-yellow-400" />
              </div>
              <div className="text-[10px] text-green-400 font-mono">Awaiting Input...</div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-400 font-mono border border-slate-800">
            Rules Mode
          </span>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 font-sans text-sm scrollbar">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isBot ? '' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-mono border
                  ${isBot 
                    ? 'bg-slate-900 border-slate-800 text-cyan-400' 
                    : 'bg-indigo-950 border-indigo-500/30 text-purple-300'
                  }`}
                >
                  {isBot ? <Bot size={13} /> : <User size={13} />}
                </div>

                {/* Content Bubble */}
                <div className={`relative rounded-xl p-3.5 leading-relaxed text-slate-200 shadow-md
                  ${isBot 
                    ? 'bg-slate-900/80 border border-slate-800 text-left' 
                    : 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-purple-500/20 text-left'
                  }`}
                >
                  <p className="text-[13px]">{msg.text}</p>
                  <span className="absolute bottom-1 right-2 text-[9px] text-slate-500 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-slate-900 border border-slate-800 text-cyan-400">
                <Bot size={13} />
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message (e.g. 'tell me about projects')..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800/80 focus:border-cyan-500/50 focus:outline-none text-slate-100 placeholder-slate-500 text-xs focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isTyping || !inputText.trim()}
            className="px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white flex items-center justify-center border border-cyan-500/20 hover:border-cyan-400/40 shadow-lg shadow-cyan-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
