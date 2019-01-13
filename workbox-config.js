module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{html,js,css,woff2,woff,ttf,eot,svg,png,json}'
  ],
  swDest: 'dist/service-worker.js',

  // Define runtime caching rules.
  runtimeCaching: [{
    // Match any request ends with .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

    // Apply a cache-first strategy.
    handler: 'networkFirst',

    options: {}
  }]
}