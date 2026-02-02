// script.js
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var email = document.getElementById('email').value;
  if (email) {
    // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
    document.getElementById('form-message').textContent = 'Thanks for subscribing!';
    this.reset();
  } else {
    document.getElementById('form-message').textContent = 'Please enter a valid email.';
  }
});
