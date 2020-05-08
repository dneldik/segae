module.exports = {

  cookie: {
    name: 'session',
    keys: ['key1', 'key2', 'key3'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },

  connectToDatabase: dbName => {
    if (dbName && typeof dbName === 'string')
      return `mongodb://localhost:27017/${dbName}`;
    else
      return `mongodb://localhost:27017/test`;
  }

}
