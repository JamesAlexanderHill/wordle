const level = require('level')

const db = level('./server/data', { valueEncoding: 'json' })

module.exports = db;