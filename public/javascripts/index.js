(function() {

  $(function() {
    $('#save-msg').on('click', function() {
      var msg;
      msg = $('#msg');
      return $.post('save', {
        content: msg.val()
      }, function(data, textStatus, xhr) {
        $('#msg-list').prepend(data);
        return msg.val('');
      });
    });
    $('#msg-list').on('click', '#msg-list > li > p > input[name="delete"]', function() {
      var id, msg,
        _this = this;
      msg = $(this).parent().parent();
      id = msg.attr('id');
      return $.post('delete', {
        id: id
      }, function(data, textStatus, xhr) {
        return msg.remove();
      });
    });
    $('#msg-list').on('click', '#msg-list > li > p > input[name="update-save"]', function() {
      var content, id, msg, para;
      msg = $(this).parent().parent();
      id = msg.attr('id');
      para = $(msg).find('textarea');
      content = para.val();
      $(this).val('修改').attr('name', 'update');
      para.replaceWith(function() {
        return $("<p>" + content + "</p>");
      });
      return $.post('save', {
        id: id,
        content: content
      }, function(data, textStatus, xhr) {
        return true;
      });
    });
    $('#msg-list').on('click', '#msg-list > li > p > input[name="update"]', function() {
      var msg;
      $(this).val('保存修改').attr('name', 'update-save');
      return msg = $(this).parent().prev().replaceWith(function() {
        return $("<textarea cols='40' rows='3'>" + ($(this).html()) + "</textarea>");
      });
    });
    return true;
  });

}).call(this);
