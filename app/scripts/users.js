/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var Router = Backbone.Router.extend({
  routes: {
    'users': 'users',  //http://localhost:9000/#/users
    'users/:id': 'user'  //http://localhost:9000/#/users/1
  },

  users: function(){
    trace('hello from the user backbone!');
    $('#container').empty();
    $.ajax({
      url: 'http://localhost:3000/users', // add id after this works
      type: 'GET'
    }).done(function(response){
      var template = Handlebars.compile($('#submissionTemplate').html());
      $('#container').html(template({
        users: response.users
      }));
      trace('in the users ajax');
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  }
});


var renderUser = function(users){
  trace('render the yooser');
  var html = '';
  for(var i = 0; i < users.length; i++){
    html += '<div class="users" id="user-' + users[i].id + '">';
    html += '<article>';
    html += '<h2>' + users[i].username + '</h2>';
    html += '<img src="' + users[i].avatar + '" alt="avatar" style="width:100px;height:100px">';
    html += '<p>' + users[i].title + '</p>';
    html += '<p>' + users[i].email + '</p>';
    html += '</article></div>';

  }
  $('#container').append(html);
};

var showUser = function(){
  console.log('showing all yoosers now');
  $('.jumbotron').hide();
  $('#container').empty();

  $.ajax({
    url: 'http://localhost:3000/users', // add id for 'show' after this works
    type: 'GET'
  }).done(function(response){
    renderUser(response.users);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  }).always(function(response){
    trace(response);
  });
};




var router = new Router();
// Backbone.history.start();

$(document).ajaxStart(function(e){
  trace(e, 'starting an ajax request');
  $('section#ajax-preloader').fadeIn();
  $('section#container').fadeOut();
});

$(document).ajaxComplete(function(event, xhr, settings) {
  /* executes whenever an AJAX request completes */
  $('section#ajax-preloader').fadeOut();
  $('section#container').fadeIn();
});

$(document).ready(function(){
  console.log('\'allo from the users js!');
  $('#userlink').click(function() {
    showUser();
  });
});
