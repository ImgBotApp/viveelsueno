import $ from 'jquery';

$('.nav__flyout-open, .nav__flyout-close').click(function () {
  var $flyout = $('.nav__flyout');

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
