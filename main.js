/**
 * ══════════════════════════════════════════════════════════════
 * StraveX '26 — main.js
 * Invisible Problems. Intelligent Solutions.
 *
 * TABLE OF CONTENTS
 * ─────────────────
 * 1. Scroll Progress Bar
 * 2. Navbar — scroll state, active link, hamburger menu
 * 3. Intersection Observer — fade-up / fade-in animations
 * 4. Timeline Line Animation
 * 5. Tracks — Accordion Toggle
 * 6. Tabs — Rules & Eligibility
 * 7. Judging Criteria — Progress Bar Animation
 * 8. Dynamic Team Members — add / remove
 * 9. Registration Form — validation & submission
 *
 * Flask Integration
 * ─────────────────
 * Form posts to:  POST /register
 * Expected JSON:  { "success": true, "team_id": "STRX26-014", "message": "..." }
 * ══════════════════════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────── */
(function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  function update() {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
})();


/* ─────────────────────────────────────
   NAVBAR: scroll state + active link + hamburger
───────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks  = document.querySelectorAll('#navLinks a');
  const sections  = document.querySelectorAll('section[id]');

  // Scroll state
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Active link on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();


/* ─────────────────────────────────────
   INTERSECTION OBSERVER: FADE-UP / FADE-IN ANIMATIONS
───────────────────────────────────── */
(function initAnimations() {
  const targets = document.querySelectorAll('.fade-up, .fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => observer.observe(el));
})();


/* ─────────────────────────────────────
   TIMELINE LINE ANIMATION
───────────────────────────────────── */
(function initTimeline() {
  const line = document.getElementById('timelineLine');
  if (!line) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        line.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(line);
})();


/* ─────────────────────────────────────
   TRACKS: ACCORDION TOGGLE
───────────────────────────────────── */
(function initTracks() {
  const items = document.querySelectorAll('.track-item');

  function closeAll() {
    items.forEach(item => {
      const body  = item.querySelector('.track-body');
      const hdr   = item.querySelector('.track-header');
      body.style.maxHeight = null;
      item.classList.remove('open');
      hdr.setAttribute('aria-expanded', false);
    });
  }

  items.forEach(item => {
    const header = item.querySelector('.track-header');
    const body   = item.querySelector('.track-body');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      closeAll();
      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', true);
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });

    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
})();


/* ─────────────────────────────────────
   TABS: RULES & ELIGIBILITY
───────────────────────────────────── */
(function initTabs() {
  const buttons   = document.querySelectorAll('.tab-btn');
  const contents  = document.querySelectorAll('.tab-content');
  const indicator = document.getElementById('tabIndicator');

  function setIndicator(btn) {
    indicator.style.left  = btn.offsetLeft + 'px';
    indicator.style.width = btn.offsetWidth + 'px';
  }

  function activateTab(btn) {
    const tabId = btn.dataset.tab;
    buttons.forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', b === btn);
    });
    contents.forEach(c => c.classList.remove('active'));
    const target = document.getElementById('tab-' + tabId);
    if (target) { target.classList.add('active'); }
    setIndicator(btn);
  }

  buttons.forEach(btn => btn.addEventListener('click', () => activateTab(btn)));

  // Init indicator position
  const activeBtn = document.querySelector('.tab-btn.active');
  if (activeBtn) { setTimeout(() => setIndicator(activeBtn), 50); }

  window.addEventListener('resize', () => {
    const ab = document.querySelector('.tab-btn.active');
    if (ab) setIndicator(ab);
  });
})();


/* ─────────────────────────────────────
   JUDGING CRITERIA: PROGRESS BAR ANIMATION
───────────────────────────────────── */
(function initProgressBars() {
  const fills = document.querySelectorAll('.progress-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.target;
        entry.target.style.width = target + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(f => observer.observe(f));
})();


/* ─────────────────────────────────────
   DYNAMIC TEAM MEMBERS
───────────────────────────────────── */
(function initMembersField() {
  const container    = document.getElementById('membersContainer');
  const addBtn       = document.getElementById('addMemberBtn');
  const errMembers   = document.getElementById('err-members');
  const MAX_MEMBERS  = 4;
  let count = 0;

  function addMember() {
    if (count >= MAX_MEMBERS) {
      errMembers.textContent = 'Maximum 4 additional members allowed.';
      errMembers.style.display = 'block';
      return;
    }
    errMembers.style.display = 'none';
    count++;
    const row = document.createElement('div');
    row.className = 'member-row';
    row.innerHTML = `
      <input
        type="text"
        class="form-control"
        name="members[]"
        placeholder="Member ${count} full name"
        autocomplete="off"
        data-member-index="${count}"
      />
      <button type="button" class="btn-remove-member" aria-label="Remove member">×</button>
    `;
    row.querySelector('.btn-remove-member').addEventListener('click', () => {
      row.remove();
      count--;
      errMembers.style.display = 'none';
      // Re-number placeholders
      container.querySelectorAll('input[name="members[]"]').forEach((inp, i) => {
        inp.placeholder = `Member ${i + 1} full name`;
      });
      addBtn.disabled = false;
    });
    container.appendChild(row);
    if (count >= MAX_MEMBERS) {
      addBtn.disabled = true;
    }
  }

  addBtn.addEventListener('click', addMember);
})();


/* ─────────────────────────────────────
   FORM VALIDATION & SUBMISSION
───────────────────────────────────── */
(function initRegistrationForm() {
  const form       = document.getElementById('registrationForm');
  const submitBtn  = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const submitLoad = document.getElementById('submitLoading');
  const successCard= document.getElementById('successCard');
  const teamIdDisp = document.getElementById('teamIdDisplay');

  function setError(fieldId, msg) {
    const grp = document.getElementById('grp-' + fieldId);
    const err = document.getElementById('err-' + fieldId);
    if (grp) grp.classList.add('has-error');
    if (err) { err.textContent = msg; }
  }

  function clearError(fieldId) {
    const grp = document.getElementById('grp-' + fieldId);
    const err = document.getElementById('err-' + fieldId);
    if (grp) grp.classList.remove('has-error');
    if (err) err.textContent = '';
  }

  function clearAllErrors() {
    ['team_name','track','team_size','lead_name','lead_email','lead_phone'].forEach(clearError);
  }

  function validate() {
    clearAllErrors();
    let valid = true;

    const teamName = form.team_name.value.trim();
    if (!teamName) { setError('team_name', 'Team name is required.'); valid = false; }

    const track = form.track.value;
    if (!track) { setError('track', 'Please select a problem track.'); valid = false; }

    const size = parseInt(form.team_size.value, 10);
    if (isNaN(size) || size < 1 || size > 5) {
      setError('team_size', 'Team size must be between 1 and 5.'); valid = false;
    }

    const leadName = form.lead_name.value.trim();
    if (!leadName) { setError('lead_name', 'Lead name is required.'); valid = false; }

    const email = form.lead_email.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('lead_email', 'Enter a valid email address.'); valid = false;
    }

    const phone = form.lead_phone.value.trim();
    if (!phone || !/^\d{10}$/.test(phone)) {
      setError('lead_phone', 'Enter a valid 10-digit phone number.'); valid = false;
    }

    return valid;
  }

  // Inline validation on blur
  ['team_name','lead_name'].forEach(id => {
    form[id] && form[id].addEventListener('blur', () => {
      if (form[id].value.trim()) clearError(id);
    });
  });

  form.lead_email && form.lead_email.addEventListener('blur', () => {
    const v = form.lead_email.value.trim();
    if (v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) clearError('lead_email');
  });

  form.lead_phone && form.lead_phone.addEventListener('input', () => {
    form.lead_phone.value = form.lead_phone.value.replace(/\D/g, '').slice(0, 10);
  });

  form.lead_phone && form.lead_phone.addEventListener('blur', () => {
    const v = form.lead_phone.value.trim();
    if (/^\d{10}$/.test(v)) clearError('lead_phone');
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validate()) return;

    // Build form data
    const members = Array.from(form.querySelectorAll('input[name="members[]"]'))
      .map(inp => inp.value.trim())
      .filter(Boolean);

    const formData = {
      team_name : form.team_name.value.trim(),
      track     : form.track.value,
      team_size : parseInt(form.team_size.value, 10),
      lead_name : form.lead_name.value.trim(),
      lead_email: form.lead_email.value.trim(),
      lead_phone: form.lead_phone.value.trim(),
      members   : members
    };

    // UI: loading state
    submitBtn.disabled   = true;
    submitText.style.display = 'none';
    submitLoad.style.display = 'inline';

    /* ──────────────────────────────────────────────
       Backend (Flask) will handle form submission at /register
       Expected response: { "success": true, "team_id": "STRX26-014", "message": "..." }
    ────────────────────────────────────────────── */
    fetch('/register', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        form.style.display = 'none';
        teamIdDisp.textContent  = data.team_id || '—';
        successCard.style.display = 'block';
        successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Show server-side error if returned
        alert(data.message || 'Registration failed. Please try again.');
        submitBtn.disabled   = false;
        submitText.style.display = 'inline';
        submitLoad.style.display = 'none';
      }
    })
    .catch(() => {
      // Fallback: if no backend connected yet
      form.style.display = 'none';
      teamIdDisp.textContent  = 'STRX26-XXX';
      successCard.style.display = 'block';
      successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
})();

