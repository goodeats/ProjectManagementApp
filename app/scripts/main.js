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
var Task = Task || {};
var Comment = Comment || {};

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

      $('#update-project').on('click', function(){
        App.updateProject();
        trace('hi update button is active');
      });

      $('#delete-project').on('click', function(){
        App.deleteProject();
        trace('hi delete button is active');
      });

      $('#new-task').on('click', function(){
        Task.newTask();
        trace('hi new task button is active <:o');
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

      $('#new-comment').on('click', function(){
        Comment.newComment();
        trace('hi new comment button is active <:o');
      });

      $('#show-comment').on('click', function(){
        Comment.showComments(taskId);
        trace('hi show comment button is active <:o');
      });

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
      trace(jqXHR, textStatus, "complete project!!");
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

Task.newTask = function(){
  trace('hello from the new task backbone');
  $('#container').empty().load('partials/task-form.html',function(response,status,xhr){
    var $form = $('#task-form');
    $form.on('submit',function(event){
      Task.newTaskForm(event,$form,router);
    });
  });
};

Task.newTaskForm = function(e,form,router){
  trace('hello from the new task form');
  if(e.preventDefault) e.preventDefault();
  var name = $(form).find("input[name='task-name']").val();
  var date = $(form).find("input[name='task-date']").val();
  var status = $(form).find("input[name='task-status']").val();
  var order = $(form).find("select[name='task-order']").val();
  var privacy = $(form).find("select[name='task-privacy']").val();
  Task.newTaskParams(name, date, status, order, privacy, router);
};

Task.newTaskParams = function(name, date, status, order, privacy, router){
  var locate = window.location.hash;
  var point = locate.lastIndexOf('/');
  var projectId = parseInt(locate.substring(point+1, locate.length));
  $.ajax({
    url: App.url + '/projects/' + projectId + '/tasks',
    type: 'POST',
    data: {
      task: {
        name: name,
        due_date: date,
        status: status,
        order: order,
        privacy: privacy,
      },
    },
    complete: function(jqXHR,textStatus){
      trace(jqXHR, textStatus, "complete task!!");
    },
    success: function(data, textStatus, jqXHR){
      router.navigate("projects",{trigger: true});
      trace(data,textStatus, jqXHR, "successful task!!");
    },
    error: function(jqXHR,error,exception){
      trace(jqXHR,error,exception);
    },
  }).done(function(response){
    trace(response, "posted task!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
    router.navigate("projects",{trigger: true});
    trace('wat');
  }).always(function(response){
    trace(response);
  });
};

Task.updateTask = function(){
  trace('hello from the update project backbone');
    $('#container').empty().load('partials/project-form.html',function(response,status,xhr){
      var $form = $('#project-form');
      $form.on('submit',function(event){
        Project.updateProcessForm(event,$form);
      });
    });
};

Task.updateProcessForm = function(e,form){
  trace('hello from the project update form');
  var locate = window.location.hash;
  var point = locate.lastIndexOf('/');
  var projectId = parseInt(locate.substring(point+1, locate.length));
  if(e.preventDefault) e.preventDefault();
  var name = $(form).find("input[name='proj-name']").val();
  var description = $(form).find("input[name='proj-description']").val();
  var date = $(form).find("input[name='proj-date']").val();
  var privacy = $(form).find("select[name='proj-privacy']").val();
  var user = localStorage.getItem('currentUser');
  Project.updatePostParams(name, description, date, privacy, user, projectId);
};

Task.updatePostParams = function(name, description, date, privacy, user, projectId){
  $.ajax({
    url: App.url + '/projects/' + projectId,
    type: 'PATCH',
    data: {
      project: {
        name: name,
        description: description,
        due_date: date,
        privacy: privacy
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

Comment.newComment = function(){
  trace('hello from the new comment backbone');
  $('#container').empty().load('partials/comment-form.html',function(response,status,xhr){
    var $form = $('#comment-form');
    $form.on('submit',function(event){
      Comment.newCommentForm(event,$form,router);
    });
  });
};

Comment.newCommentForm = function(e,form,router){
  trace('hello from the new comment form');
  if(e.preventDefault) e.preventDefault();
  var body = $(form).find("input[name='comment-body']").val();
  Comment.newCommentParams(body, router);
};

Comment.newCommentParams = function(body, router){
  var locate = window.location.hash;
  var point = locate.lastIndexOf('/');
  var taskId = parseInt(locate.substring(point+1, locate.length));
  var user = parseInt(localStorage.getItem('currentUser'));
  debugger
  $.ajax({
    url: App.url + '/tasks/' + taskId + '/comments',
    type: 'POST',
    data: {
      comment: {
        body: body,
        user_id: user
      },
    },
    complete: function(jqXHR,textStatus){
      trace(jqXHR, textStatus, "complete comment!!");
    },
    success: function(data, textStatus, jqXHR){
      router.navigate("projects",{trigger: true});
      trace(data,textStatus, jqXHR, "successful comment!!");
    },
    error: function(jqXHR,error,exception){
      trace(jqXHR,error,exception);
    },
  }).done(function(response){
    trace(response, "posted comment!!");
  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
    router.navigate("projects",{trigger: true});
    trace('wat');
  }).always(function(response){
    trace(response);
  });
};

Comment.showComments = function(taskId){
  trace('hello from the show comments backbone');
  $.ajax({
    url: App.url + '/tasks/' + taskId + '/comments',
    type: 'GET',
  }).done(function(response){
    trace(response, "showed comment!!");

    // debugger
    // $('#commentsList').append('User: ' + response.comments);
    // // $('#commentsList').append('User: ' + response.user.username);



  }).fail(function(jqXHR, textStatus, thrownError){
    trace(jqXHR, textStatus, thrownError);
    router.navigate("projects",{trigger: true});
    trace('wat');
  }).always(function(response){
    trace(response);
  });
};

App.updateProject = function(){
  trace('hello from the update project backbone');
    $('#container').empty().load('partials/project-form.html',function(response,status,xhr){
      var $form = $('#project-form');
      $form.on('submit',function(event){
        Project.updateProcessForm(event,$form);
      });
    });
};

Project.updateProcessForm = function(e,form){
  trace('hello from the project update form');
  var locate = window.location.hash;
  var point = locate.lastIndexOf('/');
  var projectId = parseInt(locate.substring(point+1, locate.length));
  if(e.preventDefault) e.preventDefault();
  var name = $(form).find("input[name='proj-name']").val();
  var description = $(form).find("input[name='proj-description']").val();
  var date = $(form).find("input[name='proj-date']").val();
  var privacy = $(form).find("select[name='proj-privacy']").val();
  var user = localStorage.getItem('currentUser');
  Project.updatePostParams(name, description, date, privacy, user, projectId);
};

Project.updatePostParams = function(name, description, date, privacy, user, projectId){
  $.ajax({
    url: App.url + '/projects/' + projectId,
    type: 'PATCH',
    data: {
      project: {
        name: name,
        description: description,
        due_date: date,
        privacy: privacy
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

var router = new Router();
Backbone.history.start();

$(document).ready(function(){
  trace('\'allo from the main js!');
  $( "div#avatar-change" ).hide();

});
