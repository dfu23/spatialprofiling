let arc = require('@architect/functions')
let layout = require('@architect/shared/layout')
let log = require('@architect/shared/middleware/log')

function route(req, res) {
  var body = `
    <h1>${req.session.count || 0}</h1>
    <form action="${req._url('/count')}" method="POST">
      <button>1up</button>
    </form>
  `
  var render = layout.bind({}, req)
  res({
    html: render(body)
  })
}

exports.handler = arc.html.get(log, route)
