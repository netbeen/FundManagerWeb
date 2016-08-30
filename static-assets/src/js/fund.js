$(function() {
  if ($('#pageName').val() === 'fund') {
    $('#fund-id-list > .list-group-item').on('click', function(){
      $('#fund-id-list > .list-group-item').removeClass('active');
      $(this).addClass('active');
      $.ajax({
        url: '/api/v1/fund/'+this.innerHTML,
        type: "get",
      }).done(function(data) {
        console.log(data);
      });
    });
  }
});
