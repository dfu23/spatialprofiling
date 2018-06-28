let arc = require('@architect/functions')
let auth = require('arc-middleware-github-oauth')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res({
    html: 'if you see this you are logged in!'
  })
}

exports.handler = arc.html.get(auth, route)
