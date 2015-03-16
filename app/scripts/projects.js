/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

// var ProjectRouter = Backbone.Router.extend({
//   routes: {
//     'projects': 'projects',  //http://localhost:9000/#/submissions/1
//     'projects/:id': 'projectShow'  //http://localhost:9000/#/submissions/1
//   },

//   projects: function(id){
//     console.log('hello from the projects view');
//     $('#container').empty();
//   },

//   projectShow: function(id){
//     console.log('hello from the project show view');
//     $('#container').empty();
//   }
// });

var renderProject = function(projects){
  trace('render the project');
  var html = '';
  for(var i = 0; i < projects.length; i++){
    html += '<div class="projects" id="project-' + projects[i].id + '">';
    html += '<article>';
    html += '<h2>' + projects[i].name + '</h2>';
    html += '<p>Description: ' + projects[i].description + '</p>';
    html += '<p>Due Date: ' + projects[i].due_date + '</p>';
    html += '<p>Private Project: ' + projects[i].privacy + '</p>';
    html += '</article></div>';

  }
  $('#container').append(html);
};

var showProject = function(){
  console.log('showing all projects now');
  $('.jumbotron').hide();
  $('#container').empty();

  $.ajax({
    url: 'http://localhost:3000/projects', // add id for 'show' after this works
    type: 'GET'
  }).done(function(response){
    renderProject(response.projects);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  }).always(function(response){
    trace(response);
  });
};

$(document).ajaxStart(function(e){
  trace(e, "starting an ajax request");
  $('section#ajax-preloader').fadeIn();
  $('section#container').fadeOut();
});

$(document).ajaxComplete(function(event, xhr, settings) {
  /* executes whenever an AJAX request completes */
  $('section#ajax-preloader').fadeOut();
  $('section#container').fadeIn();
});

// var projectRouter = new ProjectRouter();

$(document).ready(function(){
  console.log('\'allo from the projects js!');
  $('#projectlink').click(function() {
    showProject();
  });
});
