/*global $:true */
/*global Backbone:true */
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
  // url: 'http://localhost:3000'
  url: 'https://project-management-api.herokuapp.com'
};
var Project = Project || {};

var Router = Backbone.Router.extend({
  routes: {
    'home': 'home',  //http://localhost:9000/#/home,
    'users': 'users', // http://localhost:9000/users
    'users/:id': 'user',  //http://localhost:9000/#/users/1
    'projects': 'projects', //http://localhost:9000/#/projects
    'projects/:id': 'project',  //http://localhost:9000/#/projects/1
    'new-project': 'newProject',//http://localhost:9000/#/new-project
    'update-project': 'updateProject',//http://localhost:9000/#/update-project
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

      $('#delete-project').on('click', function(){
        App.deleteProject();
        trace('hi delete button is active');
      });

    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  },

  newProject: function(){
    trace('hello from the new project backbone');
    $('#container').empty().load('partials/project-form.html',function(response,status,xhr){
      var $form = $('#project-form');
      $form.on('submit',function(event){
        Project.newProcessForm(event,$form,router);
      });
    });
  },

  updateProject: function(event){
    trace('hello from the update project backbone');
    if(event.preventDefault) event.preventDefault();
    var locate = window.location.hash;
    var point = locate.lastIndexOf('/');
    var projectId = parseInt(locate.substring(point+1, locate.length));
      $.ajax({
        url: App.url + '/projects/' + projectId,
        type: 'PATCH',
        data: {
          project: {
            name: $('#proj-name').val(),
            description: $('#proj-description').val(),
            due_date: $('#proj-date').val(),
            privacy: $('#proj-privacy').val()
          }
        }
      }).done(function(response){
        var template = Handlebars.compile($('#updateProjectTemplate').html());
        $('#container').html(template({
          project: response.project
        }));
      }).fail(function(jqXHR, textStatus, errorThrown){
        trace(jqXHR, textStatus, errorThrown);
      });
      location.reload();
  },

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

Project.newProcessForm = function(e,form,router){
  trace('hello from the project new form');
  if(e.preventDefault) e.preventDefault();
  var name = $(form).find("input[name='proj-name']").val();
  var description = $(form).find("input[name='proj-description']").val();
  var date = $(form).find("input[name='proj-date']").val();
  var privacy = $(form).find("select[name='proj-privacy']").val();
  var user = localStorage.getItem('currentUser');
  Project.newPostParams(name, description, date, privacy, user, router);
};

Project.newPostParams = function(name, description, date, privacy, user, router){
  $.ajax({
    url: App.url + '/projects',
    type: 'POST',
    data: {
      project: {
        name: name,
        description: description,
        due_date: date,
        privacy: privacy,
        // user: user
      },
    },
    complete: function(jqXHR,textStatus){
      trace(jqXHR, textStatus, "complete post!!");
    },
    success: function(data, textStatus, jqXHR){
      router.navigate("projects",{trigger: true});
      trace(data,textStatus, jqXHR, "successful post!!");
    },
    error: function(jqXHR,error,exception){
      trace(jqXHR,error,exception);
    },
  }).done(function(response){
    trace(response, "posted project!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
    router.navigate("projects",{trigger: true});
    trace('wat');
  }).always(function(response){
    trace(response);
  });
};

// Project.updateProcessForm = function(e,form,projectId,router){
//   trace('hello from the project update form');
//   if(e.preventDefault) e.preventDefault();
//   var name = $(form).find("input[name='proj-name']").val();
//   var description = $(form).find("input[name='proj-description']").val();
//   var date = $(form).find("input[name='proj-date']").val();
//   var privacy = $(form).find("select[name='proj-privacy']").val();
//   var user = localStorage.getItem('currentUser');
//   Project.newPostParams(name, description, date, privacy, user, projectId, router);
// };

// Project.updatePostParams = function(name, description, date, privacy, user, projectId, router){
//   $.ajax({
//     url: App.url + '/projects/' + projectId,
//     type: 'PATCH',
//     data: {
//       project: {
//         name: name,
//         description: description,
//         due_date: date,
//         privacy: privacy,
//         // user: user
//       },
//     },
//     complete: function(jqXHR,textStatus){
//       trace(jqXHR, textStatus, "complete post!!");
//     },
//     success: function(data, textStatus, jqXHR){
//       router.navigate("projects",{trigger: true});
//       trace(data,textStatus, jqXHR, "successful post!!");
//     },
//     error: function(jqXHR,error,exception){
//       trace(jqXHR,error,exception);
//     },
//   }).done(function(response){
//     trace(response, "posted project!!");
//   }).fail(function(jqXHR, textStatus, thrownError){
//     trace(jqXHR, textStatus, thrownError);
//     router.navigate("projects",{trigger: true});
//     trace('wat');
//   }).always(function(response){
//     trace(response);
//   });
// };

var router = new Router();
Backbone.history.start();

App.deleteProject = function(){
  trace('hello from the delete project backbone');
  $('#container').empty();
  $('.jumbotron').hide();
  var locate = window.location.hash;
  var point = locate.lastIndexOf('/');
  var projectId = parseInt(locate.substring(point+1, locate.length));
  $.ajax({
    url: App.url + '/projects/' + projectId,
    type: 'DELETE',
  }).done(function(data){
    trace(data);
    trace('deleted project');
    window.location.href = '/#/projects';
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(App.url + '/#/projects/' + projectId);
    trace(jqXHR, textStatus, errorThrown);
  });
}


$(document).ready(function(){
  trace('\'allo from the main js!');
  $( "div#avatar-change" ).hide();




});
