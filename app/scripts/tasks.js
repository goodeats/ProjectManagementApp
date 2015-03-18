/*global $:true */
/*global Handlebars:true */
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {};

App.taskRouter = function(){
  trace('hello from the task backbone!');
  $('#container').empty();
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
};

// // App.taskRouter.delete = function(){
//   trace('hello from the task backbone!');
//   $('#container').empty();
//   var locate = window.location.hash;
//   var point = locate.lastIndexOf('/');
//   var taskId = parseInt(locate.substring(point+1, locate.length));
//   $.ajax({
//     url: App.url + '/tasks/' + taskId,
//     type: 'GET'
//   }).done(function(response){
//     var template = Handlebars.compile($('#taskTemplate').html());
//     $('#container').html(template({
//       task: response.task
//     }));
//   }).fail(function(jqXHR, textStatus, errorThrown){
//     trace(jqXHR, textStatus, errorThrown);
//   }).always(function(response){
//     trace(response);
//   });
// };



$(document).ready(function(){
  console.log('\'allo from the tasks js!');
  $('#container').hide();

  App.taskRouter();

  $('#taskslink').click(function() {
    $('.jumbotron').hide();
    $('#container').show();
  });

});
