// Footer year
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Mobile nav toggle
var navToggle = document.getElementById('navToggle');
var siteNav = document.getElementById('primaryNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', function () {
    var isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  siteNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Work page: project filtering
var filterButtons = document.querySelectorAll('.filter-btn');
var projectCards = document.querySelectorAll('#projectGrid .card');
var emptyState = document.getElementById('emptyState');

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      var filter = btn.getAttribute('data-filter');
      var visibleCount = 0;
      projectCards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        var show = filter === 'all' || category === filter;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });
}

// Contact page: simple client-side validation
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');
    var nameError = document.getElementById('nameError');
    var emailError = document.getElementById('emailError');
    var messageError = document.getElementById('messageError');
    var successEl = document.getElementById('formSuccess');

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    successEl.hidden = true;

    if (!name.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    }

    if (!message.value.trim()) {
      messageError.textContent = 'Please enter a message.';
      valid = false;
    }

    if (valid) {
      successEl.hidden = false;
      contactForm.reset();
    }
  });
}
