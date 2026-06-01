'use client';
import { useState, useRef } from 'react';
import { ArrowRight, Check, File, MapPin, UploadCloud } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import ModalShell, { ModalHeader } from './ModalShell';
import { btnFilledGold, btnOutlineNavy, inputStyle, wizardLead, modalBodyStyle, modalFooterStyle, Field } from './_shared';

const ISSUES = [
  { id: 'battery', icon: 'battery', label: 'Dead Battery' },
  { id: 'check', icon: 'alert-triangle', label: 'Check Engine Light' },
  { id: 'oil', icon: 'droplets', label: 'Oil Change' },
  { id: 'brakes', icon: 'circle-slash', label: 'Brake Issues' },
  { id: 'tire', icon: 'circle', label: 'Tire Problem' },
  { id: 'ac', icon: 'thermometer', label: 'AC / Heat' },
  { id: 'noise', icon: 'volume-2', label: 'Strange Noise' },
  { id: 'smog', icon: 'wind', label: 'Smog Check' },
  { id: 'overheat', icon: 'flame', label: 'Overheating' },
  { id: 'elec', icon: 'zap', label: 'Electrical Issue' },
  { id: 'trans', icon: 'settings', label: 'Transmission' },
  { id: 'lube', icon: 'layers', label: 'Lube Service' },
  { id: 'other', icon: 'wrench', label: 'Other' },
];
const TIMES = ['7:30 AM','8:30 AM','9:30 AM','10:30 AM','11:30 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
const TITLES: Record<number,{eyebrow:string;title:string}> = {
  1:{eyebrow:'Schedule Service',title:"What needs attention?"},
  2:{eyebrow:'Schedule Service',title:"Tell us about your car"},
  3:{eyebrow:'Schedule Service',title:"Photos or videos (optional)"},
  4:{eyebrow:'Schedule Service',title:"Your contact info"},
  5:{eyebrow:'Confirmed',title:"You're on the schedule"},
};

export default function ServiceRequestWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [issues, setIssues] = useState<string[]>([]);
  const [car, setCar] = useState({ year: '', make: '', model: '', plate: '' });
  const [files, setFiles] = useState<Array<{name:string;size:number}>>([]);
  const [contact, setContact] = useState({ name: '', phone: '', email: '', method: 'phone', notes: '', date: '', time: '' });
  const [ticket, setTicket] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => { setStep(1); setIssues([]); setCar({year:'',make:'',model:'',plate:''}); setFiles([]); setContact({name:'',phone:'',email:'',method:'phone',notes:'',date:'',time:''}); setTicket(''); setError(''); };

  const toggle = (id: string) => setIssues(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);
  const issueLabels = ISSUES.filter(o => issues.includes(o.id)).map(o => o.label);

  const submit = async () => {
    setSubmitting(true); setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DASHBOARD_API_URL}/api/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shop_id:        process.env.NEXT_PUBLIC_SHOP_ID,
          customer_name:  contact.name,
          customer_phone: contact.phone,
          customer_email: contact.email,
          license_plate:  '',
          car_make:       car.make,
          car_model:      car.model,
          car_year:       car.year,
          issues,
          notes:          contact.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong, please try again.'); setSubmitting(false); return; }
      setTicket(data.ticket_number); setStep(5);
    } catch { setError('Something went wrong, please try again.'); }
    setSubmitting(false);
  };

  return (
    <ModalShell open={open} onClose={() => { reset(); onClose(); }} maxWidth={780}>
      <ModalHeader eyebrow={TITLES[step].eyebrow} title={TITLES[step].title} onClose={() => { reset(); onClose(); }} onBack={step > 1 && step < 5 ? () => setStep(step-1) : null} step={step <= 4 ? step : null} totalSteps={step <= 4 ? 4 : null} />

      {/* Step 1 — Issues */}
      {step === 1 && <>
        <div style={modalBodyStyle}>
          <p style={wizardLead}>Pick everything that applies. You can choose more than one.</p>
          <div className="issue-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 18 }}>
            {ISSUES.map(o => { const sel = issues.includes(o.id); return (
              <button key={o.id} onClick={() => toggle(o.id)} style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,padding:'18px 10px',background:sel?'#EAF8FD':'#FFFFFF',border:`1.5px solid ${sel?'#29B9E7':'#E5E5E5'}`,borderRadius:6,cursor:'pointer',color:sel?'#111111':'#3A3833',fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600,fontSize:14,letterSpacing:'0.04em',transition:'all 180ms',position:'relative' }}>
                {sel && <span style={{ position:'absolute',top:6,right:6,width:16,height:16,borderRadius:'50%',background:'#29B9E7',color:'#FFFFFF',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700 }}>✓</span>}
                <DynamicIcon name={o.icon} size={22} style={{ color: sel?'#29B9E7':'#111111' }} />
                <span>{o.label}</span>
              </button>
            );})}
          </div>
        </div>
        <div style={modalFooterStyle}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,letterSpacing:'0.14em',textTransform:'uppercase',color:'#666666' }}>{issues.length} selected</div>
          <button disabled={issues.length===0} onClick={() => setStep(2)} style={{ ...btnFilledGold,padding:'12px 22px',fontSize:13,opacity:issues.length===0?0.4:1,cursor:issues.length===0?'not-allowed':'pointer' }}>Continue <ArrowRight size={14} style={{marginLeft:8,verticalAlign:'-2px'}} /></button>
        </div>
      </>}

      {/* Step 2 — Vehicle */}
      {step === 2 && <>
        <div style={modalBodyStyle}>
          <p style={wizardLead}>Tell us about your vehicle so we can prep before you arrive.</p>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:18 }} className="car-form-grid">
            <Field label="Make"><input type="text" placeholder="e.g. Toyota" value={car.make} onChange={e=>setCar({...car,make:e.target.value})} style={inputStyle} /></Field>
            <Field label="Model"><input type="text" placeholder="e.g. Camry" value={car.model} onChange={e=>setCar({...car,model:e.target.value})} style={inputStyle} /></Field>
            <Field label="Year"><input type="number" placeholder="e.g. 2019" value={car.year} onChange={e=>setCar({...car,year:e.target.value})} style={inputStyle} /></Field>
            <Field label="License Plate (optional)"><input type="text" placeholder="e.g. 7ABC123" value={car.plate} onChange={e=>setCar({...car,plate:e.target.value.toUpperCase()})} style={{ ...inputStyle,letterSpacing:'0.12em',fontFamily:'ui-monospace,monospace' }} /></Field>
          </div>
        </div>
        <div style={modalFooterStyle}><span /><button onClick={() => setStep(3)} style={{ ...btnFilledGold,padding:'12px 22px',fontSize:13 }}>Continue <ArrowRight size={14} style={{marginLeft:8,verticalAlign:'-2px'}} /></button></div>
      </>}

      {/* Step 3 — Upload */}
      {step === 3 && <>
        <div style={modalBodyStyle}>
          <p style={wizardLead}>Optional — a photo helps our mechanic understand the issue before you arrive.</p>
          <div onClick={() => fileRef.current?.click()} onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor='#29B9E7';e.currentTarget.style.background='#EAF8FD'}} onDragLeave={e=>{e.currentTarget.style.borderColor='#D8CFBC';e.currentTarget.style.background='#F8F8F8'}} onDrop={e=>{e.preventDefault();const list=Array.from(e.dataTransfer.files).slice(0,4).map(f=>({name:f.name,size:f.size}));setFiles(list);e.currentTarget.style.borderColor='#D8CFBC';e.currentTarget.style.background='#F8F8F8';}} style={{ marginTop:16,border:'2px dashed #D8CFBC',borderRadius:8,padding:'40px 20px',background:'#F8F8F8',textAlign:'center',cursor:'pointer',transition:'background 180ms,border-color 180ms' }}>
            <div style={{ width:52,height:52,borderRadius:'50%',background:'#FFFFFF',border:'1px solid #E5E5E5',display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:14 }}><UploadCloud size={24} style={{ color:'#29B9E7' }} /></div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:600,color:'#111111' }}>Drag &amp; drop a photo or video</div>
            <div style={{ fontFamily:'Inter,sans-serif',fontSize:13,color:'#666666',marginTop:6 }}>or <span style={{ color:'#29B9E7',fontWeight:600 }}>tap to browse</span></div>
            <input ref={fileRef} type="file" multiple accept="image/*,video/*" style={{ display:'none' }} onChange={e=>{if(e.target.files)setFiles(Array.from(e.target.files).slice(0,4).map(f=>({name:f.name,size:f.size})));}} />
          </div>
          {files.length>0 && <div style={{ marginTop:16,display:'flex',flexDirection:'column',gap:8 }}>{files.map((f,i)=><div key={i} style={{ display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'#FFFFFF',border:'1px solid #E5E5E5',borderRadius:4 }}><File size={16} style={{ color:'#29B9E7' }} /><span style={{ fontFamily:'Inter,sans-serif',fontSize:14,color:'#1A1A1A',flex:1 }}>{f.name}</span><span style={{ fontFamily:'Inter,sans-serif',fontSize:12,color:'#A89F92' }}>{(f.size/1024).toFixed(0)} KB</span></div>)}</div>}
        </div>
        <div style={modalFooterStyle}><button onClick={()=>setStep(4)} style={{ ...btnOutlineNavy,padding:'12px 22px',fontSize:13 }}>Skip</button><button onClick={()=>setStep(4)} style={{ ...btnFilledGold,padding:'12px 22px',fontSize:13 }}>Continue <ArrowRight size={14} style={{marginLeft:8,verticalAlign:'-2px'}} /></button></div>
      </>}

      {/* Step 4 — Contact */}
      {step === 4 && <>
        <div style={modalBodyStyle}>
          <p style={wizardLead}>How can we reach you with a quote and timing?</p>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:18 }} className="car-form-grid">
            <Field label="Full Name" full><input type="text" placeholder="Jane Smith" value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})} style={inputStyle} /></Field>
            <Field label="Phone"><input type="tel" placeholder="(530) 555-0100" value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})} style={inputStyle} /></Field>
            <Field label="Email"><input type="email" placeholder="you@example.com" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} style={inputStyle} /></Field>
            <Field label="Preferred Contact" full>
              <div style={{ display:'inline-flex',gap:0,border:'1px solid #E5E5E5',borderRadius:4,overflow:'hidden' }}>
                {['phone','email'].map(m=><button key={m} onClick={()=>setContact({...contact,method:m})} style={{ padding:'10px 22px',background:contact.method===m?'#111111':'#FFFFFF',color:contact.method===m?'#29B9E7':'#111111',border:'none',cursor:'pointer',fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:13,letterSpacing:'0.14em',textTransform:'uppercase' }}>{m}</button>)}
              </div>
            </Field>
            <Field label="Preferred Date (optional)"><input type="date" value={contact.date} onChange={e=>setContact({...contact,date:e.target.value})} style={inputStyle} /></Field>
            <Field label="Preferred Time (optional)">
              <select value={contact.time} onChange={e=>setContact({...contact,time:e.target.value})} style={{ ...inputStyle,appearance:'none' }}>
                <option value="">Any time</option>
                {TIMES.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Anything else we should know?" full><textarea rows={3} placeholder="e.g. car makes a grinding noise on left turns…" value={contact.notes} onChange={e=>setContact({...contact,notes:e.target.value})} style={{ ...inputStyle,resize:'vertical',fontFamily:'Inter,sans-serif' }} /></Field>
          </div>
          {error && <p style={{ color:'#B23A3A',fontFamily:'Inter,sans-serif',fontSize:14,marginTop:12 }}>{error}</p>}
        </div>
        <div style={modalFooterStyle}><span /><button onClick={submit} disabled={submitting||!contact.email||!car.make} style={{ ...btnFilledGold,padding:'12px 22px',fontSize:13,opacity:(!contact.email||!car.make)?0.45:1,cursor:(!contact.email||!car.make)?'not-allowed':'pointer' }}>{submitting?'Submitting…':'Submit Request'} {!submitting&&<Check size={14} style={{marginLeft:8,verticalAlign:'-2px'}} />}</button></div>
      </>}

      {/* Step 5 — Confirmation */}
      {step === 5 && <>
        <div style={{ ...modalBodyStyle,textAlign:'center',padding:'40px 28px' }}>
          <div style={{ width:92,height:92,borderRadius:'50%',background:'#29B9E7',boxShadow:'0 0 0 10px rgba(41,185,231,0.16)',display:'inline-flex',alignItems:'center',justifyContent:'center',animation:'pop-check 480ms cubic-bezier(0.16,1,0.3,1) forwards' }}><Check size={50} style={{ color:'#FFFFFF',strokeWidth:3 }} /></div>
          <h3 style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:42,color:'#111111',margin:'24px 0 10px',lineHeight:1 }}>We've got your request.</h3>
          <p style={{ fontFamily:'Inter,sans-serif',fontSize:15,color:'#666666',maxWidth:460,margin:'0 auto',lineHeight:1.6 }}>Our team will review your request and reach out shortly with a quote and next steps.</p>
          <div style={{ display:'inline-block',marginTop:22,padding:'10px 18px',background:'#EAF8FD',border:'1px solid #29B9E7',borderRadius:30,fontFamily:'ui-monospace,"SF Mono",Menlo,monospace',fontSize:14,fontWeight:700,color:'#111111',letterSpacing:'0.06em' }}>{ticket}</div>
          <div style={{ marginTop:36,padding:'22px 24px',background:'#F5F5F5',borderRadius:8,border:'1px solid #E5E5E5',textAlign:'left' }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif",color:'#29B9E7',fontSize:11,fontWeight:700,letterSpacing:'0.28em',textTransform:'uppercase',marginBottom:14 }}>What happens next?</div>
            {['Our mechanic reviews your request',"We'll contact you with a quote and estimated time","Drop off your car and we'll handle the rest"].map((s,i)=>(
              <div key={i} style={{ display:'flex',gap:14,padding:'8px 0' }}>
                <div style={{ width:26,height:26,borderRadius:'50%',background:'#111111',color:'#29B9E7',fontFamily:"'Bebas Neue',sans-serif",fontSize:16,lineHeight:1,display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>{i+1}</div>
                <div style={{ fontFamily:'Inter,sans-serif',fontSize:14,color:'#3A3833',paddingTop:4 }}>{s}</div>
              </div>
            ))}
          </div>
          <a href="https://maps.google.com/?q=1180+Olive+Drive+Davis+CA+95616" target="_blank" rel="noopener" style={{ display:'inline-flex',alignItems:'center',gap:8,marginTop:22,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600,fontSize:13,letterSpacing:'0.14em',textTransform:'uppercase',color:'#111111',textDecoration:'none',borderBottom:'2px solid #29B9E7',paddingBottom:4 }}><MapPin size={14} style={{ color:'#29B9E7' }} />1180 Olive Drive, Davis, CA 95616</a>
        </div>
        <div style={modalFooterStyle}><span /><button onClick={() => { reset(); onClose(); }} style={{ ...btnFilledGold,padding:'12px 22px',fontSize:13 }}>Done</button></div>
      </>}

      <style>{`@keyframes pop-check{from{opacity:0;transform:scale(0.4)}to{opacity:1;transform:scale(1)}}@media(max-width:600px){.issue-grid{grid-template-columns:repeat(2,1fr)!important}.car-form-grid{grid-template-columns:1fr!important}}`}</style>
    </ModalShell>
  );
}
