export const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch (e) {
    console.error('storage load', e)
    return fallback
  }
}

export const save = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch (e) {
    console.error('storage save', e)
  }
}
