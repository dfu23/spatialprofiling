let arc = require('@architect/functions')
let protect = require('@architect/shared/protect')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res({
    html: 'hey imma let u finish'
  })
}

exports.handler = arc.html.get(protect, route)
