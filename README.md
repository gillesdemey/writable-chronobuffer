# Writable Buffer

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
