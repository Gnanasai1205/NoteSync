import React, { useState, useEffect } from 'react'
import { load, save } from '../utils/storage'
import NoteEditor from './NoteEditor'

function Tag({ tag, onClick, active }) {
  return <button className={"tag-btn" + (active? ' active':'')} onClick={() => onClick(tag)}>{tag}</button>
}

export default function Notes() {
  const [notes, setNotes] = useState(() => load('notesync_notes', []))
  const [query, setQuery] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [editing, setEditing] = useState(null)
  const [tagFilter, setTagFilter] = useState(null)

  useEffect(() => save('notesync_notes', notes), [notes])

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])))

  const filtered = notes.filter(n => {
    if (tagFilter && !(n.tags || []).includes(tagFilter)) return false
    if (!query) return true
    const q = query.toLowerCase()
    return (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q) || (n.tags||[]).join(' ').toLowerCase().includes(q)
  })

  const create = () => { setEditing(null); setShowEditor(true) }
  const edit = (n) => { setEditing(n); setShowEditor(true) }
  const remove = (id) => { if (confirm('Delete this note?')) setNotes(notes.filter(n => n.id !== id)) }

  const saveNote = (note) => {
    if (note.id) {
      setNotes(notes.map(n => n.id === note.id ? note : n))
    } else {
      note.id = Date.now().toString()
      setNotes([note, ...notes])
    }
    setShowEditor(false)
  }

  return (
    <div className="notes-page">
      <div className="notes-top">
        <div>
          <button onClick={create}>+ New Note</button>
        </div>
        <div className="search-area">
          <input placeholder="Search notes..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="tags-row">
        <Tag tag={null} onClick={() => setTagFilter(null)} active={!tagFilter}>All</Tag>
        {allTags.map(t => <Tag key={t} tag={t} onClick={(tag)=> setTagFilter(tag)} active={tagFilter===t} />)}
      </div>

      <div className="notes-list">
        {filtered.length === 0 && <p className="muted">No notes found.</p>}
        {filtered.map(n => (
          <div className="note-card" key={n.id}>
            <div className="note-head">
              <h3>{n.title || 'Untitled'}</h3>
              <div className="note-actions">
                <button onClick={() => edit(n)}>Edit</button>
                <button onClick={() => remove(n.id)}>Delete</button>
              </div>
            </div>
            <div className="note-body" dangerouslySetInnerHTML={{__html: n.html || (n.content || '')}} />
            {(n.tags || []).length > 0 && <div className="note-tags">{(n.tags||[]).map(t => <span key={t} className="note-tag">{t}</span>)}</div>}
          </div>
        ))}
      </div>

      {showEditor && <NoteEditor note={editing} onSave={saveNote} onClose={() => setShowEditor(false)} />}
    </div>
  )
}
