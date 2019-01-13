export default {
  set (name, value) {
    localStorage.setItem(name, JSON.stringify(value))
  },
  update (name, key, val) {
    const lsData = this.get(name)
    lsData[key] = val
    this.set(name, lsData)
  },
  get (name) {
    return JSON.parse(localStorage.getItem(name))
  },
  remove (name) {
    localStorage.removeItem(name)
  }
}
