import React, { useState } from 'react'

export default function Login({ onLogin }){
  const [name, setName] = useState('')
  const [remember, setRemember] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if(!name) return alert('Enter a name')
    onLogin(name)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50 p-6">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left: Illustration / marketing */}
        <div className="hidden md:flex flex-col justify-center items-start p-10 gap-6 bg-gradient-to-tr from-sky-600 to-indigo-600 text-white">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden className="mb-2">
            <rect width="24" height="24" rx="6" fill="white" opacity="0.08" />
            <path d="M8 12h8M8 8h8M8 16h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="text-3xl font-semibold">Welcome to NoteSync</h3>
          <p className="text-sm opacity-90">Organize your notes and calendar seamlessly with NoteSync — modern, connected, and smart.</p>
          <ul className="mt-4 text-xs opacity-90 space-y-2">
            <li>• Unified notes and event management</li>
            <li>• Cloud sync and reminders</li>
            <li>• Smart AI assistance (coming soon)</li>
          </ul>
        </div>

        {/* Right: Form */}
        <div className="p-8 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Sign in to NoteSync</h2>
              <p className="text-sm text-slate-500">Use your name to mock-login — we won’t store anything.</p>
            </div>
            <div className="text-xs text-slate-400">Need an account? <button className="underline" aria-hidden>Sign up</button></div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="text-xs text-slate-600">Name</span>
              <input
                className="mt-1 block w-full rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="Your name"
                value={name}
                onChange={e=>setName(e.target.value)}
                aria-label="Your name"
              />
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-sky-600 hover:underline">Forgot?</button>
            </div>

            <div>
              <button type="submit" className="w-full py-2 rounded-lg font-semibold shadow-sm bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:opacity-95">
                Sign in
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex-1 h-px bg-slate-200" />
              <span>or continue with</span>
              <span className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button type="button" aria-label="Sign in with Google" className="py-2 rounded-lg text-sm font-semibold text-white bg-[#DB4437] hover:opacity-90">Google</button>
              <button type="button" aria-label="Sign in with GitHub" className="py-2 rounded-lg text-sm font-semibold text-white bg-[#333333] hover:opacity-90">GitHub</button>
              <button type="button" aria-label="Sign in with Twitter" className="py-2 rounded-lg text-sm font-semibold text-white bg-[#1DA1F2] hover:opacity-90">Twitter</button>
            </div>

            <p className="text-xs text-slate-500 mt-3">By continuing, you agree to our <button className="underline">Terms</button> and <button className="underline">Privacy Policy</button>.</p>
          </form>

          <footer className="mt-6 text-center text-xs text-slate-400">Need a demo? Use any name and click <strong>Sign in</strong>.</footer>
        </div>
      </div>
    </div>
  )
}

