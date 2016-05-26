'use strict'

var assign = require('101/assign')
var map = require('async').map
var googlePlaces = require('./lib/google-places-client.js')

// input data
var input = [
  {
    name: 'philz coffee',
    address: '399 Golden Gate Ave, San Francisco, CA 94102'
  }
]

// get data from google
map(input, function (inItem, cb) {
  googlePlaces.getByNameAndAddress(inItem, function (err, json) {
    var outItem = assign({}, inItem)

    if (err) {
      outItem.err = err
      cb(null, outItem)
      return
    }

    var firstResult = json.results[0]

    if (!firstResult) {
      outItem.err = new Error('no places found :(')
      cb(null, outItem)
      return
    }

    outItem.google = {
      id: firstResult.place_id,
      name: firstResult.name,
      address: firstResult.formatted_address
    }

    if (json.results.length > 1) {
      console.warn(inItem.name + ' resulted in multiple results..')
      console.warn(JSON.stringify(json.results, null, 2))
    }

    googlePlaces.getDetailsById(outItem.google.id, function (err, details) {
      if (err) {
        outItem.err = err
        cb(null, outItem)
        return
      }
      outItem.google.phoneNumber = details.result.formatted_phone_number
      cb(null, outItem)
    })
  })

}, done)

function done (err, output) {
  // print
  output.forEach(function (item) {
    console.log(JSON.stringify(item, null, 2))
  })
}