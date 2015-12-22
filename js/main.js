"use strict";
$(document).ready(function(){
  $('.resource-header').click(function() {
    $(this).next('.resource-content').toggle();
  });

  var buttonClick = function (button, list) {
    $(button).click(function() {
      var item = $(this).attr('id');
      var index = jQuery.inArray(item, list);
      if (index > -1) {
        list.splice(index, 1);
      } else {
        list.push(item);
      }
      console.log(list);
    });
  };

  var categories = [];
  var filters = [];

  buttonClick('.btn-filter', filters);
  buttonClick('.btn-category', categories);

  var displayResources = function() {
    $('.resource').hide(); // hide all resources
    $('.resource').filter(); // TODO: show appropriate resources
  }

});
