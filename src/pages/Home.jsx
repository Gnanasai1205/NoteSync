import React from 'react'

export default function Home({ onNavigate }) {
  return (
    <div className="home">
      <h1>NoteSync</h1>
      <p className="lead">Smart Notes & Calendar</p>
      <div className="home-actions">
        <button onClick={() => onNavigate('notes')}>Notes</button>
        <button onClick={() => onNavigate('calendar')}>Calendar</button>
        <button onClick={() => onNavigate('login')}>Login</button>
      </div>
    </div>
  )
}
