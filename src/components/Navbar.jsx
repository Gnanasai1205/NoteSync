import React from 'react'

export default function Navbar({ onNavigate, route, loggedIn, onLogout, user }) {
  return (
    <nav className="navbar">
      <div className="brand" onClick={() => onNavigate('home')}>NoteSync</div>
      <div className="nav-links">
        <button className={route==='notes'? 'active':''} onClick={() => onNavigate('notes')}>Notes</button>
        <button className={route==='calendar'? 'active':''} onClick={() => onNavigate('calendar')}>Calendar</button>
        {loggedIn ? (
          <>
            <span className="user">{user}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className={route==='login'? 'active':''} onClick={() => onNavigate('login')}>Login</button>
        )}
      </div>
    </nav>
  )
}
