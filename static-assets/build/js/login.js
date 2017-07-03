'use strict';
$(function () {
  if ($('#pageName').val() === 'login') {
    $('.user-wrap').on('click', (e)=>{
      console.log(e.currentTarget.dataset.uuid);
      $.cookie('debug',e.currentTarget.dataset.uuid)
    });
  }
});
