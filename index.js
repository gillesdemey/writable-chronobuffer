'use strict'

var stream = require('readable-stream')
var util = require('util')

function ChronoBuffer (options) {
  this.limit = options && options.limit ? options.limit : 100
  this.records = new Array(this.limit)

  this._size = 0 // actual content size of the Array

  stream.Writable.call(this)
}
util.inherits(ChronoBuffer, stream.Writable)

ChronoBuffer.prototype.capacity = function () {
  return this.limit
}

ChronoBuffer.prototype.size = function () {
  return this._size
}

ChronoBuffer.prototype.isEmpty = function () {
  return this.size() === 0
}

ChronoBuffer.prototype.isFull = function () {
  return this.size() === this.capacity()
}

ChronoBuffer.prototype.write = function (element) {
  this._end = this.size()
  this.records[this._end] = element

  if (this.isFull()) {
    this.records = this.records.splice(1)
  } else {
    this._size++
  }

  return this.size()
}

ChronoBuffer.prototype.flush = function () {
  // compact the records, preallocating the array is faster but when flushing
  // the buffer you don't want an Array with null values
  if (this._size < this.capacity()) {
    this.records.splice(-this._size)
  }
  return this.records
}

module.exports = {
  create: function (options) {
    return new ChronoBuffer(options)
  }
}
