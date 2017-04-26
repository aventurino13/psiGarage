// requires
var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser');
var port = 4567;
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

// uses
app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// spin server
app.listen( port, function(){
  console.log( 'server up on:', port );
}); //end spin up server

// routes
// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); //end home base

app.get( '/cars', function( req, res ){
  console.log( 'cars get route hit' );

  // array of cars
  var allCars = [];
  // connect to db
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
}); //end cars get
