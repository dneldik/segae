const Arguments = require('./arguments');
const Actions = require('./actions');

const command = Arguments._;

if (Actions.hasOwnProperty(command)) {

  const params = Arguments.getParams();
  Actions[command](params);

}
else {
  console.log(`\nunknown command: ${command}\n`);
}
