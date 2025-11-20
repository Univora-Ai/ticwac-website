'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Phone, MapPin, Mail, ChevronRight, 
  ChevronLeft, GraduationCap, BookOpen, User, 
  Calendar, Star, MessageSquare, Send, XCircle,
  Lightbulb, ShieldCheck, HeartHandshake, Facebook, Instagram, Youtube
} from 'lucide-react';

// --- ASSETS & CONSTANTS ---
const BRAND_BLUE = "#1a73e8"; 
const ACCENT_YELLOW = "#FFD700"; // Brighter Gold

// Enhanced Checkered Pattern (Subtle Blue)
const subtleCheckeredStyle = {
  backgroundColor: "#f0f7ff",
  backgroundImage: `
    linear-gradient(45deg, rgba(26, 115, 232, 0.03) 25%, transparent 25%, transparent 75%, rgba(26, 115, 232, 0.03) 75%, rgba(26, 115, 232, 0.03)),
    linear-gradient(45deg, rgba(26, 115, 232, 0.03) 25%, transparent 25%, transparent 75%, rgba(26, 115, 232, 0.03) 75%, rgba(26, 115, 232, 0.03))
  `,
  backgroundSize: "30px 30px",
  backgroundPosition: "0 0, 15px 15px"
};

const IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Collaborative Learning" },
  { id: 2, src: "https://images.unsplash.com/photo-1427504743055-e9297298019b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Modern Campus Facilities" },
  { id: 3, src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Engaged Students" },
  { id: 4, src: "https://images.unsplash.com/photo-1577896334696-9c1d28871295?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Focused Academic Pursuit" },
  { id: 5, src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Library & Resources" },
  { id: 6, src: "https://images.unsplash.com/photo-1541339907198-e0875663f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", title: "Outdoor Activities" },
];

// --- ANIMATIONS ---
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15 } }
};

const glowAnimation = {
  boxShadow: [
    "0 0 0px rgba(255, 215, 0, 0)",
    "0 0 20px rgba(255, 215, 0, 0.6)",
    "0 0 0px rgba(255, 215, 0, 0)"
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// --- COMPONENTS ---

// 1. Navigation (Fixed Colors)
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Academics", href: "#academics" },
    { name: "Admissions", href: "#admissions" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg py-3 border-b border-white/10' 
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-900 shadow-glow"
          >
             <GraduationCap size={28} strokeWidth={2.5} />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">TICWAC</span>
            <span className="text-[11px] text-yellow-400 font-bold tracking-[0.2em] mt-0.5 uppercase">Education Centre</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center font-medium">
          {navLinks.map((link) => (
            <motion.a 
              key={link.name} 
              whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgb(255,255,255)" }}
              href={link.href} 
              className={`relative text-white transition-colors ${
                link.name === 'Contact' 
                  ? 'bg-yellow-500 text-blue-900 px-6 py-2.5 rounded-full font-bold shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:bg-yellow-400 hover:text-blue-950' 
                  : 'opacity-90 hover:opacity-100'
              }`}
            >
              {link.name}
              {!link.name.includes('Contact') && (
                <span className="absolute left-0 bottom-0 h-[2px] bg-yellow-400 w-0 transition-all duration-300 group-hover:w-full"></span>
              )}
            </motion.a>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-blue-900 border-t border-white/10 shadow-xl"
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-white font-medium hover:text-yellow-400 transition block py-2 border-b border-white/10 last:border-b-0">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// 2. TiciBot Component
const TiciBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am TiciBot 🤖. Ask me about admissions, fees, or our location!' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let botResponse = "Please contact our administration at 024 340 3507 for detailed information.";
      if (inputValue.toLowerCase().includes("fee")) botResponse = "Fee structures vary by grade. Please visit our office in Tuba or call 024 340 3507.";
      if (inputValue.toLowerCase().includes("location")) botResponse = "We are located at Tuba, near Baraa Mosque, Accra.";
      if (inputValue.toLowerCase().includes("admission")) botResponse = "Admissions are OPEN for Creche to J.H.S 3! Apply now via the website.";
      
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[450px]"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white text-blue-700 p-2 rounded-full animate-bounce">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base">TiciBot Assistant</h3>
                  <p className="text-[10px] text-green-300 font-semibold">● Online Now</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && <div className="text-xs text-gray-400 ml-4">TiciBot is typing...</div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t flex gap-2 items-center">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..." 
                className="flex-1 text-sm border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        animate={glowAnimation}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center relative z-50"
      >
        {isOpen ? <X size={30} /> : <MessageSquare size={30} />}
      </motion.button>
    </div>
  );
};

// 3. Lightbox Gallery
const LightboxGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(IMAGES[index]);
  };

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {IMAGES.map((img, idx) => (
        <motion.div 
          key={img.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          onClick={() => openLightbox(idx)}
          className="aspect-video bg-gray-200 rounded-xl overflow-hidden cursor-pointer relative group shadow-lg border-2 border-transparent hover:border-yellow-400"
        >
          <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <h3 className="text-white text-lg font-bold">{img.title}</h3>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <button className="absolute top-6 right-6 text-white hover:text-yellow-400 transition"><XCircle size={40} /></button>
            <img src={selectedImage.src} alt={selectedImage.title} className="max-h-[85vh] max-w-full object-contain rounded shadow-2xl" />
            <div className="absolute bottom-8 text-white text-xl font-medium">{selectedImage.title}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 4. Main App Component
export default function App() {
  return (
    <div className="font-['Poppins', sans-serif] text-gray-800 bg-white antialiased overflow-x-hidden">
      <Navbar />
      
      {/* HERO SECTION - Gradient & Glowing Animations */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-900 via-blue-800/90 to-blue-900/40"></div>
        
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="School Building" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="container mx-auto px-6 relative z-20 grid lg:grid-cols-2 gap-16 items-center py-20">
          <motion.div 
            initial="initial" animate="animate" variants={staggerContainer}
            className="text-white"
          >
            <motion.div variants={fadeInUp} className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/30 backdrop-blur-md text-sm font-bold tracking-widest mb-6 text-yellow-300 shadow-lg">
              WELCOME TO TICWAC
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
              Empowering Minds, <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Building Futures</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-10 max-w-xl font-light leading-relaxed">
              Experience holistic education rooted in "Knowledge & Humility". 
              From <strong className="text-white border-b-2 border-yellow-400">Creche to J.H.S 3</strong>.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5">
              <motion.a 
                href="#admissions"
                animate={{ boxShadow: ["0 0 0px #FFD700", "0 0 20px #FFD700", "0 0 0px #FFD700"] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.05 }}
                className="bg-yellow-500 text-blue-900 px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-transform"
              >
                Apply Now <ChevronRight size={20} strokeWidth={3} />
              </motion.a>
              <motion.a 
                href="#about" 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                className="bg-white/10 text-white border-2 border-white/30 px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 backdrop-blur-sm transition-all"
              >
                Explore School
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Floating Stats Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block"
          >
             <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border-b-8 border-yellow-400 relative max-w-sm ml-auto"
             >
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                        <Star size={32} fill="currentColor" />
                    </div>
                    <div>
                        <h3 className="text-5xl font-black text-blue-900">100%</h3>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Pass Rate</p>
                    </div>
                </div>
                <p className="text-gray-600 font-medium border-t border-gray-100 pt-4 mt-2">
                   Celebrating our students' perfect success in the 2025 BECE exams.
                </p>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION - Subtle Checkered BG */}
      <section id="about" className="py-28 px-6 relative" style={subtleCheckeredStyle}>
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-full h-full border-4 border-yellow-400 rounded-3xl hidden md:block"></div>
              <img 
                src="https://images.unsplash.com/photo-1577896334696-9c1d28871295?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="About TICWAC"
                className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
              <div className="absolute bottom-10 -right-10 bg-blue-900 text-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                  <p className="font-bold text-lg">"Knowledge without humility is vanity."</p>
              </div>
            </motion.div>
            
            <div>
              <h4 className="text-blue-600 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-10 h-1 bg-blue-600"></span> Who We Are
              </h4>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                More Than Just A School, <br/> We Are A <span className="text-blue-600">Family.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Located in the serene environment of Tuba, TICWAC provides a sanctuary for learning. We blend rigorous academics with strong moral values, ensuring your child grows into a responsible, successful leader.
              </p>
              
              <div className="grid gap-6">
                {[
                  { icon: Lightbulb, title: "Interactive Learning", desc: "Smart classrooms & modern tools." },
                  { icon: ShieldCheck, title: "Moral Integrity", desc: "Strong Islamic & ethical foundation." },
                  { icon: HeartHandshake, title: "Dedicated Staff", desc: "Caring mentors for every child." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10, backgroundColor: "#fff" }}
                    className="flex items-center gap-5 p-4 rounded-xl transition-all border border-transparent hover:border-blue-100 hover:shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <item.icon size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-xl text-gray-900">{item.title}</h4>
                        <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMICS - Scroll Cards */}
      <section id="academics" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Academic Excellence</h2>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {['Creche & Nursery', 'Kindergarten', 'Primary School', 'Junior High (JHS)'].map((level, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="p-8 rounded-3xl bg-slate-50 hover:bg-blue-900 hover:text-white transition-all duration-300 group text-center shadow-lg border border-gray-100"
                >
                    <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-md flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                        <BookOpen size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{level}</h3>
                    <p className="text-gray-500 group-hover:text-blue-200 text-sm leading-relaxed">
                        Tailored curriculum designed to spark curiosity and build strong foundations.
                    </p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS CTA - Fixed Button Visibility */}
      <section id="admissions" className="py-24 bg-blue-900 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         {/* Glowing blobs */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-30"></div>
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-500 rounded-full filter blur-[100px] opacity-20"></div>

         <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h2 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="text-4xl md:text-6xl font-black text-white mb-8"
            >
              Admissions Open for 2025
            </motion.h2>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-12">
              Limited slots available for the upcoming academic year. Secure your child's future in an environment of excellence.
            </p>
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ["0 0 0px #fff", "0 0 20px #fff", "0 0 0px #fff"] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}
                className="bg-white text-blue-900 font-extrabold text-xl px-12 py-5 rounded-full shadow-2xl hover:bg-gray-100 transition-colors"
            >
                BEGIN APPLICATION
            </motion.button>
         </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
             <div>
                <h4 className="text-blue-600 font-bold uppercase tracking-widest mb-2">Campus Life</h4>
                <h2 className="text-4xl font-extrabold text-gray-900">Moments at TICWAC</h2>
             </div>
             <button className="text-blue-600 font-bold border-b-2 border-blue-600 hover:text-blue-800 transition pb-1">
                View All Photos
             </button>
          </div>
          <LightboxGallery />
        </div>
      </section>

      {/* CONTACT & MAP SECTION */}
      <section id="contact" className="py-24 relative bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Side */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
               <h3 className="text-3xl font-bold text-gray-900 mb-2">Send Us A Message</h3>
               <p className="text-gray-500 mb-8">We usually respond within 24 hours.</p>
               
               <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Parent's Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                            <input type="tel" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" placeholder="024..." />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Grade of Interest</label>
                        <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition">
                            <option>Creche / Nursery</option>
                            <option>Kindergarten</option>
                            <option>Primary</option>
                            <option>Junior High School</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                        <textarea className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition h-32" placeholder="How can we help you?"></textarea>
                    </div>
                    <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1">
                        Send Message
                    </button>
                </form>
            </div>

            {/* Map & Info Side */}
            <div className="space-y-8">
                <div className="bg-blue-900 text-white p-10 rounded-3xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/10 p-3 rounded-full"><Phone className="text-yellow-400"/></div>
                                <div>
                                    <p className="text-sm text-blue-200">Call Us</p>
                                    <p className="text-lg font-bold">024 340 3507 / 024 201 5379</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-white/10 p-3 rounded-full"><MapPin className="text-yellow-400"/></div>
                                <div>
                                    <p className="text-sm text-blue-200">Visit Us</p>
                                    <p className="text-lg font-bold">Tuba, near Baraa Mosque</p>
                                    <p className="text-blue-200">Accra, Ghana</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Decor */}
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-700 rounded-full opacity-50"></div>
                </div>

                {/* Google Map Embed */}
                <div className="w-full h-[300px] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight="0" 
                        marginWidth="0" 
                        src="https://maps.google.com/maps?q=TICWAC+Education+Centre+Tuba+Ghana&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        title="TICWAC Location"
                    ></iframe>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPANDED FOOTER */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
         <div className="container mx-auto px-6">
             <div className="grid md:grid-cols-4 gap-10 mb-12">
                 {/* Column 1: Brand */}
                 <div className="col-span-1 md:col-span-1">
                     <div className="flex items-center gap-2 text-white mb-4">
                        <GraduationCap size={28} className="text-yellow-400"/>
                        <span className="text-xl font-bold">TICWAC</span>
                     </div>
                     <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Moulding characters and sharpening minds. We are committed to raising the next generation of leaders with knowledge and humility.
                     </p>
                     <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"><Facebook size={18} /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition"><Instagram size={18} /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition"><Youtube size={18} /></a>
                     </div>
                 </div>

                 {/* Column 2: Quick Links */}
                 <div>
                     <h4 className="text-white font-bold mb-6">Quick Links</h4>
                     <ul className="space-y-3 text-sm">
                         <li><a href="#home" className="hover:text-yellow-400 transition">Home</a></li>
                         <li><a href="#about" className="hover:text-yellow-400 transition">About Us</a></li>
                         <li><a href="#academics" className="hover:text-yellow-400 transition">Academics</a></li>
                         <li><a href="#gallery" className="hover:text-yellow-400 transition">Gallery</a></li>
                     </ul>
                 </div>

                 {/* Column 3: Information */}
                 <div>
                     <h4 className="text-white font-bold mb-6">Information</h4>
                     <ul className="space-y-3 text-sm">
                         <li><a href="#admissions" className="hover:text-yellow-400 transition">Admissions Procedure</a></li>
                         <li><a href="#" className="hover:text-yellow-400 transition">Fee Structure</a></li>
                         <li><a href="#" className="hover:text-yellow-400 transition">Parent Portal</a></li>
                         <li><a href="#contact" className="hover:text-yellow-400 transition">Contact Administration</a></li>
                     </ul>
                 </div>

                 {/* Column 4: Visit Us */}
                 <div>
                     <h4 className="text-white font-bold mb-6">Visit Us</h4>
                     <p className="text-sm text-gray-400 mb-2">Tuba, near Baraa Mosque</p>
                     <p className="text-sm text-gray-400 mb-4">Accra, Ghana</p>
                     <p className="text-sm text-gray-400 mb-2"><strong className="text-white">Phone:</strong> 024 340 3507</p>
                     <p className="text-sm text-gray-400"><strong className="text-white">Email:</strong> info@ticwac.edu.gh</p>
                 </div>
             </div>

             <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                 <p>&copy; 2025 TICWAC Education Centre. All rights reserved.</p>
                 <div className="flex gap-6 mt-4 md:mt-0">
                     <a href="#" className="hover:text-white">Privacy Policy</a>
                     <a href="#" className="hover:text-white">Terms of Service</a>
                 </div>
             </div>
         </div>
      </footer>

      {/* Chatbot Widget */}
      <TiciBot />
    </div>
  );
}
