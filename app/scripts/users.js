/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';

var UserRouter = Backbone.Router.extend({
  routes: {
    'users': 'users',  //http://localhost:9000/#/comments
    'users/:id': 'userShow'  //http://localhost:9000/#/submissions/1
  },

  users: function(id){
    console.log('hello from the users view');
    $('#container').empty();
  },

  userShow: function(id){
    console.log('hello from the user show view');
    $('#container').empty();
  }

});


var userRouter = new UserRouter();

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
  console.log('\'allo!');
});
