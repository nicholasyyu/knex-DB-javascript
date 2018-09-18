const pg = require("pg");
const settings = require("./settings"); // settings.json
const moment = require("moment");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const searchData = process.argv.slice(2).join("");
//const query = "SELECT * FROM famous_people";
const query = "SELECT * FROM famous_people WHERE first_name = $1";

function convertDate(date){
  let tempDate = new Date(date);
  let formatDate = moment(tempDate).format('MMMM Do YYYY');
  return formatDate;
}

client.connect((err) => {
  console.log("Searching ...");
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, [searchData], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name ${searchData}`);
    let index = 0;
    result.rows.forEach(rows => {
      index++;
      let birthdate = convertDate(rows.birthdate);
      console.log(`- ${index}: ${rows.first_name} ${rows.last_name}, born ${birthdate}`);
    })
    client.end();
  });
});