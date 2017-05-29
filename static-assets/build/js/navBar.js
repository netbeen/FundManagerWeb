'use strict';
$(function () {
  var topNavHighLight = function(pageName){
    _.each($('.navbar-nav li'), function(item){
      if($(item).find('a').attr('name') === pageName){
        $(item).addClass('active');
      }
    });
  }

  topNavHighLight($('#pageName').val());
});
