import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Award, 
  Terminal, 
  User, 
  Send,
  GraduationCap,
  ChevronRight,
  Globe,
  Database,
  Cpu,
  Trophy,
  Users,
  Star,
  Zap,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Home,
  FolderDot,
  Menu,
  X
} from 'lucide-react';

/**
 * useScrollReveal Hook
 */
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return [domRef, isVisible] as const;
};

/**
 * RevealSection Component
 */
interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
}

const RevealSection: React.FC<RevealSectionProps> = ({ children, className = "" }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface Project {
  title: string;
  tech: string[];
  desc: string;
  link: string;
  isPrivate: boolean;
}

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['about', 'skills', 'achievements', 'projects', 'contact'];
      const scrollPos = window.scrollY + 150;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          return;
        }
      }
      if (window.scrollY < 100) setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/jitesh.borse007@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      const data = await response.json();
      if (response.ok || data.success === true) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const navItems = [
    { id: 'home', icon: <Home size={18} />, label: 'Home' },
    { id: 'about', icon: <User size={18} />, label: 'About' },
    { id: 'skills', icon: <Code2 size={18} />, label: 'Skills' },
    { id: 'achievements', icon: <Trophy size={18} />, label: 'Awards' },
    { id: 'projects', icon: <FolderDot size={18} />, label: 'Work' },
    { id: 'contact', icon: <Mail size={18} />, label: 'Contact' },
  ];

  const projects: Project[] = [
    {
      title: "Converso",
      tech: ["Next.js", "Supabase", "Tailwind CSS", "Clerk"],
      desc: "Developed an AI-powered SaaS learning platform with real-time voice lessons, AI tutors, and subscription billing using Next.js and Supabase.",
      link: "#",
      isPrivate: true
    },
    {
      title: "Smart Inventory System",
      tech: ["PHP", "MySQL", "Python", "Bootstrap"],
      desc: "Developed an inventory management system with PHP and MySQL featuring real-time tracking, role-based access, low-stock alerts, and Python-based predictive analytics.",
      link: "https://github.com/jiteshborse/smart-inventory",
      isPrivate: false
    },
    {
      title: "AI-Blogging Assistant",
      tech: ["React.js", "Node.js", "Gemini API", "MongoDB", "Tailwind"],
      desc: "Developed an AI-powered content tool with automated blog generation and SEO optimization, increasing user retention by 20%.",
      link: "https://github.com/jiteshborse/AI-Blogging-Assistant",
      isPrivate: false
    },
    {
      title: "AI-Job-Tracker",
      tech: ["React.js", "Node.js", "Fastify", "APIs"],
      desc: "An AI-powered job tracking app that matches your resume with real job listings and manages applications intelligently.",
      link: "https://github.com/jiteshborse/AI-Job-Tracker",
      isPrivate: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>

      {/* Responsive Pill Navbar */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <div className="relative w-full max-w-fit">
          <nav className={`flex items-center gap-2 p-1.5 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl transition-all duration-500 ${scrolled ? 'scale-95' : 'scale-100'}`}>
            {/* Logo Section */}
            <div 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 cursor-pointer border-r border-white/10 group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-[11px] ring-2 ring-white/10 group-hover:rotate-12 transition-transform">
                JB
              </div>
              <span className="text-white font-bold text-sm tracking-tight">Portfolio</span>
              <div className="md:hidden ml-1 text-slate-400">
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </div>
            </div>

            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center gap-1 px-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`p-2.5 rounded-full transition-all duration-300 relative group ${
                    activeSection === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Resume Button */}
            <div className="pl-2 border-l border-white/10">
              <a 
                href="https://pdflink.to/653a8366/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-900 px-4 py-2 rounded-full text-[11px] font-bold hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
              >
                Resume
              </a>
            </div>
          </nav>

          {/* Mobile Menu Dropdown Card */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-[240px] bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-3xl p-4 md:hidden animate-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center gap-4 w-full p-3 rounded-2xl transition-all ${
                      activeSection === item.id 
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={activeSection === item.id ? 'text-indigo-400' : ''}>{item.icon}</span>
                    <span className="text-sm font-bold tracking-wide">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative pt-48 pb-24 px-4 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-3">
              <h2 className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-sm">Welcome to my space</h2>
              <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Jitesh Borse</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                Building scalable full-stack applications with MERN and modern web technologies, focused on clean code, solid system design, and impactful real-world solutions.
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              <button onClick={() => scrollTo('projects')} className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-700 hover:shadow-xl transition-all active:scale-95 group">
                Explore Work <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4">
                <SocialIcon icon={<Github size={22} />} href="https://github.com/jiteshborse" />
                <SocialIcon icon={<Linkedin size={22} />} href="https://www.linkedin.com/in/jiteshborse8083/" />
                <SocialIcon icon={<Mail size={22} />} href="mailto:jitesh.borse007@gmail.com" />
              </div>
            </div>
          </div>
          <div className="relative group animate-in fade-in zoom-in duration-1000">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-white shadow-2xl animate-float flex-shrink-0">
              <img src="https://image2url.com/r2/default/images/1769503442599-fa607461-3407-4adb-b139-9262c38e313e.jpeg" alt="Jitesh Borse" className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <RevealSection className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">About Me</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-center gap-4 text-indigo-600 mb-8">
                <div className="p-3 bg-indigo-50 rounded-2xl group-hover:scale-110 transition-transform"><GraduationCap size={28} /></div>
                <h3 className="text-xl font-bold">Academic Path</h3>
              </div>
              <div className="space-y-8">
                <div className="relative pl-6 border-l-2 border-slate-200 hover:border-indigo-400 transition-colors">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-600"></div>
                  <h4 className="font-bold text-lg">Master of Computer Application</h4>
                  <p className="text-slate-700 font-medium">MIT World Peace University</p>
                  <div className="flex justify-between text-sm text-slate-500 mt-1"><span>Pune, India</span><span className="text-indigo-600 font-semibold italic">Expected 2026</span></div>
                  <p className="text-indigo-600/80 font-bold text-sm mt-2 bg-indigo-50 w-fit px-3 py-1 rounded-lg">CGPA: 7.82 / 10.00</p>
                </div>
                <div className="relative pl-6 border-l-2 border-slate-200 hover:border-indigo-400 transition-colors">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-300 group-hover:border-indigo-400 transition-colors"></div>
                  <h4 className="font-bold text-lg">Bachelor of Computer Application</h4>
                  <p className="text-slate-700 font-medium">K.T.H.M. College</p>
                  <div className="flex justify-between text-sm text-slate-500 mt-1"><span>Nashik, India</span><span className="text-slate-400 font-medium">2020 - 2023</span></div>
                  <p className="text-indigo-600/80 font-bold text-sm mt-2 bg-indigo-50 w-fit px-3 py-1 rounded-lg">CGPA: 7.31 / 10.00</p>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-purple-100 hover:bg-white hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-center gap-4 text-purple-600 mb-8">
                <div className="p-3 bg-purple-50 rounded-2xl group-hover:scale-110 transition-transform"><User size={28} /></div>
                <h3 className="text-xl font-bold">Personality Summary</h3>
              </div>
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed text-lg">
                  I am an MCA student (Batch 2024–26) at MIT World Peace University, aspiring to build a career in Software Engineering. 
                  I have a strong foundation in <span className="text-indigo-600 font-semibold">Java, C++, SQL</span>, and hands-on experience with <span className="text-indigo-600 font-semibold">MERN Stack</span> development.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Recently, I secured <span className="font-bold text-slate-900">3rd place</span> among 90 teams at <span className="italic">HackMIT'25 IDEATHON</span> and won the 1st Appreciation Prize, gaining valuable experience in teamwork and problem-solving.
                </p>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-50">
        <RevealSection className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Core Competencies</h2>
            <p className="text-slate-500">The technical toolkit I bring to every project.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCard icon={<Code2 className="text-blue-500" />} title="Languages" skills={["Java", "C++", "Python", "JavaScript", "PHP"]} delay="0" />
            <SkillCard icon={<Globe className="text-emerald-500" />} title="Frontend" skills={["React.js", "Next.js", "HTML5/CSS3", "Tailwind CSS"]} delay="100" />
            <SkillCard icon={<Terminal className="text-orange-500" />} title="Backend" skills={["Node.js", "PHP"]} delay="200" />
            <SkillCard icon={<Database className="text-purple-500" />} title="Databases" skills={["MySQL", "MongoDB", "Supabase"]} delay="300" />
            <SkillCard icon={<Cpu className="text-indigo-500" />} title="Tools" skills={["Git", "GitHub", "VS Code", "Postman"]} delay="400" />
            <SkillCard icon={<Award className="text-rose-500" />} title="Fundamentals" skills={["Basic Data Structures & Algorithms", "Object-Oriented Programming"]} delay="500" />
          </div>
        </RevealSection>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 bg-white">
        <RevealSection className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Achievements & Recognition</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto mb-6"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="group bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 translate-x-8 translate-y-[-8px] transition-opacity"><Trophy size={200} className="text-indigo-600" /></div>
              <div className="relative flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="p-5 bg-indigo-50 text-indigo-600 rounded-3xl group-hover:scale-110 transition-transform shadow-sm"><Trophy size={40} /></div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">HackMIT'25 IDEATHON</h3>
                      <div className="flex items-center gap-3 mt-1 text-slate-500 font-semibold"><span>📅 2025</span><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span><span className="text-orange-500 flex items-center gap-1 uppercase tracking-wider text-xs font-bold"><Zap size={14} /> 3rd Place Winner</span></div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">Secured 3rd Place & Won 1st Appreciation Prize out of 90 teams at HackMIT'25 IDEATHON as Team Leader of TECH-MITians.</p>
                <div className="grid sm:grid-cols-2 gap-10">
                  <div>
                    <div className="flex items-center gap-3 text-indigo-600 font-extrabold text-sm uppercase tracking-widest mb-4"><Users size={18} /> Team Members</div>
                    <div className="grid grid-cols-2 gap-3">
                      {["Rutuja Jadhav", "Nitin Govardhane", "Viren Shende", "Atharv Kulkarni"].map(name => (
                        <div key={name} className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 text-slate-700 text-sm font-semibold group-hover:bg-white group-hover:border-indigo-100 transition-colors">{name}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-purple-600 font-extrabold text-sm uppercase tracking-widest mb-4"><Star size={18} /> Mentors & Guides</div>
                    <div className="flex flex-wrap gap-3">
                      {["Dr. Jalindar Gandal Sir", "Dr. Swapnil Goje Sir"].map(name => (
                        <div key={name} className="bg-purple-50 px-4 py-2.5 rounded-xl border border-purple-100 text-purple-700 text-sm font-semibold transition-all cursor-default">
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-50">
        <RevealSection className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">Featured Projects</h2>
              <p className="text-slate-500 max-w-md">Highlighting my technical depth through web development.</p>
            </div>
            <div className="flex bg-slate-100/80 p-1.5 rounded-2xl backdrop-blur-sm">
              <a href="https://github.com/jiteshborse" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white text-indigo-600 shadow-lg shadow-indigo-100 transition-all flex items-center gap-2 hover:bg-indigo-50">All Work <Github size={16} /></a>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((proj, idx) => (
              <ProjectCard key={idx} {...proj} />
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent -z-10"></div>
        <RevealSection className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-5xl font-bold tracking-tight leading-tight">Ready to build something <span className="text-indigo-400">extraordinary?</span></h2>
                <p className="text-slate-400 text-xl leading-relaxed">I'm currently available for internships and freelance projects. Let's start a conversation.</p>
              </div>
              <div className="space-y-6">
                <ContactInfo icon={<Mail />} text="jitesh.borse007@gmail.com" href="mailto:jitesh.borse007@gmail.com" />
                <ContactInfo icon={<Linkedin />} text="linkedin.com/in/jiteshborse8083" href="https://www.linkedin.com/in/jiteshborse8083/" />
                <ContactInfo icon={<Github />} text="github.com/jiteshborse" href="https://github.com/jiteshborse" />
              </div>
            </div>

            <div className="relative">
              {formStatus === 'success' ? (
                <div className="bg-white/5 p-10 rounded-[3rem] backdrop-blur-md border border-green-500/30 text-center space-y-4 animate-in zoom-in duration-300">
                  <div className="mx-auto w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-slate-400">Thank you, I'll get back to you shortly.</p>
                  <button onClick={() => setFormStatus('idle')} className="mt-4 text-indigo-400 font-bold hover:underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="bg-white/5 p-10 rounded-[3rem] backdrop-blur-md border border-white/10 space-y-6 shadow-2xl transition-all hover:border-indigo-500/30 group/form">
                  <input type="hidden" name="_subject" value="New Portfolio Contact Submission" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Name</label>
                      <input required name="name" type="text" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white hover:bg-slate-800/80" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</label>
                      <input required name="email" type="email" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white hover:bg-slate-800/80" placeholder="Email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Message</label>
                    <textarea required name="message" rows={4} className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-white hover:bg-slate-800/80" placeholder="How can I help?"></textarea>
                  </div>
                  {formStatus === 'error' && (
                    <div className="flex items-center gap-2 text-rose-400 text-sm font-medium animate-in slide-in-from-top-2">
                      <AlertCircle size={16} /> Something went wrong. Please try again.
                    </div>
                  )}
                  <button 
                    disabled={formStatus === 'loading'}
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white disabled:text-slate-400 font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-lg group overflow-hidden relative active:scale-[0.98]"
                  >
                    {formStatus === 'loading' ? (
                      <><Loader2 className="animate-spin" size={20} /> Sending...</>
                    ) : (
                      <>Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div 
            onClick={() => scrollTo('home')} 
            className="text-2xl font-bold tracking-tighter text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors"
          >
            JB
          </div>
          <p className="text-slate-500 text-sm">© 2025 Jitesh Borse | Crafted with passion & love.</p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/jiteshborse8083/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com/jiteshborse" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sub-components
interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    {icon}
  </a>
);

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  delay: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, skills, delay }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div 
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100 group transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="p-4 bg-slate-50 rounded-2xl w-fit mb-6 group-hover:bg-indigo-50 group-hover:scale-110 transition-all">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
      </div>
      <h3 className="font-bold text-xl mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span key={skill} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100 group-hover:border-indigo-100 transition-colors">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

interface ProjectCardProps extends Project {}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, desc, tech, link, isPrivate }) => (
  <div className="group border-2 border-slate-100 rounded-[3rem] p-10 hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 relative overflow-hidden bg-slate-50/50 flex flex-col h-full">
    <div className="space-y-6 flex-grow">
      <div className="flex gap-2 flex-wrap">
        {tech.map(t => (
          <span key={t} className="text-[10px] uppercase tracking-widest text-indigo-500 font-extrabold bg-indigo-50 px-3 py-1 rounded-full">
            {t}
          </span>
        ))}
      </div>
      <h3 className="text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-lg">{desc}</p>
    </div>
    <div className="mt-8">
      {isPrivate ? (
        <span className="text-slate-400 font-bold flex items-center gap-2 italic">
          <Lock size={16} /> Private Repository
        </span>
      ) : (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 font-bold inline-flex items-center gap-2 border-b-2 border-transparent hover:border-indigo-600 pb-1 transition-all"
        >
          View on GitHub <ChevronRight size={18} />
        </a>
      )}
    </div>
  </div>
);

interface ContactInfoProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, text, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group cursor-pointer transition-all duration-300">
    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/30 transition-all duration-300">
      {React.cloneElement(icon as React.ReactElement<any>, { size: 24, className: "text-indigo-400 group-hover:text-indigo-300 transition-colors" })}
    </div>
    <span className="text-slate-300 text-lg font-medium tracking-tight group-hover:text-white group-hover:translate-x-1 transition-all duration-300">{text}</span>
  </a>
);

export default App;