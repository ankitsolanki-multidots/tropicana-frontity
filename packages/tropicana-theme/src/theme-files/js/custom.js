(function ($) {

    // for same height div //
    $(document).ready(function() {
      var maxHeight = 0;
      $(".news_wrapper .news_column").each(function() {
        if ($(this).height() > maxHeight) {
          maxHeight = $(this).height();
        }
      }).height(maxHeight);
    });

})(jQuery);