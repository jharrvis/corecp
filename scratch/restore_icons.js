const fs = require('fs');

const heroiconPaths = {
  'menu': '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>',
  'panel-left': '<path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/><path d="M9 3v18"/><path stroke-linecap="round" stroke-linejoin="round" d="M13 9l-3 3 3 3"/>',
  'search': '<circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/>',
  'bell': '<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>',
  'clock': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/>',
  'file-text': '<path stroke-linecap="round" stroke-linejoin="round" d="M8 12h8m-8 4h5m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2h-3.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0011.586 4H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
  'check': '<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>',
  'chevron-down': '<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>',
  'user': '<circle cx="12" cy="8" r="4"/><path stroke-linecap="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>',
  'key': '<path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>',
  'log-out': '<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013-3v1"/>',
  'shield': '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
  'lock': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>',
  'chevron-right': '<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7-7"/>',
  'mail': '<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
  'smartphone': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>',
  'info': '<circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 8v4m0 4h.01"/>',
  'eye': '<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>',
  'triangle-alert': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>',
  'trash-2': '<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>',
  'terminal': '<path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
  'layout-dashboard': '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>'
};

const file = 'd:/laragon/www/contest/corefinity/user-profile.html';
let content = fs.readFileSync(file, 'utf8');

// Advanced regex to parse <i ... data-lucide="..." ... ></i>
const tagRegex = /<i\s+([^>]*)><\/i>/g;

content = content.replace(tagRegex, (match, attrsString) => {
  const isLucide = /\bdata-lucide="([^"]+)"/.exec(attrsString);
  const isBindLucide = /\b:data-lucide="([^"]+)"/.exec(attrsString);
  
  if (isLucide) {
    const iconName = isLucide[1];
    const path = heroiconPaths[iconName];
    if (!path) return match;
    
    // Extract class
    const classMatch = /\bclass="([^"]*)"/.exec(attrsString);
    const classAttr = classMatch ? ` class="${classMatch[1]}"` : '';
    
    return `<svg${classAttr} fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">${path}</svg>`;
  }
  
  if (isBindLucide) {
    const iconExpr = isBindLucide[1]; // e.g. "item.icon"
    // Extract class
    const classMatch = /\bclass="([^"]*)"/.exec(attrsString);
    const classAttr = classMatch ? ` class="${classMatch[1]}"` : '';
    
    return `<svg${classAttr} fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" x-html="window.getHeroiconPath(${iconExpr})"></svg>`;
  }
  
  return match;
});

// Remove Lucide CDN script
content = content.replace(/<!-- Lucide Icons -->\s*<script src="https:\/\/unpkg\.com\/lucide@latest"><\/script>/, '');

// Remove the MutationObserver block for Lucide
const observerBlockStart = '  <!-- Initialize Lucide -->';
const observerBlockEnd = '  </script>';

const split1 = content.split(observerBlockStart);
if (split1.length === 2) {
  const split2 = split1[1].split('</script>');
  // replace the first script block after "Initialize Lucide"
  const newBlock = `  <script>
    window.getHeroiconPath = function(name) {
      const paths = ` + JSON.stringify(heroiconPaths) + `;
      return paths[name] || '';
    };
  </script>`;
  content = split1[0] + newBlock + split2.slice(1).join('</script>');
}

fs.writeFileSync(file, content);
console.log('Restored icons efficiently in user-profile.html');
