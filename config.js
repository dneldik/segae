/**
 * This file contains the basic configuration.
 * DB_CONNECTION - connection string to connect to the database.
 * COOKIE_KEYS - The key array used to sign and verify session cookies.
 */
const DB_CONNECTION = `mongodb://localhost:27017/segae_data`;
const COOKIE_KEYS = ['key1', 'key2', 'key3'];

module.exports = {

  cookie: {
    name: 'session',
    keys: COOKIE_KEYS,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },

  connectToDatabase: () => {
    if (DB_CONNECTION) return DB_CONNECTION;
    else return `mongodb://localhost:27017/test`;
  }

}
