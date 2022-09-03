$(function () {
  function remove (element, url) {
    $(element).click(function (e) {
      const target = $(e.target)
      const id = target.data('id')
      const tr = $('.item-id-' + id)

      $.ajax({
        type: 'DELETE',
        url: url + '?id=' + id
      })
        .done(function (results) {
          if (results.success === 1) {
            if (tr.length > 0) {
              tr.remove()
            }
          }
        })
    })
  }

  remove('.js-movie-del', '/admin/movie')
  remove('.js-category-del', '/admin/category')

  $('#douban').blur(function () {
    const douban = $(this)
    const id = douban.val()

    if (id) {
      $.ajax({
        url: 'http://api.douban.com/v2/movie/subject/' + id,
        cache: true,
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'callback',
        success: function (data) {
          $('#inputTitle').val(data.title)
          $('#inputDoctor').val(data.directors[0].name)
          $('#inputCountry').val(data.countries[0])
          // $('inputLanguage').val(data)
          $('#inputPoster').val(data.images.large)
          $('#inputYear').val(data.year)
          $('#inputSummary').val(data.summary)
        }
      })
    }
  })
})
