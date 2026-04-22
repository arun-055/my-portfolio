'use client';
import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'err'>('idle');
  const [msg, setMsg] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await r.json();
      if (r.ok) { setStatus('ok'); setMsg(d.message); setForm({ name:'', email:'', message:'' }); }
      else { setStatus('err'); setMsg(d.error || 'Something went wrong'); }
    } catch { setStatus('err'); setMsg('Network error. Try again.'); }
  };

  return (
    <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }} className="form-grid">
        {[
          { key:'name',  label:'// NAME',  type:'text',  ph:'Arun Kumar' },
          { key:'email', label:'// EMAIL', type:'email', ph:'you@example.com' },
        ].map(f => (
          <div key={f.key}>
            <label style={{ display:'block', fontFamily:'Share Tech Mono,monospace', fontSize:'0.65rem', color:'#00f5ff', letterSpacing:'0.15em', marginBottom:'7px' }}>{f.label}</label>
            <input className="inp" type={f.type} placeholder={f.ph} value={form[f.key as 'name'|'email']}
              onChange={e => setForm({...form, [f.key]: e.target.value})} required />
          </div>
        ))}
      </div>
      <div>
        <label style={{ display:'block', fontFamily:'Share Tech Mono,monospace', fontSize:'0.65rem', color:'#00f5ff', letterSpacing:'0.15em', marginBottom:'7px' }}>// MESSAGE</label>
        <textarea className="inp" placeholder="Tell me about your project or just say hello..."
          value={form.message} onChange={e => setForm({...form, message: e.target.value})}
          required rows={5} style={{ resize:'vertical', minHeight:'120px' }} />
      </div>
      {msg && (
        <div style={{
          padding:'10px 14px', fontFamily:'Share Tech Mono,monospace', fontSize:'0.78rem',
          color: status==='ok' ? '#39ff14' : '#ff6b6b',
          background: status==='ok' ? 'rgba(57,255,20,0.07)' : 'rgba(255,50,50,0.07)',
          border: `1px solid ${status==='ok' ? 'rgba(57,255,20,0.3)' : 'rgba(255,50,50,0.3)'}`,
        }}>
          {status==='ok' ? '✓ ' : '✗ '}{msg}
        </div>
      )}
      <button type="submit" className="btn btn-fill" disabled={status==='loading'} style={{ alignSelf:'flex-start' }}>
        {status==='loading' ? 'TRANSMITTING...' : 'SEND MESSAGE'}
      </button>
      <style jsx>{`
        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </form>
  );
}
