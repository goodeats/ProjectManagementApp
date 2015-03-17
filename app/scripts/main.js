/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

// These are our front-end routes
// http://localhost:9000/home (sign-in/sign-up)
// http://localhost:9000/users/id
// http://localhost:9000/projects
// http://localhost:9000/projects/id
// http://localhost:9000projects/id/tasks/id
var App = App || {
  url: 'http://localhost:3000',

};

var Router = Backbone.Router.extend({
  routes: {
    'home': 'home',  //http://localhost:9000/#/home,
    'users': 'users', // http://localhost:9000/users
    'users/:id': 'user',  //http://localhost:9000/#/users/1
    'projects': 'projects'
  },

  home: function(){
    $('#container').empty();
  },
  users: function(){
    App.usersRouter();
  },
  user: function(id){
    App.userRouter(id);
  },
  projects: function(){
    App.projectsRouter();
  },

});

App.usersRouter = function(){
  trace('hello from the users backbone!');
  $('#container').empty();
  $.ajax({
    url: App.url + '/users',
    type: 'GET'
  }).done(function(response){
    var template = Handlebars.compile($('#usersTemplate').html());
    $('#container').html(template({
      users: response.users
    }));
    $('.user').hide();
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  }).always(function(response){
    trace(response);
  });
};

App.userRouter = function(id){
  trace('hello from the user backbone!');
  $('#container').empty();
  var locate = window.location.hash;
  var point = locate.lastIndexOf('/');
  var userId = parseInt(locate.substring(point+1, locate.length));
  $.ajax({
    url: App.url + '/users/' + userId,
    type: 'GET'
  }).done(function(response){
    var template = Handlebars.compile($('#userTemplate').html());
    $('#container').html(template({
      user: response.user
    }));
    // $('.user').hide();
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  }).always(function(response){
    trace(response);
  });
};

App.projectsRouter = function(){
  trace('hello from the projects backbone!');
  $('#container').empty();
  $.ajax({
    url: App.url + '/projects',
    type: 'GET'
  }).done(function(response){
    var template = Handlebars.compile($('#projectsTemplate').html());
    $('#container').html(template({
      projects: response.projects
    }));
    $('.projects').hide();
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  }).always(function(response){
    trace(response);
  });
};

var router = new Router();
Backbone.history.start();

// $(document).ajaxStart(function(e){
//   trace(e, 'starting an ajax request');
//   $('section#ajax-preloader').fadeIn();
//   $('section#container').fadeOut();
// });

// $(document).ajaxComplete(function(event, xhr, settings) {
//   /* executes whenever an AJAX request completes */
//   $('section#ajax-preloader').fadeOut();
//   $('section#container').fadeIn();
// });

$(document).ready(function(){
  console.log('\'allo from the main js!');

  $( 'div#form-slide' ).hide();
  $( 'button#sign-up' ).click(function () {
    if ( $( 'div#form-slide' ).is( ':hidden' ) ) {
      $( 'div#form-slide' ).slideDown( 'slow' );
    } else {
      $( 'div#form-slide' ).hide();
    }
  });

  App.usersRouter();
  $('#userlink').click(function() {
    $('.jumbotron').hide();
    $('.user').show();
  });

  App.userRouter();
  $('#userlink').click(function() {
    $('.jumbotron').hide();
    $('.user').show();
  });

  App.projectsRouter();
  $('#projectslink').click(function() {
    $('.jumbotron').hide();
    $('.projects').show();
  });

});
