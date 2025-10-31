<<<<<<< HEAD
# NoteSync — Smart Notes & Calendar 
=======
# NoteSync — Smart Notes & Calendar
>>>>>>> d2c577aa34d7ec6cd171b05d729276e415846abb

A small local-first React app (Vite) for notes and calendar events using browser localStorage. Features:

- Notes: create, edit, delete, tags, Markdown (preview), search, color-tag filters.
- Calendar: monthly view (react-calendar), add events and link to notes.
- Mock login: store loggedIn and user name in localStorage.

Quick start

1. From the project folder, install dependencies:

```powershell
npm install
```

2. Start dev server:

```powershell
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

Notes

- All data is stored in localStorage keys: `notesync_notes`, `notesync_events`, `notesync_loggedIn`, `notesync_user`.
- This is a frontend-only mock app — no backend.

Next steps

- Add note colors, import/export, and sync options.
- Add unit tests and TypeScript conversion.
