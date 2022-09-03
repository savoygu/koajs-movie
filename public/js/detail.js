$(function () {
  $('.comment').click(function (e) {
    const target = $(this)
    const toId = target.data('tid')
    const commentId = target.data('cid')
    console.log(target)
    console.log(commentId)

    if ($('#toId').length > 0) {
      $('#toId').val(toId)
    } else {
      $('<input>').attr({
        type: 'hidden',
        id: 'toId',
        name: 'comment[tid]',
        value: toId
      }).appendTo('#commentForm')
    }

    if ($('#commentId').length > 0) {
      $('#commentId').val(commentId)
    } else {
      $('<input>').attr({
        type: 'hidden',
        id: 'commentId',
        name: 'comment[cid]',
        value: commentId
      }).appendTo('#commentForm')
    }
  })
})
