let test = require('tape')
let arc = require('@architect/workflows')
let data = require('@architect/data')
let db

test('arc.sandbox.db.start', t=> {
  t.plan(1)
  db = arc.sandbox.db.start(x=> {
    t.ok(true, 'in memory db started')
  })
})

test('list tables', t=> {
  t.plan(1)
  data._db.listTables({}, function listTables(err, result) {
    if (err) {
      t.fail(err)
    }
    else {
      t.ok(result, 'got result')
      console.log(result)
    }
  })
})

test('arc.sandbox.db.close', t=> {
  t.plan(1)
  db.close()
  t.ok(true, 'db is safely shut down')
})
