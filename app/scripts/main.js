/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';

// These are our front-end routes
// http://localhost:9000/home (sign-in/sign-up)
// http://localhost:9000/users
// http://localhost:9000/users/id
// http://localhost:9000/projects
// http://localhost:9000/projects/id
// http://localhost:9000projects/id/tasks/id

var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'home': 'home'  //http://localhost:9000/#/home
  },

  home: function(){
    $('#container').empty();
  }

});

var mainRouter = new Router();
Backbone.history.start();

// (document).ajaxStart(function(e){
//   trace(e, "starting an ajax request");
//   $('section#ajax-preloader').fadeIn();
//   $('section#container').fadeOut();
// });

// $(document).ajaxComplete(function(event, xhr, settings) {
//   /* executes whenever an AJAX request completes */
//   $('section#ajax-preloader').fadeOut();
//   $('section#container').fadeIn();
// });
var SignUp = function(){
  $( 'button#sign-up' ).click(function () {
    if ( $( "div#form-slide" ).is( ":hidden" ) ) {
      $( "div#form-slide" ).slideDown( "slow" );
    } else {
      $( "div#form-slide" ).hide();
    }
  });
};

var SignIn = function(){
$( 'button#sign-in' ).click(function () {
    if ( $( "div#sign-in-form-slide" ).is( ":hidden" ) ) {
      $( "div#sign-in-form-slide" ).slideDown( "slow" );
    } else {
      $( "div#sign-in-form-slide" ).hide();
    }
  });
};

$(document).ready(function(){
  console.log('\'allo from the main js!');
  // $( "div#form-slide" ).hide();
  // $( 'button#sign-up' ).click(function () {
  //   if ( $( "div#form-slide" ).is( ":hidden" ) ) {
  //     $( "div#form-slide" ).slideDown( "slow" );
  //   } else {
  //     $( "div#form-slide" ).hide();
  //   }
  $( "div#form-slide" ).hide();
  $( "div#sign-in-form-slide").hide();
  SignUp();
  SignIn();
});
