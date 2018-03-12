import $ from 'jquery';

$('.nav__flyout-open, .nav__flyout-close').click(() => {
  let $flyout = $('.nav__flyout');

  if ($flyout.is('.nav__flyout--active')) {
    $flyout
    .removeClass('nav__flyout--active')
    .attr('tabindex', '-1')
    .delay(400)
    .hide(0);
  } else {
    $flyout
    .show(0)
    .delay(100)
    .addClass('nav__flyout--active')
    .attr('tabindex', '0');
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
});
