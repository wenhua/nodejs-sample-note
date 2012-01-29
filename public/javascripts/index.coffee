$ ->
  $('#save-msg').on 'click', ->
    msg = $('#msg');
    $.post 'save', {content: msg.val()}, (data, textStatus, xhr) ->
      $('#msg-list').prepend data
      msg.val ''





































