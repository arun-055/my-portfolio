'use client';
import { useState, useEffect } from 'react';

const links = ['Home','About','Skills','Technologies','Projects','Education','Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(3,7,18,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,245,255,0.08)' : 'none',
      transition: 'all 0.4s',
    }}>
      
      <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: '1.1rem' }}>
        <span style={{ color: '#00f5ff' }}> My Portfolio </span>
      </div>

     
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }} className="desk-nav">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
            <span style={{ color: '#00f5ff', marginRight: '2px', fontSize: '0.6rem' }}>›</span>{l}
          </a>
        ))}
        <a href="https://github.com/arun-055" target="_blank" rel="noreferrer" className="btn" style={{ padding: '7px 16px', fontSize: '0.6rem' }}>
          GITHUB
        </a>
      </div>

      
      <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }} className="hamburger">
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: '22px', height: '2px', background: '#00f5ff', marginBottom: i < 2 ? '5px' : '0',
            transition: 'all 0.3s',
            transform: open ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none') : 'none',
            opacity: open && i===1 ? 0 : 1,
          }} />
        ))}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(3,7,18,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,245,255,0.12)', padding: '20px 40px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" onClick={() => setOpen(false)} style={{ fontSize: '1rem' }}>
              <span style={{ color: '#00f5ff', marginRight: '8px' }}>›</span>{l}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) { .desk-nav { display: flex !important; } .hamburger { display: none !important; } }
        @media (max-width: 767px) { .desk-nav { display: none !important; } .hamburger { display: block !important; } }
      `}</style>
    </nav>
  );
}
