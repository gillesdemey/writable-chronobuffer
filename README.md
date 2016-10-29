# Writable Buffer

[![Build Status](https://travis-ci.org/gillesdemey/writable-chronobuffer.svg?branch=master)](https://travis-ci.org/gillesdemey/writable-chronobuffer)
[![codecov](https://codecov.io/gh/gillesdemey/writable-chronobuffer/branch/master/graph/badge.svg)](https://codecov.io/gh/gillesdemey/writable-chronobuffer)


## Rationale

The writable chrono buffer is a simple Array buffer as a writable stream.

Define a `limit` and the buffer will only keep that many records in memory and overwrite the oldest indexes.

## Usage


```javascript
var chronoBuffer = require('writable-chronobuffer')
var rb = chronoBuffer.create({ limit: 3 })

rb.write('foo')
rb.write('bar')
rb.write('baz')
rb.write('qux')

rb.flush() // [ 'bar', 'baz', 'qux' ]
```
