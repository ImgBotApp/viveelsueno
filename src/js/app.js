import $ from 'jquery';
import Instafeed from 'instafeed.js';

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

  new Instafeed({
    get: 'user',
    userId: '3113517845',
    links: true,
    clientId: '98e132bd0e03453fb170d30c75005351',
    accessToken: '798431261.1677ed0.ba2f3761781e4786b42d2a3bc7770dbd'
  }).run();
});
