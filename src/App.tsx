/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Brain, 
  Smartphone, 
  Utensils, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Zap, 
  Calendar, 
  BarChart3, 
  Users,
  Compass,
  ArrowRight,
  ChevronRight,
  Heart,
  Moon,
  Wind,
  Layout,
  Dna,
  Lock,
  Globe,
  Sparkles,
  ZapOff,
  ShoppingBag
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } }
};

export default function App() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCapture, setShowCapture] = useState(false);
  const [captureEmail, setCaptureEmail] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasCaptured, setHasCaptured] = useState(false);
  
  // Admin Dashboard State
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoggedIntoAdmin, setIsLoggedIntoAdmin] = useState(false);
  const [collectedEmails, setCollectedEmails] = useState<{email: string, timestamp: string}[]>([]);
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  React.useEffect(() => {
    // Check if ?admin=true is in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminView(true);
    }
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdminLoading(true);
    try {
      const response = await fetch(`/api/admin/emails?secret=${adminPassword}`);
      if (response.ok) {
        const data = await response.json();
        setCollectedEmails(data);
        setIsLoggedIntoAdmin(true);
      } else {
        alert("Invalid Admin Password");
      }
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setIsAdminLoading(false);
    }
  };

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captureEmail.includes('@')) return;

    setIsCapturing(true);
    try {
      await fetch('/api/collect-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: captureEmail }),
      });
    } catch (err) {
      console.error("Email capture failed, but proceeding to checkout:", err);
    }
    
    setHasCaptured(true);
    setIsCapturing(false);
    
    // Using window.open for better compatibility with iframes and to open in new tab
    const checkoutUrl = 'https://selar.co/1e4542vk27';
    window.open(checkoutUrl, '_blank');
    
    setTimeout(() => {
      setShowCapture(false);
    }, 500);
  };

  const triggerCapture = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasCaptured) {
      window.open('https://selar.co/1e4542vk27', '_blank');
      return;
    }
    setShowCapture(true);
  };

  return (
    <div className="min-h-screen bg-gold-cream text-dark selection:bg-gold selection:text-white">
      {/* Quick Announcement */}
      <div className="bg-navy py-3.5 px-6 text-center border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        <p className="text-white text-[11px] uppercase tracking-[0.4em] font-black relative z-10">
          Limited Time Offer <span className="mx-6 text-gold/50">|</span> Get the Full Guide & App Today
        </p>
      </div>

      {/* Luxury Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-line px-8 md:px-20 py-8 flex items-center justify-between">
        <div className="flex items-center gap-20">
          <div className="font-serif text-4xl font-black italic tracking-tighter hover:scale-105 transition-transform cursor-pointer">
            Brain<span className="text-gold font-normal">Youth</span>
          </div>
          <div className="hidden lg:flex items-center gap-12 text-[12px] uppercase tracking-[0.3em] font-black text-dark/40">
            <a href="#foundation" className="hover:text-gold transition-all">How it Works</a>
            <a href="#protocol" className="hover:text-gold transition-all">The 6 Secrets</a>
            <a href="#digital" className="hover:text-gold transition-all">Inside the Box</a>
          </div>
        </div>
        <div className="flex items-center gap-10">
          <a 
            href="#pricing" 
            className="hidden sm:block text-[11px] uppercase tracking-[0.3em] font-black text-dark/30 hover:text-dark transition-colors"
          >
            Member Login
          </a>
          <button 
            onClick={triggerCapture}
            className="bg-navy text-white px-10 py-4 rounded-full text-[12px] uppercase tracking-[0.3em] font-black hover:bg-gold transition-all flex items-center gap-4 luxury-shadow group active:scale-95"
          >
            Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Catchy Hero Section */}
      <header className="relative pt-32 pb-48 px-8 md:px-20 max-w-[1500px] mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="mb-12 inline-flex items-center gap-4 px-5 py-2.5 bg-gold/10 border border-gold/30 rounded-full text-gold text-[12px] uppercase tracking-[0.4em] font-black">
              <Zap className="w-5 h-5" /> Keep Your Mind Sharp as You Age
            </div>
            <h1 className="text-8xl md:text-[11rem] font-black mb-12 tracking-tighter leading-[0.88] select-none">
              Stay <span className="font-serif italic font-medium text-gold">Sharp.</span> <br />Stay <span className="font-serif italic font-medium">Young.</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-text font-serif italic mb-16 max-w-2xl leading-relaxed opacity-80 border-l-4 border-gold pl-8">
              Forgetfulness isn't just part of getting older. Our 30-day plan helps you protect your memory and feel as sharp as you did years ago.
            </p>
            <div className="flex flex-col sm:flex-row gap-10 items-center">
              <button 
                onClick={triggerCapture}
                className="w-full sm:w-auto bg-navy text-white px-16 py-7 rounded-full font-black text-sm tracking-[0.3em] uppercase hover:bg-gold transition-all text-center luxury-shadow hover:-translate-y-2 active:translate-y-0"
              >
                Inaugurate System — $47
              </button>
              <div className="flex items-center gap-5 text-[12px] uppercase tracking-[0.3em] font-black text-dark/20">
                <ShieldCheck className="w-5 h-5 text-gold/40" /> 100% Satisfaction Guarantee
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-navy rounded-[70px] overflow-hidden luxury-shadow border-[16px] border-white group relative shadow-2xl">
              <img 
                src="https://picsum.photos/seed/elite-tech/1200/1500" 
                className="w-full h-full object-cover opacity-60 mix-blend-overlay scale-110 group-hover:scale-100 transition-transform duration-[3s]" 
                alt="Haute Scientific Visualization" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-12 bottom-12 p-12 glass rounded-[50px] transform group-hover:-translate-y-4 transition-transform duration-700">
                <div className="text-[12px] uppercase tracking-[0.4em] font-black text-gold mb-8">The Big Secret</div>
                <h3 className="text-4xl font-serif italic mb-6 text-navy font-black tracking-tight leading-none">Protect Your Memory</h3>
                <p className="text-[11px] leading-relaxed text-gray-text font-black uppercase tracking-[0.2em] opacity-80 mb-0">
                  You don't have to accept mental decline. Science shows that simple daily habits can significantly protect your focus, no matter your age.
                </p>
              </div>
            </div>
            {/* Artistic Accents */}
            <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-gold rounded-full blur-[100px] opacity-20" />
            <div className="absolute -right-24 top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] text-[13px] uppercase tracking-[1em] text-dark/10 font-black hidden 2xl:block select-none">
              Elite Longevity • Biological Integrity • MMXXVI
            </div>
          </motion.div>
        </div>
      </header>

      {/* Simple Steps: How it works */}
      <section id="foundation" className="py-48 bg-white border-y border-line">
        <div className="max-w-[1500px] mx-auto px-8 md:px-20">
          <div className="grid lg:grid-cols-2 gap-40 mb-40 items-end">
            <motion.div {...fadeIn}>
              <span className="text-gold text-[13px] uppercase tracking-[0.5em] font-black mb-8 block">Simple Steps</span>
              <h2 className="text-7xl md:text-[9.5rem] font-black tracking-tighter leading-[0.85] text-navy">Truly <br /><span className="font-serif italic font-medium text-gold">Easy.</span></h2>
            </motion.div>
            <motion.div {...fadeIn} className="space-y-10">
              <p className="text-2xl text-gray-text font-serif italic leading-relaxed opacity-60">
                We've taken complicated brain science and turned it into simple daily habits that anyone can follow. No medical degree required.
              </p>
              <div className="h-0.5 w-full bg-line" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-line luxury-shadow rounded-[50px] overflow-hidden border border-line">
            {[
              { icon: <Compass />, title: "30-Day Plan", desc: "A clear, day-by-day guide that tells you exactly what to do to stay sharp." },
              { icon: <Utensils />, title: "Better Food", desc: "Delicious meal plans designed to give your brain the fuel it needs." },
              { icon: <Zap />, title: "Pure Energy", desc: "Simple movement routines that boost your focus and clear your head." },
              { icon: <Brain />, title: "Fun Puzzles", desc: "Quick daily challenges that keep your memory strong and active." }
            ].map((feature, i) => (
              <motion.div key={i} {...fadeIn} className="bg-white p-16 hover:bg-gold-cream transition-all group cursor-default">
                <div className="w-14 h-14 text-gold mb-12 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">{feature.icon}</div>
                <h4 className="text-3xl font-serif italic mb-8 text-navy font-black tracking-tight leading-none uppercase">{feature.title}</h4>
                <p className="text-[12px] text-gray-text leading-relaxed font-black uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100 transition-opacity">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Six Secrets: Everyday English */}
      <section id="protocol" className="py-48 bg-navy text-white relative flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-[1500px] px-8 md:px-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-40">
            <motion.span {...fadeIn} className="text-gold text-[13px] uppercase tracking-[0.6em] font-black mb-12 block">The 6 Secrets</motion.span>
            <h2 className="text-8xl md:text-[10rem] font-black mb-16 tracking-tighter leading-[0.82]">Stay <span className="font-serif italic text-gold font-medium">Sharp</span> <br />Every Day.</h2>
            <p className="text-white/40 text-xl leading-relaxed font-serif italic max-w-2xl mx-auto">
              Focus on these six areas to protect your memory for the rest of your life.
            </p>
          </div>

          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24"
          >
            {[
              { icon: <Moon />, title: "Deep Sleep", desc: "Simple tricks to help you sleep better so you wake up feeling clear and focused." },
              { icon: <Utensils />, title: "Smart Eating", desc: "Eat the foods your brain loves. It's not a diet, just better choices that taste great." },
              { icon: <Heart />, title: "Active Body", desc: "How a little bit of movement can help your brain build a permanent 'safety net'." },
              { icon: <Globe />, title: "New Hobbies", desc: "Learning fun new skills keeps your mind agile and your memory strong." },
              { icon: <Wind />, title: "Less Stress", desc: "Easy ways to relax your mind and stop stress from damaging your focus." },
              { icon: <Users />, title: "Daily Social", desc: "Staying connected with friends is a secret weapon for a healthy mind." }
            ].map((pillar, i) => (
              <motion.div key={i} variants={fadeIn} className="group border-b border-white/5 pb-20 transition-all hover:translate-x-3 cursor-default">
                <div className="flex items-center gap-8 mb-10">
                  <div className="w-12 h-12 text-gold group-hover:scale-125 transition-transform duration-500">{pillar.icon}</div>
                  <h4 className="text-4xl font-serif italic font-black tracking-tight">{pillar.title}</h4>
                </div>
                <p className="text-[13px] text-white/30 leading-relaxed font-black uppercase tracking-[0.3em] transition-colors group-hover:text-white/70">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(188,156,66,0.1)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* The App: Modern Luxury */}
      <section id="digital" className="py-48 bg-gold-cream relative">
        <div className="max-w-[1500px] mx-auto px-8 md:px-20">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-40 items-center">
            <div className="space-y-24">
              <motion.div {...fadeIn}>
                <span className="text-teal text-[13px] uppercase tracking-[0.5em] font-black mb-10 block">Your Personal Assistant</span>
                <h2 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.85] text-navy">The <br /><span className="font-serif italic font-medium text-teal">Youth App.</span></h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-16">
                {[
                  { icon: <Layout />, label: "30-Day Guide", desc: "Everything you need to know in one beautifully simple ebook." },
                  { icon: <BarChart3 />, label: "Progress Tracker", desc: "A simple app to track your daily wins and see your brain improve." },
                  { icon: <Utensils />, label: "Easy Meal Plans", desc: "Great recipes and shopping lists that help you feel better, fast." },
                  { icon: <ShieldCheck />, label: "Supplement Guide", desc: "No more guessing. We show you exactly what works for memory." }
                ].map((item, i) => (
                  <motion.div key={i} {...fadeIn} className="flex gap-10 items-start group">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-teal luxury-shadow group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="text-[14px] uppercase tracking-[0.3em] font-black text-navy mb-4">{item.label}</h5>
                      <p className="text-base text-gray-text font-serif italic leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div {...fadeIn} className="relative">
              <div className="bg-navy rounded-[80px] p-3 rotate-3 luxury-shadow group cursor-pointer shadow-black/20">
                <div className="bg-white rounded-[70px] p-16 flex flex-col justify-between aspect-[3/4] -rotate-3 group-hover:rotate-0 transition-transform duration-1000 border border-line">
                  <div>
                    <div className="text-[12px] uppercase tracking-[0.5em] font-black text-navy/30 mb-12 flex justify-between">
                      <span>VERIFIED ACCESS v2.0</span>
                      <ShieldCheck className="w-5 h-5 text-gold" />
                    </div>
                    <div className="w-20 h-1.5 bg-gold mb-16" />
                  </div>
                  <div>
                    <h3 className="text-6xl font-serif italic mb-12 leading-tight font-black text-navy">Elite Archive <br />Credentials</h3>
                    <p className="text-[12px] uppercase tracking-[0.4em] font-black text-gray-text opacity-40">Lifetime Protocol Validity • Private Institutional Access</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing: Clean and Catchy */}
      <section id="pricing" className="py-48 bg-white relative overflow-hidden flex flex-col items-center">
        <div className="max-w-[1100px] mx-auto px-8 relative z-10 w-full">
          <motion.div {...fadeIn} className="text-center mb-32">
            <h2 className="text-8xl md:text-[11rem] font-black mb-16 tracking-tighter leading-[0.82] text-navy">Start Your <br /><span className="font-serif italic text-gold font-medium">New Story.</span></h2>
            <p className="text-[14px] uppercase tracking-[0.8em] font-black text-navy/30 mb-12">Invest in your memory today. It’s the best choice you’ll ever make.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-navy rounded-[80px] p-2 luxury-shadow group overflow-hidden shadow-2xl"
          >
            <div className="bg-white rounded-[72px] p-12 md:p-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-24 items-center">
              <div className="text-left space-y-12">
                <span className="inline-block px-7 py-3 bg-orange text-white text-[12px] uppercase tracking-[0.4em] font-black rounded-full shadow-lg">Limited Time Offer — Save 50%</span>
                <h3 className="text-6xl font-serif italic text-navy font-black leading-tight tracking-tight uppercase">The Complete <br />Brain Youth <br />System.</h3>
                <div className="space-y-8">
                  {["30-Day Step-by-Step Guide", "Interactive Progress Tracker", "Brain-Smart Meal Plan", "Verified Supplement Guide"].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-6 text-[13px] uppercase tracking-[0.5em] font-black text-navy/40 hover:text-navy hover:translate-x-2 transition-all cursor-default">
                      <CheckCircle2 className="w-6 h-6 text-gold" /> {text}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-[12px] font-black text-dark/20 uppercase tracking-[0.3em] pt-8 border-t border-line">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}
                  <span className="ml-6 tracking-[0.5em]">5,000+ Happy Minds Staying Sharp</span>
                </div>
              </div>
              <div className="bg-navy p-14 md:p-20 rounded-[60px] text-white text-center shadow-inner">
                <div className="text-[13px] uppercase tracking-[0.6em] font-black text-white/30 mb-12">Total System Access</div>
                <div className="flex items-start justify-center gap-4 mb-16">
                  <span className="text-gold text-5xl font-black mt-6 tracking-tight">$</span>
                  <span className="font-sans text-[160px] font-black text-gold leading-none tracking-tighter">47</span>
                </div>
                <button 
                  onClick={triggerCapture}
                  className="block w-full bg-gold py-8 rounded-full text-[15px] uppercase tracking-[0.5em] font-black text-navy hover:scale-[1.05] hover:bg-white transition-all luxury-shadow active:scale-95"
                >
                  Buy Everything Now
                </button>
                <div className="flex justify-center gap-8 mt-12 opacity-30 text-[10px] uppercase tracking-[0.4em] font-black">
                  <span>SSL SECURE</span>
                  <span>INSTANT ACCESS</span>
                  <span>14-DAY REFUND</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Questions: Everyday English */}
      <section className="py-48 bg-gold-cream border-t border-line overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="text-center mb-40">
            <h2 className="text-7xl md:text-[8rem] font-black tracking-tighter mb-12 leading-none uppercase">Got <br /><span className="font-serif italic font-medium text-navy font-bold">Questions?</span></h2>
            <p className="text-[13px] uppercase tracking-[0.7em] font-black text-navy/30">Everything you need to know, in plain English.</p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {[
              { q: "Is this a medical program?", a: "No, this is an educational program. It shows you healthy lifestyle habits based on science. You should always check with your doctor before starting any new health routine." },
              { q: "How do I get my access?", a: "Right after you buy, we'll email you a unique link. You can use this link to access all the guides and the app on any device like your phone, tablet, or computer." },
              { q: "What if I don't like it?", a: "No problem. We have a simple 14-day refund policy. If the plan isn’t right for you, just let us know and we’ll give you your money back. No hard feelings!" }
            ].map((faq, i) => (
              <motion.div key={i} {...fadeIn} className="bg-white rounded-[40px] overflow-hidden border border-line luxury-shadow group">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-16 py-12 text-left flex items-center justify-between group"
                >
                  <span className="text-[16px] uppercase tracking-[0.4em] font-black text-navy group-hover:text-gold transition-colors">{faq.q}</span>
                  <div className={`w-12 h-12 rounded-full border-2 border-navy text-navy flex items-center justify-center transition-all duration-700 ${openFaq === i ? 'rotate-45 bg-navy text-white translate-x-2' : 'group-hover:translate-x-2'}`}>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <div className="px-16 pb-16 text-xl text-gray-text leading-relaxed font-serif italic border-t border-line pt-12 opacity-70">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="py-48 bg-navy text-white border-t border-white/5 relative selection:bg-white selection:text-navy">
        <div className="max-w-[1500px] mx-auto px-8 md:px-20 relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_1.8fr] gap-48 items-start mb-48">
            <div className="space-y-16">
              <div className="font-serif text-7xl font-black italic tracking-tighter cursor-pointer hover:tracking-[-0.05em] transition-all">
                Brain<span className="not-italic text-gold">Youth.</span>
              </div>
              <p className="text-[12px] text-white/30 leading-relaxed tracking-[0.5em] uppercase font-black max-w-md border-l border-white/10 pl-10">
                Helping you keep your mind sharp and your life full of focus, at any age.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-24">
              <div className="space-y-12">
                <h5 className="text-[14px] uppercase tracking-[0.7em] font-black text-gold">The Program</h5>
                <ul className="space-y-8 text-[12px] font-black uppercase tracking-[0.5em] text-white/40">
                  <li><a href="#" className="hover:text-gold hover:translate-x-2 transition-all block">30-Day Roadmap</a></li>
                  <li><a href="#" className="hover:text-gold hover:translate-x-2 transition-all block">Meal Plans</a></li>
                  <li><a href="#" className="hover:text-gold hover:translate-x-2 transition-all block">The App</a></li>
                </ul>
              </div>
              <div className="space-y-12">
                <h5 className="text-[14px] uppercase tracking-[0.7em] font-black text-gold">Support</h5>
                <ul className="space-y-8 text-[12px] font-black uppercase tracking-[0.5em] text-white/40">
                  <li><a href="#" className="hover:text-gold hover:translate-x-2 transition-all block">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-gold hover:translate-x-2 transition-all block">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-gold hover:translate-x-2 transition-all block">Contact Us</a></li>
                </ul>
              </div>
              <div className="space-y-12">
                <h5 className="text-[14px] uppercase tracking-[0.7em] font-black text-gold">Stay Sharp</h5>
                <form onSubmit={handleSubscribe} className="space-y-10 group">
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/10 py-6 pr-16 text-[12px] font-black uppercase tracking-[0.3em] outline-none focus:border-gold transition-colors placeholder:text-white/10 group-hover:border-white/30"
                      required
                    />
                    <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors hover:translate-x-2 duration-500">
                      <ArrowRight className="w-7 h-7" />
                    </button>
                  </div>
                  {isSubscribed && (
                    <p className="text-[11px] font-black text-gold uppercase tracking-[0.4em] flex items-center gap-4 animate-bounce">
                      <CheckCircle2 className="w-5 h-5" /> YOU'RE IN!
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="pt-24 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-16">
            <div className="text-[11px] uppercase tracking-[1em] font-black text-white/15 text-center lg:text-left">
              © 2026 Brain Youth International • Simple Science for a Sharp Mind
            </div>
            <div className="flex gap-16 opacity-30 transform hover:scale-110 transition-transform">
               <Globe className="w-7 h-7 hover:text-gold transition-colors cursor-pointer" />
               <ShieldCheck className="w-7 h-7 hover:text-gold transition-colors cursor-pointer" />
               <Check className="w-7 h-7 hover:text-gold transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
        {/* Aesthetic Background Detail */}
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30 shadow-[0_0_50px_rgba(188,156,66,0.5)]" />
      </footer>

      {/* Admin Dashboard Overlay */}
      <AnimatePresence>
        {isAdminView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-navy flex items-center justify-center p-8 overflow-y-auto"
          >
            {!isLoggedIntoAdmin ? (
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-lg rounded-[60px] p-20 text-center luxury-shadow"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-12 text-gold">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-serif italic mb-8 font-black text-navy">Admin Portal</h2>
                <form onSubmit={handleAdminLogin} className="space-y-8">
                  <input 
                    type="password" 
                    placeholder="Enter Admin Secret" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-gold-cream/50 border-2 border-transparent py-6 px-10 rounded-full text-center font-black uppercase tracking-[0.3em] outline-none focus:border-gold transition-all"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isAdminLoading}
                    className="w-full bg-navy text-white py-6 rounded-full font-black uppercase tracking-[0.4em] hover:bg-gold transition-all disabled:opacity-50"
                  >
                    {isAdminLoading ? "Verifying..." : "Login to Dashboard"}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsAdminView(false)}
                    className="text-[11px] font-black uppercase tracking-[0.3em] text-dark/30 hover:text-dark"
                  >
                    Return to Site
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-5xl rounded-[60px] p-16 md:p-24 luxury-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                  <div className="text-left">
                    <h2 className="text-5xl font-serif italic font-black text-navy mb-4">Lead Archive</h2>
                    <p className="text-[12px] uppercase tracking-[0.4em] font-black text-dark/30">
                      Total Captured: {collectedEmails.length}
                    </p>
                  </div>
                  <div className="flex gap-6">
                    <button 
                      onClick={() => setIsLoggedIntoAdmin(false)}
                      className="bg-gold-cream text-navy px-10 py-4 rounded-full font-black uppercase tracking-[0.3em] text-[11px]"
                    >
                      Logout
                    </button>
                    <button 
                      onClick={() => window.location.reload()}
                      className="bg-navy text-white px-10 py-4 rounded-full font-black uppercase tracking-[0.3em] text-[11px]"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <div className="bg-gold-cream/30 rounded-[40px] border border-line overflow-hidden overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-line bg-white/50">
                      <tr>
                        <th className="px-12 py-8 text-[12px] uppercase tracking-[0.4em] font-black text-navy/40">Captured Email</th>
                        <th className="px-12 py-8 text-[12px] uppercase tracking-[0.4em] font-black text-navy/40">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collectedEmails.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-12 py-20 text-center font-serif italic text-gray-text opacity-40">
                            No emails collected yet.
                          </td>
                        </tr>
                      ) : (
                        collectedEmails.map((entry, idx) => (
                          <tr key={idx} className="border-b border-line last:border-0 hover:bg-white/50 transition-colors">
                            <td className="px-12 py-8 font-black text-navy">{entry.email}</td>
                            <td className="px-12 py-8 text-[12px] font-black uppercase tracking-[0.2em] text-dark/40">
                              {new Date(entry.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiet Capture Modal */}
      <AnimatePresence>
        {showCapture && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-8 glass backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-xl rounded-[60px] p-20 luxury-shadow relative overflow-hidden"
            >
              <button 
                onClick={() => setShowCapture(false)}
                className="absolute top-10 right-10 text-dark/20 hover:text-dark transition-colors"
              >
                <ZapOff className="w-8 h-8" />
              </button>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-12 text-gold">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-5xl font-serif italic mb-8 font-black text-navy leading-tight">Securing Your Access</h3>
                <p className="text-gray-text text-lg font-serif italic mb-12 opacity-60">
                  Please enter the email address you'd like to use for your Brain Youth enrollment before proceeding.
                </p>

                {hasCaptured ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-6 py-12"
                  >
                    <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8" />
                    </div>
                    <p className="text-[14px] uppercase tracking-[0.5em] font-black text-navy">Opening Secure Checkout...</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCapture} className="space-y-10 group">
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="Your Best Email" 
                        value={captureEmail}
                        onChange={(e) => setCaptureEmail(e.target.value)}
                        className="w-full bg-gold-cream/50 border-2 border-transparent py-8 px-10 rounded-full text-[14px] font-black uppercase tracking-[0.3em] outline-none focus:border-gold transition-all luxury-shadow"
                        required
                        disabled={isCapturing}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isCapturing}
                      className="w-full bg-navy text-white py-8 rounded-full text-[14px] uppercase tracking-[0.5em] font-black hover:bg-gold transition-all luxury-shadow disabled:opacity-50"
                    >
                      {isCapturing ? "Processing..." : "Continue to Order"}
                    </button>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-dark/20">
                      SSL ENCRYPTED · INSTANT DELIVERY
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
