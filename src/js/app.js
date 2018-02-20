import $ from 'jquery';

$('.nav__flyout-open, .nav__flyout-close').click(function () {
  $('.nav__flyout').toggleClass('nav__flyout--active');
});
