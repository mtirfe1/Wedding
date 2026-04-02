#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'js', 'wedding-config.js');

function fail(messages) {
  console.error('\nPredeploy check failed:\n');
  messages.forEach((m) => console.error(`- ${m}`));
  console.error('\nFix the issues above, then run again.\n');
  process.exit(1);
}

function readConfig() {
  const code = fs.readFileSync(CONFIG_PATH, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'wedding-config.js' });
  return sandbox.window.WEDDING_CONFIG || {};
}

function existsRelative(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function isPlaceholder(value) {
  return !value || String(value).includes('YOUR_');
}

const cfg = readConfig();
const issues = [];

// Required values for production readiness.
if (isPlaceholder(cfg.mapsApiKey)) {
  issues.push('`mapsApiKey` is missing or still a placeholder in `js/wedding-config.js`.');
}
if (!cfg.googleAppsScriptUrl || !String(cfg.googleAppsScriptUrl).trim()) {
  issues.push('`googleAppsScriptUrl` is empty in `js/wedding-config.js`.');
}
if (!Array.isArray(cfg.validInviteCodes) || cfg.validInviteCodes.length === 0) {
  issues.push('`validInviteCodes` should contain at least one invite code.');
}

// Hero slideshow image existence checks.
const slideshow = cfg.heroSlideshow || {};
const images = Array.isArray(slideshow.images) ? slideshow.images : [];
if (images.length === 0) {
  issues.push('`heroSlideshow.images` must include at least one image path.');
} else {
  images.forEach((img) => {
    if (!existsRelative(img)) {
      issues.push(`Hero slideshow image not found: \`${img}\`.`);
    }
  });
}

// Core required assets.
['img/logo.png', 'img/logo-lg.png', 'css/styles.min.css', 'js/scripts.min.js'].forEach((asset) => {
  if (!existsRelative(asset)) {
    issues.push(`Missing required asset: \`${asset}\`.`);
  }
});

if (issues.length > 0) {
  fail(issues);
}

console.log('Predeploy check passed.');

const warnings = [];
const og = String(cfg.ogImage || '');
if (og.includes('example.com') || !og.trim()) {
  warnings.push(
    'Update `ogImage` in `js/wedding-config.js` to a full HTTPS URL on your live site for correct link previews (iMessage, Slack, etc.).'
  );
}
if (!existsRelative('.nojekyll')) {
  warnings.push(
    'GitHub Pages: add an empty `.nojekyll` file at the repo root if assets use leading underscores (e.g. `img/eng_pics/_*.jpeg`) so Jekyll does not skip them.'
  );
}
if (warnings.length > 0) {
  console.warn('\nBefore publishing, review:\n');
  warnings.forEach((w) => console.warn(`- ${w}`));
  console.warn('');
}
