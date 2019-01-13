export default {
  set (name, value) {
    return localStorage.setItem(name, JSON.stringify(value))
  },
  get (name) {
    return JSON.parse(localStorage.getItem(name))
  },
  remove (name) {
    return localStorage.removeItem(name)
  }
}
