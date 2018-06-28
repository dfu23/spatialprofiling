module.exports = function(err) {
  return `
  <!doctype html>
  <html>
  <body>
    <h1>${err.message}</h1>
    <pre>${err.stack}</pre>
  </body>
  </html>
  `
}
