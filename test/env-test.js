let test = require('tape')
let arc = require('@architect/workflows')
let data = require('@architect/data')

test('env', t=> {
  t.plan(1)
  t.ok(data, 'data is in scope')
  console.log(data)
})
