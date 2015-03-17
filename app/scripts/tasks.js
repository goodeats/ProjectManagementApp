/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';


App.taskRouter = function(){
  trace('hello from the task backbone!');
  $('#container').empty();
  var locate = window.location.hash;
  var point = locate.lastIndexOf('/');
  var taskId = parseInt(locate.substring(point+1, locate.length));
  debugger;
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
};

// var TaskRouter = Backbone.Router.extend({
//   routes: {
//     'projects/:id/tasks/:id': 'taskShow'  //http://localhost:9000/#/submissions/1
//   },

//   taskShow: function(id){
//     console.log('hello from the task show view');
//     $('#container').empty();
//   }

// });

// var taskRouter = new TaskRouter();

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

$(document).ready(function(){
  console.log('\'allo from the tasks js!');
  $('#container').hide();

  // App.projectsRouter();
  App.taskRouter();
  $('#taskslink').click(function() {
    $('.jumbotron').hide();
    $('#container').show();
  });

});
