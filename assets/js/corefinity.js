/* ═══════════════════════════════════════════════════════════════════════
   COREFINITY — Universal JavaScript (Alpine.js)
   Gunakan di setiap halaman (taruh sebelum </body>):
     <script src="assets/js/corefinity.js"></script>
   Requires: Alpine.js CDN di <head> dengan defer
     <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"></script>
   ═══════════════════════════════════════════════════════════════════════ */

/* ─── SVG Icon Helper ───────────────────────────────────────────────── */
window.cfIcon = function (name, size = 16) {
  const paths = {
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    phone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4 1 6 1a1 1 0 0 1 1 1z"/>',
    shieldAlert: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4 1 6 1a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    fire: '<path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
    grid: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    layoutDashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'
  };
  const d = paths[name] || paths.grid;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:${size}px;height:${size}px">${d}</svg>`;
};

/* ═══════════════════════════════════════════════════════════════════════
   ALPINE.JS STORES
   ═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('alpine:init', () => {

  /* ─── Sidebar Store (Desktop Collapse) ──────────────────────────── */
  Alpine.store('sidebar', {
    open: localStorage.getItem('cf-sidebar') !== 'closed',

    toggle() {
      this.open = !this.open;
      localStorage.setItem('cf-sidebar', this.open ? 'open' : 'closed');
    },
    close () { this.open = false; localStorage.setItem('cf-sidebar', 'closed'); },
    expand() { this.open = true;  localStorage.setItem('cf-sidebar', 'open'); },
  });

  /* ─── Mobile Sidebar Store ──────────────────────────────────────── */
  Alpine.store('mobileSidebar', {
    open: false,
    toggle() { this.open = !this.open; },
    close () { this.open = false; },
  });

  /* ─── Global Search Store ───────────────────────────────────────── */
  Alpine.store('globalSearch', {
    isOpen:          false,
    query:           '',
    activeCategory:  'all',
    selectedIndex:   -1,

    /* Pages registry — tambahkan entry baru untuk halaman lain */
    pages: [
      { id: 'profile',    title: 'Profile',          icon: 'user',                                                                                                                                                                                                                         category: 'profile',   breadcrumb: 'Settings › Profile',        color: 'orange' },
      { id: 'mobile',     title: 'Mobile Number',    icon: 'smartphone',                                                                                                                                                                             category: 'profile',   breadcrumb: 'Settings › Profile',        color: 'cyan'   },
      { id: 'password',   title: 'Update Password',  icon: 'lock',                                                                                                                                                   category: 'security',  breadcrumb: 'Settings › Security',       color: 'blue'   },
      { id: 'notif',      title: 'Notifications',    icon: 'bell',                                                          category: 'general',   breadcrumb: 'Settings › Notifications',  color: 'orange' },
      { id: 'api',        title: 'API Tokens',       icon: 'key',                                                                                                                              category: 'api',       breadcrumb: 'Settings › API',            color: 'cyan'   },
      { id: '2fa',        title: 'Two Factor Auth',   icon: 'shield',                                                          category: 'security',  breadcrumb: 'Settings › Security',       color: 'blue'   },
      { id: 'firewall',   title: 'Firewall',          icon: 'lock',                                                                                                                                                   category: 'security',  breadcrumb: 'Settings › Security',       color: 'blue'   },
      { id: 'ssh',        title: 'SSH Keys',          icon: 'terminal',                                                                                                                                                                   category: 'api',       breadcrumb: 'Settings › API',            color: 'cyan'   },
      { id: 'delete',     title: 'Delete Account',    icon: 'trash-2',                                                                                                                          category: 'danger',    breadcrumb: 'Settings › Danger Zone',    color: 'red'    },
      { id: 'dashboard',  title: 'Dashboard',         icon: 'layout-dashboard', category: 'general',  breadcrumb: 'Corefinity',                color: 'blue'   },
    ],

    categories: [
      { id: 'all',      label: 'All' },
      { id: 'general',  label: 'General' },
      { id: 'profile',  label: 'Profile' },
      { id: 'security', label: 'Security' },
      { id: 'api',      label: 'API' },
      { id: 'danger',   label: '⚠ Danger' },
    ],

    get results() {
      const q   = this.query.trim().toLowerCase();
      const cat = this.activeCategory;
      return this.pages.filter(p => {
        const matchQuery = !q
          || p.title.toLowerCase().includes(q)
          || p.breadcrumb.toLowerCase().includes(q);
        const matchCat = cat === 'all' || p.category === cat;
        return matchQuery && matchCat;
      });
    },

    open() {
      this.isOpen        = true;
      this.query         = '';
      this.selectedIndex = -1;
      document.body.style.overflow = 'hidden';
      // Focus input after transition
      setTimeout(() => document.getElementById('cf-search-input')?.focus(), 60);
    },

    close() {
      this.isOpen        = false;
      this.query         = '';
      this.selectedIndex = -1;
      this.activeCategory = 'all';
      document.body.style.overflow = '';
    },

    setCategory(id) {
      this.activeCategory = id;
      this.selectedIndex  = -1;
      setTimeout(() => document.getElementById('cf-search-input')?.focus(), 0);
    },

    moveUp()   { if (this.selectedIndex > 0) this.selectedIndex--; },
    moveDown() { if (this.selectedIndex < this.results.length - 1) this.selectedIndex++; },

    selectCurrent() {
      if (this.selectedIndex >= 0 && this.results[this.selectedIndex]) {
        // Navigation hook — can be overridden per-page
        if (typeof window.cfOnSearchSelect === 'function') {
          window.cfOnSearchSelect(this.results[this.selectedIndex]);
        }
        this.close();
      }
    },
  });

  /* ─── Toast Store ───────────────────────────────────────────────── */
  Alpine.store('toast', {
    visible:  false,
    message:  '',
    type:     'success', // 'success' | 'info' | 'error'
    _timer:   null,

    show(msg, duration = 3500, type = 'success') {
      this.message = msg;
      this.type    = type;
      this.visible = true;
      clearTimeout(this._timer);
      this._timer  = setTimeout(() => { this.visible = false; }, duration);
    },
    hide() {
      this.visible = false;
      clearTimeout(this._timer);
    },
  });

}); // end alpine:init

/* ═══════════════════════════════════════════════════════════════════════
   GLOBAL KEYBOARD SHORTCUTS
   ═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', (e) => {
  const tag       = document.activeElement?.tagName;
  const editable  = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
                    || document.activeElement?.isContentEditable;

  /* '/' — open global search */
  if (e.key === '/' && !editable) {
    e.preventDefault();
    Alpine.store('globalSearch').open();
    return;
  }

  /* Escape */
  if (e.key === 'Escape') {
    if (Alpine.store('globalSearch').isOpen) {
      Alpine.store('globalSearch').close();
    } else if (Alpine.store('mobileSidebar').open) {
      Alpine.store('mobileSidebar').close();
    }
    return;
  }

  /* Arrow keys & Enter inside search modal */
  if (Alpine.store('globalSearch').isOpen) {
    if (e.key === 'ArrowDown') { e.preventDefault(); Alpine.store('globalSearch').moveDown(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); Alpine.store('globalSearch').moveUp(); }
    if (e.key === 'Enter')     { Alpine.store('globalSearch').selectCurrent(); }
  }
});

/* ═══════════════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS (global, callable from HTML onclick)
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * Toggle password input visibility.
 * Usage: onclick="cfTogglePw('inputId', this)"
 */
window.cfTogglePw = function (inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  btn.innerHTML = show
    ? '<i data-lucide="eye-off" class="w-[18px] h-[18px]"></i>'
    : '<i data-lucide="eye" class="w-[18px] h-[18px]"></i>';
  lucide.createIcons({ root: btn });
};

/* Alias untuk backward-compat */
window.togglePw = window.cfTogglePw;

/**
 * Password strength checker.
 * Usage: oninput="cfCheckStrength(this.value)"
 */
window.cfCheckStrength = function (val) {
  const bars  = document.querySelectorAll('.cf-strength-bar');
  const label = document.getElementById('cf-strength-label');
  if (!bars.length) return;

  let score = 0;
  if (val.length >= 8)         score++;
  if (/[A-Z]/.test(val))       score++;
  if (/[0-9]/.test(val))       score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const colors      = ['#ef4444', '#FF7102', '#009BDE', '#0F488A'];
  const labelTexts  = [
    'Weak — add uppercase, numbers & symbols',
    'Fair — add numbers & symbols',
    'Good — add a symbol for max strength',
    'Strong password ✓',
  ];

  bars.forEach((b, i) => {
    b.style.background = (val.length && i < score) ? colors[score - 1] : '';
  });

  if (label) {
    if (!val.length) {
      label.textContent = 'Use 8+ characters with a mix of letters, numbers & symbols.';
      label.style.color = '';
    } else {
      label.textContent = labelTexts[score - 1] || labelTexts[0];
      label.style.color = colors[score - 1] || colors[0];
    }
  }
};

/* Alias */
window.checkStrength = (val) => window.cfCheckStrength(val);

/**
 * Show toast notification.
 * Usage: onclick="showToast('Saved!')" or showToast('msg', 4000, 'success')
 */
window.showToast = function (msg, duration = 3500, type = 'success') {
  Alpine.store('toast').show(msg, duration, type);
};

/* ═══════════════════════════════════════════════════════════════════════
   DOM READY
   ═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Close mobile sidebar when clicking a nav link inside it
  document.querySelectorAll('#sidebar .cf-nav-item').forEach(link => {
    link.addEventListener('click', () => {
      Alpine.store('mobileSidebar').close();
    });
  });
});
