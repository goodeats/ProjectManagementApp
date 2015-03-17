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
    App.usersRouter();
  },
  user: function(id){
    App.userRouter(id);
  },
  projects: function(){
    App.projectsRouter();
  },
  project: function(id){
    App.projectRouter(id);
  },

});

var router = new Router();
Backbone.history.start();


$(document).ready(function(){
  trace('\'allo from the main js!');
  $( "div#avatar-change" ).hide();


});
