const requireModule = require.context('./modules', false, /\.js$/)
const modules = {}
requireModule.keys().forEach(fileName => {
  // Don't register index as a module
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName)
  }
})
export default modules
