const level = require('level')

const db = level('./server/db', { valueEncoding: 'json' })

module.exports = db;