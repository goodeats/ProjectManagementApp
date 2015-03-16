/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';

var ProjectRouter = Backbone.Router.extend({
  routes: {
    'projects': 'projects',  //http://localhost:9000/#/submissions/1
    'projects/:id': 'projectShow'  //http://localhost:9000/#/submissions/1
  },

  projects: function(id){
    console.log('hello from the projects view');
    $('#container').empty();
  },

  projectShow: function(id){
    console.log('hello from the project show view');
    $('#container').empty();
  }

});

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

var projectRouter = new ProjectRouter();

$(document).ready(function(){
  console.log('\'allo from the projects js!');
});
