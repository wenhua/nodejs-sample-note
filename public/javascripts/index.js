(function() {

  $(function() {
    return $('#save-msg').on('click', function() {
      var msg;
      msg = $('#msg');
      return $.post('save', {
        content: msg.val()
      }, function(data, textStatus, xhr) {
        $('#msg-list').prepend(data);
        return msg.val('');
      });
    });
  });

}).call(this);
