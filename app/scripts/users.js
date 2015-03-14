/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var UserRouter = Backbone.Router.extend({
  routes: {
    'users': 'users',  //http://localhost:9000/#/users
    'users/:id': 'user',  //http://localhost:9000/#/users/1
    // 'users/:id': 'userUpdate'  //http://localhost:9000/#/users/1
  },

  // users: function(id){
  //   console.log('hello from the users view');
  //   $('#container').empty();
  //   //index
  // },

  user: function(id){
    console.log('hello from the user view!');
    $('#container').empty();
    $.ajax({
      url: 'http://localhost:9000/users' + id,
      type: 'GET'
    }).done(function(response){
      var template = Handlebars.compile($('#showUserTemplate').html());
      $('#container').html(template({
        submission: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  },

  userUpdate: function(id){
    console.log('hello from the user view!');
    $('#container').empty();
    $.ajax({
      url: 'http://localhost:9000/users' + id,
      type: 'PATCH'
    }).done(function(response){
      var template = Handlebars.compile($('#updateUserTemplate').html());
      $('#container').html(template({
        submission: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  }

});


var userRouter = new UserRouter();

(document).ajaxStart(function(e){
  trace(e, "starting an ajax request");
  $('section#ajax-preloader').fadeIn();
  $('section#container').fadeOut();
});

$(document).ajaxComplete(function(event, xhr, settings) {
  /* executes whenever an AJAX request completes */
  $('section#ajax-preloader').fadeOut();
  $('section#container').fadeIn();
});

$(document).ready(function(){
  console.log('howdy from the users page!');
});
