/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';

$(document).ready(function(){
  console.log('\'allo!');
  $( "div#form-slide" ).hide();
  $( "#sign-up" ).click(function () {
    if ( $( "div#form-slide" ).is( ":hidden" ) ) {
      $( "div#form-slide" ).slideDown( "slow" );
    } else {
      $( "div#form-slide" ).hide();
    }
  });
});
