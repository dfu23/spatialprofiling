let arc = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res(Error('internal "server" error: lolz'))
}

exports.handler = arc.html.get(route)
