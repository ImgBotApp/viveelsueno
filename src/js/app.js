import $ from 'jquery';

$('.nav__flyout-open, .nav__flyout-close').click(() => {
  const $flyout = $('.nav__flyout');
  const $navMain = $('.nav__main');

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

$(document).ready(() => {
  $('.js-input-placeholder .js-input-placeholder__input').focus((e) => {
    $(e.target).parent('.js-input-placeholder').addClass('js-input-placeholder--active');
  });

  $('.js-input-placeholder .js-input-placeholder__input').blur((e) => {
    if (!$(e.target).val()) {
      $(e.target).parent('.js-input-placeholder').removeClass('js-input-placeholder--active');
    }
  });

  const name = 'viveelsueno';
  let items;
  $.getJSON('https://query.yahooapis.com/v1/public/yql', {
    q: 'select * from json where url="https://www.instagram.com/' + name + '/?__a=1"',
    format: 'json',
    _: name
  }, (data) => {
    if (data.query.results) {
      items = data.query.results.json.graphql.user.edge_owner_to_timeline_media.edges;
      $.each(items, (n, item) => {
        if (n < 6) {
          const node = item.node;
          $('.socials__instagram-feed').append(
            $('<a/>', {
              class: 'socials__instagram-photo',
              href: 'https://www.instagram.com/p/' + node.shortcode,
              target: '_blank'
            }).css({
              backgroundImage: 'url(' + node.thumbnail_src + ')'
            }));
        }
      });
    }
  });
});
