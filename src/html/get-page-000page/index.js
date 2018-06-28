let arc = require('@architect/functions')
let layout = require('@architect/shared/layout')
let log = require('@architect/shared/middleware/log')

function route(req, res) {
  var render = layout.bind({}, req)
  res({
    html: render('hello world from one of the sub pages')
  })
}

exports.handler = arc.html.get(log, route)
