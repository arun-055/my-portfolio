'use client';
import { useState, useEffect } from 'react';

const roles = ['Software Developer','Problem Solver','AI Enthusiast','Full-Stack Builder'];

export default function TypingText() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const cur = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && pos <= cur.length) {
      t = setTimeout(() => { setText(cur.slice(0, pos)); setPos(p => p+1); }, 80);
    } else if (!del && pos > cur.length) {
      t = setTimeout(() => setDel(true), 1800);
    } else if (del && pos >= 0) {
      t = setTimeout(() => { setText(cur.slice(0, pos)); setPos(p => p-1); }, 45);
    } else {
      setDel(false); setIdx(i => (i+1) % roles.length); setPos(0);
    }
    return () => clearTimeout(t);
  }, [pos, del, idx]);

  return (
    <span>
      <span style={{ fontFamily:'Orbitron,sans-serif', fontSize:'clamp(1.2rem,3vw,2rem)', fontWeight:700, color:'#00f5ff', textShadow:'0 0 10px #00f5ff,0 0 30px rgba(0,245,255,0.4)' }}>
        {text}
      </span>
      <span className="tcursor" style={{ fontFamily:'Share Tech Mono,monospace', fontSize:'1.6rem' }}>|</span>
    </span>
  );
}
