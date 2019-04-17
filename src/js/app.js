import $ from 'jquery';

$(document).ready(() => {
  const $root = $('html, body');
  const $flyout = $('.nav__flyout');
  const $navMain = $('.nav__main');

  $('a').each(function() {
    const $this = $(this);
    const url = $this.attr('href');
    const host = window.location.hostname.toLowerCase();
    const regex = new RegExp('^(?:(?:f|ht)tp(?:s)?\:)?//(?:[^\@]+\@)?([^:/]+)', 'im');
    const match = url.match(regex);
    const domain = ((match ? match[1].toString() : ((url.indexOf(':') < 0) ? host : ''))).toLowerCase();

    if (domain !== host) {
      $this.addClass('js-outbound-link');
      $this.attr('target', '_blank');
    }
  });

  let donateFormSubmissionTracked = false;
  $('#form-donate').submit(function(e) {
    if (donateFormSubmissionTracked === false) {
      e.preventDefault();
      const $this = $(this);

      setTimeout(submitForm, 1000);
      function submitForm() {
        if (!donateFormSubmissionTracked) {
          donateFormSubmissionTracked = true;
          $this.submit();
        }
      }

      // Track conversion
      const $radio = $('input[name="amount"]:checked', $this);
      const donationAmount = $radio.val();
      const donationLabel = $radio.siblings('.donate__donation-amount-label').first().text();
      window.gtag = window.gtag || function() {};
      window.gtag('event', 'Donate', {
        'event_callback': function() {
          submitForm();
        },
        'event_category': 'Conversions',
        'event_label': `Submit #form-donate - ${donationLabel === '...' ? 'other' : donationLabel}`,
        'value': donationAmount ? donationAmount : null,
      });
    }
  });

  let subscribeFormSubmissionTracked = false;
  $('#form-newsletter-subscribe').submit(function(e) {
    if (subscribeFormSubmissionTracked === false) {
      e.preventDefault();
      const $this = $(this);

      setTimeout(submitForm, 1000);
      function submitForm() {
        if (!subscribeFormSubmissionTracked) {
          subscribeFormSubmissionTracked = true;
          $this.submit();
        }
      }

      // Track conversion
      window.gtag = window.gtag || function() {};
      window.gtag('event', 'Subscribe', {
        'event_callback': function() {
          submitForm();
        },
        'event_category': 'Conversions',
        'event_label': 'Subscribe to newsletter',
      });
    }
  });

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

  $('#form-newsletter-subscribe').submit((e) => {
    e.preventDefault();
    $.post(
      'https://wt-07ecda8053e9157184aef4084d1d2126-0.sandbox.auth0-extend.com/mailchimp-subscribe'
    , {
      email: $(e.target).find('input[name="email"]').val()
    }, (response) => {
      if (response.status === 200) {
        const responseText = $('<p></p>').text('Thank you for subscribing to our newsletter.');
        $('#form-newsletter-subscribe').replaceWith(responseText);
      } else {
        $('#form-newsletter-subscribe .socials__email-input').css({
          border: '2px solid #b54545'
        });
      }
    }, 'json');
  });
});
