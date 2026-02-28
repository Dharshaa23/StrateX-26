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
 * 9. Registration Form — validation & submission ← CONNECTED TO FLASK
 *
 * Flask Integration
 * ─────────────────
 * Form posts to:  POST /register          (or BACKEND_URL/register)
 * Lookup at:      GET  /registration/:id
 * ══════════════════════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────────────────────────────
   BACKEND URL
   ▸ Local dev  → leave as empty string ''  (uses same origin)
   ▸ Production → set to your Render/Railway URL
     e.g. 'https://stratex-26.onrender.com'
───────────────────────────────────────────────────────────── */
const BACKEND_URL = '';   // ← change this when you deploy Flask


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

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

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
   FADE-UP / FADE-IN ANIMATIONS
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
      const body = item.querySelector('.track-body');
      const hdr  = item.querySelector('.track-header');
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
    if (target) target.classList.add('active');
    setIndicator(btn);
  }

  buttons.forEach(btn => btn.addEventListener('click', () => activateTab(btn)));

  const activeBtn = document.querySelector('.tab-btn.active');
  if (activeBtn) setTimeout(() => setIndicator(activeBtn), 50);

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
        entry.target.style.width = entry.target.dataset.target + '%';
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
  const container   = document.getElementById('membersContainer');
  const addBtn      = document.getElementById('addMemberBtn');
  const errMembers  = document.getElementById('err-members');
  const MAX_MEMBERS = 4;
  let count = 0;

  // Expose count so the form submission can read it
  window._getMemberCount = () => count;

  function addMember() {
    if (count >= MAX_MEMBERS) {
      errMembers.textContent   = 'Maximum 4 additional members allowed.';
      errMembers.style.display = 'block';
      return;
    }
    errMembers.style.display = 'none';
    count++;

    const row = document.createElement('div');
    row.className = 'member-row';
    row.dataset.index = count;
    row.innerHTML = `
      <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
        <input
          type="text"
          class="form-control"
          name="member_name_${count}"
          placeholder="Member ${count} — Full name"
          autocomplete="off"
        />
        <input
          type="email"
          class="form-control"
          name="member_email_${count}"
          placeholder="Member ${count} — Email (optional)"
          autocomplete="off"
        />
      </div>
      <button type="button" class="btn-remove-member" aria-label="Remove member ${count}">×</button>
    `;

    row.querySelector('.btn-remove-member').addEventListener('click', () => {
      row.remove();
      count--;
      errMembers.style.display = 'none';
      addBtn.disabled = false;
      // Re-number remaining rows
      container.querySelectorAll('.member-row').forEach((r, i) => {
        r.querySelectorAll('input')[0].placeholder = `Member ${i+1} — Full name`;
        r.querySelectorAll('input')[1].placeholder = `Member ${i+1} — Email (optional)`;
      });
    });

    container.appendChild(row);
    if (count >= MAX_MEMBERS) addBtn.disabled = true;
  }

  addBtn.addEventListener('click', addMember);
})();


/* ─────────────────────────────────────────────────────────────
   REGISTRATION FORM — VALIDATION & FLASK SUBMISSION
   ▸ Sends JSON to POST /register (or BACKEND_URL/register)
   ▸ Handles 201 success, 409 duplicate, 400 validation errors
   ▸ Shows inline field errors returned by Flask
───────────────────────────────────────────────────────────── */
(function initRegistrationForm() {

  const form        = document.getElementById('registrationForm');
  const submitBtn   = document.getElementById('submitBtn');
  const submitText  = document.getElementById('submitText');
  const submitLoad  = document.getElementById('submitLoading');
  const successCard = document.getElementById('successCard');
  const teamIdDisp  = document.getElementById('teamIdDisplay');
  const errMembers  = document.getElementById('err-members');

  /* ── error helpers ── */
  function setError(fieldId, msg) {
    const grp = document.getElementById('grp-' + fieldId);
    const err = document.getElementById('err-' + fieldId);
    if (grp) grp.classList.add('has-error');
    if (err) err.textContent = msg;
  }

  function clearError(fieldId) {
    const grp = document.getElementById('grp-' + fieldId);
    const err = document.getElementById('err-' + fieldId);
    if (grp) grp.classList.remove('has-error');
    if (err) err.textContent = '';
  }

  function clearAllErrors() {
    ['team_name', 'track', 'team_size', 'lead_name', 'lead_email', 'lead_phone']
      .forEach(clearError);
    errMembers.textContent   = '';
    errMembers.style.display = 'none';
  }

  /* ── client-side validation ── */
  function validate() {
    clearAllErrors();
    let valid = true;

    if (!form.team_name.value.trim()) {
      setError('team_name', 'Team name is required.');
      valid = false;
    }

    if (!form.track.value) {
      setError('track', 'Please select a problem track.');
      valid = false;
    }

    const size = parseInt(form.team_size.value, 10);
    if (isNaN(size) || size < 1 || size > 5) {
      setError('team_size', 'Team size must be between 1 and 5.');
      valid = false;
    }

    if (!form.lead_name.value.trim()) {
      setError('lead_name', 'Lead name is required.');
      valid = false;
    }

    const email = form.lead_email.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('lead_email', 'Enter a valid email address.');
      valid = false;
    }

    const phone = form.lead_phone.value.trim();
    if (!phone || !/^\d{10}$/.test(phone)) {
      setError('lead_phone', 'Enter a valid 10-digit phone number.');
      valid = false;
    }

    // member count must equal team_size - 1 (lead already counted)
    if (valid) {
      const memberRows = document.querySelectorAll('#membersContainer .member-row');
      const totalCount = 1 + memberRows.length;    // lead + additional
      if (totalCount !== size) {
        errMembers.textContent =
          `You entered team size ${size} but have ${totalCount} member(s) total ` +
          `(1 lead + ${memberRows.length} additional). Please match them.`;
        errMembers.style.display = 'block';
        valid = false;
      }
    }

    return valid;
  }

  /* ── inline blur validation ── */
  ['team_name', 'lead_name'].forEach(id => {
    form[id] && form[id].addEventListener('blur', () => {
      if (form[id].value.trim()) clearError(id);
    });
  });

  form.lead_email && form.lead_email.addEventListener('blur', () => {
    const v = form.lead_email.value.trim();
    if (v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) clearError('lead_email');
  });

  // Only allow digits in phone field
  form.lead_phone && form.lead_phone.addEventListener('input', () => {
    form.lead_phone.value = form.lead_phone.value.replace(/\D/g, '').slice(0, 10);
  });
  form.lead_phone && form.lead_phone.addEventListener('blur', () => {
    if (/^\d{10}$/.test(form.lead_phone.value.trim())) clearError('lead_phone');
  });

  /* ── UI helpers ── */
  function setLoading(on) {
    submitBtn.disabled       = on;
    submitText.style.display = on ? 'none'   : 'inline';
    submitLoad.style.display = on ? 'inline' : 'none';
  }

  function showBanner(msg, type) {
    // type: 'error' | 'warning'
    let banner = document.getElementById('reg-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'reg-banner';
      banner.style.cssText =
        'margin-bottom:1rem;padding:12px 16px;border-radius:8px;font-size:0.88rem;font-weight:500;';
      form.querySelector('.reg-form-card').prepend(banner);
    }
    banner.textContent = msg;
    banner.style.background = type === 'error'
      ? 'rgba(239,68,68,0.12)' : 'rgba(234,179,8,0.12)';
    banner.style.color  = type === 'error' ? '#f87171' : '#facc15';
    banner.style.border = `1px solid ${type === 'error' ? '#f87171' : '#facc15'}`;
    banner.style.display = 'block';
  }

  function hideBanner() {
    const b = document.getElementById('reg-banner');
    if (b) b.style.display = 'none';
  }

  /* ── collect members from dynamic rows ── */
  function collectMembers() {
    const rows = document.querySelectorAll('#membersContainer .member-row');
    return Array.from(rows).map(row => {
      const inputs = row.querySelectorAll('input');
      return {
        member_name:  inputs[0] ? inputs[0].value.trim() : '',
        member_email: inputs[1] ? inputs[1].value.trim() : ''
      };
    }).filter(m => m.member_name);   // skip completely empty rows
  }

  /* ── SUBMIT ── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideBanner();
    if (!validate()) return;

    // Build payload — field names match Flask backend exactly
    const payload = {
      team_name:    form.team_name.value.trim(),
      problem_track: form.track.value,          // 'track' select → 'problem_track' in Flask
      team_size:    parseInt(form.team_size.value, 10),
      lead_name:    form.lead_name.value.trim(),
      lead_email:   form.lead_email.value.trim().toLowerCase(),
      lead_phone:   form.lead_phone.value.trim(),
      members:      collectMembers()
    };

    setLoading(true);

    fetch(BACKEND_URL + '/register', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    })
    .then(async res => {
      const data = await res.json();

      /* ── 201 SUCCESS ── */
      if (res.status === 201 && data.success) {
        form.style.display        = 'none';
        teamIdDisp.textContent    = data.hackathon_id || '—';

        // Update success message to mention email if it was sent
        const msg = document.querySelector('.success-msg');
        if (msg) {
          msg.textContent = data.confirmation_email_sent
            ? `Your team "${data.team_name}" has been registered! A confirmation email has been sent to the team lead.`
            : `Your team "${data.team_name}" has been registered! Please save your Team ID below.`;
        }

        successCard.style.display = 'block';
        successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      /* ── 409 DUPLICATE EMAIL ── */
      if (res.status === 409) {
        setError('lead_email', data.message || 'This email is already registered.');
        showBanner('⚠️ This email address has already been used to register a team.', 'warning');
        setLoading(false);
        return;
      }

      /* ── 400 VALIDATION ERROR FROM SERVER ── */
      if (res.status === 400 && data.details) {
        // Map server errors back to individual fields where possible
        data.details.forEach(detail => {
          if (detail.includes('team_name'))    setError('team_name',   detail);
          else if (detail.includes('problem_track')) setError('track', detail);
          else if (detail.includes('team_size'))     setError('team_size', detail);
          else if (detail.includes('lead_name'))     setError('lead_name', detail);
          else if (detail.includes('lead_email'))    setError('lead_email', detail);
          else if (detail.includes('lead_phone'))    setError('lead_phone', detail);
          else {
            errMembers.textContent   += detail + ' ';
            errMembers.style.display  = 'block';
          }
        });
        showBanner('Please fix the errors below and try again.', 'error');
        setLoading(false);
        return;
      }

      /* ── OTHER SERVER ERROR ── */
      showBanner(data.message || 'Something went wrong. Please try again.', 'error');
      setLoading(false);
    })
    .catch(err => {
      console.error('Network error:', err);
      showBanner(
        '⚠️ Cannot connect to the registration server. ' +
        'Make sure the Flask backend is running at: ' + (BACKEND_URL || 'http://localhost:5000'),
        'error'
      );
      setLoading(false);
    });
  });

})();
