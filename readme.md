Steps from Client/Server Review:
===


Set up Node + Express to use Body-Parser
---
- npm init
- npm install express --save
- npm install body-parser --save

Client side setup
---
- created public folder
- create vendors folder in public
- create views folder in public
- create index.html and styles.css in views folder
- place jquery js file in vendors
- create cripts folder in public
- create client.js in scripts
- src jquery, then client.js
- link styles.css
- add .gitignore file
- gitignore .DS_Store and node_modules

Server setup
---
- create'server.js'
- require the following:
 - express
 - path
 - body-parser
- set app to be an express app: var app = express() ;
- set up uses:
 - bodyParser.urlencoded
 - express.static for public folder
- add spin up server code (app.listen)
- test server up
- add serve the html file code
- restart server
- open page in browser

AJAX get
---
- add AJAX get call function in client.js
 - makes a GET call to a route
 - console logs out the response
- run this function on doc ready
- add get route to server.js
 - logs out (in terminal) that states that the route has been hit
 - responds with a simple object
- restart server
- reload page
- check the function is running on page load
- check the terminal that the get route's console log is showing correctly
- check the browser console that the server response is logging correctly

Day 2 lecture (db)
===

in Postico:

- create new database ("psiGarage" in class)
- create a table within this new db ("cars")
 - id
 - year
 - make
 - model

- npm install pg --save

In server.js:
- add require for "pg"
- add pool config object
- create new pool with this config

```javascript
var pg = require( 'pg' );

// setup config for the pool
var config = {
  database: 'psiGarage',
  host: 'localhost',
  port: 5432,
  max: 12
}; // end config

// create new pool using this config
var pool = new pg.Pool( config );
```

In the get /cars route:

- connect to db with pool
- send back to client connection status

```javascript
pool.connect( function( err, connection, done ){
  //check if there was an Error
  if( err ){
    console.log( err );
    // respond with PROBLEM!
    res.send( 400 );
  }// end Error
  else{
    console.log('connected to db');
    // close connection to reopen spot in pool
    done();
    // respond with OK
    res.send( 200 );
  } // end no error
}); //end pool
```

- restart server
- check that the console logs to see if connection to db is working

Getting data from the db:
---

- update pool connect to check if there is an error
- if no error hold the result set in a variable
- push each row in the result set into an array
- on result set end: close connection with done() and res.send the array

```javascript
pool.connect( function( err, connection, done ){
  //check if there was an Error
  if( err ){
    console.log( err );
    // respond with PROBLEM!
    res.send( 400 );
  }// end Error
  else{
    console.log('connected to db');
    // send query for all cars in the 'cars' table and hold in a variable (resultSet)
    var resultSet = connection.query( "SELECT * from cars" );
    // convert each row into an object in the allCars array
    // on each row, push the row into allCars
    resultSet.on( 'row', function( row ){
      allCars.push( row );
    }); //end on row
    // on end of rows send array as response
    resultSet.on( 'end', function(){
      // close connection to reopen spot in pool
      done();
      // res.send array of cars
      res.send( allCars );
    }); //end on end
  } // end no error
}); //end pool
```

- restart server
- add some dummy data to the table on db and it should show up on the DOM when refreshed

Add data to db
---
- Add in else statment (if no error) in post route in server
```javascript
connection.query("INSERT into tableName(columnName1, columnName2) values($1, $2)", [ req.body.objectKeyName1, req.body.objectKeyName1] );
  // $1 and $2 are wildcard cards (ie. $1, $2, $3 etc)

 EXAMPLE : 
   app.post ('/koalas', function (req, res){
    console.log( req.body );
    connect ( function (err, connection, done ){
    if (err) {
     res.send ( 400 );
    } else {
      console.log('connected to db');
      connection.query("INSERT into koalas(name, age) values($1, $2)", [ req.body.name, req.body.age] );
      done(); //close connection
      res.send ( 200 );
     }// end else
    });//end pool connect
   });//end route
```
 URL Params and Query Params
 ---
 URL params
 - Allows you to make more specific GET requests
 - Ex: facebook.com/username --> gives you just that users information instead of all information from server
```javascript
//http://localhost:3000/test/45
   app.get('/test/:id' , function ( req, res ){
    console.log (req.params);
     //--> { id : '76' }
    console.log (req.params.id);
     //--> { '76' }
  }

```

Query Params
 - ```?key=value``` --> query string

```javascript
//http://localhost:3000/testQuery?name=bob
     app.get('/testQuery' , function ( req, res ){
       console.log (req.query);
     //--> { id : '76' }

```
