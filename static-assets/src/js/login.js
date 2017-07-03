'use strict';
$(function () {
  if ($('#pageName').val() === 'login') {
    $('.user-wrap').on('click', (e)=>{
      $.cookie('uuid',e.currentTarget.dataset.uuid);
      window.location.href = '/fund';
    });
  }
});
