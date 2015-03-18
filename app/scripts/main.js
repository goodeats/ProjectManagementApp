/*global $:true */
/*global Backbone:true */
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
  url: 'http://localhost:3000'
};

var Router = Backbone.Router.extend({
  routes: {
    'home': 'home',  //http://localhost:9000/#/home,
    'users': 'users', // http://localhost:9000/users
    'users/:id': 'user',  //http://localhost:9000/#/users/1
    'projects': 'projects', //http://localhost:9000/#/projects
    'projects/:id': 'project',  //http://localhost:9000/#/projects/1
    'tasks': 'tasks', //http://localhost:9000/#/tasks
    'tasks/:id': 'task',  //http://localhost:9000/#/tasks/1
  },

  home: function(){
    $('#container').empty();
  },

  users: function(){
    trace('hello from the users backbone!');
    $('#container').empty();
    $('.jumbotron').hide();
    $.ajax({
      url: App.url + '/users',
      type: 'GET'
    }).done(function(response){
      // $('.container').empty();

      var template = Handlebars.compile($('#usersTemplate').html());
      $('#container').html(template({
        users: response.users
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  },

  user: function(id){
    trace('hello from the user backbone!',id);
    $('#container').empty();
    $('.jumbotron').hide();

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
      $( 'button#avatar-change' ).click(function () {
        console.log('i am clicking on the button');
        if ( $( "div#sign-in-form-slide" ).is( ":hidden" ) ) {
          $( "div#avatar-form" ).slideDown( "slow" );
          App.getAmazonKey();
        } else {
          $( "div#sign-in-form-slide" ).hide();
        }
      });
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  },

  projects: function(){
    trace('hello from the projects backbone!');
    $('#container').empty();
    $('.jumbotron').hide();

    $.ajax({
      url: App.url + '/projects',
      type: 'GET'
    }).done(function(response){
      var template = Handlebars.compile($('#projectsTemplate').html());
      $('#container').html(template({
        projects: response.projects
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  },

  project: function(id){
    trace('hello from the project backbone!');
    $('#container').empty();
    $('.jumbotron').hide();
    var locate = window.location.hash;
    var point = locate.lastIndexOf('/');
    var projectId = parseInt(locate.substring(point+1, locate.length));
    $.ajax({
      url: App.url + '/projects/' + projectId,
      type: 'GET'
    }).done(function(response){
      var template = Handlebars.compile($('#projectTemplate').html());
      $('#container').html(template({
        project: response.project
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  },

  // tasks: function(){
  //   App.tasksRouter();
  // },

  task: function(id){
    trace('hello from the task backbone!');
    $('#container').empty();
    $('.jumbotron').hide();
    var locate = window.location.hash;
    var point = locate.lastIndexOf('/');
    var taskId = parseInt(locate.substring(point+1, locate.length));
    $.ajax({
      url: App.url + '/tasks/' + taskId,
      type: 'GET'
    }).done(function(response){
      var template = Handlebars.compile($('#taskTemplate').html());
      $('#container').html(template({
        task: response.task
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  },

});

var router = new Router();
Backbone.history.start();


$(document).ready(function(){
  trace('\'allo from the main js!');
  $( "div#avatar-change" ).hide();

  $('#userlink').on('click', function(event){

  });

});
