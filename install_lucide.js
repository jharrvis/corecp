const fs = require('fs');

const lucidePaths = {
  menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  'panel-left': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'triangle-alert': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4 1 6 1a1 1 0 0 1 1 1z"/>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  'trash-2': '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'file-text': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  'eye-off': '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
  'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'
};

const htmlFile = 'd:/laragon/www/contest/corefinity/user-profile.html';
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

// Regex to capture SVG and replace with data-lucide
htmlContent = htmlContent.replace(/<svg\s+(?:[^>]*?class="([^"]*)")?[^>]*?>([\s\S]*?)<\/svg>/g, (match, className, innerContent) => {
  // Find which lucide icon this belongs to
  let iconName = '';
  // Normalize innerContent
  const normalized = innerContent.trim();
  for (const [name, pathStr] of Object.entries(lucidePaths)) {
    if (normalized === pathStr.trim() || normalized.replace(/\s+/g, '') === pathStr.replace(/\s+/g, '')) {
      iconName = name;
      break;
    }
  }

  // Edge cases where my static replace_icons.js added SVGs that are slightly formatted
  if (!iconName) {
    if (normalized.includes('M21 21l-4.35-4.35')) iconName = 'search'; // old search
    if (normalized.includes('M4 6h16M4 12h16M4 18h16')) iconName = 'menu';
    if (normalized.includes('1.732 3z')) iconName = 'triangle-alert';
  }

  if (iconName) {
    const cls = className ? ` class="${className}"` : '';
    return `<i data-lucide="${iconName}"${cls}></i>`;
  }
  
  return match; // Don't replace if unknown
});

// Inject Lucide script into head
if (!htmlContent.includes('lucide@latest')) {
  htmlContent = htmlContent.replace('<!-- Alpine.js -->', '<!-- Lucide Icons -->\n  <script src="https://unpkg.com/lucide@latest"></script>\n\n  <!-- Alpine.js -->');
}

// Add the init code inside body
if (!htmlContent.includes('lucide.createIcons')) {
  htmlContent = htmlContent.replace('</body>', `
  <!-- Initialize Lucide -->
  <script>
    document.addEventListener('alpine:init', () => {
      // Create mutation observer to detect DOM changes and render lucide icons
      const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        for (const mut of mutations) {
          if (mut.type === 'childList' && mut.addedNodes.length > 0) {
            shouldUpdate = true; break;
          }
        }
        if (shouldUpdate) {
          lucide.createIcons();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
    
    // Initial load
    document.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
    });
  </script>
</body>`);
}

// Global search result icon fix
htmlContent = htmlContent.replace(/<div\s+class="cf-search-result-icon"\s+:class="`cf-card-icon--\${item\.color}`"\s+x-html="`<svg[^>]*>\${item\.paths}<\/svg>`"\s+aria-hidden="true">\s*<\/div>/, 
  `<div
                  class="cf-search-result-icon"
                  :class="\`cf-card-icon--\${item.color}\`"
                  aria-hidden="true">
                  <i :data-lucide="item.icon" class="w-4 h-4"></i>
                </div>`);

fs.writeFileSync(htmlFile, htmlContent);

// Modify corefinity.js to store item.icon instead of item.paths
const jsFile = 'd:/laragon/www/contest/corefinity/assets/js/corefinity.js';
let jsContent = fs.readFileSync(jsFile, 'utf8');

jsContent = jsContent.replace(/paths:\s*'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"\/><circle cx="12" cy="7" r="4"\/>'/g, "icon: 'user'");
jsContent = jsContent.replace(/paths:\s*'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"\/><path d="M12 18h\.01"\/>'/g, "icon: 'smartphone'");
jsContent = jsContent.replace(/paths:\s*'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"\/><path d="M7 11V7a5 5 0 0 1 10 0v4"\/>'/g, "icon: 'lock'");
jsContent = jsContent.replace(/paths:\s*'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"\/><path d="M10\.3 21a1\.94 1\.94 0 0 0 3\.4 0"\/>'/g, "icon: 'bell'");
jsContent = jsContent.replace(/paths:\s*'<circle cx="7\.5" cy="15\.5" r="5\.5"\/><path d="m21 2-9\.6 9\.6"\/><path d="m15\.5 7\.5 3 3L22 7l-3-3"\/>'/g, "icon: 'key'");
jsContent = jsContent.replace(/paths:\s*'<path d="M20 13c0 5-3\.5 7\.5-7\.66 8\.95a1 1 0 0 1-\.67-\.01C7\.5 20\.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2\.5 0 4 1 6 1a1 1 0 0 1 1 1z"\/>'/g, "icon: 'shield'");
jsContent = jsContent.replace(/paths:\s*'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"\/><path d="M7 11V7a5 5 0 0 1 10 0v4"\/>'/g, "icon: 'lock'");
jsContent = jsContent.replace(/paths:\s*'<polyline points="4 17 10 11 4 5"\/><line x1="12" x2="20" y1="19" y2="19"\/>'/g, "icon: 'terminal'");
jsContent = jsContent.replace(/paths:\s*'<path d="M3 6h18"\/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"\/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"\/><line x1="10" x2="10" y1="11" y2="17"\/><line x1="14" x2="14" y1="11" y2="17"\/>'/g, "icon: 'trash-2'");
jsContent = jsContent.replace(/paths:\s*'<rect width="7" height="9" x="3" y="3" rx="1"\/><rect width="7" height="5" x="14" y="3" rx="1"\/><rect width="7" height="9" x="14" y="12" rx="1"\/><rect width="7" height="5" x="3" y="16" rx="1"\/>'/g, "icon: 'layout-dashboard'");

// Also replace cfTogglePw
jsContent = jsContent.replace(
  `btn.querySelector('svg').innerHTML = show
    ? /* eye-off */
      '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'
    : /* eye */
      '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';`,
  `btn.innerHTML = show
    ? '<i data-lucide="eye-off" class="w-[18px] h-[18px]"></i>'
    : '<i data-lucide="eye" class="w-[18px] h-[18px]"></i>';
  lucide.createIcons({ root: btn });`
);

fs.writeFileSync(jsFile, jsContent);
console.log("Lucide icons installed cleanly.");
