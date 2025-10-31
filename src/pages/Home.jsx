import React from 'react'

export default function Home({ onNavigate }) {
  return (
    <div className="home">
      <header className="hero">
        <div>
          <h1>NoteSync</h1>
          <p className="lead">Smart Notes & Calendar — local-first, privacy-friendly, and fast.</p>
          <div className="home-actions">
            <button className="btn btn-primary" onClick={() => onNavigate('notes')}>Notes</button>
            <button className="btn btn-ghost" onClick={() => onNavigate('calendar')}>Calendar</button>
           
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          <div className="mock-device">
            <div className="device-screen">Your notes, organized.</div>
          </div>
        </div>
      </header>

      <section className="about">
        <h2>About</h2>
        <p className="muted-plain">NoteSync is a compact, local-first notes and calendar app focused on speed, privacy, and a great writing experience. All notes and events are stored in your browser's localStorage — no backend required. Perfect for personal note-taking, quick journaling, and lightweight scheduling.</p>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-ico">📝</div>
            <h3>Rich Notes</h3>
            <p>Markdown support, tags, colors, and a distraction-free editor.</p>
          </article>

          <article className="feature-card">
            <div className="feature-ico">📅</div>
            <h3>Calendar</h3>
            <p>Monthly calendar with event linking to notes and quick event creation.</p>
          </article>

          <article className="feature-card">
            <div className="feature-ico">🔒</div>
            <h3>Private & Local</h3>
            <p>All data stored in your browser — keep your notes private and offline.</p>
          </article>

          <article className="feature-card">
            <div className="feature-ico">⚡</div>
            <h3>Fast & Responsive</h3>
            <p>Lightweight design built for speed across devices and screen sizes.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
