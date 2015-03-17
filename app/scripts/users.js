/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

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
    $('.user').hide();
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  }).always(function(response){
    trace(response);
  });
};

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
  console.log('\'allo from the users js!');

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

});
