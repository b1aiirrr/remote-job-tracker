import { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Search, 
  ExternalLink, 
  FileText, 
  DollarSign, 
  Globe, 
  Copy, 
  Check, 
  X, 
  TrendingUp,
  Cpu
} from 'lucide-react';

import applicationsData from './data/applications.json';
import profileData from './data/profile.json';

interface Application {
  job_id: string;
  company: string;
  role_title: string;
  source: string;
  apply_url: string;
  role_track: string;
  cv_used: string;
  cover_letter_path: string;
  salary_entered: string;
  status: string;
  applied_at: string;
  notes: string;
  cover_letter_content?: string;
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeModalApp, setActiveModalApp] = useState<Application | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const applications = applicationsData as Application[];

  // Track colors
  const getTrackBadge = (track: string) => {
    switch (track.toLowerCase()) {
      case 'backend':
        return { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)', label: 'Backend' };
      case 'frontend':
        return { bg: 'rgba(6, 182, 212, 0.15)', text: '#38bdf8', border: 'rgba(6, 182, 212, 0.3)', label: 'Frontend' };
      case 'fullstack':
        return { bg: 'rgba(139, 92, 246, 0.15)', text: '#c084fc', border: 'rgba(139, 92, 246, 0.3)', label: 'Full Stack' };
      case 'ai_trainer':
        return { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)', label: 'AI Trainer / RLHF' };
      case 'app_tester':
        return { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.3)', label: 'App Tester / QA' };
      default:
        return { bg: 'rgba(100, 116, 139, 0.2)', text: '#94a3b8', border: 'rgba(100, 116, 139, 0.3)', label: track };
    }
  };

  const getStatusBadge = (status: string) => {
    if (status.includes('SUBMIT') || status === 'SUBMITTED') {
      return { bg: 'rgba(16, 185, 129, 0.2)', text: '#10b981', label: 'Submitted' };
    }
    if (status.includes('INTAKE')) {
      return { bg: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b', label: 'Intake Ready' };
    }
    return { bg: 'rgba(56, 189, 248, 0.2)', text: '#38bdf8', label: 'Ready to Submit' };
  };

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = 
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.role_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.source.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTrack = selectedTrack === 'ALL' || app.role_track.toLowerCase() === selectedTrack.toLowerCase();
      const matchesStatus = selectedStatus === 'ALL' || app.status.toLowerCase().includes(selectedStatus.toLowerCase());

      return matchesSearch && matchesTrack && matchesStatus;
    });
  }, [applications, searchTerm, selectedTrack, selectedStatus]);

  const handleCopyCoverLetter = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '28px 24px 60px' }}>
      
      {/* Top Banner */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '20px',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
          }}>
            <Briefcase size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                Remote Career Automation
              </h1>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} className="animate-pulse-glow"></span>
                Autonomy Active
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
              Candidate: <strong style={{ color: '#f8fafc' }}>{profileData.personal.full_name}</strong> • Nairobi, Kenya (UTC+3) • 40–60+ hrs/wk Available
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a 
            href={profileData.links.portfolio} 
            target="_blank" 
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)',
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '500',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <Globe size={15} color="#34d399" />
            Portfolio
          </a>
          <a 
            href={profileData.links.github} 
            target="_blank" 
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)',
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '500',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            GitHub
          </a>
          <a 
            href={profileData.links.linkedin} 
            target="_blank" 
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)',
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '500',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            LinkedIn
          </a>
        </div>
      </header>

      {/* Metrics Row */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Daily Target</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '6px', borderRadius: '8px' }}>
              <TrendingUp size={18} color="#10b981" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '10px', color: '#10b981' }}>
            10 / 10
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>100% of today's target achieved</p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Total Active Apps</span>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '6px', borderRadius: '8px' }}>
              <Briefcase size={18} color="#06b6d4" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '10px', color: '#06b6d4' }}>
            {applications.length}
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>100% Remote / Worldwide Eligible</p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Median Target Rate</span>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '6px', borderRadius: '8px' }}>
              <DollarSign size={18} color="#f59e0b" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '10px', color: '#f59e0b' }}>
            $75k–$80k
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>or $35–$40 / hr remote contract</p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Tailored Tracks</span>
            <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '6px', borderRadius: '8px' }}>
              <Cpu size={18} color="#8b5cf6" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '10px', color: '#8b5cf6' }}>
            5 Tracks
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Backend, Frontend, Full Stack, AI, QA</p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="glass-panel" style={{ padding: '16px 20px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search Box */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            background: 'rgba(0,0,0,0.3)', 
            padding: '10px 14px', 
            borderRadius: '10px', 
            border: '1px solid var(--border-subtle)',
            flex: '1',
            minWidth: '260px'
          }}>
            <Search size={18} color="#64748b" />
            <input 
              type="text" 
              placeholder="Search company, position, or source..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f8fafc',
                fontSize: '14px',
                width: '100%'
              }}
            />
          </div>

          {/* Track Filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['ALL', 'backend', 'frontend', 'fullstack', 'ai_trainer', 'app_tester'].map((trk) => {
              const isSelected = selectedTrack.toLowerCase() === trk.toLowerCase();
              const label = trk === 'ALL' ? 'All Tracks' : trk.replace('_', ' ').toUpperCase();
              return (
                <button
                  key={trk}
                  onClick={() => setSelectedTrack(trk)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: isSelected ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                    background: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)',
                    color: isSelected ? '#34d399' : '#94a3b8'
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Status Filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'All Statuses' },
              { id: 'INTAKE', label: 'Intake Ready' },
              { id: 'READY', label: 'Ready to Submit' },
              { id: 'SUBMIT', label: 'Submitted' }
            ].map((st) => {
              const isSelected = selectedStatus === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStatus(st.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: isSelected ? '1px solid #06b6d4' : '1px solid var(--border-subtle)',
                    background: isSelected ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.04)',
                    color: isSelected ? '#38bdf8' : '#94a3b8'
                  }}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Applications Cards Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredApps.map((app) => {
          const trackBadge = getTrackBadge(app.role_track);
          const statusBadge = getStatusBadge(app.status);

          return (
            <div 
              key={app.job_id} 
              className="glass-panel" 
              style={{ 
                padding: '22px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* Header row: Company + Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      color: '#34d399',
                      fontSize: '16px'
                    }}>
                      {app.company.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc' }}>{app.company}</h3>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>via {app.source}</span>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: statusBadge.bg,
                    color: statusBadge.text,
                    textTransform: 'uppercase'
                  }}>
                    {statusBadge.label}
                  </span>
                </div>

                {/* Role title */}
                <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#e2e8f0', marginBottom: '14px', lineHeight: '1.4' }}>
                  {app.role_title}
                </h4>

                {/* Tags row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: trackBadge.bg,
                    color: trackBadge.text,
                    border: `1px solid ${trackBadge.border}`
                  }}>
                    {trackBadge.label}
                  </span>

                  <span style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#a7f3d0'
                  }}>
                    {app.salary_entered.split(' ')[0]} / yr
                  </span>
                </div>

                {/* CV attached */}
                <div style={{
                  padding: '10px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '16px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FileText size={15} color="#34d399" />
                  <span style={{ color: '#cbd5e1', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {app.cv_used}
                  </span>
                </div>
              </div>

              {/* Actions row */}
              <div style={{ display: 'flex', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={() => setActiveModalApp(app)}
                  style={{
                    flex: '1',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#f8fafc',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <FileText size={14} color="#38bdf8" />
                  Cover Letter
                </button>

                <a
                  href={app.apply_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: '1',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: '#10b981',
                    color: '#090d16',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  Apply Portal
                  <ExternalLink size={14} color="#090d16" />
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* Cover Letter Modal */}
      {activeModalApp && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(9, 13, 22, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 1000
        }}>
          <div style={{
            background: '#111827',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f8fafc' }}>
                  Cover Letter — {activeModalApp.company}
                </h3>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                  Target Role: {activeModalApp.role_title}
                </span>
              </div>
              <button 
                onClick={() => setActiveModalApp(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              padding: '24px',
              overflowY: 'auto',
              flex: '1',
              color: '#cbd5e1',
              fontSize: '13.5px',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              background: '#090d16'
            }}>
              {activeModalApp.cover_letter_content || `COVER LETTER — BLAIR MOMANYI MOMIGI\nRole: ${activeModalApp.role_title}\nCompany: ${activeModalApp.company}\n\nDedicated cover letter file generated in:\noutput/cover_letters/${activeModalApp.cover_letter_path}\n\nIncludes candidate highlights: MigiArbitrage, Snack Have Hun, MigiTrader, and full-stack production deployments.`}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                File: {activeModalApp.cover_letter_path}
              </span>
              <button
                onClick={() => handleCopyCoverLetter(activeModalApp.cover_letter_content)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: copiedId ? '#059669' : 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {copiedId ? <Check size={16} /> : <Copy size={16} />}
                {copiedId ? 'Copied!' : 'Copy Text'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
