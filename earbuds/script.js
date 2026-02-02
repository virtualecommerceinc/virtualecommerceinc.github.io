// script.js
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('newsletter-form');
  var emailInput = document.getElementById('email');
  var message = document.getElementById('form-message');

  if (!form || !emailInput || !message) {
    return; // Safety: do nothing if elements are missing
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var email = emailInput.value.trim();

    // Very simple email validation (frontend only)
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      message.textContent = 'Please enter a valid email address.';
      message.style.color = 'red';
      return;
    }

    // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
    message.textContent = 'Thanks for subscribing!';
    message.style.color = 'green';
    form.reset();
  });
});
