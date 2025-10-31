import React, { useState, useEffect } from 'react'
import { marked } from 'marked'

export default function NoteEditor({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [tags, setTags] = useState((note?.tags || []).join(', '))
  const [color, setColor] = useState(note?.color || 'neutral')
  const [pinned, setPinned] = useState(!!note?.pinned)
  const [preview, setPreview] = useState('')

  useEffect(() => { setPreview(marked.parse(content || '')) }, [content])

  const submit = () => {
    const tList = tags.split(',').map(s => s.trim()).filter(Boolean)
    onSave({ id: note?.id, title, content, tags: tList, html: marked.parse(content || ''), color, pinned })
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{note ? 'Edit Note' : 'New Note'}</h2>
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} />
        <label>Tags (comma separated)</label>
        <input value={tags} onChange={e=>setTags(e.target.value)} />
        <div style={{display:'flex',gap:12,alignItems:'center',marginTop:8}}>
          <div>
            <label style={{display:'block',fontSize:13,color:'#9aa4b2'}}>Color</label>
            <div style={{display:'flex',gap:8,marginTop:6}}>
              {['neutral','red','green','blue','purple','yellow'].map(c => (
                <button key={c} onClick={() => setColor(c)} className={`color-swatch ${color===c? 'selected':''}`} title={c} />
              ))}
            </div>
          </div>

          <div>
            <label style={{display:'block',fontSize:13,color:'#9aa4b2'}}>Pinned</label>
            <div style={{marginTop:6}}>
              <input type="checkbox" checked={pinned} onChange={e=>setPinned(e.target.checked)} /> Keep pinned
            </div>
          </div>
        </div>
        <label>Content (Markdown supported)</label>
        <textarea value={content} onChange={e=>setContent(e.target.value)} rows={8} />

        <div className="editor-actions">
          <button onClick={submit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>

        <h3>Preview</h3>
        <div className="preview" dangerouslySetInnerHTML={{__html: preview}} />
      </div>
    </div>
  )
}
