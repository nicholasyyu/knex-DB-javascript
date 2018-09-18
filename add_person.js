const pg = require("pg");
const moment = require("moment");
const settings = require("./settings");

var knex = require('knex')({
	client: 'pg',
	version: '7.2',
  	connection: {
    host : '127.0.0.1',
    user : settings.user,
    password : settings.password,
    database : settings.database
    }
});

const inputData = process.argv.slice(2)

console.log(inputData);

var insertData = {first_name: inputData[0], last_name: inputData[1], birthdate: inputData[2]};

knex.insert(insertData).into('famous_people')
.finally(function() {
  knex.destroy();
});
