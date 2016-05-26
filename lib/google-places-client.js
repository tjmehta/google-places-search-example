'use strict'

require('assert-env')([
  'GOOGLE_API_KEY'
])

var qs = require('querystring')

var request = require('request')

request = request.defaults({ json: true })

module.exports = new GooglePlacesClient(process.env.GOOGLE_API_KEY)

function GooglePlacesClient (key) {
  this.key = key
  this.url = 'https://maps.googleapis.com/maps/api/place/'
}

GooglePlacesClient.prototype.get = function (path, query, cb) {
  query = query || {}
  query.key = this.key
  var url = this.url + path + '/json?' + qs.stringify(query)
  request.get(url, function (err, res, json) {
    cb(err, json)
  })
}

/**
 * find places by name and address
 * @param {String} text
 * @param {Function} cb
 */
GooglePlacesClient.prototype.getByText = function (text, cb) {
  this.get('textsearch', { query: text }, cb)
}

/**
 * find places by name and address
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.address
 * @param {Function} cb
 */
GooglePlacesClient.prototype.getByNameAndAddress = function (data, cb) {
  this.getByText(data.name + ' at ' + data.address, cb)
}

/**
 * get place details by google place id
 * @param {String} placeId google place id
 * @return {[type]} [description]
 */
GooglePlacesClient.prototype.getDetailsById = function (placeId, cb) {
  this.get('details', { placeid: placeId }, cb)
}
