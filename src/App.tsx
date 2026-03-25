/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  History, 
  FileSearch, 
  Gauge, 
  Award, 
  LogOut, 
  TrendingUp, 
  Download, 
  Link as LinkIcon, 
  Instagram, 
  Send, 
  Copy,
  ArrowRight,
  Microscope,
  Globe,
  Plane,
  Coffee,
  Film,
  Shield,
  Battery,
  Flame,
  Skull,
  Gavel
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type Screen = 'autopsy' | 'evidence' | 'case-master' | 'hall-of-shame';

interface CaseData {
  id: string;
  subject: string;
  incident: string;
  score: number;
  verdict: string;
  type: string;
  summary: string;
  evidence: string[];
}

// --- Constants ---

const EGO_TYPES = [
  { key: "Main Character", emoji: "👑", desc: "Treats every conversation like their Netflix special" },
  { key: "Unsolicited Takeover", emoji: "🏃", desc: "Redoes your work because they simply cannot help themselves" },
  { key: "Fragile Genius", emoji: "🧠", desc: "Always ready to explain why you are wrong" },
  { key: "Credit Stealer", emoji: "🏆", desc: "Looks like someone's ego is writing checks their talent can't cash" },
  { key: "LinkedIn Warrior", emoji: "📱", desc: "Weaponises professional platforms for personal drama" },
  { key: "Pathetic Juggler", emoji: "🤹", desc: "Trying to keep multiple people emotionally on the hook" },
  { key: "Convenient Amnesia", emoji: "😴", desc: "Forgets everything they said the moment it becomes inconvenient" },
];

// --- Components ---

const Marquee = ({ items, className = "" }: { items: string[], className?: string }) => (
  <div className={`w-full overflow-hidden bg-error border-y-4 border-black py-4 rotate-[-2deg] ${className}`}>
    <div className="flex marquee-content whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="mx-8 font-bebas text-4xl text-black uppercase flex items-center">
          {item} <span className="ml-8">•</span>
        </span>
      ))}
    </div>
  </div>
);

const Sidebar = ({ currentScreen, setScreen }: { currentScreen: Screen, setScreen: (s: Screen) => void }) => {
  const navItems = [
    { id: 'autopsy', label: 'Autopsy', icon: Microscope },
    { id: 'evidence', label: 'Evidence', icon: FileSearch },
    { id: 'case-master', label: 'Case Master', icon: Gavel },
    { id: 'hall-of-shame', label: 'Hall of Shame', icon: Skull },
  ];

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-72 border-r-4 border-primary bg-[#161618] z-40 pt-24">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATKDj9cl5foN9NBHVZrgRpIEL2O7jYOMfKHRAGloHLZf5lT1Gcjy-M-iNaNKN3EUdXWxBNL8Brw-tjSB7ySpe49d0JEKZ5owDDOTPEv3LIdABSb-dpeHPCNUHbHlj9MjQlAY_BvarX9sIChP4LNahyCWyz7wPPahcmP5daWTKDOkg9OPfe9cRTEGAXHpBqboUQvkGFbwlxUAlXb88ONE_vHlxbYBF9dHztHIm8GKNE5q9LaEKeQeCVV4EbXpfD4qvYXoSVpJZZItM"
              alt="Subject Avatar"
            />
          </div>
          <div>
            <div className="font-label text-xs uppercase font-bold text-primary">SUBJECT #8291</div>
            <div className="text-[10px] text-white/50 font-label uppercase">Status: Clinically Fragile</div>
          </div>
        </div>
        <button
          onClick={() => setScreen('autopsy')}
          className="w-full py-3 bg-error text-white font-label text-xs font-bold skew-x-[-12deg] hover:brightness-125 transition-all sticker-shadow"
        >
          NEW DISSECTION
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={`flex items-center gap-3 px-6 py-4 font-label text-sm font-bold transition-all ${
              currentScreen === item.id
                ? 'bg-primary text-black skew-x-[-12deg] mx-2'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            <span className="uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-6 border-t border-white/10">
        <button className="flex items-center gap-3 text-white/50 hover:text-error transition-colors font-label text-xs font-bold uppercase">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

const TopBar = ({ title }: { title: string }) => (
  <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b-4 border-primary shadow-[0_4px_0_0_#FFE500]">
    <div className="flex justify-between items-center px-8 py-4 w-full max-w-[1400px] mx-auto">
      <div className="flex items-center gap-8">
        <div className="text-3xl font-black italic text-primary drop-shadow-[0_0_10px_rgba(255,229,0,0.5)] font-headline uppercase tracking-tighter">
          NAAZUK
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="h-8 w-[2px] bg-white/10 mx-2"></div>
          <h1 className="font-headline font-black text-2xl text-primary uppercase tracking-widest">{title}</h1>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <button className="text-primary hover:scale-110 transition-transform"><Bell size={20} /></button>
        <button className="text-primary hover:scale-110 transition-transform"><Search size={20} /></button>
        <button className="text-primary hover:scale-110 transition-transform"><Settings size={20} /></button>
      </div>
    </div>
  </header>
);

// --- Screen Components ---

const AutopsyScreen = ({ onDissect, isAnalyzing, result }: { onDissect: (incident: string) => void, isAnalyzing: boolean, result: any }) => {
  const [incident, setIncident] = useState('');
  const [score, setScore] = useState(0);
  const targetScore = result ? result.pettinessScore : 87;

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        if (current < targetScore) {
          current += 1;
          setScore(current);
        } else {
          clearInterval(interval);
        }
      }, 20);
    }, 1000);
    return () => clearTimeout(timer);
  }, [targetScore]);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="px-6 py-20 flex flex-col items-center text-center">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="font-bebas text-7xl md:text-9xl leading-none text-white tracking-tight mb-4 drop-shadow-[0_10px_0_#A90219]"
        >
          YOUR EGO HAS BEEN <br/> <span className="text-primary italic underline decoration-secondary">FLAGGED 🚨</span>
        </motion.h1>
        <p className="font-body text-xl md:text-2xl text-white/70 max-w-2xl mb-12">
          Describe the incident. We'll handle the autopsy. <br/>
          <span className="text-tertiary font-bold">No egos were spared in the making of this report.</span>
        </p>
        <Marquee
          items={["Main Character Syndrome", "Fragile Genius", "Unsolicited Takeover", "LinkedIn Warrior", "Reply-Guy Energy", "Aesthetic Gatekeeper"]}
          className="mt-10"
        />
      </section>

      {/* Input */}
      <section className="px-6 flex justify-center">
        <div className="w-full max-w-3xl bg-surface-high border-4 border-primary rounded-lg p-8 sticker-shadow-yellow transition-all">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-secondary"></span>
            <span className="w-3 h-3 rounded-full bg-primary"></span>
            <span className="w-3 h-3 rounded-full bg-tertiary"></span>
            <span className="ml-4 font-label text-xs uppercase tracking-widest text-primary">Case Entry: Ego_Violation_Log_001</span>
          </div>
          <label className="block font-bebas text-4xl mb-6 text-white">WHAT HAPPENED, PRINCESS?</label>
          <div className="relative">
            <textarea
              value={incident}
              onChange={(e) => setIncident(e.target.value)}
              className="w-full h-48 bg-background border-4 border-white/10 rounded-none p-6 text-xl font-body focus:border-primary focus:ring-0 transition-colors placeholder:text-white/20 text-white"
              placeholder="He rejected my frontend and made his own... while wearing MY aesthetic..."
            />
            <div className="absolute -bottom-4 -right-4">
              <button
                onClick={() => onDissect(incident)}
                disabled={isAnalyzing}
                className="bg-error hover:bg-red-600 disabled:opacity-50 text-white font-bebas text-3xl px-12 py-6 border-4 border-black shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3"
              >
                {isAnalyzing ? 'ANALYSING EGO...' : 'DISSECT THE EGO'} <ArrowRight size={32} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ego Meter */}
      <section className="px-6 py-20 bg-background/50">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="font-bebas text-6xl leading-tight">THE SCALPEL <br/>DOESN'T LIE.</h2>
            <div className="p-8 bg-surface rounded-lg border-4 border-error sticker-shadow-red">
              <div className="flex justify-between items-end mb-4">
                <span className="font-bebas text-3xl">PETTINESS SCORE</span>
                <span className="font-bebas text-7xl text-error">{score}/100</span>
              </div>
              <div className="w-full h-12 bg-background border-4 border-black overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-400 to-error relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
              </div>
              <div className="mt-6 font-bebas text-5xl text-center p-4 bg-error text-white skew-x-[-5deg]">
                VERDICT: {result ? result.verdict : 'CLINICALLY FRAGILE'}
              </div>
            </div>
          </div>
          <div className="relative h-[400px]">
            <img
              className="w-full h-full object-cover rounded-lg border-4 border-primary tilt-2 grayscale hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZSavtmIzTs0qs1-naLCXfZDLfgGeNgttfEfODPMOoYqhkAl-vUdhu-u6aC5EX_Jt53dEe7kdaJCWsfOaPpiccrQ71EO3kpyqe2xMPl58E0QZfPMoy-zp8Z_7SuPlMFaHAknj4e5GZoUS9_IPE7HohlL8EvRJy_5i9MJ9q6o3NTXP3emCxTVtUCcEa2RcSMKqmbQQ1ykjyRXgfF_oHcvIUPcoqpMKOkfCR7t9W0o_kMuSIa9YmSqX8onA8Ly-AKhHA6wBeIsI9LsM"
              alt="Evidence"
            />
            <div className="absolute -top-6 -left-6 bg-tertiary text-black font-label px-4 py-2 font-black uppercase text-xs rotate-[-12deg]">EVIDENCE #A42</div>
          </div>
        </div>
      </section>

      {/* Reports — only show if we have real results */}
      {result && (
        <section className="px-6 py-24 max-w-[1400px] mx-auto">
          <div className="mb-16 flex flex-col items-center">
            <h2 className="font-bebas text-7xl mb-4">THE AUTOPSY REPORT</h2>
            <div className="h-2 w-48 bg-primary"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            <ReportCard
              icon={<Microscope size={32} />}
              title="🔬 MEDICAL AUTOPSY"
              content={result.medicalAutopsy}
              color="bg-tertiary"
              tilt="tilt-1"
            />
            <ReportCard
              icon={<Globe size={32} />}
              title="🌐 EGO TRANSLATOR"
              content={result.egoTranslator}
              color="bg-primary"
              textColor="text-black"
              tilt="tilt-2"
            />
            <ReportCard
              icon={<Plane size={32} />}
              title="🛂 RED FLAG IMMIGRATION"
              content={result.redFlagImmigration}
              color="bg-secondary"
              tilt="tilt-3"
            />
            <ReportCard
              icon={<Coffee size={32} />}
              title="🍵 SMILE & STAB"
              content={result.smileAndStab}
              color="bg-tertiary"
              tilt="tilt-2"
            />
            <ReportCard
              icon={<Film size={32} />}
              title="🎬 VILLAIN ARC"
              content={result.villainArc}
              color="bg-primary"
              textColor="text-black"
              tilt="tilt-1"
              className="lg:col-span-2"
            />
          </div>

          {/* Top Roast */}
          <div className="mt-12 p-8 bg-error border-4 border-black sticker-shadow text-center">
            <p className="font-label text-xs uppercase tracking-widest text-white/70 mb-3">⚡ TOP ROAST OF THE DAY</p>
            <p className="font-bebas text-4xl text-white">{result.topRoast}</p>
          </div>
        </section>
      )}
    </div>
  );
};

const ReportCard = ({ icon, title, content, color, textColor = "text-white", tilt, className = "" }: any) => (
  <div className={`${color} ${textColor} border-4 border-black p-8 rounded-lg sticker-shadow ${tilt} hover:scale-105 transition-all ${className}`}>
    <div className="flex justify-between mb-8">
      {icon}
      <button className="hover:text-white/50 transition-colors"><Copy size={20} /></button>
    </div>
    <h3 className="font-bebas text-3xl mb-4">{title}</h3>
    <p className="font-body text-lg leading-relaxed font-bold">{content}</p>
  </div>
);

// --- Diagnosis Card with animated bar ---

const DiagnosisCard = ({ emoji, title, desc, prob, active = false, delay = 0 }: any) => {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setBarWidth(prob), 100 + delay);
    return () => clearTimeout(timer);
  }, [prob, delay]);

  const barColor = prob >= 70 ? '#FF4D4D' : prob >= 40 ? '#FFE500' : prob >= 20 ? '#7B5EA7' : '#444444';

  return (
    <div
      className={`bg-surface-high p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-2 relative ${
        active ? 'border-4 border-primary' : 'border border-white/10 opacity-70 hover:opacity-100'
      }`}
      style={{ minHeight: '220px' }}
    >
      {active && (
        <div className="absolute -top-4 -right-4 bg-error text-white font-headline font-black px-4 py-1 rotate-12 border-2 border-white shadow-lg text-sm z-10">
          DETECTED
        </div>
      )}
      <div className="text-3xl">{emoji}</div>
      <div>
        <h4 className={`font-headline font-black text-lg uppercase leading-tight ${active ? 'text-primary' : 'text-white'}`}>
          {title}
        </h4>
        <p className="font-body text-white/50 text-xs mt-1 leading-relaxed">{desc}</p>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between font-label text-xs mb-2">
          <span className="text-white/50">PROBABILITY</span>
          <span className={active ? 'text-primary font-bold' : 'text-white/70'}>{prob}%</span>
        </div>
        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${barWidth}%`, backgroundColor: barColor }}
          />
        </div>
      </div>
    </div>
  );
};

// --- Evidence Screen ---

const EvidenceScreen = ({ data }: { data: any }) => {
  const [confBarWidth, setConfBarWidth] = useState(0);

  useEffect(() => {
    if (!data) return;
    const timer = setTimeout(() => setConfBarWidth(data.confidence), 100);
    return () => clearTimeout(timer);
  }, [data]);

  if (!data) return (
    <div className="flex items-center justify-center h-96">
      <p className="font-bebas text-4xl text-white/40">NO CASE LOADED. GO BACK AND DISSECT.</p>
    </div>
  );

  // Build ordered diagnosis list: detected type first, rest sorted by score desc
  const allScores: Record<string, number> = data.allScores || {};

  const orderedTypes = [...EGO_TYPES].sort((a, b) => {
    if (a.key === data.egoType) return -1;
    if (b.key === data.egoType) return 1;
    return (allScores[b.key] || 0) - (allScores[a.key] || 0);
  });

  return (
    <div className="space-y-0">
      {/* Verdict Banner */}
      <section className="w-full bg-primary py-12 px-12 flex justify-between items-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}
        />
        <div className="relative z-10">
          <h1 className="font-headline font-black text-6xl text-black tracking-tighter leading-none mb-2 uppercase">
            THE VERDICT IS IN.
          </h1>
          <p className="font-body text-black text-xl font-medium max-w-2xl">
            After careful examination of the incident, the tribunal has reached a conclusion.
          </p>
        </div>
        <div className="relative z-10">
          <div className="border-4 border-error px-6 py-3 rounded-none rotate-3 bg-black/5 flex flex-col items-center">
            <span className="font-headline font-black text-error text-4xl tracking-widest leading-none">
              {data.egoType}
            </span>
          </div>
        </div>
      </section>

      {/* Main Evidence Card */}
      <section className="max-w-5xl mx-auto py-24 px-8">
        <div className="bg-surface-high border-4 border-primary p-12 relative flex flex-col items-center text-center shadow-[20px_20px_0px_#000]">
          <div className="absolute -top-6 -left-6 bg-tertiary text-white font-label font-bold px-4 py-2 rotate-[-5deg] shadow-lg">
            CASE ID: #882-QX
          </div>
          <span className="text-8xl mb-8">{data.egoEmoji}</span>
          <h2 className="font-headline font-black text-8xl text-primary tracking-tighter mb-4 italic uppercase">
            {data.egoType}
          </h2>
          <p className="font-body text-2xl text-white/70 max-w-3xl leading-relaxed mb-12">
            {data.medicalAutopsy}
          </p>

          {/* Animated Confidence Bar */}
          <div className="w-full max-w-2xl mb-16">
            <div className="flex justify-between font-label text-primary font-bold mb-4 tracking-widest uppercase">
              <span>The classifier is very sure about this one</span>
              <span>{data.confidence}%</span>
            </div>
            <div className="w-full h-8 bg-background border-2 border-primary/20 p-1">
              <div
                className="h-full bg-primary relative overflow-hidden transition-all duration-[1200ms] ease-out"
                style={{ width: `${confBarWidth}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
              </div>
            </div>
          </div>

          {/* Exhibit Cards */}
          <div className="flex flex-wrap justify-center gap-12 w-full">
            {[
              { label: 'Exhibit A', content: data.evidenceA, icon: <Copy size={32} /> },
              { label: 'Exhibit B', content: data.evidenceB, icon: <Award size={32} /> },
              { label: 'Exhibit C', content: data.evidenceC, icon: <Settings size={32} /> },
            ].map((ex) => (
              <div
                key={ex.label}
                className="bg-primary text-black p-6 w-56 h-56 shadow-xl -rotate-2 transform hover:rotate-0 transition-transform flex flex-col justify-between"
              >
                {ex.icon}
                <p className="font-body font-bold text-lg leading-tight text-left">{ex.content}</p>
                <span className="font-label text-[10px] uppercase opacity-60 text-left">{ex.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Diagnosis — all 7 types with real dynamic scores */}
      <section className="py-24 px-12 bg-surface">
        <h3 className="font-headline font-black text-6xl text-white tracking-tighter mb-4 uppercase italic">
          The Full Diagnosis
        </h3>
        <p className="font-body text-white/50 mb-16 text-lg">
          All ego types scored in real-time against your incident.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {orderedTypes.map((type, index) => {
            const isDetected = type.key === data.egoType;
            const score = isDetected
              ? data.confidence
              : (allScores[type.key] ?? 0);
            return (
              <DiagnosisCard
                key={type.key}
                emoji={type.emoji}
                title={type.key}
                desc={type.desc}
                prob={score}
                active={isDetected}
                delay={index * 150}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

const CaseMasterScreen = ({ data }: { data: any }) => (
  <div className="max-w-6xl mx-auto px-12 py-16">
    <section className="mb-20">
      <h2 className="font-headline font-black text-7xl md:text-8xl text-white mb-4 tracking-tighter leading-none uppercase">
        EXPORT THE <span className="text-secondary">DESTRUCTION.</span>
      </h2>
      <p className="font-body text-2xl text-white/60 max-w-2xl leading-relaxed">
        Your case file is ready. Frame it. Post it. Send it to them anonymously.
      </p>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      <div className="lg:col-span-5 flex justify-center">
        <div className="relative group perspective-card">
          <div className="absolute -top-4 -right-6 bg-primary text-black font-label font-bold px-4 py-2 rotate-[12deg] z-30 shadow-xl">
            EVIDENCE #8291
          </div>
          <div className="w-[380px] aspect-[9/16] bg-[#111] border-[6px] border-secondary p-8 flex flex-col relative overflow-hidden shadow-[15px_15px_0_0_#A90219] rotate-[-2deg]">
            <div className="flex justify-between items-start mb-12">
              <div className="font-label text-secondary text-xs tracking-[0.2em]">CASE FILE: #EGO-8291</div>
              <div className="bg-secondary/20 text-secondary border border-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-tighter">CLASSIFIED</div>
            </div>
            <h3 className="font-headline font-black text-5xl text-white leading-[0.85] mb-8 uppercase italic">
              {data ? data.egoType : 'UNSOLICITED\nTAKEOVER'}
            </h3>
            <div className="w-full h-1 bg-secondary/30 mb-10"></div>
            <div className="space-y-10">
              <div>
                <label className="font-label text-[10px] text-white/40 tracking-widest block mb-2 uppercase italic">INCIDENT SUMMARY</label>
                <p className="font-body text-sm text-white/80 leading-snug">{data ? data.medicalAutopsy : 'Submit an incident to generate your case file.'}</p>
              </div>
              <div>
                <label className="font-label text-[10px] text-white/40 tracking-widest block mb-2 uppercase italic">KEY EVIDENCE</label>
                <p className="font-headline font-bold text-xl text-primary leading-tight">"{data ? data.topRoast : 'The verdict awaits.'}"</p>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="font-label text-[10px] text-white/40 tracking-widest uppercase italic">PETTINESS RATING</label>
                  <span className="font-headline font-black text-3xl text-secondary leading-none">{data ? data.pettinessScore : 87}%</span>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary shadow-[0_0_15px_rgba(255,113,107,0.5)]" style={{width: `${data ? data.pettinessScore : 87}%`}}></div>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-12 flex justify-between items-center opacity-40">
              <span className="font-headline font-black italic uppercase text-2xl tracking-tighter text-white">Naazuk</span>
              <span className="font-label text-[8px] text-white/50 text-right uppercase">CERTIFIED EGO AUTOPSY<br/>DISTRICT 9 FORENSICS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-16">
        <section className="grid grid-cols-1 gap-4">
          <ActionButton icon={<Download />} label="DOWNLOAD IMAGE" color="bg-secondary" shadow="shadow-[8px_8px_0_0_#A90219]" />
          <ActionButton icon={<LinkIcon />} label="COPY LINK" color="border-4 border-primary text-primary" />
          <ActionButton icon={<Instagram />} label="SHARE TO INSTAGRAM" color="bg-tertiary" shadow="shadow-[8px_8px_0_0_#2e0061]" />
        </section>

        <section className="bg-surface-high p-10 border-l-8 border-primary">
          <h4 className="font-headline font-black text-3xl text-white mb-10 uppercase italic">CUSTOMISE YOUR CASE FILE</h4>
          <div className="space-y-12">
            <div>
              <label className="font-label text-sm text-white/50 uppercase tracking-widest block mb-4">BACKGROUND THEME</label>
              <div className="flex flex-wrap gap-4">
                <button className="w-16 h-16 bg-[#111] border-4 border-primary ring-4 ring-offset-4 ring-offset-surface ring-primary/20"></button>
                <button className="w-16 h-16 bg-secondary border-4 border-transparent hover:border-white/50 transition-colors"></button>
                <button className="w-16 h-16 bg-tertiary border-4 border-transparent hover:border-white/50 transition-colors"></button>
                <button className="w-16 h-16 bg-primary border-4 border-transparent hover:border-white/50 transition-colors"></button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Toggle label="Pettiness Score" active />
              <Toggle label="Evidence Quote" active />
              <Toggle label="Watermark" active />
              <Toggle label="Case Stamp" />
            </div>
          </div>
        </section>
      </div>
    </div>

    <section className="mt-32 bg-primary p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="relative z-10 max-w-xl">
        <h5 className="font-headline font-black text-4xl text-black leading-none uppercase mb-2">
          THINK YOUR CASE DESERVES PUBLIC ATTENTION?
        </h5>
        <p className="font-body text-black/70 font-medium">
          Submit it to the Hall of Shame. Let the people vote on their level of delusion.
        </p>
      </div>
      <button className="relative z-10 bg-error text-white px-10 py-5 font-headline font-black text-xl uppercase tracking-tighter hover:scale-105 active:scale-95 transition-transform flex items-center gap-4">
        SUBMIT TO HALL OF SHAME <TrendingUp />
      </button>
    </section>
  </div>
);

const ActionButton = ({ icon, label, color, shadow = "" }: any) => (
  <button className={`group relative flex items-center justify-between px-8 py-6 rounded-none font-headline font-black text-2xl uppercase tracking-tighter transition-all hover:scale-[1.02] active:scale-95 ${color} ${shadow}`}>
    <span className="flex items-center gap-4">
      {icon}
      {label}
    </span>
    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
  </button>
);

const Toggle = ({ label, active = false }: any) => (
  <div className="flex items-center justify-between bg-background p-4 border-b-2 border-white/10">
    <span className="font-body font-bold text-white uppercase text-xs">{label}</span>
    <div className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${active ? 'bg-primary' : 'bg-white/10'}`}>
      <div className={`w-4 h-4 rounded-full absolute transition-all ${active ? 'bg-black right-1' : 'bg-white/40 left-1'}`}></div>
    </div>
  </div>
);

const HallOfShameScreen = () => (
  <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-16">
    <section className="flex flex-col items-start gap-6 max-w-3xl">
      <h2 className="font-headline text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-tight">
        THE HALL OF <span className="text-primary">SHAME</span> 🏛️
      </h2>
      <p className="font-body text-xl text-white/60 max-w-xl">
        Real egos. Real incidents. Submitted by real survivors of the digital vanity war.
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-surface-high px-6 py-2 rounded-full text-primary font-label text-sm border border-white/10">342 Cases Filed</span>
        <span className="bg-surface-high px-6 py-2 rounded-full text-secondary font-label text-sm border border-white/10">1.2K Reactions</span>
        <span className="bg-surface-high px-6 py-2 rounded-full text-tertiary font-label text-sm border border-white/10">18 Hall of Fame Entries</span>
      </div>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 space-y-12">
        <article className="relative bg-primary text-black p-8 md:p-12 rounded-lg border-4 border-black sticker-shadow overflow-hidden">
          <div className="absolute -right-8 -top-8 bg-error text-white font-headline font-black py-4 px-12 rotate-12 uppercase tracking-widest text-xl shadow-lg border-4 border-black">
            ⭐ HALL OF FAME
          </div>
          <div className="flex items-start gap-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-black text-primary flex items-center justify-center rounded-lg rotate-[-3deg] mb-2 border-2 border-black">
                <Award size={40} />
              </div>
              <span className="font-label text-xs uppercase font-bold">Ego Level: God</span>
            </div>
            <div>
              <h3 className="font-headline text-4xl font-black uppercase mb-2">The LinkedIn Larpist</h3>
              <p className="font-label text-sm opacity-70">Case ID: #HOS-2024-089 • 2h ago</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2 space-y-6">
              <p className="font-body text-xl font-medium leading-relaxed">
                "Posted a 10-paragraph essay about how their morning coffee taught them 'agile synergy' and 'resilient disruption' because the barista didn't say 'Have a nice day' fast enough."
              </p>
              <div className="bg-black/5 p-6 rounded-lg border-l-8 border-black italic font-body">
                <span className="font-label block not-italic font-black text-xs uppercase mb-2">Top Roast:</span>
                "Bro is out here turning a mild social inconvenience into a TED Talk for bots. Seek grass immediately."
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-black text-white p-6 rounded-lg rotate-2">
              <span className="font-label uppercase text-xs mb-1">Pettiness Score</span>
              <span className="font-headline text-6xl font-black text-primary">9.8</span>
              <div className="w-full h-2 bg-white/10 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[98%]"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <ReactionButton emoji="🥚" label="Fragile" count={452} />
            <ReactionButton emoji="👶" label="So Mature" count={128} />
            <ReactionButton emoji="🪞" label="Mirror Check" count={89} />
            <ReactionButton emoji="🏆" label="Elite Shame" count={34} />
          </div>
        </article>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SmallCaseCard color="bg-tertiary" icon={<Award />} title="The 'Reply All' Vigilante" desc="Replied to a company-wide email chain (500+ people) just to correct a tiny typo in the CEO's greeting." score="7.4" reactions={["🥚 12", "👶 4"]} />
          <SmallCaseCard color="bg-secondary" icon={<Flame />} title="The Passive Aggressive Post-It" desc="Labeled every single item in the shared fridge with a timestamped 'Expected Freshness Window'." score="8.9" reactions={["🪞 45", "🥚 31"]} />
        </div>
      </div>

      <aside className="lg:col-span-4 space-y-8">
        <div className="bg-surface-high p-6 rounded-lg border-l-4 border-primary sticker-shadow">
          <h5 className="font-headline text-xl font-black uppercase mb-6 flex items-center gap-2">
            <TrendingUp className="text-primary" /> Most Fragile This Week
          </h5>
          <div className="space-y-4">
            <LeaderboardItem rank="01" name="@SynergySam" votes="892" />
            <LeaderboardItem rank="02" name="@LinkedInLord" votes="754" />
            <LeaderboardItem rank="03" name="@CryptoKingPin" votes="412" />
          </div>
        </div>

        <div className="bg-surface-high p-6 rounded-lg border-l-4 border-secondary sticker-shadow">
          <h5 className="font-headline text-xl font-black uppercase mb-6 flex items-center gap-2">
            <Bell className="text-secondary" /> High Pettiness Scores
          </h5>
          <div className="space-y-4">
            <ScoreItem label="Airfryer Gate" score="9.9" />
            <ScoreItem label="The Font Correcter" score="9.6" />
          </div>
        </div>
      </aside>
    </div>

    <footer className="mt-24 bg-background border-t-8 border-secondary p-12 md:p-24 flex flex-col items-center text-center gap-8 rounded-t-xl sticker-shadow">
      <h2 className="font-headline text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
        HAD YOUR OWN <span className="text-secondary">ENCOUNTER?</span>
      </h2>
      <button className="bg-secondary text-white font-headline font-black py-6 px-12 text-2xl uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-[12px_12px_0px_#000] border-4 border-black">
        FILE A NEW CASE →
      </button>
    </footer>
  </div>
);

const ReactionButton = ({ emoji, label, count }: any) => (
  <button className="bg-black/10 hover:bg-black/20 transition-all px-4 py-3 rounded-lg border-2 border-black flex items-center gap-2 font-label font-bold active:scale-95">
    {emoji} <span className="uppercase">{label}</span> <span className="bg-black text-white px-2 py-0.5 rounded text-xs ml-1">{count}</span>
  </button>
);

const SmallCaseCard = ({ color, icon, title, desc, score, reactions }: any) => (
  <article className={`${color} text-white p-8 rounded-lg hover:rotate-[-1deg] transition-all cursor-pointer group sticker-shadow`}>
    <div className="flex justify-between items-start mb-6">
      <div className="group-hover:scale-125 transition-transform">{icon}</div>
      <div className="text-right">
        <span className="font-label text-xs uppercase opacity-80 block">Pettiness</span>
        <span className="font-headline text-3xl font-black">{score}</span>
      </div>
    </div>
    <h4 className="font-headline text-2xl font-bold uppercase mb-4">{title}</h4>
    <p className="font-body text-white/80 mb-6 line-clamp-3">{desc}</p>
    <div className="flex gap-2">
      {reactions.map((r: string, i: number) => (
        <span key={i} className="bg-black/20 px-3 py-1 rounded text-xs font-label">{r}</span>
      ))}
    </div>
  </article>
);

const LeaderboardItem = ({ rank, name, votes }: any) => (
  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-white/5 hover:border-primary/50 transition-colors">
    <div className="flex items-center gap-3">
      <span className="font-label font-bold text-primary">{rank}.</span>
      <p className="font-body text-sm font-bold">{name}</p>
    </div>
    <span className="font-label text-xs bg-black px-2 py-1 rounded text-secondary">{votes} Votes</span>
  </div>
);

const ScoreItem = ({ label, score }: any) => (
  <div className="bg-background p-4 rounded-lg">
    <div className="flex justify-between mb-2">
      <span className="font-body font-bold text-sm">{label}</span>
      <span className="text-secondary font-black">{score}</span>
    </div>
    <div className="w-full h-1 bg-black rounded-full">
      <div className="h-full bg-secondary" style={{ width: `${parseFloat(score) * 10}%` }}></div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('autopsy');
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDissect = async (incident: string) => {
    if (!incident.trim()) return;
    setIsAnalyzing(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;

      const prompt = `You are Naazuk, a dramatic AI ego autopsy tool. Analyze this incident and respond ONLY with valid JSON, no markdown, no backticks.

Incident: "${incident}"

Respond with exactly this JSON structure:
{
  "egoType": "one of: Main Character, Unsolicited Takeover, Fragile Genius, Credit Stealer, LinkedIn Warrior, Pathetic Juggler, Convenient Amnesia",
  "egoEmoji": "matching emoji for the primary type",
  "confidence": <number 60-99>,
  "pettinessScore": <number 0-100>,
  "verdict": "a 3-word dramatic verdict like CLINICALLY FRAGILE",
  "medicalAutopsy": "dramatic medical autopsy report 2-3 sentences",
  "egoTranslator": "what they said vs what they meant, 2-3 lines",
  "redFlagImmigration": "visa denial notice, 2-3 lines",
  "smileAndStab": "a passive aggressive sweet response they could send, 2 lines",
  "villainArc": "5-act bollywood villain arc, 3-4 lines",
  "evidenceA": "specific behavior from the incident as exhibit A",
  "evidenceB": "specific behavior from the incident as exhibit B",
  "evidenceC": "specific behavior from the incident as exhibit C",
  "topRoast": "the single best roast line about this incident",
  "allScores": {
    "Main Character": <number 0-99, how much this incident matches this type>,
    "Unsolicited Takeover": <number 0-99>,
    "Fragile Genius": <number 0-99>,
    "Credit Stealer": <number 0-99>,
    "LinkedIn Warrior": <number 0-99>,
    "Pathetic Juggler": <number 0-99>,
    "Convenient Amnesia": <number 0-99>
  }
}
The allScores are independent probability scores (NOT summing to 100). The primary egoType must have the highest score matching the confidence value.`;

      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 1500,
            messages: [{ role: 'user', content: prompt }]
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error('API Error:', result);
        throw new Error(result.error?.message || 'API call failed');
      }

      const text = result.choices[0].message.content;
      const clean = text.replace(/```json|```/g, '').trim();
      const data = JSON.parse(clean);
      setAnalysisResult(data);
      setScreen('evidence');
    } catch (err) {
      console.error('Groq error:', err);
      alert('Something went wrong: ' + (err as Error).message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex overflow-hidden"
          >
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 bg-[#0d0d0f] border-r border-primary/20 z-10"
            />
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 bg-[#0d0d0f] border-l border-primary/20 z-10"
            />
            <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="bg-primary text-black px-12 py-6 border-8 border-black shadow-[20px_20px_0_0_rgba(0,0,0,0.5)] rotate-[-5deg]"
              >
                <div className="font-bebas text-8xl leading-none">TOP SECRET</div>
                <div className="font-label text-sm tracking-[0.5em] font-black mt-2 border-t-4 border-black pt-2">AUTOPSY IN PROGRESS</div>
              </motion.div>
              <div className="mt-12 font-label text-xs uppercase tracking-widest text-primary/60">Case #EGO_AUTOPSY_8291</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar currentScreen={screen} setScreen={setScreen} />
      <TopBar title={screen.replace('-', ' ')} />

      <main className="lg:pl-72 pt-24 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {screen === 'autopsy' && <AutopsyScreen onDissect={handleDissect} isAnalyzing={isAnalyzing} result={analysisResult} />}
            {screen === 'evidence' && <EvidenceScreen data={analysisResult} />}
            {screen === 'case-master' && <CaseMasterScreen data={analysisResult} />}
            {screen === 'hall-of-shame' && <HallOfShameScreen />}
          </motion.div>
        </AnimatePresence>

        <footer className="w-full py-12 border-t-4 border-primary mt-20 bg-[#0d0d0f]">
          <div className="flex flex-col items-center justify-center gap-6 px-4">
            <div className="font-headline font-black italic text-primary text-4xl mb-2 uppercase">NAAZUK</div>
            <div className="font-label text-[10px] tracking-[0.2em] uppercase text-white/40 text-center max-w-lg">
              © 2024 NAAZUK: THE DIGITAL AUTOPSY THEATER. NO EGOS WERE HARMED (THEY WERE DESTROYED).
            </div>
            <div className="flex gap-8">
              <button className="font-label text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-primary transition-all">Privacy</button>
              <button className="font-label text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-primary transition-all">Terms</button>
              <button className="font-label text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-primary transition-all">Submit Evidence</button>
            </div>
          </div>
        </footer>
      </main>

      <div className="noise-overlay"></div>
    </div>
  );
}
