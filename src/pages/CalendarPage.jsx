import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { load, save } from '../utils/storage'

export default function CalendarPage(){
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState(() => load('notesync_events', []))
  const [title, setTitle] = useState('')
  const [linkNoteId, setLinkNoteId] = useState('')
  const notes = load('notesync_notes', [])

  useEffect(() => save('notesync_events', events), [events])

  const addEvent = () => {
    if (!title) return alert('Enter a title')
    setEvents([{ id: Date.now().toString(), title, date: date.toISOString(), noteId: linkNoteId }, ...events])
    setTitle('')
    setLinkNoteId('')
  }

  const eventsOnDay = (d) => events.filter(e => (new Date(e.date)).toDateString() === d.toDateString())

  return (
    <div className="calendar-page">
      <div className="calendar-left">
        <Calendar onChange={setDate} value={date} />
        <div className="add-event">
          <h3>Add Event</h3>
          <input placeholder="Event title" value={title} onChange={e=>setTitle(e.target.value)} />
          <label>Link to note (optional)</label>
          <select value={linkNoteId} onChange={e=>setLinkNoteId(e.target.value)}>
            <option value="">-- none --</option>
            {notes.map(n => <option key={n.id} value={n.id}>{n.title || 'Untitled'}</option>)}
          </select>
          <button onClick={addEvent}>Add</button>
        </div>
      </div>

      <div className="events-right">
        <h3>Events on {date.toDateString()}</h3>
        {eventsOnDay(date).length===0 && <p className="muted">No events</p>}
        <ul>
          {eventsOnDay(date).map(ev => (
            <li key={ev.id}>
              <strong>{ev.title}</strong>
              {ev.noteId && <div className="linked-note">Linked note: { (notes.find(n=>n.id===ev.noteId)||{}).title || 'unknown' }</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
