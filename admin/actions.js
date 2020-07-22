const mongoose = require('mongoose');
const config = require('../config');
const Users = require('../models/users');

function password(options) {

  process.stdout.write(`set new password\n`);

  mongoose.connect(config.connectToDatabase('segae_data'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch(error => console.log('I cannot connect to the database'));

  const db = mongoose.connection;
  db.on('error', err => console.log('Database connection lost'));

  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', () => {

    const userName = (options.user || options.u || 'Admin');
    const input = process.stdin.read();
    const password = input.trim();

    const UserData = new Users(
      {
        user: userName,
        password: password,
      }
    );

    Users.findOneAndUpdate(
      { user: userName },
      { password: password },
      { useFindAndModify: false })
      .then(document => {

        if (!document)
          UserData.save().then(() => { db.close(); })
        else
          db.close();

      });

  });

};

return module.exports = {

  password

}