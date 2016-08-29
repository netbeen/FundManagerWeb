$(function() {
  if ($('#pageName').val() === 'fund') {
    $('#fund-id-list > .list-group-item').on('click', function(){
      $('#fund-id-list > .list-group-item').removeClass('active');
      $(this).addClass('active');
    });
  }
});
