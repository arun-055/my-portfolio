'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import TypingText from '@/components/TypingText';
import ContactForm from '@/components/ContactForm';

const LaptopScene = dynamic(() => import('@/components/LaptopScene'), { ssr: false });

/* ── DATA ─────────────────────────────────────────────────────────────── */

const skills = [
  { label: 'C++ / Java',               level: 88, color: '#00f5ff' },
  { label: 'JavaScript / TypeScript',   level: 90, color: '#39ff14' },
  { label: 'React / Next.js',           level: 87, color: '#00f5ff' },
  { label: 'Node.js / Express',         level: 85, color: '#39ff14' },
  { label: 'MongoDB / MySQL',           level: 80, color: '#bf00ff' },
  { label: 'DSA / Problem Solving',     level: 92, color: '#ff6b35' },
];

const techLogos = [
  { name:'HTML',         icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name:'CSS',          icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name:'JavaScript',   icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name:'React',        icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name:'Node.js',      icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name:'MongoDB',      icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name:'MySQL',        icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name:'C++',          icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name:'Java',         icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name:'Tailwind',     icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name:'GitHub',       icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name:'Postman',      icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  { name:'JWT',          icon:'https://cdn.auth0.com/website/sdks/logos/jwt_logo.svg' },
  { name:'Redis',        icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
];

const projects = [
  {
    title: 'Blibli',
    sub: 'Real-Time Video Call & Messaging Platform',
    desc: 'Built real-time messaging and video communication with JWT authentication and role-based access control. Designed scalable RESTful APIs and optimized MongoDB queries with indexing to reduce latency.',
    tech: ['Node.js','Express.js','MongoDB','React','getStream API','JWT'],
    github: 'https://github.com/arun-055',
    live: '#',
    accent: '#00f5ff',
    icon: '📡',
  },
  {
    title: 'Signalist',
    sub: 'AI-Driven Stock Analytics Platform',
    desc: 'AI-powered real-time stock analysis SSR web app. Integrated TradingView APIs for live financial data. Automated AI-generated insights via email with Nodemailer and event-driven workflows with Inngest.',
    tech: ['Next.js','TypeScript','Inngest','Nodemailer','Better-Auth','AI APIs'],
    github: 'https://github.com/arun-055',
    live: '#',
    accent: '#bf00ff',
    icon: '📈',
  },
  {
    title: 'Smart Route Planner',
    sub: 'Path Optimization System',
    desc: "Dijkstra's algorithm with optimized adjacency list. Integrated backend APIs with frontend map visualization. Structured testing to validate correctness across all graph edge cases.",
    tech: ['React','Node.js','Express.js',"Dijkstra's Algo"],
    github: 'https://github.com/arun-055',
    live: '#',
    accent: '#39ff14',
    icon: '🗺️',
  },
];

// Education top → bottom = newest → oldest
const education = [
  { year:'2022 – 2024', degree:'Master of Computer Applications (MCA)',  inst:'College of IT & Management Education, Bhubaneswar', score:'CGPA: 7.65',  side:'left',  color:'#00f5ff' },
  { year:'2021',        degree:'IIT JAM — Physics',                       inst:'Qualified — M.Sc. offer from NIT Rourkela',         score:'Qualified',   side:'right', color:'#ff6b35' },
  { year:'2016 – 2019', degree:'Bachelor of Science (B.Sc.)',             inst:'S.N. College, Rajkanika',                           score:'61.76%',      side:'left',  color:'#bf00ff' },
  { year:'2014 – 2016', degree:'Intermediate (12th)',                     inst:'S.N. College, Rajkanika',                           score:'64.83%',      side:'right', color:'#00f5ff' },
  { year:'2013 – 2014', degree:'Matriculation (10th)',                    inst:'Taras High School, Taras',                          score:'68.66%',      side:'left',  color:'#39ff14' },
];

const achievements = [
  { icon:'🏆', text:'Ranked #1 at institute level on GeeksforGeeks' },
  { icon:'🎓', text:'Cleared IIT JAM Physics (2021) — M.Sc. offer from NIT Rourkela' },
  { icon:'💡', text:'500+ DSA problems solved on LeetCode & GeeksforGeeks' },
  { icon:'📜', text:'IBM Certified: Back-End Apps with Node.js & Express (Coursera)' },
];

/* ── PAGE ─────────────────────────────────────────────────────────────── */

export default function Home() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const skillsRef  = useRef<HTMLElement>(null);
  const [mounted, setMounted]         = useState(false);
  const [skillsVis, setSkillsVis]     = useState(false);

  /* cursor */
  useEffect(() => {
    setMounted(true);
    const move = (e: MouseEvent) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX+'px'; cursorRef.current.style.top = e.clientY+'px'; }
      setTimeout(() => {
        if (ringRef.current) { ringRef.current.style.left = e.clientX+'px'; ringRef.current.style.top = e.clientY+'px'; }
      }, 80);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* skills intersection */
  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVis(true); }, { threshold: 0.2 });
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── JSX ── */
  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section id="home" className="hero-bg grid-bg" style={{ minHeight:'100vh', display:'flex', alignItems:'center', padding:'100px 40px 60px', position:'relative', overflow:'hidden' }}>

        {/* ambient orbs */}
        <div style={{ position:'absolute', top:'12%', left:'2%', width:'480px', height:'480px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,245,255,0.06) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'3%', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(191,0,255,0.06) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div style={{ maxWidth:'1200px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'center' }} className="hero-grid">

          {/* LEFT */}
          <div style={{ animation: mounted ? 'slideUp 0.9s ease forwards' : 'none', opacity:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'22px' }}>
              <div style={{ width:'38px', height:'1px', background:'#00f5ff', boxShadow:'0 0 6px #00f5ff' }} />
              <span style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.7rem', color:'#00f5ff', letterSpacing:'0.25em' }}>INITIALIZING PORTFOLIO...</span>
            </div>

            <p style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.85rem', color:'#94a3b8', letterSpacing:'0.08em', marginBottom:'6px' }}>Hello, World! I&apos;m</p>

            <h1 style={{ fontFamily:'Orbitron,sans-serif', fontWeight:900, fontSize:'clamp(1.8rem,4vw,3.8rem)', lineHeight:1.1, marginBottom:'8px', whiteSpace:'nowrap', color:'#ffffff', textShadow:'0 0 20px rgba(255,255,255,0.15)' }}>
              Arun Kumar Nath
            </h1>

            <div style={{ marginBottom:'26px', minHeight:'3rem', display:'flex', alignItems:'center', flexWrap:'wrap', gap:'8px' }}>
              <span style={{ fontFamily:'Rajdhani,sans-serif', fontSize:'clamp(1rem,2.5vw,1.3rem)', color:'#94a3b8' }}>I am a</span>
              {mounted && <TypingText />}
            </div>

            <p style={{ color:'#94a3b8', fontSize:'1rem', lineHeight:1.8, maxWidth:'460px', marginBottom:'34px' }}>
              Full-stack developer passionate about high-performance applications, elegant algorithmic solutions, and exploring the frontier of AI. Currently freelancing — let&apos;s build something epic.
            </p>

            <div style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
              <a href="#projects" className="btn btn-fill">VIEW WORK</a>
              <a href="#contact"  className="btn">CONTACT ME</a>
              <a href="https://github.com/arun-055" target="_blank" rel="noreferrer" className="btn">GITHUB</a>
            </div>

            <div style={{ display:'flex', gap:'36px', marginTop:'46px', flexWrap:'wrap' }}>
              {[{n:'500+',l:'Problems Solved'},{n:'3+',l:'Live Projects'},{n:'#1',l:'GFG Rank'}].map(s=>(
                <div key={s.l}>
                  <div style={{ fontFamily:'Orbitron,sans-serif', fontSize:'1.6rem', fontWeight:900, color:'#00f5ff', textShadow:'0 0 15px #00f5ff' }}>{s.n}</div>
                  <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.62rem', color:'#94a3b8', letterSpacing:'0.1em', marginTop:'3px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D Laptop */}
          <div style={{ height:'560px', position:'relative', animation: mounted ? 'fadeIn 1.3s ease forwards' : 'none', opacity:0 }}>
            {/* orbit rings */}
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'460px', height:'460px', border:'1px solid rgba(0,245,255,0.07)', borderRadius:'50%', animation:'orbitSpin 24s linear infinite', pointerEvents:'none' }}>
              <div style={{ position:'absolute', top:'-5px', left:'50%', width:'10px', height:'10px', borderRadius:'50%', background:'#00f5ff', boxShadow:'0 0 12px #00f5ff,0 0 24px rgba(0,245,255,0.5)' }} />
            </div>
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'350px', height:'350px', border:'1px solid rgba(191,0,255,0.06)', borderRadius:'50%', animation:'orbitSpin 17s linear infinite reverse', pointerEvents:'none' }}>
              <div style={{ position:'absolute', bottom:'-4px', left:'28%', width:'7px', height:'7px', borderRadius:'50%', background:'#bf00ff', boxShadow:'0 0 10px #bf00ff' }} />
            </div>

            {mounted && <LaptopScene />}

            <div style={{ position:'absolute', bottom:'18px', left:'50%', transform:'translateX(-50%)', width:'200px', height:'18px', background:'radial-gradient(ellipse,rgba(0,245,255,0.3) 0%,transparent 70%)', filter:'blur(6px)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:'12px', left:'50%', transform:'translateX(-50%)', fontFamily:'Share Tech Mono,monospace', fontSize:'0.56rem', color:'rgba(0,245,255,0.45)', letterSpacing:'0.3em', whiteSpace:'nowrap' }}>
              DRAG TO ROTATE
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div style={{ position:'absolute', bottom:'26px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
          <span style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.58rem', color:'rgba(0,245,255,0.35)', letterSpacing:'0.3em' }}>SCROLL DOWN</span>
          <div style={{ width:'1px', height:'36px', background:'linear-gradient(to bottom,#00f5ff,transparent)', animation:'pulse 2s ease infinite' }} />
        </div>
      </section>

      {/* ══ ABOUT ═════════════════════════════════════════════════════ */}
      <section id="about" style={{ padding:'90px 40px', background:'#030712' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <SectionTitle title="About Me" />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'start', marginTop:'60px' }} className="two-col">
            <div>
              <p style={{ color:'#94a3b8', fontSize:'1.04rem', lineHeight:1.85, marginBottom:'18px' }}>
                I&apos;m a <span style={{ color:'#00f5ff', fontWeight:600 }}>full-stack developer</span> with a deep love for algorithmic problem-solving and production-grade applications. My journey began in Physics — I qualified IIT JAM and got an M.Sc. offer from NIT Rourkela — before pivoting to Computer Science.
              </p>
              <p style={{ color:'#94a3b8', fontSize:'1.04rem', lineHeight:1.85, marginBottom:'34px' }}>
                I specialize in <span style={{ color:'#39ff14' }}>Node.js backends</span>, <span style={{ color:'#00f5ff' }}>React/Next.js frontends</span>, and scalable system design. Currently working as a <span style={{ color:'#bf00ff' }}>Freelance Developer</span> — crafting digital experiences under real constraints.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {achievements.map(a=>(
                  <div key={a.text} className="cyber-card" style={{ padding:'13px 18px', display:'flex', alignItems:'center', gap:'14px', borderRadius:'4px' }}>
                    <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{a.icon}</span>
                    <span style={{ color:'#94a3b8', fontSize:'0.92rem', lineHeight:1.5 }}>{a.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* profile card */}
            <div className="cyber-card" style={{ padding:'34px', borderRadius:'4px', position:'relative', border:'1px solid rgba(0,245,255,0.2) !important' }}>
              <Corner />
              <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.66rem', color:'#00f5ff', letterSpacing:'0.2em', marginBottom:'22px' }}>// PROFILE.JSON</div>
              {[
                {k:'name',      v:'"Arun Kumar Nath"',        c:'#39ff14'},
                {k:'role',      v:'"Freelance Developer"',    c:'#00f5ff'},
                {k:'available', v:'true',                     c:'#39ff14'},
                {k:'location',  v:'"Bhubaneswar, India"',     c:'#94a3b8'},
                {k:'education', v:'"MCA — CGPA 7.65"',        c:'#94a3b8'},
                {k:'email',     v:'"arun.nath2234@gmail.com"',c:'#bf00ff'},
                {k:'gfg_rank',  v:'"#1 (Institute)"',         c:'#ff6b35'},
              ].map(({k,v,c})=>(
                <div key={k} style={{ display:'flex', gap:'6px', marginBottom:'9px', fontFamily:'Share Tech Mono,monospace', fontSize:'0.8rem', flexWrap:'wrap' }}>
                  <span style={{ color:'#94a3b8' }}>&nbsp;&nbsp;</span>
                  <span style={{ color:'#00f5ff' }}>&quot;{k}&quot;</span>
                  <span style={{ color:'#94a3b8' }}>:</span>
                  <span style={{ color:c }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop:'18px', height:'1px', background:'rgba(0,245,255,0.08)' }} />
              <div style={{ marginTop:'16px', display:'flex', flexWrap:'wrap', gap:'7px' }}>
                {['Node.js','React','Next.js','TypeScript','MongoDB','Express','C++','Java'].map(t=>(
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ════════════════════════════════════════════════════ */}
      <section id="skills" style={{ padding:'90px 40px', background:'rgba(0,245,255,0.012)' }} ref={skillsRef}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <SectionTitle title="Skills" />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', marginTop:'60px' }} className="two-col">
            {/* bars */}
            <div style={{ display:'flex', flexDirection:'column', gap:'26px' }}>
              {skills.map((s,i)=>(
                <div key={s.label}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'7px' }}>
                    <span style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.76rem', color:'#e2e8f0' }}>{s.label}</span>
                    <span style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.7rem', color:s.color }}>{s.level}%</span>
                  </div>
                  <div style={{ height:'3px', background:'rgba(255,255,255,0.06)', borderRadius:'2px', overflow:'hidden' }}>
                    <div style={{ height:'100%', width: skillsVis ? `${s.level}%` : '0%', background:`linear-gradient(90deg,${s.color},${s.color}66)`, boxShadow:`0 0 8px ${s.color}`, borderRadius:'2px', transition:`width 1.6s ease ${i*0.12}s` }} />
                  </div>
                </div>
              ))}
            </div>
            {/* tags */}
            <div>
              {[
                {cat:'LANGUAGES',       items:['C++','Java','JavaScript','TypeScript']},
                {cat:'FRONTEND',        items:['React.js','Next.js','HTML5','CSS3','Tailwind CSS']},
                {cat:'BACKEND',         items:['Node.js','Express.js','Spring Boot','REST APIs','WebSocket','JWT']},
                {cat:'DATABASE',        items:['MongoDB','MySQL']},
                {cat:'TOOLS & DEPLOY',  items:['Git','GitHub','Postman','VS Code','IntelliJ','Vercel','Render']},
              ].map(({cat,items})=>(
                <div key={cat} style={{ marginBottom:'20px' }}>
                  <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.6rem', color:'#00f5ff', letterSpacing:'0.2em', marginBottom:'9px' }}>// {cat}</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    {items.map(item=><span key={item} className="tag">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TECHNOLOGIES ══════════════════════════════════════════════ */}
      <section id="technologies" style={{ padding:'90px 40px', background:'#030712' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <SectionTitle title="Technologies" />
          <p style={{ color:'#94a3b8', fontFamily:'Share Tech Mono,monospace', fontSize:'0.75rem', letterSpacing:'0.1em', marginTop:'10px', marginBottom:'50px' }}>
            // TECH STACK I WORK WITH
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:'16px' }} className="tech-grid">
            {techLogos.map(t=>(
              <div key={t.name} className="tech-logo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.icon} alt={t.name} width={40} height={40}
                  onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/40x40/0a1628/00f5ff?text=${t.name[0]}`; }}
                />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══════════════════════════════════════════════════ */}
      <section id="projects" style={{ padding:'90px 40px', background:'rgba(0,245,255,0.01)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <SectionTitle title="Projects" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'22px', marginTop:'60px' }} className="proj-grid">
            {projects.map(p=>(
              <div key={p.title} className="cyber-card" style={{ borderRadius:'4px', display:'flex', flexDirection:'column', overflow:'hidden' }}>
                <div style={{ height:'3px', background:`linear-gradient(90deg,${p.accent},transparent)`, boxShadow:`0 0 14px ${p.accent}55` }} />
                <div style={{ padding:'26px', flex:1, display:'flex', flexDirection:'column' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
                    <div>
                      <div style={{ fontSize:'1.8rem', marginBottom:'8px' }}>{p.icon}</div>
                      <h3 style={{ fontFamily:'Orbitron,sans-serif', fontWeight:700, fontSize:'1.05rem', color:'#e2e8f0', marginBottom:'4px' }}>{p.title}</h3>
                      <p style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.62rem', color:p.accent, letterSpacing:'0.04em' }}>{p.sub}</p>
                    </div>
                    <div style={{ display:'flex', gap:'7px', flexShrink:0 }}>
                      {[{l:'GH',h:p.github},{l:'↗',h:p.live}].map(b=>(
                        <a key={b.l} href={b.h} target="_blank" rel="noreferrer"
                          style={{ width:'30px',height:'30px',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',color:'#94a3b8',textDecoration:'none',fontSize:'0.72rem',transition:'all 0.2s',fontFamily:'Share Tech Mono,monospace' }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor=p.accent;e.currentTarget.style.color=p.accent;}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='#94a3b8';}}
                        >{b.l}</a>
                      ))}
                    </div>
                  </div>
                  <p style={{ color:'#94a3b8', fontSize:'0.87rem', lineHeight:1.75, marginBottom:'18px', flex:1 }}>{p.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    {p.tech.map(t=><span key={t} className="tag" style={{ borderColor:`${p.accent}35`, color:p.accent }}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EDUCATION ═════════════════════════════════════════════════ */}
      <section id="education" style={{ padding:'90px 40px', background:'rgba(0,0,20,0.5)' }}>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>
          <SectionTitle title="Education" />

          <div style={{ position:'relative', marginTop:'80px' }}>
            {/* glow spine */}
            <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', top:0, bottom:0, width:'2px', background:'linear-gradient(to bottom,transparent 0%,#00f5ff 8%,#00f5ff 92%,transparent)', boxShadow:'0 0 14px rgba(0,245,255,0.45)', zIndex:1 }} />
            {/* scan line */}
            <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', top:0, width:'2px', height:'55px', background:'linear-gradient(to bottom,transparent,rgba(0,245,255,0.9),transparent)', animation:'scanDown 4s linear infinite', zIndex:2 }} />

            {education.map((e,i)=>(
              <div key={e.degree} style={{ display:'grid', gridTemplateColumns:'1fr 40px 1fr', alignItems:'center', marginBottom: i<education.length-1 ? '68px' : '40px', position:'relative' }}>

                {/* LEFT slot */}
                <div style={{ display:'flex', justifyContent:'flex-end', paddingRight:'22px' }}>
                  {e.side==='left' ? (
                    <EduCard e={e} />
                  ) : (
                    /* connector line pointing LEFT toward dot when card is on right */
                    <div style={{ width:'100%', display:'flex', justifyContent:'flex-end', alignItems:'center' }}>
                      <div style={{ width:'55%', height:'1px', background:`linear-gradient(to left,${e.color},transparent)` }} />
                    </div>
                  )}
                </div>

                {/* CENTER dot */}
                <div style={{ display:'flex', justifyContent:'center', zIndex:3 }}>
                  <div style={{ width:'14px', height:'14px', background:'#030712', border:`2px solid ${e.color}`, borderRadius:'50%', boxShadow:`0 0 10px ${e.color},0 0 22px ${e.color}66`, animation:'dotGlow 2.5s ease-in-out infinite', flexShrink:0 }} />
                </div>

                {/* RIGHT slot */}
                <div style={{ display:'flex', justifyContent:'flex-start', paddingLeft:'22px' }}>
                  {e.side==='right' ? (
                    <EduCard e={e} />
                  ) : (
                    /* connector line pointing RIGHT toward dot when card is on left */
                    <div style={{ width:'100%', display:'flex', justifyContent:'flex-start', alignItems:'center' }}>
                      <div style={{ width:'55%', height:'1px', background:`linear-gradient(to right,${e.color},transparent)` }} />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ display:'flex', justifyContent:'center', marginTop:'24px' }}>
              <span style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.6rem', color:'#00f5ff', padding:'5px 14px', border:'1px solid rgba(0,245,255,0.22)', background:'rgba(0,245,255,0.04)', letterSpacing:'0.2em' }}>ORIGIN POINT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding:'90px 40px', background:'#030712' }}>
        <div style={{ maxWidth:'1060px', margin:'0 auto' }}>
          <SectionTitle title="Contact" />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'56px', alignItems:'start', marginTop:'60px' }} className="two-col">
            <div>
              <h3 style={{ fontFamily:'Orbitron,sans-serif', fontSize:'1.35rem', fontWeight:700, color:'#e2e8f0', marginBottom:'14px', lineHeight:1.4 }}>
                Let&apos;s Build Something <span style={{ color:'#00f5ff', textShadow:'0 0 14px #00f5ff' }}>Epic</span>
              </h3>
              <p style={{ color:'#94a3b8', fontSize:'0.98rem', lineHeight:1.8, marginBottom:'30px' }}>
                Open to freelance projects, full-time roles, and exciting collaborations. Got an idea? Let&apos;s connect.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'11px' }}>
                {[
                  {icon:'📧', label:'EMAIL',    val:'arun.nath2234@gmail.com'},
                  {icon:'📱', label:'PHONE',    val:'+91-7978619372'},
                  {icon:'💼', label:'LINKEDIN', val:'linkedin.com/arun25025'},
                  {icon:'🐙', label:'GITHUB',   val:'github.com/arun-055'},
                ].map(({icon,label,val})=>(
                  <div key={label} className="cyber-card" style={{ padding:'12px 16px', display:'flex', alignItems:'center', gap:'13px', borderRadius:'4px' }}>
                    <span style={{ fontSize:'1rem', flexShrink:0 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.58rem', color:'#00f5ff', letterSpacing:'0.14em' }}>{label}</div>
                      <div style={{ color:'#94a3b8', fontSize:'0.86rem', marginTop:'2px' }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cyber-card" style={{ padding:'34px', borderRadius:'4px', position:'relative', border:'1px solid rgba(0,245,255,0.18) !important' }}>
              <Corner />
              <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.66rem', color:'#00f5ff', letterSpacing:'0.2em', marginBottom:'24px' }}>// SEND_MESSAGE()</div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════ */}
      <footer style={{ borderTop:'1px solid rgba(0,245,255,0.07)', padding:'26px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'14px' }}>
        <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.7rem', color:'#94a3b8' }}>
          <span style={{ color:'#00f5ff' }}>©</span> 2025 Arun Kumar Nath · All rights reserved.
        </div>
        <div style={{ display:'flex', gap:'18px', flexWrap:'wrap' }}>
          {[{l:'GitHub',h:'https://github.com/arun-055'},{l:'LinkedIn',h:'#'},{l:'LeetCode',h:'#'},{l:'GFG',h:'#'}].map(s=>(
            <a key={s.l} href={s.h} target="_blank" rel="noreferrer" className="nav-link" style={{ fontSize:'0.68rem' }}>{s.l}</a>
          ))}
        </div>
      </footer>

      {/* ── RESPONSIVE OVERRIDES ─────────────────────────────────────── */}
      <style jsx global>{`
        .hero-grid   { grid-template-columns: 1fr 1fr; }
        .two-col     { grid-template-columns: 1fr 1fr; }
        .proj-grid   { grid-template-columns: repeat(3,1fr); }
        .tech-grid   { grid-template-columns: repeat(7,1fr); }

        @media (max-width: 1024px) {
          .proj-grid { grid-template-columns: repeat(2,1fr) !important; }
          .tech-grid { grid-template-columns: repeat(5,1fr) !important; }
        }
        @media (max-width: 768px) {
          .hero-grid  { grid-template-columns: 1fr !important; }
          .hero-grid > div:nth-child(2) { height: 340px !important; order: -1; }
          .two-col    { grid-template-columns: 1fr !important; }
          .proj-grid  { grid-template-columns: 1fr !important; }
          .tech-grid  { grid-template-columns: repeat(4,1fr) !important; }
          nav { padding: 14px 20px !important; }
          section { padding: 60px 20px !important; }
          footer  { padding: 20px !important; }
        }
        @media (max-width: 480px) {
          .tech-grid { grid-template-columns: repeat(3,1fr) !important; }
        }
      `}</style>
    </>
  );
}

/* ── SMALL HELPERS ─────────────────────────────────────────────────────── */

function SectionTitle({ title }: { title: string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
      <h2 className="sec-title" style={{ fontSize:'clamp(1.4rem,3vw,2.3rem)' }}>
        <span style={{ color:'#00f5ff' }}>&lt;</span> {title} <span style={{ color:'#00f5ff' }}>/&gt;</span>
      </h2>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,rgba(0,245,255,0.3),transparent)' }} />
    </div>
  );
}

function Corner() {
  return (
    <>
      <div style={{ position:'absolute', top:0, left:0, width:'16px', height:'16px', borderTop:'2px solid #00f5ff', borderLeft:'2px solid #00f5ff' }} />
      <div style={{ position:'absolute', bottom:0, right:0, width:'16px', height:'16px', borderBottom:'2px solid #00f5ff', borderRight:'2px solid #00f5ff' }} />
    </>
  );
}

function EduCard({ e }: { e: typeof education[0] }) {
  return (
    <div className="cyber-card" style={{ width:'100%', padding:'20px 22px', borderRadius:'4px', border:`1px solid ${e.color}35 !important`, boxShadow:`0 0 18px ${e.color}08` }}>
      <div style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.63rem', color:e.color, letterSpacing:'0.14em', marginBottom:'7px' }}>{e.year}</div>
      <h3 style={{ fontFamily:'Orbitron,sans-serif', fontWeight:700, fontSize:'0.82rem', color:'#e2e8f0', marginBottom:'6px', lineHeight:1.4 }}>{e.degree}</h3>
      <p style={{ color:'#94a3b8', fontSize:'0.8rem', lineHeight:1.5, marginBottom:'10px' }}>{e.inst}</p>
      <span style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'0.68rem', color:e.color, padding:'3px 9px', border:`1px solid ${e.color}45`, display:'inline-block', borderRadius:'2px' }}>{e.score}</span>
    </div>
  );
}
