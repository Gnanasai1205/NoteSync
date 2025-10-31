import React, { useState } from 'react'

export default function Login({ onLogin }){
  const [name, setName] = useState('')

  const submit = (e) => { e.preventDefault(); if(!name) return alert('Enter a name'); onLogin(name) }

  return (
    <div className="login-page">
      <h2>Login (mock)</h2>
      <form onSubmit={submit} className="login-form">
        <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
