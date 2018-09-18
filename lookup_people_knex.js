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

const searchData = process.argv.slice(2).join("");

function convertDate(date){
  let tempDate = new Date(date);
  let formatDate = moment(tempDate).format('MMMM Do YYYY');
  return formatDate;
}

const queryHandler = (err, rows) => {
	if (err) return console.error(err);
  	console.log(`Found ${rows.length} person(s) by the name ${searchData}`);
  	let index = 0;
    rows.forEach(rows => {
      index++;
      let birthdate = convertDate(rows.birthdate);
      console.log(`- ${index}: ${rows.first_name} ${rows.last_name}, born ${birthdate}`);
    })
};

knex.select('*').from('famous_people')
.where('first_name', '=', searchData)
.asCallback(queryHandler)
.finally(function() {
  knex.destroy();
});
