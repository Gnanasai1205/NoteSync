import React, { useState, useEffect, useRef } from 'react'
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
  const [sortBy, setSortBy] = useState('newest')
  const [colorFilter, setColorFilter] = useState(null)
  const fileRef = useRef()

  useEffect(() => save('notesync_notes', notes), [notes])

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])))
  const allColors = Array.from(new Set(notes.map(n => n.color || 'neutral')))

  let filtered = notes.filter(n => {
    if (tagFilter && !(n.tags || []).includes(tagFilter)) return false
    if (colorFilter && (n.color || 'neutral') !== colorFilter) return false
    if (!query) return true
    const q = query.toLowerCase()
    return (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q) || (n.tags||[]).join(' ').toLowerCase().includes(q)
  })

  // sort
  filtered = filtered.slice().sort((a,b) => {
    if (sortBy === 'pinned') return (b.pinned?1:0) - (a.pinned?1:0)
    if (sortBy === 'newest') return (b.id||0) - (a.id||0)
    if (sortBy === 'oldest') return (a.id||0) - (b.id||0)
    if (sortBy === 'title') return (a.title||'').localeCompare(b.title||'')
    return 0
  })

  const create = () => { setEditing(null); setShowEditor(true) }
  const edit = (n) => { setEditing(n); setShowEditor(true) }
  const remove = (id) => { if (confirm('Delete this note?')) setNotes(notes.filter(n => n.id !== id)) }

  const togglePin = (id) => setNotes(notes.map(n => n.id === id ? {...n, pinned: !n.pinned} : n))

  const exportNotes = () => {
    const data = JSON.stringify({ notes }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'notesync-notes.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importNotes = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result)
        const incoming = parsed.notes || parsed
        // merge -- avoid id collisions
        const existingIds = new Set(notes.map(n=>n.id))
        const merged = [...notes]
        incoming.forEach(n => {
          if (!n.id || existingIds.has(n.id)) n.id = Date.now().toString() + Math.random().toString(36).slice(2,7)
          merged.unshift(n)
        })
        setNotes(merged)
        alert('Imported notes: ' + incoming.length)
      } catch (err) {
        alert('Failed to import: ' + err.message)
      }
    }
    reader.readAsText(file)
  }

  const saveNote = (note) => {
    if (!note.color) note.color = 'neutral'
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
        <div style={{display:'flex',gap:8,alignItems:'center'}} className="controls">
          <button className="btn btn-primary" onClick={create}>+ New Note</button>
          <button className="btn btn-ghost" onClick={exportNotes}>Export</button>
          <button className="btn btn-outline" onClick={() => fileRef.current && fileRef.current.click()}>Import</button>
          <input ref={fileRef} type="file" accept="application/json" style={{display:'none'}} onChange={e => importNotes(e.target.files[0])} />
        </div>

        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <div className="search-area"><input placeholder="Search notes..." value={query} onChange={e => setQuery(e.target.value)} /></div>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title A-Z</option>
            <option value="pinned">Pinned</option>
          </select>
        </div>
      </div>

      <div className="tags-row">
        <Tag tag={null} onClick={() => setTagFilter(null)} active={!tagFilter}>All</Tag>
        {allTags.map(t => <Tag key={t} tag={t} onClick={(tag)=> setTagFilter(tag)} active={tagFilter===t} />)}
      </div>

      <div className="tags-row" style={{marginBottom:16}}>
        <Tag tag={null} onClick={() => setColorFilter(null)} active={!colorFilter}>All Colors</Tag>
        {allColors.map(c => <Tag key={c} tag={c} onClick={(col)=> setColorFilter(col)} active={colorFilter===c} />)}
      </div>

      <div className="notes-list">
        {filtered.length === 0 && <p className="muted">No notes found.</p>}
        {filtered.map(n => (
          <div className="note-card" key={n.id} data-color={n.color} data-pinned={n.pinned? 'true':'false'}>
            <div className="note-head">
              <h3>{n.title || 'Untitled'}</h3>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <button onClick={() => togglePin(n.id)} title={n.pinned? 'Unpin':'Pin'}>{n.pinned? '📌':'📍'}</button>
                <div className="note-actions">
                  <button onClick={() => edit(n)}>Edit</button>
                  <button onClick={() => remove(n.id)}>Delete</button>
                </div>
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
