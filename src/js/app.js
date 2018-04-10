import $ from 'jquery';

$(document).ready(() => {
  const $root = $('html, body');
  const $flyout = $('.nav__flyout');
  const $navMain = $('.nav__main');

  const smoothScrollingTo = (target) => {
    $root.animate({scrollTop:$(target).offset().top}, 500, 'swing', () => {
      location.hash = target;
    });
  };

  if (location.hash)
    smoothScrollingTo(location.hash);

  $(document).on('click', 'a[href^=\\#]', function(event) {
    if ($(this.hash).length) {
      event.preventDefault();
      smoothScrollingTo(this.hash);
    }
  });

  $('.nav__flyout-open, .nav__flyout-close').click(() => {
    if ($flyout.is('.nav__flyout--active')) {
      $flyout
      .removeClass('nav__flyout--active')
      .attr('tabindex', '-1')
      .delay(400)
      .hide(0);
      $navMain
      .animate({
        opacity: 1,
      }, 300);
    } else {
      $flyout
      .show(0)
      .delay(100)
      .addClass('nav__flyout--active')
      .attr('tabindex', '0');
      $navMain
      .animate({
        opacity: .5,
      }, 300);
    }
  });
  
  $('.nav__flyout-link').click(() => {
    $flyout
    .removeClass('nav__flyout--active')
    .attr('tabindex', '-1')
    .delay(400)
    .hide(0);
    $navMain
    .animate({
      opacity: 1,
    }, 300);
  });

  $('.js-input-placeholder .js-input-placeholder__input').focus((e) => {
    $(e.target).parent('.js-input-placeholder').addClass('js-input-placeholder--active');
  });

  $('.js-input-placeholder .js-input-placeholder__input').blur((e) => {
    if (!$(e.target).val()) {
      $(e.target).parent('.js-input-placeholder').removeClass('js-input-placeholder--active');
    }
  });

  let items;
  $.getJSON('https://www.instagram.com/viveelsueno/?__a=1', (data) => {
    items = data.graphql.user.edge_owner_to_timeline_media.edges;
    $.each(items, (n, item) => {
      if (n % 2 === 0 && n / 2 < 6) {
        const node = item.node;
        $('.socials__instagram-feed').append(
          $('<a/>', {
            class: 'socials__instagram-photo',
            href: 'https://www.instagram.com/p/' + node.shortcode,
            target: '_blank'
          }).css({
            backgroundImage: 'url(' + node.thumbnail_resources[0].src + ')'
          })
        );
      }
    });
  });
});
