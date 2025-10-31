import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Notes from './pages/Notes'
import CalendarPage from './pages/CalendarPage'
import Login from './pages/Login'

export default function App() {
  const [route, setRoute] = useState('home')
  const [user, setUser] = useState(() => localStorage.getItem('notesync_user') || 'Guest')
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('notesync_loggedIn') === 'true')

  useEffect(() => {
    localStorage.setItem('notesync_loggedIn', loggedIn ? 'true' : 'false')
  }, [loggedIn])

  const nav = (r) => setRoute(r)

  return (
    <div className="app">
      <Navbar onNavigate={nav} route={route} loggedIn={loggedIn} onLogout={() => { setLoggedIn(false); setUser('Guest'); localStorage.removeItem('notesync_user') }} user={user} />
      <main className="container">
        {route === 'home' && <Home onNavigate={nav} />}
        {route === 'notes' && <Notes loggedIn={loggedIn} />}
        {route === 'calendar' && <CalendarPage />}
        {route === 'login' && <Login onLogin={(name) => { setUser(name); setLoggedIn(true); localStorage.setItem('notesync_user', name); setRoute('notes') }} />}
      </main>

      <footer className="footer">NoteSync — Smart Notes & Calendar </footer>
    </div>
  )
}
