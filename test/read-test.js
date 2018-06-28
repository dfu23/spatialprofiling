let parallel = require('run-parallel')
let test = require('tape')
let arc = require('@architect/workflows')
let data = require('@architect/data')

// db gets shared between the first and last test
let db

// create some mock data to work with the in memory db
var postID = 'fake-post-id'
var emoji = ':smile:'
var emoji2 = ':cat:'

// start the test db server
test('arc.sandbox.db.start', t=> {
  t.plan(1)
  db = arc.sandbox.db.start(x=> {
    t.ok(true, 'in memory db started')
  })
})

test('populate mock data', t=> {
  t.plan(1)
  // create a dummy post and reactions
  var post = data.posts.put.bind({}, {postID, title:'hi', ts:'2017-11-11'})
  var reaction = data.reactions.put.bind({}, {postID, emoji, count:2})
  var reaction2 = data.reactions.put.bind({}, {postID, emoji:emoji2, count:1})
  // run the dummy data writes in parallel
  parallel([
    post,
    reaction,
    reaction2,
  ],
  function _put(err, result) {
    if (err) {
      t.fail(err)
    }
    else {
      t.ok(result.length === 3, 'got result')
      console.log(result)
    }
  })
})

test('data.posts.get', t=> {
  t.plan(1)
  data.posts.get({
    postID,
  },
  function _get(err, result) {
    if (err) {
      t.fail(err)
    }
    else {
      t.ok(result, 'got result')
      console.log(result)
    }
  })
})

test('data.reactions.query', t=> {
  t.plan(1)
  data.reactions.query({
    KeyConditionExpression: 'postID = :postID',
    ExpressionAttributeValues: {
      ':postID': postID,
    }
  },
  function _get(err, result) {
    if (err) {
      t.fail(err)
    }
    else {
      t.ok(result, 'got result')
      console.log(result)
    }
  })
})

test('data.reactions.batchGet', t=> {
  t.plan(1)

  // get the table names
  var posts = data._name('posts')
  var reactions = data._name('reactions')

  // construct a query
  var query = {}
  query[posts] = {
    Keys: [{postID}]
  }
  query[reactions] = {
    Keys: [{postID, emoji}]
  }

  // execute the query
  data._doc.batchGet({
    RequestItems: query
  },
  function _batchGet(err, result) {
    if (err) {
      t.fail(err)
    }
    else {
      t.ok(result, 'got result')
      console.log(result)
    }
  })
})

// shut down the test db server
test('arc.sandbox.db.close', t=> {
  t.plan(1)
  db.close()
  t.ok(true, 'db is safely shut down')
})
