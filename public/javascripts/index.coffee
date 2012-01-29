$ ->
  $('#save-msg').on 'click', ->
    msg = $('#msg');
    $.post 'save', {content: msg.val()}, (data, textStatus, xhr) ->
      $('#msg-list').prepend data
      msg.val ''
  $('#msg-list').on 'click', '#msg-list > li > p > input[name="delete"]', ->
    msg = $(@).parent().parent()
    id = msg.attr 'id'
    $.post 'delete', {id: id}, (data, textStatus, xhr) =>
      msg.remove()
  $('#msg-list').on 'click', '#msg-list > li > p > input[name="update-save"]', ->
    msg = $(@).parent().parent()
    id = msg.attr 'id'
    para = $(msg).find('textarea');
    content=para.val()
    $(@).val('修改').attr 'name', 'update'
    para.replaceWith ->
      $("<p>#{content}</p>")
    $.post 'save', {id: id,content: content}, (data, textStatus, xhr) ->
      true
  $('#msg-list').on 'click', '#msg-list > li > p > input[name="update"]', ->
    $(@).val('保存修改').attr 'name', 'update-save'
    msg = $(@).parent().prev().replaceWith ->
      $("<textarea cols='40' rows='3'>#{$(@).html()}</textarea>")
  true





































