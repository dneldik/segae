# SEGAE

An example of a simple application written with the Express application generator.

The application in its current shape is a simple blog system. It is possible to add and remove content after logging into the user account.

## Requirements

Node.js is needed for the application to work. During development I am using `node v12.18.3`, so to be more sure, I recommend installing this or a later stable version.

The SEGAE application uses the MongoDB database. Install MongoDB locally on your VPS or use an external service such as MongoDB Atlas.

## Installation

After copying all the application files to the root directory of your server, run:
```bash
$ npm install
``` 
in a terminal.

When `npm` installs all dependencies, open `config.js` and assign database connection string to `DB_CONNECTION` constant.
If the `DB_CONNECTION` constant is not set then the application will try to connect to the default local database named `test`.

Remember that the application loads the `config.js` file only at startup. If you make changes to the configuration, you must restart the application for the changes to take effect.

You can also assign an array of keys to the constant `COOKIE_KEYS` that are used to sign and verify the values of session cookies.

## User account management

There are two types of accounts in the SEGAE app.

- regular user account
- administrator account

The difference is that a regular user can only delete and modify content that he owns, and the administrator has control over all content regardless of who its author is.

#### Create user accounts

Being in the main application directory, you can create a new account and grant it user or administrator rights.

You can also create a default administrator account. To do this, type in the terminal:

````bash
$ node admin password
```` 

You will be prompted for an administrator password. After the password is set, a user account named `Admin` will be created with administrator privileges.

If you want to create a different user account, use the `-u` or `--user` flag to name the user. If the name consists of several words, enclose it in quotation marks.

````bash
$ node admin password -u=UserName
```` 

````bash
$ node admin password -u="User Name"
````

As before, you set a password and a user account with the given name is created, but by default it does not have administrator rights.

In both cases, you can change the default permissions for each account by using the `-a` or `--administrator` flag.

````bash
$ node admin password -a=false
```` 

````bash
$ node admin password -u=UserName -a=true
```` 

#### Modification of user accounts

If you use the commands described above on an account that already exists, then you are not creating a new account, but modifying the properties of the existing one.

You can set a new password for an existing user. Along with changing the password, you can also change the user's permissions.

If you only want to change user permissions without changing the password, use the `permissions` command with the `-a` or `--administrator` and `-u` or `--user` flags.

The `-a` or `--administrator` flag is `true` or `false`. If you do not specify a value, the default value will be `true`.

The `-u` or `--user` flag takes the username. For example, when you want to give the user `Johny` administrator privileges, you can do so by typing in the terminal:

````bash
$ node admin permissions -a=true -u=Johny
```` 

or just:

````bash
$ node admin permissions -a -u=Johny
```` 

You can also list several users one by one and change their permissions with one command.

````bash
$ node admin permissions -a=false -u=Johny -u=Adam -u=Jane
```` 

## License

MIT

Copyright (c) 2020 dneldik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
