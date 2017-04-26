$( document ).ready( function(){

  // startUp stuff
  getCars();
}); // end doc ready

function getCars(){
  console.log( 'in getCars');
  // ajax call to server
  $.ajax({
    url: '/cars',
    type: 'GET',
    success: function( response ){
      // receive cars array
      console.log( 'back from server with:', response );
      // display cars on DOM
      $( '#garage' ).empty();
      for (var i = 0; i < response.length; i++) {
        $( '#garage' ).append( '<p>' + response[i].year + ' ' + response[i].make + ' ' + response[i].model + '</p>' );
      }
    } //end success
  }); // end ajax
} // end getCars
