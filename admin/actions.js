const mongoose = require('mongoose');
const config = require('../config');
const Users = require('../models/users');

/**
 * The function name is a command.
 * Function arguments are command options.
 * The password function is used to change the
 * password (and / or) to change user permissions.
 */
function connect() {

  mongoose.connect(config.connectToDatabase(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch(error => console.log('I cannot connect to the database'));

  return mongoose.connection;

}

function password(options) {

  process.stdout.write(`set new password\n`);

  const db = connect();
  db.on('error', err => console.log('Database connection lost'));

  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', () => {

    const userName = (options.user || options.u || 'Admin');
    const admin = (options.administrator || options.a);
    const input = process.stdin.read();
    const password = input.trim();

    const userFieldsToUpdate = { password: password };

    if (admin && admin !== 'false')
      userFieldsToUpdate.admin = true;
    else if (admin && admin === 'false')
      userFieldsToUpdate.admin = false;

    Users.findOneAndUpdate(
      { user: userName },
      userFieldsToUpdate,
      { useFindAndModify: false })
      .then(document => {

        if (!document) {
          if (userName === 'Admin' && userFieldsToUpdate.admin !== false)
            userFieldsToUpdate.admin = true;
          userFieldsToUpdate.user = userName;
          const UserData = new Users(userFieldsToUpdate);
          UserData.save().then(() => { db.close(); });
        }
        else
          db.close();

      });

  });

};

/**
 * The function name is a command.
 * Function arguments are command options.
 * The permissions function is used to change user permissions.
 */
function permissions(options) {

  const userName = (options.user || options.u || undefined);
  const admin = (options.administrator || options.a || undefined);

  const permissions = (() => {
    if (admin === true) return true;
    else if (typeof admin === 'string') {
      switch (admin) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          return undefined;
      }
    } else return undefined;
  })();

  const updatePermissions = (dbConnection, name, keepAlive = false) => {

    Users.findOneAndUpdate(
      { user: name },
      { admin: permissions },
      { useFindAndModify: false })
      .then(document => {
        !document && console.log(`user ${name} not found`);
        !keepAlive && dbConnection.close();
      });

  }

  if (permissions === undefined) {
    console.log('you did not specify permissions');
    return;
  }

  if (userName && userName.constructor === Array) {

    const db = connect();
    userName.forEach((name, index) => {
      if (name.constructor !== String || name === '') return;
      if (index !== (userName.length - 1)) updatePermissions(db, name, true);
      else updatePermissions(db, name);
    });

  }
  else if (userName && userName.constructor === String) {

    const db = connect();
    updatePermissions(db, userName);

  }
  else
    console.log('you did not specify user name');

}

return module.exports = {

  password,
  permissions

}