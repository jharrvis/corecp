const fs = require('fs');

const lucidePaths = {
  menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  panelLeft: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  logOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  triangleAlert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4 1 6 1a1 1 0 0 1 1 1z"/>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  trash2: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  fileText: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
  layoutDashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'
};

const file = 'd:/laragon/www/contest/corefinity/user-profile.html';
let content = fs.readFileSync(file, 'utf8');

const replacements = [
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"\/?>/, lucidePaths.menu],
  [/<path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"\/>\s*<path d="M9 3v18"\/>\s*<path stroke-linecap="round" stroke-linejoin="round" d="M13 9l-3 3 3 3"\/>/, lucidePaths.panelLeft],
  [/<circle cx="11" cy="11" r="8"\/><path stroke-linecap="round" d="M21 21l-4\.35-4\.35"\/>/g, lucidePaths.search],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1\.405-1\.405A2\.032 2\.032 0 0118 14\.158V11a6\.002 6\.002 0 00-4-5\.659V5a2 2 0 10-4 0v\.341C7\.67 6\.165 6 8\.388 6 11v3\.159c0 \.538-\.214 1\.055-\.595 1\.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"\/>/g, lucidePaths.bell],
  [/<circle cx="12" cy="8" r="4"\/><path stroke-linecap="round" d="M4 20c0-4 3\.6-7 8-7s8 3 8 7"\/>/g, lucidePaths.user],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"\/>/, lucidePaths.logOut],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7\.743 5\.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2\.586a1 1 0 01\.293-\.707l5\.964-5\.964A6 6 0 1121 9z"\/>/g, lucidePaths.key],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7\.89 5\.26a2 2 0 002\.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"\/>/, lucidePaths.mail],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M12 18h\.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"\/>/g, lucidePaths.smartphone],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"\/>/g, lucidePaths.lock],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"\/>\s*<path stroke-linecap="round" stroke-linejoin="round" d="M2\.458 12C3\.732 7\.943 7\.523 5 12 5c4\.478 0 8\.268 2\.943 9\.542 7-1\.274 4\.057-5\.064 7-9\.542 7-4\.477 0-8\.268-2\.943-9\.542-7z"\/>/g, lucidePaths.eye],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h\.01m-6\.938 4h13\.856c1\.54 0 2\.502-1\.667 1\.732-3L13\.732 4c-\.77-1\.333-2\.694-1\.333-3\.464 0L3\.34 16c-\.77 1\.333\.192 3 1\.732 3z"\/>/g, lucidePaths.triangleAlert],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"\/>/g, lucidePaths.chevronRight],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"\/>/g, lucidePaths.chevronDown],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"\/>/g, lucidePaths.terminal],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5\.618-4\.016A11\.955 11\.955 0 0112 2\.944a11\.955 11\.955 0 01-8\.618 3\.04A12\.02 12\.02 0 003 9c0 5\.591 3\.824 10\.29 9 11\.622 5\.176-1\.332 9-6\.03 9-11\.622 0-1\.042-\.133-2\.052-\.382-3\.016z"\/>/g, lucidePaths.shield],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"\/>/g, lucidePaths.check],
  [/<circle cx="12" cy="12" r="10"\/>\s*<path stroke-linecap="round" d="M12 8v4m0 4h\.01"\/>/g, lucidePaths.info],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3"\/>\s*<circle cx="12" cy="12" r="9"\/>/g, lucidePaths.clock],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M8 12h8m-8 4h5m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2h-3\.586a1 1 0 01-\.707-\.293l-1\.414-1\.414A1 1 0 0011\.586 4H6a2 2 0 00-2 2v12a2 2 0 002 2z"\/>/g, lucidePaths.fileText],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"\/>\s*<path stroke-linecap="round" stroke-linejoin="round" d="M12 3a9 9 0 100 18 9 9 0 000-18z"\/>/g, lucidePaths.check]
];

for(const r of replacements) {
  content = content.replace(r[0], r[1]);
}
fs.writeFileSync(file, content);

const jsFile = 'd:/laragon/www/contest/corefinity/assets/js/corefinity.js';
let jsContent = fs.readFileSync(jsFile, 'utf8');

const jsReplacements = [
  [/<circle cx="12" cy="8" r="4"\/><path stroke-linecap="round" d="M4 20c0-4 3\.6-7 8-7s8 3 8 7"\/>/g, lucidePaths.user],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M12 18h\.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"\/>/g, lucidePaths.smartphone],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"\/>/g, lucidePaths.lock],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1\.405-1\.405A2\.032 2\.032 0 0118 14\.158V11a6\.002 6\.002 0 00-4-5\.659V5a2 2 0 10-4 0v\.341C7\.67 6\.165 6 8\.388 6 11v3\.159c0 \.538-\.214 1\.055-\.595 1\.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"\/>/g, lucidePaths.bell],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7\.743 5\.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2\.586a1 1 0 01\.293-\.707l5\.964-5\.964A6 6 0 1121 9z"\/>/g, lucidePaths.key],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5\.618-4\.016A11\.955 11\.955 0 0112 2\.944a11\.955 11\.955 0 01-8\.618 3\.04A12\.02 12\.02 0 003 9c0 5\.591 3\.824 10\.29 9 11\.622 5\.176-1\.332 9-6\.03 9-11\.622 0-1\.042-\.133-2\.052-\.382-3\.016z"\/>/g, lucidePaths.shield],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-\.867 12\.142A2 2 0 0116\.138 21H7\.862a2 2 0 01-1\.995-1\.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"\/>/g, lucidePaths.trash2],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"\/>/g, lucidePaths.terminal],
  [/<path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"\/>/g, lucidePaths.layoutDashboard],
];
for(const r of jsReplacements) {
  jsContent = jsContent.replace(r[0], r[1]);
}
fs.writeFileSync(jsFile, jsContent);
console.log('Script executed');
