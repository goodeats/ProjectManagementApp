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


// $(document).ajaxStart(function(e){
//   trace(e, "starting an ajax request");
//   $('section#ajax-preloader').fadeIn();
//   $('section#container').fadeOut();
// });

// $(document).ajaxComplete(function(event, xhr, settings) {
//   /* executes whenever an AJAX request completes */
//   $('section#ajax-preloader').fadeOut();
//   $('section#container').fadeIn();
// });

// var projectRouter = new ProjectRouter();

$(document).ready(function(){
  console.log('\'allo from the projects js!');

  App.projectsRouter();
  $('#projectslink').click(function() {
    $('.jumbotron').hide();
    $('.projects').show();
  });

});
