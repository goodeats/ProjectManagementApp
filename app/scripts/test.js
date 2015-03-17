/*global $:true */
/*global Handlebars:true */
/*global Backbone:true */
'use strict';
var myAws;
var fileName;
var App = {};

App.getAmazonKey = function(){
  console.log('im in the getamazonkey function');
  var apiURL = 'http://localhost:3000'

  $.ajax({
    url: apiURL + '/amazon/sign_key/amazon/sign_key/image%2Fjpeg'
  }).done(function(data){
    myAws = data;
    App.buildFormData(data);
    App.sendImageToRails(data.key);
  });

};

App.buildFormData = function(myAws){
  console.log('im in the buildformdata function');
  fileName = myAws.key;
  console.log("I'm in the build form data section ");
  $('form#avatar').append('<input type="hidden" name="key" value="' + myAws.key + '">')
  $('form#avatar').append('<input type="hidden" name="AWSAccessKeyId" value="' + myAws.access_key + '">')
  $('form#avatar').append('<input type="hidden" name="policy" value="' + myAws.policy + '">')
  $('form#avatar').append('<input type="hidden" name="signature" value="' + myAws.signature + '">')
  $('form#avatar').append('<input type="hidden" name="Content-Type" value="image/jpeg">')
  $('form#avatar').append('File to upload to S3');
  $('form#avatar').append('<input id="file_upload" name="file" type="file"><br>');
  $('form#avatar').append('<input id="form-submit" type="submit" value="Upload File to S3">');
}

App.sendImageToRails = function(fileName){
    var $form = $('form#avatar');
  $('body').on('submit',$form, function(e,$form){
      App.postImageToRails(fileName);
      $($form).submit();
    });
  };

App.postImageToRails = function(fileName){
  var user_id = 5;
  var title = "something else";

  console.log("im inside the postimage to rails and my file name is " + fileName);
  $.ajax({
    url: 'http://localhost:3000/users/' + user_id,
    type: 'PUT',
    data: {
      user: {
        avatar: 'https://s3.amazonaws.com/project-management-bucket/' + fileName
      }
    }
  }).done(function(response){
      debugger;
      console.log(response)
    }).fail(function(jqXHR, textStatus, errorThrow){
      console.log(jqXHR, textStatus, errorThrow);
    }).always(function(response){
      console.log(response);
    });
};


$(document).ready(function(){
  App.getAmazonKey();

});
