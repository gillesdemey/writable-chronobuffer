'use strict'

var chronoBuffer = require('./index')
var tap = require('tap')

tap.test('create chronoBuffer', t => {
  t.plan(1)

  var rb = chronoBuffer.create()
  t.equal(rb.limit, 100)
})

tap.test('create chronoBuffer with limit', t => {
  t.plan(1)

  var rb = chronoBuffer.create({ limit: 10 })
  t.equal(rb.limit, 10)
})

tap.test('overflow buffer and flush', t => {
  t.plan(1)

  var rb = chronoBuffer.create({ limit: 3 })

  rb.write('foo')
  rb.write('bar')
  rb.write('baz')
  rb.write('qux')

  t.looseEqual(rb.flush(), [ 'bar', 'baz', 'qux' ])
})

tap.test('underflow buffer and flush', t => {
  t.plan(1)

  var rb = chronoBuffer.create({ limit: 8 })
  for (var i = 4; i >= 0; i--) {
    rb.write('Hello, world!')
  }

  t.equal(rb.flush().length, 5)
})
