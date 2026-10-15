/* ══ SUB-CONTRACTING MODULE ═══════════════════════════════════════════════
   Self-contained. It does NOT load core.js / pages.js — those render the whole
   ADT workspace — so the few shared helpers it needs (toast, header dropdowns,
   the custom select, anchored menu placement) are reimplemented here against
   the same markup and the same class names. Every screen below is assembled
   out of components that already exist in main.css / leaves.css:

     listing            .listing-page .listing-top .listing-stats .lp-table
     detail panel       .lp-split-sb  .lp-isb      .lp-sb-field-card
     workflow           .lp-wf-*
     logs               .lp-logs-wrap .lp-log-*
     popups             .ct-modal     .policy-form-section .ep-form-*
     documents          .adt-doc-page

   Because the class names are the shared ones, every transition in motion.css
   — page entrance, section stagger, row stagger, the panel slide, the popup
   lift, the toast — applies to this module without a line of its own.
   ═════════════════════════════════════════════════════════════════════════ */

/* ── ICONS ────────────────────────────────────────────────────────────────
   One set, stroke-only, 24-box, matching every other ADT icon. */
var ICO={
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/></svg>',
  truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  clipboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  inbox:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  undo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  money:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  hash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  chevR:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>',
  chevL:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>',
  close:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  plus:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  hamburger:'<svg width="16" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="1" y1="2" x2="17" y2="2"/><line x1="1" y1="7" x2="17" y2="7"/><line x1="1" y1="12" x2="17" y2="12"/></svg>',
  eye:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  sitemap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-5h14v5"/></svg>',
  qr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h.01M17 21h4v-4"/></svg>',
  basket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11h14l-1.5 9h-11z"/><path d="M8 11l4-7 4 7"/><line x1="10" y1="15" x2="10" y2="17"/><line x1="14" y1="15" x2="14" y2="17"/></svg>',
  barcode:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6v12M7 6v12M11 6v12M14 6v12M17 6v12M20 6v12"/></svg>',
  swap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 3 21 7 17 11"/><line x1="21" y1="7" x2="9" y2="7"/><polyline points="7 13 3 17 7 21"/><line x1="3" y1="17" x2="15" y2="17"/></svg>',
  card:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></svg>',
  refund:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M10 9l-3 3 3 3"/><path d="M7 12h7a3 3 0 0 1 0 6"/></svg>',
  gavel:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4l6 6"/><path d="M11 7l6 6"/><path d="M9.5 8.5l6 6"/><path d="M12.5 11.5L4 20"/><line x1="3" y1="21" x2="10" y2="21"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/></svg>',
  percent:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  ledger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/></svg>',
  upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 16V8M8.5 11.5L12 8l3.5 3.5"/></svg>',
  boxes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/><rect x="8" y="3" width="8" height="8" rx="1"/></svg>',
  key:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="M10.8 12.2L20 3M16 7l3 3M14 9l2 2"/></svg>',
  wallet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h13v4"/><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="16.5" cy="13.5" r="1.3"/></svg>',
  live:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.5"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 7 12 12 2 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>',
  building:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16"/><path d="M15 9h4a1 1 0 0 1 1 1v11"/><path d="M8 8h3M8 12h3M8 16h3"/><line x1="2" y1="21" x2="22" y2="21"/></svg>',
  server:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="7" rx="1.5"/><rect x="3" y="14" width="18" height="7" rx="1.5"/><line x1="7" y1="6.5" x2="7.01" y2="6.5"/><line x1="7" y1="17.5" x2="7.01" y2="17.5"/></svg>',
  sparkle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>',
  dumbbell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12"/></svg>',
  wave:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>',
  idcard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5 16c.6-1.6 1.7-2.4 3-2.4s2.4.8 3 2.4"/><line x1="14" y1="10" x2="19" y2="10"/><line x1="14" y1="14" x2="18" y2="14"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></svg>',
  broom:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 3l-7 7"/><path d="M12 10l-5 1-3 9 9-3 1-5z"/><path d="M7 15l2 2"/></svg>',
  megaphone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M17 8a5 5 0 0 1 0 8"/><path d="M8 14l1 5h2"/></svg>',
  list:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',
  pluscircle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
  tower:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="1"/><path d="M10 6h1M13 6h1M10 10h1M13 10h1M10 14h1M13 14h1"/><path d="M10 22v-4h4v4"/></svg>',
  door:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><line x1="3" y1="21" x2="21" y2="21"/><circle cx="14" cy="12" r=".8"/></svg>',
  medal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="5"/><path d="M8.5 11.5L6 3h4l2 4 2-4h4l-2.5 8.5"/><path d="M12 13v4"/></svg>',
  coins:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M9 14v3c0 1.7 2.7 3 6 3s6-1.3 6-3v-4c0-1.7-2.7-3-6-3"/></svg>',
  cup:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2v3M12 2v3"/></svg>',
  logbook:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z"/><path d="M5 19a2 2 0 0 1 2-2h12"/><polyline points="9 9 11 11 15 7"/></svg>',
  noimg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="M21 15l-5-5L5 21"/><line x1="3" y1="3" x2="21" y2="21"/></svg>',
  image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  pdf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 15h1.5a1.5 1.5 0 0 0 0-3H8v5M14 12v5M17 12h-1.5v5"/></svg>',
  usercog:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4"/><circle cx="18" cy="17" r="2.5"/><path d="M18 12.5v2M18 19.5v2M13.5 17h2M20.5 17h2"/></svg>',
  ticket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><line x1="10" y1="7" x2="10" y2="17" stroke-dasharray="2 2"/></svg>',
  receipt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h14v20l-3-2-2 2-2-2-2 2-2-2-3 2z"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/></svg>',
  notify:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/><circle cx="18" cy="5" r="2.5" fill="currentColor" stroke="none"/></svg>',
  report:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="18" x2="8" y2="14"/><line x1="12" y1="18" x2="12" y2="11"/><line x1="16" y1="18" x2="16" y2="15"/></svg>',
  banknote:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>',
  barchart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="20" x2="20" y2="20"/><rect x="5" y="11" width="3" height="7"/><rect x="10.5" y="6" width="3" height="12"/><rect x="16" y="13" width="3" height="5"/></svg>',
  trend:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="15 7 21 7 21 13"/></svg>',
  filex:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9.5" y1="12.5" x2="14.5" y2="17.5"/><line x1="14.5" y1="12.5" x2="9.5" y2="17.5"/></svg>',
  sortlines:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="15" y2="12"/><line x1="4" y1="18" x2="10" y2="18"/></svg>',
  lifebuoy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/></svg>',
  policy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 14 11 16 15 12"/></svg>',
  cards:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="12" rx="2"/><path d="M6 7V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"/><line x1="2" y1="11" x2="18" y2="11"/></svg>',
  map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="2 6 9 3 15 6 22 3 22 18 15 21 9 18 2 21 2 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>',
  sliders:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><line x1="15" y1="4" x2="15" y2="8"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="13" y1="16" x2="13" y2="20"/></svg>',
  headset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/></svg>',
  store:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/></svg>',
  cube:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
  handshake:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7l3-3 6 6-3 3"/><path d="M12 7L9 4 3 10l3 3"/><path d="M6 13l4 4 2-2 3 3"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
};

/* EVERY ICON CARRIES ITS NAME (ic ic-<name>) so each can answer a hover with
   its own animation - css/subcontracting.css, ICON MOTION. */
function tagIco(svg,name){return svg.replace('<svg','<svg class="ic ic-'+name+'"');}
Object.keys(ICO).forEach(function(k){ICO[k]=tagIco(ICO[k],k);});

/* ── RAIL (MOCK) ──────────────────────────────────────────────────────────
   Mirrors the source prototype's nav. Same data shape as ADT's sidebarItems,
   so swapping in the real structure is an edit to this array alone. */
var SC_NAV=[
  {id:'dashboard',label:'Dashboard',icon:ICO.grid},
  {dropdown:'Team Management',icon:ICO.shield,children:[
    {id:'teams',label:'Teams',icon:ICO.users},
    {id:'templates',label:'Templates',icon:ICO.doc}
  ]},
  {dropdown:'Store & Management',icon:ICO.store,children:[
    {id:'retailers',label:'All Retailers',icon:ICO.users},
    {id:'stores',label:'All Stores',icon:ICO.store},
    {id:'storecats',label:'Store Category',icon:ICO.sitemap},
    {id:'qrcodes',label:'All QR Code',icon:ICO.qr},
    {id:'tags',label:'All Tags',icon:ICO.tag}
  ]},
  {dropdown:'Orders and Billing',icon:ICO.basket,children:[
    {id:'billing',label:'Order Billing',icon:ICO.barcode},
    {id:'myorders',label:'My Orders',icon:ICO.basket},
    {id:'returns',label:'Returns & Cancellation',icon:ICO.swap},
    {id:'ipay',label:'Instant Payment Orders',icon:ICO.card},
    {id:'irefund',label:'Instant Payment Refund',icon:ICO.refund},
    {id:'schedule',label:'Schedule Orders',icon:ICO.clock},
    {id:'retaildeals',label:'Deals',icon:ICO.gavel},
    {id:'allorders',label:'All Orders',icon:ICO.cart}
  ]},
  {dropdown:'Product & Inventory',icon:ICO.cube,children:[
    {id:'allproducts',label:'All Products / Services',icon:ICO.boxes},
    {id:'productlist',label:'Product List',icon:ICO.cube},
    {id:'custommenu',label:'Custom Menu',icon:ICO.menu},
    {id:'brands',label:'Brands',icon:ICO.tag},
    {id:'tax',label:'Tax',icon:ICO.percent},
    {id:'hsn',label:'HSN/SAC Master',icon:ICO.ledger},
    {id:'bulkupload',label:'Bulk Upload',icon:ICO.upload}
  ]},
  {dropdown:'Buyers',icon:ICO.users,children:[
    {id:'allbuyers',label:'All Buyers',icon:ICO.users},
    {id:'livebuyers',label:'Live Buyers',icon:ICO.live},
    {id:'creditcustomers',label:'Credit Customer List',icon:ICO.user},
    {id:'creditbands',label:'Credit Bands',icon:ICO.wallet}
  ]},
  {dropdown:'Category',icon:ICO.sitemap,children:[
    {id:'maincats',label:'Main Category',icon:ICO.sitemap},
    {id:'subcats',label:'Sub Category',icon:ICO.layers},
    {id:'grandcats',label:'Grand Sub Category',icon:ICO.layers}
  ]},
  {dropdown:'Community',icon:ICO.building,children:[
    {id:'communities',label:'All Community',icon:ICO.building},
    {id:'platforms',label:'All Platform',icon:ICO.server},
    {id:'amenities',label:'All Amenities',icon:ICO.sparkle},
    {id:'cmembers',label:'All Community Members',icon:ICO.idcard},
    {id:'residents',label:'All Residents',icon:ICO.home},
    {group:'Daily Help',icon:ICO.broom,children:[{id:'dailyhelp',label:'Daily Help',icon:ICO.user}]},
    {group:'Notice Board',icon:ICO.megaphone,children:[{id:'notices',label:'All Notices',icon:ICO.list},{id:'addnotice',label:'Add Notice',icon:ICO.pluscircle}]},
    {group:'Properties',icon:ICO.tower,children:[{id:'blocks',label:'All Blocks',icon:ICO.tower},{id:'flats',label:'All Flats',icon:ICO.door}]},
    {id:'custbands',label:'Customer Bands',icon:ICO.medal},
    {id:'ewallets',label:'E-Wallets',icon:ICO.coins},
    {id:'partners',label:'All Partners',icon:ICO.handshake},
    {id:'cafeteria',label:'Cafeteria',icon:ICO.cup},
    {id:'visitorlogs',label:'Visitor Logs',icon:ICO.logbook}
  ]},
  {id:'staff',label:'Manage Staff and Roles',icon:ICO.usercog},
  {dropdown:'Pricing & Discounts',icon:ICO.ticket,children:[
    {id:'discounts',label:'Discount',icon:ICO.percent},
    {id:'discounttxns',label:'Transaction List',icon:ICO.receipt},
    {id:'notifevents',label:'Notification Event',icon:ICO.notify}
  ]},
  {dropdown:'Reports & Analytics',icon:ICO.report,children:[
    {id:'settlement',label:'Settlement Reports',icon:ICO.banknote},
    {id:'salesproducts',label:'Sales By Products Reports',icon:ICO.barchart},
    {id:'salesorders',label:'Sales Orders Reports',icon:ICO.trend},
    {id:'catalogreject',label:'Catalog Reject Report',icon:ICO.filex}
  ]},
  {id:'sequence',label:'Category & Sequence',icon:ICO.sortlines},
  {dropdown:'Support & Help Desk',icon:ICO.headset,children:[
    {id:'tickets',label:'Tickets',icon:ICO.inbox},
    {id:'supteams',label:'Teams',icon:ICO.users},
    {id:'supcats',label:'Support Categories',icon:ICO.lifebuoy},
    {id:'policies',label:'Policies',icon:ICO.policy}
  ]},
  {dropdown:'Cards and Subscriptions',icon:ICO.card,children:[
    {id:'cards',label:'Cards',icon:ICO.card},
    {id:'cardlist',label:'Card Listing',icon:ICO.cards}
  ]},
  {dropdown:'Location control',icon:ICO.map,children:[
    {id:'cities',label:'Location control',icon:ICO.pin}
  ]},
  {dropdown:'Transactions',icon:ICO.file,children:[
    {id:'deals',label:'Deals',icon:ICO.file},
    {id:'orders',label:'Orders',icon:ICO.cart}
  ]},
  {id:'masters',label:'Masters',icon:ICO.sliders,placeholder:true}
];

var SC_ROLES=['Planner','PMG Approver','Buyer','PO Approver','Stores User',
  'Delivery Note Approver','Finance / F&A / IDT','Security User','Vendor User',
  'QC User','Super Admin'];

/* Which log entries a role may write. The listing, the dashboard and the Add
   Log select all read this one map. */
var ROLE_ACTIONS={
  'Planner':['Submit SCR','Create Shipment','Confirm Shipment'],
  'PMG Approver':['Approve SCR','Return SCR','Reject SCR','Confirm Shipment'],
  'Buyer':['Generate PO','Return SCR'],
  'PO Approver':['Approve PO','Return PO'],
  'Stores User':['Goods Release & Issue','Return Shipment','Create IMR','Confirm IMR'],
  'Delivery Note Approver':['Approve Delivery Note','Return Delivery Note'],
  'Finance / F&A / IDT':['Generate Challan','Return Challan','Complete Reconciliation','Short Close','Confirm Full Receipt','Close Transaction'],
  'Security User':['Confirm Gate Outward','Return Gate Outward','Confirm Gate Inward'],
  'Vendor User':['Create ASN'],
  'QC User':['Clear ASN','Return ASN'],
  'Super Admin':['Approve SCR','Return SCR','Reject SCR','Submit SCR','Generate PO','Return PO','Approve PO',
    'Create Shipment','Confirm Shipment','Goods Release & Issue','Return Shipment',
    'Approve Delivery Note','Return Delivery Note','Generate Challan','Return Challan',
    'Confirm Gate Outward','Return Gate Outward','Create ASN','Clear ASN','Return ASN',
    'Confirm Gate Inward','Create IMR','Confirm IMR','Complete Reconciliation',
    'Short Close','Confirm Full Receipt','Close Transaction']
};

/* What each role can do straight from the deals listing (the ACTION button's
   menu). Narrower than ROLE_ACTIONS: the listing offers each role its forward
   actions; the Add Log form in the panel still carries the full set. */
var ROW_ACTIONS={
  'Planner':['Submit SCR','Create Shipment','Confirm Shipment'],
  'PMG Approver':['Approve SCR','Return SCR','Reject SCR'],
  'Buyer':['Generate PO'],
  'PO Approver':['Approve PO','Return PO'],
  'Stores User':['Goods Release & Issue','Return Shipment','Create IMR','Confirm IMR'],
  'Delivery Note Approver':['Approve Delivery Note','Return Delivery Note'],
  'Finance / F&A / IDT':['Generate Challan','Complete Reconciliation','Confirm Full Receipt','Close Transaction'],
  'Security User':['Confirm Gate Outward','Return Gate Outward','Confirm Gate Inward'],
  'Vendor User':['Create ASN'],
  'QC User':['Clear ASN','Return ASN'],
  'Super Admin':['Approve SCR','Return SCR','Reject SCR','Submit SCR','Generate PO','Approve PO','Return PO',
    'Create Shipment','Goods Release & Issue','Return Shipment','Approve Delivery Note','Return Delivery Note',
    'Generate Challan','Confirm Gate Outward','Return Gate Outward','Confirm Shipment','Create ASN','Clear ASN','Return ASN',
    'Confirm Gate Inward','Create IMR','Confirm IMR','Complete Reconciliation','Confirm Full Receipt','Close Transaction']
};
/* The log status each action writes - the "to" pill in Update Status. */
var ACTION_RESULT={
  'Approve SCR':'SCR Approved','Return SCR':'SCR Returned','Reject SCR':'SCR Rejected',
  'Generate PO':'PO Generated','Approve PO':'PO Approved','Return PO':'PO Returned',
  'Create Shipment':'Shipment Created','Confirm Shipment':'Shipment Confirmed',
  'Goods Release & Issue':'Goods Release & Issue','Return Shipment':'Shipment Returned',
  'Approve Delivery Note':'Delivery Note Approved','Return Delivery Note':'Delivery Note Returned',
  'Generate Challan':'Challan Generated','Confirm Gate Outward':'Gate Outward Confirmed',
  'Return Gate Outward':'Gate Outward Returned','Create ASN':'ASN Created','Clear ASN':'ASN QC Cleared',
  'Confirm Gate Inward':'Gate Inward Confirmed','Create IMR':'IMR Created','Confirm IMR':'IMR Confirmed',
  'Complete Reconciliation':'Reconciliation Completed','Confirm Full Receipt':'Full Receipt Confirmed',
  'Close Transaction':'Transaction Closed','Submit SCR':'SCR Submitted'
};
var PO_ACTIONS=['Generate PO','Approve PO','Return PO'];
/* What a button calls an action, where it differs from the action's key. */
var ACTION_LABEL={'Generate PO':'Send for Approval'};
function actLabel(a){return ACTION_LABEL[a]||a;}

/* The four actions that need more than a status and a comment. Picking one in
   the log form opens its own form instead of saving straight away. */
var FORM_ACTIONS=['Create Shipment','Create ASN','Create IMR','Generate PO','Submit SCR'];

var SC_STAGES=[
  {key:'scr',title:'SCR Approval',count:8,icon:ICO.file},
  {key:'po',title:'Purchase Order',count:5,icon:ICO.cart},
  {key:'shipment',title:'Shipment',count:6,icon:ICO.box},
  {key:'outbound',title:'Outbound',count:4,icon:ICO.truck},
  {key:'asn',title:'ASN / QC',count:5,icon:ICO.search},
  {key:'imr',title:'IMR',count:3,icon:ICO.clipboard},
  {key:'reconciliation',title:'Reconciliation',count:4,icon:ICO.refresh},
  {key:'closure',title:'Ready for Closure',count:2,icon:ICO.flag}
];

var STAGE_ACCESS={
  'Planner':['shipment'],
  'PMG Approver':['scr','shipment'],
  'Buyer':['po'],
  'PO Approver':['po'],
  'Stores User':['outbound','imr'],
  'Delivery Note Approver':['outbound'],
  'Finance / F&A / IDT':['outbound','reconciliation','closure'],
  'Security User':['outbound','asn'],
  'Vendor User':['asn'],
  'QC User':['asn']
};

var EXPECTED_QTY=10;

/* ── STATE ────────────────────────────────────────────────────────────────  */
var state={
  role:'Planner',
  page:'dashboard',
  scrForm:null,      // the SCR open on the Create / Edit SCR page (null = new)
  edit:null,         // a tab being edited in place: {id, tab, vals, dirty}
  logAdd:null,       // the Logs tab's open composer: {key, action[, target]}
  teamFilter:{q:'',status:'',vertical:'',sort:''},teamPage:1,
  tplFilter:{q:'',vertical:''},tplPage:1,tplOpen:{},
  dashTab:'sc',      // the Dashboard's view: sc | sales | settlement
  salesRange:{key:'today'},salesCh:'All',purCh:'All',setRange:{key:'yesterday'},setPage:1,
  expanded:false,    // the open detail panel is lifted into a large centred window
  /* Logs design - TEMPORARY toggle, see logsTabHTML */
  stageFilter:null,
  stageLabel:'',

  /* 'none' until Create SCR is submitted — the demo starts from the form. */
  scr:'none',
  scrData:null,
  poPrice:null,
  po:'none',
  shipment:'none',
  outboundKey:false,
  transferOrder:false,
  goodsIssue:false,
  deliveryNote:'none',
  challan:'none',
  gateOut:false,
  shipmentConfirmed:false,
  asns:[],
  imrs:[],
  reconciled:false,
  shortClosed:false,
  fullReceipt:false,
  closed:false,

  dealLogs:[],
  poLogs:[],

  dealSel:null,
  orderSel:null,
  dealFilter:{q:'',process:'',scr:'',ship:''},
  dealPage:1,
  orderPage:1,
  orderFilter:{q:'',status:'',buyer:''},

  dealOpen:false,
  orderOpen:false,
  dealTab:'details',
  orderTab:'details',

  railCollapsed:false
};
var pendingAction=null;   // the business popup currently on screen

/* ══ SAMPLE DEALS ═════════════════════════════════════════════════════════
   The SCR created from the form is the one LIVE deal: its state is what every role
   walks through the log forms. The records below are read-only sample data
   that fill the listings, the stage cards and the side panel, so the module
   reads like a populated workspace. Each record names the stage it sits at;
   its logs, workflow and PO status are derived from that one key. */
var LIVE_ID='SCR-2026-50132';
var LIVE_PO='37756';
/* What the Create SCR form captured. The defaults are the form's own, so a
   reader of any view sees exactly what was submitted. */
var LIVE_DEFAULT={title:'Sub-contracting for shaft machining',base:'Production Order',nature:'Job',
  buyer:'Madan Mohan',remarks:'For urgent processing',headText:'Additional header information',
  item:{name:'Fabricated End Frame',qty:10,price:250,date:'30 Oct 2026'}};
function L(){return state.scrData||LIVE_DEFAULT;}
function liveExists(){return state.scr!=='none';}
function poPrice(){return state.poPrice!=null?state.poPrice:L().item.price;}
function poValue(){return L().item.qty*poPrice();}
var STAGE_ORDER=['scr','po','shipment','outbound','asn','imr','reconciliation','closure','closed'];

var SAMPLE_DEALS=[
  {id:'SCR-2026-50131',title:'Heat treatment of gear blanks',base:'Production Order',baseRef:'PO-100052 — Gear Blank Hardening',
   process:'Processing',workType:'Service',planner:'Rahul Verma',buyer:'Gagan Tej',
   vendor:{code:'21018',name:'Bharat Heat Treaters Pvt. Ltd.',city:'Pune',addr:'Bhosari MIDC, Pune, Maharashtra 411026'},
   item:{name:'Hardened Gear Blank',type:'Semi-Finished',qty:40,uom:'Each',price:180,hsn:'8483',due:'18 Oct 2026'},
   issues:[['SKU_52410_3814 — EN24 Gear Blank Forging','Zone B','7326']],
   stage:'scr',created:'26 Sep 2026',asns:0,imrs:0,received:0},
  {id:'SCR-2026-50128',title:'Galvanising of structural members',base:'Project',baseRef:'PRJ-2207 — Coastal Jetty Extension',
   process:'Processing',workType:'Service',planner:'Kinjal Sisodiya',buyer:'Madan Mohan',
   vendor:{code:'21044',name:'Gujarat Galva Coatings LLP',city:'Ankleshwar',addr:'GIDC Estate, Ankleshwar, Gujarat 393002'},
   item:{name:'Galvanised I-Beam ISMB 300',type:'Finished Product',qty:120,uom:'Each',price:95,hsn:'7308',due:'25 Oct 2026'},
   issues:[['SKU_52133_3814 — ISMB 300 Beam 6 m','Zone D','7216']],
   stage:'po',po:{no:'37754',status:'Approved'},created:'24 Sep 2026',asns:0,imrs:0,received:0},
  {id:'SCR-2026-50119',title:'CNC turning of pump impeller shafts',base:'Production Order',baseRef:'PO-100041 — Impeller Shaft',
   process:'Job Work',workType:'Job',planner:'Rahul Verma',buyer:'Madan Mohan',
   vendor:{code:'21005',name:'Sri Venkateswara Aerospace Pvt.ltd',city:'Hyderabad',addr:'Hyderabad, Telangana 500084'},
   item:{name:'Impeller Shaft Ø60',type:'Finished Product',qty:25,uom:'Each',price:420,hsn:'8413',due:'20 Oct 2026'},
   issues:[['SKU_52288_3814 — Carbon Steel Billet','Zone B','7207'],['SKU_52302_3814 — SS 410 Round Bar Ø70','Zone A','7222']],
   stage:'po',po:{no:'37752',status:'Draft'},created:'21 Sep 2026',asns:0,imrs:0,received:0},
  {id:'SCR-2026-50114',title:'Sand blasting and painting of tank shell',base:'Project',baseRef:'PRJ-2198 — Ammonia Storage Tank',
   process:'Processing',workType:'Service',planner:'Neha Joshi',buyer:'Gagan Tej',
   vendor:{code:'21031',name:'Coastline Surface Solutions',city:'Surat',addr:'Sachin GIDC, Surat, Gujarat 394230'},
   item:{name:'Painted Tank Shell Plate',type:'Semi-Finished',qty:18,uom:'Each',price:1250,hsn:'7309',due:'15 Oct 2026'},
   issues:[['SKU_52297_3814 — Mild Steel Plate 10 mm','Zone A','7208']],
   stage:'po',po:{no:'37748',status:'Created'},created:'19 Sep 2026',asns:0,imrs:0,received:0},
  {id:'SCR-2026-50107',title:'Fabrication of conveyor support frames',base:'Production Order',baseRef:'PO-100029 — Conveyor Frame',
   process:'Job Work',workType:'Job',planner:'Kinjal Sisodiya',buyer:'Madan Mohan',
   vendor:{code:'21027',name:'Shree Ganesh Engineering Works',city:'Vadodara',addr:'Makarpura GIDC, Vadodara, Gujarat 390010'},
   item:{name:'Conveyor Support Frame',type:'Finished Product',qty:12,uom:'Each',price:2600,hsn:'8431',due:'12 Oct 2026'},
   issues:[['SKU_52133_3814 — ISMC 150 Channel','Zone D','7216'],['SKU_52297_3814 — Mild Steel Plate 10 mm','Zone A','7208']],
   stage:'shipment',po:{no:'37739',status:'Approved'},created:'15 Sep 2026',asns:0,imrs:0,received:0},
  {id:'SCR-2026-50102',title:'Repair of hydraulic cylinder rods',base:'Maintenance Order',baseRef:'MO-77812 — Press Line Overhaul',
   process:'Repair',workType:'Service',planner:'Neha Joshi',buyer:'Gagan Tej',
   vendor:{code:'21052',name:'Precision Hydraulics & Co.',city:'Ahmedabad',addr:'Vatva GIDC, Ahmedabad, Gujarat 382445'},
   item:{name:'Re-chromed Cylinder Rod',type:'Repaired Item',qty:6,uom:'Each',price:3800,hsn:'8412',due:'10 Oct 2026'},
   issues:[['SKU_51870_3814 — Hydraulic Cylinder Rod Ø80','Zone E','8412']],
   stage:'outbound',sub:'challan',po:{no:'37735',status:'Approved'},created:'12 Sep 2026',asns:0,imrs:0,received:0},
  {id:'SCR-2026-50096',title:'Machining of valve body castings',base:'Production Order',baseRef:'PO-100022 — Gate Valve 8"',
   process:'Job Work',workType:'Job',planner:'Rahul Verma',buyer:'Madan Mohan',
   vendor:{code:'21009',name:'Kalyani Precision Components',city:'Rajkot',addr:'Aji GIDC, Rajkot, Gujarat 360003'},
   item:{name:'Machined Valve Body 8"',type:'Finished Product',qty:30,uom:'Each',price:950,hsn:'8481',due:'08 Oct 2026'},
   issues:[['SKU_52011_3814 — WCB Valve Body Casting','Zone C','7325']],
   stage:'outbound',po:{no:'37731',status:'Approved'},created:'09 Sep 2026',asns:0,imrs:0,received:0},
  {id:'SCR-2026-50091',title:'Bending and rolling of pipe spools',base:'Project',baseRef:'PRJ-2185 — Refinery Pipe Rack',
   process:'Job Work',workType:'Job',planner:'Kinjal Sisodiya',buyer:'Gagan Tej',
   vendor:{code:'21036',name:'Om Sai Pipe Fabricators',city:'Bharuch',addr:'Dahej SEZ, Bharuch, Gujarat 392130'},
   item:{name:'Rolled Pipe Spool 12"',type:'Semi-Finished',qty:22,uom:'Each',price:1400,hsn:'7306',due:'06 Oct 2026'},
   issues:[['SKU_51944_3814 — CS Pipe 12" SCH40 6 m','Zone D','7304']],
   stage:'outbound',sub:'gate',po:{no:'37726',status:'Approved'},created:'06 Sep 2026',asns:0,imrs:0,received:0},
  {id:'SCR-2026-50085',title:'Laser cutting of bracket profiles',base:'Production Order',baseRef:'PO-100017 — Mounting Bracket',
   process:'Job Work',workType:'Job',planner:'Neha Joshi',buyer:'Madan Mohan',
   vendor:{code:'21061',name:'Tecno Laser Cut Pvt. Ltd.',city:'Vapi',addr:'Phase II GIDC, Vapi, Gujarat 396195'},
   item:{name:'Laser-cut Bracket Profile',type:'Semi-Finished',qty:200,uom:'Each',price:45,hsn:'7326',due:'02 Oct 2026'},
   issues:[['SKU_52297_3814 — Mild Steel Plate 10 mm','Zone A','7208']],
   stage:'asn',po:{no:'37719',status:'Approved'},created:'02 Sep 2026',asns:1,imrs:0,received:0},
  {id:'SCR-2026-50079',title:'Induction hardening of crane wheels',base:'Maintenance Order',baseRef:'MO-77790 — EOT Crane Refit',
   process:'Processing',workType:'Service',planner:'Rahul Verma',buyer:'Gagan Tej',
   vendor:{code:'21018',name:'Bharat Heat Treaters Pvt. Ltd.',city:'Pune',addr:'Bhosari MIDC, Pune, Maharashtra 411026'},
   item:{name:'Hardened Crane Wheel Ø500',type:'Repaired Item',qty:8,uom:'Each',price:2100,hsn:'8431',due:'30 Sep 2026'},
   issues:[['SKU_51702_3814 — Crane Wheel Ø500','Zone E','8431']],
   stage:'asn',sub:'vendor',po:{no:'37714',status:'Approved'},created:'29 Aug 2026',asns:2,imrs:0,received:0},
  {id:'SCR-2026-50072',title:'Welding of skid base assemblies',base:'Production Order',baseRef:'PO-100009 — Compressor Skid',
   process:'Job Work',workType:'Job',planner:'Kinjal Sisodiya',buyer:'Madan Mohan',
   vendor:{code:'21027',name:'Shree Ganesh Engineering Works',city:'Vadodara',addr:'Makarpura GIDC, Vadodara, Gujarat 390010'},
   item:{name:'Compressor Skid Base',type:'Finished Product',qty:4,uom:'Each',price:18500,hsn:'8414',due:'28 Sep 2026'},
   issues:[['SKU_52133_3814 — ISMC 150 Channel','Zone D','7216'],['SKU_52297_3814 — Mild Steel Plate 10 mm','Zone A','7208']],
   stage:'imr',po:{no:'37708',status:'Approved'},created:'25 Aug 2026',asns:2,imrs:1,received:2},
  {id:'SCR-2026-50066',title:'Grinding of roller shafts',base:'Production Order',baseRef:'PO-100004 — Roller Shaft',
   process:'Job Work',workType:'Job',planner:'Neha Joshi',buyer:'Gagan Tej',
   vendor:{code:'21009',name:'Kalyani Precision Components',city:'Rajkot',addr:'Aji GIDC, Rajkot, Gujarat 360003'},
   item:{name:'Ground Roller Shaft',type:'Finished Product',qty:50,uom:'Each',price:310,hsn:'8483',due:'22 Sep 2026'},
   issues:[['SKU_52302_3814 — SS 410 Round Bar Ø70','Zone A','7222']],
   stage:'reconciliation',po:{no:'37701',status:'Approved'},created:'20 Aug 2026',asns:2,imrs:2,received:48},
  {id:'SCR-2026-50058',title:'Powder coating of panel enclosures',base:'Project',baseRef:'PRJ-2170 — Substation Panels',
   process:'Processing',workType:'Service',planner:'Rahul Verma',buyer:'Madan Mohan',
   vendor:{code:'21044',name:'Gujarat Galva Coatings LLP',city:'Ankleshwar',addr:'GIDC Estate, Ankleshwar, Gujarat 393002'},
   item:{name:'Coated Panel Enclosure',type:'Finished Product',qty:15,uom:'Each',price:1150,hsn:'8538',due:'18 Sep 2026'},
   issues:[['SKU_51655_3814 — CRCA Sheet 2 mm','Zone C','7209']],
   stage:'closure',po:{no:'37694',status:'Approved'},created:'14 Aug 2026',asns:1,imrs:1,received:15},
  {id:'SCR-2026-50041',title:'Overhaul of gearbox housings',base:'Maintenance Order',baseRef:'MO-77731 — Kiln Drive',
   process:'Repair',workType:'Service',planner:'Kinjal Sisodiya',buyer:'Gagan Tej',
   vendor:{code:'21052',name:'Precision Hydraulics & Co.',city:'Ahmedabad',addr:'Vatva GIDC, Ahmedabad, Gujarat 382445'},
   item:{name:'Overhauled Gearbox Housing',type:'Repaired Item',qty:3,uom:'Each',price:9200,hsn:'8483',due:'05 Sep 2026'},
   issues:[['SKU_51590_3814 — Gearbox Housing GH-40','Zone E','8483']],
   stage:'closed',po:{no:'37672',status:'Closed'},created:'04 Aug 2026',asns:1,imrs:1,received:3}
];

/* Who holds each stage in the sample data, and the names that sign its logs. */
var SAMPLE_PEOPLE={
  'PMG Approver':'Gagan Tej','PO Approver':'Ritesh Nair','Stores User':'Suresh Patel',
  'Delivery Note Approver':'Anita Desai','Finance / F&A / IDT':'Pooja Mehta',
  'Security User':'Ramesh Yadav','Vendor User':'Vendor Portal User','QC User':'Harish Kulkarni'
};
function samplePending(d){var n=sampleNextOf(d);return n?n.role:'—';}
/* RECEIPTS ON A SAMPLE. From the ASN stage a sample keeps its ASNs and IMRs
   as records (d.rx), like the live deal: each ASN goes through QC, gate and
   IMR on its own, several can be open at once, and Create ASN stays on offer
   while quantity is open. The entries generated up to that point are kept in
   the log; every later step is logged as it is taken. The sample's stage is
   re-read from the records after each step (rxSync), so the listing, Pending
   With and Workflow follow. */
var RX_STATUSES=['ASN Created','ASN QC Cleared','Gate Inward Confirmed','IMR Created','IMR Confirmed','ASN Returned'];
var RX_OWNER={'Create ASN':'Vendor User','Clear ASN':'QC User','Return ASN':'QC User','Confirm Gate Inward':'Security User',
  'Create IMR':'Stores User','Confirm IMR':'Stores User'};
function rxPhase(d){return d.stage==='asn'||d.stage==='imr';}
function ensureRx(d){
  if(d.rx||!rxPhase(d))return d.rx||null;
  var x=dealDocs(d.id),keyOf=function(l){return l.status+'|'+l.date+'|'+l.time;};
  d.extra=d.extra||[];
  var have={};d.extra.forEach(function(l){have[keyOf(l)]=1;});
  sampleMilestones(d).forEach(function(l){
    if(RX_STATUSES.indexOf(l.status)>=0&&!have[keyOf(l)])d.extra.push(Object.assign({},l,{seq:l.seq||0,rxFrozen:true}));
  });
  var nos=x.asns.map(function(a){return a.no;});
  d.rx={asns:x.asns.map(function(a){return {qty:+a.qty||0,qc:a.qc,gateIn:!!a.gateIn};}),
        imrs:x.imrs.map(function(m){return {asn:Math.max(0,nos.indexOf(m.asnNo)),qty:+m.qty||0,status:m.status};})};
  /* a sample waiting on the vendor for another ASN has quantity left to advise */
  if(d.stage==='asn'&&d.sub==='vendor'&&d.rx.asns.length&&rxOpen(d)===0){
    var per=Math.max(1,Math.floor(d.item.qty/(d.rx.asns.length+1)));
    d.rx.asns.forEach(function(a){a.qty=per;});
  }
  return d.rx;
}
function rxOpen(d){return Math.max(0,d.item.qty-d.rx.asns.reduce(function(t,a){return t+(a.qc==='Returned'?0:a.qty);},0));}
function rxAvail(d,i){
  var a=d.rx.asns[i];if(!a)return 0;
  return Math.max(0,a.qty-d.rx.imrs.filter(function(m){return m.asn===i;}).reduce(function(t,m){return t+m.qty;},0));
}
/* what the records are ready for now, whoever takes it */
function rxActions(d){
  var r=d.rx,acts=[];
  if(rxOpen(d)>0)acts.push('Create ASN');
  if(r.asns.some(function(a){return a.qc==='Created';}))acts.push('Clear ASN','Return ASN');
  if(r.asns.some(function(a){return a.qc==='QC Cleared'&&!a.gateIn;}))acts.push('Confirm Gate Inward');
  if(r.asns.some(function(a,i){return a.qc==='QC Cleared'&&a.gateIn&&rxAvail(d,i)>0;}))acts.push('Create IMR');
  if(r.imrs.some(function(m){return m.status==='Created';}))acts.push('Confirm IMR');
  return acts;
}
function rxSync(d){
  var r=d.rx;
  d.asns=r.asns.length;d.imrs=r.imrs.length;
  d.received=r.imrs.filter(function(m){return m.status==='Confirmed';}).reduce(function(t,m){return t+m.qty;},0);
  var at=function(stage,sub){d.stage=stage;d.sub=sub;};
  /* the same order as the live deal's Pending With: the vendor while quantity is open */
  if(rxOpen(d)>0)at('asn','vendor');
  else if(r.asns.some(function(a){return a.qc==='Created';}))at('asn','qc');
  else if(r.asns.some(function(a){return a.qc==='QC Cleared'&&!a.gateIn;}))at('asn','gatein');
  else if(r.imrs.some(function(m){return m.status==='Created';}))at('imr','confirm');
  else if(r.asns.some(function(a,i){return a.qc==='QC Cleared'&&a.gateIn&&rxAvail(d,i)>0;}))at('imr','create');
  else at('reconciliation','');
}
function rxLog(d,status,comment){
  var t=stamp();d.extra=d.extra||[];
  d.extra.push({status:status,role:state.role,by:who(),comment:comment,reason:curReason,date:t.date,time:t.time,portal:'Web',seq:++scSeq});
}
function rxTarget(d,kind,ready){
  var list=kind==='asn'?d.rx.asns:d.rx.imrs,m=/^(asn|imr):(\d+)$/.exec(curTarget||'');
  if(m&&m[1]===kind&&list[+m[2]]&&ready(list[+m[2]]))return +m[2];
  return list.findIndex(ready);
}
function rxNo(d,kind,i){return (kind==='asn'?'ASN-':'IMR-')+d.id.slice(-5)+'-'+(i+1);}
function rxAct(d,action,comment){
  var r=d.rx,c=comment?comment+' — ':'',i;
  if(action==='Clear ASN'){i=rxTarget(d,'asn',function(a){return a.qc==='Created';});if(i<0)return;
    r.asns[i].qc='QC Cleared';rxLog(d,'ASN QC Cleared',c+rxNo(d,'asn',i));scToast(rxNo(d,'asn',i)+' cleared by QC');}
  else if(action==='Return ASN'){i=rxTarget(d,'asn',function(a){return a.qc==='Created';});if(i<0)return;
    r.asns[i].qc='Returned';rxLog(d,'ASN Returned',c+rxNo(d,'asn',i));scToast(rxNo(d,'asn',i)+' returned to vendor','info');}
  else if(action==='Confirm Gate Inward'){i=rxTarget(d,'asn',function(a){return a.qc==='QC Cleared'&&!a.gateIn;});if(i<0)return;
    r.asns[i].gateIn=true;rxLog(d,'Gate Inward Confirmed',c+rxNo(d,'asn',i));scToast('Gate inward confirmed for '+rxNo(d,'asn',i));}
  else if(action==='Confirm IMR'){i=rxTarget(d,'imr',function(m){return m.status==='Created';});if(i<0)return;
    r.imrs[i].status='Confirmed';rxLog(d,'IMR Confirmed',c+rxNo(d,'imr',i));scToast(rxNo(d,'imr',i)+' confirmed');}
  rxSync(d);
}
function sampleDeal(id){return SAMPLE_DEALS.filter(function(d){return d.id===id;})[0];}
function stageReached(d,key){return STAGE_ORDER.indexOf(d.stage)>=STAGE_ORDER.indexOf(key);}
function stagePassed(d,key){return STAGE_ORDER.indexOf(d.stage)>STAGE_ORDER.indexOf(key);}
function sampleScr(d){return d.rejected?'Rejected':d.returned?'SCR Returned':d.stage==='scr'?'Sent for Approval':d.stage==='closed'?'Closed':'Approved';}
function sampleShip(d){
  if(d.stage==='closed')return 'Closed';
  if(!stageReached(d,'shipment'))return 'Not Started';
  if(d.stage==='shipment')return 'Created';
  if(d.stage==='outbound')return d.sub==='gate'||d.sub==='confirm'?'Challan Generated':'Freezed Outbound Release';
  return 'Challan Generated';
}
function scrToneOf(s){return s==='Rejected'||s==='SCR Returned'?'unapproved':s==='Sent for Approval'?'pending':s==='Closed'?'closed':'approved';}
function shipToneOf(s){return s==='Not Started'?'sc-idle':s==='Closed'?'closed':s==='Freezed Outbound Release'?'created':'in-progress';}
function poToneOf(s){return {Draft:'draft',Created:'created',Approved:'approved',Closed:'closed'}[s]||'sc-idle';}
/* The Update Status pills (from -> to) sit on one blue -> green ramp
   (sc-r1 blue ... sc-r5 deep green, subcontracting.css), by how far through
   the transaction the status sits. Status badges elsewhere keep ADT's tones. */
function rampTone(status){
  var t=String(status);
  if(/^Transaction Closed|^PO Closed/.test(t))return 'sc-r5';
  if(/Reconcil|Full Receipt|Short Clos/.test(t))return 'sc-r4';
  if(/ASN|Gate Inward|IMR/.test(t))return 'sc-r3';
  if(/Shipment|Goods Release|Delivery Note|Challan|Gate Outward|Outbound|Transfer Order/.test(t))return 'sc-r2';
  return 'sc-r1';
}
function fmtAmt(n){return n.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});}
var MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(d){return ('0'+d.getDate()).slice(-2)+' '+MONTHS[d.getMonth()]+' '+d.getFullYear();}
function addDays(dateStr,n){
  var d=new Date(dateStr);d.setDate(d.getDate()+n);
  return fmtDate(d);
}
/* Logs store 24-hour time; ADT shows it as 09:05:00 AM. */
function fmtTime(t){
  var p=String(t).split(':'),h=+p[0];if(isNaN(h))return t;
  return ('0'+(h%12||12)).slice(-2)+':'+p[1]+':'+(p[2]||'00')+' '+(h<12?'AM':'PM');
}
function logTs(l){return Date.parse(l.date+' '+l.time)||0;}

/* The milestones a sample deal has completed, oldest first. Each one is a
   log entry and a workflow card, so the two tabs can never disagree. */
function sampleMilestones(d){
  var m=sampleMilestonesBase(d);
  /* A step taken from the listing replaces the generated entry for that
     status (its last occurrence) with who actually did it, when, and why. */
  Object.keys(d.notes||{}).forEach(function(st){
    for(var i=m.length-1;i>=0;i--)if(m[i].status===st){
      var n=d.notes[st];m[i]=Object.assign({},m[i],{by:n.by,role:n.role,comment:n.comment,date:n.date,time:n.time,seq:n.seq});break;
    }
  });
  if(d.extra&&d.extra.length){
    m=m.concat(d.extra).map(function(l,i){return {l:l,i:i};})
      .sort(function(a,b){return logTs(a.l)-logTs(b.l)||(a.l.seq||0)-(b.l.seq||0)||a.i-b.i;}).map(function(x){return x.l;});
  }
  return m;
}
function sampleMilestonesBase(d){
  var m=[],day=0,po=d.po?d.po.no:'',
      add=function(status,role,by,comment){
        day+=1+(m.length%3);
        m.push({status:status,role:role,by:by,comment:comment,date:addDays(d.created,day-1),
          time:('0'+(9+m.length%8)).slice(-2)+':'+('0'+(m.length*7%60)).slice(-2)+':00',portal:'Web'});
      };
  add('SCR Submitted','Planner',d.planner,'SCR raised against '+d.baseRef.split(' — ')[0]+'.');
  if(!stagePassed(d,'scr'))return m;
  add('SCR Approved','PMG Approver',SAMPLE_PEOPLE['PMG Approver'],'Approved. PO '+po+' created in Draft.');
  if(d.po.status!=='Draft')add('PO Generated','Buyer',d.buyer,'Commercial fields completed against the rate contract.');
  if(!stagePassed(d,'po')){
    if(d.po.status==='Approved')add('PO Approved','PO Approver',SAMPLE_PEOPLE['PO Approver'],'PO '+po+' approved.');
    return m;
  }
  add('PO Approved','PO Approver',SAMPLE_PEOPLE['PO Approver'],'PO '+po+' approved.');
  add('Shipment Created','Planner',d.planner,'Shipment raised for '+d.item.qty+' '+d.item.uom+'.');
  if(!stagePassed(d,'shipment'))return m;
  add('Goods Release & Issue','Stores User',SAMPLE_PEOPLE['Stores User'],'Issue material released against the Transfer Order.');
  add('Delivery Note Generated','Stores User','System','Delivery Note generated after Goods Release & Issue.');
  /* outbound runs in four hands: DN approval, challan, gate, confirmation */
  var ob=d.stage==='outbound'?['dn','challan','gate','confirm'].indexOf(d.sub||'dn'):4;
  if(ob<1)return m;
  add('Delivery Note Approved','Delivery Note Approver',SAMPLE_PEOPLE['Delivery Note Approver'],'Quantities match the Transfer Order.');
  if(ob<2)return m;
  add('Challan Generated','Finance / F&A / IDT',SAMPLE_PEOPLE['Finance / F&A / IDT'],'Delivery Challan issued as the gate pass copy.');
  if(ob<3)return m;
  add('Gate Outward Confirmed','Security User',SAMPLE_PEOPLE['Security User'],'Vehicle cleared at the main gate.');
  if(ob<4)return m;
  add('Shipment Confirmed','Planner',d.planner,'Material Position updated to At Vendor.');
  for(var a=1;!d.rx&&a<=d.asns;a++){
    add('ASN Created','Vendor User',SAMPLE_PEOPLE['Vendor User'],'ASN '+a+' raised by the vendor.');
    var asnDone=d.stage!=='asn'||a<d.asns||d.sub==='vendor';
    if(asnDone||d.sub==='gatein')add('ASN QC Cleared','QC User',SAMPLE_PEOPLE['QC User'],'ASN '+a+' passed inspection.');
    if(asnDone)add('Gate Inward Confirmed','Security User',SAMPLE_PEOPLE['Security User'],'ASN '+a+' received at the gate.');
  }
  if(!stagePassed(d,'asn'))return m;
  for(var i=1;!d.rx&&i<=d.imrs;i++){
    add('IMR Created','Stores User',SAMPLE_PEOPLE['Stores User'],'IMR '+i+' raised against a gate-cleared ASN.');
    if(d.stage!=='imr'||i<d.imrs||d.sub==='create')add('IMR Confirmed','Stores User',SAMPLE_PEOPLE['Stores User'],'IMR '+i+' posted to stock.');
  }
  if(!stagePassed(d,'imr'))return m;
  if(!stagePassed(d,'reconciliation'))return m;
  add('Reconciliation Completed','Finance / F&A / IDT',SAMPLE_PEOPLE['Finance / F&A / IDT'],
    'Expected '+d.item.qty+', received '+d.received+'.');
  if(!stagePassed(d,'closure')){
    if(d.sub==='close')add('Full Receipt Confirmed','Finance / F&A / IDT',SAMPLE_PEOPLE['Finance / F&A / IDT'],'All receivable quantity received.');
    return m;
  }
  add('Full Receipt Confirmed','Finance / F&A / IDT',SAMPLE_PEOPLE['Finance / F&A / IDT'],'All receivable quantity received.');
  add('Transaction Closed','Finance / F&A / IDT',SAMPLE_PEOPLE['Finance / F&A / IDT'],'SCR, PO, Shipment and Challan closed.');
  return m;
}

/* Where the live deal sits, read off its state. */
function liveStage(){
  if(!liveExists())return 'none';
  if(state.closed)return 'closed';
  if(state.scr==='sent'||state.scr==='returned')return 'scr';
  if(state.po!=='approved')return 'po';
  if(state.shipment==='none'||!state.goodsIssue)return 'shipment';
  if(!state.shipmentConfirmed)return 'outbound';
  if(state.reconciled)return 'closure';
  if(eligibleASNs().length||state.imrs.some(function(m){return m.status==='Created';}))return 'imr';
  if(state.imrs.some(function(m){return m.status==='Confirmed';}))return 'reconciliation';
  return 'asn';
}

/* Every deal as one listing row — the live one first, read from state. */
function dealRows(){
  var rows=!liveExists()?[]:[{id:LIVE_ID,live:true,base:L().base,title:L().title,
    planner:'Kinjal Sisodiya',vendor:'Sri Venkateswara Aerospace Pvt.ltd',vendorSub:'21005 · Hyderabad',
    process:'Job Work',scr:scrLabel(),ship:shipLabel(),pending:pendingWith(),stage:liveStage(),cur:liveCurrent(),
    asns:state.asns.length,imrs:state.imrs.length}];
  SAMPLE_DEALS.forEach(function(d){
    rows.push({id:d.id,base:d.base,title:d.title,planner:d.planner,vendor:d.vendor.name,
      vendorSub:d.vendor.code+' · '+d.vendor.city,process:d.process,scr:sampleScr(d),ship:sampleShip(d),
      pending:samplePending(d),stage:d.stage,asns:d.asns,imrs:d.imrs,
      cur:(function(m){return m[m.length-1].status;})(sampleMilestones(d))});
  });
  return rows;
}
function orderRows(){
  var rows=[];
  if(state.po!=='none')rows.push({no:LIVE_PO,live:true,scrId:LIVE_ID,title:L().title,
    vendor:'Sri Venkateswara Aerospace Pvt.ltd',buyer:L().buyer,value:poValue(),created:state.poCreated||'',
    approved:state.poApproved||'',status:poLabel(),stage:liveStage()});
  SAMPLE_DEALS.forEach(function(d){
    if(!d.po)return;
    var ms=sampleMilestones(d),
        at=function(s){var x=ms.filter(function(l){return l.status===s;})[0];return x?x.date:'';};
    rows.push({no:d.po.no,scrId:d.id,title:d.title,vendor:d.vendor.name,buyer:d.buyer,
      value:d.item.qty*d.item.price,created:at('SCR Approved'),approved:at('PO Approved'),
      status:d.po.status,stage:d.stage});
  });
  return rows;
}
function stageCount(key){
  return dealRows().filter(function(r){return r.stage===key;}).length;
}

/* ══ SHARED UI HELPERS ════════════════════════════════════════════════════
   Reimplementations of the four core.js utilities this module uses, against
   exactly the markup and class names the shared stylesheets expect. */

function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function scToast(title,type,sub){
  type=type||'success';
  var stack=document.getElementById('toast-stack');
  if(!stack){stack=document.createElement('div');stack.id='toast-stack';document.body.appendChild(stack);}
  var icons={
    success:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    error:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };
  var el=document.createElement('div');
  el.className='toast '+type;
  el.innerHTML='<div class="toast-ico">'+(icons[type]||icons.success)+'</div>'
    +'<div class="toast-body"><div class="toast-title">'+esc(title)+'</div>'
    +(sub?'<div class="toast-sub">'+esc(sub)+'</div>':'')+'</div>'
    +'<button class="toast-close" onclick="scDismissToast(this)" title="Dismiss"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
  stack.appendChild(el);
  while(stack.children.length>4)stack.removeChild(stack.firstChild);
  el._timer=setTimeout(function(){scDismissToastEl(el);},3400);
}
function scDismissToast(btn){scDismissToastEl(btn.parentElement);}
function scDismissToastEl(el){
  if(!el||el.classList.contains('toast-leaving'))return;
  clearTimeout(el._timer);
  el.classList.add('toast-leaving');
  setTimeout(function(){if(el.parentElement)el.parentElement.removeChild(el);},240);
}

/* Header dropdowns — one open at a time, click-away closes. */
function scToggleDD(id,ev){
  var panel=document.getElementById(id);if(!panel)return;
  var wasOpen=panel.classList.contains('open');
  scCloseAllDD();
  if(!wasOpen)panel.classList.add('open');
  /* The document-level click-away listener below would otherwise close the
     panel in the same gesture that opened it. */
  if(ev&&ev.stopPropagation)ev.stopPropagation();
}
function scCloseAllDD(){
  var list=document.querySelectorAll('.hdr-dd-panel.open');
  for(var i=0;i<list.length;i++)list[i].classList.remove('open');
}

/* The shared custom select. Its menu is position:fixed (leaves.css), so it has
   to be placed by hand — the same contract placeAnchoredMenu() honours in
   core.js: open below when there is room, flip above when there is not, clamp
   to the viewport, cap and scroll only when the space actually constrains it. */
var csValues={};
function csField(id,opts,value,placeholder,hook){
  var sel=value&&opts.indexOf(value)>=0?value:'';
  csValues[id]=sel;
  var optStr=opts.map(function(o){
    return '<div class="cs-option'+(sel===o?' cs-selected':'')+'" onclick="csSelect(this,\''+o.replace(/'/g,"\\'")+'\',\''+id+'\')">'
      +'<span>'+esc(o)+'</span>'
      +'<svg class="cs-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>';
  }).join('');
  if(!opts.length)optStr='<div class="cs-option" style="color:#9ca3af;cursor:default">No action available for your role</div>';
  return '<div class="cs-wrap" id="csw-'+id+'"'+(hook?' data-cshook="'+hook+'"':'')+'>'
    +'<button type="button" class="cs-trigger'+(sel?'':' cs-placeholder')+'" onclick="csToggle(this,event)" data-csid="'+id+'" title="'+esc(sel||placeholder||'Select')+'">'
    +'<span class="cs-value">'+esc(sel||placeholder||'Select')+'</span>'
    +'<svg class="cs-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'
    +'</button><div class="cs-dropdown" id="csd-'+id+'">'+optStr+'</div></div>';
}
function csToggle(btn,ev){
  var id=btn.dataset.csid,mine='csd-'+id;
  document.querySelectorAll('.cs-dropdown.cs-open').forEach(function(d){
    if(d.id===mine)return;
    d.classList.remove('cs-open');
    var t=d.previousElementSibling;if(t)t.classList.remove('cs-open');
  });
  var drop=document.getElementById(mine);if(!drop)return;
  var open=drop.classList.toggle('cs-open');btn.classList.toggle('cs-open',open);
  if(open)scPlaceMenu(drop,btn.getBoundingClientRect());
  if(ev&&ev.stopPropagation)ev.stopPropagation();
}
function scPlaceMenu(menu,anchor){
  menu.style.maxHeight='';menu.style.width=anchor.width+'px';
  menu.style.top='0px';menu.style.left='0px';
  var mh=menu.offsetHeight,vh=window.innerHeight,vw=window.innerWidth;
  var gap=6,edge=8;
  var left=Math.min(Math.max(edge,anchor.left),Math.max(edge,vw-menu.offsetWidth-edge));
  var below=vh-anchor.bottom-gap-edge,above=anchor.top-gap-edge,top,cap;
  if(mh<=below){top=anchor.bottom+gap;cap=below;}
  else if(mh<=above){top=anchor.top-gap-mh;cap=above;}
  else if(below>=above){top=anchor.bottom+gap;cap=below;}
  else {top=edge;cap=above;}
  menu.style.left=Math.round(left)+'px';
  menu.style.top=Math.round(top)+'px';
  menu.style.maxHeight=(cap<mh)?Math.floor(Math.max(120,cap))+'px':'';
}
function csSelect(opt,val,id){
  var drop=document.getElementById('csd-'+id);if(!drop)return;
  drop.querySelectorAll('.cs-option').forEach(function(o){o.classList.remove('cs-selected');});
  opt.classList.add('cs-selected');
  var trigger=document.querySelector('[data-csid="'+id+'"]');
  if(trigger){trigger.querySelector('.cs-value').textContent=val;trigger.title=val;trigger.classList.remove('cs-placeholder','cs-open');}
  drop.classList.remove('cs-open');
  csValues[id]=val;
  var wrap=document.getElementById('csw-'+id);
  var hook=wrap&&wrap.dataset.cshook;
  if(hook&&typeof window[hook]==='function')window[hook](val,id);
}
function csValue(id){return csValues[id]||'';}

document.addEventListener('click',function(){
  scCloseAllDD();
  document.querySelectorAll('.cs-dropdown.cs-open').forEach(function(d){
    d.classList.remove('cs-open');
    var t=d.previousElementSibling;if(t)t.classList.remove('cs-open');
  });
});
window.addEventListener('resize',function(){
  document.querySelectorAll('.cs-dropdown.cs-open').forEach(function(d){
    d.classList.remove('cs-open');
    var t=d.previousElementSibling;if(t)t.classList.remove('cs-open');
  });
});
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape')return;
  if(document.getElementById('sc-modal-root').innerHTML){scCloseModal();return;}
  /* Esc closes an open select first */
  var openSel=document.querySelectorAll('.cs-dropdown.cs-open');
  if(openSel.length){openSel.forEach(function(d){d.classList.remove('cs-open');var t=d.previousElementSibling;if(t)t.classList.remove('cs-open');});return;}
  if(state.logAdd&&!state.logAdd.saved){scLogCancel();return;}
  if(state.expanded){scCollapsePanel();return;}
  if(state.dealOpen){scCloseDeal();return;}
  if(state.orderOpen){scCloseOrder();return;}
});

/* ══ DERIVED FACTS ════════════════════════════════════════════════════════  */
function stageAccess(role,stage){
  if(role==='Super Admin')return true;
  return (STAGE_ACCESS[role]||[]).indexOf(stage)>=0;
}
function cumulativeAdvised(){return state.asns.reduce(function(t,a){return t+(a.qc==='Returned'?0:a.qty);},0);}
function openASNQty(){return Math.max(0,EXPECTED_QTY-cumulativeAdvised());}
function receivedForASN(i){
  var asn=state.asns[i];if(!asn)return 0;
  return state.imrs.filter(function(m){return m.asnNo===asn.no;}).reduce(function(t,m){return t+m.qty;},0);
}
function availableForIMR(i){
  var asn=state.asns[i];if(!asn)return 0;
  return Math.max(0,asn.qty-receivedForASN(i));
}
function eligibleASNs(){
  return state.asns.map(function(a,i){a.index=i;return a;})
    .filter(function(a){return a.qc==='QC Cleared'&&a.gateIn===true&&availableForIMR(a.index)>0;});
}
function confirmedReceived(){
  return state.imrs.filter(function(m){return m.status==='Confirmed';}).reduce(function(t,m){return t+m.qty;},0);
}
function openReceiptQty(){return Math.max(0,EXPECTED_QTY-confirmedReceived());}

/* Which of this role's actions the record is actually ready for. The log form
   offers nothing else, so the prototype cannot be walked out of sequence. */
function validDealActions(role){
  var actions=ROLE_ACTIONS[role||state.role]||[];
  return actions.filter(function(a){
    /* A CLOSED TRANSACTION ACCEPTS NOTHING FURTHER. Without this, Create ASN
       stayed on offer to the Vendor after closure whenever the deal had been
       SHORT CLOSED — openASNQty() is still non-zero there, because the balance
       was written off rather than received, and that was the only condition the
       action tested. The vendor could advise against a dead SCR. Checked once,
       for every action, rather than adding a closed-check to each. */
    if(state.closed)return false;
    if(['Approve SCR','Return SCR','Reject SCR'].indexOf(a)>=0)return state.scr==='sent';
    if(a==='Submit SCR')return state.scr==='returned';
    if(a==='Create Shipment')return state.po==='approved'&&state.shipment==='none';
    if(a==='Goods Release & Issue'||a==='Return Shipment')return state.shipment==='created'&&!state.goodsIssue;
    if(a==='Approve Delivery Note'||a==='Return Delivery Note')return state.deliveryNote==='generated';
    if(a==='Generate Challan'||a==='Return Challan')return state.deliveryNote==='approved'&&state.challan==='none';
    if(a==='Confirm Gate Outward'||a==='Return Gate Outward')return state.challan==='generated'&&!state.gateOut;
    if(a==='Confirm Shipment')return state.gateOut&&!state.shipmentConfirmed;
    if(a==='Create ASN')return state.shipmentConfirmed&&openASNQty()>0;
    if(a==='Clear ASN'||a==='Return ASN')return state.asns.some(function(x){return x.qc==='Created';});
    if(a==='Confirm Gate Inward')return state.asns.some(function(x){return x.qc==='QC Cleared'&&!x.gateIn;});
    if(a==='Create IMR')return eligibleASNs().length>0;
    if(a==='Confirm IMR')return state.imrs.some(function(m){return m.status==='Created';});
    if(a==='Complete Reconciliation')return state.imrs.some(function(m){return m.status==='Confirmed';})&&!state.reconciled;
    if(a==='Short Close')return state.reconciled&&openReceiptQty()>0&&!state.shortClosed;
    if(a==='Confirm Full Receipt')return state.reconciled&&openReceiptQty()===0&&!state.fullReceipt;
    if(a==='Close Transaction')return (state.shortClosed||state.fullReceipt)&&!state.closed;
    return false;
  });
}
function validPOActions(role){
  var actions=ROLE_ACTIONS[role||state.role]||[];
  return actions.filter(function(a){
    if(a==='Generate PO')return state.po==='draft';
    if(a==='Approve PO'||a==='Return PO')return state.po==='created';
    return false;
  });
}

function pendingWith(){
  if(!liveExists())return '—';
  if(state.scr==='returned')return 'Planner';
  if(state.scr==='sent')return 'PMG Approver';
  if(state.scr==='approved'&&state.po==='draft')return 'Buyer';
  if(state.po==='created')return 'PO Approver';
  if(state.po==='approved'&&state.shipment==='none')return 'Planner';
  if(state.shipment==='created'&&!state.goodsIssue)return 'Stores User';
  if(state.deliveryNote==='generated')return 'Delivery Note Approver';
  if(state.deliveryNote==='approved'&&state.challan==='none')return 'Finance / F&A / IDT';
  if(state.challan==='generated'&&!state.gateOut)return 'Security User';
  if(state.gateOut&&!state.shipmentConfirmed)return 'Planner / PMG';
  if(state.shipmentConfirmed&&openASNQty()>0)return 'Vendor User';
  if(state.asns.some(function(a){return a.qc==='Created';}))return 'QC User';
  if(state.asns.some(function(a){return a.qc==='QC Cleared'&&!a.gateIn;}))return 'Security User';
  if(eligibleASNs().length||state.imrs.some(function(m){return m.status==='Created';}))return 'Stores User';
  if(state.imrs.some(function(m){return m.status==='Confirmed';})&&!state.closed)return 'Finance / F&A';
  return '—';
}

function scrLabel(){return state.scr==='none'?'Not Created':state.scr==='returned'?'SCR Returned':state.scr==='sent'?'Sent for Approval':state.scr==='closed'?'Closed':'Approved';}
function scrTone(){return state.scr==='none'?'sc-idle':state.scr==='returned'?'unapproved':state.scr==='sent'?'pending':state.scr==='closed'?'closed':'approved';}
function shipLabel(){
  return state.shipment==='none'?'Not Started'
    :state.shipment==='closed'?'Closed'
    :state.shipment==='created'?'Created'
    :state.shipment==='outbound_released'?'Freezed Outbound Release'
    :'Challan Generated';
}
function shipTone(){
  return state.shipment==='none'?'sc-idle':state.shipment==='closed'?'closed'
    :state.shipment==='outbound_released'?'created':'in-progress';
}
function poLabel(){return state.po==='none'?'Not Created':state.po.charAt(0).toUpperCase()+state.po.slice(1);}
function poTone(){
  return state.po==='none'?'sc-idle':state.po==='draft'?'draft'
    :state.po==='created'?'created':state.po==='closed'?'closed':'approved';
}
function badge(tone,text){return '<span class="lp-status-badge '+tone+'">'+esc(text)+'</span>';}

/* ══ RAIL ═════════════════════════════════════════════════════════════════  */
var openGroups={'Transactions':true},openSubs={};
/* every page a dropdown holds, groups inside it included */
function navIds(item){var out=[];(item.children||[]).forEach(function(c){if(c.group)c.children.forEach(function(x){out.push(x.id);});else out.push(c.id);});return out;}
function navH(item){var n=0;(item.children||[]).forEach(function(c){n++;if(c.group)n+=c.children.length;});return (n*38+16)+'px';}
function buildRail(){
  var el=document.getElementById('sc-sidebar');if(!el)return;
  el.className='sidebar'+(state.railCollapsed?' collapsed':'');
  el.innerHTML='';
  var view=document.getElementById('v-sc');
  view.style.setProperty('--sb-w',state.railCollapsed?'62px':'224px');
  view.classList.toggle('sb-collapsed',state.railCollapsed);

  var top=document.createElement('div');
  top.className='sb-top';
  top.innerHTML=(state.railCollapsed?'':'<span class="sb-menu-label">Menu</span>')
    +'<button class="sidebar-toggle" onclick="scToggleRail()" title="Toggle sidebar">'
    +'<svg class="ic ic-panel" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="16" height="14" rx="2"/><line x1="15" y1="5" x2="15" y2="19"/></svg></button>';
  el.appendChild(top);

  SC_NAV.forEach(function(item){
    if(item.section){
      if(state.railCollapsed)return;
      var s=document.createElement('div');s.className='sb-section';s.textContent=item.section;el.appendChild(s);return;
    }
    if(item.dropdown){
      var isOpen=!!openGroups[item.dropdown];
      var hasActive=navIds(item).indexOf(navPage())>=0;
      if(state.railCollapsed){
        var d=document.createElement('button');d.type='button';
        d.className='sb-parent'+(hasActive?' has-active':'');
        d.innerHTML='<div class="sb-ico-wrap">'+item.icon+'</div>';
        d.title=item.dropdown;
        d.onclick=function(){state.railCollapsed=false;openGroups={};openGroups[item.dropdown]=true;buildRail();};
        el.appendChild(d);return;
      }
      var parent=document.createElement('button');parent.type='button';
      parent.className='sb-parent'+(isOpen?' open':'')+(hasActive?' has-active':'');
      parent.innerHTML='<div class="sb-ico-wrap">'+item.icon+'</div><span>'+item.dropdown+'</span>'
        +'<svg class="sb-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';
      var kids=document.createElement('div');
      kids.className='sb-children';
      kids.style.maxHeight=isOpen?navH(item):'0';
      (item.children||[]).forEach(function(child){
        if(child.group){
          var sOpen=!!openSubs[child.group],sAct=child.children.some(function(x){return x.id===navPage();});
          var sp=document.createElement('button');sp.type='button';
          sp.className='sb-parent sb-subparent'+(sOpen?' open':'')+(sAct?' has-active':'');
          sp.innerHTML='<div class="sb-ico-wrap">'+child.icon+'</div><span>'+child.group+'</span>'
            +'<svg class="sb-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';
          sp.title=child.group;
          var sk=document.createElement('div');sk.className='sb-children sb-subchildren';
          sk.style.maxHeight=sOpen?(child.children.length*38+8)+'px':'0';
          child.children.forEach(function(x){
            var c=document.createElement('button');c.type='button';
            c.className='sb-item'+(x.id===navPage()?' active':'');
            c.innerHTML='<div class="sb-ico-wrap">'+x.icon+'</div><span>'+x.label+'</span>';
            c.title=x.label;c.onclick=function(){scGo(x.id);};
            sk.appendChild(c);
          });
          sp.onclick=function(){
            if(openSubs[child.group]){delete openSubs[child.group];sk.style.maxHeight='0';sp.classList.remove('open');}
            else{openSubs[child.group]=true;sk.style.maxHeight=(child.children.length*38+8)+'px';sp.classList.add('open');}
          };
          kids.appendChild(sp);kids.appendChild(sk);return;
        }
        var c=document.createElement('button');c.type='button';
        c.className='sb-item'+(child.id===navPage()?' active':'');
        c.innerHTML='<div class="sb-ico-wrap">'+child.icon+'</div><span>'+child.label+'</span>';
        c.title=child.label;
        c.onclick=function(){scGo(child.id);};
        kids.appendChild(c);
      });
      parent.onclick=function(){
        if(openGroups[item.dropdown]){delete openGroups[item.dropdown];kids.style.maxHeight='0';parent.classList.remove('open');}
        else{openGroups={};openGroups[item.dropdown]=true;kids.style.maxHeight=navH(item);parent.classList.add('open');
             el.querySelectorAll('.sb-parent.open').forEach(function(b){if(b!==parent)b.classList.remove('open');});
             el.querySelectorAll('.sb-children').forEach(function(k){if(k!==kids)k.style.maxHeight='0';});}
      };
      el.appendChild(parent);el.appendChild(kids);
      return;
    }
    var b=document.createElement('button');b.type='button';
    b.className='sb-item'+(item.id===navPage()?' active':'');
    b.innerHTML='<div class="sb-ico-wrap">'+item.icon+'</div><span>'+item.label+'</span>';
    b.title=item.label;
    b.onclick=item.placeholder
      ? function(){scToast(item.label+' is outside this prototype','info');}
      : function(){scGo(item.id);};
    el.appendChild(b);
  });
}
function scToggleRail(){state.railCollapsed=!state.railCollapsed;buildRail();}

/* ══ HEADER ═══════════════════════════════════════════════════════════════  */
function buildRoleMenu(){
  var dd=document.getElementById('sc-role-dd');
  dd.innerHTML='<div class="hdr-dd-header" style="padding-bottom:8px"><div>'
    +'<div class="hdr-dd-title">Switch role</div>'
    +'<div class="hdr-dd-subtitle">Decides which stages and actions are open</div>'
    +'</div></div><div class="hdr-dd-divider"></div>'
    +SC_ROLES.map(function(r){
      return '<button class="sc-role-opt'+(state.role===r?' is-current':'')+'" onclick="scSetRole(\''+r.replace(/'/g,"\\'")+'\')">'
        +'<span>'+esc(r)+'</span>'
        +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></button>';
    }).join('');
  document.getElementById('sc-role-name').textContent=state.role;
  document.getElementById('sc-user-role').textContent=state.role;
}
function scSetRole(role){
  state.role=role;
  scCloseAllDD();
  scRender();
  scToast('Now viewing as '+role,'info','Stages and log actions have been re-scoped.');
}

/* ══ ROUTER ═══════════════════════════════════════════════════════════════  */
var TITLES={dashboard:'Dashboard',deals:'Deals',orders:'Purchase Orders','scr-form':'Deals',teams:'Teams',templates:'Templates',
  retailers:'All Retailers',stores:'All Stores',storecats:'Store Categories',qrcodes:'All QR Code',tags:'Tags',
  billing:'Order Billing',myorders:'My Orders',returns:'Returns & Cancellation',ipay:'Instant Payment Orders',irefund:'Refund',
  schedule:'Schedule Orders',retaildeals:'Deals',allorders:'All Orders',
  allproducts:'All Products / Services',productlist:'Product List',custommenu:'Custom Menu',brands:'Brands',tax:'Tax',hsn:'HSN/SAC Master',bulkupload:'Bulk Upload',
  allbuyers:'All Buyers',livebuyers:'All Live Buyers',creditcustomers:'Credit Customer List',creditbands:'Credit Bands',
  maincats:'Main Category',subcats:'Sub Category',grandcats:'Grand Sub Category',
  communities:'All Community',platforms:'All Platform',amenities:'Amenities',cmembers:'All Community Members',residents:'All Residents',
  dailyhelp:'All Daily Help',notices:'Notice Board',addnotice:'Add Notice',blocks:'All Blocks',flats:'All Flats',custbands:'Customer Bands',
  ewallets:'E-Wallets',partners:'All Partners',cafeteria:'Cafeteria',visitorlogs:'Visitor Logs',
  staff:'Staff And Roles',discounts:'Discounts',discounttxns:'Discount Transactions',notifevents:'Notifications',
  settlement:'Settlement Reports',salesproducts:'Sales By Products',salesorders:'Sales Orders Report',catalogreject:'Catalog Reject Report',
  sequence:'Sequence Management',tickets:'Tickets',supteams:'Support Teams',supcats:'Support Categories',policies:'All Policies',
  cards:'Cards',cardlist:'Card Listing',cities:'City Status Management',profile:'My Profile',addhsn:'Add HSN/SAC'};
/* The SCR form is a page of its own but belongs to Deals. */
function navPage(){return state.page==='scr-form'?'deals':state.page==='addhsn'?'hsn':state.page;}
function scGo(page){
  state.page=page;
  var navOf=page==='addhsn'?'hsn':page;
  SC_NAV.forEach(function(g){if(g.dropdown&&navIds(g).indexOf(navOf)>=0){openGroups={};openGroups[g.dropdown]=true;openSubs={};
    (g.children||[]).forEach(function(c){if(c.group&&c.children.some(function(x){return x.id===page;}))openSubs[c.group]=true;});}});
  /* the listing panel's own state; Deals and Purchase Orders keep their behaviour */
  var glWasOpen=!!state.glOpen;
  state.dealOpen=false;state.orderOpen=false;state.glOpen=null;state.glLogAdd=null;state.glEdit=null;state.glSub=null;state.permDraft=null;state.glDraft=null;state.pfPop=false;state.seqEdit=null;
  if(glWasOpen&&state.expanded){state.expanded=false;applyExpanded();}
  /* Arriving from the rail is a fresh arrival at the page. Carrying a stage
     filter over from a dashboard card would leave the listing quietly scoped
     to something the user did not ask for on this visit. */
  state.stageFilter=null;state.stageLabel='';state.dealPage=1;state.orderPage=1;
  scRender();
}
/* ══ HISTORY ═══════════════════════════════════════════════════════════════
   A field-by-field record of what changed on a deal: who, when, which field,
   its old value and its new one. Two sources feed it:
     - edits, recorded at save time with the field's own label;
     - status fields (SCR / Shipment / PO Status, PO Value), caught centrally:
       every render compares each deal with how it looked at the last render,
       so a step taken from any screen lands here without each action having
       to remember to record it. The Orders panel shows the PO fields. */
var HISTORY={},histSnap=null;
function recordChange(id,field,oldv,newv){
  oldv=oldv==null?'':String(oldv);newv=newv==null?'':String(newv);
  if(oldv===newv)return;
  var t=stamp();
  (HISTORY[id]||(HISTORY[id]=[])).unshift({by:who(),role:state.role,date:t.date,time:t.time,field:field,old:oldv,val:newv});
}
/* EVERY FIELD, EVERY CHANGE. The snapshot is the whole of a deal as the
   screens show it - statuses, who it is pending with, the SCR, the PO's
   commercial fields, the shipment and transport, the Delivery Note and
   Challan, and each ASN and IMR. Whatever changed between two renders - an
   action, an in-tab edit, a document created - is one History row per field,
   signed by whoever was acting. Nothing has to remember to record itself. */
function dealSnapshot(r){
  var id=r.id,live=id===LIVE_ID,d=live?null:sampleDeal(id),x=dealDocs(id),o=live?L():d,e={};
  e['SCR Status']=r.scr;e['Shipment Status']=r.ship;e['Pending With']=r.pending;
  e['SCR Title']=o.title;e['SCR Base']=o.base;e['Buyer']=o.buyer;
  e['Nature of SCR / Work Type']=live?(o.nature||''):d.workType;
  e['Expected Qty']=String(o.item.qty);e['Est. Price / Unit']=fmtAmt(+o.item.price);
  if(live){e['Comment']=o.remarks||'';e['Header Text']=o.headText||'';}
  var po=poNoOf(id);
  if(po&&(live?state.po!=='none':!!d.po)){
    var pi=poInfo(po);
    e['PO Status']=poStatusOf(po);e['PO Value']=fmtAmt(live?poValue():d.item.qty*d.item.price);
    Object.keys(PO_LABELS).forEach(function(k){e['PO · '+PO_LABELS[k]]=pi[k];});
    e['PO · Price / Unit']=fmtAmt(+poPriceOf(po));
  }
  if(x.ship){
    e['Shipment ID']=x.ship.no;
    Object.keys(SHIP_LABELS).forEach(function(k){e['Shipment · '+SHIP_LABELS[k]]=x.sh[k];});
  }
  if(x.dn){
    e['Delivery Note · Status']=x.dn.approved?'Approved':'Generated';
    e['Delivery Note · Your / Our Reference']=x.dnInfo.ref;e['Delivery Note · Comment']=x.dnInfo.remarks;
  }
  if(x.challan){
    e['Challan · Status']=x.challan.status;
    e['Challan · Nature / Reason']=x.chInfo.nature;e['Challan · Your / Our Reference']=x.chInfo.ref;
  }
  x.asns.forEach(function(a){
    e[a.no+' · Advised Qty']=String(a.qty);e[a.no+' · QC Status']=a.qc;e[a.no+' · Gate Inward']=a.gateIn?'Confirmed':'Pending';
  });
  x.imrs.forEach(function(m){e[m.no+' · Receipt Qty']=String(m.qty);e[m.no+' · Status']=m.status;});
  return e;
}
function statusSnapshot(){
  var snap={};
  dealRows().forEach(function(r){snap[r.id]=dealSnapshot(r);});
  return snap;
}
function trackHistory(){
  var now=statusSnapshot();
  /* a deal seen before records each field that moved - a field that has
     just come into being (a new ASN, a PO's first status) reads from blank */
  if(histSnap)Object.keys(now).forEach(function(id){
    if(!histSnap[id])return;
    var a=histSnap[id],b=now[id];
    /* every field on either side: one that appeared reads from blank, one that
       went away (a step moved back) reads to blank. Reversed, so one step's
       changes read top-down in field order (rows are added newest-first). */
    var keys=Object.keys(b);Object.keys(a).forEach(function(f){if(!(f in b))keys.push(f);});
    keys.reverse().forEach(function(f){recordChange(id,f,a[f]===undefined?'':a[f],b[f]===undefined?'':b[f]);});
  });
  histSnap=now;
}
function historyHTML(id,poOnly){
  var rows=(HISTORY[id]||[]).filter(function(h){return !poOnly||/^PO\b/.test(h.field);});
  if(!rows.length)return docEmpty(ICO.clock,'No changes yet',poOnly
    ?'Every change to this PO - status, value and commercial fields - appears here.'
    :'Every change to this deal - edits, status steps and new documents - appears here, with who made it and when.');
  return '<div class="sc-hist">'+recTable(['S.no','Update By','Update Time','Field Name','Old Val','New Val'],
    rows.map(function(h,i){
      return '<tr><td>'+(i+1)+'</td>'
        +'<td><b>'+esc(h.by)+'</b><span class="sc-rec-sub">'+esc(h.role)+'</span></td>'
        +'<td>'+esc(h.date)+'<span class="sc-rec-sub">'+esc(fmtTime(h.time))+'</span></td>'
        +'<td>'+esc(h.field)+'</td>'
        +'<td class="sc-hist-old">'+(h.old?esc(h.old):'<span class="lp-dash">—</span>')+'</td>'
        +'<td class="sc-hist-new">'+(h.val?esc(h.val):'<span class="lp-dash">—</span>')+'</td></tr>';
    }).join(''))+'</div>';
}

function scRender(){
  document.getElementById('sc-page-title').textContent=TITLES[state.page]||'Sub-Contracting';
  /* The header's page action belongs to its page - Create SCR on Deals,
     Create Team on Teams, Create Template on Templates - hidden elsewhere. */
  var act=PAGE_ACTIONS[state.page],cb=document.getElementById('sc-create-btn');
  cb.style.display=act?'inline-flex':'none';
  if(act)cb.innerHTML=(act[2]||ICO.plus)+' '+act[0];
  buildRoleMenu();
  buildRail();
  var el=document.getElementById('adt-content');
  el.innerHTML=state.page==='deals'?dealsPageHTML():state.page==='orders'?ordersPageHTML():state.page==='scr-form'?scrFormPageHTML()
    :state.page==='billing'?billingPageHTML():state.page==='bulkupload'?bulkUploadHTML():state.page==='addnotice'?addNoticeHTML():state.page==='addhsn'?addHsnHTML():state.page==='profile'?profileHTML():GL[state.page]?glPageHTML(state.page):dashboardHTML();
  /* A panel that was already open stays open through a re-render — with the
     class applied in the same frame, so it does not replay the slide-in every
     time a log is saved. Opening it from a row click is the other path, and
     that one animates (scOpenDeal / scOpenOrder). */
  if(state.page==='deals'&&state.dealOpen){
    var sb=document.getElementById('sc-deal-sb');
    if(sb){sb.classList.add('sc-still','open');fillPanel('sc-deal-isb',dealPanelHTML());}
  }
  if(state.page==='orders'&&state.orderOpen){
    var ob=document.getElementById('sc-order-sb');
    if(ob){ob.classList.add('sc-still','open');fillPanel('sc-order-isb',orderPanelHTML());}
  }
  if(GL[state.page]&&state.glOpen&&state.glOpen.id===state.page){
    var gb=document.getElementById('sc-gl-sb');
    if(!glRow(state.page,state.glOpen.key)){state.glOpen=null;if(state.expanded){state.expanded=false;applyExpanded();}}
    else if(gb){gb.classList.add('sc-still','open');fillPanel('sc-gl-isb',glPanelHTML(state.page));applyExpanded();}
  }
}
/* Status changes are recorded before anything is drawn, so a History tab that
   is open shows the step that was just taken. */
var scRenderView=scRender;
/* A REPAINT IS NOT A PAGE LOAD. Logging a step, saving, switching role - the
   page is redrawn to keep counts and statuses honest, but it is the same page,
   so ADT's .m-quiet (motion.css) holds back the entrance animations that would
   make it read as a reload. It is cleared only when the page itself changes,
   before the new page is written - clearing it later would start them then. */
var scLastPage=null;
scRender=function(){
  if(state.edit&&!(state.edit.create?canCreate(state.edit.id,state.edit.create)
      :state.edit.id.indexOf('po:')===0?canEditPO(state.edit.id.slice(3)):canEditTab(state.edit.id,state.edit.tab)))state.edit=null;
  var root=document.getElementById('adt-content');
  if(root)root.classList.toggle('m-quiet',scLastPage===state.page);
  scLastPage=state.page;
  trackHistory();scRenderView();
  if(!(state.page==='deals'&&state.dealOpen)&&!(state.page==='orders'&&state.orderOpen))state.expanded=false;
  applyExpanded();
};

/* ══ DASHBOARD ════════════════════════════════════════════════════════════  */
/* ══ DASHBOARD VIEWS ═══════════════════════════════════════════════════════
   One Dashboard page, three views, switched by ADT's dashboard tab row
   (.dashboard-tabs / .tab-btn - the same row the multi-role dashboard uses):
   Sub-Contracting, Sales and Settlement. Every view is built from the shared
   pieces only - .hr-header, .hr-band, .hr-stat-card, .hr-section, the record
   and listing tables, .segmented, the status badges. */
var DASH_TABS=[{id:'sc',label:'Sub-Contracting Dashboard'},{id:'sales',label:'Sales Dashboard'},{id:'settlement',label:'Settlement Dashboard'}];
function dashboardHTML(){
  var view=state.dashTab==='sales'?salesDashHTML():state.dashTab==='settlement'?settlementDashHTML():scDashboardHTML();
  return '<div class="listing-page">'
    +'<div class="dashboard-tabs-wrap"><div class="dashboard-tabs" role="tablist">'
      +DASH_TABS.map(function(t){
        var on=state.dashTab===t.id;
        return '<button type="button" role="tab" aria-selected="'+on+'" class="tab-btn'+(on?' active':'')+'" onclick="scDashTab(\''+t.id+'\')">'+esc(t.label)+'</button>';
      }).join('')
    +'</div></div>'
    +'<div class="dashboard-view active">'+view+'</div>'
  +'</div>';
}
function scDashTab(id){state.dashTab=id;scRender();}
function scDashSet(key,v){state[key]=v;scRender();}
/* ── DATE RANGE ──────────────────────────────────────────────────────────
   A button naming the period opens a menu of presets; Custom opens a two-
   month calendar beside the list to pick a range - future days struck out -
   with the range spelled out and Cancel / Apply at the foot. Settlement has
   no "Today": the day's payouts are not settled yet. */
var RANGE_PRESETS=[['today','Today'],['yesterday','Yesterday'],['last7','Last 7 Days'],['last30','Last 30 Days'],
  ['thisMonth','This Month'],['lastMonth','Last Month'],['custom','Custom']];
function rangeKey(scope){return scope==='settlement'?'setRange':'salesRange';}
function rangePresets(scope){return scope==='settlement'?RANGE_PRESETS.slice(1):RANGE_PRESETS;}
function addD(d,n){var x=new Date(d);x.setDate(x.getDate()+n);return x;}
function rangeOf(scope){
  var r=state[rangeKey(scope)],T=DASH_TODAY,y=T.getFullYear(),m=T.getMonth();
  if(r.key==='custom')return {from:new Date(r.from),to:new Date(r.to)};
  if(r.key==='yesterday')return {from:addD(T,-1),to:addD(T,-1)};
  if(r.key==='last7')return {from:addD(T,-6),to:T};
  if(r.key==='last30')return {from:addD(T,-29),to:T};
  if(r.key==='thisMonth')return {from:new Date(y,m,1),to:T};
  if(r.key==='lastMonth')return {from:new Date(y,m-1,1),to:new Date(y,m,0)};
  return {from:T,to:T};
}
function shortDate(d){return ('0'+d.getDate()).slice(-2)+' '+MONTHS[d.getMonth()];}
function rangeLabel(scope){
  var r=state[rangeKey(scope)];
  if(r.key!=='custom')return (RANGE_PRESETS.filter(function(x){return x[0]===r.key;})[0]||['',''])[1];
  var g=rangeOf(scope);
  return +g.from===+g.to?fmtDate(g.from):shortDate(g.from)+' – '+fmtDate(g.to);
}
function rangeBtnHTML(scope){
  return '<button type="button" class="sc-range-btn" onclick="event.stopPropagation();scRangeOpen(this,\''+scope+'\')">'
    +'<span class="sc-range-ico">'+ICO.cal+'</span><span>'+esc(rangeLabel(scope))+'</span>'+ICO_DOWN+'</button>';
}
function platformBtnHTML(key){
  var v=state[key];
  return '<button type="button" class="sc-range-btn sc-plat-btn" onclick="event.stopPropagation();scPlatformOpen(this,\''+key+'\')">'
    +'<span>'+esc(v==='All'?'All Platforms':v)+'</span>'+ICO_DOWN+'</button>';
}
var rangePick=null;   // the open popover: {scope, start, end, view:Date(first of left month), custom:bool}
function popEl(){
  var m=document.getElementById('sc-range-pop');
  if(!m){m=document.createElement('div');m.id='sc-range-pop';m.className='sc-range-pop';
    m.addEventListener('click',function(e){e.stopPropagation();});document.body.appendChild(m);}
  return m;
}
function scRangeClose(){var m=document.getElementById('sc-range-pop');if(m){m.classList.remove('open');m.innerHTML='';}rangePick=null;}
document.addEventListener('click',function(){if(rangePick)scRangeClose();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&rangePick)scRangeClose();});
window.addEventListener('resize',function(){if(rangePick)scRangeClose();});
function placePop(m,btn){
  m.style.maxHeight=(window.innerHeight-16)+'px';
  var r=btn.getBoundingClientRect(),vw=window.innerWidth,vh=window.innerHeight,w=m.offsetWidth,h=m.offsetHeight;
  var left=Math.max(8,Math.min(r.right-w,vw-w-8)),top=r.bottom+8;
  if(top+h>vh-8)top=r.top-h-8>=8?r.top-h-8:Math.max(8,vh-h-8);
  m.style.left=Math.round(left)+'px';m.style.top=Math.round(top)+'px';
}
function scRangeOpen(btn,scope){
  if(rangePick&&rangePick.scope===scope){scRangeClose();return;}
  var r=state[rangeKey(scope)],g=rangeOf(scope);
  rangePick={scope:scope,btn:btn,custom:r.key==='custom',start:r.key==='custom'?g.from:null,end:r.key==='custom'?g.to:null,
    view:new Date(DASH_TODAY.getFullYear(),DASH_TODAY.getMonth()-1,1)};
  drawRangePop();
}
function drawRangePop(){
  var P=rangePick,m=popEl(),cur=state[rangeKey(P.scope)].key;
  var list='<div class="sc-range-list">'+rangePresets(P.scope).map(function(x){
    var on=P.custom?x[0]==='custom':cur===x[0];
    return '<button type="button" class="sc-range-opt'+(on?' is-on':'')+'" onclick="scRangePick(\''+x[0]+'\')">'+esc(x[1])+'</button>';
  }).join('')+'</div>';
  var cal='';
  if(P.custom){
    var v=P.view,two=window.innerWidth>=880,v2=new Date(v.getFullYear(),v.getMonth()+1,1);
    var a=P.start,b=P.end||P.start,days=a?Math.round((b-a)/864e5)+1:0;
    var said=!a?'<span class="sc-cal-hint">Pick a start date</span>'
      :'<span class="sc-cal-range">'+fmtDate(a)+(+a===+b?'':' – '+fmtDate(b))+'</span>'
        +'<span class="sc-cal-days">'+(P.end?days+(days===1?' day':' days'):'Pick an end date')+'</span>';
    cal='<div class="sc-cal-wrap"><div class="sc-cal-months">'+(two?monthHTML(v,'prev')+monthHTML(v2,'next'):monthHTML(v,'both'))+'</div>'
      +'<div class="sc-cal-foot"><div class="sc-cal-said">'+said+'</div>'
        +'<button class="btn-outline btn-sm" type="button" onclick="scRangeClose()">Cancel</button>'
        +'<button class="btn-primary btn-sm" type="button" onclick="scRangeApply()"'+(P.start?'':' disabled')+'>Apply</button></div></div>';
  }
  m.innerHTML='<div class="sc-range-body'+(P.custom?' has-cal':'')+'">'+list+cal+'</div>';
  m.classList.add('open');placePop(m,P.btn);
}
function monthHTML(first,side){
  var y=first.getFullYear(),mo=first.getMonth(),start=addD(first,-first.getDay()),P=rangePick;
  var nav=side!=='next'?'<button type="button" class="sc-cal-nav" aria-label="Previous month" onclick="scCalNav(-1)">'+ICO.chevL+'</button>':'<span></span>';
  var nav2=side!=='prev'?'<button type="button" class="sc-cal-nav" aria-label="Next month" onclick="scCalNav(1)">'+ICO.chevR+'</button>':'<span></span>';
  var head='<div class="sc-cal-head">'+nav+'<span class="sc-cal-title">'+MONTHS[mo]+' '+y+'</span>'+nav2+'</div>';
  var dows='<div class="sc-cal-grid">'+['Su','Mo','Tu','We','Th','Fr','Sa'].map(function(d){return '<span class="sc-cal-dow">'+d+'</span>';}).join('');
  var a=P.start,b=P.end||(a&&P.hover&&P.hover>a?P.hover:a),cells='',preview=!P.end&&b&&+b!==+a;
  for(var i=0;i<42;i++){
    var d=addD(start,i),out=d.getMonth()!==mo,future=d>DASH_TODAY,cls='sc-cal-day';
    if(out)cls+=' is-out';
    if(future)cls+=' is-future';
    if(!out&&a&&d>=a&&d<=b)cls+=' is-in'+(preview?' is-preview':'');
    if(+d===+DASH_TODAY)cls+=' is-today';
    if(!out&&a&&+d===+a)cls+=' is-start';
    if(!out&&b&&+d===+b)cls+=' is-end';
    var ymd=d.getFullYear()+','+d.getMonth()+','+d.getDate();
    var click=!out&&!future?' onclick="scCalDay('+ymd+')" onmouseenter="scCalHover('+ymd+')"':' disabled';
    cells+='<button type="button" class="'+cls+'"'+click+'>'+d.getDate()+'</button>';
  }
  return '<div class="sc-cal">'+head+dows+cells+'</div></div>';
}
function scCalNav(n){var v=rangePick.view;rangePick.view=new Date(v.getFullYear(),v.getMonth()+n,1);drawRangePop();}
function scCalHover(y,m,d){
  var P=rangePick;if(!P||!P.start||P.end)return;
  var t=new Date(y,m,d);if(P.hover&&+P.hover===+t)return;
  P.hover=t;drawRangePop();
}
function scCalDay(y,m,d){
  var P=rangePick,t=new Date(y,m,d);
  P.hover=null;
  if(!P.start||P.end){P.start=t;P.end=null;}
  else if(t<P.start){P.start=t;}
  else P.end=t;
  drawRangePop();
}
function scRangePick(key){
  var P=rangePick;if(!P)return;
  if(key==='custom'){P.custom=true;drawRangePop();return;}
  state[rangeKey(P.scope)]={key:key};if(P.scope==='settlement')state.setPage=1;scRangeClose();scRender();
}
function scRangeApply(){
  var P=rangePick;if(!P||!P.start)return;
  state[rangeKey(P.scope)]={key:'custom',from:+P.start,to:+(P.end||P.start)};if(P.scope==='settlement')state.setPage=1;scRangeClose();scRender();
}
/* the platform filter: the same menu, a short list */
function scPlatformOpen(btn,key){
  if(rangePick&&rangePick.scope==='plat:'+key){scRangeClose();return;}
  rangePick={scope:'plat:'+key,btn:btn};
  var m=popEl();
  m.innerHTML='<div class="sc-range-body"><div class="sc-range-list">'+CHANNELS.map(function(c){
    return '<button type="button" class="sc-range-opt'+(state[key]===c?' is-on':'')+'" onclick="scPlatformPick(\''+key+'\',\''+c+'\')">'+esc(c==='All'?'All Platforms':c)+'</button>';
  }).join('')+'</div></div>';
  m.classList.add('open');placePop(m,btn);
}
function scPlatformPick(key,c){state[key]=c;scRangeClose();scRender();}
/* coins: a money tile drops a few rupee coins down its background on hover */
function statCard(label,value,ico,sub,tone,coins){
  return '<div class="hr-stat-card sc-stat-hover'+(coins?' has-coins':'')+'">'
    +(coins?'<span class="sc-coins" aria-hidden="true">'+new Array(8).join('<i>₹</i>')+'</span>':'')
    +'<div class="hr-stat-head"><div class="hr-stat-label">'+esc(label)+'</div>'
    +'<span class="hr-stat-ico">'+ico+'</span></div>'
    +'<div class="hr-stat-number'+(tone?' '+tone:'')+'">'+value+'</div>'
    +'<div class="hr-stat-sub">'+esc(sub)+'</div></div>';
}
function band(title,right){
  return '<div class="hr-band"><span class="hr-band-title">'+esc(title)+'</span><span class="hr-band-rule"></span>'+(right||'')+'</div>';
}
function dashSection(title,right,body){
  return '<div class="hr-section"><div class="hr-section-header"><span class="hr-section-title">'+esc(title)+'</span>'+(right||'')+'</div>'+body+'</div>';
}
function rupee(n){return '₹'+fmtAmt(n);}
function rupee0(n){return '₹'+Math.round(n).toLocaleString('en-IN');}
function dashEmpty(text){return '<div class="lp-logs-empty">'+esc(text)+'</div>';}

/* ── SALES DASHBOARD ─────────────────────────────────────────────────────
   Sample figures for the store: today / this week / this month, by channel. */
var SALES_DAYS=[18400,22150,19800,24600,27300,31200,29850,21400,23900,26150,28700,30400,33800,12450]; // 01-14 Oct
/* Sample daily sales, 01 Sep - 14 Oct 2026; every range sums the days in it. */
var DASH_TODAY=new Date(2026,9,14);
var SALES_DAILY=(function(){
  var m={},d=new Date(2026,7,1),i=0;
  for(;d<=DASH_TODAY;d.setDate(d.getDate()+1),i++){
    var oct=d.getMonth()===9&&d.getFullYear()===2026;
    m[dayKey(d)]=oct?SALES_DAYS[d.getDate()-1]:15000+((i*7919)%17000);
  }
  return m;
})();
function dayKey(d){return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
var CH_SHARE={All:1,Paytm:0.375,Mystore:0.45,Bhaiyaa:0.175};
function salesFor(range){
  var sales=0,d=new Date(range.from);
  for(;d<=range.to;d.setDate(d.getDate()+1))sales+=SALES_DAILY[dayKey(d)]||0;
  var orders=Math.round(sales/330);
  var split=function(ch){var t=Math.round(orders*CH_SHARE[ch]),c=Math.round(t*0.915),ip=Math.round(t*0.055);return [t,c,ip,Math.max(0,t-c-ip)];};
  var pur=function(ch){var t=Math.round(orders*CH_SHARE[ch]/12);return [t,Math.round(t*0.07),Math.round(t*0.045)];};
  return {sales:sales,orders:split('All'),split:split,pur:pur};
}
var SALES_WEEKS=[['Week 1','01 – 07 Oct',172300],['Week 2','08 – 14 Oct',177800]];
var TOP_CATEGORIES=[['Groceries & Staples',412],['Personal Care',236],['Beverages',198],['Household',154],['Snacks',121]];
var TOP_PRODUCTS=[['Toor Dal 1 kg',148],['Sunflower Oil 1 L',131],['Basmati Rice 5 kg',112],['Detergent Powder 1 kg',96],['Assam Tea 500 g',84]];
var LOW_STOCK=[['Surf Excel 1 kg',3,20],['Amul Butter 500 g',4,24],['Maggi Noodles 12-pack',6,30],['Colgate Paste 200 g',8,25],['Parle-G 800 g',9,30]];
var CHANNELS=['All','Paytm','Mystore','Bhaiyaa'];
function salesDashHTML(){
  var rg=rangeOf('sales'),P=salesFor(rg),o=P.orders,label=rangeLabel('sales');
  var period=rangeBtnHTML('sales');
  var stats='<div class="hr-stat-grid">'
    +statCard('Sales',rupee0(P.sales),ICO.money,'Revenue · '+label,'',true)
    +statCard('Total Orders',o[0],ICO.cart,'All platforms · '+label)
    +statCard('Completed Orders',o[1],ICO.check,'Delivered and paid','green')
    +statCard('Pending Orders',o[3],ICO.clock,'Awaiting acceptance','orange')
  +'</div>';
  var total=SALES_WEEKS.reduce(function(t,w){return t+w[2];},0);
  var weekTable=recTable(['Week','Dates','Total Sales','%'],SALES_WEEKS.map(function(w){
    return '<tr><td><b>'+esc(w[0])+'</b></td><td>'+esc(w[1])+'</td><td>'+rupee0(w[2])+'</td><td>'+(w[2]/total*100).toFixed(1)+'%</td></tr>';
  }).join(''));
  var rankTable=function(head,rows,unit){
    return rows.length?recTable(['#',head,unit],rows.map(function(r,i){
      return '<tr><td>'+(i+1)+'</td><td><b>'+esc(r[0])+'</b></td><td>'+r[1]+'</td></tr>';}).join('')):dashEmpty('No data available');
  };
  var stock=LOW_STOCK.length?recTable(['Product','Quantity','Status'],LOW_STOCK.map(function(r){
    var crit=r[1]<=r[2]*0.2;
    return '<tr><td><b>'+esc(r[0])+'</b><span class="sc-rec-sub">Reorder at '+r[2]+'</span></td><td>'+r[1]+'</td>'
      +'<td>'+badge(crit?'unapproved':'pending',crit?'Critical':'Low')+'</td></tr>';}).join('')):dashEmpty('No data available');
  return '<div class="hr-header"><div class="hr-header-title">Sales Dashboard</div>'
      +'<div class="hr-header-desc">Revenue, orders and stock across Paytm, Mystore and Bhaiyaa.</div></div>'
    +band('Overview',period)+stats
    +band('Sales Trend')
    +'<div class="hr-grid-2">'
      +dashSection('Sales Over The Month','<span class="hr-band-meta">October 2026</span>',salesChartHTML())
      +dashSection('Sales Over The Week','',weekTable)
    +'</div>'
    +band('Order Analytics')
    +'<div class="hr-grid-2">'
      +dashSection('Sales Analytics',platformBtnHTML('salesCh'),
        (function(x){return analyticsRows([['Total Sales Orders',x[0]],['Completed Orders',x[1]],['In Progress Orders',x[2]],['Pending Orders',x[3]]]);})(P.split(state.salesCh)))
      +dashSection('Purchase Analytics',platformBtnHTML('purCh'),
        (function(x){return analyticsRows([['Total Purchase Orders',x[0]],['Cancelled Orders',x[1]],['Returned Orders',x[2]]]);})(P.pur(state.purCh)))
    +'</div>'
    +band('Products & Inventory')
    +'<div class="sc-dash-grid-3">'
      +dashSection('Top Selling Category','',rankTable('Category',TOP_CATEGORIES,'Orders'))
      +dashSection('Top Selling Products','',rankTable('Product',TOP_PRODUCTS,'Orders'))
      +dashSection('Low Stock Inventory','',stock)
    +'</div>';
}
/* label · count, with a share bar against the first (the total) */
function analyticsRows(rows){
  var max=Math.max(1,rows[0][1]);
  return '<div class="sc-an-list">'+rows.map(function(r,i){
    return '<div class="sc-an-row"><div class="sc-an-top"><span class="sc-an-label">'+esc(r[0])+'</span><b class="sc-an-val">'+r[1]+'</b></div>'
      +'<div class="sc-an-track"><span class="sc-an-fill'+(i?'':' is-total')+'" style="width:'+(r[1]/max*100).toFixed(1)+'%"></span></div></div>';
  }).join('')+'</div>';
}
/* Daily sales, one series: thin bars rounded at the top, a recessive grid,
   no legend (the title names it), a tooltip on each day. */
function salesChartHTML(){
  var W=600,H=230,L=48,R=8,T=12,B=26,max=40000,steps=4,n=SALES_DAYS.length;
  var cw=(W-L-R)/n,bw=Math.min(22,cw*0.56),y=function(v){return T+(H-T-B)*(1-v/max);};
  var g='';
  for(var i=0;i<=steps;i++){var v=max/steps*i,yy=y(v);
    g+='<line x1="'+L+'" x2="'+(W-R)+'" y1="'+yy+'" y2="'+yy+'" class="sc-ch-grid'+(i?'':' is-base')+'"/>'
      +'<text x="'+(L-8)+'" y="'+(yy+4)+'" class="sc-ch-axis" text-anchor="end">'+(v?'₹'+v/1000+'k':'0')+'</text>';}
  var bars=SALES_DAYS.map(function(v,i){
    var x=L+cw*i+(cw-bw)/2,top=y(v),h=Math.max(0,y(0)-top),r=Math.min(4,bw/2,h);
    var d='M'+x+','+y(0)+'V'+(top+r)+'Q'+x+','+top+' '+(x+r)+','+top+'H'+(x+bw-r)+'Q'+(x+bw)+','+top+' '+(x+bw)+','+(top+r)+'V'+y(0)+'Z';
    var day=('0'+(i+1)).slice(-2)+' Oct';
    return '<g class="sc-ch-col" onmouseenter="scChartTip(this,\''+day+'\',\''+rupee0(v)+'\')" onmouseleave="scChartTip(null)">'
      +'<rect x="'+(L+cw*i)+'" y="'+T+'" width="'+cw+'" height="'+(H-T-B)+'" class="sc-ch-hit"/>'
      +'<path d="'+d+'" class="sc-ch-bar'+(i===n-1?' is-today':'')+'"/>'
      +((i%2===0||i===n-1)?'<text x="'+(L+cw*i+cw/2)+'" y="'+(H-8)+'" class="sc-ch-axis" text-anchor="middle">'+(i+1)+'</text>':'')
      +'</g>';
  }).join('');
  return '<div class="sc-chart"><svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Daily sales, 1 to 14 October 2026">'+g+bars+'</svg>'
    +'<div class="sc-ch-tip" id="sc-ch-tip"></div></div>';
}
function scChartTip(el,day,val){
  var tip=document.getElementById('sc-ch-tip');if(!tip)return;
  if(!el){tip.classList.remove('show');return;}
  tip.innerHTML='<span>'+esc(day)+'</span><b>'+esc(val)+'</b>';
  var box=el.closest('.sc-chart').getBoundingClientRect(),r=el.querySelector('.sc-ch-bar').getBoundingClientRect();
  tip.style.left=(r.left-box.left+r.width/2)+'px';tip.style.top=(r.top-box.top)+'px';
  tip.classList.add('show');
}

/* ── SETTLEMENT DASHBOARD ────────────────────────────────────────────────
   Payouts to the store's account, by payment date. */
var SETTLEMENTS=[
  {date:'14 Oct 2026',amount:0,utr:'',orders:31,acct:'XXXX 4821',item:11840,order:620,status:'Pending'},
  {date:'13 Oct 2026',amount:29760,utr:'UTIB26101345872',orders:44,acct:'XXXX 4821',item:28910,order:850,status:'Settled'},
  {date:'12 Oct 2026',amount:27340,utr:'UTIB26101245310',orders:41,acct:'XXXX 4821',item:26600,order:740,status:'Settled'},
  {date:'11 Oct 2026',amount:25480,utr:'',orders:39,acct:'XXXX 4821',item:24900,order:580,status:'Failed'},
  {date:'10 Oct 2026',amount:22910,utr:'UTIB26101044127',orders:36,acct:'XXXX 4821',item:22300,order:610,status:'Settled'},
  {date:'09 Oct 2026',amount:20870,utr:'UTIB26100943906',orders:33,acct:'XXXX 4821',item:20350,order:520,status:'Settled'},
  {date:'08 Oct 2026',amount:19110,utr:'UTIB26100843355',orders:30,acct:'XXXX 4821',item:18640,order:470,status:'Settled'},
  {date:'05 Oct 2026',amount:24320,utr:'UTIB26100542890',orders:38,acct:'XXXX 4821',item:23700,order:620,status:'Settled'},
  {date:'01 Oct 2026',amount:16980,utr:'UTIB26100141105',orders:27,acct:'XXXX 4821',item:16550,order:430,status:'Settled'},
  {date:'28 Sep 2026',amount:21440,utr:'UTIB26092840918',orders:34,acct:'XXXX 4821',item:20890,order:550,status:'Settled'},
  {date:'22 Sep 2026',amount:18760,utr:'UTIB26092240377',orders:29,acct:'XXXX 4821',item:18310,order:450,status:'Settled'},
  {date:'15 Sep 2026',amount:23050,utr:'UTIB26091539862',orders:37,acct:'XXXX 4821',item:22480,order:570,status:'Settled'},
  {date:'08 Sep 2026',amount:17620,utr:'UTIB26090839145',orders:28,acct:'XXXX 4821',item:17190,order:430,status:'Settled'}
];
function setRows(){
  var rg=rangeOf('settlement');
  return SETTLEMENTS.filter(function(r){var d=new Date(r.date);return d>=rg.from&&d<=rg.to;});
}
function settlementDashHTML(){
  var rows=setRows();
  var due=SETTLEMENTS.filter(function(r){return r.status!=='Settled';}).reduce(function(t,r){return t+r.item+r.order;},0);
  var paid=rows.filter(function(r){return r.status==='Settled';}).reduce(function(t,r){return t+r.amount;},0);
  var label=rangeLabel('settlement');
  var tools='<div class="sc-dash-tools">'+rangeBtnHTML('settlement')
    +'<button class="btn-outline btn-sm" type="button" onclick="scDownloadSettlements()">'+ICO_DOWNLOAD+' Download Payment Details</button>'
    +'<button class="btn-primary btn-sm" type="button" onclick="document.getElementById(\'sc-set-import\').click()">'+ICO_IMPORT+' Import</button>'
    +'<input type="file" id="sc-set-import" accept=".csv,.xlsx" style="display:none" onchange="scImportSettlements(this)"></div>';
  var stats='<div class="hr-stat-grid sc-stat-3">'
    +statCard('Total Amount to be Settled',rupee(due),ICO.money,'Amount to be credited to your account','orange',true)
    +statCard('Amount Settled',rupee(paid),ICO.check,'Credited · '+label,'green',true)
    +statCard('Settlements',rows.length,ICO.clipboard,'Payouts · '+label)
  +'</div>';
  var tone={Settled:'approved',Pending:'pending',Failed:'unapproved'};
  /* the listing's own paging: ten rows a page */
  var pages=Math.max(1,Math.ceil(rows.length/PAGE_SIZE));if(state.setPage>pages)state.setPage=pages;
  var off=(state.setPage-1)*PAGE_SIZE;
  var body=rows.length?pageSlice(rows,state.setPage).map(function(r,i){
    return '<tr><td>'+(off+i+1)+'</td><td><div class="lp-c-main">'+esc(r.date)+'</div></td>'
      +'<td><div class="lp-c-plain">'+(r.status==='Settled'?rupee(r.amount):'<span class="lp-dash">—</span>')+'</div></td>'
      +'<td><div class="lp-c-plain">'+(r.utr?esc(r.utr):'<span class="lp-dash">—</span>')+'</div></td>'
      +'<td><div class="lp-c-plain">'+r.orders+'</div></td>'
      +'<td><div class="lp-c-plain">'+esc(r.acct)+'</div></td>'
      +'<td><div class="lp-c-plain">'+rupee(r.item)+'</div></td>'
      +'<td><div class="lp-c-plain">'+rupee(r.order)+'</div></td>'
      +'<td>'+badge(tone[r.status],r.status)+'</td></tr>';
  }).join(''):emptyRow(9,'No settlements in this period','Choose another period to see its payouts.');
  return '<div class="hr-header"><div class="hr-header-title">Settlement Dashboard</div>'
      +'<div class="hr-header-desc">Payouts to your account, with the UTR for every settlement.</div></div>'
    +band('Overview',tools)+stats
    +band('Settlement History','<span class="hr-band-meta">'+rows.length+(rows.length===1?' payout':' payouts')+'</span>')
    +'<div class="lp-table-card"><table class="lp-table sc-set-table"><thead><tr>'
      +'<th>S.No</th><th>Payment Date</th><th>Amount Settled</th><th>UTR Number</th><th>Orders</th><th>Account Number</th>'
      +'<th>Item Level Settlement</th><th>Order Level Settlement</th><th>Status</th>'
    +'</tr></thead><tbody>'+body+'</tbody></table>'
    +(rows.length?paginationHTML(rows.length,state.setPage,'settlements','scSetPage'):'')+'</div>';
}
function scSetPage(n){state.setPage=n;scRender();}
var ICO_DOWNLOAD='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/></svg>';
var ICO_IMPORT='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7 8l5-5 5 5"/><path d="M4 17v3h16v-3"/></svg>';
/* Download hands back the rows on screen as a CSV. */
function scDownloadSettlements(){
  var rows=setRows();
  if(!rows.length){scToast('Nothing to download','info','There are no settlements in this period.');return;}
  var q=function(v){return '"'+String(v).replace(/"/g,'""')+'"';};
  var csv=[['S.No','Payment Date','Amount Settled','UTR Number','Orders','Account Number','Item Level Settlement','Order Level Settlement','Status']]
    .concat(rows.map(function(r,i){return [i+1,r.date,r.status==='Settled'?r.amount:'',r.utr,r.orders,r.acct,r.item,r.order,r.status];}))
    .map(function(l){return l.map(q).join(',');}).join('\r\n');
  var a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='payment-details-'+state.setRange.key+'.csv';
  document.body.appendChild(a);a.click();a.remove();
  scToast('Payment details downloaded','success',rows.length+(rows.length===1?' settlement':' settlements')+' in the file.');
}
function scImportSettlements(input){
  var f=input.files&&input.files[0];if(!f)return;
  scToast('File received','success',f.name+' is queued for import. Settlements update once it is processed.');
  input.value='';
}

function scDashboardHTML(){
  var work=[
    {label:'Pending With Me',value:12,ico:ICO.inbox,sub:'Items awaiting your action'},
    {label:'Waiting for Approval',value:5,ico:ICO.clock,sub:'Sent for approval'},
    {label:'Returned to Me',value:3,ico:ICO.undo,sub:'Needs your attention',tone:'red'},
    {label:'Completed Today',value:8,ico:ICO.check,sub:'Items completed by you',tone:'green'}
  ];
  var cards=work.map(function(w){
    return '<div class="hr-stat-card is-link" role="button" tabindex="0" onclick="scGo(\'deals\')">'
      +'<div class="hr-stat-head"><div class="hr-stat-label">'+esc(w.label)+'</div>'
      +'<span class="hr-stat-ico">'+w.ico+'</span></div>'
      +'<div class="hr-stat-number'+(w.tone?' '+w.tone:'')+'">'+w.value+'</div>'
      +'<div class="hr-stat-sub">'+esc(w.sub)+'</div></div>';
  }).join('');

  var stages=SC_STAGES.map(function(s){
    var open=stageAccess(state.role,s.key);
    s.count=stageCount(s.key);
    return '<button type="button" class="sc-stage-card'+(open?'':' is-blocked')+'"'
      +(open?' onclick="scOpenStage(\''+s.key+'\',\''+s.title+'\','+s.count+')"':' disabled aria-disabled="true"')+'>'
      +'<span class="sc-stage-ico">'+s.icon+'</span>'
      +'<span class="sc-stage-body">'
      +'<span class="sc-stage-title">'+esc(s.title)+'</span>'
      +'<span class="sc-stage-count">'+s.count+'<em>Deals</em></span>'
      +'<span class="sc-stage-help">'+(open?'Click to view deals':'No action for your role')+'</span>'
      +'</span>'
      +(open?'<span class="sc-stage-arrow">'+ICO.chevR+'</span>':'')
      +'</button>';
  }).join('');

  return ''
    +'<div class="hr-header">'
      +'<div class="hr-header-title">Sub-Contracting Dashboard</div>'
      +'<div class="hr-header-desc">Track your work and deal progress across the Sub-Contracting lifecycle. Viewing as <b>'+esc(state.role)+'</b>.</div>'
    +'</div>'
    +'<div class="hr-band"><span class="hr-band-title">My Work</span><span class="hr-band-rule"></span></div>'
    +'<div class="hr-stat-grid">'+cards+'</div>'
    +'<div class="hr-band"><span class="hr-band-title">Current Deal Stage</span><span class="hr-band-rule"></span></div>'
    +'<div class="sc-stage-grid">'+stages+'</div>';
}
function scOpenStage(key,title,count){
  state.stageFilter=key;state.stageLabel=title;state.dealPage=1;state.orderPage=1;
  state.page=(key==='po')?'orders':'deals';
  state.dealOpen=false;state.orderOpen=false;
  scRender();
  /* A stage holding exactly one deal opens it straight away. */
  if(count===1){
    if(key==='po'){var o=filteredOrders()[0];if(o)scOpenOrder(o.no);}
    else{var r=filteredDeals()[0];if(r)scOpenDeal(r.id);}
  }
}
function scClearStageFilter(){
  state.stageFilter=null;state.stageLabel='';state.dealPage=1;state.orderPage=1;
  scRender();
}

/* ── LISTING FILTERS ──────────────────────────────────────────────────────
   Search reads the text box and the selects; the stage card filter applies on
   top. Enter in the search box searches too. Reset clears all of it. */
function matchQ(q,fields){
  q=q.trim().toLowerCase();if(!q)return true;
  return fields.join(' ').toLowerCase().indexOf(q)>=0;
}
function filteredDeals(){
  var f=state.dealFilter;
  return dealRows().filter(function(r){
    /* A ROLE SEES ITS OWN QUEUE: only the deals it has an action on now.
       Super Admin oversees every deal. */
    if(state.role!=='Super Admin'&&!rowAvailable(r.id).length)return false;
    if(state.stageFilter&&r.stage!==state.stageFilter)return false;
    if(f.process&&r.process!==f.process)return false;
    if(f.scr&&r.scr!==f.scr)return false;
    if(f.ship&&r.ship!==f.ship)return false;
    return matchQ(f.q,[r.id,r.title,r.vendor,r.vendorSub,r.planner,r.base]);
  });
}
function filteredOrders(){
  var f=state.orderFilter;
  return orderRows().filter(function(r){
    /* The PO Approver's listing is its queue: only POs waiting on approval. */
    if(state.role==='PO Approver'&&!rowAvailable(r.scrId).length)return false;
    if(state.stageFilter&&r.stage!==state.stageFilter)return false;
    if(f.status&&r.status!==f.status)return false;
    if(f.buyer&&r.buyer!==f.buyer)return false;
    return matchQ(f.q,[r.no,r.scrId,r.title,r.vendor,r.buyer]);
  });
}
function scSearchDeals(){
  var q=document.getElementById('sc-deal-q');
  state.dealFilter={q:q?q.value:'',process:csValue('sc-f-process'),scr:csValue('sc-f-scr'),ship:csValue('sc-f-ship')};
  state.dealOpen=false;state.dealPage=1;
  scRender();
}
function scSearchOrders(){
  var q=document.getElementById('sc-order-q');
  state.orderFilter={q:q?q.value:'',status:csValue('sc-f-pos'),buyer:csValue('sc-f-buyer')};
  state.orderOpen=false;state.orderPage=1;
  scRender();
}
function scResetFilters(){
  state.dealPage=1;state.orderPage=1;
  state.dealFilter={q:'',process:'',scr:'',ship:''};
  state.orderFilter={q:'',status:'',buyer:''};
  state.stageFilter=null;state.stageLabel='';
  state.dealOpen=false;state.orderOpen=false;
  scRender();
}
/* ── PAGINATION ───────────────────────────────────────────────────────────
   Ten rows a page, as every ADT listing. It is also what keeps the detail
   panel at ADT's height: the panel spans the table, so a page of ten rows is
   the panel ADT users already know rather than one as tall as every record. */
var PAGE_SIZE=10;
function pageSlice(rows,page){return rows.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);}
function paginationHTML(total,page,noun,fn){
  var pages=Math.max(1,Math.ceil(total/PAGE_SIZE)),from=total?(page-1)*PAGE_SIZE+1:0,to=Math.min(total,page*PAGE_SIZE);
  var btns='<button class="lp-pg-btn" '+(page<=1?'disabled':'onclick="'+fn+'('+(page-1)+')"')+' title="Previous">'+ICO.chevL+'</button>';
  for(var i=1;i<=pages;i++)btns+='<button class="lp-pg-btn'+(i===page?' active':'')+'" onclick="'+fn+'('+i+')">'+i+'</button>';
  btns+='<button class="lp-pg-btn" '+(page>=pages?'disabled':'onclick="'+fn+'('+(page+1)+')"')+' title="Next">'+ICO.chevR+'</button>';
  return '<div class="lp-pagination"><div class="lp-pagination-info">Showing '+from+'–'+to+' of '+total+' '+noun+'</div>'
    +'<div class="lp-pagination-controls">'+btns+'</div></div>';
}
function scDealPage(n){state.dealPage=n;state.dealOpen=false;scRender();}
function scOrderPage(n){state.orderPage=n;state.orderOpen=false;scRender();}
/* Reset appears only when there is something to reset: a filter applied to
   the listing, a stage card's filter, or a value typed or picked and not yet
   searched. */
function filtersActive(){
  var d=state.dealFilter,o=state.orderFilter;
  return !!(state.stageFilter||d.q||d.process||d.scr||d.ship||o.q||o.status||o.buyer);
}
function scSyncReset(){
  var btn=document.getElementById('sc-reset');if(!btn)return;
  var typed=document.querySelector('.sc-filters .lp-search-input');
  var picked=document.querySelectorAll('.sc-filters .cs-trigger:not(.cs-placeholder)').length;
  btn.hidden=!(filtersActive()||(typed&&typed.value.trim())||picked);
}
function scSearchKey(e,fn){if(e.key==='Enter')window[fn]();}
function emptyRow(cols,title,sub){
  return '<tr><td colspan="'+cols+'" style="padding:0"><div class="sc-empty"><div class="sc-empty-ico">'+ICO.search+'</div>'
    +'<div class="sc-empty-title">'+esc(title)+'</div><div class="sc-empty-sub">'+esc(sub)+'</div></div></td></tr>';
}

/* ══ LISTING: DEALS ═══════════════════════════════════════════════════════  */
function stageBannerHTML(){
  if(!state.stageFilter)return '';
  return '<div class="sc-banner">'+ICO.info
    +'<span>Filtered by Current Deal Stage: <b>'+esc(state.stageLabel)+'</b></span>'
    +'<button class="btn-outline btn-sm sc-banner-clear" onclick="scClearStageFilter()">Clear</button></div>';
}

function dealsPageHTML(){
  var all=filteredDeals(),f=state.dealFilter;
  var pages=Math.max(1,Math.ceil(all.length/PAGE_SIZE));
  if(state.dealPage>pages)state.dealPage=pages;
  var offset=(state.dealPage-1)*PAGE_SIZE;
  var rows=pageSlice(all,state.dealPage).map(function(r,n){
    var selected=state.dealOpen&&state.dealSel===r.id?' lp-row-selected':'';
    return '<tr class="lp-row'+selected+'" data-id="'+r.id+'" style="cursor:pointer" onclick="scOpenDeal(\''+r.id+'\')">'
      +'<td>'+(offset+n+1)+'</td>'
      +'<td><div class="lp-c-main">'+esc(r.id)+'</div><div class="lp-c-sub">'+esc(r.base)+'</div></td>'
      /* the SCR title, with who has the deal under it */
      +'<td><div class="lp-c-plain sc-c-title" title="'+esc(r.title)+'">'+esc(r.title)+'</div>'
        +'<div class="lp-c-sub">'+(r.pending&&r.pending!=='—'?'Pending with '+esc(r.pending):'No action pending')+'</div></td>'
      +'<td><div class="lp-c-plain sc-c-vendor" title="'+esc(r.vendor)+'">'+esc(r.vendor)+'</div><div class="lp-c-sub">'+esc(r.vendorSub)+'</div></td>'
      +'<td>'+badge(scrToneOf(r.scr),r.scr)+'</td>'
      +'<td>'+badge(shipToneOf(r.ship),r.ship)+'</td>'
      +'<td><div class="ct-action-wrap">'
        +'<button class="ct-action-btn" title="'+esc(r.cur)+'" onclick="event.stopPropagation();scRowMenu(this,\''+r.id+'\')">'
          +'<span>'+esc(r.cur)+'</span>'+ICO_DOWN+'</button>'
        +'<button class="lp-action-btn" title="View details" onclick="event.stopPropagation();scOpenDeal(\''+r.id+'\')">'+ICO.hamburger+'</button>'
      +'</div></td>'
      +'</tr>';
  }).join('')||emptyRow(7,filtersActive()?'No deals match':'Nothing pending with '+state.role,
    filtersActive()?'Change the search or filters, or Reset to see every deal.':'Deals appear here when they reach a step '+state.role+' acts on.');

  var sum=function(k){return all.reduce(function(t,r){return t+r[k];},0);};
  var stats='<div class="listing-stats">'
    +'<div class="listing-stat active"><div class="listing-stat-count">'+all.filter(function(r){return r.stage!=='closed';}).length+'</div><div class="listing-stat-label">Open</div></div>'
    +'<div class="listing-stat pending"><div class="listing-stat-count">'+all.filter(function(r){return r.scr==='Sent for Approval';}).length+'</div><div class="listing-stat-label">Awaiting Approval</div></div>'
    +'<div class="listing-stat"><div class="listing-stat-count">'+sum('asns')+'</div><div class="listing-stat-label">ASNs</div></div>'
    +'<div class="listing-stat"><div class="listing-stat-count">'+sum('imrs')+'</div><div class="listing-stat-label">IMRs</div></div>'
    +'</div>';
  return '<div class="listing-page">'
    +stageBannerHTML()
    +'<div class="listing-top">'
      +'<div class="lp-filter-bar" style="flex:1;min-width:0">'
        +'<div class="lp-filter-bar-label">Select Filter</div>'
        +'<div class="lp-filter-bar-row sc-filters">'
          +'<input class="lp-search-input" id="sc-deal-q" type="text" value="'+esc(f.q)+'" placeholder="Search Deal ID, title, vendor" title="Search Deal ID, title, vendor" oninput="scSyncReset()" onkeydown="scSearchKey(event,\'scSearchDeals\')">'
          +csField('sc-f-process',['Job Work','Processing','Repair'],f.process,'Sub-Contracting Process','scSyncReset')
          +csField('sc-f-scr',['Sent for Approval','SCR Returned','Approved','Closed'],f.scr,'SCR Status','scSyncReset')
          +csField('sc-f-ship',['Not Started','Created','Freezed Outbound Release','Challan Generated','Closed'],f.ship,'Shipment Status','scSyncReset')
          +'<button class="lp-pill-clear" id="sc-reset" onclick="scResetFilters()"'+(filtersActive()?'':' hidden')+'>'+ICO.close+' Reset</button>'
          +'<button class="lp-pill-search" onclick="scSearchDeals()">Search</button>'
        +'</div>'
      +'</div>'
      +stats
    +'</div>'
    +'<div class="lp-split-wrap sc-split">'
      +'<div class="lp-split-main">'
        +'<div class="lp-table-card" style="border:none;border-radius:0;box-shadow:none">'
          +'<table class="lp-table"><thead><tr>'
          +'<th>S.No</th><th>Deal ID</th><th>SCR Title</th><th>Vendor</th>'
          +'<th>SCR Status</th><th>Shipment Status</th><th>Action</th>'
          +'</tr></thead><tbody>'+rows+'</tbody></table>'
          +paginationHTML(all.length,state.dealPage,'deals','scDealPage')
        +'</div>'
      +'</div>'
      +'<div class="lp-split-sb" id="sc-deal-sb"><div class="lp-isb" id="sc-deal-isb"></div></div>'
    +'</div>'
  +'</div>';
}

/* ══ LISTING: PURCHASE ORDERS ═════════════════════════════════════════════  */
function ordersPageHTML(){
  var all=filteredOrders(),f=state.orderFilter;
  var opages=Math.max(1,Math.ceil(all.length/PAGE_SIZE));
  if(state.orderPage>opages)state.orderPage=opages;
  var ooffset=(state.orderPage-1)*PAGE_SIZE;
  var body=pageSlice(all,state.orderPage).map(function(r,n){
    var selected=state.orderOpen&&state.orderSel===r.no?' lp-row-selected':'';
    return '<tr class="lp-row'+selected+'" data-id="'+r.no+'" style="cursor:pointer" onclick="scOpenOrder(\''+r.no+'\')">'
      +'<td>'+(ooffset+n+1)+'</td>'
      +'<td><div class="lp-c-main">'+esc(r.no)+'</div></td>'
      +'<td><div class="lp-c-plain">'+esc(r.scrId)+'</div></td>'
      +'<td><div class="lp-c-plain">'+esc(r.vendor)+'</div></td>'
      +'<td class="sc-num"><div class="lp-c-main">'+fmtAmt(r.value)+'</div></td>'
      +'<td>'+badge(poToneOf(r.status),r.status)+'</td>'
      +'<td><div class="ct-action-wrap">'+(poApproveBtn(r)||createPOBtn(r))
        +'<button class="lp-action-btn" title="View details" onclick="event.stopPropagation();scOpenOrder(\''+r.no+'\')">'+ICO.hamburger+'</button>'
      +'</div></td>'
      +'</tr>';
  }).join('')||(state.role==='PO Approver'&&!filtersActive()
    ?emptyRow(7,'Nothing pending with PO Approver','POs appear here when the Buyer generates them.')
    :emptyRow(7,'No Purchase Orders match','Change the search or filters, or Reset to see every PO.'));
  var stats='<div class="listing-stats">'
    +'<div class="listing-stat"><div class="listing-stat-count">'+all.length+'</div><div class="listing-stat-label">Total</div></div>'
    +'<div class="listing-stat pending"><div class="listing-stat-count">'+all.filter(function(r){return r.status==='Draft'||r.status==='Created';}).length+'</div><div class="listing-stat-label">In Progress</div></div>'
    +'<div class="listing-stat approved"><div class="listing-stat-count">'+all.filter(function(r){return r.status==='Approved'||r.status==='Closed';}).length+'</div><div class="listing-stat-label">Approved</div></div>'
    +'</div>';

  return '<div class="listing-page">'
    +stageBannerHTML()
    +'<div class="listing-top">'
      +'<div class="lp-filter-bar" style="flex:1;min-width:0">'
        +'<div class="lp-filter-bar-label">Select Filter</div>'
        +'<div class="lp-filter-bar-row sc-filters">'
          +'<input class="lp-search-input" id="sc-order-q" type="text" value="'+esc(f.q)+'" placeholder="Search PO No., SCR No., vendor" title="Search PO No., SCR No., vendor" oninput="scSyncReset()" onkeydown="scSearchKey(event,\'scSearchOrders\')">'
          +csField('sc-f-pos',['Draft','Created','Approved','Closed'],f.status,'Status','scSyncReset')
          +csField('sc-f-buyer',['Madan Mohan','Gagan Tej'],f.buyer,'Buyer','scSyncReset')
          +'<button class="lp-pill-clear" id="sc-reset" onclick="scResetFilters()"'+(filtersActive()?'':' hidden')+'>'+ICO.close+' Reset</button>'
          +'<button class="lp-pill-search" onclick="scSearchOrders()">Search</button>'
        +'</div>'
      +'</div>'
      +stats
    +'</div>'
    +'<div class="lp-split-wrap sc-split">'
      +'<div class="lp-split-main">'
        +'<div class="lp-table-card" style="border:none;border-radius:0;box-shadow:none">'
          +'<table class="lp-table sc-orders-table'+(state.role==='Buyer'||state.role==='Super Admin'||state.role==='PO Approver'?' has-cta':'')+'"><thead><tr>'
          +'<th>S.No</th><th>PO No.</th><th>SCR No.</th><th>Vendor</th>'
          +'<th class="sc-num">PO Value</th><th>Status</th><th>Action</th>'
          +'</tr></thead><tbody>'+body+'</tbody></table>'
          +paginationHTML(all.length,state.orderPage,'purchase orders','scOrderPage')
        +'</div>'
      +'</div>'
      +'<div class="lp-split-sb" id="sc-order-sb"><div class="lp-isb" id="sc-order-isb"></div></div>'
    +'</div>'
  +'</div>';
}

/* ══ PANEL PLUMBING ═══════════════════════════════════════════════════════
   Open and close toggle the class on the EXISTING node and fill its inner —
   never a wholesale re-render — which is what lets the panel actually slide. */
function scOpenDeal(id){
  id=id||LIVE_ID;
  if(state.dealOpen&&state.dealSel===id){scCloseDeal();return;}
  if(state.edit&&state.edit.id!==id&&!editGuard())return;
  var switching=state.dealOpen;
  state.dealOpen=true;state.dealSel=id;
  if(!switching)state.dealTab='details';
  var sb=document.getElementById('sc-deal-sb');if(!sb)return;
  if(switching){refreshPanel('sc-deal-isb',dealPanelHTML(),true);}
  else{sb.classList.remove('sc-still');sb.classList.add('open');fillPanel('sc-deal-isb',dealPanelHTML());}
  markSelectedRow(id);
}
function scCloseDeal(){
  if(!editGuard())return;
  state.dealOpen=false;state.expanded=false;applyExpanded();
  var sb=document.getElementById('sc-deal-sb');if(sb)sb.classList.remove('open');
  markSelectedRow(null);
}
/* CREATE PO ON EVERY ORDERS ROW. The same quiet outline button sits on each
   line - grey at rest, solid on the hovered row - so a column of them reads
   as one stripe rather than a wall of dark buttons. It generates the PO, so it
   is live only on a Draft PO and only for the Buyer (or Super Admin); on any
   other row it is faded and its tooltip says why. */
function createPOState(r){
  if(r.status!=='Draft')return {ok:false,why:'PO already sent for approval'};
  if(state.role!=='Buyer'&&state.role!=='Super Admin')return {ok:false,why:'Only the Buyer can send a PO for approval'};
  return {ok:true,why:'Send PO '+r.no+' for approval'};
}
/* THE PO APPROVER'S DROPDOWN on an Orders row: the same dark status button
   and menu as the Deals listing, offering Approve PO and Return PO. Only on a
   PO that is waiting for approval; the menu and Update Status are the shared
   ones (scRowMenu / the PO's Logs), keyed by the PO's SCR. */
var PO_APPROVAL=['Approve PO','Return PO'];
function poApproveBtn(r){
  /* PO Approver and Super Admin: on a PO waiting for approval only. The menu
     is scoped to the approval pair, so Super Admin is not shown every action
     it holds on the deal. */
  if(state.role!=='PO Approver'&&state.role!=='Super Admin')return '';
  if(!rowAvailable(r.scrId).some(function(a){return PO_APPROVAL.indexOf(a)>=0;}))return '';
  var label='PO '+r.status;
  return '<button class="ct-action-btn" title="'+esc(label)+'" onclick="event.stopPropagation();scRowMenu(this,\''+r.scrId+'\',\'po\')">'
    +'<span>'+esc(label)+'</span>'+ICO_DOWN+'</button>';
}
function createPOBtn(r){
  /* Only the roles that generate POs see the button at all. */
  if(state.role!=='Buyer'&&state.role!=='Super Admin')return '';
  var st=createPOState(r);
  return '<button class="sc-row-cta" type="button" title="'+esc(st.why)+'"'
    +(st.ok?' onclick="event.stopPropagation();scCreatePO(\''+r.no+'\')"':' disabled onclick="event.stopPropagation()"')+'>'
    +ICO.plus+'<span>Send for Approval</span></button>';
}
function scCreatePO(no){
  var r=orderRows().filter(function(x){return x.no===no;})[0];
  if(!r||!createPOState(r).ok)return;
  var id=r.live?LIVE_ID:r.scrId;
  /* details saved: straight to the PO's Logs to send it; else fill them first */
  if(isFormStep(id,'Generate PO')){scOpenActionModal('Generate PO','','order',id);return;}
  scStartLog(id,'Generate PO');
}
function scOpenOrder(no){
  no=no||LIVE_PO;
  if(state.orderOpen&&state.orderSel===no){scCloseOrder();return;}
  var switching=state.orderOpen;
  state.orderOpen=true;state.orderSel=no;
  if(!switching)state.orderTab='details';
  var sb=document.getElementById('sc-order-sb');if(!sb)return;
  if(switching){refreshPanel('sc-order-isb',orderPanelHTML(),true);}
  else{sb.classList.remove('sc-still');sb.classList.add('open');fillPanel('sc-order-isb',orderPanelHTML());}
  markSelectedRow(no);
}
function scCloseOrder(){
  state.orderOpen=false;state.expanded=false;applyExpanded();
  var sb=document.getElementById('sc-order-sb');if(sb)sb.classList.remove('open');
  markSelectedRow(null);
}
function markSelectedRow(id){
  document.querySelectorAll('.lp-table tbody tr.lp-row').forEach(function(r){
    r.classList.toggle('lp-row-selected',r.dataset.id===id);
  });
}
function scDealTab(tab){
  state.dealTab=tab;
  refreshPanel('sc-deal-isb',dealPanelHTML(),true);
}
function scOrderTab(tab){
  state.orderTab=tab;
  refreshPanel('sc-order-isb',orderPanelHTML(),true);
}
/* SWITCHING TABS WITHOUT RELOADING THE PANEL. motion.css plays the panel's
   slide-in on any freshly created tab bar or body, so rebuilding them on a
   tab click replayed it every time - the whole panel looked like it was
   loading. Here the tab bar and body elements stay; only the tabs' state and
   the body's content change: the box marker slides to the new tab, the row
   scrolls it into view, and the content fades in. A panel that does not have
   the same tabs yet (first open) is filled the normal way. */
function refreshPanel(id,html,isTabSwitch){
  var el=document.getElementById(id);if(!el)return;
  var tmp=document.createElement('div');tmp.innerHTML=html;
  var oldBar=el.querySelector('.lp-isb-tabs'),newBar=tmp.querySelector('.lp-isb-tabs');
  var oldBody=el.querySelector('.lp-isb-body'),newBody=tmp.querySelector('.lp-isb-body');
  var oldTabs=oldBar?oldBar.querySelectorAll('.lp-isb-tab'):[],newTabs=newBar?newBar.querySelectorAll('.lp-isb-tab'):[];
  if(!oldBar||!newBar||!oldBody||!newBody||oldTabs.length!==newTabs.length){fillPanel(id,html);return;}
  var changed=false,active=null;
  for(var i=0;i<oldTabs.length;i++){
    if(oldTabs[i].className!==newTabs[i].className)changed=true;
    oldTabs[i].className=newTabs[i].className;oldTabs[i].innerHTML=newTabs[i].innerHTML;
    if(newTabs[i].classList.contains('active'))active=oldTabs[i];
  }
  oldBody.innerHTML=newBody.innerHTML;
  var oldHead=el.querySelector('.sc-exp-head'),newHead=tmp.querySelector('.sc-exp-head');
  if(oldHead&&newHead)oldHead.innerHTML=newHead.innerHTML;
  if(isTabSwitch&&changed){
    oldBody.scrollTop=0;
    oldBody.classList.remove('sc-swap');void oldBody.offsetWidth;oldBody.classList.add('sc-swap');
  }
  if(!active)return;
  var ind=oldBar.querySelector('.tab-ind');
  if(ind){
    ind.style.transform='translate('+active.offsetLeft+'px,'+active.offsetTop+'px)';
    ind.style.width=active.offsetWidth+'px';ind.style.height=active.offsetHeight+'px';
  }
  /* bring the active tab fully into view, smoothly */
  var pad=24,left=active.offsetLeft,right=left+active.offsetWidth;
  if(left-pad<oldBar.scrollLeft)oldBar.scrollTo({left:Math.max(0,left-pad),behavior:'smooth'});
  else if(right+pad>oldBar.scrollLeft+oldBar.clientWidth)oldBar.scrollTo({left:right+pad-oldBar.clientWidth,behavior:'smooth'});
}
function refreshDealPanel(){
  if(state.dealOpen&&document.getElementById('sc-deal-isb'))
    refreshPanel('sc-deal-isb',dealPanelHTML());
}

/* ── PANEL FILL + TAB MARKER ──────────────────────────────────────────────
   The active detail-panel tab is marked by ONE box that travels between tabs
   (.tab-ind--box, motion.css 6b). In ADT js/tab-slide.js places it; this
   module does not load that file, so this is its small equivalent. The panel
   is rebuilt on every tab switch, so the box is planted where the old active
   tab was and then moved — which is what makes it slide rather than blink. */
function fillPanel(id,html){
  var el=document.getElementById(id);if(!el)return;
  var oldBar=el.querySelector('.lp-isb-tabs'),oldInd=el.querySelector('.tab-ind');
  var prev=oldInd&&oldInd.classList.contains('on')
    ?{t:oldInd.style.transform,w:oldInd.style.width,h:oldInd.style.height}:null;
  var scroll=oldBar?oldBar.scrollLeft:0;
  el.innerHTML=html;
  var bar=el.querySelector('.lp-isb-tabs'),tab=bar&&bar.querySelector('.lp-isb-tab.active');
  if(!tab)return;
  bar.scrollLeft=scroll;
  var ind=document.createElement('span');
  ind.className='tab-ind tab-ind--box no-anim';
  bar.insertBefore(ind,bar.firstChild);
  var place=function(){
    ind.style.transform='translate('+tab.offsetLeft+'px,'+tab.offsetTop+'px)';
    ind.style.width=tab.offsetWidth+'px';ind.style.height=tab.offsetHeight+'px';
  };
  if(prev){ind.style.transform=prev.t;ind.style.width=prev.w;ind.style.height=prev.h;}
  else place();
  ind.classList.add('on');
  void ind.offsetWidth;
  ind.classList.remove('no-anim');
  if(prev)requestAnimationFrame(place);
  /* Keep the active tab in view when the row scrolls. */
  if(tab.offsetLeft<bar.scrollLeft||tab.offsetLeft+tab.offsetWidth>bar.scrollLeft+bar.clientWidth)
    bar.scrollLeft=tab.offsetLeft-8;
}
function tabBarHTML(tabs,current,handler,closer,id){
  return '<div class="lp-isb-tabbar">'
    +'<button class="lp-isb-nav-btn" onclick="scrollTabRow(\'left\',\''+id+'\')" title="Scroll left">'+ICO.chevL+'</button>'
    +'<div class="lp-isb-tabs" id="'+id+'">'
    +tabs.map(function(t){
      var dirty=handler==='scDealTab'&&state.edit&&state.edit.dirty&&state.edit.id===state.dealSel&&state.edit.tab===t.id&&current!==t.id;
      return '<button class="lp-isb-tab'+(current===t.id?' active':'')+'" onclick="'+handler+'(\''+t.id+'\')">'+esc(t.label)
        +(dirty?'<span class="sc-tab-dot" title="Unsaved changes"></span>':'')+'</button>';
    }).join('')
    +'</div>'
    +'<button class="lp-isb-nav-btn nav-right" onclick="scrollTabRow(\'right\',\''+id+'\')" title="Scroll right">'+ICO.chevR+'</button>'
    +'<div class="lp-isb-right"><button class="lp-isb-close" onclick="'+closer+'()" title="Close">'+ICO.close+'</button></div>'
    +'</div>';
}
function scrollTabRow(dir,id){
  var row=document.getElementById(id);if(!row)return;
  row.scrollBy({left:dir==='left'?-160:160,behavior:'smooth'});
}

function fieldCard(ico,label,value,wide){
  return '<div class="lp-sb-field-card'+(wide?' is-wide':'')+'"><div class="lp-sb-field-icon">'+ico+'</div>'
    +'<div class="lp-sb-field-content"><div class="lp-sb-field-label">'+esc(label)+'</div>'
    +'<div class="lp-sb-field-value">'+(value!=null&&value!==''?value:'<span class="sb-dash" style="color:#9ca3af">-</span>')+'</div></div></div>';
}
/* THE SECTION HEAD EVERY ADT DETAIL PANEL USES. Payroll, Employees,
   Compliance, Tickets and the generic listing panel all open a group with this
   exact row; the bar-and-title heading this module had before was a second
   shape for the same job, which is the one thing a shared design cannot
   afford. `right` is the optional action the group carries. */
function secHead(title,right){
  return '<div class="lp-sb-view-header"><span class="lp-sb-section-title">'+esc(title)+'</span>'+(right||'')+'</div>';
}
/* Section heads over tables are plain heads now: the whole tab expands from
   the toolbar at its top (scExpandTab), not one table at a time. */
var ICO_EXPAND='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
var ICO_COLLAPSE='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
function tableHead(title){return secHead(title);}
function recTable(head,rows){
  return '<div class="sc-rec-wrap"><table class="sc-rec-table"><thead><tr>'
    +head.map(function(h){return '<th>'+esc(h)+'</th>';}).join('')
    +'</tr></thead><tbody>'+rows+'</tbody></table></div>';
}

/* ══ DEAL PANEL ═══════════════════════════════════════════════════════════  */
/* Logs comes straight after Details: it is where the next action is taken,
   so it sits beside the record it acts on. Workflow closes the row - it is
   where the steps are read back afterwards. */
var DEAL_TABS=[{id:'details',label:'Details'},{id:'logs',label:'Logs'},{id:'shipment',label:'Shipment'},
               {id:'deliverynote',label:'Delivery Note'},{id:'challan',label:'Challan'},{id:'asn',label:'ASN'},{id:'imr',label:'IMR'},{id:'reference',label:'Reference Details'},
               {id:'attachments',label:'Attachments'},{id:'history',label:'History'},{id:'workflow',label:'Workflow'}];
var ORDER_TABS=[{id:'details',label:'Details'},{id:'logs',label:'Logs'},{id:'history',label:'History'},{id:'workflow',label:'Workflow'}];
/* ROLES THAT DO NOT LOG IN DEALS. The PO Approver works on the Purchase Order
   only: its Approve / Return are logged on the PO in Orders. In Deals it gets
   no Logs tab and no row actions - the row menu points it to the PO instead. */
var NO_DEAL_LOGS=['PO Approver'];
function dealLogsAllowed(){return NO_DEAL_LOGS.indexOf(state.role)<0;}
function dealTabs(){
  var tabs=dealLogsAllowed()?DEAL_TABS:DEAL_TABS.filter(function(t){return t.id!=='logs';});
  if(!tabs.some(function(t){return t.id===state.dealTab;}))state.dealTab='details';
  return tabs;
}
function dealPanelHTML(){
  if(state.dealSel!==LIVE_ID)return samplePanelHTML(sampleDeal(state.dealSel));
  var tabs=dealTabs();
  var bar=tabBarHTML(tabs,state.dealTab,'scDealTab','scCloseDeal','sc-deal-tabs');
  var body;
  if(state.dealTab==='details')body=dealDetailsHTML();
  else if(state.dealTab==='workflow')body=dealWorkflowHTML();
  else if(state.dealTab==='logs')body=dealLogsHTML();
  else if(state.dealTab==='history')body=historyHTML(LIVE_ID);
  else if(DOC_TABS[state.dealTab])body=DOC_TABS[state.dealTab](dealDocs(LIVE_ID));
  else body=attachmentsHTML(LIVE_ID);
  body=withTools(LIVE_ID,state.dealTab,body);

  return expHeadHTML()+bar+'<div class="lp-isb-body">'+body+'</div>';
}

/* ══ DOCUMENT TABS ═════════════════════════════════════════════════════════
   Shipment, Delivery Note, Challan, ASN and IMR each get a tab in the deal
   panel, laid out like Details: section heads, field cards, and the line
   table where there is one. dealDocs() reads one deal - live or sample - into
   a single shape, so the five tabs are written once for both. A document the
   deal has not reached yet shows the panel's empty state saying who makes it. */
/* What a role has changed on a deal's documents, by deal id: shipment and
   transport fields, Delivery Note / Challan references, and the quantities
   on open ASNs and IMRs of the sample deals (the live deal edits its own). */
var DOC_EDITS={};
function docEdits(id){return DOC_EDITS[id]||(DOC_EDITS[id]={ship:{},dn:{},ch:{},asnQty:{},imrQty:{}});}
var SHIP_DEFAULTS={dna:'Chandra Mohan',challanType:'Production Material Challan',logistics:'Yes',ret:'30 Oct 2026',
  pkg:'Plate Bundle',pkgNo:'1',weight:'1000',mode:'Road Transport',transporter:'TransCore Logistics',vehicle:'AP47TD8451',
  driver:'',lrNo:'',lrDate:'26 Sep 2026',insurance:'Yes',insuredBy:'',contact:'ATUL'};
function dealDocs(id){
  var x=dealDocsBase(id),e=docEdits(id);
  x.sh=Object.assign({},SHIP_DEFAULTS,e.ship);
  x.dnInfo=Object.assign({ref:'',remarks:''},e.dn);
  x.chInfo=Object.assign({ref:'TEST1',nature:'Job Work · Billable'},e.ch);
  x.asns.forEach(function(a,i){if(e.asnQty[i]!=null)a.qty=e.asnQty[i];});
  x.imrs.forEach(function(m,i){if(e.imrQty[i]!=null)m.qty=e.imrQty[i];});
  return x;
}
function dealDocsBase(id){
  var ISSUE=[['SKU_52297_3814','Mild Steel Plate 10 mm','0202'],['SKU_52288_3814','Carbon Steel Billet','0206'],
             ['SKU_52287_3814','Alloy Steel Forging Block','0203']];
  if(id===LIVE_ID){
    return {scr:LIVE_ID,po:LIVE_PO,vendor:'Sri Venkateswara Aerospace Pvt.ltd',vcode:'21005',addr:'Hyderabad, Telangana 500084',
      planner:'Kinjal Sisodiya',shipStatus:shipLabel(),project:'Industrial Structure Fabrication',preparedBy:'Sagar Kohli',
      obk:state.shipment!=='none'?{no:'OBK/26/0152',date:'25 Sep 2026 11:19',to:'TO/26/0152'}:null,
      ship:state.shipment!=='none'?{no:'SHP-2026-035307',date:'25 Sep 2026'}:null,
      dn:state.deliveryNote!=='none'?{no:'DN/26/0123',date:'25 Sep 2026 11:19',approved:state.deliveryNote==='approved'}:null,
      challan:state.challan!=='none'?{no:'CHL/26/0103',date:'25 Sep 2026 11:21',
        status:state.challan==='gate_cleared'?'Gate Cleared':state.challan==='closed'?'Closed':'Generated'}:null,
      items:ISSUE.map(function(r){return {code:r[0],desc:r[1],hsn:r[2],qty:10,uom:'Each'};}),
      uom:'Each',
      asns:state.asns.map(function(a){return {no:a.no,qty:a.qty,qc:a.qc,gateIn:a.gateIn};}),
      imrs:state.imrs.map(function(m){return {no:m.no,asnNo:m.asnNo,qty:m.qty,status:m.status};})};
  }
  var d=sampleDeal(id),n=id.slice(-5),it=d.item,asns=[],imrs=[],k;
  if(d.rx){
    asns=d.rx.asns.map(function(a,i){return {no:'ASN-'+n+'-'+(i+1),qty:a.qty,qc:a.qc,gateIn:a.gateIn};});
    imrs=d.rx.imrs.map(function(m,i){return {no:'IMR-'+n+'-'+(i+1),asnNo:'ASN-'+n+'-'+(m.asn+1),qty:m.qty,status:m.status};});
  }
  var obStep=d.stage==='outbound'?['dn','challan','gate','confirm'].indexOf(d.sub||'dn'):(stagePassed(d,'outbound')?4:-1);
  for(k=1;!d.rx&&k<=d.asns;k++){
    var last=d.stage==='asn'&&k===d.asns;
    asns.push({no:'ASN-'+n+'-'+k,qty:Math.ceil(it.qty/Math.max(1,d.asns)),
      qc:!last||d.sub==='gatein'||d.sub==='vendor'?'QC Cleared':'Created',gateIn:!last||d.sub==='vendor'});
  }
  for(k=1;!d.rx&&k<=d.imrs;k++){
    var open=d.stage==='imr'&&k===d.imrs&&d.sub!=='create';
    imrs.push({no:'IMR-'+n+'-'+k,asnNo:'ASN-'+n+'-'+Math.min(k,Math.max(1,d.asns)),
      qty:Math.ceil(it.qty/Math.max(1,d.imrs)),status:open?'Created':'Confirmed'});
  }
  return {scr:d.id,po:d.po?d.po.no:'—',vendor:d.vendor.name,vcode:d.vendor.code,addr:d.vendor.addr,
    planner:d.planner,shipStatus:sampleShip(d),project:(d.baseRef.split(' — ')[1]||d.baseRef),preparedBy:d.planner,
    obk:stageReached(d,'shipment')&&d.stage!=='po'?{no:'OBK/26/'+n,date:addDays(d.created,8)+' 11:19',to:'TO/26/'+n}:null,
    ship:stageReached(d,'shipment')&&!(d.stage==='po')?{no:'SHP-2026-0'+n,date:addDays(d.created,8)}:null,
    dn:obStep>=0?{no:'DN/26/'+n,date:addDays(d.created,10),approved:obStep>=1}:null,
    challan:obStep>=2?{no:'CHL/26/'+n,date:addDays(d.created,11),status:obStep>=3?'Gate Cleared':'Generated'}:null,
    items:d.issues.map(function(r){var c=r[0].split(' — ');return {code:c[0],desc:c[1]||c[0],hsn:r[2],qty:it.qty,uom:it.uom};}),
    uom:it.uom,asns:asns,imrs:imrs};
}
function transportCards(x,full){
  var t=x.sh;
  return fieldCard(ICO.cube,'Package Type / Details',esc(t.pkg))
    +fieldCard(ICO.hash,'Number of Packages',esc(t.pkgNo))
    +fieldCard(ICO.cube,'Package Weight',t.weight?esc(t.weight)+' '+esc(x.uom):'')
    +fieldCard(ICO.truck,'Mode of Dispatch',esc(t.mode))
    +fieldCard(ICO.truck,'Transporter',esc(t.transporter))
    +fieldCard(ICO.truck,'Vehicle No.',esc(t.vehicle))
    +(full?fieldCard(ICO.user,'Driver Details',esc(t.driver))+fieldCard(ICO.doc,'LR / Transport Reference No.',esc(t.lrNo)):'')
    +fieldCard(ICO.cal,'LR / Transport Date',esc(t.lrDate))
    +fieldCard(ICO.shield,'Insurance Applicable',esc(t.insurance))
    +(full?fieldCard(ICO.shield,'Insured By / Insurance Details',esc(t.insuredBy)):'')
    +fieldCard(ICO.user,'Loading / Unloading Contact',esc(t.contact));
}
/* OUTBOUND KEY - a printable document in the bordered form layout: title
   block, numbered references, item table, transport grid, three signature
   boxes and the computer-generated footer. Built from dealDocs(), so the
   live deal and every sample render their own. */
function tplCell(label,value,cls){
  return '<div class="sc-tpl-cell'+(cls?' '+cls:'')+'"><div class="sc-tpl-label">'+esc(label)+'</div>'
    +'<div class="sc-tpl-value">'+(value===''||value==null?'—':value)+'</div></div>';
}
function keepExpanded(){
  var root=document.getElementById('sc-modal-root');
  if(root&&root.querySelector('.sc-expand-view'))modalStack.push(root.innerHTML);
}
function scOpenDN(id){
  var x=dealDocs(id);if(!x.dn)return;
  keepExpanded();
  var day=x.dn.date.split(' ').slice(0,3).join(' ');
  var doc='<div class="sc-tpl">'
    +'<div class="sc-tpl-grid">'
      +'<div class="sc-tpl-cell sc-span2 sc-tpl-titlecell"><div class="sc-tpl-title">DELIVERY NOTE</div><div class="sc-tpl-sub">Sub-Contracting</div></div>'
      +tplCell('Status','<b>'+(x.dn.approved?'Approved':'Generated')+'</b>')
      +tplCell('SCR No.','<b class="sc-tpl-big">'+esc(x.scr)+'</b>')
      +tplCell('Delivery Note No.','<b class="sc-tpl-big">'+esc(x.dn.no)+'</b>')
      +tplCell('Delivery Note Date',esc(x.dn.date))
      +tplCell('PO No.',esc(x.po))
      +tplCell('Shipment No.',esc(x.ship?x.ship.no:''))
      +tplCell('Vendor / Consignee',esc(x.vendor),'sc-span3')
      +tplCell('Dispatching Unit / Location','Hazira Works')
      +tplCell('Address',esc(x.addr)+', India','sc-span3')
      +tplCell('Expected Date of Return',esc(x.sh.ret))
      +tplCell('Delivery Note Approver',esc(x.sh.dna),'sc-span3')
      +tplCell('Your / Our Reference',esc(x.dnInfo.ref))
      +tplCell('Comment',esc(x.dnInfo.remarks),'sc-span4')
    +'</div>'
    +'<div class="sc-tpl-band">ITEM DETAILS</div>'
    +'<table class="sc-tpl-table"><thead><tr><th class="c">Item No</th><th>Issue Item / Material Code</th><th>Item Description</th>'
      +'<th class="r">Quantity</th><th>UOM</th></tr></thead><tbody>'
      +x.items.map(function(r,i){return '<tr><td class="c">'+(i+1)+'</td><td>'+esc(r.code)+'</td><td>'+esc(r.desc)+'</td>'
        +'<td class="r">'+r.qty+'</td><td>'+esc(r.uom)+'</td></tr>';}).join('')
    +'</tbody></table>'
    +'<div class="sc-tpl-band">PACKAGE / VEHICLE / TRANSPORT DETAILS</div>'
    +'<div class="sc-tpl-grid sc-tpl-grid3">'
      +tplCell('Package Type / Details',esc(x.sh.pkg))+tplCell('Number of Packages',esc(x.sh.pkgNo))+tplCell('Package Weight',esc(x.sh.weight)+' '+esc(x.uom))
      +tplCell('Mode of Dispatch',esc(x.sh.mode))+tplCell('Transporter',esc(x.sh.transporter))+tplCell('Vehicle No.',esc(x.sh.vehicle))
      +tplCell('Driver Details',esc(x.sh.driver))+tplCell('LR / Transport Reference No.',esc(x.sh.lrNo))+tplCell('LR / Transport Date',esc(x.sh.lrDate))
      +tplCell('Insurance Applicable',esc(x.sh.insurance))+tplCell('Insured By / Insurance Details',esc(x.sh.insuredBy))+tplCell('Loading / Unloading Contact',esc(x.sh.contact))
    +'</div>'
    +'<div class="sc-tpl-grid sc-tpl-grid3 sc-tpl-sign">'
      +[['PREPARED BY',x.preparedBy,day],
        ['AUTHORIZED BY (APPROVER)',x.dn.approved?x.sh.dna:'',x.dn.approved?day:''],
        ['RECEIVED BY','','']].map(function(g){
        return '<div class="sc-tpl-cell"><div class="sc-tpl-signhead">'+g[0]+'</div>'
          +'<div class="sc-tpl-signname">'+(esc(g[1])||'—')+'</div><div class="sc-tpl-signline"></div>'
          +'<div class="sc-tpl-label">(Name &amp; Signature)</div><div class="sc-tpl-label">Date: '+(esc(g[2])||'________')+'</div></div>';
      }).join('')
    +'</div>'
    +'<div class="sc-tpl-foot"><span>(This is a computer generated Delivery Note and does not require any physical signature)</span><span>Page 1 of 1</span></div>'
  +'</div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell('Delivery Note',x.dn.no+' · '+x.scr,
    '<div style="padding:16px 0 6px">'+doc+'</div>',
    '<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Close</button>'
      +'<button class="btn-primary" onclick="scPrintModal()">'+ICO_PRINT+' Print</button></div>',true);
}
/* OUTBOUND KEY DETAILS - the gate document: a key card (number, status and a
   code to scan at the gate), its basic references, and one card per issue
   material. The code is a drawn placeholder, not a scannable QR. */
var ICO_PRINT='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>';
var ICO_DL='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/></svg>';
function qrPlaceholder(text){
  var n=21,h=0,i,cells='';
  for(i=0;i<text.length;i++)h=(h*31+text.charCodeAt(i))>>>0;
  var finder=function(r,c){
    var f=[[0,0],[0,n-7],[n-7,0]];
    for(var k=0;k<3;k++){var dr=r-f[k][0],dc=c-f[k][1];
      if(dr>=0&&dr<7&&dc>=0&&dc<7)return (dr===0||dr===6||dc===0||dc===6||(dr>=2&&dr<=4&&dc>=2&&dc<=4))?1:0;
      if(dr>=-1&&dr<8&&dc>=-1&&dc<8)return 0;}
    return -1;
  };
  for(var r=0;r<n;r++)for(var c=0;c<n;c++){
    var f=finder(r,c),on;
    if(f>=0)on=f;else{h=(h*1103515245+12345)>>>0;on=(h>>>16)&1;}
    if(on)cells+='<rect x="'+c+'" y="'+r+'" width="1" height="1"/>';
  }
  return '<svg viewBox="-1 -1 '+(n+2)+' '+(n+2)+'" width="68" height="68" shape-rendering="crispEdges"><rect x="-1" y="-1" width="'+(n+2)+'" height="'+(n+2)+'" fill="#fff"/><g fill="#111">'+cells+'</g></svg>';
}
function scOpenOBK(id){
  var x=dealDocs(id);if(!x.obk)return;
  keepExpanded();
  var released=!!x.dn;
  var kv=function(k,v){return '<div class="sc-kv"><span>'+esc(k)+'</span><b>'+esc(v)+'</b></div>';};
  var body='<div class="sc-obk">'
    +'<div class="sc-obk-hero"><div class="sc-obk-hero-l"><div class="sc-obk-label">OUTBOUND KEY NO.</div>'
      +'<div class="sc-obk-no">'+esc(x.obk.no)+'</div>'+badge(released?'approved':'created',released?'Released':'Generated')+'</div>'
      +'<div class="sc-obk-qr">'+qrPlaceholder(x.obk.no)+'<span>Scan at gate</span></div></div>'
    +secHead('Basic Details')
    +'<div class="sc-kv-list">'+kv('Shipment No.',x.ship?x.ship.no:'—')+kv('SCR No.',x.scr)+kv('PO No.',x.po)+kv('Transfer Order No.',x.obk.to)+'</div>'
    +secHead('Material to be Issued')
    +x.items.map(function(r){
      return '<div class="sc-obk-item"><div class="sc-obk-item-top"><div><b>'+esc(r.code)+'</b><span>'+esc(r.desc)+'</span></div>'
        +'<div class="sc-obk-qty">'+r.qty+' '+esc(r.uom)+'</div></div>'
        +kv('Project',x.project)+kv('Warehouse','Hazira Works')+kv('Storage Location','Main Store · Hazira Works')+'</div>';
    }).join('')
  +'</div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell('Outbound Key Details',
    'Generated '+x.obk.date+' by '+x.preparedBy,body,
    '<div class="ct-modal-btns"><button class="btn-outline" onclick="scPrintModal(true)">'+ICO_DL+' Download PDF</button>'
      +'<button class="btn-primary" onclick="scPrintModal()">'+ICO_PRINT+' Print</button></div>');
}
/* Print the open popup's body on its own. Download PDF uses the same print
   window - the browser's "Save as PDF" destination writes the file. */
function scPrintModal(pdf){
  var body=document.querySelector('#sc-modal-root .sc-modal-body'),
      title=document.querySelector('#sc-modal-root .ct-modal-title');
  if(!body)return;
  var links=Array.prototype.map.call(document.querySelectorAll('link[rel="stylesheet"]'),function(l){return '<link rel="stylesheet" href="'+l.href+'">';}).join('');
  var w=window.open('','_blank');
  if(!w){scToast('Allow pop-ups to print','error');return;}
  w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>'+esc(title?title.textContent:'Document')+'</title>'+links
    +'<style>body{background:#fff;padding:24px;overflow:auto;height:auto}</style></head><body>'+body.innerHTML+'</body></html>');
  w.document.close();
  w.onload=function(){w.focus();w.print();};
  if(pdf)scToast('Choose "Save as PDF" in the print dialog','info');
}
function docEmpty(ico,title,sub){
  return '<div class="sc-empty"><div class="sc-empty-ico">'+ico+'</div>'
    +'<div class="sc-empty-title">'+esc(title)+'</div><div class="sc-empty-sub">'+esc(sub)+'</div></div>';
}
function docGridCards(cards){return '<div class="lp-sb-detail-grid" style="margin-bottom:20px">'+cards+'</div>';}
/* ══ REFERENCE DETAILS (SAP) ═══════════════════════════════════════════════
   How the SCR stands in SAP, read from the deal itself: the purchase
   requisition it became, its SAP status, every exchange with SAP, and the
   field-by-field mapping of what OpenDhi sends. Values the integration sets
   on its own (document type, plant, purchasing group...) are marked as such. */
function sapRef(id){
  var x=dealDocs(id),live=id===LIVE_ID,d=live?null:sampleDeal(id),o=live?L():d;
  var ev=dealEventsOldestFirst(id),has=function(st){return ev.some(function(l){return l.status===st;});};
  var at=function(st){var l=null;ev.forEach(function(e){if(e.status===st)l=e;});return l;};
  var num=id.slice(-5),poNo=poNoOf(id),approved=has('SCR Approved'),poDone=has('PO Approved');
  var rejected=live?false:!!d.rejected;
  var due=live?(o.item.date||'30 Oct 2026'):d.item.due;
  var t=stamp();
  return {num:num,prNo:'1000'+num.slice(-4),title:o.title,item:o.item.name,qty:o.item.qty,price:o.item.price,
    uom:live?'Each':d.item.uom,vcode:x.vcode,vendor:x.vendor,due:isoOf(due)||due,
    release:approved?'Released':'Not Released',processing:poDone?'Ordered':'Not Yet Ordered',
    ordered:poDone?o.item.qty:0,po:poDone&&poNo?'4500'+poNo:'',deleted:rejected?'Yes':'No',
    readAt:t.date+', '+fmtTime(t.time).replace(/:\d\d (AM|PM)$/,' $1'),
    history:(function(){
      var h=[],sub=at('SCR Submitted'),apr=at('SCR Approved'),po=at('PO Approved'),rej=at('SCR Rejected');
      if(sub)h.push({at:sub,dir:'out',outcome:'Created',details:'Created in SAP as '+'1000'+num.slice(-4)});
      ev.forEach(function(e){if(e.status==='SCR Updated'||e.status==='Moved back to SCR Submitted')
        h.push({at:e,dir:'out',outcome:'Updated',details:'Changed fields sent to SAP'});});
      if(apr)h.push({at:apr,dir:'out',outcome:'Released',details:'Release sent after SCR approval'});
      if(po&&poNo)h.push({at:po,dir:'in',outcome:'PO assigned',details:'Purchase order 4500'+poNo+' read from SAP'});
      if(rej)h.push({at:rej,dir:'out',outcome:'Deleted',details:'Deletion flag set in SAP'});
      return h.sort(function(a,b){return logTs(a.at)-logTs(b.at);});
    })()};
}
/* THE MAPPING, READ IN TWO PARTS per group (header, then each line):
     From OpenDhi - each field OpenDhi sends: its field and value, an arrow,
                    the SAP field and the value SAP holds, with a note;
     Set by the integration - the fixed SAP values nobody types, as the
                    panel's field cards. */
function sapMapGroup(title,sent,fixed){
  return '<div class="sc-map-group"><div class="sc-map-title">'+esc(title)+'</div>'
    +'<div class="sc-map-sub">From OpenDhi <span>'+sent.length+'</span></div>'
    +'<div class="sc-map-list">'+sent.map(function(m){
      return '<div class="sc-map-row">'
        +'<div class="sc-map-side"><span class="sc-map-lbl">'+esc(m[0])+'</span><b>'+esc(m[1])+'</b></div>'
        +'<div class="sc-map-arrow">'+ICO_ARROW+'</div>'
        +'<div class="sc-map-side"><span class="sc-map-lbl">SAP · '+esc(m[2])+'</span><b>'+esc(m[3])+'</b>'
          +(m[4]?'<span class="sc-map-note">'+esc(m[4])+'</span>':'')+'</div>'
      +'</div>';
    }).join('')+'</div>'
    +'<div class="sc-map-sub">Set by the integration <span>'+fixed.length+'</span></div>'
    +docGridCards(fixed.map(function(f){
      return fieldCard(ICO.sliders,f[0],'<b>'+esc(f[1])+'</b>'+(f[2]?'<span class="sc-sub-line">'+esc(f[2])+'</span>':''));
    }).join(''))
  +'</div>';
}

/* What a tab shows before its document exists: the same fields, with the
   document's own values blank - SCR, PO, vendor and items stay filled. */
function blankDocs(x){
  var b=Object.assign({},x);
  if(!b.ship){b.ship={no:'',date:'',blank:true};b.obk=null;b.sh={};Object.keys(SHIP_DEFAULTS).forEach(function(k){b.sh[k]='';});}
  if(!b.dn)b.dn={no:'',date:'',approved:false,blank:true};
  if(!b.dnInfo||!x.dn)b.dnInfo={ref:'',remarks:''};
  if(!b.challan){b.challan={no:'',date:'',status:'',blank:true};b.chInfo={ref:'',nature:''};}
  if(!b.asns.length)b.asns=[{no:'',qty:'',qc:'',gateIn:null,blank:true}];
  if(!b.imrs.length)b.imrs=[{no:'',asnNo:'',qty:'',status:'',blank:true}];
  return b;
}
var DOC_TABS={
  reference:function(x){
    var r=sapRef(x.scr);
    var status=secHead('SAP Status')+'<p class="sc-sap-read">Read '+esc(r.readAt)+'</p>'
      +recTable(['Item','Text','Release','Processing','Ordered Qty','Purchase Order','Deleted'],
        '<tr><td>10</td><td>'+esc(r.item)+'</td>'
        +'<td>'+badge(r.release==='Released'?'approved':'pending',r.release)+'</td>'
        +'<td>'+esc(r.processing)+'</td><td>'+r.ordered+'</td>'
        +'<td>'+(r.po?'<b>'+esc(r.po)+'</b>':'<span class="lp-dash">—</span>')+'</td><td>'+esc(r.deleted)+'</td></tr>');
    var hist=secHead('SAP History')+'<p class="sc-sap-read">Every exchange of this request with SAP.</p>'
      +recTable(['Date & Time','Direction','Outcome','Details'],
        r.history.map(function(h){
          return '<tr><td>'+esc(h.at.date)+'<span class="sc-rec-sub">'+esc(fmtTime(h.at.time))+'</span></td>'
            +'<td><span class="sc-sap-dir'+(h.dir==='in'?' is-in':'')+'">'+(h.dir==='in'?'SAP → OpenDhi':'OpenDhi → SAP')+'</span></td>'
            +'<td class="sc-sap-ok">✓ '+esc(h.outcome)+'</td><td>'+esc(h.details)+'</td></tr>';
        }).join('')||'<tr><td colspan="4" class="sc-sap-none">No exchange with SAP yet.</td></tr>');
    var map=secHead('SAP Field Mapping')+'<p class="sc-sap-read">What is sent to SAP for this request, as it stands now.</p>'
      +sapMapGroup('SCR header → Purchase requisition header',[
          ['SCR number',r.num,'Purchase requisition number',r.prNo],
          ['SCR number + title',r.num+' '+r.title,'Description','OpenDhi SCR '+r.num+' '+r.title,'prefixed "OpenDhi SCR"']],
        [['Document type','NB','Standard purchase requisition']])
      +sapMapGroup('Line 1 · '+r.item+' → Item 10',[
          ['Line number','1','Item','10','SAP numbers lines 10, 20, 30 …; set when created in SAP, not sent again'],
          ['Finished product',r.item,'Item text',r.item,'set when created in SAP, not sent again'],
          ['Quantity',String(r.qty),'Quantity',String(r.qty)],
          ['Price per unit',String(r.price),'Price',String(r.price)],
          ['Store','3814','Plant','1710','store ↔ plant link; set when created in SAP, not sent again'],
          ['Expected receipt date',r.due,'Delivery date',r.due],
          ['Vendor',r.vcode+' · '+r.vendor,'Supplier','1000'+r.vcode.slice(-3),'the vendor\'s SAP number; set when created in SAP, not sent again']],
        [['Item category','3','Subcontracting'],
         ['Material','SG23','SAP\'s subcontracting material; the product is named in the item text'],
         ['Base unit','PC','Unit of the subcontracting material'],
         ['Price unit','1','The price is per 1 unit'],
         ['Currency','INR',''],
         ['Company code','1710',''],
         ['Purchasing organisation','1710',''],
         ['Purchasing group','001','The buyer\'s purchasing group'],
         ['Storage location','171A','Where the goods come back to']]);
    return '<div class="sc-sap">'+status+hist+map+'</div>';
  },
  shipment:function(x){
    x=blankDocs(x);
    return secHead('Shipment Details',x.obk?'<button class="btn-outline btn-sm" onclick="scOpenOBK(\''+x.scr+'\')">'+ICO.eye+' View Outbound Key</button>':'')+docGridCards(
       fieldCard(ICO.box,'Shipment ID',esc(x.ship.no))
      +fieldCard(ICO.check,'Shipment Status',x.ship.blank?'':badge(shipToneOf(x.shipStatus),x.shipStatus))
      +fieldCard(ICO.doc,'SCR No.',esc(x.scr))
      +fieldCard(ICO.cart,'PO No.',esc(x.po))
      +fieldCard(ICO.user,'Created By',x.ship.blank?'':esc(x.planner))
      +fieldCard(ICO.cal,'Created On',esc(x.ship.date))
      +fieldCard(ICO.user,'Delivery Note Approver',esc(x.sh.dna))
      +fieldCard(ICO.tag,'Challan Type',esc(x.sh.challanType))
      +fieldCard(ICO.truck,'Logistics Required',esc(x.sh.logistics))
      +fieldCard(ICO.cal,'Expected Return',esc(x.sh.ret)))
    +secHead('Package / Vehicle / Transport')+docGridCards(transportCards(x,true))
    +tableHead('Issue Material')+recTable(['#','Material Code','Description','Qty','UOM','Warehouse','Storage Location'],
      x.items.map(function(r,i){return '<tr><td>'+(i+1)+'</td><td><b>'+esc(r.code)+'</b></td><td>'+esc(r.desc)+'</td><td>'+r.qty+'</td><td>'+esc(r.uom)+'</td><td>Hazira Works</td><td>Main Store</td></tr>';}).join(''));
  },
  deliverynote:function(x){
    x=blankDocs(x);
    return secHead('Delivery Note Details',x.dn.blank?'':'<button class="btn-outline btn-sm" onclick="scOpenDN(\''+x.scr+'\')">'+ICO.eye+' View Delivery Note</button>')+docGridCards(
       fieldCard(ICO.doc,'Delivery Note No.',esc(x.dn.no))
      +fieldCard(ICO.check,'Status',x.dn.blank?'':badge(x.dn.approved?'approved':'created',x.dn.approved?'Approved':'Generated'))
      +fieldCard(ICO.cal,'Delivery Note Date',esc(x.dn.date))
      +fieldCard(ICO.box,'Shipment No.',esc(x.ship?x.ship.no:'—'))
      +fieldCard(ICO.doc,'SCR No.',esc(x.scr))
      +fieldCard(ICO.cart,'PO No.',esc(x.po))
      +fieldCard(ICO.handshake,'Vendor / Consignee',esc(x.vcode+' — '+x.vendor))
      +fieldCard(ICO.globe,'Address',esc(x.addr))
      +fieldCard(ICO.globe,'Dispatching Unit','Hazira Works')
      +fieldCard(ICO.cal,'Expected Date of Return',esc(x.sh.ret))
      +fieldCard(ICO.user,'Delivery Note Approver',esc(x.sh.dna))
      +fieldCard(ICO.doc,'Your / Our Reference',esc(x.dnInfo.ref))
      +fieldCard(ICO.doc,'Comment',esc(x.dnInfo.remarks)))
    +tableHead('Item Details')+recTable(['Item No','Material Code','Item Description','Quantity','UOM'],
      x.items.map(function(r,i){return '<tr><td>'+(i+1)+'</td><td><b>'+esc(r.code)+'</b></td><td>'+esc(r.desc)+'</td><td>'+r.qty+'</td><td>'+esc(r.uom)+'</td></tr>';}).join(''))
    +secHead('Package / Vehicle / Transport')+docGridCards(transportCards(x,true))
    +secHead('Sign-off')+docGridCards(
       fieldCard(ICO.user,'Prepared By',x.dn.blank?'':esc(x.preparedBy)+'<span class="sc-sub-line">'+esc(x.dn.date.split(' ').slice(0,3).join(' '))+'</span>')
      +fieldCard(ICO.user,'Authorized By (Approver)',x.dn.approved?esc(x.sh.dna)+'<span class="sc-sub-line">'+esc(x.dn.date.split(' ').slice(0,3).join(' '))+'</span>':'')
      +fieldCard(ICO.user,'Received By',''));
  },
  challan:function(x){
    x=blankDocs(x);
    return secHead('Challan Details')+docGridCards(
       fieldCard(ICO.doc,'Challan No.',esc(x.challan.no))
      +fieldCard(ICO.check,'Status',x.challan.blank?'':badge(x.challan.status==='Generated'?'created':'approved',x.challan.status))
      +fieldCard(ICO.cal,'Challan Date',esc(x.challan.date))
      +fieldCard(ICO.doc,'Delivery Note No.',esc(x.dn?x.dn.no:'—'))
      +fieldCard(ICO.box,'Shipment No.',esc(x.ship?x.ship.no:'—'))
      +fieldCard(ICO.cart,'PO No.',esc(x.po))
      +fieldCard(ICO.handshake,'Vendor',esc(x.vcode+' — '+x.vendor))
      +fieldCard(ICO.globe,'Vendor Address',esc(x.addr))
      +fieldCard(ICO.hash,'Vendor GSTIN',x.challan.blank?'':'27AAPFU0939F1ZV')
      +fieldCard(ICO.globe,'Dispatching Unit','Hazira Works')
      +fieldCard(ICO.tag,'Nature / Reason',esc(x.chInfo.nature))
      +fieldCard(ICO.doc,'Your / Our Reference',esc(x.chInfo.ref))
      +fieldCard(ICO.truck,'Mode',esc(x.sh.mode))
      +fieldCard(ICO.cal,'Expected Date of Return',esc(x.sh.ret)))
    +tableHead('Item Details')+recTable(['Item No.','Material Code','Description','HSN','Qty','UOM'],
      x.items.map(function(r,i){return '<tr><td>'+(i+1)+'</td><td><b>'+esc(r.code)+'</b></td><td>'+esc(r.desc)+'</td><td>'+esc(r.hsn)+'</td><td>'+r.qty+'</td><td>'+esc(r.uom)+'</td></tr>';}).join(''))
    +secHead('Logistics')+docGridCards(
       fieldCard(ICO.cube,'Package',esc(x.sh.pkg))
      +fieldCard(ICO.hash,'No. of Packages',esc(x.sh.pkgNo))
      +fieldCard(ICO.cube,'Package Weight',x.sh.weight?esc(x.sh.weight)+' '+esc(x.uom):'')
      +fieldCard(ICO.truck,'Transporter',esc(x.sh.transporter))
      +fieldCard(ICO.truck,'Vehicle No.',esc(x.sh.vehicle))
      +fieldCard(ICO.cal,'LR Date',esc(x.sh.lrDate)))
    +secHead('Sign-off')+docGridCards(
       fieldCard(ICO.user,'Prepared By',x.challan.blank?'':esc(x.preparedBy))
      +fieldCard(ICO.user,'F&A','')
      +fieldCard(ICO.user,'Authorized By',x.challan.blank?'':esc(x.preparedBy)));
  },
  asn:function(x){
    var none=!x.asns.length;x=blankDocs(x);
    return secHead('ASN Summary')+recTable(['ASN No.','Shipment No.','Advised Qty','QC Status','Gate Inward'],
      none?'<tr><td colspan="5" class="sc-sap-none">No ASN raised yet.</td></tr>'
      :x.asns.map(function(a){return '<tr><td><b>'+esc(a.no)+'</b></td><td>'+esc(x.ship&&x.ship.no?x.ship.no:'—')+'</td><td>'+a.qty+' '+esc(x.uom)+'</td>'
        +'<td>'+badge(a.qc==='QC Cleared'?'approved':'pending',a.qc)+'</td>'
        +'<td>'+badge(a.gateIn?'approved':'pending',a.gateIn?'Confirmed':'Pending')+'</td></tr>';}).join(''))
    +x.asns.map(function(a){
      return secHead(a.no||'ASN Details')+docGridCards(
         fieldCard(ICO.doc,'ASN No.',esc(a.no))
        +fieldCard(ICO.box,'Shipment No.',esc(x.ship&&x.ship.no?x.ship.no:''))
        +fieldCard(ICO.doc,'SCR No.',esc(x.scr))
        +fieldCard(ICO.cart,'PO No.',esc(x.po))
        +fieldCard(ICO.cube,'Advised Qty',a.blank?'':a.qty+' '+esc(x.uom))
        +fieldCard(ICO.check,'QC Status',a.blank?'':badge(a.qc==='QC Cleared'?'approved':'pending',a.qc))
        +fieldCard(ICO.shield,'Gate Inward',a.blank?'':badge(a.gateIn?'approved':'pending',a.gateIn?'Confirmed':'Pending')));
    }).join('');
  },
  imr:function(x){
    var none=!x.imrs.length;x=blankDocs(x);
    return secHead('IMR Summary')+recTable(['IMR No.','ASN No.','Receipt Qty','Status'],
      none?'<tr><td colspan="4" class="sc-sap-none">No IMR raised yet.</td></tr>'
      :x.imrs.map(function(m){return '<tr><td><b>'+esc(m.no)+'</b></td><td>'+esc(m.asnNo)+'</td><td>'+m.qty+' '+esc(x.uom)+'</td>'
        +'<td>'+badge(m.status==='Confirmed'?'approved':'created',m.status)+'</td></tr>';}).join(''))
    +x.imrs.map(function(m){
      return secHead(m.no||'IMR Details')+docGridCards(
         fieldCard(ICO.doc,'IMR No.',esc(m.no))
        +fieldCard(ICO.doc,'ASN No.',esc(m.asnNo))
        +fieldCard(ICO.box,'Shipment No.',esc(x.ship&&x.ship.no?x.ship.no:''))
        +fieldCard(ICO.doc,'SCR No.',esc(x.scr))
        +fieldCard(ICO.cart,'PO No.',esc(x.po))
        +fieldCard(ICO.cube,'Receipt Qty',m.blank?'':m.qty+' '+esc(x.uom))
        +fieldCard(ICO.globe,'Receiving Warehouse',m.blank?'':'Hazira Works')
        +fieldCard(ICO.check,'Status',m.blank?'':badge(m.status==='Confirmed'?'approved':'created',m.status)));
    }).join('');
  }
};

/* TAB TOOLBAR. Every tab that shows a record's details carries Edit and
   Expand at its top. Expand shows the whole tab in a wide popup. Edit is shown
   only to the role that owns the document, and only while it can still
   change - before the next role has acted on it; Super Admin can always edit
   while that window is open. */
var DETAIL_TABS=['details','shipment','deliverynote','challan','asn','imr','reference'];
var EDIT_OWNER={details:'Planner',shipment:'Planner',deliverynote:'Stores User',challan:'Finance / F&A / IDT',asn:'Vendor User',imr:'Stores User'};
function canEditTab(id,tab){
  var owner=EDIT_OWNER[tab];if(!owner)return false;
  if(state.role!==owner&&state.role!=='Super Admin')return false;
  if(id===LIVE_ID){
    if(tab==='details')return state.scr==='sent'||state.scr==='returned';
    if(tab==='shipment')return state.shipment==='created'&&!state.goodsIssue;
    if(tab==='deliverynote')return state.deliveryNote==='generated';
    if(tab==='challan')return state.challan==='generated';
    if(tab==='asn')return state.asns.some(function(a){return a.qc==='Created';});
    if(tab==='imr')return state.imrs.some(function(m){return m.status==='Created';});
    return false;
  }
  var d=sampleDeal(id);if(!d||d.rejected)return false;
  if(tab==='details')return d.stage==='scr';
  if(tab==='shipment')return d.stage==='shipment';
  if(tab==='deliverynote')return d.stage==='outbound'&&(!d.sub||d.sub==='dn');
  if(tab==='challan')return d.stage==='outbound'&&d.sub==='gate';
  if(tab==='asn')return d.stage==='asn'&&d.asns>0&&d.sub!=='gatein'&&d.sub!=='vendor';
  if(tab==='imr')return d.stage==='imr'&&d.imrs>0&&d.sub!=='create';
  return false;
}
/* THE TAB HEADER CARD - ADT's standard detail header (.hd-sb-hero): an icon
   box, the record's name, a dotted meta line, its status badge, and the
   solid Edit button. Edit shows only to the owning role while the record can
   still change (canEditTab); Expand sits beside it as an icon button. Every
   detail tab opens with one. */
function heroCard(o){
  return '<div class="hd-sb-hero sc-hero">'
    +'<div class="sc-hero-ico">'+o.icon+'</div>'
    +'<div class="hd-sb-hero-text"><div class="hd-sb-hero-name">'+esc(o.name)+'</div>'
      +'<div class="hd-sb-hero-meta">'+o.meta.filter(function(m){return m!==''&&m!=null;}).map(esc).join('<span class="hd-sb-dot">•</span>')+'</div></div>'
    +'<div class="hd-sb-hero-right"><span class="sc-tab-tools">'
      +(o.editing?'<span class="sc-editing-pill">'+ICO_EDIT+' '+(o.pill||'Editing')+'</span>'
        :(o.create?'<button class="lp-sb-view-edit-btn" type="button" onclick="'+o.create+'">'+ICO.plus+' '+esc(o.createLabel)+'</button>':'')
          +(o.edit?'<button class="lp-sb-view-edit-btn" type="button" onclick="'+o.edit+'">'+ICO_EDIT+' Edit</button>':'')
          +(state.expanded
            ?'<button class="sc-hero-expand" type="button" title="Collapse" aria-label="Collapse" onclick="scCollapsePanel()">'+ICO_COLLAPSE+'</button>'
            :'<button class="sc-hero-expand" type="button" title="Expand" aria-label="Expand" onclick="'+o.expand+'">'+ICO_EXPAND+'</button>'))
    +'</span></div>'
  +'</div>';
}
function heroFor(id,tab,editing){
  var x=dealDocs(id),live=id===LIVE_ID,d=live?null:sampleDeal(id);
  var label=(DEAL_TABS.filter(function(t){return t.id===tab;})[0]||{}).label||'Details';
  var o={expand:"scExpandTab('sc-deal-isb','"+esc(label+' · '+id).replace(/'/g,"\\'")+"')",
    edit:canEditTab(id,tab)?"scEditTab('"+id+"','"+tab+"')":''};
  var sum=function(list){return list.reduce(function(t,r){return t+(+r.qty||0);},0);};
  if(tab==='details'){
    var scr=live?scrLabel():sampleScr(d);
    o.icon=ICO.doc;o.name=live?L().title:d.title;o.meta=[id,live?L().base:d.base,x.vendor];o.badge=badge(scrToneOf(scr),scr);
  }else if(tab==='shipment'){
    o.icon=ICO.box;
    if(x.ship){o.name=x.ship.no;o.meta=[id,'PO '+x.po,'Created '+x.ship.date];}
    else{o.name='Shipment';o.meta=['Not created yet','The Planner creates it once the PO is approved'];}
  }else if(tab==='deliverynote'){
    o.icon=ICO.doc;
    if(!x.dn){o.name='Delivery Note';o.meta=['Not generated yet','Generated when Stores releases the goods'];}
    else{o.name=x.dn.no;o.meta=[x.ship?x.ship.no:'',x.dn.date];}
    if(x.dn)o.badge=badge(x.dn.approved?'approved':'created',x.dn.approved?'Approved':'Generated');
  }else if(tab==='challan'){
    o.icon=ICO.doc;
    if(!x.challan){o.name='Challan';o.meta=['Not generated yet','F&A generates it once the Delivery Note is approved'];}
    else{o.name=x.challan.no;o.meta=[x.dn?x.dn.no:'',x.challan.date];}
    if(x.challan)o.badge=badge(x.challan.status==='Generated'?'created':'approved',x.challan.status);
  }else if(tab==='asn'){
    var openA=x.asns.filter(function(a){return a.qc==='Created';}).length;
    o.icon=ICO.search||ICO.doc;o.name=x.asns.length+(x.asns.length===1?' ASN':' ASNs');
    o.meta=x.asns.length?[x.ship?x.ship.no:'','Advised '+sum(x.asns)+' '+x.uom]:['None yet','The vendor raises an ASN once the shipment is confirmed'];
    o.badge=openA?badge('pending',openA+' open with QC'):badge('approved','All cleared');
  }else if(tab==='imr'){
    var openI=x.imrs.filter(function(m){return m.status==='Created';}).length;
    o.icon=ICO.clipboard||ICO.doc;o.name=x.imrs.length+(x.imrs.length===1?' IMR':' IMRs');
    o.meta=x.imrs.length?['Received '+sum(x.imrs)+' '+x.uom]:['None yet','Stores raises an IMR against a gate-cleared ASN'];
    o.badge=openI?badge('created',openI+' to confirm'):badge('approved','All confirmed');
  }else if(tab==='reference'){
    var sap=sapRef(id);
    o.icon=ICO.refresh;o.name='SAP '+sap.prNo;o.meta=['Outbound','Created in OpenDhi, sent to SAP','Read '+sap.readAt];
  }
  /* the status lives in the fields below, so the card does not repeat it */
  o.badge='';o.editing=!!editing;
  /* the step that creates this tab's document, for the role that takes it */
  var mk={shipment:'Create Shipment',asn:'Create ASN',imr:'Create IMR'}[tab];
  if(mk&&!editing&&canCreate(id,mk)){
    /* filling in the step's details is an edit: ADT's standard Edit button
       (a create button only where Edit already belongs to an existing record) */
    if(!o.edit)o.edit="scGoCreate('"+id+"','"+mk+"')";
    else{o.create="scGoCreate('"+id+"','"+mk+"')";o.createLabel=mk;}
    if(isPrepared(id,mk))o.meta=['Details saved','Log '+mk+' from the Logs tab to create it'];
  }
  return heroCard(o);
}
/* Not on an empty state, which has nothing to edit or expand. */
function withTools(id,tab,body){
  if(DETAIL_TABS.indexOf(tab)<0||body.indexOf('class="sc-empty"')>=0)return body;
  if(isEditing(id,tab))return heroFor(id,tab,true)+editFormHTML(id,tab);
  var mk={shipment:'Create Shipment',asn:'Create ASN',imr:'Create IMR'}[tab];
  return heroFor(id,tab)+(mk?logReturnHTML('deal:'+id,mk):'')+body;
}
/* The PO panel Details: the same card, Expand only - a PO changes through its own steps. */
function poTools(no,body){
  var r=orderRows().filter(function(o){return o.no===no;})[0];if(!r)return body;
  var editing=isEditing('po:'+no,'details');
  return heroCard({icon:ICO.cart,name:'PO '+no,meta:[r.scrId,r.vendor],editing:editing,
    edit:canEditPO(no)?"scEditPO('"+no+"')":'',
    expand:"scExpandTab('sc-order-isb','PO Details · "+no+"')"})+(editing?poEditFormHTML(no):logReturnHTML('po:'+no,'Generate PO')+body);
}

/* ══ PO DETAILS, EDITED IN PLACE ═══════════════════════════════════════════
   The PO's commercial fields live here (not in the popup form): the Buyer -
   or Super Admin - edits them on the PO's Details tab while the PO is still
   Draft or Created. Save Changes only keeps them; a Draft PO is then sent for
   approval from its Logs tab (Send for Approval). "Open Purchase Order" and
   the Send for Approval step, before the details are saved, land here. */
var PO_EDITS={};
var PO_DEFAULTS={rc:'RC-123',sap:'',basis:'Per Piece',currency:'INR — Rupees',terms:'PT-122 — Payment within 7 Days',
  approver:'Gagan Tej',tax:'GST-05 — GST @ 5%'};
var PO_LABELS={rc:'Rate Contract',sap:'SAP SCR Reference ID',basis:'Price Basis',currency:'Currency',terms:'Payment Terms',
  approver:'PMG Approver',tax:'Tax Code'};
function poInfo(no){return Object.assign({},PO_DEFAULTS,PO_EDITS[no]||{});}
function poDealOf(no){return no===LIVE_PO?null:SAMPLE_DEALS.filter(function(x){return x.po&&x.po.no===no;})[0];}
function poStatusOf(no){if(no===LIVE_PO)return poLabel();var d=poDealOf(no);return d?d.po.status:'';}
function poPriceOf(no){if(no===LIVE_PO)return poPrice();var d=poDealOf(no);return d?d.item.price:0;}
/* The Purchase Order on a deal's Details: its number as a link to the PO,
   its status beside it - or a quiet "Not created yet". */
var ICO_OUT='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';
function poFieldValue(no,status){
  if(!no)return '<span class="sc-po-none">Not created yet</span>';
  return '<span class="sc-po-val"><button type="button" class="sc-po-link" title="Open PO '+esc(no)+'" onclick="scGoPODetails(\''+esc(no)+'\')">'
    +esc(no)+ICO_OUT+'</button>'+badge(poToneOf(status),status)+'</span>';
}
function poNoOf(dealId){return dealId===LIVE_ID?LIVE_PO:((sampleDeal(dealId)||{}).po||{}).no;}
function canEditPO(no){
  if(state.role!=='Buyer'&&state.role!=='Super Admin')return false;
  var st=poStatusOf(no);return st==='Draft'||st==='Created';
}
function scEditPO(no){
  if(!canEditPO(no))return;
  var v=poInfo(no);v.price=String(poPriceOf(no));
  state.edit={id:'po:'+no,tab:'details',vals:v,dirty:false};
  state.orderTab='details';scRender();
}
function poEditFormHTML(no){
  var e=state.edit,d=poDealOf(no),draft=poStatusOf(no)==='Draft';
  var sel=function(k,opts){var v=e.vals[k]||'';if(v&&opts.indexOf(v)<0)opts=[v].concat(opts);
    return '<div class="ep-form-group"><label class="ep-form-label">'+esc(PO_LABELS[k])+'</label>'+csField('ed-'+k,opts,v,'Select','scEditPick')+'</div>';};
  var ro=function(label,v,full){return '<div class="ep-form-group'+(full?' ep-form-full':'')+'"><label class="ep-form-label">'+esc(label)
    +' <span class="sc-sys">System generated</span></label><div class="sc-ro">'+esc(v)+'</div></div>';};
  var vendor=d?d.vendor.code+' — '+d.vendor.name:'21005 — Sri Venkateswara Aerospace Pvt.ltd';
  return '<div class="sc-edit-card"><div class="policy-form-grid">'
      +ro('PO No.',no)+ro('SCR No.',d?d.id:LIVE_ID)+ro('Vendor / Sub-Contractor',vendor,true)
      +sel('rc',['RC-123','RC-131'])
      +'<div class="ep-form-group"><label class="ep-form-label">'+esc(PO_LABELS.sap)+'</label>'
        +'<input class="ep-form-input" value="'+esc(e.vals.sap||'')+'" placeholder="Optional" oninput="scEditInput(\'sap\',this.value)"></div>'
      +sel('basis',['Per Piece','Per Lot'])+sel('currency',['INR — Rupees'])
      +sel('terms',['PT-122 — Payment within 7 Days','PT-130 — Payment within 30 Days'])
      +sel('approver',['Gagan Tej','Ritesh Nair'])+sel('tax',['GST-05 — GST @ 5%','GST-18 — GST @ 18%'])
      +'<div class="ep-form-group"><label class="ep-form-label">Price / Unit <span class="req">*</span></label>'
        +'<input class="ep-form-input" type="number" min="0" step="0.01" value="'+esc(e.vals.price||'')+'" oninput="scEditInput(\'price\',this.value)"></div>'
    +'</div>'
    +'<div class="sc-edit-actions"><button class="btn-outline" onclick="scCancelEdit()">Cancel</button>'
      +'<button class="btn-primary" onclick="scSavePO(false)">Save Changes</button>'
    +'</div></div>';
}
function scSavePO(generate){
  var e=state.edit;if(!e||e.id.indexOf('po:')!==0)return;
  var no=e.id.slice(3),d=poDealOf(no),dealId=d?d.id:LIVE_ID;
  if(!canEditPO(no)){state.edit=null;scRender();return;}
  var price=parseFloat(e.vals.price);
  if(!(price>0)){scToast('Enter the price per unit','error');return;}
  var after={};
  Object.keys(PO_DEFAULTS).forEach(function(k){after[k]=String(e.vals[k]==null?'':e.vals[k]).trim();});
  PO_EDITS[no]=after;
  if(d)d.item.price=price;else state.poPrice=price;
  /* saved only - a Draft PO is sent for approval from its Logs tab */
  state.edit=null;
  if(scBackToLog('po:'+no,'Generate PO'))return;
  scToast('PO '+no+' details saved','success',poStatusOf(no)==='Draft'?'Go to the PO\'s Logs and Send for Approval.':'');
  scRender();
}
/* Open a PO's Details tab - in edit mode when this role may edit it. */
function scGoPODetails(no){
  if(!no)return;
  state.page='orders';state.stageFilter=null;state.stageLabel='';state.orderPage=1;
  state.orderFilter={q:'',status:'',buyer:''};
  state.dealOpen=false;state.orderOpen=true;state.orderSel=no;state.orderTab='details';
  state.edit=null;
  if(canEditPO(no)){var v=poInfo(no);v.price=String(poPriceOf(no));state.edit={id:'po:'+no,tab:'details',vals:v,dirty:false};}
  scRender();
}
/* EXPAND. The open panel itself is lifted into a large centred window - the
   live panel, not a copy - so its tab row, Logs actions, Edit and every other
   control keep working, and switching tabs happens inside the expanded view.
   Collapse (the same icon, Esc or a click outside) puts
   it back at the side. Closing the panel or leaving the page collapses it. */
/* THE EXPANDED HEADER. In the expanded window the record leads: its ID and
   current status, a line of what it is (title, vendor, who has it), and the
   window's Collapse and Close - then the tabs below. Drawn with every panel
   and shown only while expanded (CSS), so it is always current. */
function expHeadHTML(){
  var ico,name,badgeH,meta;
  if(state.page==='orders'){
    var o=orderRows().filter(function(x){return x.no===state.orderSel;})[0];if(!o)return '';
    ico=ICO.cart;name='PO '+o.no;badgeH=badge(poToneOf(o.status),o.status);meta=[o.scrId,o.title,o.vendor];
  }else{
    var r=dealRows().filter(function(x){return x.id===state.dealSel;})[0];if(!r)return '';
    ico=ICO.doc;name=r.id;badgeH=badge(rampTone(r.cur),r.cur);
    meta=[r.title,r.vendor,r.pending&&r.pending!=='—'?'Pending with '+r.pending:''];
  }
  var closer=state.page==='orders'?'scCloseOrder':'scCloseDeal';
  return '<div class="sc-exp-head"><div class="sc-exp-ico">'+ico+'</div>'
    +'<div class="sc-exp-text"><div class="sc-exp-title"><span>'+esc(name)+'</span>'+badgeH+'</div>'
      +'<div class="sc-exp-meta">'+meta.filter(Boolean).map(esc).join('<span class="hd-sb-dot">•</span>')+'</div></div>'
    +'<div class="sc-exp-actions">'
      +'<button class="sc-exp-btn" type="button" title="Collapse" aria-label="Collapse" onclick="scCollapsePanel()">'+ICO_COLLAPSE+'</button>'
      +'<button class="lp-isb-close" type="button" title="Close" aria-label="Close" onclick="'+closer+'()">'+ICO.close+'</button>'
    +'</div></div>';
}
function scExpandTab(){setExpanded(true);}
function scCollapsePanel(){setExpanded(false);}
function setExpanded(on){
  state.expanded=!!on;
  applyExpanded();
  if(on)['sc-deal-sb','sc-order-sb','sc-gl-sb'].forEach(function(id){
    var sb=document.getElementById(id);if(!sb||!sb.classList.contains('sc-expanded'))return;
    sb.classList.add('sc-expand-anim');setTimeout(function(){sb.classList.remove('sc-expand-anim');},260);
  });
  /* redraw the open tab so its header shows Collapse instead of Expand */
  if(state.page==='deals'&&state.dealOpen)refreshPanel('sc-deal-isb',dealPanelHTML());
  if(state.page==='orders'&&state.orderOpen)refreshPanel('sc-order-isb',orderPanelHTML());
  if(GL[state.page]&&state.glOpen)refreshPanel('sc-gl-isb',glPanelHTML(state.page));
}
function applyExpanded(){
  ['sc-deal-sb','sc-order-sb','sc-gl-sb'].forEach(function(id){
    var sb=document.getElementById(id);
    if(sb)sb.classList.toggle('sc-expanded',state.expanded&&sb.classList.contains('open'));
  });
  var bd=document.getElementById('sc-expand-bd');
  if(state.expanded&&!bd){
    bd=document.createElement('div');bd.id='sc-expand-bd';bd.className='sc-expand-backdrop';
    bd.addEventListener('click',scCollapsePanel);
    document.body.appendChild(bd);
  }else if(!state.expanded&&bd)bd.remove();
}
/* EDITING IN THE TAB. Edit turns the tab's field cards into a form card in
   place - the header card says "Editing", read-only fields stay as grey boxes
   marked System generated, and Cancel / Save Changes close it. The draft
   lives in state.edit, so leaving the tab keeps it: that tab then carries a
   dot until the changes are saved or cancelled. */
function isEditing(id,tab){return !!(state.edit&&state.edit.id===id&&state.edit.tab===tab);}
function editStartVals(id,tab){
  var x=dealDocs(id),live=id===LIVE_ID,d=live?null:sampleDeal(id),vals={};
  if(tab==='details'){
    var o=live?L():d;
    vals={title:o.title,base:o.base,nature:live?o.nature:d.workType,buyer:o.buyer,qty:String(o.item.qty),price:String(o.item.price)};
    if(live){vals.remarks=o.remarks||'';vals.head=o.headText||'';}
  }else if(tab==='shipment'){
    Object.keys(SHIP_DEFAULTS).forEach(function(k){vals[k]=x.sh[k];});
    vals.ret=isoOf(x.sh.ret);vals.lrDate=isoOf(x.sh.lrDate);
  }else if(tab==='deliverynote')vals={ref:x.dnInfo.ref,remarks:x.dnInfo.remarks};
  else if(tab==='challan')vals={nature:x.chInfo.nature,ref:x.chInfo.ref};
  else if(tab==='asn')x.asns.forEach(function(a,i){if(a.qc==='Created')vals['asn'+i]=String(a.qty);});
  else if(tab==='imr')x.imrs.forEach(function(m,i){if(m.status==='Created')vals['imr'+i]=String(m.qty);});
  return vals;
}
/* CREATE MODE. Create Shipment / ASN / IMR open their tab with the fields to
   fill; the button that saves is named after the step and runs it. */
function scGoCreate(id,action){
  var tab=CREATE_TAB[action];if(!tab)return;
  /* the start values read the Logs step first - an IMR opened from an ASN's card starts on that ASN */
  var vals=createStartVals(id,action);
  state.page='deals';state.orderOpen=false;state.dealOpen=true;state.dealSel=id;state.dealTab=tab;state.logAdd=null;
  state.edit={id:id,tab:tab,vals:vals,dirty:false,create:action};
  scRender();
}
function canCreate(id,action){return rowAvailable(id).indexOf(action)>=0;}
function createStartVals(id,action){
  if(PREPARED[prepKey(id,action)])return Object.assign({},PREPARED[prepKey(id,action)]);
  var live=id===LIVE_ID,d=live?null:sampleDeal(id),x=dealDocs(id),v={};
  if(action==='Create Shipment'){
    Object.keys(SHIP_DEFAULTS).forEach(function(k){v[k]=SHIP_DEFAULTS[k];});
    v.ret=isoOf(SHIP_DEFAULTS.ret);v.lrDate=isoOf(SHIP_DEFAULTS.lrDate);
  }else if(action==='Create ASN'){
    var open=live?openASNQty():(ensureRx(d)?rxOpen(d):d.item.qty);
    v={qty:String(live?Math.min(6,open):open),inv:'INV-'+(8891+x.asns.length),date:isoOf(stamp().date),vehicle:SHIP_DEFAULTS.vehicle};
  }else if(action==='Create IMR'){
    var el=imrEligible(id),la=state.logAdd,m=la&&la.action==='Create IMR'&&/^asn:(\d+)$/.exec(la.target||'');
    var sdr=id===LIVE_ID?null:sampleDeal(id);
    var pref=!m?'':id===LIVE_ID?(state.asns[+m[1]]?state.asns[+m[1]].no:''):(sdr&&sdr.rx?rxNo(sdr,'asn',+m[1]):'');
    var pick=el.filter(function(z){return z.no===pref;})[0]||el[0];
    v={asn:pick?pick.no:'',qty:pick?String(pick.avail):'',date:isoOf(stamp().date)};
  }
  return v;
}
/* ASNs an IMR can be raised against, with what is still available on each */
function imrEligible(id){
  if(id===LIVE_ID)return eligibleASNs().map(function(a){return {no:a.no,avail:availableForIMR(a.index),index:a.index};});
  var sd=sampleDeal(id);
  if(sd&&ensureRx(sd))return sd.rx.asns.map(function(a,i){return {no:rxNo(sd,'asn',i),avail:rxAvail(sd,i),index:i,ok:a.qc==='QC Cleared'&&a.gateIn};})
    .filter(function(a){return a.ok&&a.avail>0;});
  var x=dealDocs(id);var last=x.asns[x.asns.length-1];
  return last?[{no:last.no,avail:last.qty,index:x.asns.length-1}]:[];
}
function createSchema(id,tab,x){
  var F=[],live=id===LIVE_ID;
  var ro=function(label,v,full){F.push({ro:true,label:label,v:v,full:full});};
  var ed=function(k,label,type,opts,full,req){F.push({k:k,label:label,type:type,opts:opts,full:full,req:req});};
  if(tab==='shipment'){
    ro('SCR No.',id);ro('PO No.',x.po);
    ed('dna','Delivery Note Approver','select',['Chandra Mohan','Anita Desai'],false,true);
    ed('challanType','Challan Type','select',['Production Material Challan','Job Work Challan'],false,true);
    ed('logistics','Logistics Required','select',['Yes','No']);ed('ret','Expected Return','date',null,false,true);
    ed('pkg','Package Type / Details','text');ed('pkgNo','Number of Packages','number');
    ed('weight','Package Weight ('+x.uom+')','number');ed('mode','Mode of Dispatch','select',['Road Transport','Rail','Air']);
    ed('transporter','Transporter','text');ed('vehicle','Vehicle No.','text');ed('driver','Driver Details','text');
    ed('lrNo','LR / Transport Reference No.','text');ed('lrDate','LR / Transport Date','date');
    ed('insurance','Insurance Applicable','select',['Yes','No']);ed('insuredBy','Insured By / Insurance Details','text');
    ed('contact','Loading / Unloading Contact','text');
  }else if(tab==='asn'){
    ro('Shipment No.',x.ship?x.ship.no:'—');ro('Open ASN Qty',(live?openASNQty():'—')+' '+x.uom);
    ed('qty','Advised Qty ('+x.uom+')','number',null,false,true);ed('inv','Vendor Invoice No.','text');
    ed('date','Dispatch Date','date');ed('vehicle','Vehicle No.','text');
  }else if(tab==='imr'){
    var el=imrEligible(id);
    ed('asn','ASN','select',el.map(function(a){return a.no;}),false,true);
    ro('Available for Receipt',(el[0]?el[0].avail:0)+' '+x.uom);
    ed('qty','Receipt Qty ('+x.uom+')','number',null,false,true);ed('date','Receipt Date','date');
  }
  return F;
}
/* Save in create mode: check the details and keep them. Nothing is created
   and nothing is logged until the step is logged from Logs (runCreate). */
function scCreateFromTab(e){
  var id=e.id,action=e.create,v=e.vals,live=id===LIVE_ID;
  if(!canCreate(id,action)){state.edit=null;scRender();return;}
  if(action==='Create Shipment'){
    if(!v.dna||!v.ret){scToast('Delivery Note Approver and Expected Return are required','error');return;}
  }else if(action==='Create ASN'){
    var q=parseInt(v.qty,10);
    var sdq=live?null:sampleDeal(id),openQ=live?openASNQty():(sdq&&ensureRx(sdq)?rxOpen(sdq):Infinity);
    if(q>openQ){scToast('Advised Qty cannot exceed the Open ASN Qty','error');return;}
    if(!(q>0)){scToast('Enter the Advised Qty','error');return;}
  }else if(action==='Create IMR'){
    var el=imrEligible(id),a=el.filter(function(z){return z.no===v.asn;})[0],qi=parseInt(v.qty,10);
    if(!a){scToast('Select the ASN','error');return;}
    if(!(qi>0)||qi>a.avail){scToast('Receipt Qty cannot exceed the available ASN Qty','error');return;}
  }
  PREPARED[prepKey(id,action)]=Object.assign({},v);
  state.edit=null;
  if(scBackToLog('deal:'+id,action))return;
  scRender();
  scToast(action.replace('Create ','')+' details saved','success','Go to Logs and log '+action+' to create it.');
}
/* SAVED IN THE MIDDLE OF A LOG. When the form was opened from a held Logs
   card ("Click here to fill the details"), Save keeps the user on the tab and
   the tab then offers "Click here to complete the log" (logReturnHTML). That
   link goes back to the card, which confirms the save for 1.2 seconds and
   then lets the step be logged. A save from the tab's own Edit, outside that
   flow, shows no link. */
var scSavedTimer=null;
function scBackToLog(key,action){
  var la=state.logAdd;
  if(!la||la.key!==key||la.action!==action||!la.fromFill)return false;
  la.ready=true;
  scRender();
  scToast('Details saved','success','Complete the log when you are ready.');
  return true;
}
function logReturnHTML(key,action){
  var la=state.logAdd;
  if(!la||la.key!==key||la.action!==action||!la.ready)return '';
  return '<button type="button" class="sc-logadd-need sc-log-return" onclick="scLogComplete()">'
    +'<span class="sc-logadd-need-ico">'+ICO.info+'</span><span class="sc-logadd-need-link">Click here to complete the log</span></button>';
}
function scLogComplete(){
  var la=state.logAdd;if(!la||!la.ready)return;
  delete la.ready;delete la.fromFill;
  if(la.key.indexOf('po:')===0)state.orderTab='logs';else state.dealTab='logs';
  la.saved=true;
  scRender();
  clearTimeout(scSavedTimer);
  scSavedTimer=setTimeout(function(){
    var el=document.querySelector('.sc-logadd-saved');
    if(el)el.classList.add('is-leaving');
    scSavedTimer=setTimeout(function(){scLogSaved(la);},260);
  },940);   // + .26s fade-out = 1.2s
}
function scLogSaved(la){
  if(state.logAdd!==la)return;
  delete la.saved;scRefreshPanel();
  var f=document.querySelector('.sc-logadd textarea');if(f&&f.offsetParent!==null)f.focus();
}
/* The step logged from Logs: build the document from the saved details. */
function runCreate(id,action,comment){
  var v=PREPARED[prepKey(id,action)];
  if(!v){scToast('Save the details in the '+action.replace('Create ','')+' tab first','error');return;}
  var live=id===LIVE_ID,d=live?null:sampleDeal(id),ed=docEdits(id),note=comment?' — '+comment:'';
  delete PREPARED[prepKey(id,action)];
  if(action==='Create Shipment'){
    Object.keys(SHIP_DEFAULTS).forEach(function(k){if(k!=='ret'&&k!=='lrDate')ed.ship[k]=String(v[k]==null?'':v[k]).trim();});
    ed.ship.ret=fromIso(v.ret)||SHIP_DEFAULTS.ret;ed.ship.lrDate=fromIso(v.lrDate)||'';
    if(live){
      state.shipment='created';state.outboundKey=true;state.transferOrder=true;
      addDealLog('Shipment Created','Shipment ID SHP-2026-035307'+note);
      addDealLog('Outbound Key Generated','Outbound Key OBK/26/0152 generated automatically.');
      addDealLog('Transfer Order Generated','Transfer Order TO/26/0152 generated automatically.');
      scToast('Shipment SHP-2026-035307 created','success','Outbound Key and Transfer Order generated.');
    }else advanceSample(d,'Create Shipment',comment||'Shipment created.');
  }else if(action==='Create ASN'){
    var q=parseInt(v.qty,10);
    if(!live&&ensureRx(d)){
      d.rx.asns.push({qty:q,qc:'Created',gateIn:false});
      var an=rxNo(d,'asn',d.rx.asns.length-1);
      rxLog(d,'ASN Created',an+' — Advised Qty '+q+note);rxSync(d);
      scToast(an+' created','success','Advised Qty '+q+'. Pending QC clearance.');
    }else if(live){
      var no='ASN-'+String(state.asns.length+1).padStart(3,'0');
      state.asns.push({no:no,qty:q,qc:'Created',gateIn:false});
      addDealLog('ASN Created',no+' — Advised Qty '+q+note);
      scToast(no+' created','success','Advised Qty '+q+'. Pending QC clearance.');
    }else{advanceSample(d,'Create ASN','Advised Qty '+q+note);ed.asnQty[d.asns-1]=q;}
  }else if(action==='Create IMR'){
    var qi=parseInt(v.qty,10);
    if(!live&&ensureRx(d)){
      var ai=Math.max(0,+String(v.asn).split('-').pop()-1);
      d.rx.imrs.push({asn:ai,qty:qi,status:'Created'});
      var inn=rxNo(d,'imr',d.rx.imrs.length-1);
      rxLog(d,'IMR Created',inn+' against '+v.asn+' — Qty '+qi+note);rxSync(d);
      scToast(inn+' created','success','Receipt Qty '+qi+' against '+v.asn+'.');
    }else if(live){
      var imrNo='IMR-'+String(state.imrs.length+1).padStart(3,'0');
      state.imrs.push({no:imrNo,asnNo:v.asn,qty:qi,status:'Created'});
      addDealLog('IMR Created',imrNo+' against '+v.asn+' — Qty '+qi+note);
      scToast(imrNo+' created','success','Receipt Qty '+qi+' against '+v.asn+'.');
    }else{advanceSample(d,'Create IMR','Receipt Qty '+qi+' against '+v.asn+note);ed.imrQty[d.imrs-1]=qi;}
  }
}
function scEditTab(id,tab){
  if(!canEditTab(id,tab))return;
  if(state.edit&&state.edit.dirty&&!isEditing(id,tab)&&!window.confirm('Discard the unsaved changes on the other tab?'))return;
  state.edit={id:id,tab:tab,vals:editStartVals(id,tab),dirty:false};
  if(state.dealTab!==tab)state.dealTab=tab;
  scRender();
}
function scEditInput(k,v){if(!state.edit)return;state.edit.vals[k]=v;state.edit.dirty=true;}
function scEditPick(v,csid){scEditInput(csid.replace(/^ed-/,''),v);}
function scCancelEdit(){state.edit=null;scRender();}
/* leaving the deal (closing the panel, or opening another) drops the draft - after asking, when there is one */
function editGuard(){
  if(!state.edit)return true;
  if(state.edit.dirty&&!window.confirm('Discard the unsaved changes?'))return false;
  state.edit=null;return true;
}
/* The form, field by field: [key, label, type, options/value, full width]. */
function editSchema(id,tab,x){
  var live=id===LIVE_ID,F=[];
  var ro=function(label,v,full){F.push({ro:true,label:label,v:v,full:full});};
  var ed=function(k,label,type,opts,full){F.push({k:k,label:label,type:type,opts:opts,full:full});};
  if(tab==='details'){
    ro('SCR No.',id);ed('title','SCR Title','text');
    ed('base','SCR Base','select',['Production Order','Project','Maintenance Order']);ed('nature','Nature of SCR / Work Type','text');
    ed('buyer','Buyer','select',['Madan Mohan','Gagan Tej']);ro('Vendor / Subcontractor',x.vcode+' — '+x.vendor);
    ed('qty','Expected Qty','number');ed('price','Est. Price / Unit','number');
    if(live){ed('remarks','Comment','textarea',null,true);ed('head','Header Text','textarea',null,true);}
  }else if(tab==='shipment'){
    ro('Shipment ID',x.ship.no);ro('PO No.',x.po);
    ed('dna','Delivery Note Approver','select',['Chandra Mohan','Anita Desai']);ed('challanType','Challan Type','select',['Production Material Challan','Job Work Challan']);
    ed('logistics','Logistics Required','select',['Yes','No']);ed('ret','Expected Return','date');
    ed('pkg','Package Type / Details','text');ed('pkgNo','Number of Packages','number');
    ed('weight','Package Weight ('+x.uom+')','number');ed('mode','Mode of Dispatch','select',['Road Transport','Rail','Air']);
    ed('transporter','Transporter','text');ed('vehicle','Vehicle No.','text');ed('driver','Driver Details','text');
    ed('lrNo','LR / Transport Reference No.','text');ed('lrDate','LR / Transport Date','date');
    ed('insurance','Insurance Applicable','select',['Yes','No']);ed('insuredBy','Insured By / Insurance Details','text');
    ed('contact','Loading / Unloading Contact','text');
  }else if(tab==='deliverynote'){
    ro('Delivery Note No.',x.dn.no);ro('Shipment No.',x.ship?x.ship.no:'—');
    ed('ref','Your / Our Reference','text',null,true);ed('remarks','Comment','textarea',null,true);
  }else if(tab==='challan'){
    ro('Challan No.',x.challan.no);ro('Delivery Note No.',x.dn?x.dn.no:'—');
    ed('nature','Nature / Reason','select',['Job Work · Billable','Job Work · Non-billable','Repair']);ed('ref','Your / Our Reference','text');
  }else if(tab==='asn'){
    x.asns.forEach(function(a,i){if(a.qc!=='Created')return;ro('ASN No.',a.no);ed('asn'+i,'Advised Qty ('+x.uom+')','number');});
  }else if(tab==='imr'){
    x.imrs.forEach(function(m,i){if(m.status!=='Created')return;ro('IMR No.',m.no);ed('imr'+i,'Receipt Qty ('+x.uom+')','number');});
  }
  return F;
}
function editFormHTML(id,tab){
  var e=state.edit,x=dealDocs(id);
  var cells=(e.create?createSchema(id,tab,x):editSchema(id,tab,x)).map(function(f){
    var cls='ep-form-group'+(f.full?' ep-form-full':'');
    if(f.ro)return '<div class="'+cls+'"><label class="ep-form-label">'+esc(f.label)+' <span class="sc-sys">System generated</span></label>'
      +'<div class="sc-ro">'+esc(f.v)+'</div></div>';
    var v=e.vals[f.k]==null?'':e.vals[f.k],ctl;
    if(f.type==='select')ctl=csField('ed-'+f.k,f.opts.indexOf(v)<0&&v?[v].concat(f.opts):f.opts,v,'Select','scEditPick');
    else if(f.type==='textarea')ctl='<textarea class="ep-form-input" oninput="scEditInput(\''+f.k+'\',this.value)">'+esc(v)+'</textarea>';
    else ctl='<input class="ep-form-input" type="'+f.type+'" value="'+esc(v)+'" oninput="scEditInput(\''+f.k+'\',this.value)">';
    return '<div class="'+cls+'"><label class="ep-form-label">'+esc(f.label)+(f.req?' <span class="req">*</span>':'')+'</label>'+ctl+'</div>';
  }).join('');
  if(e.create)return '<div class="sc-edit-card"><div class="policy-form-grid">'+cells+'</div>'
    +'<div class="sc-edit-actions"><button class="btn-outline" onclick="scCancelEdit()">Cancel</button>'
    +'<button class="btn-primary" onclick="scSaveEdit(false)">Save Changes</button></div></div>';
  var returned=tab==='details'&&(id===LIVE_ID?state.scr==='returned':!!(sampleDeal(id)||{}).returned);
  return (returned?returnNoteHTML(id,true):'')
    +'<div class="sc-edit-card"><div class="policy-form-grid">'+cells+'</div>'
    +'<div class="sc-edit-actions"><button class="btn-outline" onclick="scCancelEdit()">Cancel</button>'
      +'<button class="btn-primary" onclick="scSaveEdit(false)">Save Changes</button>'
    +'</div></div>';
}
function scSaveEdit(submit){
  var e=state.edit;if(!e)return;
  if(e.create){scCreateFromTab(e);return;}
  if(!canEditTab(e.id,e.tab)){state.edit=null;scRender();return;}
  if(e.tab==='details'){
    var map={'f-title':'title','f-base':'base','f-nature':'nature','f-buyer':'buyer','f-remarks':'remarks','f-headtext':'head','r1-qty':'qty','r1-price':'price'};
    scResubmitSCR(e.id,submit,function(k){var m=map[k];return m?String(e.vals[m]==null?'':e.vals[m]).trim():'';},true);
    return;
  }
  scSaveDocEdit(e.id,e.tab);
}

/* EDITING A DOCUMENT. One popup per document with just the fields its owner
   may change; Save writes them to the deal, the tab and the printable
   documents read them back. No log is written - History records each field. */
function isoOf(str){
  var d=new Date(str);if(isNaN(d))return '';
  return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);
}
function fromIso(v){
  var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(v||'');return m?fmtDate(new Date(+m[1],+m[2]-1,+m[3])):'';
}
function scSaveDocEdit(id,tab){
  if(!canEditTab(id,tab)){state.edit=null;scRender();return;}
  var e=docEdits(id),x=dealDocs(id);
  var ev=(state.edit&&state.edit.vals)||{};
  var v=function(k){return String(ev[k]==null?'':ev[k]).trim();};
  var status='',bad=false;
  if(tab==='shipment'){
    ['dna','challanType','logistics','pkg','pkgNo','weight','mode','transporter','vehicle','driver','lrNo','insurance','insuredBy','contact']
      .forEach(function(k){e.ship[k]=v(k);});
    e.ship.ret=fromIso(v('ret'))||x.sh.ret;e.ship.lrDate=fromIso(v('lrDate'))||x.sh.lrDate;
    status='Shipment Updated';
  }else if(tab==='deliverynote'){e.dn.ref=v('ref');e.dn.remarks=v('remarks');status='Delivery Note Updated';}
  else if(tab==='challan'){e.ch.nature=v('nature');e.ch.ref=v('ref');status='Challan Updated';}
  else if(tab==='asn'||tab==='imr'){
    var list=tab==='asn'?x.asns:x.imrs;
    list.forEach(function(r,i){
      if(tab==='asn'?r.qc!=='Created':r.status!=='Created')return;
      var q=parseInt(v(tab+i),10);if(!(q>0)){bad=true;return;}
      if(id===LIVE_ID){
        var arr=tab==='asn'?state.asns:state.imrs,k=arr.findIndex(function(z){return z.no===r.no;});
        if(k>=0)arr[k].qty=q;
      }else (tab==='asn'?e.asnQty:e.imrQty)[i]=q;
    });
    if(bad){scToast('Enter a quantity above zero','error');return;}
    status=tab==='asn'?'ASN Updated':'IMR Updated';
  }
  state.edit=null;scRender();
  scToast(status.replace(' Updated','')+' updated','success');
}
/* Shipment field labels, as History names them. */
var SHIP_LABELS={dna:'Delivery Note Approver',challanType:'Challan Type',logistics:'Logistics Required',ret:'Expected Return',
  pkg:'Package Type',pkgNo:'No. of Packages',weight:'Package Weight',mode:'Mode of Dispatch',transporter:'Transporter',
  vehicle:'Vehicle No.',driver:'Driver Details',lrNo:'LR / Transport Reference No.',lrDate:'LR / Transport Date',
  insurance:'Insurance Applicable',insuredBy:'Insured By',contact:'Loading / Unloading Contact'};
function dealDetailsHTML(){
  /* 20px under a group, as on Payroll — the gap is what separates two grids of
     identical cards into two readable groups. */
  var g=function(cards){return '<div class="lp-sb-detail-grid" style="margin-bottom:20px">'+cards+'</div>';};
  var head=g(
     fieldCard(ICO.hash,'SCR No.',LIVE_ID)
    +fieldCard(ICO.check,'Status',badge(scrTone(),scrLabel()))
    +fieldCard(ICO.doc,'SCR Title',L().title)
    +fieldCard(ICO.tag,'SCR Base',esc(L().base))
    +fieldCard(ICO.tag,'Nature of SCR / Work Type',esc(L().nature))
    +fieldCard(ICO.globe,'Purchase Office','PUR-121 — Manufacturing Procurement')
    +fieldCard(ICO.check,'SCR Unpeg','Yes')
    +fieldCard(ICO.check,'Inter-Unit','No')
    +fieldCard(ICO.check,'Partial Material as FIM','Yes')
    +fieldCard(ICO.check,'Billable','Yes')
    +fieldCard(ICO.truck,'Logistics Required','Yes')
    +fieldCard(ICO.user,'Planner','Kinjal Sisodiya')
    +fieldCard(ICO.user,'Buyer',esc(L().buyer))
    +fieldCard(ICO.user,'Approver','PMG Approver')
    +fieldCard(ICO.cart,'Purchase Order',state.po!=='none'?poFieldValue(LIVE_PO,poLabel()):poFieldValue('',''))
    +fieldCard(ICO.doc,'Comment',esc(L().remarks))
    +fieldCard(ICO.doc,'Header Text',esc(L().headText),true)
  );
  var base=g(
     fieldCard(ICO.clipboard,'Production Order','PO-100045 — Shaft Machining')
    +fieldCard(ICO.cube,'Project Element','Structural Fabrication')
    +fieldCard(ICO.tag,'Activity / Cost Object','Machining Activity')
  );
  var vendor=g(
     fieldCard(ICO.handshake,'Vendor / Subcontractor','21005 — Sri Venkateswara Aerospace Pvt.ltd')
    +fieldCard(ICO.globe,'Vendor Address','Hyderabad, Telangana 500084')
    +fieldCard(ICO.doc,'Rate Contract','RC-123')
    +fieldCard(ICO.tag,'Required Skill / Service','Machining Services')
  );

  var recv=recTable(
    ['Receivable Item','Item Type','Expected Qty','UOM','Est. Price / Unit','Receiving Warehouse','HSN','Expected Receipt','Received','Open'],
    '<tr><td><b>'+esc(L().item.name)+'</b></td><td>Finished Product</td><td>'+L().item.qty+'</td><td>Each</td><td>'+fmtAmt(L().item.price)+'</td>'
    +'<td>Hazira Works</td><td>0202</td><td>'+esc(L().item.date)+'</td><td>'+confirmedReceived()+'</td><td>'+openReceiptQty()+'</td>'
    +'</tr>');

  var issues=[
    ['SKU_52297_3814 — Mild Steel Plate 10 mm','Zone A','0202'],
    ['SKU_52288_3814 — Carbon Steel Billet','Zone B','0206'],
    ['SKU_52287_3814 — Alloy Steel Forging Block','Zone C','0203']
  ].map(function(r){
    return '<tr><td>'+esc(L().item.name)+'</td><td><b>'+r[0]+'</b></td><td>Raw Material</td><td>'+L().item.qty+'</td><td>Each</td>'
      +'<td>Hazira Works</td><td>Main Store</td><td>'+r[1]+'</td><td>Yes</td><td>GST-05</td><td>'+r[2]+'</td><td>1:1</td></tr>';
  }).join('');
  var issue=recTable(['For Receivable Item','Issue Item','Item Type','Issue Qty','UOM','Warehouse','Storage Location','Storage Zone','FIM','Tax Code','HSN','BOM Ratio'],issues);

  return (state.scr==='returned'?returnNoteHTML(LIVE_ID):'')+secHead('SCR Header Details')+head
    +secHead('SCR Base Details')+base
    +secHead('Vendor Details')+vendor
    +tableHead('Receivable Item Details')+recv
    +tableHead('Issue Item Details')+issue;
}

/* ── WORKFLOW ─────────────────────────────────────────────────────────────
   THE SAME CARD EVERY WORKFLOW TAB IN ADT RENDERS. wfTimelineHTML() in
   pages.js fixes the anatomy: title, a meta row of who and when, a
   "Comment:" line, one dot, and an optional footer for whatever that stage
   has to open. This module reproduces it exactly rather than adding a second
   workflow card to the app.

   WHERE THE STATE WENT. An earlier version of this tab put a status badge in
   each card head and coloured the dot per stage. Both were shapes ADT does not
   have — its timeline is one blue dot the whole way down. The state is still
   on screen, in the two places ADT itself puts it: appended to the stage title
   the way the generic panel writes "Current Status — Active", and in the
   Description line. Nothing is lost and no new component is introduced. */
function wfMeta(l){return {user:l.by,date:l.date,time:fmtTime(l.time)};}
function wfRow(title,meta,description,actions,isLast,kind){
  var pSvg='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  var cSvg='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
  var chip=kind==='current'?'<span class="sc-wf-chip is-now">In progress</span>':'';
  return '<div class="lp-wf-row'+(kind?' is-'+kind:'')+'">'
    +'<div class="lp-wf-dot-col"><div class="lp-wf-dot"></div>'+(isLast?'':'<div class="lp-wf-connector"></div>')+'</div>'
    +'<div class="lp-wf-card">'
      +'<div class="lp-wf-title">'+esc(title)+chip+'</div>'
      +'<div class="lp-wf-meta-row">'
        +'<span class="lp-wf-meta-item">'+pSvg+'<span>'+esc(meta.user)+'</span></span>'
        +(meta.date?'<span class="lp-wf-meta-item">'+cSvg+'<span>'+esc(meta.date)+'</span></span>':'')
        +(meta.note?'<span class="lp-wf-meta-item sc-wf-note">'+esc(meta.note)+'</span>':'')
        +(meta.time?'<span class="lp-wf-meta-sep">|</span><span class="lp-wf-meta-item"><span>'+esc(meta.time)+'</span></span>':'')
      +'</div>'
      +(description?'<div class="lp-wf-desc"><span class="lp-wf-desc-label">Comment:</span><span class="lp-wf-desc-text">'+description+'</span></div>':'')
      +(actions?'<div class="sc-wf-actions">'+actions+'</div>':'')
    +'</div></div>';
}
function viewBtn(label,type,index,id){
  var args="'"+type+"',"+(index!=null?index:'null')+(id&&id!==LIVE_ID?",'"+id+"'":'');
  return '<button class="btn-outline btn-sm" onclick="scOpenView('+args+')">'+ICO.eye+' '+esc(label)+'</button>';
}
/* WORKFLOW VIEW BUTTONS. Only the entries that create a document carry one,
   and it opens that document's tab in the panel - no popup. PO Generated
   opens the PO's own panel on the Orders page. */
var WF_VIEW={
  'SCR Submitted':['View SCR','details'],'PO Generated':['View PO','po'],
  'Shipment Created':['View Shipment','shipment'],'Delivery Note Generated':['View Delivery Note','deliverynote'],
  'Challan Generated':['View Challan','challan'],'ASN Created':['View ASN','asn'],'IMR Created':['View IMR','imr']
};
function wfViewBtn(status,id){
  var v=WF_VIEW[status];if(!v)return '';
  return '<button class="btn-outline btn-sm" onclick="scGoTab(\''+v[1]+'\',\''+id+'\')">'+ICO.eye+' '+esc(v[0])+'</button>';
}
function attachViews(list,id){
  return list.map(function(l){var e=Object.assign({},l);e.view=wfViewBtn(l.status,id);return e;});
}
function scGoTab(tab,id){
  if(tab==='po'){
    var no=id===LIVE_ID?LIVE_PO:((sampleDeal(id)||{}).po||{}).no;if(!no)return;
    if(state.page==='orders'&&state.orderOpen&&state.orderSel===no){scOrderTab('details');return;}
    state.page='orders';state.stageFilter=null;state.stageLabel='';state.orderPage=1;
    state.orderFilter={q:'',status:'',buyer:''};
    state.dealOpen=false;state.orderOpen=false;
    scRender();scOpenOrder(no);scOrderTab('details');return;
  }
  if(state.page==='deals'&&state.dealOpen&&state.dealSel===id){scDealTab(tab);return;}
  state.page='deals';state.stageFilter=null;state.stageLabel='';
  state.orderOpen=false;state.dealOpen=false;
  scRender();scOpenDeal(id);scDealTab(tab);
}
/* The document a pending step acts on - shown as "Review before you
   confirm" in Update Status. */
var REVIEW={
  'Approve SCR':['View SCR','scr'],'Return SCR':['View SCR','scr'],'Reject SCR':['View SCR','scr'],
  'Approve PO':['View PO','po'],'Return PO':['View PO','po'],
  'Goods Release & Issue':['View Shipment','shipment'],'Return Shipment':['View Shipment','shipment'],
  'Approve Delivery Note':['View Delivery Note','deliverynote'],'Return Delivery Note':['View Delivery Note','deliverynote'],
  'Confirm Gate Outward':['View Challan','challan'],'Return Gate Outward':['View Challan','challan'],
  'Confirm Shipment':['View Shipment','shipment'],
  'Clear ASN':['View ASN','asn'],'Confirm Gate Inward':['View ASN','asn'],
  'Confirm IMR':['View IMR','imr'],
  'Confirm Full Receipt':['View Reconciliation','reconciliation'],'Close Transaction':['View Reconciliation','reconciliation']
};
function reviewOf(id,action){
  var r=REVIEW[action];if(!r)return null;
  var idx=null;
  if(r[1]==='asn'||r[1]==='imr'){
    if(id===LIVE_ID){
      idx=r[1]==='imr'?state.imrs.findIndex(function(m){return m.status==='Created';})
        :action==='Clear ASN'?state.asns.findIndex(function(a){return a.qc==='Created';})
        :state.asns.findIndex(function(a){return a.qc==='QC Cleared'&&!a.gateIn;});
      if(idx<0)return null;
    }else{
      var d=sampleDeal(id);if(!d)return null;
      idx=Math.max(0,(r[1]==='imr'?d.imrs:d.asns)-1);
    }
  }
  return {label:r[0],type:r[1],index:idx};
}
function reviewBtn(id,action){var rv=reviewOf(id,action);return rv?viewBtn(rv.label,rv.type,rv.index,id):'';}
/* The lifecycle runs to twenty-odd stages, so it is grouped — with the section
   head the Details tab and every other ADT panel already use, not a second
   heading style. */
/* THE VENDOR SEES ITS OWN PART ONLY. A Vendor User's Logs and Workflow carry
   just the two ASN stages - the one it raises and the QC result on it - and
   the pending step only when it is one of those two. Every other role sees
   the full trail. Filtered here, in the two shared builders, so the live and
   sample records, SCR and PO alike, all follow the one rule. */
var VENDOR_STAGES=['ASN Created','ASN QC Cleared'],VENDOR_PENDING=['Create ASN','Clear ASN'];
function isVendor(){return state.role==='Vendor User';}
function vendorView(list){
  return isVendor()?list.filter(function(e){return VENDOR_STAGES.indexOf(e.status)>=0;}):list;
}
/* THE WHOLE PROCESS, IN ORDER - each step and the role that takes it. The
   Workflow tab reads the steps already done from the log, shows the one in
   hand, and lists the rest of this sequence as upcoming, so the full journey
   to closure is always visible. System entries (PO Auto-Created, Delivery
   Note Generated...) appear when they happen but are not planned steps. */
var WF_FLOW=[
  ['SCR Submitted','Planner'],['SCR Approved','PMG Approver'],['PO Generated','Buyer'],['PO Approved','PO Approver'],
  ['Shipment Created','Planner'],['Goods Release & Issue','Stores User'],['Delivery Note Approved','Delivery Note Approver'],
  ['Challan Generated','Finance / F&A / IDT'],['Gate Outward Confirmed','Security User'],['Shipment Confirmed','Planner'],
  ['ASN Created','Vendor User'],['ASN QC Cleared','QC User'],['Gate Inward Confirmed','Security User'],
  ['IMR Created','Stores User'],['IMR Confirmed','Stores User'],['Reconciliation Completed','Finance / F&A / IDT'],
  ['Full Receipt Confirmed','Finance / F&A / IDT'],['Transaction Closed','Finance / F&A / IDT']];
var PO_FLOW=[['PO Generated','Buyer'],['PO Approved','PO Approver']];
function upcomingSteps(events,pending,flow){
  var done=events.map(function(e){return e.status;});
  if(done.indexOf('SCR Rejected')>=0||done.indexOf('Transaction Closed')>=0)return [];
  var last=-1;
  if(flow===WF_FLOW)last=progressIndex(events);
  else flow.forEach(function(f,i){if(done.indexOf(f[0])>=0)last=i;});
  var now=pending?(ACTION_RESULT[pending.action]||pending.action):'';
  return flow.slice(last+1).filter(function(f){return f[0]!==now;});
}
function wfTimelineHTML(events,pending,flow){
  var upcoming=upcomingSteps(events,pending,flow||WF_FLOW);
  events=vendorView(events);
  if(pending&&isVendor()&&VENDOR_PENDING.indexOf(pending.action)<0)pending=null;
  if(isVendor())upcoming=upcoming.filter(function(f){return VENDOR_STAGES.indexOf(f[0])>=0;});
  var rows=events.map(function(e){
    var desc=e.reason?'<b>Reason:</b> '+esc(e.reason)+(e.comment?' · '+esc(e.comment):''):esc(e.comment);
    return {title:e.status,meta:wfMeta(e),desc:desc,actions:e.view||'',kind:'done'};
  });
  if(pending)rows.push({title:actLabel(pending.action),meta:{user:'Pending with '+pending.role,date:'',time:''},
    desc:'Awaiting <b>'+esc(pending.role)+'</b>.',actions:pending.actions||'',kind:'current'});
  upcoming.forEach(function(f){
    rows.push({title:f[0],meta:{user:f[1],date:'',time:'',note:'Not started yet'},desc:'',actions:'',kind:'upcoming'});
  });
  if(!rows.length)return '<div class="lp-wf-empty">No workflow activity yet.</div>';
  return '<div class="lp-wf-wrap">'+rows.map(function(r,i){
    return wfRow(r.title,r.meta,r.desc,r.actions,i===rows.length-1,r.kind);
  }).join('')+'</div>';
}
/* ADT's note box, not a module-specific one. */
function wfNote(text){
  return '<div class="info-box tip" style="margin:0 0 18px">'
    +'<span class="ib-icon">'+ICO.info+'</span><div>'+text+'</div></div>';
}
/* Oldest first, deal and PO logs merged — the workflow is the record of what
   happened, so it is built from the logs and cannot disagree with them. */
function liveEvents(){
  var all=state.dealLogs.slice().reverse().concat(state.poLogs.slice().reverse());
  all=all.map(function(l,i){return {l:l,i:i};})
    .sort(function(a,b){return logTs(a.l)-logTs(b.l)||a.i-b.i;}).map(function(x){return x.l;});
  return attachViews(all.map(function(l){
    return {status:l.status,by:l.by,date:l.date,time:l.time,comment:l.comment,reason:l.reason};
  }),LIVE_ID);
}
/* The live deal's next step: who holds it, and the forward action they take. */
function liveNext(){
  var who=pendingWith();if(who==='—')return null;
  var role=roleKey(who);
  var acts=validDealActions(role).concat(validPOActions(role))
    .filter(function(a){return !/^(Return|Reject)/.test(a);});
  return acts.length?{action:acts[0],role:who}:null;
}
function dealWorkflowHTML(){
  var next=liveNext();
  if(next&&/ PO$/.test(next.action))next.actions=openPOBtn();
  return wfTimelineHTML(liveEvents(),next);
}
/* PO actions are recorded on the Purchase Order, not the deal — this is the
   hop between the two. */
function openPOBtn(no){
  no=no||LIVE_PO;
  return '<button class="btn-outline btn-sm" onclick="scGoPODetails(\''+no+'\')">'+ICO.cart+' Open Purchase Order '+esc(no)+'</button>';
}
/* When a deal's next step happens on its PO, say so and offer the way there. */
function poHandoffHTML(next,no){
  return 'Next: <b>'+esc(actLabel(next.action))+'</b> by the <b>'+esc(next.role)+'</b>, on the Purchase Order.<br>'+openPOBtn(no);
}
/* The role a pending step belongs to, as a header role. */
function roleKey(who){return {'Planner / PMG':'Planner','Finance / F&A':'Finance / F&A / IDT'}[who]||who;}
function handoffBtn(role){
  /* Super Admin can take any step itself, so it is never offered a role switch */
  if(state.role==='Super Admin')return '';
  return '<button class="btn-outline btn-sm" style="margin-top:10px" onclick="scSetRole(\''+role+'\')">'+ICO.user+' Switch to '+esc(role)+'</button>';
}

/* ── LOGS ─────────────────────────────────────────────────────────────────
   Timeline on the left, the form on the right: the shared .lp-logs-wrap, so a
   Sub-Contracting log reads exactly like a log anywhere else in ADT. */
/* The Add Log card. Headed by the record's CURRENT status, the way every
   ADT logs panel is; the status select offers only what this role can do now. */
function dealHandoff(){
  var next=liveNext();
  if(!next)return 'Nothing further is pending on this deal.';
  if(/ PO$/.test(next.action))
    return poHandoffHTML(next,LIVE_PO);
  return 'Next: <b>'+esc(actLabel(next.action))+'</b>, pending with <b>'+esc(next.role)+'</b>.<br>'+handoffBtn(roleKey(next.role));
}
/* ══ LOGS TAB ══════════════════════════════════════════════════════════════
   The log as a listing - S.No, Deal Status, Comment, Created By, Create Time
   (a portal other than Web shows under the time) - oldest first, under a bar
   labelled with the CURRENT STATUS and who it is pending with. The actions
   this role can take sit on that bar as buttons - the forward step solid,
   returns and rejections outlined - so logging a step is one or two clicks:
     - a step with its own form (Create Shipment, Generate PO, Submit SCR...)
       opens that form straight away;
     - any other step turns the bar into a composer card: current status ->
       action on top, Reason for a return, Comment, and a Submit
       named after the action. Ctrl+Enter in Comment submits too.
   When nothing is this role's to do, a status card takes the bar's place. */
/* SAVED FIRST, LOGGED SECOND. Saving in a tab (Create Shipment / ASN / IMR,
   the PO's details, any Edit) only keeps the details - it writes no log and
   moves nothing on. The step is then logged here, from Logs, and uses what
   was saved. A form step whose details are not saved yet still opens its
   tab to fill them in; one that is saved opens the composer like any step. */
var PREPARED={};
function prepKey(id,action){return id+'|'+action;}
function isPrepared(id,action){
  if(action==='Generate PO')return !!PO_EDITS[poNoOf(id)];
  if(action==='Submit SCR')return true;   // the SCR's details are edited in place
  return !!PREPARED[prepKey(id,action)];
}
function isFormStep(id,action){return FORM_ACTIONS.indexOf(action)>=0&&!isPrepared(id,action);}
/* unsaved changes in a tab hold every log action until saved or cancelled */
function editBlocksLog(){
  if(!state.edit||!state.edit.dirty)return false;
  var tab=(DEAL_TABS.filter(function(t){return t.id===state.edit.tab;})[0]||{}).label||'Details';
  scToast('Save your changes first','error','The '+tab+' tab has unsaved changes. Save or cancel them, then log the step.');
  return true;
}
/* open the composer for a step on the Logs tab that records it */
function scStartLog(id,action,extra){
  if(editBlocksLog())return;
  var key;
  if(PO_ACTIONS.indexOf(action)>=0){
    var no=poNoOf(id);if(!no)return;
    scGoTab('po',id);state.orderTab='logs';key='po:'+no;
  }else{
    scGoTab('details',id);state.dealTab='logs';key='deal:'+id;
  }
  state.logAdd=Object.assign({key:key,action:action,dealId:id,anim:true},extra||{});
  scRender();
  setTimeout(function(){
    var f=document.querySelector('.sc-logadd .sc-reason-field .cs-trigger')||document.querySelector('.sc-logadd textarea:not([disabled])');
    if(f&&f.offsetParent!==null)f.focus();
  },0);
}
/* a sample deal's step - a create step builds its document from what was saved */
function sampleAct(d,action,comment){
  if(CREATE_TAB[action]){runCreate(d.id,action,comment);return;}
  if(d.rx&&RX_OWNER[action]){rxAct(d,action,comment);return;}
  advanceSample(d,action,comment);
}
/* LOGS STATUS CARDS - the panel's empty-state pattern (.sc-empty: icon box,
   title, one line) for the three times this role has nothing to do here:
     waiting   - the step is with someone else: who, and which step;
     completed - every step is done (or, on a PO, it is approved);
     rejected  - the SCR was rejected: by whom and why.
   o.state names which; o.next / o.endLog carry the detail. */
var ICO_HOURGLASS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14M5 2h14M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/></svg>';
var ICO_DONE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
var ICO_REJECT='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
function logStateCard(o){
  if(o.opts.length||!o.state)return '';
  var e=o.endLog,t,sub,ico,cls,btn='';
  if(o.state==='waiting'&&o.next){
    cls='is-wait';ico=ICO_HOURGLASS;t='Pending with '+o.next.role;
    sub='Next step: <b>'+esc(actLabel(o.next.action))+'</b>. Nothing for '+esc(state.role)+' to do here yet.';
    /* Super Admin acts on any step itself - it is never sent to switch role */
    btn=state.role==='Super Admin'?'':(o.nextBtn||'');
  }else if(o.state==='completed'){
    cls='is-done';ico=ICO_DONE;t=o.doneTitle||'Transaction completed';
    sub=(o.doneSub||'All steps are done.')+(e?' '+(o.doneVerb||'Closed')+' on '+esc(e.date)+' by '+esc(e.by)+'.':'');
  }else if(o.state==='rejected'){
    cls='is-bad';ico=ICO_REJECT;t='SCR rejected';
    sub=(e?'Rejected on '+esc(e.date)+' by '+esc(e.by)+'.':'This SCR was rejected.')
      +(e&&(e.reason||e.comment)?' Reason: '+esc(e.reason||e.comment)+'.':'')+' No further steps.';
  }else return '';
  /* while waiting, say where the record stands now as well as who has it */
  var cur=cls==='is-wait'&&o.current?'<div class="sc-state-cur"><span>Current status</span><b>'+esc(o.current)+'</b></div>':'';
  return '<div class="sc-empty sc-state '+cls+'"><div class="sc-empty-ico">'+ico+'</div>'+cur
    +'<div class="sc-empty-title">'+esc(t)+'</div><div class="sc-empty-sub">'+sub+'</div>'
    +(btn?'<div class="sc-state-btn">'+btn+'</div>':'')+'</div>';
}
/* the last log entry with this status (logs arrive newest first) */
function lastLogOf(logs,status){for(var i=0;i<logs.length;i++)if(logs[i].status===status)return logs[i];return null;}
function logsTabHTML(o){
  return '<div class="sc-logs-wrap">'+logsTableHTML(o)+'</div>';
}
/* times in the log read 09:00 AM, without seconds */
function shortTime(t){return fmtTime(t).replace(/:\d\d (AM|PM)$/,' $1');}
/* ── Table design ── */
function logsTableHTML(o){
  var la=state.logAdd,adding=la&&la.key===o.key&&(o.opts.indexOf(la.action)>=0||la.action==='Move Back'||la.action==='Go to Step')?la.action:'';
  /* the chosen action stays marked on the bar while its form is open below:
     it turns solid and the others step back to outline */
  var rc=o.receipts?o.receipts():null;
  var barOpts=rc?o.opts.filter(function(a){return ASN_ACTS.indexOf(a)<0;}):o.opts;
  var btns=barOpts.map(function(a){
    var back=/^(Return|Reject)/.test(a),on=a===adding;
    var cls=on?'btn-primary is-active':adding?'btn-outline':(back?'btn-outline':'btn-primary');
    return '<button class="'+cls+' btn-sm sc-quick-btn" type="button" aria-pressed="'+on+'"'
      +' onclick="scLogQuick(\''+o.key+'\',\''+o.dealId+'\',\''+a.replace(/'/g,"\\'")+'\')">'+esc(actLabel(a))+'</button>';
  }).join('');
  var logs=vendorView(o.logs).slice().reverse();
  /* beside the ASN cards a waiting step reads as the compact bar - who has it, and the switch - not the large card */
  var compactWait=!!(rc&&o.state==='waiting'&&!o.opts.length);
  var card=compactWait?'':logStateCard(o);
  if(compactWait&&state.role!=='Super Admin'&&o.nextBtn)btns='<span class="sc-logs-switch">'+o.nextBtn+'</span>';
  var head=card||'<div class="sc-logs-bar"><div class="sc-logs-cur">'
      +'<div class="sc-logs-eyebrow">Current status</div>'
      +'<div class="lp-logs-form-header"><span class="lp-log-dot lp-log-dot--info"></span>'+esc(o.current)+'</div>'
      +'<p class="lp-logs-form-sub sc-logs-who">'+ICO.user+'<span>'+o.sub+'</span></p>'+(o.note&&!o.opts.length?'<div class="sc-logs-note">'+o.note+'</div>':'')+'</div>'
    +(btns?'<div class="sc-quick-actions">'+btns+'</div>':'')
    +'</div>';
  /* THE ACTION PANEL. Picking an action keeps the status bar - that action
     marked active - and opens its form right under it, in the same card:
     the reason for a return, the comment, Cancel and the Submit. */
  var form='',anim=false;
  if(adding){
    anim=!!la.anim;delete la.anim;
    var jump=adding==='Go to Step',mb=adding==='Move Back'||jump;
    var go=jump?'scJumpSubmit(\''+o.id+'\')':mb?'scMoveBackSubmit(\''+o.id+'\')':'scLogQuickSubmit(\''+o.id+'\',\''+o.submit+'\')';
    var fwd=jump&&flowIndex(la.target)>progressIndex(dealEventsOldestFirst(o.dealId));
    /* DETAILS NEEDED FIRST. A create step whose details are not saved yet
       shows the form held: "Click here to fill the details" into that tab's
       form, and the comment, Cancel and Submit disabled. */
    var need=!mb&&isFormStep(o.dealId,adding);
    /* JUST SAVED. Back from the form, the card confirms the save for 1.2
       seconds - a green check, "Details have been updated" - still held, then
       turns live so the step can be logged (scLogSaved). */
    var done=!mb&&!need&&!!la.saved,held=need||done,dis=held?' disabled':'';
    form='<div class="sc-logadd'+(held?' is-held':'')+'">'
      +'<div class="sc-logadd-body">'
        +(fwd?'<p class="sc-mb-note">Go to <b>'+esc(la.target)+'</b>: the deal moves forward to the state right after it. The steps in between are skipped.</p>'
          :mb?'<p class="sc-mb-note">'+(jump?'Go to':'Move back to')+' <b>'+esc(la.target)+'</b>: the deal returns to the state right after it. Later steps stay in the log as history.</p>':'')
        +(need?'<button type="button" class="sc-logadd-need" title="Open the '+esc(FORM_DOC[adding]||'')+' form" onclick="scLogFill()">'
            +'<span class="sc-logadd-need-ico">'+ICO.info+'</span><span class="sc-logadd-need-link">Click here to fill the details</span></button>':'')
        +(done?'<div class="sc-logadd-saved" role="status">'
            +'<svg class="sc-saved-check" viewBox="0 0 52 52" aria-hidden="true"><circle class="sc-saved-ring" cx="26" cy="26" r="23"/>'
            +'<path class="sc-saved-tick" d="M15 27l7 7 15-16"/></svg>'
            +'<span class="sc-logadd-saved-text">Details have been updated</span></div>':'')
        +'<div class="policy-form-grid">'
        +(held?'':reasonFieldHTML(o.id,adding))
        +'<div class="ep-form-group ep-form-full"><label class="ep-form-label">Comment</label>'
          +'<textarea class="ep-form-input" id="'+o.id+'-comment" placeholder="Add a note for the next person"'+dis
          +' onkeydown="if((event.ctrlKey||event.metaKey)&&event.key===\'Enter\'){event.preventDefault();'+go+'}"></textarea></div>'
        +'</div></div>'
      +'<div class="sc-logadd-foot"><span class="sc-logadd-hint">'+(held?'':'<kbd>Ctrl</kbd> + <kbd>Enter</kbd> to submit')+'</span>'
        +'<div class="sc-logadd-btns"><button class="btn-outline" onclick="scLogCancel()"'+dis+'>Cancel</button>'
        /* the step is already named on its active button; the form just submits */
        +(held?'<button class="btn-primary" disabled>Submit</button>'
            :'<button class="'+(/^Reject/.test(adding)?'btn-primary sc-btn-danger':'btn-primary')+'" onclick="'+go+'">Submit</button>')
      +'</div></div></div>';
  }
  var sa=state.role==='Super Admin'&&o.key.indexOf('deal:')===0,mbTargets=sa?moveBackTargets(o.dealId):[];
  var lastIdx={};logs.forEach(function(l,i){lastIdx[l.status]=i;});
  var table=logs.length?recTable(['S.No','Deal Status','Comment','Created By','Create Time'].concat(sa?['Action']:[]),
    logs.map(function(l,i){
      var rem=(l.reason?'<span class="sc-log-reason"><b>Reason:</b> '+esc(l.reason)+'</span>':'')+(l.comment?esc(l.comment):'');
      return '<tr><td>'+(i+1)+'</td><td><b>'+esc(l.status)+'</b></td>'
        +'<td class="sc-log-rem">'+(rem||'<span class="lp-dash">—</span>')+'</td>'
        +'<td>'+esc(l.by)+'<span class="sc-rec-sub">'+esc(l.role||'')+'</span></td>'
        +'<td>'+esc(l.date)+'<span class="sc-rec-sub">'+esc(shortTime(l.time))+(l.portal&&l.portal!=='Web'?' · '+esc(l.portal)+' portal':'')+'</span></td>'
        +(sa?'<td>'+(mbTargets.indexOf(l.status)>=0&&lastIdx[l.status]===i
            ?'<button class="sc-mb-btn" type="button" title="Move the deal back to this step" onclick="scMoveBackStart(\''+o.key+'\',\''+o.dealId+'\',\''+esc(l.status).replace(/'/g,"\\'")+'\')">'+ICO_UNDO+'<span>Move back</span></button>'
            :'')+'</td>':'')
        +'</tr>';
    }).join('')):'<div class="lp-logs-empty">No activity logs yet.</div>';
  /* the bar and an open form are one panel; a status card stays on its own */
  /* an ASN / IMR step opens its form on that record's card instead */
  var inCard=!!(rc&&adding&&ASN_ACTS.indexOf(adding)>=0);
  /* during the ASN / IMR stage the ASN cards are the status - the bar stands down,
     unless it carries a deal-level step of its own or that step's form is open */
  var noBar=!!(rc&&rc.phase&&!barOpts.length&&!(adding&&!inCard));
  var top=adding&&!inCard
    ?(card?card:'')+'<div class="sc-act-panel'+(anim?' is-opening':'')+'">'+(card?'':head)+form+'</div>'
    :noBar?'':head;
  top+=rc?receiptsHTML(o,rc,inCard?form:'',inCard?la:null,anim):'';
  var count=logs.length?'<span class="sc-act-count">'+logs.length+(logs.length===1?' entry':' entries')+'</span>':'';
  return '<div class="sc-logs">'+top
    +'<div class="sc-act-log">'+secHead('Activity Log',count)+table+'</div></div>';
}
function scLogQuick(key,id,action,target){
  if(editBlocksLog())return;
  /* the active action again closes its form */
  var la=state.logAdd;
  if(la&&la.key===key&&la.action===action&&(la.target||'')===(target||'')){scLogCancel();return;}
  /* a create step without saved details opens held (see logsTableHTML) */
  state.logAdd={key:key,action:action,dealId:id,anim:true,target:target||''};scRefreshPanel();
  /* straight into the box: the reason when one is needed, else the comment */
  setTimeout(function(){
    var f=document.querySelector('.sc-logadd .sc-reason-field .cs-trigger')||document.querySelector('.sc-logadd textarea');
    if(f&&f.offsetParent!==null)f.focus();
  },0);
}
/* ══ ASNs & RECEIPTS ═══════════════════════════════════════════════════════
   From Shipment Confirmed to closure a deal can carry several ASNs, each with
   its own QC, gate inward and IMRs. The Logs tab gives every ASN its own card
   - its number, advised quantity, QC and gate status, its IMRs - with only
   the steps that ASN is ready for, for this role (Clear / Return ASN, Confirm
   Gate Inward, Create IMR, Confirm IMR). The step's form opens on that card.
   A "Create ASN" card follows while quantity is still open. Deal-level steps
   - Complete Reconciliation, Short Close, Confirm Full Receipt, Close
   Transaction - stay single buttons on the status bar. */
var ASN_ACTS=['Create ASN','Clear ASN','Return ASN','Confirm Gate Inward','Create IMR','Confirm IMR'];
function liveReceipts(){
  /* from Shipment Confirmed until the receipt is settled (full receipt, short close, closure) */
  if(!state.shipmentConfirmed||state.fullReceipt||state.shortClosed||state.closed)return null;
  var ok=validDealActions(),has=function(a){return ok.indexOf(a)>=0;};
  var items=state.asns.map(function(a,i){
    var acts=[];
    if(a.qc==='Created'){if(has('Clear ASN'))acts.push('Clear ASN');if(has('Return ASN'))acts.push('Return ASN');}
    if(a.qc==='QC Cleared'&&!a.gateIn&&has('Confirm Gate Inward'))acts.push('Confirm Gate Inward');
    if(a.qc==='QC Cleared'&&a.gateIn&&availableForIMR(i)>0&&has('Create IMR'))acts.push('Create IMR');
    var imrs=[];
    state.imrs.forEach(function(m,k){
      if(m.asnNo!==a.no)return;
      imrs.push({key:'imr:'+k,no:m.no,qty:m.qty,status:m.status,acts:m.status==='Created'&&has('Confirm IMR')?['Confirm IMR']:[]});
    });
    return {key:'asn:'+i,no:a.no,qty:a.qty,qc:a.qc,gateIn:a.gateIn,acts:acts,imrs:imrs};
  });
  /* receipt work still open on an ASN or IMR - while it is, the cards stand in for the status bar */
  var busy=state.asns.some(function(a){return a.qc==='Created'||(a.qc==='QC Cleared'&&!a.gateIn);})
    ||state.imrs.some(function(m){return m.status==='Created';})||eligibleASNs().length>0;
  return {items:items,phase:busy,add:has('Create ASN'),more:openASNQty()>0&&!state.reconciled&&!state.shortClosed&&!state.closed,open:openASNQty(),uom:dealDocs(LIVE_ID).uom,
    advised:cumulativeAdvised(),expected:EXPECTED_QTY,received:confirmedReceived()};
}
/* a sample moves one step at a time, so its step sits on its latest record */
function sampleReceipts(d){
  if(!stagePassed(d,'outbound')||d.stage==='closed'||(d.stage==='closure'&&d.sub==='close'))return null;
  if(ensureRx(d)||d.rx){
    var ok=rowAvailable(d.id),can=function(a){return ok.indexOf(a)>=0;},r=d.rx,uom=d.item.uom;
    var items=r.asns.map(function(a,i){
      var acts=[];
      if(a.qc==='Created'){if(can('Clear ASN'))acts.push('Clear ASN');if(can('Return ASN'))acts.push('Return ASN');}
      if(a.qc==='QC Cleared'&&!a.gateIn&&can('Confirm Gate Inward'))acts.push('Confirm Gate Inward');
      if(a.qc==='QC Cleared'&&a.gateIn&&rxAvail(d,i)>0&&can('Create IMR'))acts.push('Create IMR');
      var imrs=[];
      r.imrs.forEach(function(m,k){if(m.asn!==i)return;
        imrs.push({key:'imr:'+k,no:rxNo(d,'imr',k),qty:m.qty,status:m.status,acts:m.status==='Created'&&can('Confirm IMR')?['Confirm IMR']:[]});});
      return {key:'asn:'+i,no:rxNo(d,'asn',i),qty:a.qty,qc:a.qc,gateIn:a.gateIn,acts:acts,imrs:imrs};
    });
    var open=rxOpen(d);
    var busy=r.asns.some(function(a,i){return a.qc==='Created'||(a.qc==='QC Cleared'&&(!a.gateIn||rxAvail(d,i)>0));})
      ||r.imrs.some(function(m){return m.status==='Created';});
    return {items:items,phase:busy,add:can('Create ASN'),more:open>0&&rxPhase(d),open:open,uom:uom,advised:d.item.qty-open,expected:d.item.qty,received:d.received||0};
  }
  var x=dealDocs(d.id),ok=rowAvailable(d.id),has=function(a){return ok.indexOf(a)>=0;};
  var items=x.asns.map(function(a,i){
    return {key:'asn:'+i,no:a.no,qty:a.qty,qc:a.qc,gateIn:a.gateIn,acts:[],
      imrs:x.imrs.map(function(m,k){return {key:'imr:'+k,no:m.no,asnNo:m.asnNo,qty:m.qty,status:m.status,acts:[]};})
        .filter(function(m){return m.asnNo===a.no;})};
  });
  var last=function(f){for(var i=items.length-1;i>=0;i--)if(f(items[i]))return items[i];return null;};
  var t=last(function(a){return a.qc==='Created';});
  if(t){if(has('Clear ASN'))t.acts.push('Clear ASN');if(has('Return ASN'))t.acts.push('Return ASN');}
  t=last(function(a){return a.qc==='QC Cleared'&&!a.gateIn;});if(t&&has('Confirm Gate Inward'))t.acts.push('Confirm Gate Inward');
  t=last(function(){return true;});if(t&&has('Create IMR'))t.acts.push('Create IMR');
  if(has('Confirm IMR'))items.forEach(function(a){a.imrs.forEach(function(m){if(m.status==='Created')m.acts.push('Confirm IMR');});});
  var advised=x.asns.reduce(function(s,a){return s+(+a.qty||0);},0);
  var received=x.imrs.filter(function(m){return m.status==='Confirmed';}).reduce(function(s,m){return s+(+m.qty||0);},0);
  return {items:items,add:has('Create ASN'),open:Math.max(0,d.item.qty-advised),uom:x.uom,
    advised:Math.min(advised,d.item.qty),expected:d.item.qty,received:Math.min(received,d.item.qty)};
}
function receiptsHTML(o,rc,form,la,anim){
  /* which record the open form belongs to: the one it was opened on, else
     the first that offers the step (a step started from the listing) */
  var at='';
  if(la){
    var all=[];rc.items.forEach(function(a){all.push(a);a.imrs.forEach(function(m){all.push(m);});});
    var hit=all.filter(function(r){return r.key===la.target&&r.acts.indexOf(la.action)>=0;})[0]
      ||all.filter(function(r){return r.acts.indexOf(la.action)>=0;})[0];
    at=la.action==='Create ASN'?'new':hit?hit.key:'';
  }
  var btn=function(a,target){
    var on=la&&la.action===a&&at===target,back=/^Return/.test(a);
    return '<button class="'+(on?'btn-primary is-active':back||la?'btn-outline':'btn-primary')+' btn-sm sc-quick-btn" type="button"'
      +' onclick="scLogQuick(\''+o.key+'\',\''+o.dealId+'\',\''+a+'\',\''+target+'\')">'+esc(a)+'</button>';
  };
  var formHere=function(key){return form&&at===key?'<div class="sc-asn-form'+(anim?' is-opening':'')+'">'+form+'</div>':'';};
  var qcBadge=function(q){return badge(q==='QC Cleared'?'approved':q==='Returned'?'unapproved':'pending',q==='Created'?'QC Pending':q);};
  var cards=rc.items.map(function(a){
    var imrs=a.imrs.map(function(m){
      return '<div class="sc-asn-imr"><span class="sc-asn-imr-no">'+esc(m.no)+'</span>'
        +'<span class="sc-asn-meta">Receipt '+esc(m.qty)+' '+esc(rc.uom)+'</span>'
        +badge(m.status==='Confirmed'?'approved':'created',m.status)
        +(m.acts.length?'<span class="sc-asn-acts">'+m.acts.map(function(x){return btn(x,m.key);}).join('')+'</span>':'')
        +'</div>'+formHere(m.key);
    }).join('');
    return '<div class="sc-asn-card'+(at===a.key||a.imrs.some(function(m){return m.key===at;})?' is-active':'')+(a.qc==='Returned'?' is-returned':'')+'">'
      +'<div class="sc-asn-head"><div class="sc-asn-id"><span class="sc-asn-no">'+esc(a.no)+'</span>'
        +'<span class="sc-asn-meta">Advised '+esc(a.qty)+' '+esc(rc.uom)+'</span></div>'
        +'<div class="sc-asn-chips">'+qcBadge(a.qc)
          +(a.qc==='QC Cleared'?badge(a.gateIn?'approved':'pending',a.gateIn?'Gate Inward Done':'Gate Inward Pending'):'')+'</div>'
        +(a.acts.length?'<div class="sc-asn-acts">'+a.acts.map(function(x){return btn(x,a.key);}).join('')+'</div>':'')+'</div>'
      +formHere(a.key)
      +(imrs?'<div class="sc-asn-imrs">'+imrs+'</div>':'')
    +'</div>';
  }).join('');
  /* while quantity is open every role sees the next ASN is due; only the vendor (or Super Admin) raises it */
  var add=rc.add||rc.more?'<div class="sc-asn-card sc-asn-new'+(at==='new'?' is-active':'')+'">'
      +'<div class="sc-asn-head"><div class="sc-asn-id"><span class="sc-asn-no">New ASN</span>'
        +'<span class="sc-asn-meta">Open quantity '+esc(rc.open)+' '+esc(rc.uom)+'</span></div>'
        +'<div class="sc-asn-acts">'+(rc.add?btn('Create ASN','new'):'<span class="sc-asn-hint">The vendor raises the next ASN</span>')+'</div></div>'+formHere('new')+'</div>':'';
  var sum='<span class="sc-act-count">Advised '+rc.advised+' / '+rc.expected+' · Received '+rc.received+' · Open '+rc.open+' '+esc(rc.uom)+'</span>';
  return '<div class="sc-asn-sec">'+secHead('ASNs & Receipts',sum)
    +(cards||add?cards+add:'<div class="lp-logs-empty">No ASN raised yet.</div>')+'</div>';
}
function scLogQuickSubmit(formId,submit){
  if(!state.logAdd)return;
  csValues[formId+'-status']=state.logAdd.action;
  curTarget=state.logAdd.target||null;
  try{window[submit]();}finally{curTarget=null;}
}
function scLogCancel(){state.logAdd=null;scRefreshPanel();}
/* Opening or closing the Logs card changes nothing but the panel, so only
   the panel's content is redrawn - the listing and the tab bar stay put. */
function scRefreshPanel(){
  if(state.page==='deals'&&state.dealOpen&&document.getElementById('sc-deal-isb'))refreshPanel('sc-deal-isb',dealPanelHTML());
  else if(state.page==='orders'&&state.orderOpen&&document.getElementById('sc-order-isb'))refreshPanel('sc-order-isb',orderPanelHTML());
  else scRender();
}
/* The held composer's way into the form: its "Click here to fill the details"
   line opens the step's tab. The open composer is kept, so after Save the Logs
   tab shows it again - live this time - ready to log the step. */
var FORM_DOC={'Create Shipment':'shipment','Create ASN':'ASN','Create IMR':'IMR','Generate PO':'PO'};
function scLogFill(){
  var la=state.logAdd;if(!la||!la.dealId)return;
  la.fromFill=true;
  scOpenActionModal(la.action,'',PO_ACTIONS.indexOf(la.action)>=0?'order':'deal',la.dealId);
  state.logAdd=la;
}

/* ══ MOVE BACK (Super Admin) ═══════════════════════════════════════════════
   Takes a deal back to the state right after an earlier step of WF_FLOW.
   Nothing is erased: the undone steps stay in the log as history, a "Moved
   back to <step>" entry records who and why, History picks up every field
   that changed, and Workflow plans the upcoming steps from that point. The
   live deal can go back as far as its quantities allow - any step up to
   Shipment Confirmed; the sample deals to any step. */
var ICO_UNDO='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>';
var LIVE_MB_LIMIT=9;   // WF_FLOW index of 'Shipment Confirmed'
function flowIndex(st){for(var i=0;i<WF_FLOW.length;i++)if(WF_FLOW[i][0]===st)return i;return -1;}
/* how far along the deal is now: the latest flow step since any move back */
function progressIndex(events){
  var start=0,last=-1;
  for(var i=events.length-1;i>=0;i--){var mv=/^Moved (back )?to (.+)$/.exec(events[i].status);if(mv){start=i;last=flowIndex(mv[2]);break;}}
  for(var j=start;j<events.length;j++){var k=flowIndex(events[j].status);if(k>last)last=k;}
  return last;
}
function dealEventsOldestFirst(id){
  if(id===LIVE_ID){
    var all=state.dealLogs.slice().reverse().concat(state.poLogs.slice().reverse());
    return all.map(function(l,i){return {l:l,i:i};}).sort(function(a,b){return logTs(a.l)-logTs(b.l)||a.i-b.i;}).map(function(x){return x.l;});
  }
  var d=sampleDeal(id);return d?sampleMilestones(d):[];
}
function moveBackTargets(id){
  var ev=dealEventsOldestFirst(id),cur=progressIndex(ev),limit=id===LIVE_ID?LIVE_MB_LIMIT:WF_FLOW.length-1;
  if(cur<=0)return [];
  return WF_FLOW.slice(0,cur).map(function(f){return f[0];}).filter(function(st,i){return i<=limit;});
}
function scMoveBackStart(key,id,target){
  if(state.role!=='Super Admin')return;
  state.logAdd={key:key,action:'Move Back',target:target,dealId:id,anim:true};scRefreshPanel();
}
function scMoveBackSubmit(formId){
  var la=state.logAdd;if(!la||la.action!=='Move Back')return;
  var reason=readReason(formId),comment=((document.getElementById(formId+'-comment')||{}).value||'').trim();
  if(reasonMissing('Move Back',reason))return;
  if(moveBackTargets(la.dealId).indexOf(la.target)<0){scToast('That step can no longer be moved back to','error');return;}
  withReason(reason,function(){moveDealBack(la.dealId,la.target,comment);});
  state.logAdd=null;scRender();
  scToast(la.dealId+' moved back to '+la.target,'info');
}
function moveDealBack(id,target,comment){moveDealTo(id,target,comment,'Moved back to ');}
/* Rebuild a deal as it stood right after step `target` of WF_FLOW - back
   (Move Back) or forward (Super Admin's Go to Step) - and log the move. */
function moveDealTo(id,target,comment,verb){
  var k=flowIndex(target);
  if(id===LIVE_ID){
    /* rebuild the live deal's state as it stood right after step k */
    var S=state;
    S.scr=k>=1?'approved':'sent';
    S.po=k>=3?'approved':k>=2?'created':k>=1?'draft':'none';
    if(k<1)S.poCreated=null;if(k<3)S.poApproved=null;
    S.shipment=k>=7?'challan_generated':k>=5?'outbound_released':k>=4?'created':'none';
    S.outboundKey=S.transferOrder=k>=4;
    S.goodsIssue=k>=5;
    S.deliveryNote=k>=6?'approved':k>=5?'generated':'none';
    S.challan=k>=8?'gate_cleared':k>=7?'generated':'none';
    S.gateOut=k>=8;S.shipmentConfirmed=k>=9;
    if(k>=1&&!S.poCreated)S.poCreated=stamp().date;if(k>=3&&!S.poApproved)S.poApproved=stamp().date;
    /* past Shipment Confirmed: one ASN for the full quantity, then its IMR */
    var q=EXPECTED_QTY;
    S.asns=k>=10?[{no:'ASN-001',qty:q,qc:k>=11?'QC Cleared':'Created',gateIn:k>=12}]:[];
    S.imrs=k>=13?[{no:'IMR-001',asnNo:'ASN-001',qty:q,status:k>=14?'Confirmed':'Created'}]:[];
    S.reconciled=k>=15;S.fullReceipt=k>=16;S.shortClosed=false;S.closed=k>=17;
    if(S.closed){S.scr='closed';S.po='closed';S.shipment='closed';S.challan='closed';}
    addDealLog(verb+target,comment);
    return;
  }
  var d=sampleDeal(id);if(!d)return;
  if(d.rx){delete d.rx;d.extra=(d.extra||[]).filter(function(l){return !l.rxFrozen;});}
  var before=sampleMilestones(d),i=SAMPLE_DEALS.indexOf(d);
  /* the sample's stage model, as it stood right after step k */
  var ST=[
    ['scr'],['po','Draft'],['po','Created'],['po','Approved'],['shipment'],['outbound','dn'],['outbound','challan'],
    ['outbound','gate'],['outbound','confirm'],['asn','vendor'],['asn','qc'],['asn','gatein'],['imr','create'],
    ['imr','confirm'],['reconciliation'],['closure','receipt'],['closure','close'],['closed']][k];
  var asnN=0,imrN=0;
  /* how many ASNs / IMRs existed at that point */
  var cut=0;for(var c=0;c<before.length;c++){if(before[c].status===target)cut=c;}
  before.slice(0,cut+1).forEach(function(l){if(l.status==='ASN Created')asnN++;if(l.status==='IMR Created')imrN++;});
  if(d.po&&k<1){d._poNo=d.po.no;d.po=null;}
  if(k>=1){d.po=d.po||{no:d._poNo||String(37760+i),status:'Draft'};}
  d.stage=ST[0];d.sub='';d.returned=false;d.rejected=false;
  if(d.stage==='po')d.po.status=ST[1];
  else if(d.po)d.po.status=d.stage==='closed'?'Closed':'Approved';
  if(d.stage==='outbound'||d.stage==='asn'||d.stage==='imr'||d.stage==='closure')d.sub=ST[1];
  if(k<10){d.asns=0;d.imrs=0;d.received=0;}
  else{d.asns=Math.max(asnN,1);d.imrs=k>=12?Math.max(imrN,1):0;d.received=k>=13?d.item.qty:0;}
  /* a later step's recorded author no longer applies to its regenerated entry */
  Object.keys(d.notes||{}).forEach(function(st){if(flowIndex(st)>k)delete d.notes[st];});
  /* what the move undoes stays in the log as history */
  var after=sampleMilestones(d),keyOf=function(l){return l.status+'|'+l.date+'|'+l.time;};
  var kept={};after.forEach(function(l){kept[keyOf(l)]=1;});
  d.extra=d.extra||[];
  before.forEach(function(l){
    if(kept[keyOf(l)])return;
    if(d.extra.some(function(x){return keyOf(x)===keyOf(l);}))return;
    d.extra.push(Object.assign({},l,{seq:l.seq||0}));
  });
  var t=stamp();
  d.extra.push({status:verb+target,role:state.role,by:who(),comment:comment,reason:curReason,
    date:t.date,time:t.time,portal:'Web',seq:++scSeq});
}
function dealLogsHTML(){
  var opts=validDealActions(),last=state.dealLogs[0],who=pendingWith(),next=liveNext();
  return logsTabHTML({key:'deal:'+LIVE_ID,dealId:LIVE_ID,id:'sc-deal',logs:state.dealLogs,opts:opts,submit:'scSubmitDealLog',receipts:liveReceipts,
    current:last?last.status:scrLabel(),
    sub:who&&who!=='—'?'Pending with <b>'+esc(who)+'</b>':'No further actions on this deal',
    note:opts.length?'':dealHandoff(),
    state:state.closed?'completed':next?'waiting':'',next:next,endLog:lastLogOf(state.dealLogs,'Transaction Closed'),
    nextBtn:next?(/ PO$/.test(next.action)?openPOBtn(LIVE_PO):handoffBtn(roleKey(next.role))):''});
}
function scSubmitDealLog(){
  var action=csValue('sc-deal-status');
  var comment=(document.getElementById('sc-deal-comment')||{value:''}).value.trim();
  if(!action){scToast('Select a status first','error');return;}
  var reason=readReason('sc-deal');
  if(reasonMissing(action,reason))return;
  if(isFormStep(LIVE_ID,action)){scOpenActionModal(action,comment,'deal');return;}
  withReason(reason,function(){executeDealAction(action,comment);});
  state.logAdd=null;
  scRender();
}

/* ── ATTACHMENTS ──────────────────────────────────────────────────────────
   ADT's attachments tab (.att-*, leaves.css), in its two states: the drop
   zone is the whole tab while there is nothing to show, and shrinks to one
   line above the file table once there is. Uploads are real for the session:
   the file is held as an object URL, so Download hands back what was dropped. */
var ATT_ICO={
  upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7 8l5-5 5 5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/></svg>',
  download:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/></svg>',
  trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/></svg>'
};
var attStore={};
function attSeed(id){
  if(id===LIVE_ID)return [
    {name:'Machining_Specification.pdf',size:'1.4 MB',by:'Kinjal Sisodiya',source:'Uploaded with the SCR'},
    {name:'Vendor_Rate_Contract_RC-123.pdf',size:'820 KB',by:'Madan Mohan',source:'Linked from Rate Contract'}];
  var d=sampleDeal(id);if(!d||d.stage==='scr')return [];
  var f=[{name:d.title.replace(/[^A-Za-z]+/g,'_').replace(/_$/,'')+'_Specification.pdf',size:'1.2 MB',by:d.planner,source:'Uploaded with the SCR'},
         {name:'PO_'+d.po.no+'.pdf',size:'340 KB',by:'System',source:'Generated with the PO'}];
  if(stagePassed(d,'outbound'))f.push({name:'Delivery_Challan_'+d.id.slice(-5)+'.pdf',size:'210 KB',by:'System',source:'Gate pass copy'});
  if(d.received)f.push({name:'QC_Report_'+d.id.slice(-5)+'.xlsx',size:'96 KB',by:SAMPLE_PEOPLE['QC User'],source:'Uploaded with the ASN'});
  return f;
}
function attList(id){if(!attStore[id])attStore[id]=attSeed(id);return attStore[id];}
function attKind(name){var m=/\.([a-z0-9]+)$/i.exec(name);return m?m[1].toUpperCase():'FILE';}
function attSize(b){return b<1024?b+' B':b<1048576?Math.round(b/1024)+' KB':(b/1048576).toFixed(1)+' MB';}

function attachmentsHTML(id){
  var files=attList(id);
  var input='<input type="file" id="sc-att-input" multiple hidden onchange="scAttAdd(\''+id+'\',this.files);this.value=\'\'">';
  var dz=' onclick="document.getElementById(\'sc-att-input\').click()" ondragover="event.preventDefault();this.classList.add(\'is-over\')"'
    +' ondragleave="this.classList.remove(\'is-over\')" ondrop="event.preventDefault();this.classList.remove(\'is-over\');scAttAdd(\''+id+'\',event.dataTransfer.files)"';
  if(!files.length){
    return input+'<div class="att-zone att-zone-lg"'+dz+'>'
      +'<span class="att-zone-ico">'+ATT_ICO.upload+'</span>'
      +'<div class="att-zone-title">Drop files here, or click to browse</div>'
      +'<div class="att-zone-hint">PDF, images, documents and spreadsheets · up to 10 MB each</div></div>';
  }
  var rows=files.map(function(f,i){
    return '<tr><td>'+(i+1)+'</td>'
      +'<td><div class="lp-c-main">'+esc(f.name)+'</div><div class="lp-c-sub">'+esc(f.size)+'</div></td>'
      +'<td>'+esc(f.by)+'</td>'
      +'<td><span class="att-kind">'+attKind(f.name)+'</span></td>'
      +'<td><span class="lp-c-sub" style="font-size:12.5px">'+esc(f.source)+'</span></td>'
      +'<td style="text-align:right;white-space:nowrap">'
        +'<button class="att-row-btn" title="Download" onclick="scAttDownload(\''+id+'\','+i+')">'+ATT_ICO.download+'</button>'
        +'<button class="att-row-btn is-danger" title="Delete" onclick="scAttDelete(\''+id+'\','+i+')">'+ATT_ICO.trash+'</button>'
      +'</td></tr>';
  }).join('');
  return input
    +'<div class="att-bar"><span class="att-count">'+files.length+' File'+(files.length>1?'s':'')+'</span>'
    +'<div class="att-bar-actions"><button class="att-link" onclick="scAttDownloadAll(\''+id+'\')">'+ATT_ICO.download+' Download All</button></div></div>'
    +'<div class="att-zone att-zone-sm"'+dz+'><span class="att-zone-ico-sm">'+ATT_ICO.upload+'</span>Drop files here, or click to browse</div>'
    +'<div class="att-table-wrap"><table class="lp-table att-table"><thead><tr>'
    +'<th>Sr. No</th><th>File Name</th><th>Uploaded By</th><th>Type</th><th>Source</th><th style="text-align:right">Action</th>'
    +'</tr></thead><tbody>'+rows+'</tbody></table></div>';
}
function refreshAttachments(){
  if(state.dealOpen&&state.dealTab==='attachments')refreshPanel('sc-deal-isb',dealPanelHTML());
}
function scAttAdd(id,fileList){
  var list=attList(id),added=0,big=0;
  Array.prototype.forEach.call(fileList||[],function(f){
    if(f.size>10*1048576){big++;return;}
    list.push({name:f.name,size:attSize(f.size),by:who(),source:'Manual upload',url:URL.createObjectURL(f)});
    added++;
  });
  if(added)scToast(added+' file'+(added>1?'s':'')+' uploaded','success');
  if(big)scToast(big+' file'+(big>1?'s are':' is')+' over 10 MB','error');
  refreshAttachments();
}
function scAttDownload(id,i){
  var f=attList(id)[i];if(!f)return;
  if(!f.url){scToast(f.name+' is sample data — nothing to download','info');return;}
  var a=document.createElement('a');a.href=f.url;a.download=f.name;document.body.appendChild(a);a.click();a.remove();
}
function scAttDownloadAll(id){
  var list=attList(id),real=list.filter(function(f){return f.url;});
  if(!real.length){scToast('These are sample files — nothing to download','info');return;}
  list.forEach(function(f,i){if(f.url)scAttDownload(id,i);});
}
function scAttDelete(id,i){
  var list=attList(id),f=list[i];if(!f)return;
  if(f.url)URL.revokeObjectURL(f.url);
  list.splice(i,1);
  scToast(f.name+' deleted','info');
  refreshAttachments();
}

/* ══ ORDER PANEL ══════════════════════════════════════════════════════════  */
function orderPanelHTML(){
  if(state.orderSel!==LIVE_PO){
    var d=SAMPLE_DEALS.filter(function(x){return x.po&&x.po.no===state.orderSel;})[0];
    return sampleOrderPanelHTML(d);
  }
  var tabs=ORDER_TABS;
  var bar=tabBarHTML(tabs,state.orderTab,'scOrderTab','scCloseOrder','sc-order-tabs');
  var body;
  if(state.orderTab==='details')body=orderDetailsHTML();
  else if(state.orderTab==='workflow')body=orderWorkflowHTML();
  else if(state.orderTab==='history')body=historyHTML(LIVE_ID,true);
  else body=orderLogsHTML();
  if(state.orderTab==='details'&&state.po!=='none')body=poTools(LIVE_PO,body);
  return expHeadHTML()+bar+'<div class="lp-isb-body">'+body+'</div>';
}
function orderDetailsHTML(){
  if(state.po==='none'){
    return '<div class="sc-empty"><div class="sc-empty-ico">'+ICO.cart+'</div>'
      +'<div class="sc-empty-title">Purchase Order not created yet</div>'
      +'<div class="sc-empty-sub">It is created automatically in Draft once the SCR is approved.</div></div>';
  }
  var pi=poInfo(LIVE_PO);
  var head='<div class="lp-sb-detail-grid" style="margin-bottom:20px">'
    +fieldCard(ICO.hash,'PO No.',LIVE_PO)
    +fieldCard(ICO.check,'PO Status',badge(poTone(),poLabel()))
    +fieldCard(ICO.doc,'SCR No.',LIVE_ID)
    +fieldCard(ICO.doc,'SCR Title',esc(L().title))
    +fieldCard(ICO.tag,'Order Type','Sub-Contracting')
    +fieldCard(ICO.handshake,'Vendor / Sub-Contractor','21005 — Sri Venkateswara Aerospace Pvt.ltd')
    +fieldCard(ICO.globe,'Vendor Address','Hyderabad, Telangana 500084')
    +fieldCard(ICO.tag,'Required Skill / Service','Structural Fabrication')
    +fieldCard(ICO.tag,'Lot Type','Specific')
    +fieldCard(ICO.globe,'Location','Hazira Works')
    +fieldCard(ICO.user,'Buyer',esc(L().buyer))
    +fieldCard(ICO.cal,'Created On',esc(state.poCreated||''))
    +fieldCard(ICO.cal,'Approved On',esc(state.poApproved||''))
    +fieldCard(ICO.doc,'PO Series','Not Applicable')
    +fieldCard(ICO.doc,'Rate Contract',esc(pi.rc))
    +fieldCard(ICO.doc,'SAP SCR Reference ID',esc(pi.sap))
    +fieldCard(ICO.money,'Price Basis',esc(pi.basis))
    +fieldCard(ICO.money,'Currency',esc(pi.currency))
    +fieldCard(ICO.clock,'Payment Terms',esc(pi.terms))
    +fieldCard(ICO.user,'PMG Approver',esc(pi.approver))
    +fieldCard(ICO.tag,'Tax Code',esc(pi.tax))
    +fieldCard(ICO.globe,'Purchase Office','PUR-121 — Manufacturing Procurement')
    +fieldCard(ICO.money,'PO Value',fmtAmt(poValue()))
    +'</div>';
  var lines=recTable(['#','Receivable Item','Quantity','UOM','Price / Unit','Line Value'],
    '<tr><td>1</td><td><b>'+esc(L().item.name)+'</b></td>'
    +'<td>'+L().item.qty+'</td><td>Each</td><td>'+fmtAmt(poPrice())+'</td><td><b>'+fmtAmt(poValue())+'</b></td></tr>');
  return secHead('PO Header Details')+head
    +tableHead('PO Lines')+lines;
}
function orderWorkflowHTML(){
  if(state.po==='none'){
    return '<div class="lp-wf-empty">The Purchase Order is created automatically in Draft once the SCR is approved.</div>';
  }
  var pending=state.po==='draft'?{action:'Generate PO',role:'Buyer'}
    :state.po==='created'?{action:'Approve PO',role:'PO Approver'}:null;
  var ev=state.poLogs.slice().reverse().map(function(l){
    return {status:l.status,by:l.by,date:l.date,time:l.time,comment:l.comment,reason:l.reason,
      view:wfViewBtn(l.status,LIVE_ID)};
  });
  return wfTimelineHTML(ev,pending,PO_FLOW);
}
function orderHandoff(){
  var r=state.po==='draft'?['Generate PO','Buyer']:state.po==='created'?['Approve PO','PO Approver']:null;
  if(!r)return 'Nothing further is pending on this PO.';
  return 'Next: <b>'+r[0]+'</b>, pending with <b>'+r[1]+'</b>.<br>'+handoffBtn(r[1]);
}
function orderLogsHTML(){
  var opts=validPOActions();
  var next=state.po==='draft'?{action:'Generate PO',role:'Buyer'}:state.po==='created'?{action:'Approve PO',role:'PO Approver'}:null;
  var done=state.po==='approved'||state.po==='closed';
  return logsTabHTML({key:'po:'+LIVE_PO,dealId:LIVE_ID,id:'sc-po',logs:state.poLogs,opts:opts,submit:'scSubmitOrderLog',
    current:'PO '+poLabel(),sub:next?'Pending with <b>'+esc(next.role)+'</b>':'No further actions on this Purchase Order',note:opts.length?'':orderHandoff(),
    state:done?'completed':next?'waiting':'',next:next,nextBtn:next?handoffBtn(next.role):'',
    endLog:lastLogOf(state.poLogs,'PO Approved'),doneTitle:'PO '+poLabel(),doneVerb:'Approved',
    doneSub:'Nothing further is pending on this Purchase Order.'});
}
function scSubmitOrderLog(){
  var action=csValue('sc-po-status');
  var comment=(document.getElementById('sc-po-comment')||{value:''}).value.trim();
  if(!action){scToast('Select a status first','error');return;}
  if(isFormStep(LIVE_ID,action)){scOpenActionModal(action,comment,'order');return;}
  var reason=readReason('sc-po');
  if(reasonMissing(action,reason))return;
  withReason(reason,function(){executePOAction(action,comment);});
  state.logAdd=null;
  scRender();
}
function executePOAction(action,comment){
  if(action==='Generate PO'){
    state.po='created';
    addPOLog('PO Generated',comment||'Sent for approval — PO value '+fmtAmt(poValue())+'.');
    scToast('PO '+LIVE_PO+' sent for approval','success','Pending with the PO Approver.');
  }
  if(action==='Approve PO'){state.po='approved';state.poApproved=stamp().date;addPOLog('PO Approved',comment);scToast('PO '+LIVE_PO+' approved');}
  if(action==='Return PO'){addPOLog('PO Returned',comment);scToast('PO returned to Buyer','info');}
}

/* ══ SAMPLE DEAL PANEL ════════════════════════════════════════════════════
   The same tabs and components as the live deal, filled from the sample
   record. Read-only: the Logs tab says which role and action are next instead
   of offering a form, because only the live deal walks the process. */
function samplePanelHTML(d){
  var tabs=dealTabs();
  var bar=tabBarHTML(tabs,state.dealTab,'scDealTab','scCloseDeal','sc-deal-tabs');
  var t=state.dealTab,body;
  if(t==='details')body=sampleDetailsHTML(d);
  else if(t==='workflow')body=sampleWorkflowHTML(d);
  else if(t==='logs')body=sampleLogsHTML(d);
  else if(t==='history')body=historyHTML(d.id);
  else if(DOC_TABS[t])body=DOC_TABS[t](dealDocs(d.id));
  else body=attachmentsHTML(d.id);
  body=withTools(d.id,t,body);
  return expHeadHTML()+bar+'<div class="lp-isb-body">'+body+'</div>';
}
function sampleDetailsHTML(d){
  var g=function(cards){return '<div class="lp-sb-detail-grid" style="margin-bottom:20px">'+cards+'</div>';};
  var scr=sampleScr(d),it=d.item,closed=d.stage==='closed';
  var open=Math.max(0,it.qty-d.received);
  var head=g(
     fieldCard(ICO.hash,'SCR No.',esc(d.id))
    +fieldCard(ICO.check,'Status',badge(scrToneOf(scr),scr))
    +fieldCard(ICO.doc,'SCR Title',esc(d.title))
    +fieldCard(ICO.tag,'SCR Base',esc(d.base))
    +fieldCard(ICO.tag,'Nature of SCR / Work Type',esc(d.workType))
    +fieldCard(ICO.tag,'Sub-Contracting Process',esc(d.process))
    +fieldCard(ICO.globe,'Purchase Office','PUR-121 — Manufacturing Procurement')
    +fieldCard(ICO.cal,'Created On',esc(d.created))
    +fieldCard(ICO.user,'Planner',esc(d.planner))
    +fieldCard(ICO.user,'Buyer',esc(d.buyer))
    +fieldCard(ICO.user,'Pending With',esc(samplePending(d)))
    +fieldCard(ICO.cart,'Purchase Order',poFieldValue(d.po?d.po.no:'',d.po?d.po.status:''))
  );
  var base=g(fieldCard(ICO.clipboard,d.base,esc(d.baseRef))+fieldCard(ICO.cube,'Plant','Hazira Works'));
  var vendor=g(
     fieldCard(ICO.handshake,'Vendor / Subcontractor',esc(d.vendor.code+' — '+d.vendor.name))
    +fieldCard(ICO.globe,'Vendor Address',esc(d.vendor.addr))
  );
  var recv=recTable(
    ['Receivable Item','Item Type','Expected Qty','UOM','Est. Price / Unit','Receiving Warehouse','HSN','Expected Receipt','Received','Open'],
    '<tr><td><b>'+esc(it.name)+'</b></td><td>'+esc(it.type)+'</td><td>'+it.qty+'</td><td>'+esc(it.uom)+'</td><td>'+fmtAmt(it.price)+'</td>'
    +'<td>Hazira Works</td><td>'+esc(it.hsn)+'</td><td>'+esc(it.due)+'</td><td>'+d.received+'</td><td>'+(closed?0:open)+'</td>'
    +'</tr>');
  var issue=recTable(['For Receivable Item','Issue Item','Item Type','Issue Qty','UOM','Warehouse','Storage Zone','FIM','HSN'],
    d.issues.map(function(r){
      return '<tr><td>'+esc(it.name)+'</td><td><b>'+esc(r[0])+'</b></td><td>Raw Material</td><td>'+it.qty+'</td><td>'+esc(it.uom)+'</td>'
        +'<td>Hazira Works</td><td>'+esc(r[1])+'</td><td>Yes</td><td>'+esc(r[2])+'</td></tr>';
    }).join(''));
  return (d.returned?returnNoteHTML(d.id):'')+secHead('SCR Header Details')+head
    +secHead('SCR Base Details')+base
    +secHead('Vendor Details')+vendor
    +tableHead('Receivable Item Details')+recv
    +tableHead('Issue Item Details')+issue;
}
/* Who a sample deal is waiting on, and for what. d.sub is the step inside a
   stage that several roles share (outbound, ASN, IMR, closure). */
function sampleNextOf(d){
  if(d.rejected)return null;
  if(d.returned)return {action:'Submit SCR',role:'Planner'};
  var F='Finance / F&A / IDT',n=null,sub=d.sub;
  if(d.stage==='scr')n=['PMG Approver','Approve SCR'];
  else if(d.stage==='po')n=d.po.status==='Draft'?['Buyer','Generate PO']
    :d.po.status==='Created'?['PO Approver','Approve PO']:['Planner','Create Shipment'];
  else if(d.stage==='shipment')n=['Stores User','Goods Release & Issue'];
  else if(d.stage==='outbound')n=sub==='challan'?[F,'Generate Challan']:sub==='gate'?['Security User','Confirm Gate Outward']
    :sub==='confirm'?['Planner','Confirm Shipment']:['Delivery Note Approver','Approve Delivery Note'];
  else if(d.stage==='asn')n=sub==='vendor'?['Vendor User','Create ASN']:sub==='gatein'?['Security User','Confirm Gate Inward']:['QC User','Clear ASN'];
  else if(d.stage==='imr')n=sub==='create'?['Stores User','Create IMR']:['Stores User','Confirm IMR'];
  else if(d.stage==='reconciliation')n=[F,'Complete Reconciliation'];
  else if(d.stage==='closure')n=sub==='close'?[F,'Close Transaction']:[F,'Confirm Full Receipt'];
  return n?{action:n[1],role:n[0]}:null;
}
function sampleWorkflowHTML(d){
  var next=sampleNextOf(d);
  if(next&&d.po&&PO_ACTIONS.indexOf(next.action)>=0)next.actions=openPOBtn(d.po.no);
  return wfTimelineHTML(attachViews(sampleMilestones(d),d.id),next);
}
/* PO steps (auto-created, generated, approved, returned...) belong to the
   Purchase Order's own Logs in Orders - the deal's Logs leave them out. */
function isPOLog(l){return /^PO /.test(l.status);}
function sampleLogsHTML(d){
  var all=sampleMilestones(d).slice().reverse(),next=sampleNextOf(d);
  var logs=all.filter(function(l){return !isPOLog(l);});
  /* The same live form as the listing's Update Status: it offers what this
     role can do on this deal now, and Submit moves the deal on. */
  var opts=rowAvailable(d.id);
  var poStep=next&&d.po&&PO_ACTIONS.indexOf(next.action)>=0;
  return logsTabHTML({key:'deal:'+d.id,dealId:d.id,id:'sc-sample',logs:logs,opts:opts,submit:'scSubmitSampleLog',current:all[0].status,
    receipts:function(){return sampleReceipts(d);},
    sub:next?'Pending with <b>'+esc(next.role)+'</b>':'The transaction is closed',
    note:!opts.length&&poStep?poHandoffHTML(next,d.po.no):'',
    state:d.rejected?'rejected':d.stage==='closed'?'completed':next?'waiting':'',next:next,
    endLog:d.rejected?lastLogOf(logs,'SCR Rejected'):lastLogOf(logs,'Transaction Closed'),
    nextBtn:next?(poStep?openPOBtn(d.po.no):handoffBtn(roleKey(next.role))):''});
}
function scSubmitSampleLog(){
  var d=sampleDeal(state.dealSel);if(!d)return;
  var action=csValue('sc-sample-status');
  var comment=(document.getElementById('sc-sample-comment')||{value:''}).value.trim();
  if(!action){scToast('Select a status first','error');return;}
  if(isFormStep(d.id,action)){scOpenActionModal(action,comment,'deal',d.id);return;}
  var reason=readReason('sc-sample');
  if(reasonMissing(action,reason))return;
  withReason(reason,function(){sampleAct(d,action,comment);});
  state.logAdd=null;
  scRender();
}
/* the same, from a sample PO's own Logs in Orders */
function scSubmitSamplePOLog(){
  var d=SAMPLE_DEALS.filter(function(x){return x.po&&x.po.no===state.orderSel;})[0];if(!d)return;
  var action=csValue('sc-sample-po-status');
  var comment=(document.getElementById('sc-sample-po-comment')||{value:''}).value.trim();
  if(!action){scToast('Select a status first','error');return;}
  if(isFormStep(d.id,action)){scOpenActionModal(action,comment,'order',d.id);return;}
  var reason=readReason('sc-sample-po');
  if(reasonMissing(action,reason))return;
  withReason(reason,function(){advanceSample(d,action,comment);});
  state.logAdd=null;
  scRender();
}

/* ── SAMPLE PO PANEL ──────────────────────────────────────────────────────  */
function sampleOrderPanelHTML(d){
  var tabs=ORDER_TABS;
  var bar=tabBarHTML(tabs,state.orderTab,'scOrderTab','scCloseOrder','sc-order-tabs');
  var ms=sampleMilestones(d),it=d.item,value=it.qty*it.price;
  var poLogs=ms.filter(function(l){return /^(SCR Approved|PO )/.test(l.status);});
  var msDate=function(st){var x=ms.filter(function(l){return l.status===st;})[0];return x?x.date:'';};
  var body;
  if(state.orderTab==='details'){
    body=secHead('PO Header Details')+'<div class="lp-sb-detail-grid" style="margin-bottom:20px">'
      +fieldCard(ICO.hash,'PO No.',esc(d.po.no))
      +fieldCard(ICO.check,'PO Status',badge(poToneOf(d.po.status),d.po.status))
      +fieldCard(ICO.doc,'SCR No.',esc(d.id))
      +fieldCard(ICO.doc,'SCR Title',esc(d.title))
      +fieldCard(ICO.tag,'Order Type','Sub-Contracting')
      +fieldCard(ICO.handshake,'Vendor / Sub-Contractor',esc(d.vendor.code+' — '+d.vendor.name))
      +fieldCard(ICO.globe,'Vendor Address',esc(d.vendor.addr))
      +fieldCard(ICO.globe,'Location','Hazira Works')
      +fieldCard(ICO.user,'Buyer',esc(d.buyer))
      +fieldCard(ICO.cal,'Created On',esc(msDate('SCR Approved')))
      +fieldCard(ICO.cal,'Approved On',esc(msDate('PO Approved')))
      +fieldCard(ICO.doc,'Rate Contract',esc(poInfo(d.po.no).rc))
      +fieldCard(ICO.money,'Price Basis',esc(poInfo(d.po.no).basis))
      +fieldCard(ICO.money,'Currency',esc(poInfo(d.po.no).currency))
      +fieldCard(ICO.clock,'Payment Terms',esc(poInfo(d.po.no).terms))
      +fieldCard(ICO.user,'PMG Approver',esc(poInfo(d.po.no).approver))
      +fieldCard(ICO.tag,'Tax Code',esc(poInfo(d.po.no).tax))
      +fieldCard(ICO.money,'PO Value',fmtAmt(value))
      +'</div>'
      +tableHead('PO Lines')+recTable(['#','Receivable Item','Quantity','UOM','Price / Unit','Line Value'],
        '<tr><td>1</td><td><b>'+esc(it.name)+'</b></td><td>'+it.qty+'</td><td>'+esc(it.uom)+'</td><td>'+fmtAmt(it.price)+'</td><td><b>'+fmtAmt(value)+'</b></td></tr>');
  }else if(state.orderTab==='history'){
    body=historyHTML(d.id,true);
  }else if(state.orderTab==='workflow'){
    var pend=d.po.status==='Draft'?{action:'Generate PO',role:'Buyer'}:d.po.status==='Created'?{action:'Approve PO',role:'PO Approver'}:null;
    body=wfTimelineHTML(attachViews(poLogs,d.id),pend,PO_FLOW);
  }else{
    var pnext=d.po.status==='Draft'?{action:'Generate PO',role:'Buyer'}:d.po.status==='Created'?{action:'Approve PO',role:'PO Approver'}:null;
    var plogs=poLogs.slice().reverse();
    /* the PO steps this role can take now - the Buyer / PO Approver on their
       step, Super Admin on any - so the PO's own Logs can move it on */
    var popts=rowAvailable(d.id).filter(function(a){return PO_ACTIONS.indexOf(a)>=0;});
    body=logsTabHTML({key:'po:'+d.po.no,dealId:d.id,id:'sc-sample-po',logs:plogs,opts:popts,submit:'scSubmitSamplePOLog',
      current:'PO '+d.po.status,sub:pnext?'Pending with <b>'+esc(pnext.role)+'</b>':'No further actions on this Purchase Order',
      state:pnext?'waiting':'completed',next:pnext,nextBtn:pnext?handoffBtn(pnext.role):'',
      endLog:lastLogOf(plogs,'PO Approved'),doneTitle:'PO '+d.po.status,doneVerb:'Approved',
      doneSub:'Nothing further is pending on this Purchase Order.'});
  }
  if(state.orderTab==='details')body=poTools(d.po.no,body);
  return expHeadHTML()+bar+'<div class="lp-isb-body">'+body+'</div>';
}

/* ══ LOG WRITERS ══════════════════════════════════════════════════════════  */
function stamp(){
  var d=new Date();
  return {
    date:fmtDate(d),
    time:d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false})
  };
}
/* Who signs a log: the person holding the current role, or System for the
   steps the application takes on its own. */
var AUTO_STATUSES=['PO Auto-Created','Outbound Key Generated','Transfer Order Generated','Delivery Note Generated'];
function who(){
  return state.role==='Super Admin'?'Super Admin User'
    :state.role==='Planner'?'Kinjal Sisodiya'
    :state.role==='Buyer'?'Madan Mohan'
    :SAMPLE_PEOPLE[state.role]||'Kinjal Sisodiya';
}
function logEntry(status,comment){
  var s=stamp(),auto=AUTO_STATUSES.indexOf(status)>=0;
  comment=String(comment||'').replace(/^\s*—\s*/,'').trim();
  return {status:status,comment:comment,reason:auto?'':curReason,by:auto?'System':who(),role:auto?'System':state.role,
    date:s.date,time:s.time,portal:'Web'};
}
function addDealLog(status,comment){state.dealLogs.unshift(logEntry(status,comment));}
function addPOLog(status,comment){state.poLogs.unshift(logEntry(status,comment));}

/* ══ ACTIONS WITHOUT A FORM ═══════════════════════════════════════════════  */
/* The ASN or IMR a step was taken on ('asn:2', 'imr:0'), set for the length
   of one submit; without one, the first record that is ready. */
var curTarget=null;
function targetIndex(kind,ready){
  var list=kind==='asn'?state.asns:state.imrs,m=/^(asn|imr):(\d+)$/.exec(curTarget||'');
  if(m&&m[1]===kind&&list[+m[2]]&&ready(list[+m[2]]))return +m[2];
  return list.findIndex(ready);
}
function executeDealAction(action,comment){
  if(CREATE_TAB[action]){runCreate(LIVE_ID,action,comment);return;}
  if(action==='Submit SCR'){
    state.scr='sent';
    addDealLog('SCR Submitted',comment||'Updated after return and submitted again.');
    scToast(LIVE_ID+' submitted','success','Back with the PMG Approver for approval.');
    return;
  }
  if(action==='Approve SCR'){
    state.scr='approved';state.po='draft';
    addDealLog('SCR Approved',comment);
    addPOLog('PO Auto-Created','PO '+LIVE_PO+' created automatically in Draft after SCR approval.');
    state.poCreated=state.poLogs[0].date;
    scToast('SCR approved','success','PO '+LIVE_PO+' created in Draft for the Buyer.');
  }
  else if(action==='Return SCR'){state.scr='returned';addDealLog('SCR Returned',comment);scToast('SCR returned to the Planner','info','The Planner edits it and submits it again.');}
  else if(action==='Reject SCR'){addDealLog('SCR Rejected',comment);scToast('SCR rejected','error');}
  else if(action==='Goods Release & Issue'){
    state.goodsIssue=true;state.shipment='outbound_released';state.deliveryNote='generated';
    addDealLog('Goods Release & Issue',comment);
    addDealLog('Delivery Note Generated','DN/26/0123 generated after Goods Release & Issue.');
    scToast('Goods released','success','Delivery Note DN/26/0123 generated.');
  }
  else if(action==='Return Shipment'){addDealLog('Shipment Returned',comment);scToast('Shipment returned','info');}
  else if(action==='Approve Delivery Note'){state.deliveryNote='approved';addDealLog('Delivery Note Approved',comment);scToast('Delivery Note approved');}
  else if(action==='Return Delivery Note'){addDealLog('Delivery Note Returned',comment);scToast('Delivery Note returned','info');}
  else if(action==='Generate Challan'){
    state.challan='generated';state.shipment='challan_generated';
    addDealLog('Challan Generated',comment+' — CHL/26/0103');
    scToast('Challan CHL/26/0103 generated');
  }
  else if(action==='Return Challan'){addDealLog('Challan Returned',comment);scToast('Challan returned','info');}
  else if(action==='Confirm Gate Outward'){
    state.gateOut=true;state.challan='gate_cleared';
    addDealLog('Gate Outward Confirmed',comment);scToast('Gate outward confirmed');
  }
  else if(action==='Return Gate Outward'){addDealLog('Gate Outward Returned',comment);scToast('Gate outward returned','info');}
  else if(action==='Confirm Shipment'){
    state.shipmentConfirmed=true;
    addDealLog('Shipment Confirmed',comment+' — Material Position updated to At Vendor');
    scToast('Shipment confirmed','success','Material Position is now At Vendor.');
  }
  else if(action==='Clear ASN'){
    var i=targetIndex('asn',function(a){return a.qc==='Created';});
    if(i>=0){state.asns[i].qc='QC Cleared';addDealLog('ASN QC Cleared',comment+' — '+state.asns[i].no);scToast(state.asns[i].no+' cleared by QC');}
  }
  else if(action==='Return ASN'){
    var j=targetIndex('asn',function(a){return a.qc==='Created';});
    if(j>=0){state.asns[j].qc='Returned';addDealLog('ASN Returned',comment+' — '+state.asns[j].no);scToast(state.asns[j].no+' returned to vendor','info');}
  }
  else if(action==='Confirm Gate Inward'){
    var k=targetIndex('asn',function(a){return a.qc==='QC Cleared'&&!a.gateIn;});
    if(k>=0){state.asns[k].gateIn=true;addDealLog('Gate Inward Confirmed',comment+' — '+state.asns[k].no);scToast('Gate inward confirmed for '+state.asns[k].no);}
  }
  else if(action==='Confirm IMR'){
    var m=targetIndex('imr',function(x){return x.status==='Created';});
    if(m>=0){state.imrs[m].status='Confirmed';addDealLog('IMR Confirmed',comment+' — '+state.imrs[m].no);scToast(state.imrs[m].no+' confirmed');}
  }
  else if(action==='Short Close'){
    state.shortClosed=true;addDealLog('Short Close',comment);
    scToast('Open quantity short closed','success','The transaction can now be closed.');
  }
  else if(action==='Complete Reconciliation'){state.reconciled=true;addDealLog('Reconciliation Completed',comment);scToast('Reconciliation completed');}
  else if(action==='Confirm Full Receipt'){state.fullReceipt=true;addDealLog('Full Receipt Confirmed',comment);scToast('Full receipt confirmed');}
  else if(action==='Close Transaction'){
    state.closed=true;state.scr='closed';state.po='closed';state.shipment='closed';state.challan='closed';
    addDealLog('Transaction Closed',comment);
    addPOLog('PO Closed','Closed as part of the final Sub-Contracting transaction closure.');
    scToast('Transaction closed','success','SCR, PO, Shipment and Challan are now Closed.');
  }
}

/* ══ LISTING ACTIONS ══════════════════════════════════════════════════════
   The ACTION cell is ADT's split control: the dark button names where the
   deal stands and opens the logged-in role's actions as a numbered menu;
   the hamburger opens the panel. An action the deal is ready for is live,
   the rest are greyed. Picking one opens Update Status - from -> to, the
   status, a comment - which writes the same log the panel's form would. */
var ICO_DOWN='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
var ICO_ARROW='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
function liveCurrent(){var ev=liveEvents();return ev.length?ev[ev.length-1].status:scrLabel();}
function rowActionsFor(){return ROW_ACTIONS[state.role]||[];}
/* The actions on offer that this deal is ready for, in menu order. */
function rowAvailable(id){
  var list=rowActionsFor();
  if(id===LIVE_ID){
    var ok=validDealActions().concat(validPOActions());
    return list.filter(function(a){return ok.indexOf(a)>=0;});
  }
  var d=sampleDeal(id),n=d&&sampleNextOf(d);
  /* receipts: whatever the records are ready for, for the role that owns it */
  if(d&&rxPhase(d)&&ensureRx(d)){
    var ra=rxActions(d).filter(function(a){return state.role==='Super Admin'||RX_OWNER[a]===state.role;});
    return list.filter(function(a){return ra.indexOf(a)>=0;});
  }
  if(!n||!(SAMPLE_STEP[n.action]||n.action==='Submit SCR'))return [];
  if(state.role!=='Super Admin'&&roleKey(n.role)!==state.role)return [];
  var here=[n.action].concat(SAMPLE_ALT[n.action]||[]);
  return list.filter(function(a){return here.indexOf(a)>=0;});
}
function rowMenuEl(){
  var m=document.getElementById('sc-row-menu');
  if(!m){
    m=document.createElement('div');m.id='sc-row-menu';m.className='ct-action-menu';
    m.addEventListener('click',function(e){e.stopPropagation();});
    document.body.appendChild(m);
  }
  return m;
}
function scCloseRowMenu(){var m=document.getElementById('sc-row-menu');if(m){m.classList.remove('open');m.dataset.id='';}}
function scRowMenu(btn,id,scope){
  var m=rowMenuEl();
  if(m.classList.contains('open')&&m.dataset.id===id){scCloseRowMenu();return;}
  scCloseAllDD();
  var list=rowActionsFor(),ok=rowAvailable(id);
  /* PO STEPS ARE NOT TAKEN FROM DEALS. Send for Approval, Approve PO and Return
     PO belong to the Purchase Order, so the Deals menu leaves them out for
     every role, Super Admin included. A role left with nothing here is told
     so and pointed to the PO. */
  var dealItems=list.filter(function(a){return PO_ACTIONS.indexOf(a)<0;});
  if(scope!=='po'&&(!dealLogsAllowed()||!dealItems.length)){
    var po=list.some(function(a){return PO_ACTIONS.indexOf(a)>=0;})?dealPONo(id):'';
    m.innerHTML=''
      +'<div class="ct-act-item done">No actions in Deals</div>'
      +(po?'<div class="ct-act-item sc-act-avail" onclick="scRowOpenPO()">Open Purchase Order '+esc(po)+'</div>':'');
  }else m.innerHTML=''
    +(list.length?list.map(function(a,i){
      if(scope==='po'&&PO_APPROVAL.indexOf(a)<0)return '';
      if(scope!=='po'&&PO_ACTIONS.indexOf(a)>=0)return '';
      var on=ok.indexOf(a)>=0||(scope!=='po'&&canJump(id,a));
      /* for the Super Admin, the step the deal stands at is marked, not greyed */
      var here=!on&&scope!=='po'&&state.role==='Super Admin'&&jumpTarget(a)
        &&flowIndex(jumpTarget(a))===progressIndex(dealEventsOldestFirst(id));
      return '<div class="ct-act-item'+(on?' sc-act-avail':' done')+'"'
        +(on?' onclick="scRowAction(\''+id+'\','+i+(scope?',\''+scope+'\'':'')+')"'
            :' title="'+(here?'The deal is at this step now':'Not available at this stage')+'"')+'>'
        +esc(actLabel(a))+(here?'<span class="sc-act-cur">Current</span>':'')+'</div>';
    }).join(''):'<div class="ct-act-item done">No actions for this role</div>');
  m.dataset.id=id;m.classList.add('open');
  /* As wide as its longest item, so the space after the text matches the
     space before it; right-aligned under the button. */
  m.style.width='max-content';m.style.maxHeight='';
  var r=btn.getBoundingClientRect(),w=Math.ceil(m.getBoundingClientRect().width);
  scPlaceMenu(m,{left:r.right-w,right:r.right,top:r.top,bottom:r.bottom,width:w});
}
document.addEventListener('click',scCloseRowMenu);
document.addEventListener('scroll',function(e){
  var m=document.getElementById('sc-row-menu');
  if(m&&m.classList.contains('open')&&!m.contains(e.target))scCloseRowMenu();
},true);
window.addEventListener('resize',scCloseRowMenu);
document.addEventListener('keydown',function(e){if(e.key==='Escape')scCloseRowMenu();});

/* the PO a deal has, if any */
function dealPONo(id){
  if(id===LIVE_ID)return state.po!=='none'?LIVE_PO:'';
  var d=sampleDeal(id);return d&&d.po?d.po.no:'';
}
/* the row menu's link to it, for a role that does not act in Deals */
function scRowOpenPO(){var m=document.getElementById('sc-row-menu'),id=m&&m.dataset.id;scCloseRowMenu();if(id)scGoTab('po',id);}
function scRowAction(id,i,scope){
  scCloseRowMenu();
  var action=rowActionsFor()[i];if(!action)return;
  if(scope!=='po'&&(!dealLogsAllowed()||PO_ACTIONS.indexOf(action)>=0))return;
  /* THE DROPDOWN OPENS THE STEP IN LOGS - no popup. The record's Logs tab
     opens (the PO's, for a PO step) with the chosen step's form already open,
     exactly as if it had been picked there - held for a create step whose
     details are not saved yet. A Super Admin's jump opens there too. */
  if(scope!=='po'&&rowAvailable(id).indexOf(action)<0&&canJump(id,action)){scStartLog(id,'Go to Step',{target:jumpTarget(action)});return;}
  scStartLog(id,action);
}
/* GO TO STEP (Super Admin). In the Deals dropdown every step of the flow is
   live for the Super Admin. The step the deal is ready for runs as usual;
   any other moves the deal straight to the state right after that step -
   forward, or back - with a reason, logged as "Moved to <step>" / "Moved back
   to <step>". Nothing is erased: History records each field that changes and
   Workflow plans the remaining steps from there. Returns and rejections are
   not steps to go to, so they stay live only when the deal is ready for them. */
function jumpTarget(action){var st=ACTION_RESULT[action];return st&&flowIndex(st)>=0?st:'';}
function canJump(id,action){
  if(state.role!=='Super Admin'||!jumpTarget(action))return false;
  return flowIndex(jumpTarget(action))!==progressIndex(dealEventsOldestFirst(id));
}
function scJumpSubmit(formId){
  var la=state.logAdd;if(!la||la.action!=='Go to Step'||state.role!=='Super Admin')return;
  var reason=readReason(formId),comment=((document.getElementById(formId+'-comment')||{}).value||'').trim();
  if(reasonMissing('Go to Step',reason))return;
  var back=flowIndex(la.target)<progressIndex(dealEventsOldestFirst(la.dealId));
  withReason(reason,function(){moveDealTo(la.dealId,la.target,comment,back?'Moved back to ':'Moved to ');});
  state.logAdd=null;scRender();
  scToast(la.dealId+(back?' moved back to ':' moved to ')+la.target,'info');
}
/* A sample deal moves one stage per action; its log entries are generated
   from the stage, with the step just taken signed by who took it. */
var SAMPLE_STEP={
  'Approve SCR':function(d,i){d.stage='po';d.po=d.po||{no:d._poNo||String(37760+i),status:'Draft'};d.po.status='Draft';},
  'Generate PO':function(d){d.po.status='Created';},
  'Approve PO':function(d){d.po.status='Approved';},
  'Create Shipment':function(d){d.stage='shipment';},
  'Goods Release & Issue':function(d){d.stage='outbound';d.sub='dn';},
  'Approve Delivery Note':function(d){d.sub='challan';},
  'Generate Challan':function(d){d.sub='gate';},
  'Confirm Gate Outward':function(d){d.sub='confirm';},
  'Confirm Shipment':function(d){d.stage='asn';d.sub='vendor';},
  'Create ASN':function(d){d.asns++;d.sub='qc';},
  'Clear ASN':function(d){d.sub='gatein';},
  'Confirm Gate Inward':function(d){d.stage='imr';d.sub='create';},
  'Create IMR':function(d){d.imrs++;d.sub='confirm';},
  'Confirm IMR':function(d){d.stage='reconciliation';d.sub='';d.received=d.item.qty;},
  'Complete Reconciliation':function(d){d.stage='closure';d.sub='receipt';},
  'Confirm Full Receipt':function(d){d.sub='close';},
  'Close Transaction':function(d){d.stage='closed';d.sub='';d.po.status='Closed';}
};
/* The Return / Reject a sample's current step also allows. They write their
   log entry and leave the deal where it is - except Reject SCR, which ends it. */
var scSeq=0;   // orders entries recorded within the same second
var SAMPLE_ALT={
  'Approve SCR':['Return SCR','Reject SCR'],'Approve PO':['Return PO'],
  'Goods Release & Issue':['Return Shipment'],'Approve Delivery Note':['Return Delivery Note'],
  'Confirm Gate Outward':['Return Gate Outward'],'Clear ASN':['Return ASN']
};
function advanceSample(d,action,comment){
  if(!d)return;
  if(!SAMPLE_STEP[action]){
    var t0=stamp();d.extra=d.extra||[];
    d.extra.push({status:ACTION_RESULT[action]||action,role:state.role,by:who(),comment:comment,reason:curReason,date:t0.date,time:t0.time,portal:'Web',seq:++scSeq});
    if(action==='Reject SCR')d.rejected=true;
    if(action==='Return SCR')d.returned=true;
    if(action==='Submit SCR')d.returned=false;
    scToast(d.id+': '+(ACTION_RESULT[action]||action),action==='Reject SCR'?'error':'info');
    return;
  }
  var step=SAMPLE_STEP[action];
  step(d,SAMPLE_DEALS.indexOf(d));
  var t=stamp();d.notes=d.notes||{};
  d.notes[ACTION_RESULT[action]]={by:who(),role:state.role,comment:comment,date:t.date,time:t.time,seq:++scSeq};
  scToast(d.id+': '+(ACTION_RESULT[action]||action));
}

/* ══ POPUPS ═══════════════════════════════════════════════════════════════
   One root, one shell (.ct-modal), one footer contract: Cancel on the left of
   the primary, primary last. Everything inside is .policy-form-section /
   .ep-form-* — the same two components every creation form in ADT is built
   from. */
function modalShell(title,sub,bodyHTML,footHTML,wide,cls){
  return '<div class="ct-modal-overlay">'
    +'<div class="ct-modal sc-modal'+(wide?' ct-modal--form':'')+(cls?' '+cls:'')+'" role="dialog" aria-modal="true">'
      +'<div class="sc-modal-head">'
        +'<div class="ct-modal-hdr" style="margin-bottom:6px">'
          +'<div><div class="ct-modal-title">'+esc(title)+'</div></div>'
          +'<button class="ct-modal-close" onclick="scCloseModal()" title="Close">'+ICO.close+'</button>'
        +'</div>'
        +(sub?'<div class="ct-modal-sub" style="margin:0 0 4px">'+esc(sub)+'</div>':'')
      +'</div>'
      +'<div class="sc-modal-body">'+bodyHTML+'</div>'
      +'<div class="ct-modal-foot sc-modal-foot">'+footHTML+'</div>'
    +'</div></div>';
}
var modalStack=[];
document.addEventListener('wheel',function(e){
  var root=document.getElementById('sc-modal-root');
  if(!root||!root.innerHTML)return;
  if(!e.target.closest||!e.target.closest('.sc-modal-body,.cs-dropdown,.ct-action-menu'))e.preventDefault();
},{passive:false});
function scCloseModal(){
  var root=document.getElementById('sc-modal-root');
  if(modalStack.length){root.innerHTML=modalStack.pop();return;}
  root.innerHTML='';
  pendingAction=null;
}
function section(title,inner){
  return '<div class="policy-form-section" style="padding:20px 0;border-bottom:1px solid #f1f3f5">'
    +'<div class="policy-section-title">'+esc(title)+'</div>'+inner+'</div>';
}
function field(label,control,req,full){
  return '<div class="ep-form-group'+(full?' ep-form-full':'')+'">'
    +'<label class="ep-form-label">'+esc(label)+(req?' <span class="req">*</span>':'')+'</label>'
    +control+'</div>';
}
function input(id,value,type){
  return '<input class="ep-form-input" id="'+id+'" type="'+(type||'text')+'" value="'+esc(value)+'">';
}
function readonlyField(label,value,full){
  return '<div class="ep-form-group'+(full?' ep-form-full':'')+'">'
    +'<label class="ep-form-label">'+esc(label)+'</label>'
    +'<div class="sc-ro">'+esc(value)+'</div></div>';
}
/* ADT's custom select, never a native one (form-system.css §3): a native
   list is painted by the operating system. Pre-selects the first option, as
   the native control did. */
function select(id,opts){return csField(id,opts,opts[0]);}
/* A Yes/No answer is ADT's .segmented strip, labelled like every field. */
function segField(label,yes){
  return '<div class="ep-form-group"><label class="ep-form-label">'+esc(label)+'</label>'
    +'<div class="segmented">'
    +'<button type="button" class="seg-btn'+(yes?' active':'')+'" onclick="scSeg(this)">Yes</button>'
    +'<button type="button" class="seg-btn'+(yes?'':' active')+'" onclick="scSeg(this)">No</button>'
    +'</div></div>';
}
function scSeg(btn){
  btn.parentElement.querySelectorAll('.seg-btn').forEach(function(b){b.classList.toggle('active',b===btn);});
}

/* ── CREATE SCR ───────────────────────────────────────────────────────────  */
/* CREATE / EDIT SCR IS A PAGE. The form opens in the content area with a
   Back button at the top and its actions in a bar pinned to the bottom of
   the screen. state.scrForm holds the SCR being edited (null when creating). */
function scOpenCreateSCR(ed){
  state.scrForm=ed||null;
  if(!ed)scrDraftFiles=[];
  state.page='scr-form';state.dealOpen=false;state.orderOpen=false;
  scRender();
  var pc=document.getElementById('adt-content');if(pc)pc.scrollTop=0;
}
function scBackFromForm(){
  var ed=state.scrForm;state.scrForm=null;
  state.page='deals';
  scRender();
  if(ed)scOpenDeal(ed.id);
}
function scrFormPageHTML(){
  var ed=state.scrForm;
  /* editing a returned SCR ends in a resubmission; editing one that is still
     Sent for Approval just updates what the approver is looking at */
  var returned=ed&&(ed.id===LIVE_ID?state.scr==='returned':!!(sampleDeal(ed.id)||{}).returned);
  var bases=['Production Order','Project','Maintenance Order'];
  var header=section('SCR Header Details',
    '<div class="policy-form-grid">'
    +field('SCR Title',input('f-title',ed?ed.title:'Sub-contracting for shaft machining'),true)
    +field('SCR Base',csField('f-base',bases,ed?ed.base:'Production Order'),true)
    +field('Nature of SCR / Work Type',input('f-nature',ed?ed.nature:'Job'),true)
    +field('Purchase Office',select('f-office',['PUR-121 — Manufacturing Procurement']),true)
    +field('Buyer',csField('f-buyer',['Madan Mohan','Gagan Tej'],ed?ed.buyer:'Madan Mohan'))
    +field('Approver',select('f-approver',['PMG Approver']))
    +'<div class="sc-yn-grid ep-form-full">'
      +segField('SCR Unpeg',true)+segField('Inter-Unit',false)+segField('Partial Material as FIM',true)
      +segField('Billable',true)+segField('Logistics Required',true)
    +'</div>'
    +field('Comment','<textarea class="ep-form-input" id="f-remarks" style="min-height:76px">'+esc(ed?ed.remarks:'For urgent processing')+'</textarea>',false,true)
    +field('Header Text','<textarea class="ep-form-input" id="f-headtext" style="min-height:76px">'+esc(ed?ed.head:'Additional header information')+'</textarea>',false,true)
    +'</div>');

  var base=section('SCR Base Details — Production Order / Project',
    '<div class="policy-form-grid">'
    +field('Production Order / Project',select('f-po',['PO-100045 — Shaft Machining']),true)
    +field('Project Element',select('f-pe',['Structural Fabrication']))
    +field('Activity / Cost Object','<div class="sc-ro">Machining Activity</div>')
    +'</div>');

  var vendor=section('Vendor Details',
    '<div class="policy-form-grid">'
    +field('Vendor / Subcontractor',select('f-vendor',['21005 — Sri Venkateswara Aerospace Pvt.ltd']),true)
    +field('Vendor Address',select('f-vaddr',['Hyderabad, Telangana 500084']),true)
    +field('Rate Contract',select('f-rc',['RC-123']))
    +field('Required Skill / Service',select('f-skill',['Machining Services']),true)
    +'</div>');

  var recv=section('Receivable Item Details',
    '<div class="sc-item-list" id="sc-recv-list">'+(ed?recvCardHTML(1,ed.item.name,String(ed.item.qty),String(ed.item.price),ed.item.hsn||'0202'):recvCardHTML(1,'Fabricated End Frame','10','250','0202'))+'</div>'
    +'<button class="btn-outline btn-sm sc-item-add" onclick="scAddReceivable()">'+ICO.plus+' Add Receivable Item</button>');

  var issue=section('Issue Item Details',
    '<div class="sc-item-list" id="sc-issue-list">'+issueCardHTML(1,'Fabricated End Frame','SKU_52297_3814 — Mild Steel Plate 10 mm','10','Zone A','0202')+'</div>'
    +'<button class="btn-outline btn-sm sc-item-add" onclick="scAddIssue()">'+ICO.plus+' Add Issue Item</button>');

  var attach=section('Attachments','<div id="sc-scr-att">'+scrAttachHTML()+'</div>');

  var top='<div class="sc-form-top">'
      +'<button class="sc-back-btn" type="button" onclick="scBackFromForm()" title="Back">'+ICO_BACK+'<span>Back</span></button>'
      +'<div class="sc-form-heading"><div class="sc-form-title">'+(ed?'Edit SCR':'Create SCR')+'</div>'
      +'<div class="sc-form-sub">'+(ed?esc(ed.id)+(returned?' · returned to the Planner':' · Sent for Approval'):'Sub-Contracting Request')+'</div></div>'
    +'</div>';
  var body=ed?(returned?returnNoteHTML(ed.id,true):'')+header+base+vendor+recv+issue:header+base+vendor+recv+issue+attach;
  var bar='<div class="sc-form-bar"><span class="hr-actions-sub">'
      +(ed?(returned?'Submitting sends the SCR back to the PMG Approver.':'Your changes update the SCR the PMG Approver is reviewing.'):'Submitting sends the SCR to the PMG Approver.')+'</span>'
    +'<div class="ct-modal-btns">'
      +'<button class="btn-outline" onclick="scBackFromForm()">Cancel</button>'
      +(ed?(returned
            ?'<button class="btn-outline" onclick="scResubmitSCR(\''+ed.id+'\',false)">Save Changes</button>'
              +'<button class="btn-primary" onclick="scResubmitSCR(\''+ed.id+'\',true)">Submit for Approval</button>'
            :'<button class="btn-primary" onclick="scResubmitSCR(\''+ed.id+'\',false)">Save Changes</button>')
         :'<button class="btn-outline" onclick="scSaveDraftSCR()">Save as Draft</button>'
          +'<button class="btn-primary" onclick="scSubmitSCR()">Submit for Approval</button>')
    +'</div></div>';
  return '<div class="sc-form-page">'+top+'<div class="sc-form-card">'+body+'</div>'+bar+'</div>';
}
var ICO_BACK='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
/* Files picked on the form travel with the SCR: on submit they become the
   deal's Attachments tab. */
var scrDraftFiles=[];
function scrAttachHTML(){
  var dz=' onclick="document.getElementById(\'sc-scr-file\').click()" ondragover="event.preventDefault();this.classList.add(\'is-over\')"'
    +' ondragleave="this.classList.remove(\'is-over\')" ondrop="event.preventDefault();this.classList.remove(\'is-over\');scScrFiles(event.dataTransfer.files)"';
  var list=scrDraftFiles.map(function(f,i){
    return '<div class="sc-draft-file"><span class="att-kind">'+attKind(f.name)+'</span><b>'+esc(f.name)+'</b><span>'+esc(f.size)+'</span>'
      +'<button class="att-row-btn is-danger" title="Remove" onclick="scScrFileRemove('+i+')">'+ATT_ICO.trash+'</button></div>';
  }).join('');
  return '<input type="file" id="sc-scr-file" multiple hidden onchange="scScrFiles(this.files);this.value=\'\'">'
    +(scrDraftFiles.length
      ?list+'<div class="att-zone att-zone-sm" style="margin:10px 0 0"'+dz+'><span class="att-zone-ico-sm">'+ATT_ICO.upload+'</span>Add more files</div>'
      :'<div class="att-zone att-zone-lg"'+dz+'><span class="att-zone-ico">'+ATT_ICO.upload+'</span>'
        +'<div class="att-zone-title">Drop files here, or click to browse</div>'
        +'<div class="att-zone-hint">PDF, images, documents and spreadsheets · up to 10 MB each</div></div>');
}
function scScrFiles(fileList){
  Array.prototype.forEach.call(fileList||[],function(f){
    if(f.size>10*1048576){scToast(f.name+' is over 10 MB','error');return;}
    scrDraftFiles.push({name:f.name,size:attSize(f.size),url:URL.createObjectURL(f)});
  });
  document.getElementById('sc-scr-att').innerHTML=scrAttachHTML();
}
function scScrFileRemove(i){
  var f=scrDraftFiles.splice(i,1)[0];if(f&&f.url)URL.revokeObjectURL(f.url);
  document.getElementById('sc-scr-att').innerHTML=scrAttachHTML();
}
/* LINE ITEMS AS CARDS. Each receivable / issue item is one card: a header
   naming it, then its fields in a four-column grid of the form's own
   controls - so a whole item is filled in place, with no sideways scroll.
   Field ids are unchanged (r1-qty, i1-item, ...), so submit reads them as
   before. Items added after the first can be removed. */
function itemField(label,control,req,span){
  return '<div class="ep-form-group'+(span?' sc-span2':'')+'"><label class="ep-form-label">'+esc(label)
    +(req?' <span class="req">*</span>':'')+'</label>'+control+'</div>';
}
function itemRO(label,value,span){return itemField(label,'<div class="sc-ro">'+esc(value)+'</div>',false,span);}
function itemCard(kind,n,title,status,grid){
  return '<div class="sc-item-card" data-kind="'+kind+'">'
    +'<div class="sc-item-head"><span class="sc-item-no">'+n+'</span><span class="sc-item-title">'+esc(title)+'</span>'
    +(status?badge('open',status):'')
    +(n>1?'<button class="sc-item-del" type="button" title="Remove item" onclick="scRemoveItem(this)">'+ICO.close+'</button>':'')
    +'</div><div class="sc-item-grid">'+grid+'</div></div>';
}
function recvCardHTML(n,item,qty,price,hsn){
  var k='r'+n;
  return itemCard('recv',n,'Receivable Item '+n,'',
     itemField('Receivable Item',select(k+'-item',[item]),true,true)
    +itemRO('Item Type','Finished Product')
    +itemRO('UOM','Each')
    +itemField('Expected Qty',input(k+'-qty',qty,'number'),true)
    +itemField('Est. Price / Unit',input(k+'-price',price,'number'),true)
    +itemField('Receiving Warehouse',select(k+'-wh',['Hazira Works']))
    +itemField('HSN',select(k+'-hsn',[hsn]))
    +itemField('Expected Receipt Date',input(k+'-date','2026-10-30','date'))
    +itemRO('Rate Contract','RC-123'));
}
function issueCardHTML(n,forItem,item,qty,zone,hsn){
  var k='i'+n;
  return itemCard('issue',n,'Issue Item '+n,'',
     itemRO('For Receivable Item',forItem)
    +itemField('Issue Item',select(k+'-item',[item]),true,true)
    +itemField('Issue Qty',input(k+'-qty',qty,'number'),true)
    +itemRO('Item Type','Raw Material')
    +itemRO('UOM','Each')
    +itemRO('Warehouse','Hazira Works')
    +itemRO('Storage Location','Main Store')
    +itemRO('Storage Zone',zone)
    +itemRO('Free Issue Material','Yes')
    +itemRO('Tax Code','GST-05')
    +itemRO('HSN',hsn)
    +itemRO('BOM Ratio','1:1'));
}
function scAddReceivable(){
  var list=document.getElementById('sc-recv-list');if(!list)return;
  var n=list.children.length+1;
  list.insertAdjacentHTML('beforeend',recvCardHTML(n,'Machined Shaft','5','350','0203'));
}
function scAddIssue(){
  var list=document.getElementById('sc-issue-list');if(!list)return;
  var n=list.children.length+1;
  list.insertAdjacentHTML('beforeend',issueCardHTML(n,'Machined Shaft','SKU_52288_3814 — Carbon Steel Billet','5','Zone B','0206'));
}
function scRemoveItem(btn){
  var card=btn.closest('.sc-item-card'),list=card&&card.parentElement;if(!card)return;
  card.remove();
  /* renumber the headers that remain; field ids stay as they were */
  Array.prototype.forEach.call(list.children,function(c,i){
    c.querySelector('.sc-item-no').textContent=i+1;
    c.querySelector('.sc-item-title').textContent=(c.dataset.kind==='recv'?'Receivable Item ':'Issue Item ')+(i+1);
  });
}
function scSaveDraftSCR(){state.scrForm=null;state.page='deals';scRender();scToast('SCR saved as Draft','info');}
/* ── RETURN SCR FLOW ─────────────────────────────────────────────────────────
   Return SCR sends the request back to the Planner: SCR Status reads "SCR
   Returned", the deal joins the Planner's queue, and its Details tab opens
   with the approver's reason and an Edit button. Edit (or Submit SCR from the
   menu) opens the SCR form filled with the current details: Save Changes
   keeps it with the Planner, Submit for Approval logs "SCR Submitted" and
   puts it back with the PMG Approver as Sent for Approval. Works the same on the
   live deal and the samples. */
/* ADT's standard Edit mark: a pencil over a square. Every Edit button uses this one. */
var ICO_EDIT='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
/* EVERY RETURN CARRIES A REASON. Return SCR, Return PO and the other returns
   ask for a mandatory Reason field of their own - the comment stays optional.
   The reason travels on the log entry (logEntry reads curReason, set for the
   length of the one action) and shows as its own line in Logs and Workflow. */
var RETURN_ACTIONS=['Return SCR','Return PO','Return Shipment','Return Delivery Note','Return Gate Outward','Return ASN','Move Back','Short Close','Go to Step'];
var curReason='';
function needsReason(action){return RETURN_ACTIONS.indexOf(action)>=0;}
function reasonMissing(action,reason){
  if(needsReason(action)&&!reason){scToast('Select a reason for the return, or choose Other and type it','error');return true;}
  return false;
}
/* THE REASONS A RETURN OFFERS - the common ones for that step, then Other,
   which opens a box to type the reason in. */
var RETURN_REASONS={
  'Return SCR':['Incomplete item details','Wrong vendor selected','Quantity or price mismatch','Missing drawing / specification','Budget not approved'],
  'Return PO':['Price differs from rate contract','Wrong tax code','Incorrect payment terms','Quantity mismatch with SCR'],
  'Return Shipment':['Material not available in stock','Wrong issue material','Packaging not as specified','Quantity mismatch'],
  'Return Delivery Note':['Quantities do not match Transfer Order','Wrong consignee details','Missing transport details'],
  'Return Gate Outward':['Vehicle details mismatch','Challan copy missing','Material count mismatch at gate'],
  'Return ASN':['Quantity mismatch','Damaged material','Quality not as specified','Wrong documents'],
  'Move Back':['Entered in error','Wrong document generated','Details need correction','Requested by the user'],
  'Go to Step':['Steps completed outside the system','Data correction','Entered in error','Requested by the user'],
  'Short Close':['Vendor cannot supply the balance','Requirement cancelled','Quality issues with the balance']
};
/* The reason given: the picked one, or what was typed under Other. */
function readReason(formId){
  var sel=csValue(formId+'-rsel');
  if(sel==='Other')return ((document.getElementById(formId+'-reason-other')||{}).value||'').trim();
  return sel||'';
}
function withReason(reason,fn){curReason=reason||'';try{fn();}finally{curReason='';}}
function reasonInnerHTML(formId,action){
  if(!needsReason(action))return '';
  return '<label class="ep-form-label">Reason <span class="req">*</span></label>'
    +csField(formId+'-rsel',(RETURN_REASONS[action]||[]).concat(['Other']),'','Select a reason','scReasonPicked')
    +'<input class="ep-form-input sc-reason-other" id="'+formId+'-reason-other" placeholder="Type the reason" style="display:none">';
}
function reasonFieldHTML(formId,action){
  return '<div id="'+formId+'-reason-wrap" class="ep-form-group ep-form-full sc-reason-field"'+(needsReason(action)?'':' style="display:none"')+'>'
    +reasonInnerHTML(formId,action)+'</div>';
}
/* The action changed (Update Status): the field shows or hides, and its list
   becomes that return's reasons. */
function toggleReason(formId,action){
  var w=document.getElementById(formId+'-reason-wrap');if(!w)return;
  csValues[formId+'-rsel']='';
  w.innerHTML=reasonInnerHTML(formId,action);
  w.style.display=needsReason(action)?'':'none';
}
function scReasonPicked(val,csid){
  var o=document.getElementById(csid.replace(/-rsel$/,'')+'-reason-other');if(!o)return;
  o.style.display=val==='Other'?'':'none';
  if(val==='Other')o.focus();else o.value='';
}
function lastReturn(id){
  if(id===LIVE_ID)return state.dealLogs.filter(function(l){return l.status==='SCR Returned';})[0]||null;
  var d=sampleDeal(id);return d?((d.extra||[]).filter(function(l){return l.status==='SCR Returned';}).slice(-1)[0]||null):null;
}
function returnNoteHTML(id,inForm){
  var r=lastReturn(id);if(!r)return '';
  return '<div class="info-box sc-return-note" style="margin:'+(inForm?'14px 0 4px':'0 0 18px')+'"><span class="ib-icon">'+ICO.info+'</span><div>'
    +'<strong>SCR returned by '+esc(r.by)+' · '+esc(r.date)+'</strong>'
    +esc(r.reason||r.comment||'No reason was added.')
    +(inForm?'':'<br>Edit the details and submit the SCR again.')+'</div></div>';
}
function scOpenResubmit(id){
  var ed;
  if(id===LIVE_ID){
    var l=L();
    ed={id:id,title:l.title,base:l.base,nature:l.nature||'Job',buyer:l.buyer,remarks:l.remarks||'',head:l.headText||'',
      item:{name:l.item.name,qty:l.item.qty,price:l.item.price}};
  }else{
    var d=sampleDeal(id);if(!d)return;
    ed={id:id,title:d.title,base:d.base,nature:d.workType,buyer:d.buyer,remarks:'',head:d.title,
      item:{name:d.item.name,qty:d.item.qty,price:d.item.price,hsn:d.item.hsn}};
  }
  state.page='deals';state.orderOpen=false;
  state.dealOpen=true;state.dealSel=id;state.dealTab='details';
  state.edit={id:id,tab:'details',vals:editStartVals(id,'details'),dirty:false};
  scRender();
}
function scResubmitSCR(id,submit,get,inline){
  var v=get||function(k){var el=document.getElementById(k);return el?String(el.value).trim():csValue(k);};
  var finish=inline?function(){state.edit=null;scRender();}:scBackFromForm;
  var title=v('f-title'),qty=parseInt(v('r1-qty'),10),price=parseFloat(v('r1-price'));
  if(!title){scToast('SCR Title is mandatory','error');return;}
  if(!(qty>0)||!(price>0)){scToast('Enter the receivable quantity and price','error');return;}
  var note='Updated after return and submitted again.';
  if(submit===undefined)submit=true;
  if(id===LIVE_ID){
    var cur=L();
    state.scrData={title:title,base:v('f-base')||cur.base,nature:v('f-nature')||cur.nature,buyer:v('f-buyer')||cur.buyer,
      remarks:v('f-remarks'),headText:v('f-headtext'),item:{name:v('r1-item')||cur.item.name,qty:qty,price:price,date:cur.item.date}};
    EXPECTED_QTY=qty;
    var wasSent=state.scr==='sent';
    if(submit){
      state.scr='sent';
      addDealLog('SCR Submitted',note);
      scToast(id+' submitted','success','Back with the PMG Approver for approval.');
    }else if(wasSent){
      scToast('SCR updated','success','The PMG Approver sees the changes.');
      finish();return;
    }else scToast('Changes saved','success','Submit the SCR from the Logs tab when it is ready.');
  }else{
    var d=sampleDeal(id);if(!d)return;
    d.title=title;d.base=v('f-base')||d.base;d.buyer=v('f-buyer')||d.buyer;d.item.qty=qty;d.item.price=price;
    if(submit)advanceSample(d,'Submit SCR',note);
    else if(!d.returned){
      scToast('SCR updated','success','The PMG Approver sees the changes.');
      finish();return;
    }else scToast('Changes saved','success','Submit the SCR from the Logs tab when it is ready.');
  }
  if(submit||inline){finish();return;}
  scRender();
}
function scSubmitSCR(){
  var v=function(id){var el=document.getElementById(id);return el?String(el.value).trim():csValue(id);};
  var title=v('f-title'),qty=parseInt(v('r1-qty'),10),price=parseFloat(v('r1-price'));
  if(!title){scToast('SCR Title is mandatory','error');return;}
  if(!(qty>0)||!(price>0)){scToast('Enter the receivable quantity and price','error');return;}
  var due=v('r1-date')?fmtDate(new Date(v('r1-date'))):'';
  state.scrData={title:title,base:v('f-base'),nature:v('f-nature')||'Job',buyer:v('f-buyer'),
    remarks:v('f-remarks'),headText:v('f-headtext'),item:{name:v('r1-item'),qty:qty,price:price,date:due}};
  EXPECTED_QTY=qty;
  attStore[LIVE_ID]=scrDraftFiles.map(function(f){
    return {name:f.name,size:f.size,by:who(),source:'Uploaded with the SCR',url:f.url};
  });
  scrDraftFiles=[];
  state.scr='sent';
  addDealLog('SCR Submitted','SCR raised against '+v('f-po').split(' — ')[0]+' and sent for approval.');
  state.scrForm=null;
  state.page='deals';state.stageFilter=null;state.stageLabel='';state.dealPage=1;
  state.dealFilter={q:'',process:'',scr:'',ship:''};
  state.dealOpen=false;
  scRender();
  scOpenDeal(LIVE_ID);
  scToast(LIVE_ID+' submitted','success','Pending with the PMG Approver — approve it from the Logs tab.');
}

/* ── THE FORM-BACKED ACTIONS ──────────────────────────────────────────────  */
/* A STEP THAT FILLS IN FIELDS OPENS IN ITS TAB - never a popup. Generate PO
   opens the PO's Details, Submit SCR the SCR's Details, and Create Shipment /
   Create ASN / Create IMR their own tab, each in create / edit mode. */
var CREATE_TAB={'Create Shipment':'shipment','Create ASN':'asn','Create IMR':'imr'};
function scOpenActionModal(action,comment,context,dealId){
  var id=dealId||LIVE_ID;
  if(action==='Generate PO'){scGoPODetails(poNoOf(id));return;}
  if(action==='Submit SCR'){scOpenResubmit(id);return;}
  if(CREATE_TAB[action]){scGoCreate(id,action);return;}
}

/* ══ RECORD & DOCUMENT VIEWS ══════════════════════════════════════════════  */

function scOpenView(type,index,id){
  /* Documents a deal tab already shows open with that tab's content, so a
     review popup and the tab can never disagree - edits included. */
  if(type==='outbound'){scOpenOBK(id||LIVE_ID);return;}
  if(DOC_TABS[type]){
    var lab={shipment:'Shipment',deliverynote:'Delivery Note',challan:'Challan',asn:'ASN',imr:'IMR'}[type];
    document.getElementById('sc-modal-root').innerHTML=modalShell(lab,id||LIVE_ID,
      '<div class="sc-expand-view" style="padding:16px 0 4px">'+DOC_TABS[type](dealDocs(id||LIVE_ID))+'</div>',
      '<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Close</button></div>',true,'sc-expand-modal');
    return;
  }
  if(id&&id!==LIVE_ID){sampleView(type,index,id);return;}
  var title='',sub='',body='';

  if(type==='scr'){title='SCR Details';sub=LIVE_ID;body=dealDetailsHTML();}

  else if(type==='po'){title='Purchase Order';sub='PO '+LIVE_PO+'';body=orderDetailsHTML();}

  else if(type==='reconciliation'){
    title='Reconciliation';sub=LIVE_ID;
    body=recTable(['SCR','PO','Shipment','Receivable Item','Expected Qty','Received Qty','Open Qty'],
        '<tr><td>'+LIVE_ID+'</td><td>'+LIVE_PO+'</td><td>SHP-2026-035307</td><td><b>'+esc(L().item.name)+'</b></td>'
        +'<td>'+EXPECTED_QTY+'</td><td>'+confirmedReceived()+'</td><td><b>'+openReceiptQty()+'</b></td></tr>')
      +secHead('IMR Receipt History')
      +recTable(['ASN No.','IMR No.','Receipt Qty','Status'],
        state.imrs.length
          ?state.imrs.map(function(m){
            return '<tr><td>'+m.asnNo+'</td><td>'+m.no+'</td><td>'+m.qty+'</td>'
              +'<td>'+badge(m.status==='Confirmed'?'approved':'created',m.status)+'</td></tr>';}).join('')
          :'<tr><td colspan="4" style="text-align:center;color:var(--gray);padding:22px">No IMRs created yet.</td></tr>');
  }

  var foot='<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Close</button></div>';
  document.getElementById('sc-modal-root').innerHTML=
    modalShell(title,sub,'<div style="padding:18px 0 4px">'+body+'</div>',foot,true);
}

/* A sample deal's documents, built from its own record. */
function sampleView(type,index,id){
  var d=sampleDeal(id);if(!d)return;
  var n=id.slice(-5),po=d.po?d.po.no:'—',it=d.item,k=(index||0)+1,title='',sub='',body='';
  var g=function(cards){return '<div class="lp-sb-detail-grid">'+cards+'</div>';};
  var common=fieldCard(ICO.doc,'SCR No.',esc(id))+fieldCard(ICO.cart,'PO No.',esc(po))
    +fieldCard(ICO.handshake,'Vendor / Sub-Contractor',esc(d.vendor.code+' — '+d.vendor.name));
  if(type==='scr'){title='SCR Details';sub=id;body=sampleDetailsHTML(d);}
  else if(type==='po'&&d.po){title='Purchase Order';sub='PO '+po;
    body=g(fieldCard(ICO.check,'PO Status',badge(poToneOf(d.po.status),d.po.status))+common
      +fieldCard(ICO.user,'Buyer',esc(d.buyer))+fieldCard(ICO.cube,'Receivable Item',esc(it.name))
      +fieldCard(ICO.hash,'Quantity',it.qty+' '+esc(it.uom))+fieldCard(ICO.money,'PO Value',fmtAmt(it.qty*it.price)));}
  else if(type==='reconciliation'){title='Reconciliation';sub=id;
    body=g(fieldCard(ICO.hash,'Expected Qty',it.qty+' '+esc(it.uom))+fieldCard(ICO.hash,'Received Qty',d.received+' '+esc(it.uom))
      +fieldCard(ICO.hash,'Open Qty',Math.max(0,it.qty-d.received)+' '+esc(it.uom))+common);}
  if(!body)return;
  document.getElementById('sc-modal-root').innerHTML=modalShell(title,sub,'<div style="padding:18px 0 4px">'+body+'</div>',
    '<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Close</button></div>',true);
}

/* ══ TEAM MANAGEMENT ═══════════════════════════════════════════════════════
   Teams (the stores on the platform) and Templates (the permission set each
   role gets, by vertical), both on the shared listing: filter bar, stats,
   .lp-table, ten rows a page, a popup form to create or edit. */
var PAGE_ACTIONS={deals:['Create SCR','scOpenCreateSCR'],teams:['Create Team','scOpenTeamForm'],templates:['Create Template','scOpenTemplateForm']};
function scPageAction(){var a=PAGE_ACTIONS[state.page];if(a)(typeof a[1]==='function'?a[1]():window[a[1]]());}
var VERTICALS=['Grocery Retail','Fashion','Electronics','Dispensary'];
var ICO_KEBAB='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>';
var ICO_TRASH='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>';

/* ── TEAMS ──────────────────────────────────────────────────────────────── */
var TEAMS=(function(){
  var names=[['Zing Grocery','antar@seller.com','Grocery Retail'],['C mart','tastefood@gmail.com','Grocery Retail'],
    ['Suma Grocery','sumalatha@gmail.com','Grocery Retail'],['Chennai Fashion Store 2k26','sadalawar@newforceltd.com','Fashion'],
    ['Comm store chennai2','sadalawar@newforceltd.com','Electronics'],['Comm store chennai','sadalawar@newforceltd.com','Electronics'],
    ['Apollo Wellness','apollo.wellness@gmail.com','Dispensary'],['Fresh Basket','freshbasket@retail.in','Grocery Retail'],
    ['Style Hub Hyderabad','stylehub@fashion.in','Fashion'],['Gadget Point','gadgetpoint@tech.in','Electronics'],
    ['MedPlus Kondapur','medplus.kdp@gmail.com','Dispensary'],['Daily Needs Mart','dailyneeds@retail.in','Grocery Retail'],
    ['Trendy Threads','trendythreads@fashion.in','Fashion'],['Smart Electronics','smartelec@tech.in','Electronics'],
    ['Care Pharmacy','carepharma@gmail.com','Dispensary'],['Kirana King','kiranaking@retail.in','Grocery Retail']];
  var rows=[],d=new Date(2026,9,14);
  for(var i=0;i<64;i++){
    var n=names[i%names.length],suffix=i<names.length?'':' '+(Math.floor(i/names.length)+1);
    if(i&&i%2===0)d=addD(d,-1);
    rows.push({key:2899-i,name:n[0]+suffix,code:'store:'+(3136-i),email:n[1],vertical:n[2],date:fmtDate(d),
      status:i%9===7?'Inactive':'Active'});
  }
  return rows;
})();
function filteredTeams(){
  var f=state.teamFilter;
  var rows=TEAMS.filter(function(t){
    if(f.status&&t.status!==f.status)return false;
    if(f.vertical&&t.vertical!==f.vertical)return false;
    return matchQ(f.q,[t.name,t.code,t.email,String(t.key)]);
  });
  var by={'Oldest first':function(a,b){return a.key-b.key;},'Name A–Z':function(a,b){return a.name.localeCompare(b.name);},
    'Name Z–A':function(a,b){return b.name.localeCompare(a.name);}}[f.sort]||function(a,b){return b.key-a.key;};
  return rows.slice().sort(by);
}
function teamFiltersActive(){var f=state.teamFilter;return !!(f.q||f.status||f.vertical||f.sort);}
function teamsPageHTML(){
  var all=filteredTeams(),f=state.teamFilter;
  var pages=Math.max(1,Math.ceil(all.length/PAGE_SIZE));if(state.teamPage>pages)state.teamPage=pages;
  var off=(state.teamPage-1)*PAGE_SIZE;
  var rows=pageSlice(all,state.teamPage).map(function(t,n){
    return '<tr class="lp-row">'
      +'<td>'+(off+n+1)+'</td>'
      +'<td><div class="lp-c-plain">'+t.key+'</div></td>'
      +'<td><div class="lp-c-main">'+esc(t.name)+'</div></td>'
      +'<td><div class="lp-c-plain">'+esc(t.code)+'</div></td>'
      +'<td><div class="lp-c-plain">'+esc(t.email)+'</div></td>'
      +'<td><div class="lp-c-plain">'+esc(t.vertical)+'</div></td>'
      +'<td><div class="lp-c-plain">'+esc(t.date)+'</div></td>'
      +'<td>'+badge(t.status==='Active'?'approved':'unapproved',t.status)+'</td>'
      +'<td><button class="lp-action-btn" type="button" title="Actions" aria-label="Actions for '+esc(t.name)+'" onclick="event.stopPropagation();scTeamMenu(this,'+t.key+')">'+ICO_KEBAB+'</button></td>'
      +'</tr>';
  }).join('')||emptyRow(9,'No teams match','Change the search or filters, or Reset to see every team.');
  var count=function(st){return TEAMS.filter(function(t){return !st||t.status===st;}).length;};
  var stats='<div class="listing-stats">'
    +'<div class="listing-stat active"><div class="listing-stat-count">'+count('')+'</div><div class="listing-stat-label">All Teams</div></div>'
    +'<div class="listing-stat approved"><div class="listing-stat-count">'+count('Active')+'</div><div class="listing-stat-label">Active</div></div>'
    +'<div class="listing-stat"><div class="listing-stat-count">'+count('Inactive')+'</div><div class="listing-stat-label">Inactive</div></div>'
    +'</div>';
  return '<div class="listing-page">'
    +'<div class="listing-top">'
      +'<div class="lp-filter-bar" style="flex:1;min-width:0">'
        +'<div class="lp-filter-bar-label">Select Filter</div>'
        +'<div class="lp-filter-bar-row sc-filters">'
          +'<input class="lp-search-input" id="sc-team-q" type="text" value="'+esc(f.q)+'" placeholder="Search by name, code or email" oninput="scTeamSync()" onkeydown="scSearchKey(event,\'scSearchTeams\')">'
          +csField('sc-tf-status',['Active','Inactive'],f.status,'Select Status','scTeamSync')
          +csField('sc-tf-vertical',VERTICALS,f.vertical,'All Verticals','scTeamSync')
          +csField('sc-tf-sort',['Newest first','Oldest first','Name A–Z','Name Z–A'],f.sort,'Sort by','scTeamSync')
          +'<button class="lp-pill-clear" id="sc-team-reset" onclick="scResetTeams()"'+(teamFiltersActive()?'':' hidden')+'>'+ICO.close+' Reset</button>'
          +'<button class="lp-pill-search" onclick="scSearchTeams()">Search</button>'
        +'</div>'
      +'</div>'
      +stats
    +'</div>'
    +'<div class="lp-table-card">'
      +'<table class="lp-table"><thead><tr><th>S.No</th><th>Key</th><th>Team Name</th><th>Team Code</th><th>Team Email</th>'
        +'<th>Vertical</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody>'+rows+'</tbody></table>'
      +paginationHTML(all.length,state.teamPage,'teams','scTeamPage')
    +'</div>'
  +'</div>';
}
function scTeamSync(){
  var b=document.getElementById('sc-team-reset');if(!b)return;
  var q=document.getElementById('sc-team-q'),picked=document.querySelectorAll('.sc-filters .cs-trigger:not(.cs-placeholder)').length;
  b.hidden=!(teamFiltersActive()||(q&&q.value.trim())||picked);
}
function scSearchTeams(){
  var q=document.getElementById('sc-team-q');
  state.teamFilter={q:q?q.value:'',status:csValue('sc-tf-status'),vertical:csValue('sc-tf-vertical'),sort:csValue('sc-tf-sort')};
  state.teamPage=1;scRender();
}
function scResetTeams(){state.teamFilter={q:'',status:'',vertical:'',sort:''};state.teamPage=1;scRender();}
function scTeamPage(n){state.teamPage=n;scRender();}
function teamByKey(k){return TEAMS.filter(function(t){return t.key===k;})[0];}
/* the row's menu: the shared action menu */
function scTeamMenu(btn,key){
  var m=rowMenuEl(),t=teamByKey(key);if(!t)return;
  if(m.classList.contains('open')&&m.dataset.id==='team:'+key){scCloseRowMenu();return;}
  m.innerHTML='<div class="sc-act-head">'+esc(t.name)+'</div>'
    +'<div class="ct-act-item sc-act-avail" onclick="scCloseRowMenu();scOpenTeamForm('+key+')">Edit Team</div>'
    +'<div class="ct-act-item sc-act-avail" onclick="scCloseRowMenu();scToggleTeam('+key+')">'+(t.status==='Active'?'Deactivate':'Activate')+'</div>';
  m.dataset.id='team:'+key;m.classList.add('open');m.style.width='max-content';m.style.maxHeight='';
  var r=btn.getBoundingClientRect(),w=Math.ceil(m.getBoundingClientRect().width);
  scPlaceMenu(m,{left:r.right-w,right:r.right,top:r.top,bottom:r.bottom,width:w});
}
function scToggleTeam(key){
  var t=teamByKey(key);if(!t)return;
  t.status=t.status==='Active'?'Inactive':'Active';scRender();
  scToast(t.name+(t.status==='Active'?' activated':' deactivated'),t.status==='Active'?'success':'info');
}
function scOpenTeamForm(key){
  var t=typeof key==='number'?teamByKey(key):null;
  var body=section('Team Details','<div class="policy-form-grid">'
      +field('Team Name','<input class="ep-form-input" id="tm-name" value="'+esc(t?t.name:'')+'" placeholder="e.g. Zing Grocery">',true)
      +field('Team Email','<input class="ep-form-input" id="tm-email" type="email" value="'+esc(t?t.email:'')+'" placeholder="owner@store.com">',true)
      +field('Vertical',csField('tm-vertical',VERTICALS,t?t.vertical:'','Select vertical'),true)
      +field('Status',csField('tm-status',['Active','Inactive'],t?t.status:'Active','Select status'),true)
      +(t?field('Team Code','<div class="sc-ro">'+esc(t.code)+'</div>'):'')
    +'</div>');
  var foot='<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
    +'<button class="btn-primary" onclick="scSaveTeam('+(t?t.key:'null')+')">'+(t?'Save Changes':'Create Team')+'</button></div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell(t?'Edit Team':'Create Team',t?'Key '+t.key:'A new store on the platform',body,foot,true);
  var f=document.getElementById('tm-name');if(f)f.focus();
}
function scSaveTeam(key){
  var v=function(id){return ((document.getElementById(id)||{}).value||'').trim();};
  var name=v('tm-name'),email=v('tm-email'),vertical=csValue('tm-vertical'),status=csValue('tm-status')||'Active';
  if(!name){scToast('Enter the team name','error');return;}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){scToast('Enter a valid team email','error');return;}
  if(!vertical){scToast('Select the vertical','error');return;}
  if(key){var t=teamByKey(key);t.name=name;t.email=email;t.vertical=vertical;t.status=status;scCloseModal();scRender();scToast(name+' updated','success');return;}
  var top=TEAMS.reduce(function(m,x){return Math.max(m,x.key);},0),code=TEAMS.reduce(function(m,x){return Math.max(m,+x.code.split(':')[1]);},0);
  TEAMS.unshift({key:top+1,name:name,code:'store:'+(code+1),email:email,vertical:vertical,date:stamp().date,status:status});
  state.teamFilter={q:'',status:'',vertical:'',sort:''};state.teamPage=1;
  scCloseModal();scRender();scToast(name+' created','success','Team code store:'+(code+1)+'.');
}

/* ── TEMPLATES ──────────────────────────────────────────────────────────── */
/* The modules a role can be given, the actions each offers, and the verticals
   it belongs to (Medicines and Prescriptions are Dispensary only). */
var TPL_MODULES=[
  ['Product','Product',['View','Create','Update','Delete']],['Inventory','Inventory',['View','Create','Update','Delete']],
  ['Order','Order',['View','Create','Update','Delete']],['Discount','Discount & Offers',['View','Create','Update','Delete']],
  ['Store','Store Settings',['View','Create','Update','Delete','Bank View','Bank Update']],['Staff','Staff & Roles',['View','Create','Update','Delete']],
  ['Support','Support',['View','Create']],['Partner','Logistic Partner',['View']],['Category','Category',['View']],['Tax','Tax',['View']],
  ['HSN','HSN/SAC Master',['View']],['Brand','Brand',['View']],['Buyer','Buyer / Customer',['View']],['Analytics','Analytics / Settlement',['View']],
  ['Variants','Product Variants',['View','Create','Update']],['Bulk Upload','Bulk Upload',['Create']],['QR','Payment QR',['View','Create']],
  ['Medicine','Medicines',['View','Create','Update','Delete'],'Dispensary'],['Prescription','Prescriptions',['View','Create','Update','Delete'],'Dispensary']
];
function tplModules(vertical){return TPL_MODULES.filter(function(m){return !m[3]||m[3]===vertical;});}
function permLabel(mod,act){
  var m=TPL_MODULES.filter(function(x){return x[0]===mod;})[0];
  return /^Bank /.test(act)?act+' Store Settings':act+' '+(m?m[1]:mod);
}
var TEMPLATES=(function(){
  var all=function(v){var o={};tplModules(v).forEach(function(m){o[m[0]]=m[2].slice();});return o;};
  var mgr=function(){return {Product:['View','Create','Update'],Inventory:['View','Create','Update'],Order:['View','Create','Update'],
    Discount:['View','Create','Update'],Staff:['View','Create'],Category:['View'],Tax:['View'],HSN:['View'],Brand:['View'],Buyer:['View'],Analytics:['View']};};
  var id=0,t=function(role,vertical,perms){return {id:++id,role:role,vertical:vertical,perms:perms};};
  return [
    t('Owner','Grocery Retail',all('Grocery Retail')),t('Manager','Grocery Retail',mgr()),
    t('Worker','Grocery Retail',{Product:['View'],Inventory:['View','Update'],Order:['View','Create']}),
    t('Delivery Partner','Grocery Retail',{Order:['View','Update']}),
    t('Owner','Dispensary',all('Dispensary')),
    t('Pharmacist','Dispensary',{Order:['View','Create','Update'],Medicine:['View','Create','Update'],Prescription:['View','Create','Update']}),
    t('Assistant','Dispensary',{Inventory:['View','Update'],Order:['View'],Medicine:['View']}),
    t('Worker','Dispensary',{Order:['View','Update']}),
    t('Owner','Fashion',all('Fashion')),t('Manager','Fashion',mgr()),
    t('Worker','Fashion',{Product:['View'],Inventory:['View','Update'],Order:['View','Create']}),
    t('Owner','Electronics',all('Electronics')),t('Manager','Electronics',mgr())
  ];
})();
function filteredTemplates(){
  var f=state.tplFilter;
  return TEMPLATES.filter(function(t){
    if(f.vertical&&t.vertical!==f.vertical)return false;
    return matchQ(f.q,[t.role,t.vertical]);
  });
}
function tplFiltersActive(){var f=state.tplFilter;return !!(f.q||f.vertical);}
var TPL_FOLD=6;   // modules shown before "+N more"
function permsHTML(t){
  var mods=tplModules(t.vertical).filter(function(m){return (t.perms[m[0]]||[]).length;});
  if(!mods.length)return '<span class="lp-dash">No permissions</span>';
  var open=!!state.tplOpen[t.id],show=open?mods:mods.slice(0,TPL_FOLD);
  return '<div class="sc-perm-list">'+show.map(function(m){
      return '<div class="sc-perm-row"><span class="sc-perm-mod">'+esc(m[1])+'</span><span class="sc-perm-chips">'
        +t.perms[m[0]].map(function(a){return '<span class="sc-perm-chip">'+esc(a)+'</span>';}).join('')+'</span></div>';
    }).join('')
    +(mods.length>TPL_FOLD?'<button type="button" class="sc-perm-more" onclick="scTplFold('+t.id+')">'
      +(open?'Show less':'+'+(mods.length-TPL_FOLD)+' more '+(mods.length-TPL_FOLD===1?'module':'modules'))+'</button>':'')
    +'</div>';
}
function scTplFold(id){state.tplOpen[id]=!state.tplOpen[id];scRender();}
function templatesPageHTML(){
  var all=filteredTemplates(),f=state.tplFilter;
  var pages=Math.max(1,Math.ceil(all.length/PAGE_SIZE));if(state.tplPage>pages)state.tplPage=pages;
  var off=(state.tplPage-1)*PAGE_SIZE;
  var rows=pageSlice(all,state.tplPage).map(function(t,n){
    var count=Object.keys(t.perms).reduce(function(s,k){return s+t.perms[k].length;},0);
    return '<tr class="lp-row sc-tmpl-row">'
      +'<td>'+(off+n+1)+'</td>'
      +'<td><div class="lp-c-main">'+esc(t.role)+'</div><div class="lp-c-sub">'+count+(count===1?' permission':' permissions')+'</div></td>'
      +'<td><div class="lp-c-plain">'+esc(t.vertical)+'</div></td>'
      +'<td>'+permsHTML(t)+'</td>'
      +'<td><div class="sc-tmpl-acts">'
        +'<button class="lp-action-btn" type="button" title="Edit template" aria-label="Edit '+esc(t.role)+'" onclick="scOpenTemplateForm('+t.id+')">'+ICO_EDIT+'</button>'
        +'<button class="lp-action-btn sc-del-btn" type="button" title="Delete template" aria-label="Delete '+esc(t.role)+'" onclick="scDeleteTemplate('+t.id+')">'+ICO_TRASH+'</button>'
      +'</div></td></tr>';
  }).join('')||emptyRow(5,'No templates match','Change the search or vertical, or Reset to see every template.');
  var verts=VERTICALS.filter(function(v){return TEMPLATES.some(function(t){return t.vertical===v;});}).length;
  var roles={};TEMPLATES.forEach(function(t){roles[t.role]=1;});
  var stats='<div class="listing-stats">'
    +'<div class="listing-stat active"><div class="listing-stat-count">'+TEMPLATES.length+'</div><div class="listing-stat-label">Templates</div></div>'
    +'<div class="listing-stat"><div class="listing-stat-count">'+Object.keys(roles).length+'</div><div class="listing-stat-label">Roles</div></div>'
    +'<div class="listing-stat"><div class="listing-stat-count">'+verts+'</div><div class="listing-stat-label">Verticals</div></div>'
    +'</div>';
  return '<div class="listing-page">'
    +'<div class="listing-top">'
      +'<div class="lp-filter-bar" style="flex:1;min-width:0">'
        +'<div class="lp-filter-bar-label">Select Filter</div>'
        +'<div class="lp-filter-bar-row sc-filters">'
          +'<input class="lp-search-input" id="sc-tpl-q" type="text" value="'+esc(f.q)+'" placeholder="Search by role" oninput="scTplSync()" onkeydown="scSearchKey(event,\'scSearchTemplates\')">'
          +csField('sc-tp-vertical',VERTICALS,f.vertical,'All Verticals','scTplSync')
          +'<button class="lp-pill-clear" id="sc-tpl-reset" onclick="scResetTemplates()"'+(tplFiltersActive()?'':' hidden')+'>'+ICO.close+' Reset</button>'
          +'<button class="lp-pill-search" onclick="scSearchTemplates()">Search</button>'
        +'</div>'
      +'</div>'
      +stats
    +'</div>'
    +'<div class="lp-table-card">'
      +'<table class="lp-table sc-tmpl-table"><thead><tr><th>S.No</th><th>Role</th><th>Vertical</th><th>Permissions</th><th>Action</th></tr></thead>'
      +'<tbody>'+rows+'</tbody></table>'
      +paginationHTML(all.length,state.tplPage,'templates','scTplPage')
    +'</div>'
  +'</div>';
}
function scTplSync(){
  var b=document.getElementById('sc-tpl-reset');if(!b)return;
  var q=document.getElementById('sc-tpl-q'),picked=document.querySelectorAll('.sc-filters .cs-trigger:not(.cs-placeholder)').length;
  b.hidden=!(tplFiltersActive()||(q&&q.value.trim())||picked);
}
function scSearchTemplates(){
  var q=document.getElementById('sc-tpl-q');
  state.tplFilter={q:q?q.value:'',vertical:csValue('sc-tp-vertical')};state.tplPage=1;scRender();
}
function scResetTemplates(){state.tplFilter={q:'',vertical:''};state.tplPage=1;scRender();}
function scTplPage(n){state.tplPage=n;scRender();}
function tplById(id){return TEMPLATES.filter(function(t){return t.id===id;})[0];}
/* Create / edit: role, vertical, and a permission matrix - modules down,
   actions across, only the actions a module offers. */
var tplDraft=null;
function scOpenTemplateForm(id){
  var t=typeof id==='number'?tplById(id):null;
  tplDraft={id:t?t.id:null,role:t?t.role:'',vertical:t?t.vertical:'',perms:JSON.parse(JSON.stringify(t?t.perms:{}))};
  drawTemplateForm();
}
function drawTemplateForm(){
  var d=tplDraft,acts=['View','Create','Update','Delete'];
  var matrix=d.vertical?recTable(['Module'].concat(acts).concat(['More']),tplModules(d.vertical).map(function(m){
    var have=d.perms[m[0]]||[];
    var box=function(a){
      if(m[2].indexOf(a)<0)return '<span class="lp-dash">—</span>';
      return '<label class="sc-perm-check"><input type="checkbox"'+(have.indexOf(a)>=0?' checked':'')
        +' onchange="scTplToggle(\''+m[0]+'\',\''+a+'\',this.checked)"><span class="sr-only">'+esc(permLabel(m[0],a))+'</span></label>';
    };
    var extra=m[2].filter(function(a){return acts.indexOf(a)<0;});
    return '<tr><td><b>'+esc(m[1])+'</b></td>'+acts.map(function(a){return '<td>'+box(a)+'</td>';}).join('')
      +'<td>'+(extra.length?extra.map(function(a){return '<label class="sc-perm-check is-text"><input type="checkbox"'+(have.indexOf(a)>=0?' checked':'')
        +' onchange="scTplToggle(\''+m[0]+'\',\''+a+'\',this.checked)"> '+esc(a)+'</label>';}).join(''):'<span class="lp-dash">—</span>')+'</td></tr>';
  }).join('')):'<div class="lp-logs-empty">Select a vertical to choose its permissions.</div>';
  var body=section('Template','<div class="policy-form-grid">'
      +field('Role','<input class="ep-form-input" id="tp-role" value="'+esc(d.role)+'" placeholder="e.g. Manager" oninput="tplDraft.role=this.value">',true)
      +field('Vertical',csField('tp-vertical',VERTICALS,d.vertical,'Select vertical','scTplVertical'),true)
    +'</div>')
    +section('Permissions',matrix);
  var foot='<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
    +'<button class="btn-primary" onclick="scSaveTemplate()">'+(d.id?'Save Changes':'Create Template')+'</button></div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell(d.id?'Edit Template':'Create Template',
    d.id?d.role+' · '+d.vertical:'The permissions a role gets in a vertical',body,foot,true,'sc-tmpl-modal');
}
function scTplVertical(v){
  tplDraft.role=((document.getElementById('tp-role')||{}).value||tplDraft.role);
  tplDraft.vertical=v;
  /* keep only the modules this vertical has */
  var ok={};tplModules(v).forEach(function(m){ok[m[0]]=1;});
  Object.keys(tplDraft.perms).forEach(function(k){if(!ok[k])delete tplDraft.perms[k];});
  drawTemplateForm();
}
function scTplToggle(mod,act,on){
  var a=tplDraft.perms[mod]||(tplDraft.perms[mod]=[]),i=a.indexOf(act);
  if(on&&i<0)a.push(act);if(!on&&i>=0)a.splice(i,1);
  if(!a.length)delete tplDraft.perms[mod];
}
function scSaveTemplate(){
  var d=tplDraft,role=((document.getElementById('tp-role')||{}).value||'').trim(),vertical=csValue('tp-vertical')||d.vertical;
  if(!role){scToast('Enter the role','error');return;}
  if(!vertical){scToast('Select the vertical','error');return;}
  if(!Object.keys(d.perms).length){scToast('Give the role at least one permission','error');return;}
  var dup=TEMPLATES.some(function(t){return t.id!==d.id&&t.role.toLowerCase()===role.toLowerCase()&&t.vertical===vertical;});
  if(dup){scToast('A '+role+' template already exists for '+vertical,'error');return;}
  /* order each module's actions the way the module lists them */
  var perms={};tplModules(vertical).forEach(function(m){var a=d.perms[m[0]];if(a&&a.length)perms[m[0]]=m[2].filter(function(x){return a.indexOf(x)>=0;});});
  if(d.id){var t=tplById(d.id);t.role=role;t.vertical=vertical;t.perms=perms;scCloseModal();scRender();scToast(role+' template updated','success');return;}
  var nid=TEMPLATES.reduce(function(m,x){return Math.max(m,x.id);},0)+1;TEMPLATES.push({id:nid,key:nid,role:role,vertical:vertical,perms:perms});glLog('templates',nid,'Created');
  state.tplFilter={q:'',vertical:''};state.tplPage=Math.ceil(TEMPLATES.length/PAGE_SIZE);
  scCloseModal();scRender();scToast(role+' template created','success',vertical+'.');
}
function scDeleteTemplate(id){
  var t=tplById(id);if(!t)return;
  var foot='<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
    +'<button class="btn-primary sc-btn-danger" onclick="scConfirmDeleteTemplate('+id+')">Delete Template</button></div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell('Delete Template',t.role+' · '+t.vertical,
    '<p class="sc-confirm-text">Teams in <b>'+esc(t.vertical)+'</b> will no longer be able to give the <b>'+esc(t.role)+'</b> role. This cannot be undone.</p>',foot);
}
function scConfirmDeleteTemplate(id){
  var i=TEMPLATES.findIndex(function(t){return t.id===id;});if(i<0)return;
  var t=TEMPLATES.splice(i,1)[0];scCloseModal();scRender();scToast(t.role+' template deleted','info',t.vertical+'.');
}

/* ══ STORE & MANAGEMENT ════════════════════════════════════════════════════
   Five listings - Retailers, Stores, Store Categories, QR Codes, Tags - on
   one engine (GL). A page describes itself - its rows, columns, filters,
   counts and form - and the engine draws the shared listing around it: the
   filter bar, the counts, .lp-table with ten rows a page, the row menu
   (Edit, Activate / Deactivate, anything the page adds) and the popup form. */
var GL={};
function glSrc(g){return typeof g.rows==='function'?g.rows():g.rows;}
function glState(id){var g=GL[id];if(!state.gl)state.gl={};return state.gl[id]||(state.gl[id]={f:{},page:1});}
function glRows(id){
  var g=GL[id],st=glState(id),f=st.f;
  var rows=glSrc(g).filter(function(r){
    for(var i=0;i<g.filters.length;i++){var fl=g.filters[i],v=f[fl.k];if(v&&(fl.match?!fl.match(r,v):r[fl.k]!==v))return false;}
    if(f.q2&&g.search2&&!matchQ(f.q2,g.search2.fields.map(function(k){return r[k];})))return false;
    return matchQ(f.q||'',g.search.fields.map(function(k){return r[k];}));
  });
  return g.sortBy?rows.slice().sort(g.sortBy(f.sort)):rows;
}
function glActive(id){var f=glState(id).f;return Object.keys(f).some(function(k){return f[k];});}
function glPageHTML(id){
  var g=GL[id],st=glState(id),f=st.f,all=glRows(id);
  var pages=Math.max(1,Math.ceil(all.length/PAGE_SIZE));if(st.page>pages)st.page=pages;
  var off=(st.page-1)*PAGE_SIZE;
  var open=state.glOpen&&state.glOpen.id===id?state.glOpen.key:null;
  var rows=pageSlice(all,st.page).map(function(r,n){
    var ex=g.expandable&&!!(state.glExp||{})[id+':'+r.key];
    var sno=g.expandable?'<td><div class="sc-rowexp"><button type="button" class="sc-rowexp-btn'+(ex?' is-open':'')+'" title="'+(ex?'Show less':'Show more')+'" aria-expanded="'+ex+'" onclick="event.stopPropagation();scGlExpand(\''+id+'\','+r.key+')">'+ICO_DOWN+'</button><span>'+(off+n+1)+'</span></div></td>':'<td>'+(off+n+1)+'</td>';
    return '<tr class="lp-row'+(open===r.key?' lp-row-selected':'')+(ex?' is-expanded':'')+'" data-id="'+r.key+'" style="cursor:pointer" onclick="scGlOpen(\''+id+'\','+r.key+')">'+sno+g.cols.map(function(c){return '<td'+(c.cls?' class="'+c.cls+'"':'')+'>'+(g.expandable&&!ex&&c.brief?c.brief(r):c.cell(r))+'</td>';}).join('')
      +'<td onclick="event.stopPropagation()"><div class="sc-gl-acts">'+(g.rowTools?g.rowTools(r):'')
        +(g.del?'<button class="lp-action-btn sc-del-btn" type="button" title="Delete" aria-label="Delete '+esc(g.title(r))+'" onclick="event.stopPropagation();scGlDelete(\''+id+'\','+r.key+')">'+ICO_TRASH+'</button>':'')
        +glActionBtn(id,r)
        +'<button class="lp-action-btn" type="button" title="View details" aria-label="View details of '+esc(g.title(r))+'" onclick="event.stopPropagation();scGlOpen(\''+id+'\','+r.key+')">'+ICO.hamburger+'</button>'
        +'</div></td></tr>';
  }).join('')||emptyRow(g.cols.length+2,'No '+g.noun+' match','Change the search or filters, or Reset to see every '+g.one+'.');
  var stats='<div class="listing-stats">'+g.stats(glSrc(g)).map(function(x){
    return '<div class="listing-stat'+(x[2]?' '+x[2]:'')+'"><div class="listing-stat-count">'+x[1]+'</div><div class="listing-stat-label">'+esc(x[0])+'</div></div>';
  }).join('')+'</div>';
  var sync='scGlSync(\''+id+'\')';
  return '<div class="listing-page">'
    +'<div class="listing-top">'
      +'<div class="lp-filter-bar" style="flex:1;min-width:0">'
        +'<div class="lp-filter-bar-label">Select Filter</div>'
        +'<div class="lp-filter-bar-row sc-filters">'
          +'<input class="lp-search-input" id="gl-q" type="text" value="'+esc(f.q||'')+'" placeholder="'+esc(g.search.placeholder)+'" oninput="'+sync+'" onkeydown="if(event.key===\'Enter\')scGlSearch(\''+id+'\')">'
          +(g.search2?'<input class="lp-search-input" id="gl-q2" type="text" value="'+esc(f.q2||'')+'" placeholder="'+esc(g.search2.placeholder)+'" oninput="'+sync+'" onkeydown="if(event.key===\'Enter\')scGlSearch(\''+id+'\')">':'')
          +g.filters.map(function(fl){return csField('gl-f-'+fl.k,typeof fl.opts==='function'?fl.opts():fl.opts,f[fl.k]||'',fl.label,'scGlSyncHook');}).join('')
          +'<button class="lp-pill-clear" id="gl-reset" onclick="scGlReset(\''+id+'\')"'+(glActive(id)?'':' hidden')+'>'+ICO.close+' Reset</button>'
          +'<button class="lp-pill-search" onclick="scGlSearch(\''+id+'\')">Search</button>'
          +(typeof g.tool==='function'?g.tool():g.tool||'')
        +'</div>'
      +'</div>'
      +stats
    +'</div>'
    +'<div class="lp-split-wrap sc-gl-split"><div class="lp-split-main">'
    +'<div class="lp-table-card"><table class="lp-table sc-gl-table sc-gl-'+id+'"><thead><tr><th>S.No</th>'
      +g.cols.map(function(c){return '<th>'+esc(c.h)+'</th>';}).join('')+'<th>Action</th></tr></thead><tbody>'+rows+'</tbody></table>'
      +paginationHTML(all.length,st.page,g.noun,'scGlPageFor')
    +'</div></div>'
    +'<div class="lp-split-sb" id="sc-gl-sb"><div class="lp-isb" id="sc-gl-isb"></div></div></div>'
  +'</div>';
}
function scGlSyncHook(){scGlSync(state.page);}
function scGlSync(id){
  var b=document.getElementById('gl-reset');if(!b)return;
  var typed=[].some.call(document.querySelectorAll('.sc-filters .lp-search-input'),function(i){return i.value.trim();});
  var picked=document.querySelectorAll('.sc-filters .cs-trigger:not(.cs-placeholder)').length;
  b.hidden=!(glActive(id)||typed||picked);
}
function scGlSearch(id){
  var g=GL[id],f={q:((document.getElementById('gl-q')||{}).value||'').trim()};
  if(g.search2)f.q2=((document.getElementById('gl-q2')||{}).value||'').trim();
  g.filters.forEach(function(fl){f[fl.k]=csValue('gl-f-'+fl.k);});
  var st=glState(id);st.f=f;st.page=1;scRender();
}
function scGlReset(id){var st=glState(id);st.f={};st.page=1;scRender();}
function scGlPageFor(n){glState(state.page).page=n;scRender();}
function glRow(id,key){return glSrc(GL[id]).filter(function(r){return r.key===key;})[0];}
function scGlMenu(btn,id,key){
  var g=GL[id],r=glRow(id,key),m=rowMenuEl();if(!r)return;
  if(m.classList.contains('open')&&m.dataset.id===id+':'+key){scCloseRowMenu();return;}
  var items=[];
  if(g.form)items.push(['Edit '+g.one.replace(/^./,function(c){return c.toUpperCase();}),'scCloseRowMenu();scGlForm(\''+id+'\','+key+')']);
  if(g.toggle){var on=r[g.toggle.k]===g.toggle.on;items.push([on?g.toggle.offLabel:g.toggle.onLabel,'scCloseRowMenu();scGlToggle(\''+id+'\','+key+')']);}
  (g.menu?g.menu(r):[]).forEach(function(x){items.push(x);});
  m.innerHTML='<div class="sc-act-head">'+esc(g.title(r))+'</div>'+items.map(function(x){
    return '<div class="ct-act-item sc-act-avail" onclick="'+x[1]+'">'+esc(x[0])+'</div>';}).join('');
  m.dataset.id=id+':'+key;m.classList.add('open');m.style.width='max-content';m.style.maxHeight='';
  var rc=btn.getBoundingClientRect(),w=Math.ceil(m.getBoundingClientRect().width);
  scPlaceMenu(m,{left:rc.right-w,right:rc.right,top:rc.top,bottom:rc.bottom,width:w});
}
/* the status as a switch: on is the toggle's "on" value */
function glSwitch(id,r){
  var t=GL[id].toggle,on=r[t.k]===t.on;
  return '<button type="button" role="switch" aria-checked="'+on+'" class="sc-switch'+(on?' is-on':'')+'" title="'+(on?t.offLabel:t.onLabel)+'"'
    +' onclick="event.stopPropagation();scGlStartLog(\''+id+'\','+r.key+',\''+esc(on?t.offLabel:t.onLabel).replace(/'/g,"\\'")+'\')"><span></span></button>';
}
function scGlDelete(id,key){
  var g=GL[id],r=glRow(id,key);if(!r)return;
  var foot='<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
    +'<button class="btn-primary sc-btn-danger" onclick="scGlDeleteGo(\''+id+'\','+key+')">Delete</button></div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell('Delete '+g.one,g.title(r),
    '<p class="sc-confirm-text">Delete <b>'+esc(g.title(r))+'</b>? This cannot be undone.</p>',foot);
}
function scGlDeleteGo(id,key){
  var g=GL[id],src=glSrc(g),i=src.findIndex(function(x){return x.key===key;});if(i<0)return;
  var r=(g.source||src).splice(g.source?g.source.indexOf(src[i]):i,1)[0];
  scCloseModal();scRender();scToast(g.title(r)+' deleted','info');
}
function scGlToggle(id,key){
  var g=GL[id],r=glRow(id,key),t=g.toggle;if(!r)return;
  r[t.k]=r[t.k]===t.on?t.off:t.on;glLog(id,key,'Marked '+r[t.k]);scRender();
  scToast(g.title(r)+' '+(r[t.k]===t.on?t.onDone:t.offDone),r[t.k]===t.on?'success':'info');
}
/* the popup form: the page's fields, filled for an edit */
function scGlForm(id,key){
  if(typeof key==='number'){scGlEdit(id,key);return;}
  var g=GL[id],r=typeof key==='number'?glRow(id,key):null,one=g.one.replace(/^./,function(c){return c.toUpperCase();});
  var cells=g.form.map(function(fd){
    var v=r?r[fd.k]:((g.prefill&&g.prefill[fd.k])||fd.def||'');
    var ctl=fd.type==='textarea'?'<textarea class="ep-form-input sc-notice-desc" id="gf-'+fd.k+'" rows="4" placeholder="'+esc(fd.ph||'')+'">'+esc(v==null?'':v)+'</textarea>'
      :fd.type==='select'?csField('gf-'+fd.k,typeof fd.opts==='function'?fd.opts():fd.opts,v,'Select '+fd.label.toLowerCase())
      :'<input class="ep-form-input" id="gf-'+fd.k+'" type="'+(fd.type||'text')+'" value="'+esc(v==null?'':v)+'" placeholder="'+esc(fd.ph||'')+'">';
    return field(fd.label,ctl,fd.req,fd.full);
  }).join('');
  var foot='<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
    +'<button class="btn-primary" onclick="scGlSave(\''+id+'\','+(r?r.key:'null')+')">'+(r?'Save Changes':'Create '+one)+'</button></div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell(r?'Edit '+one:'Create '+one,r?g.title(r)+' · Key '+r.key:g.sub,
    section(one+' Details','<div class="policy-form-grid sc-gl-form'+(g.form.length>=5?' is-3col':'')+'">'+cells+'</div>'),foot,true);
  var first=document.querySelector('#sc-modal-root .ep-form-input');if(first)first.focus();
}
function scGlSave(id,key){
  var g=GL[id],vals={};
  for(var i=0;i<g.form.length;i++){
    var fd=g.form[i],v=fd.type==='select'?csValue('gf-'+fd.k):((document.getElementById('gf-'+fd.k)||{}).value||'').trim();
    if(fd.req&&!v){scToast('Enter the '+fd.label.toLowerCase(),'error');return;}
    if(fd.type==='email'&&v&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){scToast('Enter a valid email','error');return;}
    vals[fd.k]=v;
  }
  if(key){var r=glRow(id,key);
    var changed=g.form.filter(function(fd){return String(r[fd.k]==null?'':r[fd.k])!==String(vals[fd.k]);}).map(function(fd){return fd.label;});
    Object.assign(r,vals);if(g.onSave)g.onSave(r);
    glLog(id,key,changed.length?'Updated '+changed.join(', '):'Saved with no changes');
    scCloseModal();scRender();scToast(g.title(r)+' updated','success');return;}
  var src=g.source||g.rows,top=src.reduce(function(m,x){return Math.max(m,x.key);},0);
  var row=Object.assign({key:top+1},g.defaults?g.defaults(top+1):{},vals);
  if(g.onSave)g.onSave(row);
  src.unshift(row);glState(id).f={};glState(id).page=1;glLog(id,row.key,'Created');
  scCloseModal();scRender();scToast(g.title(row)+' created','success');
}
var activeBadge=function(v){return badge(v==='Active'||v==='Enable'||v==='Assigned'?'approved':v==='Pending'||v==='Unassigned'?'pending':v==='Deleted'?'closed':'unapproved',v);};
function plain(v){return '<div class="lp-c-plain">'+esc(v)+'</div>';}
function mainTxt(v){return '<div class="lp-c-main">'+esc(v)+'</div>';}
function statusStats(rows,k,list){
  return [['All',rows.length,'active']].concat(list.map(function(x){return [x[0],rows.filter(function(r){return r[k]===x[0];}).length,x[1]];}));
}

/* ── ALL RETAILERS ─────────────────────────────────────────────────────── */
var POSITIONS=['Retailer','Community Manager','Community Agent','Platform Manager'];
GL.retailers={one:'retailer',noun:'retailers',sub:'A retailer or admin on the platform',
  rows:(function(){
    var seed=[['Taste Food','tastefood@gmail.com','919875645621','Retailer'],['Suma Latha','sumalatha@gmail.com','916547889256','Retailer'],
      ['Lara Admin','9879879875@gmail.com','+919879879875','Community Manager'],['Opendhi Agent','opendhiagentref@yopmail.com','919845102120','Community Agent'],
      ['Opendhi Connect','opendhiconnect@yopmail.com','+917451202102','Community Agent'],['Idfc First Bank','idfcfirstbank12@gmail.com','+919554454151','Community Manager'],
      ['Unique Restaurant','unique@gmail.com','919568745123','Retailer'],['Chennai Plat Test Plat','testchennaiplat@opendhi.com','+917766885567','Platform Manager'],
      ['Peddamma Temple','peddamma@gmail.com','916548987456','Retailer'],['Ifc Bank','ifcbank@gmail.com','+918510254454','Community Manager'],
      ['Ravi Kumar','ravikumar@retail.in','919000112233','Retailer'],['Anjali Stores','anjali.stores@gmail.com','919811223344','Retailer'],
      ['Metro Agent Hub','metroagent@opendhi.com','+919733445566','Community Agent'],['Kavya Traders','kavyatraders@gmail.com','919622334455','Retailer']];
    var rows=[];
    for(var i=0;i<46;i++){var x=seed[i%seed.length],n=i<seed.length?'':' '+(Math.floor(i/seed.length)+1);
      rows.push({key:3089-i-(i>4?3:0),name:x[0]+n,email:(n?n.trim()+'.':'')+x[1],mobile:x[2],position:x[3],type:i%3?'Business':'Individual',status:i%11===9?'Inactive':'Active'});}
    return rows;
  })(),
  title:function(r){return r.name;},
  search:{placeholder:'Search by name, email or mobile',fields:['name','email','mobile']},
  filters:[{k:'position',label:'Select Admin Type',opts:POSITIONS},{k:'status',label:'Select Status',opts:['Active','Inactive']},
    {k:'type',label:'Select Type',opts:['Individual','Business']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Inactive','']]);},
  cols:[{h:'Key',cell:function(r){return plain(r.key);}},{h:'Full Name',cell:function(r){return mainTxt(r.name);}},
    {h:'Email ID',cell:function(r){return plain(r.email);}},{h:'Mobile',cell:function(r){return plain(r.mobile);}},
    {h:'Position',cell:function(r){return plain(r.position);}},{h:'Status',cell:function(r){return activeBadge(r.status);}}],
  form:[{k:'name',label:'Full Name',req:true},{k:'email',label:'Email ID',type:'email',req:true},{k:'mobile',label:'Mobile',type:'tel',req:true},
    {k:'position',label:'Position',type:'select',opts:POSITIONS,req:true},{k:'type',label:'Type',type:'select',opts:['Individual','Business'],req:true},
    {k:'status',label:'Status',type:'select',opts:['Active','Inactive'],def:'Active',req:true}],
  toggle:{k:'status',on:'Active',off:'Inactive',onLabel:'Activate',offLabel:'Deactivate',onDone:'activated',offDone:'deactivated'}
};

/* ── ALL STORES ────────────────────────────────────────────────────────── */
var STATES_IN=['Telangana','Tamil Nadu','Karnataka','Maharashtra','Andhra Pradesh'];
GL.stores={one:'store',noun:'stores',sub:'A store under a retailer',
  rows:(function(){
    var seed=[['Zing Grocery','Hyderabad','Telangana'],['C Mart','Hyderabad','Telangana'],['Suma Grocery','Warangal','Telangana'],
      ['Chennai Fashion Store 2k26','Chennai','Tamil Nadu'],['comm store chennai2','Chennai','Tamil Nadu'],['ComM StorE Chennai','Chennai','Tamil Nadu'],
      ['Mukesh Pharmacy','Bengaluru','Karnataka'],['USA Restaurant Store','Pune','Maharashtra'],['Belgian Taste Restaurant','Vijayawada','Andhra Pradesh'],
      ['Fresh Basket','Hyderabad','Telangana'],['Style Hub','Bengaluru','Karnataka'],['Gadget Point','Mumbai','Maharashtra'],['Care Pharmacy','Chennai','Tamil Nadu']];
    var rows=[],pct=[25,25,25,25,25,25,50,25,25,75,100,50,75];
    for(var i=0;i<42;i++){var x=seed[i%seed.length],n=i<seed.length?'':' '+(Math.floor(i/seed.length)+1),pend=i===4||i===5||i%13===12;
      rows.push({key:3136-i-(i>3?2:0),name:x[0]+n,city:x[1],state:x[2],country:'India',status:pend?'Pending':'Active',setting:pend?'Disable':'Enable',
        retailer:i%3?'Business':'Individual',profile:pct[i%pct.length]});}
    return rows;
  })(),
  title:function(r){return r.name;},
  search:{placeholder:'Store name or ID',fields:['name','key']},
  search2:{placeholder:'City',fields:['city']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Pending','Inactive']},{k:'setting',label:'Select Setting',opts:['Enable','Disable']},
    {k:'retailer',label:'Retailer Type',opts:['Individual','Business']},{k:'state',label:'Select State',opts:STATES_IN},
    {k:'country',label:'Select Country',opts:['India']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Pending','pending']]);},
  cols:[{h:'Store ID',cell:function(r){return plain(r.key);}},
    {h:'Store Name',cell:function(r){return '<div class="lp-c-main">'+esc(r.name)+'</div>'
      +'<div class="sc-prof"><span class="sc-prof-track"><span class="sc-prof-fill" style="width:'+r.profile+'%"></span></span><span class="sc-prof-txt">'+r.profile+'% Completed</span></div>';}},
    {h:'Status',cell:function(r){return activeBadge(r.status);}},{h:'Settings',cell:function(r){return activeBadge(r.setting);}},
    {h:'Reports',cell:function(r){return '<div class="sc-rep-links">'
      +'<button type="button" class="sc-link" onclick="scStoreReport(\'settlement\','+r.key+')">Settlement Report</button>'
      +'<button type="button" class="sc-link" onclick="scStoreReport(\'sales\','+r.key+')">Sales Report</button>'
      +'<button type="button" class="sc-link" onclick="scStoreReport(\'profit\','+r.key+')">Profit by Product</button></div>';}},
    {h:'Activity',cell:function(r){return '<button class="btn-outline btn-sm sc-login-btn" type="button" onclick="scStoreLogin('+r.key+')">Login</button>';}}],
  rowTools:function(r){return '<button class="lp-action-btn" type="button" title="Download store details" aria-label="Download '+esc(r.name)+'" onclick="scStoreDownload('+r.key+')">'+ICO_DOWNLOAD+'</button>';},
  form:[{k:'name',label:'Store Name',req:true},{k:'city',label:'City',req:true},{k:'state',label:'State',type:'select',opts:STATES_IN,req:true},
    {k:'retailer',label:'Retailer Type',type:'select',opts:['Individual','Business'],req:true},
    {k:'status',label:'Status',type:'select',opts:['Active','Pending','Inactive'],def:'Pending',req:true},
    {k:'setting',label:'Settings',type:'select',opts:['Enable','Disable'],def:'Disable',req:true}],
  defaults:function(){return {country:'India',profile:25};},
  toggle:{k:'setting',on:'Enable',off:'Disable',onLabel:'Enable Settings',offLabel:'Disable Settings',onDone:'settings enabled',offDone:'settings disabled'}
};
function scStoreReport(kind,key){
  var r=glRow('stores',key);if(!r)return;
  if(kind==='profit'){scToast('Profit by product · '+r.name,'info','The product profit report opens in Analytics.');return;}
  state.dashTab=kind==='settlement'?'settlement':'sales';scGo('dashboard');
  scToast((kind==='settlement'?'Settlement':'Sales')+' report','info','Showing '+r.name+'.');
}
function scStoreLogin(key){var r=glRow('stores',key);if(r)scToast('Opening '+r.name+' as its owner','info','Store login is not wired in this prototype.');}
function scStoreDownload(key){
  var r=glRow('stores',key);if(!r)return;
  var q=function(v){return '"'+String(v).replace(/"/g,'""')+'"';};
  var csv=[['Store ID','Store Name','City','State','Country','Status','Settings','Retailer Type','Profile'],
    [r.key,r.name,r.city,r.state,r.country,r.status,r.setting,r.retailer,r.profile+'%']].map(function(l){return l.map(q).join(',');}).join('\r\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='store-'+r.key+'.csv';
  document.body.appendChild(a);a.click();a.remove();scToast(r.name+' details downloaded','success');
}

/* ── STORE CATEGORIES ──────────────────────────────────────────────────── */
GL.storecats={one:'category',noun:'categories',sub:'A main category stores are listed under',
  rows:(function(){
    var names=[['Others','Retail','Active'],['Rooms','Retail','Active'],['Service','Retail','Active'],['Health services','Retail','Inactive'],
      ['Health services','Retail','Active'],['Fashion and Footwear','Retail','Active'],['Fashion & Footware','Retail','Deleted'],
      ['Internal Service Provider','Retail','Active'],['Grocery Wholesale','Wholesale','Inactive'],['Business Partner - Supplier','Retail','Active'],
      ['Jewellery','Retail','Active'],['Furniture','Retail','Active'],['Pet Supplies','Retail','Active'],['Events','Retail','Active'],
      ['Education','Retail','Active'],['Fitness','Retail','Active'],['Salon & Spa','Retail','Active'],['Hardware','Wholesale','Active'],
      ['Stationery','Retail','Active'],['Bakery','Retail','Active'],['Restaurants','Retail','Active'],['Electronics','Retail','Active'],
      ['Pharmacy','Retail','Active'],['Grocery Retail','Retail','Active']];
    return names.map(function(x,i){return {key:24-i,name:x[0],domain:x[1],status:x[2]};});
  })(),
  title:function(r){return r.name;},
  search:{placeholder:'Search category',fields:['name']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive','Deleted']},{k:'domain',label:'Select Domain',opts:['Retail','Wholesale']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Inactive','']]);},
  cols:[{h:'Key ID',cell:function(r){return plain(r.key);}},{h:'Main Store Category',cell:function(r){return mainTxt(r.name);}},
    {h:'Domain',cell:function(r){return plain(r.domain);}},{h:'Status',cell:function(r){return activeBadge(r.status);}}],
  form:[{k:'name',label:'Main Store Category',req:true,full:true},{k:'domain',label:'Domain',type:'select',opts:['Retail','Wholesale'],req:true},
    {k:'status',label:'Status',type:'select',opts:['Active','Inactive'],def:'Active',req:true}],
  toggle:{k:'status',on:'Active',off:'Inactive',onLabel:'Activate',offLabel:'Deactivate',onDone:'activated',offDone:'deactivated'}
};

/* ── ALL QR CODE ───────────────────────────────────────────────────────── */
/* A QR-like mark drawn from the code's key: three finder squares and a
   pattern the key decides, so every code looks its own. */
function qrSvg(seed,px){
  var n=21,cells='',x=seed*9301+49297;
  var rnd=function(){x=(x*9301+49297)%233280;return x/233280;};
  var finder=function(r,c){return (r<7&&c<7)||(r<7&&c>=n-7)||(r>=n-7&&c<7);};
  for(var r=0;r<n;r++)for(var c=0;c<n;c++){
    var on;
    if(finder(r,c)){var rr=r>=n-7?r-(n-7):r,cc=c>=n-7?c-(n-7):c;on=rr===0||rr===6||cc===0||cc===6||(rr>=2&&rr<=4&&cc>=2&&cc<=4);}
    else on=rnd()>0.52;
    if(on)cells+='<rect x="'+c+'" y="'+r+'" width="1" height="1"/>';
  }
  return '<svg class="sc-qr" viewBox="-1 -1 23 23" width="'+px+'" height="'+px+'" role="img" aria-label="QR code '+seed+'"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/><g fill="#0f172a">'+cells+'</g></svg>';
}
GL.qrcodes={one:'QR code',noun:'QR codes',sub:'A QR code or barcode for a product or store',
  rows:(function(){
    var rows=[];
    rows.push({key:65389,prefix:'Mass_Store_qrcode',type:'Store',mode:'Auto',status:'Assigned',service:'Store Payments',retailer:'Business',store:'Mukesh Pharmacy'});
    rows.push({key:65388,prefix:'Mass_Community_qrcode',type:'Community',mode:'Auto',status:'Assigned',service:'Community Access',retailer:'Business',store:'Tree Park Community'});
    rows.push({key:65387,prefix:'Mass_Community_qrcode',type:'Community',mode:'Manual',status:'Unassigned',service:'Community Access',retailer:'Individual',store:'Freedom Park'});
    for(var i=0;i<48;i++){var store=i===4||i===6||i===8||i%7===3;
      rows.push({key:65386-i,prefix:store?'Mass_Store_qrcode':'Barcode',type:store?'Store':'Product',mode:i%10===9?'Manual':'Auto',
        status:i%8===7?'Unassigned':'Assigned',service:store?'Store Payments':'Product Billing',retailer:i%3?'Business':'Individual',
        store:['Zing Grocery','C Mart','Suma Grocery','Fresh Basket','Style Hub'][i%5]});}
    return rows;
  })(),
  title:function(r){return 'QR '+r.key;},
  search:{placeholder:'Store name',fields:['store']},
  filters:[{k:'status',label:'Select Status',opts:['Assigned','Unassigned']},{k:'type',label:'Select Type',opts:['Product','Store','Community']},
    {k:'mode',label:'Select Option',opts:['Auto','Manual']},{k:'service',label:'Select Services',opts:['Product Billing','Store Payments','Community Access']},
    {k:'retailer',label:'Retailer Type',opts:['Individual','Business']}],
  stats:function(rows){return statusStats(rows,'status',[['Assigned','approved'],['Unassigned','pending']]);},
  cols:[{h:'Key',cell:function(r){return plain(r.key);}},{h:'Prefix',cell:function(r){return mainTxt(r.prefix);}},
    {h:'Type',cell:function(r){return plain(r.type);}},{h:'BarQue Type',cell:function(r){return plain(r.mode);}},
    {h:'QR Code',noDetail:true,cell:function(r){return '<button type="button" class="sc-qr-btn" title="View QR '+r.key+'" onclick="event.stopPropagation();scGlOpen(\'qrcodes\','+r.key+')">'+qrSvg(r.key,40)+'</button>';}},
    {h:'Status',cell:function(r){return activeBadge(r.status);}}],
  tool:function(){return '<button class="btn-outline btn-sm sc-gl-tool" type="button" onclick="scQrDownloadAll()">'+ICO_DOWNLOAD+' QR / Barcode</button>';},
  form:[{k:'prefix',label:'Prefix',req:true,def:'Barcode'},{k:'type',label:'Type',type:'select',opts:['Product','Store','Community'],req:true},
    {k:'mode',label:'BarQue Type',type:'select',opts:['Auto','Manual'],def:'Auto',req:true},
    {k:'service',label:'Service',type:'select',opts:['Product Billing','Store Payments','Community Access'],req:true},
    {k:'store',label:'Store Name',req:true}],
  defaults:function(){return {status:'Unassigned',retailer:'Business'};},
  toggle:{k:'status',on:'Assigned',off:'Unassigned',onLabel:'Assign',offLabel:'Unassign',onDone:'assigned',offDone:'unassigned'},
  detailsTop:function(r){return '<div class="sc-qr-big"><span class="sc-qr-frame">'+qrSvg(r.key,150)+'</span>'
    +'<div class="sc-qr-meta"><b>'+esc(r.prefix)+'</b><span>'+esc(r.type)+' · '+esc(r.store)+'</span>'
    +'<button class="btn-outline btn-sm" type="button" onclick="scQrDownload('+r.key+')">'+ICO_DOWNLOAD+' Download QR</button></div></div>';}
};
function scQrView(key){
  var r=glRow('qrcodes',key);if(!r)return;
  document.getElementById('sc-modal-root').innerHTML=modalShell('QR Code '+r.key,r.prefix+' · '+r.type+' · '+r.store,
    '<div class="sc-qr-big">'+qrSvg(r.key,220)+'</div>',
    '<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Close</button>'
    +'<button class="btn-primary" onclick="scQrDownload('+key+')">'+ICO_DOWNLOAD+' Download SVG</button></div>');
}
function scQrDownload(key){
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([qrSvg(key,512).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ')],{type:'image/svg+xml'}));
  a.download='qr-'+key+'.svg';document.body.appendChild(a);a.click();a.remove();scToast('QR '+key+' downloaded','success');
}
function scQrDownloadAll(){
  var rows=glRows('qrcodes');if(!rows.length){scToast('Nothing to download','info');return;}
  var csv=[['Key','Prefix','Type','BarQue Type','Service','Store','Status']].concat(rows.map(function(r){return [r.key,r.prefix,r.type,r.mode,r.service,r.store,r.status];}))
    .map(function(l){return l.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\r\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='qr-barcodes.csv';
  document.body.appendChild(a);a.click();a.remove();scToast('QR / barcode list downloaded','success',rows.length+' codes in the file.');
}

/* ── TAGS ──────────────────────────────────────────────────────────────── */
GL.tags={one:'tag',noun:'tags',sub:'A tag shown on stores or communities',
  rows:[{key:5,name:'Ticket Tags1',type:'Store',category:'Health services',status:'Active'},
    {key:4,name:'Events Tag 3',type:'Community',category:'Events',status:'Active'},
    {key:3,name:'Events Tag 2',type:'Community',category:'Events',status:'Active'},
    {key:2,name:'Events Tag 1',type:'Community',category:'Events',status:'Active'},
    {key:1,name:'Best Seller',type:'Store',category:'Grocery Retail',status:'Active'}],
  title:function(r){return r.name;},
  search:{placeholder:'Search tag',fields:['name','category']},
  filters:[{k:'type',label:'Search Tag By',opts:['Store','Community']},{k:'status',label:'Select Status',opts:['Active','Inactive']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Inactive','']]);},
  cols:[{h:'Tag ID',cell:function(r){return plain(r.key);}},{h:'Tag Name',cell:function(r){return mainTxt(r.name);}},
    {h:'Tag Type',cell:function(r){return plain(r.type);}},{h:'Community / Store Category',cell:function(r){return plain(r.category);}},
    {h:'Tag Image',cell:function(r){return '<span class="sc-tag-img'+(r.type==='Community'?' is-comm':'')+'" title="'+esc(r.name)+'">'+(r.type==='Community'?ICO.users:ICO.tag)+'</span>';}},
    {h:'Status',cell:function(r){return activeBadge(r.status);}}],
  form:[{k:'name',label:'Tag Name',req:true},{k:'type',label:'Tag Type',type:'select',opts:['Store','Community'],req:true},
    {k:'category',label:'Community / Store Category',type:'select',opts:['Grocery Retail','Health services','Events','Fashion and Footwear','Restaurants','Pharmacy'],req:true},
    {k:'status',label:'Status',type:'select',opts:['Active','Inactive'],def:'Active',req:true}],
  toggle:{k:'status',on:'Active',off:'Inactive',onLabel:'Activate',offLabel:'Deactivate',onDone:'activated',offDone:'deactivated'}
};
Object.assign(PAGE_ACTIONS,{
  stores:['Create Store',function(){scGlForm('stores');}],storecats:['Create Category',function(){scGlForm('storecats');}],
  qrcodes:['Create QR Code',function(){scGlForm('qrcodes');}],tags:['Create Tag',function(){scGlForm('tags');}]
});

/* ══ ORDERS AND BILLING ════════════════════════════════════════════════════
   One set of orders (ORDERS) behind My Orders, Schedule Orders, Instant
   Payment Orders and All Orders, so a step taken on one shows on the others;
   refunds and returns are their own records. Order Billing starts an order. */
var CUR_STORE={id:3126,name:'Mukesh Pharmacy'};
var PLATFORMS=['Bhaiyaa','Paytm','Mystore'];
var ORDER_TYPES=['Store Visit','Store Pickup','Delivery','Instant Payment'];
var ORDERS=(function(){
  var users=[['Rambabu Musunuru',46355,'9848012345','Hyderabad'],['Baiju Balakrishnan',46353,'9845098765','Kochi'],
    ['Jai Bhagchandani',46352,'9820011223','Mumbai'],['Mukesh Kum',33161,'9900112233','Bengaluru'],['Hshs Hshs',45156,'8804354390','Bshs, Gege'],
    ['Utkarsh Shukla',46351,'9711223344','Lucknow'],['Priya Nair',46340,'9895012345','Chennai'],['Arjun Rao',46333,'9866012345','Vijayawada']];
  var stores=[[2176,'DHI Hyperlocal Pvt Ltd','Telangana'],[3041,'Slot Booking Test Store','Karnataka'],[3126,'Mukesh Pharmacy','Karnataka'],
    [3136,'Zing Grocery','Telangana'],[3135,'C Mart','Telangana']];
  var plan=[[0,0,'Store Visit',1000,'Completed'],[1,0,'Store Visit',1000,'Completed'],[2,0,'Store Visit',1000,'Completed'],
    [3,1,'Delivery',25,'In Progress'],[3,1,'Store Visit',25,'Completed'],[4,2,'Instant Payment',1,'Refund'],[5,0,'Store Visit',1000,'Completed'],
    [4,2,'Delivery',1,'Cancelled'],[4,2,'Instant Payment',1,'Refund'],[4,2,'Instant Payment',1,'Refund'],[4,2,'Instant Payment',1,'Pending'],
    [6,3,'Store Pickup',480,'Pending'],[7,4,'Delivery',1260,'In Progress'],[6,2,'Store Pickup',340,'Pending'],[0,3,'Delivery',890,'Completed'],
    [1,4,'Store Visit',150,'Completed'],[7,2,'Delivery',620,'Pending'],[2,3,'Store Visit',2140,'Completed'],[5,4,'Store Pickup',310,'Cancelled'],
    [3,2,'Delivery',780,'In Progress'],[6,0,'Store Visit',1000,'Completed'],[0,2,'Store Pickup',260,'Pending'],[1,3,'Delivery',540,'Completed'],
    [4,2,'Store Visit',95,'Completed']];
  var rows=[],d=new Date(2026,9,12,14,51);
  plan.forEach(function(x,i){
    var u=users[x[0]],st=stores[x[1]],dt=new Date(d.getTime()-i*7.3*3600e3);
    var pay=x[4]==='Refund'?'Refunded':x[4]==='Completed'?'Completed':x[4]==='Cancelled'?(i%2?'Completed':'Failed'):'Pending';
    rows.push({key:28873-i,storeId:st[0],store:st[1],state:st[2],user:u[0],userId:u[1],phone:u[2],city:u[3],
      platform:i%5===3?'Paytm':i%7===4?'Mystore':'Bhaiyaa',type:x[2],amount:x[3],status:x[4],payment:pay,created:dt,updated:new Date(dt.getTime()+15*60e3),
      slot:(x[4]==='Pending'&&x[2]!=='Instant Payment')?{day:addD(DASH_TODAY,1+(i%3)),time:['10:00 – 11:00 AM','04:00 – 05:00 PM','06:30 – 07:30 PM'][i%3]}:null,
      payId:x[2]==='Instant Payment'&&x[4]!=='Pending'?'pay_T'+(i*7919%999999).toString(36).toUpperCase()+'KeKTVHXW'.slice(i%4):''});
  });
  return rows;
})();
function fmtDT(d){var h=d.getHours(),m=('0'+d.getMinutes()).slice(-2);return fmtDate(d)+' · '+('0'+(h%12||12)).slice(-2)+':'+m+' '+(h<12?'AM':'PM');}
function inr(n){return '₹'+fmtAmt(+n||0);}
function platformChip(p){return '<span class="sc-plat sc-plat-'+p.toLowerCase()+'"><i></i>'+esc(p)+'</span>';}
var orderTone=function(s){return badge(s==='Completed'||s==='Paid'||s==='Processed'||s==='Approved'||s==='Complete'?'approved'
  :s==='Cancelled'||s==='Rejected'||s==='Failed'?'unapproved':s==='Refund'||s==='Refunded'?'closed':s==='In Progress'?'in-progress':'pending',s);};
var REFUNDS=[];   // instant payment refunds, newest first
var refundSeq=0;
(function(){ORDERS.filter(function(o){return o.status==='Refund';}).forEach(function(o){
  REFUNDS.push({key:++refundSeq,rid:'rfnd_'+('TloyMNPmC6YEcc'.slice(refundSeq%3)+refundSeq),so:o.key,amount:o.amount,refund:o.amount,status:'Processed',
    created:new Date(o.updated.getTime()+12*60e3)});});})();

/* the multi-line cells My Orders and Schedule Orders share */
function orderUserCell(o){
  return '<div class="sc-ord-lines"><span>'+ICO.user+esc(o.user)+'</span><span>'+ICO.phone+esc(o.phone)+'</span><span>'+ICO.pin+esc(o.city)+'</span></div>';
}
function orderTxnCell(o){
  return '<div class="sc-ord-kv"><div><em>Sales Order ID</em><b>'+o.key+'</b></div><div><em>Order Amount</em><b>'+inr(o.amount)+'</b></div>'
    +'<div><em>Platform</em>'+platformChip(o.platform)+'</div>'
    +'<button type="button" class="sc-link" onclick="event.stopPropagation();scGlOpen(state.page,'+o.key+')">Details</button></div>';
}
function orderTypeCell(o){
  return '<div class="sc-ord-kv"><div><em>Order Type</em><b>'+esc(o.type)+'</b></div>'
    +(o.slot?'<div><em>Scheduled For</em><span><b>'+esc(fmtDate(o.slot.day))+'</b><span class="lp-c-sub">'+esc(o.slot.time)+'</span></span></div>':'')
    +'<button type="button" class="sc-link" onclick="event.stopPropagation();scRetailOrderTab('+o.key+',\'workflow\')">Workflow</button></div>';
}
function orderStatusCell(o){
  return '<div class="sc-ord-kv"><div><em>Current Status</em>'+orderTone(o.status)+'</div>'
    +'<div><em>Updated On</em><span class="sc-ord-dt">'+esc(fmtDT(o.updated))+'</span></div>'
    +'<div><em>Payment</em>'+orderTone(o.payment)+'</div></div>';
}
/* the step the order is ready for, as the row's button */
function orderStepBtn(o){
  if(o.status==='Pending')return '<button class="btn-primary btn-sm sc-ord-step" type="button" onclick="scOrderStep('+o.key+',\'accept\')">Accept</button>';
  if(o.status==='In Progress')return '<button class="btn-outline btn-sm sc-ord-step" type="button" onclick="scOrderStep('+o.key+',\'complete\')">Complete</button>';
  return '';
}
function orderByKey(k){return ORDERS.filter(function(o){return o.key===k;})[0];}
function scOrderStep(key,step){
  var o=orderByKey(key);if(!o)return;
  if(step==='accept'&&o.status==='Pending'){o.status='In Progress';scToast('Order '+key+' accepted','success');}
  else if(step==='complete'&&o.status==='In Progress'){o.status='Completed';o.payment='Completed';scToast('Order '+key+' completed','success');}
  else if(step==='reject'&&(o.status==='Pending'||o.status==='In Progress')){o.status='Cancelled';o.payment=o.payment==='Pending'?'Failed':o.payment;scToast('Order '+key+' rejected','info');}
  else return;
  o.updated=new Date();o.slot=o.status==='Pending'?o.slot:null;scCloseRowMenu();scRender();
}
function scOrderDetails(key){
  var o=orderByKey(key);if(!o)return;
  var g=function(c){return '<div class="lp-sb-detail-grid" style="margin-bottom:18px">'+c+'</div>';};
  document.getElementById('sc-modal-root').innerHTML=modalShell('Order '+o.key,o.store+' · '+o.type,
    '<div style="padding:16px 0 4px">'+secHead('Order')+g(fieldCard(ICO.hash,'Sales Order ID',o.key)+fieldCard(ICO.check,'Status',orderTone(o.status))
      +fieldCard(ICO.money,'Order Amount',inr(o.amount))+fieldCard(ICO.card,'Payment',orderTone(o.payment))
      +fieldCard(ICO.basket,'Order Type',esc(o.type))+fieldCard(ICO.globe,'Platform',platformChip(o.platform))
      +fieldCard(ICO.cal,'Created',esc(fmtDT(o.created)))+fieldCard(ICO.clock,'Updated',esc(fmtDT(o.updated))))
    +secHead('Customer')+g(fieldCard(ICO.user,'Name',esc(o.user)+' <span class="lp-c-sub">#'+o.userId+'</span>')+fieldCard(ICO.phone,'Mobile',esc(o.phone))
      +fieldCard(ICO.pin,'Location',esc(o.city))+fieldCard(ICO.store,'Store',esc(o.store)+' <span class="lp-c-sub">#'+o.storeId+'</span>'))+'</div>',
    '<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Close</button></div>',true);
}
function scOrderWorkflow(key){
  var o=orderByKey(key);if(!o)return;
  var steps=[['Order Placed',o.created,o.user,'Placed on '+o.platform+' · '+o.type+'.','done']];
  if(o.status==='Cancelled')steps.push(['Order Rejected',o.updated,o.store,'The store rejected the order.','done']);
  else{
    steps.push(['Order Accepted',o.status==='Pending'?null:new Date(o.created.getTime()+5*60e3),o.store,'',o.status==='Pending'?'current':'done']);
    steps.push(['Order Completed',o.status==='Completed'||o.status==='Refund'?o.updated:null,o.store,'',o.status==='In Progress'?'current':o.status==='Pending'?'upcoming':'done']);
    if(o.status==='Refund')steps.push(['Refund Processed',new Date(o.updated.getTime()+12*60e3),'System','Refunded to the original payment method.','done']);
  }
  var body='<div class="lp-wf-wrap" style="padding:16px 0 4px">'+steps.map(function(x,i){
    return wfRow(x[0],{user:x[4]==='upcoming'?'Not started yet':x[2],date:x[1]?fmtDate(x[1]):'',time:x[1]?fmtDT(x[1]).split(' · ')[1]:''},x[3]?esc(x[3]):'','',i===steps.length-1,x[4]);
  }).join('')+'</div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell('Workflow · Order '+o.key,o.store,body,
    '<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Close</button></div>');
}
var orderStats=function(rows){return [['All',rows.length,'active'],['Completed',rows.filter(function(o){return o.status==='Completed';}).length,'approved'],
  ['Pending',rows.filter(function(o){return o.status==='Pending'||o.status==='In Progress';}).length,'pending']];};
var orderMenu=function(o){
  var m=[];
  if(o.status==='Pending')m.push(['Accept Order','scOrderStep('+o.key+',\'accept\')']);
  if(o.status==='In Progress')m.push(['Complete Order','scOrderStep('+o.key+',\'complete\')']);
  if(o.status==='Pending'||o.status==='In Progress')m.push(['Reject Order','scOrderStep('+o.key+',\'reject\')']);
  return m;
};
var ORDER_CARD_COLS=[{h:'Created Time',cell:function(o){return '<div class="sc-ord-dt">'+ICO.cal+esc(fmtDT(o.created))+'</div>';}},
  {h:'User',cell:orderUserCell},{h:'Transactional Details',cell:orderTxnCell},{h:'Order',cell:orderTypeCell},{h:'Status',cell:orderStatusCell}];

/* ── MY ORDERS ─────────────────────────────────────────────────────────── */
GL.myorders={one:'order',noun:'orders',rows:function(){return ORDERS.filter(function(o){return o.storeId===CUR_STORE.id&&o.type!=='Instant Payment';});},
  title:function(o){return 'Order '+o.key;},
  search:{placeholder:'Order ID',fields:['key']},
  filters:[{k:'platform',label:'All Platforms',opts:PLATFORMS},{k:'status',label:'Select Status',opts:['Pending','In Progress','Completed','Cancelled']},
    {k:'type',label:'Select Option',opts:['Store Visit','Store Pickup','Delivery']},{k:'payment',label:'Payment Status',opts:['Pending','Completed','Failed']}],
  stats:orderStats,cols:ORDER_CARD_COLS,menu:orderMenu};

/* ── SCHEDULE ORDERS ───────────────────────────────────────────────────── */
GL.schedule={one:'scheduled order',noun:'scheduled orders',rows:function(){return ORDERS.filter(function(o){return !!o.slot;});},
  title:function(o){return 'Order '+o.key;},
  search:{placeholder:'Store name',fields:['store']},search2:{placeholder:'Order ID',fields:['key']},
  filters:[{k:'status',label:'Select Status',opts:['Pending','In Progress']},{k:'type',label:'Select Option',opts:['Store Pickup','Delivery','Store Visit']}],
  stats:function(rows){return [['Scheduled',rows.length,'active'],['Tomorrow',rows.filter(function(o){return +o.slot.day===+addD(DASH_TODAY,1);}).length,'pending']];},
  cols:ORDER_CARD_COLS,menu:orderMenu};

/* ── INSTANT PAYMENT ORDERS ────────────────────────────────────────────── */
GL.ipay={one:'payment',noun:'instant payments',rows:function(){return ORDERS.filter(function(o){return o.type==='Instant Payment';});},
  title:function(o){return 'Order '+o.key;},
  search:{placeholder:'Order ID',fields:['key']},
  filters:[{k:'status',label:'Select Status',opts:['Pending','Paid','Refund']},{k:'platform',label:'Select Option',opts:PLATFORMS}],
  stats:function(rows){return [['All',rows.length,'active'],['Refunded',rows.filter(function(o){return o.status==='Refund';}).length,''],
    ['Pending',rows.filter(function(o){return o.status==='Pending';}).length,'pending']];},
  cols:[{h:'Order ID',cell:function(o){return plain(o.key+11);}},{h:'Sales Order ID',cell:function(o){return mainTxt(o.key);}},
    {h:'Order Amount',cell:function(o){return plain(inr(o.amount));}},{h:'Order Type',cell:function(){return plain('Instant Payment');}},
    {h:'Status',cell:function(o){return orderTone(o.status);}},{h:'Create Time',cell:function(o){return plain(fmtDT(o.created));}},
    {h:'Activity',cell:function(o){return o.payId?'<span class="sc-mono">'+esc(o.payId)+'</span>':'<span class="lp-dash">—</span>';}}],
  menu:function(o){
    var m=[];
    if(o.status==='Paid')m.push(['Refund Payment','scCloseRowMenu();scRefundPayment('+o.key+')']);
    if(o.status==='Pending')m.push(['Mark as Paid','scCloseRowMenu();scMarkPaid('+o.key+')']);
    return m;
  }};
function scMarkPaid(key){var o=orderByKey(key);if(!o)return;o.status='Paid';o.payment='Completed';o.payId='pay_T'+Date.now().toString(36).toUpperCase();o.updated=new Date();scRender();scToast('Payment received for '+key,'success');}
function scRefundPayment(key){
  var o=orderByKey(key);if(!o)return;
  o.status='Refund';o.payment='Refunded';o.updated=new Date();
  REFUNDS.unshift({key:++refundSeq,rid:'rfnd_'+Date.now().toString(36),so:o.key,amount:o.amount,refund:o.amount,status:'Processed',created:new Date()});
  scRender();scToast('Refund processed for '+key,'success','It is listed under Instant Payment Refund.');
}

/* ── INSTANT PAYMENT REFUND ────────────────────────────────────────────── */
GL.irefund={one:'refund',noun:'refunds',rows:function(){return REFUNDS;},
  title:function(r){return r.rid;},
  search:{placeholder:'Refund or sales order ID',fields:['rid','so']},
  filters:[{k:'status',label:'Select Status',opts:['Processed','Pending','Failed']}],
  stats:function(rows){return [['All',rows.length,'active'],['Processed',rows.filter(function(r){return r.status==='Processed';}).length,'approved']];},
  cols:[{h:'Refund ID',cell:function(r){return '<span class="sc-mono">'+esc(r.rid)+'</span>';}},{h:'Sales Order ID',cell:function(r){return mainTxt(r.so);}},
    {h:'Order Amount',cell:function(r){return plain(inr(r.amount));}},{h:'Refund Amount',cell:function(r){return plain(inr(r.refund));}},
    {h:'Status',cell:function(r){return orderTone(r.status);}},{h:'Create Time',cell:function(r){return plain(fmtDT(r.created));}}],
  menu:function(r){return [['View Order','scCloseRowMenu();scOrderDetails('+r.so+')']];}};

/* ── RETURNS & CANCELLATION ────────────────────────────────────────────── */
var RETURNS=[
  {key:5108,so:28866,user:'Hshs Hshs',kind:'Cancellation',reason:'Ordered by mistake',amount:1,requested:new Date(2026,9,9,18,30),status:'Approved'},
  {key:5107,so:28858,user:'Arjun Rao',kind:'Return',reason:'Damaged product',amount:620,requested:new Date(2026,9,8,11,12),status:'Requested'},
  {key:5106,so:28855,user:'Utkarsh Shukla',kind:'Cancellation',reason:'Delivery delayed',amount:310,requested:new Date(2026,9,7,16,4),status:'Requested'},
  {key:5105,so:28852,user:'Priya Nair',kind:'Return',reason:'Wrong item delivered',amount:340,requested:new Date(2026,9,6,9,48),status:'Refunded'},
  {key:5104,so:28849,user:'Baiju Balakrishnan',kind:'Return',reason:'Quality not as expected',amount:540,requested:new Date(2026,9,5,13,20),status:'Rejected'},
  {key:5103,so:28846,user:'Rambabu Musunuru',kind:'Cancellation',reason:'Found a better price',amount:260,requested:new Date(2026,9,4,19,2),status:'Approved'},
  {key:5102,so:28844,user:'Jai Bhagchandani',kind:'Return',reason:'Expired product',amount:95,requested:new Date(2026,9,3,10,15),status:'Refunded'}];
GL.returns={one:'request',noun:'requests',rows:function(){return RETURNS;},
  title:function(r){return 'Request '+r.key;},
  search:{placeholder:'Request or order ID, customer',fields:['key','so','user']},
  filters:[{k:'kind',label:'Select Type',opts:['Return','Cancellation']},{k:'status',label:'Select Status',opts:['Requested','Approved','Rejected','Refunded']}],
  stats:function(rows){return [['All',rows.length,'active'],['Requested',rows.filter(function(r){return r.status==='Requested';}).length,'pending'],
    ['Refunded',rows.filter(function(r){return r.status==='Refunded';}).length,'approved']];},
  cols:[{h:'Request ID',cell:function(r){return plain(r.key);}},{h:'Sales Order ID',cell:function(r){return mainTxt(r.so);}},
    {h:'Customer',cell:function(r){return plain(r.user);}},{h:'Type',cell:function(r){return plain(r.kind);}},
    {h:'Reason',cell:function(r){return '<div class="lp-c-plain sc-c-title" title="'+esc(r.reason)+'">'+esc(r.reason)+'</div>';}},
    {h:'Amount',cell:function(r){return plain(inr(r.amount));}},{h:'Requested On',cell:function(r){return plain(fmtDT(r.requested));}},
    {h:'Status',cell:function(r){return orderTone(r.status);}}],
  menu:function(r){
    var m=[['View Order','scCloseRowMenu();scOrderDetails('+r.so+')']];
    if(r.status==='Requested')m.push(['Approve','scReturnStep('+r.key+',\'Approved\')'],['Reject','scReturnStep('+r.key+',\'Rejected\')']);
    if(r.status==='Approved')m.push(['Mark Refunded','scReturnStep('+r.key+',\'Refunded\')']);
    return m;
  }};
function scReturnStep(key,to){
  var r=RETURNS.filter(function(x){return x.key===key;})[0];if(!r)return;
  r.status=to;scCloseRowMenu();scRender();scToast(r.kind+' '+key+' '+to.toLowerCase(),to==='Rejected'?'info':'success');
}

/* ── DEALS (retail) ────────────────────────────────────────────────────── */
var RETAIL_DEALS=(function(){
  var rows=[],stores=['Mukesh Pharmacy (286)','Zing Grocery (312)','C Mart (298)','Fresh Basket (305)'];
  var users=['Hshs Hshs','Priya Nair','Arjun Rao','Utkarsh Shukla','Rambabu Musunuru'];
  for(var i=0;i<14;i++){var q=1+(i%4);
    rows.push({key:i<5?[35838,35835,35833,35832,35831][i]:35830-i,user:users[i%users.length],store:i<5?stores[0]:stores[i%stores.length],
      qty:q.toFixed(2)+'/'+(1+(i%3)),amount:i<5?1:(q*120+i*15),date:new Date(2026,9,9-Math.floor(i/3),18-i%5,28-i*3),
      process:i%3?'Direct Sale':'Retailer Sales Process',status:i%6===5?'Pending':i%9===8?'Cancelled':'Complete'});}
  return rows;
})();
GL.retaildeals={one:'deal',noun:'deals',rows:function(){return RETAIL_DEALS;},
  title:function(r){return 'Deal '+r.key;},
  search:{placeholder:'Store name',fields:['store']},
  filters:[{k:'process',label:'Retailer Sales Process',opts:['Retailer Sales Process','Direct Sale']},{k:'status',label:'Deal Status',opts:['Complete','Pending','Cancelled']}],
  stats:function(rows){return [['All',rows.length,'active'],['Complete',rows.filter(function(r){return r.status==='Complete';}).length,'approved'],
    ['Pending',rows.filter(function(r){return r.status==='Pending';}).length,'pending']];},
  cols:[{h:'Deal ID',cell:function(r){return plain(r.key);}},{h:'User',cell:function(r){return mainTxt(r.user);}},
    {h:'Store Name',cell:function(r){return plain(r.store);}},{h:'Quantity / Product',cell:function(r){return plain(r.qty);}},
    {h:'Deal Amount',cell:function(r){return plain(inr(r.amount));}},{h:'Deal Date',cell:function(r){return plain(fmtDT(r.date));}},
    {h:'Deal Status',cell:function(r){return orderTone(r.status);}}],
  toggle:null,menu:function(r){
    var m=[];if(r.status==='Pending')m.push(['Mark Complete','scDealStatus('+r.key+',\'Complete\')'],['Cancel Deal','scDealStatus('+r.key+',\'Cancelled\')']);
    if(!m.length)m.push(['No actions for this deal','scCloseRowMenu()']);
    return m;
  }};
function scDealStatus(key,to){var r=RETAIL_DEALS.filter(function(x){return x.key===key;})[0];if(!r)return;r.status=to;scCloseRowMenu();scRender();scToast('Deal '+key+' '+(to==='Complete'?'completed':'cancelled'),to==='Complete'?'success':'info');}

/* ── ALL ORDERS ────────────────────────────────────────────────────────── */
GL.allorders={one:'order',noun:'orders',rows:function(){return ORDERS;},
  title:function(o){return 'Order '+o.key;},
  search:{placeholder:'Store, user or order ID',fields:['store','user','key','storeId']},
  filters:[{k:'platform',label:'All Platforms',opts:PLATFORMS},{k:'status',label:'Select Status',opts:['Pending','In Progress','Completed','Cancelled','Refund','Paid']},
    {k:'payment',label:'Payment Status',opts:['Pending','Completed','Failed','Refunded']},{k:'type',label:'Order Type',opts:ORDER_TYPES},
    {k:'state',label:'Select State',opts:STATES_IN}],
  stats:orderStats,
  cols:[{h:'Store',cell:function(o){return '<div class="lp-c-main sc-c-vendor" title="'+esc(o.store)+'">'+esc(o.store)+'</div><div class="lp-c-sub">#'+o.storeId+'</div>';}},
    {h:'Sales Order ID',cell:function(o){return plain(o.key);}},
    {h:'Created',cell:function(o){return '<div class="lp-c-plain">'+esc(fmtDate(o.created))+'</div><div class="lp-c-sub">'+esc(fmtDT(o.created).split(' · ')[1])+'</div>';}},
    {h:'User',cell:function(o){return '<div class="lp-c-plain">'+esc(o.user)+'</div><div class="lp-c-sub">#'+o.userId+'</div>';}},
    {h:'Platform',cell:function(o){return platformChip(o.platform);}},{h:'Order Type',cell:function(o){return plain(o.type);}},
    {h:'Amount',cell:function(o){return plain(inr(o.amount));}},{h:'Order Status',cell:function(o){return orderTone(o.status);}}],
  menu:orderMenu};
Object.assign(PAGE_ACTIONS,{myorders:['New Bill',function(){scGo('billing');}]});

/* ── ORDER BILLING ─────────────────────────────────────────────────────── */
/* Start a bill: who the customer is and how the order is fulfilled. Delivery
   asks for the address too. Submit starts the order (My Orders); Skip starts
   it as a walk-in without customer details. */
var BILL_OPTS=[['Store Visit','Customer is at the counter',ICO.store],['Store Pickup','Customer collects it later',ICO.basket],['Delivery','Sent to the customer\'s address',ICO.truck]];
function billingPageHTML(){
  var b=state.bill||(state.bill={option:'Store Visit'});
  var opts='<div class="sc-bill-opts" role="radiogroup" aria-label="Select option">'+BILL_OPTS.map(function(o){
    var on=b.option===o[0];
    return '<button type="button" role="radio" aria-checked="'+on+'" class="sc-bill-opt'+(on?' is-on':'')+'" onclick="scBillOption(\''+o[0]+'\')">'
      +'<span class="sc-bill-opt-ico">'+o[2]+'</span><span class="sc-bill-opt-txt"><b>'+esc(o[0])+'</b><em>'+esc(o[1])+'</em></span></button>';
  }).join('')+'</div>';
  var v=function(k){return esc(b[k]||'');};
  var addr=b.option==='Delivery'?section('Delivery Address','<div class="policy-form-grid">'
      +field('Address','<input class="ep-form-input" id="bl-addr" value="'+v('addr')+'" placeholder="House, street, area">',true,true)
      +field('City','<input class="ep-form-input" id="bl-city" value="'+v('city')+'" placeholder="City">',true)
      +field('PIN Code','<input class="ep-form-input" id="bl-pin" value="'+v('pin')+'" inputmode="numeric" maxlength="6" placeholder="6-digit PIN">',true)
    +'</div>'):'';
  return '<div class="listing-page"><div class="sc-bill-card">'
    +'<div class="sc-bill-head"><span class="sc-bill-head-ico">'+ICO.barcode+'</span><div><div class="sc-bill-title">New Bill</div>'
      +'<div class="sc-bill-sub">'+esc(CUR_STORE.name)+' · Start an order for a customer</div></div></div>'
    +section('Customer Details','<div class="policy-form-grid sc-bill-grid">'
      +field('Mobile Number','<div class="sc-bill-mobile">'+csField('bl-code',['+91','+971','+1','+44'],b.code||'+91','Code')
        +'<input class="ep-form-input" id="bl-mobile" value="'+v('mobile')+'" inputmode="numeric" maxlength="10" placeholder="Enter number"></div>',true)
      +field('First Name','<input class="ep-form-input" id="bl-first" value="'+v('first')+'" placeholder="Enter first name">',true)
      +field('Last Name','<input class="ep-form-input" id="bl-last" value="'+v('last')+'" placeholder="Enter last name">')
      +field('Email Address','<input class="ep-form-input" id="bl-email" type="email" value="'+v('email')+'" placeholder="Enter email address">')
    +'</div>')
    +section('Select Option',opts)
    +addr
    +'<div class="sc-bill-foot"><button class="btn-outline" type="button" onclick="scBillSubmit(true)">Skip</button>'
      +'<button class="btn-primary" type="button" onclick="scBillSubmit(false)">Submit</button></div>'
  +'</div></div>';
}
function billRead(){
  var b=state.bill,g=function(id){return ((document.getElementById(id)||{}).value||'').trim();};
  b.code=csValue('bl-code')||b.code||'+91';b.mobile=g('bl-mobile');b.first=g('bl-first');b.last=g('bl-last');b.email=g('bl-email');
  if(document.getElementById('bl-addr')){b.addr=g('bl-addr');b.city=g('bl-city');b.pin=g('bl-pin');}
  return b;
}
function scBillOption(o){billRead();state.bill.option=o;scRender();}
function scBillSubmit(skip){
  var b=billRead();
  if(!skip){
    if(!/^\d{10}$/.test(b.mobile)){scToast('Enter a 10-digit mobile number','error');return;}
    if(!b.first){scToast('Enter the first name','error');return;}
    if(b.email&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email)){scToast('Enter a valid email address','error');return;}
  }
  if(b.option==='Delivery'&&(!b.addr||!b.city||!/^\d{6}$/.test(b.pin||''))){scToast('Enter the delivery address, city and 6-digit PIN','error');return;}
  var key=ORDERS.reduce(function(m,o){return Math.max(m,o.key);},0)+1,now=new Date();
  ORDERS.unshift({key:key,storeId:CUR_STORE.id,store:CUR_STORE.name,state:'Karnataka',user:skip?'Walk-in Customer':(b.first+' '+b.last).trim(),userId:46400+key%100,
    phone:skip?'—':b.code+' '+b.mobile,city:b.option==='Delivery'?b.city:'In store',platform:'Mystore',type:b.option,amount:0,status:'In Progress',payment:'Pending',
    created:now,updated:now,slot:null,payId:''});
  state.bill={option:'Store Visit'};
  scGo('myorders');
  scToast('Order '+key+' started','success',(skip?'Walk-in · ':'')+b.option+'. Add items to the bill to set its amount.');
}

/* ══ PRODUCT & INVENTORY ═══════════════════════════════════════════════════
   The catalogue (PRODUCTS) behind All Products / Services and the store's
   Product List; Custom Menu, Brands, Tax and HSN/SAC as listings; Bulk
   Upload as a two-step page - images, then the catalogue sheet. */
var PRODUCTS=(function(){
  var seed=[['Paracetamol Medicine','Product','Services','Deep Cleaning','',3126,'Mukesh Pharmacy'],
    ['Dolo 650 Tablet','Product','Health & Wellness','Medicines','Fever & Pain',3126,'Mukesh Pharmacy'],
    ['Crocin Advance','Product','Health & Wellness','Medicines','Fever & Pain',3126,'Mukesh Pharmacy'],
    ['Vicks VapoRub 50ml','Product','Health & Wellness','Medicated Care','Cold & Cough',3126,'Mukesh Pharmacy'],
    ['Home Sanitisation','Service','Services','Deep Cleaning','Home',3126,'Mukesh Pharmacy'],
    ['Amul Butter 500g','Product','Bakery, Cakes & Dairy','Dairy','Butter',3136,'Zing Grocery'],
    ['Tata Salt 1kg','Product','Grocery & Staples','Salt & Sugar','Salt',3136,'Zing Grocery'],
    ['Aashirvaad Atta 5kg','Product','Grocery & Staples','Atta & Flours','Wheat Atta',3135,'C Mart'],
    ['Fortune Sunflower Oil 1L','Product','Grocery & Staples','Edible Oils','Sunflower Oil',3135,'C Mart'],
    ['AC Service','Service','Services','Appliance Repair','Air Conditioner',2176,'DHI Hyperlocal Pvt Ltd'],
    ['Lakme Moisturiser','Product','BPC','Skin Care','Moisturisers',3134,'Suma Grocery'],
    ['Haircut & Styling','Service','Services','Salon','Men',2176,'DHI Hyperlocal Pvt Ltd'],
    ['Philips LED Bulb 9W','Product','Home And Kitchen','Lighting','LED Bulbs',3134,'Suma Grocery'],
    ['Boat Earbuds','Product','Electronics','Audio Accessories','Earbuds',3131,'Chennai Fashion Store 2k26']];
  var rows=[];
  for(var i=0;i<32;i++){var x=seed[i%seed.length],n=i<seed.length?'':' ('+(Math.floor(i/seed.length)+1)+')';
    rows.push({key:76294-i*3,name:x[0]+n,itemType:x[1],main:x[2],child:x[3],grand:x[4],storeId:x[5],store:x[6],status:i%9===8?'Inactive':'Active'});}
  return rows;
})();
var MAIN_CATS=['Health & Wellness','Grocery & Staples','Bakery, Cakes & Dairy','BPC','Home And Kitchen','Electronics','Services'];
function productTile(r){
  var hue={Product:'',Service:' is-svc'}[r.itemType]||'';
  return '<span class="sc-prod-img'+hue+'" title="'+esc(r.name)+'">'+(r.itemType==='Service'?ICO.sliders:ICO.cube)+'</span>';
}
var productStats=function(rows){return [['All',rows.length,'active'],['Products',rows.filter(function(r){return r.itemType==='Product';}).length,''],
  ['Services',rows.filter(function(r){return r.itemType==='Service';}).length,'']];};
var productToggle={k:'status',on:'Active',off:'Inactive',onLabel:'Activate',offLabel:'Deactivate',onDone:'activated',offDone:'deactivated'};
GL.allproducts={one:'product',noun:'products',rows:function(){return PRODUCTS;},source:PRODUCTS,
  title:function(r){return r.name;},
  search:{placeholder:'Search products',fields:['name','key']},search2:{placeholder:'Store name',fields:['store']},
  filters:[{k:'status',label:'All Status',opts:['Active','Inactive']},{k:'itemType',label:'All Item Types',opts:['Product','Service']},
    {k:'main',label:'All Categories',opts:MAIN_CATS}],
  stats:productStats,
  cols:[{h:'Product ID',cell:function(r){return plain(r.key);}},{h:'Image',cell:productTile},{h:'Product Name',cell:function(r){return mainTxt(r.name);}},
    {h:'Item Type',cell:function(r){return badge(r.itemType==='Product'?'approved':'in-progress',r.itemType);}},
    {h:'Main Category',cell:function(r){return plain(r.main);}},{h:'Store ID',cell:function(r){return plain(r.storeId);}},
    {h:'Store Name',cell:function(r){return plain(r.store);}},{h:'Status',cell:function(r){return activeBadge(r.status);}}],
  toggle:productToggle};
GL.productlist={one:'product',noun:'products',rows:function(){return PRODUCTS.filter(function(r){return r.storeId===CUR_STORE.id;});},source:PRODUCTS,
  title:function(r){return r.name;},
  search:{placeholder:'Search products',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'main',label:'Main Category',opts:MAIN_CATS}],
  stats:productStats,
  cols:[{h:'Product ID',cell:function(r){return plain(r.key);}},{h:'Picture',cell:productTile},{h:'Product Name',cell:function(r){return mainTxt(r.name);}},
    {h:'Main Category',cell:function(r){return plain(r.main);}},{h:'Child Category',cell:function(r){return plain(r.child||'—');}},
    {h:'Grand Child Category',cell:function(r){return r.grand?plain(r.grand):'<span class="lp-dash">—</span>';}},
    {h:'Status',cell:function(r){return activeBadge(r.status);}}],
  form:[{k:'name',label:'Product Name',req:true,full:true},{k:'itemType',label:'Item Type',type:'select',opts:['Product','Service'],req:true},
    {k:'main',label:'Main Category',type:'select',opts:MAIN_CATS,req:true},{k:'child',label:'Child Category',req:true},
    {k:'grand',label:'Grand Child Category'},{k:'status',label:'Status',type:'select',opts:['Active','Inactive'],def:'Active',req:true}],
  defaults:function(){return {storeId:CUR_STORE.id,store:CUR_STORE.name};},
  toggle:productToggle,del:true};

/* ── CUSTOM MENU ───────────────────────────────────────────────────────── */
var CUSTOM_MENUS=[['Breakfast Specials',12,'Zing Grocery'],['Daily Essentials',24,'Zing Grocery'],['Fever & Cold Care',9,'Mukesh Pharmacy'],
  ['Baby Care',14,'Mukesh Pharmacy'],['Festive Offers',18,'C Mart'],['Healthy Snacks',11,'C Mart'],['Home Cleaning',7,'DHI Hyperlocal Pvt Ltd'],
  ['Summer Coolers',10,'Suma Grocery']].map(function(x,i){return {key:808-i,name:x[0],items:x[1],store:x[2],order:i+1,status:i===6?'Inactive':'Active'};});
GL.custommenu={one:'menu',noun:'menus',rows:CUSTOM_MENUS,
  title:function(r){return r.name;},
  search:{placeholder:'Search menu',fields:['name','store']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Inactive','']]);},
  cols:[{h:'Menu ID',cell:function(r){return plain(r.key);}},{h:'Menu Name',cell:function(r){return mainTxt(r.name);}},
    {h:'Store',cell:function(r){return plain(r.store);}},{h:'Items',cell:function(r){return plain(r.items+' items');}},
    {h:'Display Order',cell:function(r){return plain(r.order);}},{h:'Status',cell:function(r){return glSwitch('custommenu',r);}}],
  form:[{k:'name',label:'Menu Name',req:true},{k:'store',label:'Store',type:'select',opts:['Zing Grocery','C Mart','Suma Grocery','Mukesh Pharmacy','DHI Hyperlocal Pvt Ltd'],req:true},
    {k:'items',label:'Items',type:'number',req:true,def:'0'},{k:'order',label:'Display Order',type:'number',req:true,def:'1'}],
  defaults:function(){return {status:'Active'};},
  toggle:{k:'status',on:'Active',off:'Inactive',onLabel:'Show menu',offLabel:'Hide menu',onDone:'shown',offDone:'hidden'},del:true};

/* ── BRANDS ────────────────────────────────────────────────────────────── */
var BRANDS=[['Cipla Ltd','Health & Wellness','Medicines'],['Strava Healthcare Private Limited','Health & Wellness','Medicines'],
  ['Lakme','BPC','Skin Care - Lotions, Moisturisers, And Creams'],['Dot & Key','BPC','Body Care - Moisturizers'],['Heritage','Bakery, Cakes & Dairy','Dairy'],
  ['Supreme','Electronics','Audio Accessories'],['Tugain','Health & Wellness','Medicated Hair Care'],['PCM','Health & Wellness','Pain Relief'],
  ['Philips','Home And Kitchen','Party And Festive Needs'],['Shakti','Home And Kitchen','Pooja Needs'],['Amul','Bakery, Cakes & Dairy','Dairy'],
  ['Tata Consumer','Grocery & Staples','Salt & Sugar'],['Aashirvaad','Grocery & Staples','Atta & Flours'],['Fortune','Grocery & Staples','Edible Oils'],
  ['boAt','Electronics','Audio Accessories'],['Dabur','Health & Wellness','Ayurveda'],['Himalaya','BPC','Face Care'],['Prestige','Home And Kitchen','Cookware']]
  .map(function(x,i){return {key:i+1,name:x[0],main:x[1],sub:x[2],status:i===16?'Inactive':'Active'};});
GL.brands={one:'brand',noun:'brands',rows:BRANDS,
  title:function(r){return r.name;},
  search:{placeholder:'Search brand',fields:['name','main','sub']},
  filters:[{k:'main',label:'Search By Category',opts:MAIN_CATS},{k:'status',label:'Select Status',opts:['Active','Inactive']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Inactive','']]);},
  cols:[{h:'Brand Name',cell:function(r){return mainTxt(r.name);}},{h:'Main Category',cell:function(r){return plain(r.main);}},
    {h:'Sub Category',cell:function(r){return '<div class="lp-c-plain sc-c-title" title="'+esc(r.sub)+'">'+esc(r.sub)+'</div>';}},
    {h:'Status',cell:function(r){return glSwitch('brands',r);}}],
  form:[{k:'name',label:'Brand Name',req:true,full:true},{k:'main',label:'Main Category',type:'select',opts:MAIN_CATS,req:true},
    {k:'sub',label:'Sub Category',req:true}],
  defaults:function(){return {status:'Active'};},
  toggle:{k:'status',on:'Active',off:'Inactive',onLabel:'Activate',offLabel:'Deactivate',onDone:'activated',offDone:'deactivated'},del:true};

/* ── TAX ───────────────────────────────────────────────────────────────── */
var TAXES=[['test tax',9,'pardeep singh','Active'],['GST',5,'sunil srivastava','Active'],['GST',18,'shrinivas sadalawar','Active'],['GST',0,'sunil srivastava','Active'],
  ['CGST0%',0,'sunil srivastava','Inactive'],['tax',0,'sunil srivastava','Inactive'],['cgst',9,'sunil srivastava','Inactive'],['Opps sgst',9,'sunil srivastava','Inactive'],
  ['GST Test',5,'shrinivas sadalawar','Inactive'],['tax gov',10,'sunil srivastava','Inactive'],['GST',12,'pardeep singh','Active'],['GST',28,'shrinivas sadalawar','Active'],
  ['IGST',18,'pardeep singh','Active'],['SGST',9,'sunil srivastava','Active'],['CGST',9,'sunil srivastava','Active'],['Cess',1,'pardeep singh','Inactive'],
  ['GST',3,'shrinivas sadalawar','Active'],['Luxury Tax',28,'pardeep singh','Inactive']]
  .map(function(x,i){return {key:i+1,name:x[0],pct:x[1],retailer:x[2],status:x[3]};});
GL.tax={one:'tax',noun:'taxes',rows:TAXES,
  title:function(r){return r.name+' '+r.pct+'%';},
  search:{placeholder:'Search tax or retailer',fields:['name','retailer']},
  filters:[{k:'status',label:'Status',opts:['Active','Inactive']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Inactive','']]);},
  cols:[{h:'Name',cell:function(r){return mainTxt(r.name);}},{h:'Percentage',cell:function(r){return plain((+r.pct).toFixed(2)+' %');}},
    {h:'Retailer',cell:function(r){return plain(r.retailer);}},{h:'Status',cell:function(r){return glSwitch('tax',r);}}],
  form:[{k:'name',label:'Tax Name',req:true},{k:'pct',label:'Percentage',type:'number',req:true,ph:'e.g. 18'},
    {k:'retailer',label:'Retailer',type:'select',opts:['pardeep singh','sunil srivastava','shrinivas sadalawar'],req:true}],
  defaults:function(){return {status:'Active'};},
  toggle:{k:'status',on:'Active',off:'Inactive',onLabel:'Activate',offLabel:'Deactivate',onDone:'activated',offDone:'deactivated'},del:true};

/* ── HSN / SAC MASTER ──────────────────────────────────────────────────── */
var HSNS=[['08045025','HSN','Fresh Langda Mangoes',0],['08045027','HSN','Fresh Totapuri Mangoes',0],['08045023','HSN','Fresh Chausa Mangoes',0],
  ['08109060','HSN','Fresh Litchis',0],['08045026','HSN','Fresh Kesar Mangoes',0],['08045028','HSN','Fresh Mallika Mangoes',0],['08045024','HSN','Fresh Dasheri Mangoes',0],
  ['08094010','HSN','Fresh Plums',0],['08109010','HSN','Fresh Pomegranates',0],['08071900','HSN','Fresh Muskmelons',0],['04051000','HSN','Butter',12],
  ['25010010','HSN','Common Salt',0],['11010000','HSN','Wheat Flour (Atta)',0],['15121110','HSN','Sunflower Oil',5],['30049099','HSN','Medicaments (Tablets)',12],
  ['33049910','HSN','Face Creams & Moisturisers',18],['85183000','HSN','Headphones & Earphones',18],['85395000','HSN','LED Lamps',12],
  ['998533','SAC','Cleaning Services',18],['998729','SAC','Repair of Household Appliances',18],['999721','SAC','Hairdressing & Barbers',18],['996331','SAC','Restaurant Services',5]]
  .map(function(x,i){return {key:i+1,code:x[0],type:x[1],desc:x[2],cgst:x[3]/2,sgst:x[3]/2,igst:x[3],status:'Active'};});
GL.hsn={one:'HSN/SAC code',noun:'codes',rows:HSNS,
  title:function(r){return r.code+' · '+r.desc;},
  search:{placeholder:'Search HSN code / description',fields:['code','desc']},
  filters:[{k:'status',label:'Status',opts:['Active','Inactive']},{k:'type',label:'Type',opts:['HSN','SAC']}],
  stats:function(rows){return [['All',rows.length,'active'],['HSN',rows.filter(function(r){return r.type==='HSN';}).length,''],['SAC',rows.filter(function(r){return r.type==='SAC';}).length,'']];},
  cols:[{h:'HSN/SAC Code',cell:function(r){return '<span class="sc-mono">'+esc(r.code)+'</span>';}},{h:'Type',cell:function(r){return plain(r.type);}},
    {h:'Description',cell:function(r){return mainTxt(r.desc);}},{h:'CGST %',cell:function(r){return plain((+r.cgst).toFixed(2));}},
    {h:'SGST %',cell:function(r){return plain((+r.sgst).toFixed(2));}},{h:'IGST %',cell:function(r){return plain((+r.igst).toFixed(2));}},
    {h:'Status',cell:function(r){return glSwitch('hsn',r);}}],
  form:[{k:'code',label:'HSN/SAC Code',req:true},{k:'type',label:'Type',type:'select',opts:['HSN','SAC'],req:true},
    {k:'desc',label:'Description',req:true,full:true},{k:'cgst',label:'CGST %',type:'number',req:true,def:'0'},{k:'sgst',label:'SGST %',type:'number',req:true,def:'0'},
    {k:'igst',label:'IGST %',type:'number',req:true,def:'0'}],
  defaults:function(){return {status:'Active'};},
  toggle:{k:'status',on:'Active',off:'Inactive',onLabel:'Activate',offLabel:'Deactivate',onDone:'activated',offDone:'deactivated'},del:true};
Object.assign(PAGE_ACTIONS,{
  productlist:['Create Product',function(){scGlForm('productlist');}],custommenu:['Create Menu',function(){scGlForm('custommenu');}],
  brands:['Create Brand',function(){scGlForm('brands');}],tax:['Create Tax',function(){scGlForm('tax');}],hsn:['Create HSN/SAC',function(){scGlForm('hsn');}]
});

/* ── BULK UPLOAD ───────────────────────────────────────────────────────── */
/* Two steps: the product images (20 KB - 175 KB each, named as in the
   sheet), then the catalogue sheet in the sample's format. Submit queues the
   products; the sample catalogue downloads as a CSV with the right headers. */
var BULK={step:1,images:[],sheet:null};
var BULK_COLS=['Product Name','Item Type','Main Category','Child Category','Grand Child Category','HSN/SAC Code','Tax %','MRP','Selling Price','Stock','Image Name'];
function bulkUploadHTML(){
  var B=BULK,steps=[['Upload Images',ICO.cube],['Upload Catalogue',ICO.doc]];
  var stepper='<div class="sc-bulk-steps">'+steps.map(function(x,i){
    var n=i+1,cls=B.step>n?' is-done':B.step===n?' is-now':'';
    return (i?'<span class="sc-bulk-line'+(B.step>1?' is-done':'')+'"></span>':'')
      +'<div class="sc-bulk-step'+cls+'"><span class="sc-bulk-dot">'+(B.step>n?ICO.check:n)+'</span><span>'+esc(x[0])+'</span></div>';
  }).join('')+'</div>';
  var zone=function(kind){
    var multi=kind==='img',acc=kind==='img'?'image/png,image/jpeg,image/webp':'.xlsx,.xls,.csv';
    var dz=' onclick="document.getElementById(\'sc-bulk-'+kind+'\').click()" ondragover="event.preventDefault();this.classList.add(\'is-over\')"'
      +' ondragleave="this.classList.remove(\'is-over\')" ondrop="event.preventDefault();this.classList.remove(\'is-over\');scBulkFiles(\''+kind+'\',event.dataTransfer.files)"';
    return '<input type="file" id="sc-bulk-'+kind+'" '+(multi?'multiple ':'')+'accept="'+acc+'" hidden onchange="scBulkFiles(\''+kind+'\',this.files);this.value=\'\'">'
      +'<div class="att-zone att-zone-lg"'+dz+'><span class="att-zone-ico">'+ATT_ICO.upload+'</span>'
      +'<div class="att-zone-title">'+(kind==='img'?'Drop product images here, or click to browse':'Drop the catalogue sheet here, or click to browse')+'</div>'
      +'<div class="att-zone-hint">'+(kind==='img'?'PNG, JPG or WEBP · 20 KB to 175 KB each':'Excel or CSV in the sample format · up to 20 products a sheet')+'</div></div>';
  };
  var imgs=B.images.length?'<div class="sc-bulk-grid">'+B.images.map(function(f,i){
      return '<div class="sc-bulk-img"><img src="'+f.url+'" alt="'+esc(f.name)+'"><div class="sc-bulk-img-meta"><b title="'+esc(f.name)+'">'+esc(f.name)+'</b><span>'+esc(attSize(f.size))+'</span></div>'
        +'<button type="button" class="sc-bulk-x" title="Remove" aria-label="Remove '+esc(f.name)+'" onclick="scBulkRemove('+i+')">'+ICO.close+'</button></div>';
    }).join('')+'</div>':'<div class="lp-logs-empty">No images yet.</div>';
  var body=B.step===1
    ?'<div class="sc-bulk-cols"><div>'+secHead('Upload Images')+zone('img')+'</div>'
      +'<div>'+secHead('Uploaded Images','<span class="sc-act-count">'+B.images.length+(B.images.length===1?' image':' images')+'</span>')+imgs+'</div></div>'
      +'<div class="sc-bill-foot"><button class="btn-primary" type="button" onclick="scBulkNext()"'+(B.images.length?'':' disabled')+'>Next: Upload Catalogue</button></div>'
    :'<div class="sc-bulk-cols"><div>'+secHead('Upload Catalogue')+zone('sheet')+'</div>'
      +'<div>'+secHead('Catalogue')+(B.sheet?'<div class="sc-draft-file"><span class="att-kind">'+esc(attKind(B.sheet.name))+'</span><b>'+esc(B.sheet.name)+'</b><span>'+esc(attSize(B.sheet.size))+'</span>'
        +'<button type="button" class="sc-bulk-x is-inline" title="Remove" onclick="BULK.sheet=null;scRender()">'+ICO.close+'</button></div>'
        +'<p class="sc-bulk-note">'+B.images.length+(B.images.length===1?' image':' images')+' ready to match by name.</p>'
        :'<div class="lp-logs-empty">No catalogue yet.</div>')+'</div></div>'
      +'<div class="sc-bill-foot"><button class="btn-outline" type="button" onclick="BULK.step=1;scRender()">Back</button>'
        +'<button class="btn-primary" type="button" onclick="scBulkSubmit()"'+(B.sheet?'':' disabled')+'>Upload Products</button></div>';
  return '<div class="listing-page"><div class="sc-bill-card sc-bulk-card">'
    +'<div class="sc-bulk-top"><div><div class="sc-bill-title">Uploading instructions</div><ol class="sc-bulk-rules">'
      +'<li>Upload the product images first, each with a unique name.</li>'
      +'<li>Use the same names in the catalogue sheet\'s <b>Image Name</b> column.</li>'
      +'<li>Keep the sheet exactly in the sample catalogue\'s format.</li>'
      +'<li>Each sheet can hold up to 20 products.</li>'
      +'<li>Each image must be between 20 KB and 175 KB.</li></ol></div>'
      +'<button class="btn-outline btn-sm sc-gl-tool" type="button" onclick="scBulkSample()">'+ICO_DOWNLOAD+' Sample Catalogue</button></div>'
    +stepper+body
  +'</div></div>';
}
function scBulkFiles(kind,list){
  var files=Array.prototype.slice.call(list||[]);
  if(kind==='sheet'){
    var f=files[0];if(!f)return;
    if(!/\.(xlsx|xls|csv)$/i.test(f.name)){scToast('Upload an Excel or CSV file','error');return;}
    BULK.sheet={name:f.name,size:f.size};scRender();return;
  }
  var bad=[],dup=0;
  files.forEach(function(f){
    if(!/^image\//.test(f.type)){bad.push(f.name+' is not an image');return;}
    if(f.size<20*1024||f.size>175*1024){bad.push(f.name+' is '+attSize(f.size));return;}
    if(BULK.images.some(function(x){return x.name===f.name;})){dup++;return;}
    BULK.images.push({name:f.name,size:f.size,url:URL.createObjectURL(f)});
  });
  scRender();
  if(bad.length)scToast(bad.length+(bad.length===1?' file was':' files were')+' not added','error',bad.slice(0,2).join(' · ')+'. Images must be 20 KB to 175 KB.');
  if(dup)scToast(dup+' already added','info','Image names must be unique.');
}
function scBulkRemove(i){var f=BULK.images.splice(i,1)[0];if(f)URL.revokeObjectURL(f.url);scRender();}
function scBulkNext(){if(!BULK.images.length)return;BULK.step=2;scRender();}
function scBulkSubmit(){
  if(!BULK.sheet)return;
  var n=BULK.images.length,name=BULK.sheet.name;
  BULK.images.forEach(function(f){URL.revokeObjectURL(f.url);});
  BULK={step:1,images:[],sheet:null};scRender();
  scToast('Catalogue uploaded','success',name+' with '+n+(n===1?' image':' images')+' is queued. Products appear in the Product List once processed.');
}
function scBulkSample(){
  var csv=[BULK_COLS,['Dolo 650 Tablet','Product','Health & Wellness','Medicines','Fever & Pain','30049099','12','35','32','100','dolo-650.jpg']]
    .map(function(l){return l.map(function(v){return '"'+v+'"';}).join(',');}).join('\r\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='sample-catalogue.csv';
  document.body.appendChild(a);a.click();a.remove();scToast('Sample catalogue downloaded','success');
}

/* ══ BUYERS ════════════════════════════════════════════════════════════════
   All Buyers, Live Buyers (API access), and credit: customers on a band,
   bands with their limits. Credit customers are picked from the buyers; a
   band's "Customers Assigned" is counted from the customers. */
var BUYERS=(function(){
  var seed=[['Rambabu','Musunuru','musunururambabu@gmail.com'],['Baiju','Balakrishnan','baijubalakrishnan@gmail.com'],['Jai','Bhagchandani',''],
    ['Utkarsh','Shukla',''],['Pavan','Pavan',''],['Sanket','Ingole',''],['Venugopal','E',''],['Jibardhan','Bhoi',''],['Mavalya','','mavalyau@gmail.com'],
    ['Manasa','','manasa@gmail.com'],['Priya','Nair','priya.nair@gmail.com'],['Arjun','Rao','arjunrao@yahoo.com'],['Hshs','Hshs',''],['Mukesh','Kum','mukeshk@gmail.com'],
    ['Deepa','Menon','deepa.menon@gmail.com'],['Karthik','Reddy','']];
  var keys=[46355,46353,46352,46351,46348,46347,46346,46344,46343,46342];
  var rows=[];
  for(var i=0;i<38;i++){var x=seed[i%seed.length],n=i<seed.length?'':' '+(Math.floor(i/seed.length)+1);
    rows.push({key:keys[i]||46341-i,first:x[0]+n,last:x[1],email:x[2],mobile:'9'+String(800000000+i*7919731%199999999).slice(0,9),
      joined:fmtDate(addD(DASH_TODAY,-i*3))});}
  return rows;
})();
function buyerName(b){return (b.first+' '+b.last).trim();}
GL.allbuyers={one:'buyer',noun:'buyers',rows:BUYERS,
  title:function(b){return buyerName(b);},
  search:{placeholder:'Search name, email or mobile',fields:['first','last','email','mobile','key']},
  filters:[{k:'hasEmail',label:'Filter By',opts:['With Email','Without Email'],match:function(b,v){return v==='With Email'?!!b.email:!b.email;}}],
  stats:function(rows){return [['All',rows.length,'active'],['With Email',rows.filter(function(b){return b.email;}).length,''],
    ['On Credit',rows.filter(function(b){return CREDIT_CUSTOMERS.some(function(c){return c.buyer===b.key;});}).length,'approved']];},
  cols:[{h:'Key',cell:function(b){return plain(b.key);}},{h:'First Name',cell:function(b){return mainTxt(b.first);}},
    {h:'Last Name',cell:function(b){return b.last?plain(b.last):'<span class="lp-dash">—</span>';}},
    {h:'Email',cell:function(b){return b.email?'<div class="lp-c-plain sc-c-vendor" title="'+esc(b.email)+'">'+esc(b.email)+'</div>':'<span class="lp-dash">—</span>';}},
    {h:'Mobile',cell:function(b){return plain(b.mobile);}},{h:'Joined',cell:function(b){return plain(b.joined);}}],
  tool:function(){return '<button class="btn-outline btn-sm sc-gl-tool" type="button" onclick="scExportBuyers()">'+ICO_DOWNLOAD+' Export</button>';},
  menu:function(b){
    var on=CREDIT_CUSTOMERS.some(function(c){return c.buyer===b.key;});
    return [['View Orders','scCloseRowMenu();scBuyerOrders('+b.key+')'],
      [on?'Open Credit Account':'Add to Credit','scCloseRowMenu();scBuyerCredit('+b.key+')']];
  }};
function scExportBuyers(){
  var rows=glRows('allbuyers');if(!rows.length){scToast('Nothing to export','info');return;}
  var csv=[['Key','First Name','Last Name','Email','Mobile','Joined']].concat(rows.map(function(b){return [b.key,b.first,b.last,b.email,b.mobile,b.joined];}))
    .map(function(l){return l.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\r\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='buyers.csv';
  document.body.appendChild(a);a.click();a.remove();scToast('Buyers exported','success',rows.length+' buyers in the file.');
}
function scBuyerOrders(key){
  var b=BUYERS.filter(function(x){return x.key===key;})[0];if(!b)return;
  glState('allorders').f={q:b.first};glState('allorders').page=1;scGo('allorders');
}
function scBuyerCredit(key){
  var c=CREDIT_CUSTOMERS.filter(function(x){return x.buyer===key;})[0];
  if(c){glState('creditcustomers').f={q:String(c.key)};scGo('creditcustomers');return;}
  var b=BUYERS.filter(function(x){return x.key===key;})[0];if(!b)return;
  scGo('creditcustomers');GL.creditcustomers.prefill={buyerName:buyerName(b)};scGlForm('creditcustomers');GL.creditcustomers.prefill=null;
}

/* ── LIVE BUYERS (API access) ──────────────────────────────────────────── */
var LIVE_BUYERS=(function(){
  var seed=[['Antar Seller','antar@seller.com','MzA5MGFkb','4810f6a3f'],['Taste Food','tastefood@gmail.com','MzA4OWFkb','bcf07ccce'],
    ['Taste Food','tastefood@gmail.com','MzA4OWFkb','44726f032'],['Suma Latha','sumalatha@gmail.com','MzA4OGFkb','08f67ea44'],
    ['Suma Latha','sumalatha@gmail.com','MzA4OGFkb','73689b4e7'],['Antar Singh','antelectronics@ant.com','YWRtaW4xM','03ae8c468'],
    ['Antar Singh','antelectronics@ant.com','YWRtaW44N','134c8b5b1'],['Lara Admin','9879879875@gmail.com','YWRtaW4xM','8b0e69169'],
    ['Opendhi Agent','opendhiagentref@yopmail.com','MzA4NmFkb','807c3d7c8'],['Opendhi Agent','opendhiagentref@yopmail.com','MzA4NmFkb','f9f3a365c'],
    ['Priya Nair','priya.nair@gmail.com','YnV5ZXIxM','a1c99e2d0'],['Arjun Rao','arjunrao@yahoo.com','YnV5ZXI0N','5be17f6aa']];
  var keys=[42013,42012,42011,42009,42008,42006,42005,42001,41998,41997];
  return seed.concat(seed.slice(0,8)).map(function(x,i){
    return {key:keys[i]||41996-i,name:x[0],email:x[1],type:i>=10&&i<12?'buyer':'admin',akey:x[2]+'kZWZhdWx0',aval:x[3]+'9b2c4e7a1d',status:i%13===12?'Revoked':'Active'};});
})();
function masked(v){return '<span class="sc-mono sc-masked" title="Hidden">'+esc(v.slice(0,9))+'…</span>';}
GL.livebuyers={one:'live buyer',noun:'live buyers',rows:LIVE_BUYERS,
  title:function(r){return r.name;},
  search:{placeholder:'Search name or email',fields:['name','email','key']},
  filters:[{k:'type',label:'User Type',opts:['admin','buyer']},{k:'status',label:'Select Status',opts:['Active','Revoked']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Revoked','']]);},
  cols:[{h:'Key',cell:function(r){return plain(r.key);}},{h:'Name',cell:function(r){return mainTxt(r.name);}},
    {h:'Email',cell:function(r){return '<div class="lp-c-plain sc-c-vendor" title="'+esc(r.email)+'">'+esc(r.email)+'</div>';}},
    {h:'Type',cell:function(r){return plain(r.type);}},
    {h:'Access Key',cell:function(r){return '<span class="sc-secret">'+masked(r.akey)+'<button type="button" class="sc-copy" title="Copy access key" aria-label="Copy access key" onclick="scCopySecret('+r.key+',\'akey\')">'+ICO.copy+'</button></span>';}},
    {h:'Access Value',cell:function(r){return '<span class="sc-secret">'+masked(r.aval)+'<button type="button" class="sc-copy" title="Copy access value" aria-label="Copy access value" onclick="scCopySecret('+r.key+',\'aval\')">'+ICO.copy+'</button></span>';}},
    {h:'Status',cell:function(r){return activeBadge(r.status==='Active'?'Active':'Inactive').replace('>Inactive<','>Revoked<');}}],
  toggle:{k:'status',on:'Active',off:'Revoked',onLabel:'Restore Access',offLabel:'Revoke Access',onDone:'access restored',offDone:'access revoked'},
  menu:function(r){return [['Regenerate Keys','scCloseRowMenu();scRegenKeys('+r.key+')']];}};
function scCopySecret(key,field){
  var r=glRow('livebuyers',key);if(!r)return;
  var done=function(){scToast((field==='akey'?'Access key':'Access value')+' copied','success');};
  try{navigator.clipboard.writeText(r[field]).then(done,function(){scToast('Copy is blocked in this browser','error');});}catch(e){scToast('Copy is blocked in this browser','error');}
}
function scRegenKeys(key){
  var r=glRow('livebuyers',key);if(!r)return;
  var rnd=function(n){var c='abcdef0123456789',o='';for(var i=0;i<n;i++)o+=c[Math.floor(Math.random()*16)];return o;};
  r.akey=btoa(r.name.slice(0,4)+rnd(4)).replace(/=/g,'')+'kZWZhdWx0';r.aval=rnd(18);r.status='Active';scRender();
  scToast('Keys regenerated for '+r.name,'success','The old keys stop working now.');
}

/* ── CREDIT BANDS & CUSTOMERS ──────────────────────────────────────────── */
var CREDIT_BANDS=[{key:4,name:'Platinum',limit:50000,days:45,created:'02 Oct 2026'},{key:3,name:'Gold',limit:25000,days:30,created:'18 Sep 2026'},
  {key:2,name:'Silver',limit:10000,days:15,created:'05 Sep 2026'},{key:1,name:'Starter',limit:3000,days:7,created:'21 Aug 2026'}];
function bandBy(name){return CREDIT_BANDS.filter(function(b){return b.name===name;})[0];}
var CREDIT_CUSTOMERS=[[46355,'Gold',18200,'Active'],[46353,'Silver',9400,'Active'],[46343,'Starter',1200,'Active'],[46342,'Platinum',12500,'Active'],
  [46339,'Silver',10000,'Blocked'],[46337,'Starter',600,'Active'],[46333,'Gold',4100,'Active']].map(function(x,i){
  var b=BUYERS.filter(function(y){return y.key===x[0];})[0]||BUYERS[i];
  return {key:9001+i,buyer:b.key,buyerName:buyerName(b),mobile:b.mobile,band:x[1],used:x[2],status:x[3]};});
GL.creditcustomers={one:'credit customer',noun:'credit customers',rows:CREDIT_CUSTOMERS,
  title:function(c){return c.buyerName;},
  search:{placeholder:'Search customer or mobile',fields:['buyerName','mobile','key']},
  filters:[{k:'band',label:'Credit Band',opts:function(){return CREDIT_BANDS.map(function(b){return b.name;});}},{k:'status',label:'Select Status',opts:['Active','Blocked']}],
  stats:function(rows){var out=rows.reduce(function(t,c){return t+c.used;},0);
    return [['Customers',rows.length,'active'],['Outstanding','₹'+Math.round(out).toLocaleString('en-IN'),'pending'],['Blocked',rows.filter(function(c){return c.status==='Blocked';}).length,'']];},
  cols:[{h:'Account',cell:function(c){return plain(c.key);}},{h:'Customer',cell:function(c){return '<div class="lp-c-main">'+esc(c.buyerName)+'</div><div class="lp-c-sub">Buyer #'+c.buyer+'</div>';}},
    {h:'Mobile',cell:function(c){return plain(c.mobile);}},{h:'Credit Band',cell:function(c){return '<span class="sc-band sc-band-'+c.band.toLowerCase()+'">'+esc(c.band)+'</span>';}},
    {h:'Credit Used',cell:function(c){var b=bandBy(c.band),lim=b?b.limit:0,pct=lim?Math.min(100,c.used/lim*100):0;
      return '<div class="sc-credit"><div class="sc-credit-top"><b>'+inr(c.used)+'</b><span>of '+inr(lim)+'</span></div>'
        +'<span class="sc-credit-track"><span class="sc-credit-fill'+(pct>=90?' is-high':'')+'" style="width:'+pct.toFixed(1)+'%"></span></span>'
        +'<div class="lp-c-sub">'+inr(Math.max(0,lim-c.used))+' available</div></div>';}},
    {h:'Status',cell:function(c){return badge(c.status==='Active'?'approved':'unapproved',c.status);}}],
  form:[{k:'buyerName',label:'Customer',type:'select',req:true,full:true,opts:function(){
      return BUYERS.filter(function(b){return !CREDIT_CUSTOMERS.some(function(c){return c.buyer===b.key;});}).map(buyerName);}},
    {k:'band',label:'Credit Band',type:'select',req:true,opts:function(){return CREDIT_BANDS.map(function(b){return b.name;});}},
    {k:'status',label:'Status',type:'select',opts:['Active','Blocked'],def:'Active',req:true}],
  defaults:function(){return {used:0};},
  onSave:function(c){var b=BUYERS.filter(function(x){return buyerName(x)===c.buyerName;})[0];if(b){c.buyer=b.key;c.mobile=b.mobile;}},
  toggle:{k:'status',on:'Active',off:'Blocked',onLabel:'Unblock Credit',offLabel:'Block Credit',onDone:'credit unblocked',offDone:'credit blocked'}};
GL.creditbands={one:'credit band',noun:'credit bands',rows:CREDIT_BANDS,
  title:function(b){return b.name;},
  search:{placeholder:'Search band',fields:['name','key']},
  filters:[{k:'size',label:'Filter By',opts:['Up to ₹10,000','Above ₹10,000'],match:function(b,v){return v==='Up to ₹10,000'?b.limit<=10000:b.limit>10000;}}],
  stats:function(rows){return [['Bands',rows.length,'active'],['Customers',CREDIT_CUSTOMERS.length,'approved']];},
  cols:[{h:'Credit Band ID',cell:function(b){return plain(b.key);}},{h:'Credit Band Name',cell:function(b){return '<span class="sc-band sc-band-'+b.name.toLowerCase()+'">'+esc(b.name)+'</span>';}},
    {h:'Credit Limit',cell:function(b){return plain(inr(b.limit));}},{h:'Credit Period',cell:function(b){return plain(b.days+' days');}},
    {h:'Customers Assigned',cell:function(b){var n=CREDIT_CUSTOMERS.filter(function(c){return c.band===b.name;}).length;
      return n?'<button type="button" class="sc-link" onclick="glState(\'creditcustomers\').f={band:\''+esc(b.name)+'\'};scGo(\'creditcustomers\')">'+n+(n===1?' customer':' customers')+'</button>':'<span class="lp-dash">None</span>';}},
    {h:'Created Date',cell:function(b){return plain(b.created);}}],
  form:[{k:'name',label:'Credit Band Name',req:true},{k:'limit',label:'Credit Limit (₹)',type:'number',req:true},{k:'days',label:'Credit Period (days)',type:'number',req:true,def:'15'}],
  defaults:function(){return {created:stamp().date};},
  onSave:function(b){b.limit=+b.limit||0;b.days=+b.days||0;},
  del:true};
Object.assign(PAGE_ACTIONS,{creditcustomers:['Add Credit Customer',function(){scGlForm('creditcustomers');}],creditbands:['Create Credit Band',function(){scGlForm('creditbands');}]});

/* ══ CATEGORY ══════════════════════════════════════════════════════════════
   Three linked levels: Main → Sub → Grand Sub. A sub picks its main from
   the Main Category list, a grand sub picks both; clicking a main or sub on
   a lower level opens that level filtered to it. */
var STORE_CATS=['Grocery Retail','Grocery Wholesale','Health Services','Service','Amenities','Supplier','Internal','Tickets','Rooms'];
var MAIN_CATEGORIES=[[491,'Dairy & Bakery','Grocery Retail','Retailer'],[490,'Snacks & Packaged Foods','Grocery Retail','Retailer'],
  [489,'Staples & Grains','Grocery Retail','Retailer'],[488,'Rental','Service','Retailer'],[487,'Amenities','Amenities','Amenities'],
  [486,'Health Services','Health Services','Retailer'],[485,'Grocery','Grocery Wholesale','Retailer'],[484,'Beverages','Grocery Retail','Retailer'],
  [483,'Personal Care','Grocery Retail','Retailer'],[482,'Household Supplies','Grocery Retail','Retailer'],[481,'Home Services','Service','Retailer'],
  [480,'Event Tickets','Tickets','Amenities'],[479,'Stay','Rooms','Amenities'],[478,'Office Supplies','Supplier','Retailer']]
  .map(function(x){return {key:x[0],name:x[1],storeCat:x[2],type:x[3],status:'Active'};});
function mainNames(){return MAIN_CATEGORIES.map(function(m){return m.name;});}
var SUB_CATEGORIES=[[1500,'Dairy & Bakery','Curd & Yogurt',1146],[1499,'Dairy & Bakery','Milk',1145],[1498,'Snacks & Packaged Foods','Chips & Namkeen',1144],
  [1497,'Snacks & Packaged Foods','Biscuits & Cookies',1143],[1496,'Staples & Grains','Atta & Flour',1142],[1495,'Staples & Grains','Rice & Rice Products',1141],
  [1494,'Rental','Scooty',26],[1493,'Rental','Bikes',24],[1492,'Rental','Cars',23],[1491,'Amenities','Swimming Pool',3],[1490,'Health Services','Pharmacy',14],
  [1489,'Health Services','Inpatient Admission',681],[1488,'Health Services','Consultation',680],[1487,'Grocery','Organic Fruits',1],
  [1486,'Health Services','Alternative Medicine',678],[1485,'Beverages','Tea & Coffee',1140],[1484,'Personal Care','Hair Care',1139]]
  .map(function(x){var m=MAIN_CATEGORIES.filter(function(y){return y.name===x[1];})[0];
    return {key:x[0],main:x[1],name:x[2],seq:x[3],storeCat:m?m.storeCat:'',type:m?m.type:'Retailer',status:'Active'};});
function subNames(){return SUB_CATEGORIES.map(function(m){return m.name;});}
var GRAND_CATEGORIES=[[1574,'Pharmacy','Pharmacy',14,'Active'],[1573,'Inpatient Admission','Inpatient',681,'Active'],[1572,'Consultation','General Test',680,'Inactive'],
  [1571,'Organic Fruits','Mix Fruits',1,'Active'],[1570,'Consultation','Gynecology And Pediatric',677,'Active'],[1569,'Alternative Medicine','Homeopathy',678,'Inactive'],
  [1568,'Alternative Medicine','Ayurveda',676,'Active'],[1567,'Consultation','Psychology',675,'Active'],[1566,'Consultation','Dental',674,'Active'],
  [1565,'Milk','Toned Milk',1,'Active'],[1564,'Milk','Full Cream Milk',2,'Active'],[1563,'Chips & Namkeen','Potato Chips',1,'Active'],
  [1562,'Atta & Flour','Whole Wheat Atta',1,'Active'],[1561,'Tea & Coffee','Green Tea',3,'Active']]
  .map(function(x){var sc=SUB_CATEGORIES.filter(function(y){return y.name===x[1];})[0];
    return {key:x[0],sub:x[1],name:x[2],seq:x[3],status:x[4],main:sc?sc.main:'',storeCat:sc?sc.storeCat:'',type:sc?sc.type:'Retailer'};});
function catJump(page,k,v){
  return '<button type="button" class="sc-link" title="Open '+esc(v)+'" onclick="glState(\''+page+'\').f={'+k+':\''+esc(v).replace(/'/g,"\\'")+'\'};glState(\''+page+'\').page=1;scGo(\''+page+'\')">'+esc(v)+'</button>';
}
var catToggle={k:'status',on:'Active',off:'Inactive',onLabel:'Activate',offLabel:'Deactivate',onDone:'activated',offDone:'deactivated'};
var catStats=function(rows){return statusStats(rows,'status',[['Active','approved'],['Inactive','']]);};
GL.maincats={one:'main category',noun:'main categories',rows:MAIN_CATEGORIES,
  title:function(r){return r.name;},
  search:{placeholder:'Search category',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'type',label:'Select Type',opts:['Retailer','Amenities']},
    {k:'storeCat',label:'Select Store Category',opts:STORE_CATS}],
  stats:catStats,
  cols:[{h:'Key',cell:function(r){return plain(r.key);}},{h:'Main Category Name',cell:function(r){return mainTxt(r.name);}},
    {h:'Store Category',cell:function(r){return plain(r.storeCat);}},{h:'Type',cell:function(r){return plain(r.type);}},
    {h:'Sub Categories',cell:function(r){var n=SUB_CATEGORIES.filter(function(s){return s.main===r.name;}).length;
      return n?'<button type="button" class="sc-link" onclick="glState(\'subcats\').f={main:\''+esc(r.name).replace(/'/g,"\\'")+'\'};scGo(\'subcats\')">'+n+' sub</button>':'<span class="lp-dash">None</span>';}},
    {h:'Status',cell:function(r){return activeBadge(r.status);}}],
  form:[{k:'name',label:'Main Category Name',req:true,full:true},{k:'storeCat',label:'Store Category',type:'select',opts:STORE_CATS,req:true},
    {k:'type',label:'Type',type:'select',opts:['Retailer','Amenities'],req:true}],
  defaults:function(){return {status:'Active'};},toggle:catToggle};
GL.subcats={one:'sub category',noun:'sub categories',rows:SUB_CATEGORIES,
  title:function(r){return r.name;},
  search:{placeholder:'Search sub category',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'type',label:'Select Type',opts:['Retailer','Amenities']},
    {k:'storeCat',label:'Store Category',opts:STORE_CATS},{k:'main',label:'Main Category',opts:mainNames}],
  stats:catStats,
  cols:[{h:'Primary Key',cell:function(r){return plain(r.key);}},{h:'Store Category',cell:function(r){return plain(r.storeCat);}},
    {h:'Main Category',cell:function(r){return catJump('maincats','q',r.main);}},{h:'Sub Category Name',cell:function(r){return mainTxt(r.name);}},
    {h:'Sequence',cell:function(r){return plain(r.seq);}},{h:'Category Type',cell:function(r){return plain(r.type);}},
    {h:'Status',cell:function(r){return activeBadge(r.status);}}],
  form:[{k:'name',label:'Sub Category Name',req:true},{k:'main',label:'Main Category',type:'select',opts:mainNames,req:true},
    {k:'seq',label:'Sequence',type:'number',req:true,def:'1'}],
  defaults:function(){return {status:'Active'};},
  onSave:function(r){var m=MAIN_CATEGORIES.filter(function(y){return y.name===r.main;})[0];if(m){r.storeCat=m.storeCat;r.type=m.type;}},
  toggle:catToggle};
GL.grandcats={one:'grand sub category',noun:'grand sub categories',rows:GRAND_CATEGORIES,
  title:function(r){return r.name;},
  search:{placeholder:'Search grand sub category',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'type',label:'Select Type',opts:['Retailer','Amenities']},
    {k:'storeCat',label:'Store Category',opts:STORE_CATS},{k:'main',label:'Main Category',opts:mainNames},{k:'sub',label:'Sub Category',opts:subNames}],
  stats:catStats,
  cols:[{h:'Primary Key',cell:function(r){return plain(r.key);}},{h:'Store Category',cell:function(r){return plain(r.storeCat);}},
    {h:'Main Category',cell:function(r){return catJump('maincats','q',r.main);}},{h:'Sub Category',cell:function(r){return catJump('subcats','q',r.sub);}},
    {h:'Grand Sub Category',cell:function(r){return mainTxt(r.name);}},{h:'Sequence',cell:function(r){return plain(r.seq);}},
    {h:'Category Type',cell:function(r){return plain(r.type);}},{h:'Status',cell:function(r){return activeBadge(r.status);}}],
  form:[{k:'name',label:'Grand Sub Category Name',req:true,full:true},{k:'sub',label:'Sub Category',type:'select',opts:subNames,req:true},
    {k:'seq',label:'Sequence',type:'number',req:true,def:'1'}],
  defaults:function(){return {status:'Active'};},
  onSave:function(r){var sc=SUB_CATEGORIES.filter(function(y){return y.name===r.sub;})[0];if(sc){r.main=sc.main;r.storeCat=sc.storeCat;r.type=sc.type;}},
  toggle:catToggle,del:true};
Object.assign(PAGE_ACTIONS,{maincats:['Create Main Category',function(){scGlForm('maincats');}],subcats:['Create Sub Category',function(){scGlForm('subcats');}],
  grandcats:['Create Grand Sub Category',function(){scGlForm('grandcats');}]});

/* ══ COMMUNITY ═════════════════════════════════════════════════════════════
   Communities and everything that lives in one: platforms, amenities,
   members, residents, daily help, notices, blocks and flats, customer bands,
   e-wallets, partners, cafeterias and visitor logs. Every page that names a
   community picks it from the All Community list, and the name links back
   to it. Blocks own their flats: a block's Total Flats is counted from the
   flats, and creating a block adds its flats. */
var COMM_CATS=['Commercials','Residential','Referral Program','Accommodation','Gated Community'];
var COMM_REG=['Open','Approval Required','Invite Only'];
var COMMUNITIES=[[3133,'Oct Chennai Commercial','Commercials',2],[3132,'Chennai Commercial','Commercials',2],[3128,'Lara Locals','Commercials',5],
  [3127,'OpenDhi Connect And Earn','Referral Program',5],[3122,'IDFC First Bank','Commercials',7],[3117,'RBL Bank','Commercials',7],
  [3102,'bhai community','Residential',13],[3101,'tamil community','Accommodation',13],[3098,'Freedom Park','Gated Community',20],
  [3095,'My Home Bhooja','Gated Community',24],[3091,'Green Meadows','Residential',30],[3088,'Blue house community','Residential',35],
  [3084,'Chennai Community','Residential',41],[3079,'Antar chennai residential comm','Residential',47],[3075,'Galaxy Community','Gated Community',52],
  [3071,'test community qr code','Commercials',58],[3066,'Hyper community','Commercials',63],[3060,'The Skyview','Gated Community',70],
  [3054,'Booja Residency','Residential',78],[3049,'AAA Partner Hub','Referral Program',86],[3043,'Sunrise Towers','Gated Community',95],
  [3038,'Lakeview Stay','Accommodation',104]]
  .map(function(x,i){return {key:x[0],name:x[1],cat:x[2],reg:COMM_REG[i%3],created:fmtDate(addD(DASH_TODAY,-x[3])),status:i===15?'Inactive':'Active'};});
function commNames(){return COMMUNITIES.map(function(c){return c.name;});}
function commLink(name){return name?catJump('communities','q',name):'<span class="lp-dash">Not Assigned</span>';}
/* a person's picture: their initials on a tint picked from the name */
function ava(name){
  var s=String(name||'?'),h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%997;
  var ini=s.split(/\s+/).filter(Boolean).slice(0,2).map(function(w){return w[0];}).join('').toUpperCase();
  return '<span class="sc-ava sc-ava-'+(h%6)+'" aria-hidden="true">'+esc(ini||'?')+'</span>';
}
function personCell(name,email){return '<div class="sc-person"><div class="sc-person-txt"><div class="lp-c-main">'+esc(name)+'</div>'+(email?'<div class="lp-c-sub" title="'+esc(email)+'">'+esc(email)+'</div>':'')+'</div></div>';}
function mailCell(v){return v?'<div class="lp-c-plain sc-c-vendor" title="'+esc(v)+'">'+esc(v)+'</div>':'<span class="lp-dash">—</span>';}
var onOff={k:'status',on:'Active',off:'Inactive',onLabel:'Activate',offLabel:'Deactivate',onDone:'activated',offDone:'deactivated'};
var onOffStats=function(rows){return statusStats(rows,'status',[['Active','approved'],['Inactive','']]);};

/* ── ALL COMMUNITY ─────────────────────────────────────────────────────── */
GL.communities={one:'community',noun:'communities',rows:COMMUNITIES,
  title:function(c){return c.name;},
  search:{placeholder:'Search community',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'cat',label:'Community Category',opts:COMM_CATS},
    {k:'reg',label:'Customer Registration Type',opts:COMM_REG}],
  stats:onOffStats,
  cols:[{h:'Community Id',cell:function(c){return plain(c.key);}},{h:'Community Name',cell:function(c){return mainTxt(c.name);}},
    {h:'Category Name',cell:function(c){return plain(c.cat);}},{h:'Registration',cell:function(c){return plain(c.reg);}},
    {h:'Residents',cell:function(c){var n=RESIDENTS.filter(function(r){return r.comm===c.name;}).length;
      return n?catJump('residents','comm',c.name).replace('>'+esc(c.name)+'<','>'+n+(n===1?' resident':' residents')+'<'):'<span class="lp-dash">None</span>';}},
    {h:'Create Date',cell:function(c){return plain(c.created);}},{h:'Status',cell:function(c){return activeBadge(c.status);}}],
  rowTools:function(c){return '<button class="lp-action-btn" type="button" title="Download community details" aria-label="Download '+esc(c.name)+'" onclick="scCommDownload('+c.key+')">'+ICO_DOWNLOAD+'</button>';},
  form:[{k:'name',label:'Community Name',req:true,full:true},{k:'cat',label:'Community Category',type:'select',opts:COMM_CATS,req:true},
    {k:'reg',label:'Customer Registration Type',type:'select',opts:COMM_REG,req:true,def:'Open'}],
  defaults:function(){return {created:fmtDate(DASH_TODAY),status:'Active'};},
  toggle:onOff};
function scCommDownload(key){
  var c=glRow('communities',key);if(!c)return;
  var rows=[['Community Id',c.key],['Community Name',c.name],['Category',c.cat],['Registration',c.reg],['Created',c.created],['Status',c.status],
    ['Residents',RESIDENTS.filter(function(r){return r.comm===c.name;}).length],['Blocks',BLOCKS.filter(function(b){return b.comm===c.name;}).length]];
  var csv=rows.map(function(l){return l.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\r\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='community-'+c.key+'.csv';
  document.body.appendChild(a);a.click();a.remove();scToast(c.name+' downloaded','success');
}

/* ── ALL PLATFORM ──────────────────────────────────────────────────────── */
var PLATFORM_TYPES=['Partner Management','Community Management','Retail Network'];
var PLATFORM_LIST=[{key:3120,name:'Chennai Platform Test',type:'Partner Management',created:'07 Oct 2026',status:'Active'},
  {key:3104,name:'Hyderabad Residents Network',type:'Community Management',created:'21 Sep 2026',status:'Active'},
  {key:3093,name:'Bengaluru Retail Grid',type:'Retail Network',created:'02 Sep 2026',status:'Active'},
  {key:3081,name:'Pune Partner Pilot',type:'Partner Management',created:'14 Aug 2026',status:'Inactive'}];
GL.platforms={one:'platform',noun:'platforms',rows:PLATFORM_LIST,
  title:function(p){return p.name;},
  search:{placeholder:'Search platform',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'type',label:'Select Type',opts:PLATFORM_TYPES}],
  stats:onOffStats,
  cols:[{h:'Platform Id',cell:function(p){return plain(p.key);}},{h:'Platform Name',cell:function(p){return mainTxt(p.name);}},
    {h:'Platform Type',cell:function(p){return plain(p.type);}},{h:'Create Date',cell:function(p){return plain(p.created);}},
    {h:'Status',cell:function(p){return activeBadge(p.status);}}],
  form:[{k:'name',label:'Platform Name',req:true,full:true},{k:'type',label:'Platform Type',type:'select',opts:PLATFORM_TYPES,req:true}],
  defaults:function(){return {created:fmtDate(DASH_TODAY),status:'Active'};},
  toggle:onOff};

/* ── AMENITIES ─────────────────────────────────────────────────────────── */
var AMENITY_KINDS=['Spa','Gym','Pool','Clubhouse','Other'];
var AMENITIES=[[75181,'testdelete','Antar chennai residential comm',999,'Other'],[75028,'Annual Membership spa','My Home Bhooja',7000,'Spa'],
  [75027,'Quarterly Membership spa','My Home Bhooja',3500,'Spa'],[75026,'Monthly Membership spa','My Home Bhooja',1200,'Spa'],
  [75025,'Annual Membership','My Home Bhooja',6000,'Gym'],[75024,'Quarterly Membership','My Home Bhooja',3000,'Gym'],
  [75023,'Swimming Pool Pass','Freedom Park',0,'Pool'],[75022,'Clubhouse Booking','Green Meadows',1500,'Clubhouse']]
  .map(function(x){return {key:x[0],name:x[1],comm:x[2],fee:x[3],kind:x[4],status:'Active'};});
var AMENITY_ICO={Spa:ICO.sparkle,Gym:ICO.dumbbell,Pool:ICO.wave,Clubhouse:ICO.building,Other:ICO.store};
GL.amenities={one:'amenity',noun:'amenities',rows:AMENITIES,
  title:function(a){return a.name;},
  search:{placeholder:'Search amenity',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},
    {k:'paid',label:'Filter By',opts:['Paid','Free'],match:function(a,v){return v==='Paid'?a.fee>0:!a.fee;}},
    {k:'comm',label:'Select Community',opts:commNames}],
  stats:onOffStats,
  cols:[{h:'Service ID',cell:function(a){return plain(a.key);}},
    {h:'Image',cell:function(a){return '<span class="sc-thumb sc-thumb-'+a.kind.toLowerCase()+'" title="'+esc(a.kind)+'">'+(AMENITY_ICO[a.kind]||ICO.store)+'</span>';}},
    {h:'Amenities Name',cell:function(a){return mainTxt(a.name);}},{h:'Community',cell:function(a){return commLink(a.comm);}},
    {h:'Registration Fee',cell:function(a){return a.fee?plain('INR '+(+a.fee).toLocaleString('en-IN')):badge('approved','Free');}},
    {h:'Status',cell:function(a){return activeBadge(a.status);}}],
  form:[{k:'name',label:'Amenity Name',req:true,full:true},{k:'comm',label:'Community',type:'select',opts:commNames,req:true},
    {k:'kind',label:'Amenity Type',type:'select',opts:AMENITY_KINDS,req:true,def:'Other'},{k:'fee',label:'Registration Fee (INR)',type:'number',req:true,def:'0'}],
  defaults:function(){return {status:'Active'};},
  onSave:function(a){a.fee=+a.fee||0;},
  toggle:onOff};

/* ── ALL COMMUNITY MEMBERS ─────────────────────────────────────────────── */
var DESIGNATIONS=['Community Manager','Community Agent','Core Team L1','Core Team L2','Security Head'];
var CMEMBERS=(function(){
  var seed=[['Lara Locals','Lara Admin','9879879875@gmail.com','+919879879875',0],['OpenDhi Connect And Earn','Opendhi Agent','opendhiagentref@yopmail.com','919845102120',1],
    ['OpenDhi Connect And Earn','Opendhi Connect','opendhiconnect@yopmail.com','+917451202102',1],['IDFC First Bank','Idfc First Bank','idfcfirstbank12@gmail.com','+919554454151',0],
    ['RBL Bank','Ifc Bank','ifcbank@gmail.com','+918510254454',0],['Freedom Park','Meghana M','meghana@gmail.com','+919802347656',2],
    ['Green Meadows','Ravi Teja','raviteja@gmail.com','+919845612378',3],['My Home Bhooja','Sunil Srivastava','sunil.s@gmail.com','+919900112233',0],
    ['Blue house community','Pardeep Singh','pardeep@gmail.com','+919811002244',4],['Galaxy Community','Testing Dhi','testing@gmail.com','+918219174693',1],
    ['Chennai Community','Shrinivas Sadalawar','shrinivas@opendhi.com','+919766554433',2],['The Skyview','Shaun Jacob','shaun.jacob@gmail.com','+919822334455',3]];
  var keys=[3087,3086,3085,3081,3075,3061,3058,3052,3047,3050,3039,3031];
  return seed.map(function(x,i){return {key:keys[i],comm:x[0],name:x[1],email:x[2],mobile:x[3],desig:DESIGNATIONS[x[4]],kyc:i===5||i===7?'Yes':'No',status:i===9?'Inactive':'Active'};});
})();
GL.cmembers={one:'member',noun:'members',rows:CMEMBERS,
  title:function(m){return m.name;},
  search:{placeholder:'Search name, email or mobile',fields:['name','email','mobile','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'desig',label:'Select Designation',opts:DESIGNATIONS},
    {k:'kyc',label:'KYC Verified',opts:['Yes','No']}],
  stats:function(rows){return [['All',rows.length,'active'],['KYC Verified',rows.filter(function(m){return m.kyc==='Yes';}).length,'approved'],
    ['KYC Pending',rows.filter(function(m){return m.kyc!=='Yes';}).length,'pending']];},
  cols:[{h:'Member Id',cell:function(m){return plain(m.key);}},{h:'Community Name',cell:function(m){return commLink(m.comm);}},
    {h:'Member',cell:function(m){return personCell(m.name,m.email);}},{h:'Mobile Number',cell:function(m){return plain(m.mobile);}},
    {h:'Designation',cell:function(m){return plain(m.desig);}},
    {h:'KYC Verified',cell:function(m){return badge(m.kyc==='Yes'?'approved':'unapproved',m.kyc);}},
    {h:'Status',cell:function(m){return activeBadge(m.status);}}],
  form:[{k:'name',label:'Member Name',req:true},{k:'comm',label:'Community',type:'select',opts:commNames,req:true},
    {k:'email',label:'Member Email',type:'email',req:true},{k:'mobile',label:'Mobile Number',req:true},
    {k:'desig',label:'Designation',type:'select',opts:DESIGNATIONS,req:true}],
  defaults:function(){return {kyc:'No',status:'Active'};},
  toggle:onOff,
  menu:function(m){return [[m.kyc==='Yes'?'Mark KYC Pending':'Mark KYC Verified','scCloseRowMenu();scMemberKyc('+m.key+')']];}};
function scMemberKyc(key){
  var m=glRow('cmembers',key);if(!m)return;m.kyc=m.kyc==='Yes'?'No':'Yes';scRender();
  scToast(m.name+(m.kyc==='Yes'?' KYC verified':' KYC marked pending'),m.kyc==='Yes'?'success':'info');
}

/* ── ALL RESIDENTS ─────────────────────────────────────────────────────── */
var OCCUPANCY=['Moving In','Currently Residing','Moving Out','Moved Out'];
var RESIDENTS=(function(){
  var seed=[['MAVALYA','Freedom Park','mavalyau@gmail.com','60 B','+91 9807064533','Owner','Inactive',0],
    ['Manasa','Freedom Park','manasa@gmail.com','85 A','+91 9390576452','Tenant','Active',1],
    ['Samala chiranjeevi','bhai community','samalachiranjeevi0@gmail.com','2003 bhai','+91 7097664736','Owner','Active',1],
    ['Tenant Test Agreement','Antar chennai residential comm','','6 A','+91 5673510668','Owner','Active',1],
    ['vsfsbvsv','Antar chennai residential comm','dfbvrsgsrvs342@opendhi.com','7 A','+91 7688536867','Tenant','Pending',1],
    ['Priya Nair','Green Meadows','priya.nair@gmail.com','Meadows B-104','+91 9845011223','Owner','Active',1],
    ['Arjun Rao','Blue house community','arjunrao@yahoo.com','AA-12','+91 9900887766','Tenant','Active',2],
    ['Deepa Menon','My Home Bhooja','deepa.menon@gmail.com','Tower 2-808','+91 9123456780','Owner','Active',1],
    ['Karthik Reddy','Chennai Community','','A-15','+91 9988776655','Tenant','Active',0],
    ['Uppu Mavalya','Freedom Park','uppu.m@gmail.com','B-21','+91 9876501234','Owner','Active',1],
    ['Charitha Ramireddy','Freedom Park','charitha@gmail.com','A-44','+91 9012345678','Tenant','Active',3],
    ['Thulasi Annapureddy','My Home Bhooja','thulasi@gmail.com','Tower 1-302','+91 9345678901','Owner','Active',1]];
  var keys=[46343,46342,46311,46337,46336,46330,46327,46322,46318,46315,46310,46305];
  return seed.map(function(x,i){return {key:keys[i],name:x[0],comm:x[1],email:x[2],prop:x[3],mobile:x[4],pos:x[5],status:x[6],occ:OCCUPANCY[x[7]]};});
})();
GL.residents={one:'resident',noun:'residents',rows:RESIDENTS,
  title:function(r){return r.name;},
  search:{placeholder:'Search name, email or flat',fields:['name','email','prop','mobile','key']},
  filters:[{k:'pos',label:'Select Resident type',opts:['Owner','Tenant']},{k:'status',label:'Select Status',opts:['Active','Inactive','Pending']},
    {k:'comm',label:'Select Community',opts:commNames}],
  stats:function(rows){return [['All',rows.length,'active'],['Owners',rows.filter(function(r){return r.pos==='Owner';}).length,''],
    ['Tenants',rows.filter(function(r){return r.pos==='Tenant';}).length,''],['Pending',rows.filter(function(r){return r.status==='Pending';}).length,'pending']];},
  cols:[{h:'Key',cell:function(r){return plain(r.key);}},
    {h:'Resident',cell:function(r){return personCell(r.name,r.email);}},
    {h:'Community',cell:function(r){return commLink(r.comm);}},
    {h:'Property',cell:function(r){return '<div class="lp-c-plain">'+esc(r.prop)+'</div><div class="lp-c-sub">'+esc(r.pos)+'</div>';}},{h:'Mobile',cell:function(r){return plain(r.mobile);}},{h:'Status',cell:function(r){return activeBadge(r.status);}},
    {h:'Occupancy Status',cell:function(r){return '<span class="sc-occ sc-occ-'+r.occ.toLowerCase().replace(/\s+/g,'-')+'">'+esc(r.occ)+'</span>';}}],
  form:[{k:'name',label:'Full Name',req:true},{k:'comm',label:'Community',type:'select',opts:commNames,req:true},
    {k:'email',label:'Email Id',type:'email'},{k:'mobile',label:'Mobile',req:true,ph:'+91 '},
    {k:'prop',label:'Property',req:true,ph:'Flat or house number'},{k:'pos',label:'Position',type:'select',opts:['Owner','Tenant'],req:true},
    {k:'occ',label:'Occupancy Status',type:'select',opts:OCCUPANCY,req:true,def:'Moving In'}],
  defaults:function(){return {status:'Pending'};},
  menu:function(r){
    var out=[];
    if(r.status==='Pending')out.push(['Approve Resident','scCloseRowMenu();scResidentSet('+r.key+',\'status\',\'Active\')']);
    else out.push([r.status==='Active'?'Deactivate':'Activate','scCloseRowMenu();scResidentSet('+r.key+',\'status\',\''+(r.status==='Active'?'Inactive':'Active')+'\')']);
    var i=OCCUPANCY.indexOf(r.occ);
    if(i<OCCUPANCY.length-1)out.push(['Mark '+OCCUPANCY[i+1],'scCloseRowMenu();scResidentSet('+r.key+',\'occ\',\''+OCCUPANCY[i+1]+'\')']);
    return out;
  }};
function scResidentSet(key,k,v){
  var r=glRow('residents',key);if(!r)return;r[k]=v;scRender();
  scToast(r.name+(k==='occ'?' is now '+v.toLowerCase():v==='Active'?' activated':' deactivated'),v==='Inactive'||v==='Moved Out'?'info':'success');
}

/* ── DAILY HELP ────────────────────────────────────────────────────────── */
var HELP_ROLES=['Driver','Gardener','Cook','Maid','Security','Nanny'];
var DAILY_HELP=[[59,'Freedom Park','Akhil','akhil.7986054123@dailyhelp.local','+917986054123','Driver'],
  [58,'Freedom Park','Ramya','ramya.9807625431@dailyhelp.local','+919807625431','Gardener'],
  [57,'Freedom Park','Harshitha C','harshithachilukuri2103@gmail.com','+916301000702','Cook'],
  [56,'Freedom Park','Vishwa','','+919068547231','Gardener'],[55,'My Home Bhooja','Meghana K','meghana.9807654321@dailyhelp.local','+919807654321','Gardener'],
  [54,'Green Meadows','Ygi Test','','+913256668965','Driver'],[53,'Green Meadows','Lakshmi Devi','lakshmi.9845123456@dailyhelp.local','+919845123456','Maid'],
  [52,'Blue house community','Ramesh B','','+919900445566','Security'],[51,'My Home Bhooja','Sarita','sarita.9811223344@dailyhelp.local','+919811223344','Nanny'],
  [50,'Chennai Community','Murugan','','+919444556677','Driver'],[49,'Freedom Park','Kavitha','kavitha.9123498765@dailyhelp.local','+919123498765','Cook'],
  [48,'bhai community','Raju','','+919876012345','Gardener']]
  .map(function(x,i){return {key:x[0],comm:x[1],name:x[2],email:x[3],mobile:x[4],desig:x[5],status:i===7?'Inactive':'Active'};});
GL.dailyhelp={one:'daily help',noun:'daily help',rows:DAILY_HELP,
  title:function(m){return m.name;},
  search:{placeholder:'Search name or mobile',fields:['name','email','mobile','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'desig',label:'Select Designation',opts:HELP_ROLES},
    {k:'comm',label:'All Communities',opts:commNames}],
  stats:onOffStats,
  cols:[{h:'Member Id',cell:function(m){return plain(m.key);}},{h:'Community Name',cell:function(m){return commLink(m.comm);}},
    {h:'Member',cell:function(m){return personCell(m.name,m.email);}},{h:'Mobile Number',cell:function(m){return plain(m.mobile);}},
    {h:'Designation',cell:function(m){return plain(m.desig);}},{h:'Status',cell:function(m){return activeBadge(m.status);}}],
  form:[{k:'name',label:'Member Name',req:true},{k:'comm',label:'Community',type:'select',opts:commNames,req:true},
    {k:'mobile',label:'Mobile Number',req:true},{k:'desig',label:'Designation',type:'select',opts:HELP_ROLES,req:true},
    {k:'email',label:'Member Email',type:'email',full:true}],
  defaults:function(){return {status:'Active'};},
  toggle:onOff};

/* ── NOTICE BOARD ──────────────────────────────────────────────────────── */
var NOTICE_CATS=['Alert','Maintenance','Events','General'];
var NOTICE_GROUPS=['Community','Owners','Tenants'];
var NOTICES=[[8,'September 28, 2026','11:57 AM','Regarding to Maintaince','none','Community','Announcement','Maintenance',true,'Freedom Park'],
  [7,'September 28, 2026','11:52 AM','Dasara Events','none','Community','Announcement','Events',true,'Freedom Park'],
  [6,'September 9, 2026','1:28 PM','Maintenance Due - Flat: A-8','photo','Flat - 8','Notice','Maintenance',true,'Green Meadows'],
  [5,'September 7, 2026','11:14 AM','High Alert','photo','Community','Announcement','Alert',false,'My Home Bhooja'],
  [4,'September 7, 2026','10:47 AM','test','pdf','Community','Notice','General',false,'Green Meadows'],
  [3,'September 7, 2026','10:43 AM','meadows notice new','pdf','Community','Notice','Alert',false,'Green Meadows'],
  [2,'September 7, 2026','10:42 AM','meadows notice two','pdf','Flat - 20','Announcement','Events',false,'Green Meadows'],
  [1,'September 6, 2026','6:05 PM','Welcome to the community app','none','Community','Announcement','General',false,'Freedom Park']]
  .map(function(x){return {key:x[0],date:x[1],time:x[2],title:x[3],img:x[4],group:x[5],type:x[6],cat:x[7],edited:x[8],comm:x[9],status:'Active',
    desc:'Dear residents, please take note of this '+x[6].toLowerCase()+'.'};});
var NOTICE_IMG={none:ICO.noimg,photo:ICO.image,pdf:ICO.pdf};
GL.notices={one:'notice',noun:'notices',rows:NOTICES,
  title:function(n){return n.title;},
  search:{placeholder:'Search by title',fields:['title','key']},
  filters:[{k:'comm',label:'All Communities',opts:commNames},{k:'cat',label:'Category',opts:NOTICE_CATS},{k:'type',label:'Type',opts:['Announcement','Notice']}],
  stats:function(rows){return [['All',rows.length,'active'],['Alerts',rows.filter(function(n){return n.cat==='Alert';}).length,'unapproved'],['Edited',rows.filter(function(n){return n.edited;}).length,'']];},
  cols:[{h:'Created Time',cell:function(n){return '<div class="sc-when"><span>'+ICO.cal+esc(n.date)+'</span><span>'+ICO.clock+esc(n.time)+'</span></div>';}},
    {h:'Post ID',cell:function(n){return plain(n.key);}},
    {h:'Title',cell:function(n){return '<div class="lp-c-main">'+esc(n.title)+'</div>'+(n.edited?'<span class="sc-edited">Edited</span>':'');}},
    {h:'Image',cell:function(n){return '<span class="sc-thumb sc-thumb-'+n.img+'" title="'+(n.img==='none'?'No image':n.img==='pdf'?'PDF attached':'Image attached')+'">'+NOTICE_IMG[n.img]+'</span>';}},
    {h:'Target Group',cell:function(n){return '<div class="lp-c-plain">'+esc(n.group)+'</div><div class="lp-c-sub">'+esc(n.type)+'</div>';}},
    {h:'Category',cell:function(n){return '<span class="sc-ncat sc-ncat-'+n.cat.toLowerCase()+'">'+esc(n.cat==='Alert'?'Alerts':n.cat)+'</span>';}},
    {h:'Status',cell:function(n){return activeBadge(n.status);}}],
  form:[{k:'title',label:'Title',req:true,full:true},{k:'type',label:'Post Type',type:'select',opts:['Announcement','Notice'],req:true},
    {k:'group',label:'Target Group',type:'select',opts:NOTICE_GROUPS,req:true},{k:'cat',label:'Category',type:'select',opts:NOTICE_CATS,req:true},
    {k:'desc',label:'Description',type:'textarea',req:true,full:true}],
  onSave:function(n){n.edited=true;},
  toggle:onOff,del:true};
/* Add Notice is a page of its own, as in the system */
function addNoticeHTML(){
  return '<div class="listing-page"><div class="sc-bill-card sc-notice-card">'
    +secHead('Notice Details')
    +'<div class="policy-form-grid sc-notice-grid">'
      +field('Community',csField('nt-comm',commNames(),'','Select community'),true)
      +field('Post Type',csField('nt-type',['Announcement','Notice'],'','Select type'),true)
      +field('Target Group',csField('nt-group',NOTICE_GROUPS,'','Select group'),true)
      +field('Title','<input class="ep-form-input" id="nt-title" type="text" maxlength="80" placeholder="Enter title">',true)
      +field('Notice Image','<input class="ep-form-input sc-file-input" id="nt-img" type="file" accept="image/*,.pdf">')
      +field('Category',csField('nt-cat',NOTICE_CATS,'','Select category'),true)
      +field('Description','<textarea class="ep-form-input sc-notice-desc" id="nt-desc" rows="5" placeholder="Enter description"></textarea>',true,true)
    +'</div>'
    +'<div class="sc-bill-foot"><button class="btn-outline" type="button" onclick="scGo(\'notices\')">Cancel</button>'
      +'<button class="btn-primary" type="button" onclick="scSaveNotice()">Save</button></div>'
  +'</div></div>';
}
function scSaveNotice(){
  var v=function(id){return ((document.getElementById(id)||{}).value||'').trim();};
  var n={comm:csValue('nt-comm'),type:csValue('nt-type'),group:csValue('nt-group'),title:v('nt-title'),cat:csValue('nt-cat'),desc:v('nt-desc')};
  var need=[['comm','community'],['type','post type'],['group','target group'],['title','title'],['cat','category'],['desc','description']];
  for(var i=0;i<need.length;i++)if(!n[need[i][0]]){scToast('Enter the '+need[i][1],'error');return;}
  var file=(document.getElementById('nt-img')||{}).files,f=file&&file[0];
  var d=new Date(),M=['January','February','March','April','May','June','July','August','September','October','November','December'];
  n.key=NOTICES.reduce(function(m,x){return Math.max(m,x.key);},0)+1;
  n.date=M[DASH_TODAY.getMonth()]+' '+DASH_TODAY.getDate()+', '+DASH_TODAY.getFullYear();
  n.time=d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
  n.img=!f?'none':/pdf$/i.test(f.name)?'pdf':'photo';n.edited=false;n.status='Active';
  NOTICES.unshift(n);glState('notices').f={};glState('notices').page=1;
  scGo('notices');scToast('Notice posted','success',n.title+' · '+n.comm+'.');
}

/* ── PROPERTIES: BLOCKS & FLATS ────────────────────────────────────────── */
var BLOCKS=[[1951,'bhai community','bhai',20],[1930,'Chennai Community','A',20],[1894,'Blue house community','BB',35],[1843,'Blue house community','AA',50],
  [1667,'Freedom Park','B',75],[1666,'Freedom Park','A',100],[1365,'Green Meadows','Meadows Block B',100],[1364,'Green Meadows','Meadows Block A',200],
  [1290,'My Home Bhooja','Tower 1',120],[1289,'My Home Bhooja','Tower 2',120],[1201,'Antar chennai residential comm','A',40],[1180,'The Skyview','Sky A',60],
  [1102,'Galaxy Community','G1',45]]
  .map(function(x){return {key:x[0],comm:x[1],name:x[2],total:x[3],status:'Active'};});
var FLATS=[];
/* a block's flats, numbered 1…n - only the missing ones are added */
function fillFlats(b){
  var have=FLATS.filter(function(f){return f.block===b.key;}).length;
  var top=FLATS.reduce(function(m,f){return Math.max(m,f.key);},1000);
  for(var i=have+1;i<=b.total;i++)FLATS.unshift({key:++top,block:b.key,comm:b.comm,blockName:b.name,num:(b.name.length<=3?b.name+'-':'')+(100+i),blockKey:blockLabel(b),status:'Active'});
}
BLOCKS.slice().reverse().forEach(fillFlats);
function blockLabel(b){return b.comm+' · '+b.name;}
GL.blocks={one:'block',noun:'blocks',rows:BLOCKS,
  title:function(b){return b.name+' ('+b.comm+')';},
  search:{placeholder:'Search block or community',fields:['name','comm','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'comm',label:'Filter By',opts:commNames}],
  stats:function(rows){return [['Blocks',rows.length,'active'],['Flats',FLATS.length,'approved']];},
  cols:[{h:'Block Id',cell:function(b){return plain(b.key);}},{h:'Community Name',cell:function(b){return commLink(b.comm);}},
    {h:'Block / Tower Name',cell:function(b){return mainTxt(b.name);}},
    {h:'Total Flats',cell:function(b){var n=FLATS.filter(function(f){return f.block===b.key;}).length;
      return n?'<button type="button" class="sc-link" onclick="glState(\'flats\').f={block:\''+esc(blockLabel(b)).replace(/'/g,"\\'")+'\'};glState(\'flats\').page=1;scGo(\'flats\')">'+n+(n===1?' flat':' flats')+'</button>':'<span class="lp-dash">None</span>';}},
    {h:'Status',cell:function(b){return activeBadge(b.status);}}],
  form:[{k:'name',label:'Block / Tower Name',req:true},{k:'comm',label:'Community',type:'select',opts:commNames,req:true},
    {k:'total',label:'Total Flats',type:'number',req:true,def:'10'}],
  defaults:function(){return {status:'Active'};},
  onSave:function(b){b.total=Math.max(0,Math.min(500,+b.total||0));FLATS.forEach(function(f){if(f.block===b.key){f.comm=b.comm;f.blockName=b.name;f.blockKey=blockLabel(b);}});fillFlats(b);},
  toggle:onOff};
GL.flats={one:'flat',noun:'flats',rows:FLATS,
  title:function(f){return f.num+' · '+f.blockName;},
  search:{placeholder:'Search flat number',fields:['num','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'comm',label:'Filter By',opts:commNames},
    {k:'block',label:'Block',opts:function(){return BLOCKS.map(blockLabel);},match:function(f,v){return blockLabel({comm:f.comm,name:f.blockName})===v;}}],
  stats:onOffStats,
  cols:[{h:'Flat Id',cell:function(f){return plain(f.key);}},{h:'Community Name',cell:function(f){return commLink(f.comm);}},
    {h:'Block / Tower Name',cell:function(f){return catJump('blocks','q',f.blockName);}},{h:'Flat Number',cell:function(f){return mainTxt(f.num);}},
    {h:'Status',cell:function(f){return activeBadge(f.status);}}],
  form:[{k:'num',label:'Flat Number',req:true},{k:'blockKey',label:'Block',type:'select',opts:function(){return BLOCKS.map(blockLabel);},req:true}],
  defaults:function(){return {status:'Active'};},
  onSave:function(f){var b=BLOCKS.filter(function(x){return blockLabel(x)===f.blockKey;})[0];if(b){f.block=b.key;f.comm=b.comm;f.blockName=b.name;}},
  toggle:onOff};

/* ── CUSTOMER BANDS & E-WALLETS ────────────────────────────────────────── */
var CUSTOMER_BANDS=[[106,'OpenDhi Connect And Earn',1,'Opendhi Agent','2026-10-09'],[105,'Rbl bank visitors band',2,'System','2026-10-09'],
  [104,'Booja band',1,'Sunil Srivastava','2026-06-24'],[103,'THE Skyview Band',2,'Sunil Srivastava','2026-06-24'],
  [102,'Antarbandtestchennai',1,'Shrinivas Sadalawar','2026-06-03'],[101,'Chennai community test visitors band',4,'System','2026-06-03'],
  [100,'My Home Bhooja',1,'Pardeep Singh','2026-05-05'],[99,'Hyper community visitors band',4,'System','2026-05-04'],
  [98,'Silver Band',6,'Shaun Jacob','2026-04-18'],[97,'group community visitors band',3,'System','2026-04-02'],
  [96,'Hungry Panda 4K',2,'Shaun Jacob','2026-03-21'],[95,'Dhi 6',1,'Shrinivas Sadalawar','2026-03-02']]
  .map(function(x){return {key:x[0],name:x[1],assigned:x[2],by:x[3],created:x[4],status:'Active'};});
function custBandNames(){return CUSTOMER_BANDS.map(function(b){return b.name;});}
GL.custbands={one:'customer band',noun:'customer bands',rows:CUSTOMER_BANDS,
  title:function(b){return b.name;},
  search:{placeholder:'Search band',fields:['name','by','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},
    {k:'src',label:'Filter By',opts:['Created by System','Created by People'],match:function(b,v){return v==='Created by System'?b.by==='System':b.by!=='System';}}],
  stats:function(rows){return [['Bands',rows.length,'active'],['Customers',rows.reduce(function(t,b){return t+b.assigned;},0),'approved'],
    ['With E-Wallet',rows.filter(function(b){return EWALLETS.some(function(w){return w.band===b.name;});}).length,'']];},
  cols:[{h:'Key Id',cell:function(b){return plain(b.key);}},{h:'Band Name',cell:function(b){return mainTxt(b.name);}},
    {h:'Customers Assigned',cell:function(b){return plain(b.assigned);}},{h:'Created By',cell:function(b){return plain(b.by);}},
    {h:'Created On',cell:function(b){return plain(b.created);}},{h:'Status',cell:function(b){return activeBadge(b.status);}}],
  form:[{k:'name',label:'Band Name',req:true,full:true}],
  defaults:function(){var d=DASH_TODAY;return {assigned:0,by:state.role,created:d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2),status:'Active'};},
  toggle:onOff,del:true};
var EWALLETS=[[18,'Loyality Points',1,'ABC','Inactive'],[17,'Bhaiyaa Points',150,'group community visitors band','Active'],
  [16,'Unique ewallet',1000,'Booja band','Active'],[15,'Dhi P',180,'Dhi 6','Active'],[14,'Test Wallet',500,'Silver Band','Active'],
  [13,'Hungry Panda 4k',4000,'Hungry Panda 4K','Active'],[12,'Dhi 6',5000,'Dhi 6','Active'],[11,'Seerapu sriniva',200,'THE Skyview Band','Active'],
  [10,'Skyview Rewards',750,'THE Skyview Band','Active'],[9,'Meadows Points',300,'Chennai community test visitors band','Active']]
  .map(function(x){return {key:x[0],name:x[1],coins:x[2],band:x[3],status:x[4]};});
GL.ewallets={one:'e-wallet',noun:'e-wallets',rows:EWALLETS,
  title:function(w){return w.name;},
  search:{placeholder:'Search wallet',fields:['name','band','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'band',label:'Filter By',opts:custBandNames}],
  stats:function(rows){return [['All',rows.length,'active'],['Active',rows.filter(function(w){return w.status==='Active';}).length,'approved'],
    ['Total Coins',rows.reduce(function(t,w){return t+w.coins;},0).toLocaleString('en-IN'),'']];},
  cols:[{h:'Key Id',cell:function(w){return plain(w.key);}},{h:'Wallet Name',cell:function(w){return mainTxt(w.name);}},
    {h:'Total Coins',cell:function(w){return '<span class="sc-coin-amt">'+ICO.coins+(+w.coins).toLocaleString('en-IN')+'</span>';}},
    {h:'Customer Band',cell:function(w){return CUSTOMER_BANDS.some(function(b){return b.name===w.band;})?catJump('custbands','q',w.band):plain(w.band);}},
    {h:'Status',cell:function(w){return activeBadge(w.status);}}],
  form:[{k:'name',label:'Wallet Name',req:true,full:true},{k:'coins',label:'Total Coins',type:'number',req:true,def:'100'},
    {k:'band',label:'Customer Band',type:'select',opts:custBandNames,req:true}],
  defaults:function(){return {status:'Active'};},
  onSave:function(w){w.coins=Math.max(0,+w.coins||0);},
  toggle:onOff};

/* ── ALL PARTNERS ──────────────────────────────────────────────────────── */
var PARTNERS=[[3086,'31273086','OpenDhi Connect And Earn','Opendhi Agent','Opendhiagentref@yopmail.com','919845102120','Active'],
  [3085,'31273085','OpenDhi Connect And Earn','Opendhi Connect','Opendhiconnect@yopmail.com','+917451202102','Active'],
  [3052,'3052','','Agent Est','Neokredagent@yopmail.com','917656454534','Active'],[3050,'23973050','Galaxy Community','Testing Dhi','Testing@gmail.com','+918219174693','Active'],
  [2945,'2945','','Test Agent','Testagent@gmail.com','+919065872341','Pending'],[2842,'29412842','AAA Partner Hub','Sai Arjun','Aaa123@gmail.com','+919333975557','Active'],
  [2811,'28112811','Hyper community','Nikhil Varma','nikhil.v@gmail.com','+919701234567','Active'],[2790,'2790','','Swathi K','swathi.k@gmail.com','+919845098765','Pending'],
  [2764,'27642764','The Skyview','Rohit Jain','rohit.jain@gmail.com','+919811556677','Inactive'],[2731,'27312731','Lara Locals','Anil Kumar','anil.kumar@gmail.com','+919900776655','Active']]
  .map(function(x){return {key:x[0],ref:x[1],comm:x[2],name:x[3],email:x[4],mobile:x[5],desig:'Community Agent',status:x[6]};});
GL.partners={one:'partner',noun:'partners',rows:PARTNERS,
  title:function(p){return p.name;},
  search:{placeholder:'Search name, email or referral ID',fields:['name','email','ref','mobile','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Pending','Inactive']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Pending','pending']]);},
  cols:[{h:'Member Id',cell:function(p){return plain(p.key);}},{h:'Referral ID',cell:function(p){return '<span class="sc-mono">'+esc(p.ref)+'</span>';}},
    {h:'Community Name',cell:function(p){return commLink(p.comm);}},
    {h:'Member',cell:function(p){return personCell(p.name,p.email);}},{h:'Mobile Number',cell:function(p){return plain(p.mobile);}},
    {h:'Designation',cell:function(p){return plain(p.desig);}},{h:'Status',cell:function(p){return activeBadge(p.status);}}],
  menu:function(p){
    if(p.status==='Pending')return [['Approve Partner','scCloseRowMenu();scPartnerSet('+p.key+',\'Active\')'],['Reject Partner','scCloseRowMenu();scPartnerSet('+p.key+',\'Inactive\')']];
    return [[p.status==='Active'?'Deactivate':'Activate','scCloseRowMenu();scPartnerSet('+p.key+',\''+(p.status==='Active'?'Inactive':'Active')+'\')']];
  }};
function scPartnerSet(key,v){
  var p=glRow('partners',key);if(!p)return;var was=p.status;p.status=v;scRender();
  scToast(p.name+(was==='Pending'?(v==='Active'?' approved':' rejected'):v==='Active'?' activated':' deactivated'),v==='Active'?'success':'info');
}

/* ── CAFETERIA ─────────────────────────────────────────────────────────── */
var CAFETERIAS=[[29,'test prod','Shrinivas Sadalawar','2025-09-08 02:09:12'],[28,'Sarath maal','Shaun Jacob','2025-06-26 04:11:19'],
  [27,'Kamineni','Shrinivas Sadalawar','2025-06-12 07:23:33'],[26,'MART','Shaun Jacob','2025-03-07 12:57:44'],[25,'Cafe','Shrinivas Sadalawar','2025-02-20 05:22:22'],
  [24,'Food court','Shrinivas Sadalawar','2024-11-08 06:29:14'],[23,'Services','Shaun Jacob','2024-08-23 11:25:34'],[22,'Beauty and wellness','Shaun Jacob','2024-07-24 05:48:27'],
  [21,'Juice Corner','Shaun Jacob','2024-06-11 09:14:02'],[20,'Bakery','Shrinivas Sadalawar','2024-05-02 08:40:51'],[19,'Snack Bar','Shaun Jacob','2024-03-19 03:12:45']]
  .map(function(x){return {key:x[0],name:x[1],by:x[2],created:x[3],status:'Active'};});
GL.cafeteria={one:'cafeteria',noun:'cafeterias',rows:CAFETERIAS,
  title:function(c){return c.name;},
  search:{placeholder:'Search cafeteria',fields:['name','by','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']}],
  stats:onOffStats,
  cols:[{h:'Key Id',cell:function(c){return plain(c.key);}},{h:'Name',cell:function(c){return mainTxt(c.name);}},
    {h:'Created By',cell:function(c){return plain(c.by);}},{h:'Created On',cell:function(c){return plain(c.created);}},
    {h:'Status',cell:function(c){return activeBadge(c.status);}}],
  form:[{k:'name',label:'Cafeteria Name',req:true,full:true}],
  defaults:function(){var d=new Date(),p=function(n){return ('0'+n).slice(-2);};
    return {by:state.role,created:DASH_TODAY.getFullYear()+'-'+p(DASH_TODAY.getMonth()+1)+'-'+p(DASH_TODAY.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes())+':'+p(d.getSeconds()),status:'Active'};},
  toggle:onOff,del:true};

/* ── VISITOR LOGS ──────────────────────────────────────────────────────── */
var VISITOR_LOGS=(function(){
  var seed=[[46319,'Mohan Kumar','test community qr code','13 Oct 2026, 01:15 PM',''],[43885,'Uppu Mavalya','IDFC First Bank','12 Oct 2026, 01:53 PM',''],
    [42324,'Gopal Dev-testing','IDFC First Bank','09 Oct 2026, 11:50 AM',''],[45774,'Thulasi Annapureddy','My Home Bhooja','09 Oct 2026, 10:57 AM',''],
    [45774,'Thulasi Annapureddy','IDFC First Bank','09 Oct 2026, 10:54 AM','09 Oct 2026, 10:57 AM'],[41421,'Charitha Ramireddy','My Home Bhooja','05 Oct 2026, 12:10 PM',''],
    [41421,'Charitha Ramireddy','Freedom Park','05 Oct 2026, 12:09 PM','05 Oct 2026, 12:10 PM'],[44234,'Praveen Sai Velagapudi','Blue house community','05 Oct 2026, 12:02 PM',''],
    [44102,'Sneha Reddy','Green Meadows','04 Oct 2026, 06:40 PM','04 Oct 2026, 07:25 PM'],[43990,'Vikram Singh','Freedom Park','04 Oct 2026, 04:18 PM','04 Oct 2026, 05:02 PM'],
    [43871,'Anusha P','My Home Bhooja','03 Oct 2026, 11:05 AM','03 Oct 2026, 12:30 PM'],[43760,'Rahul Mehta','Chennai Community','02 Oct 2026, 09:45 AM','']];
  return seed.map(function(x,i){return {key:i+1,user:x[0],name:x[1],comm:x[2],inAt:x[3],outAt:x[4]};});
})();
GL.visitorlogs={one:'visit',noun:'visits',rows:VISITOR_LOGS,
  title:function(v){return v.name+' · '+v.comm;},
  search:{placeholder:'Search visitor or user ID',fields:['name','user']},
  filters:[{k:'state',label:'Select Status',opts:['In Progress','Completed'],match:function(v,s){return s==='Completed'?!!v.outAt:!v.outAt;}},
    {k:'comm',label:'Search By Community',opts:commNames}],
  stats:function(rows){return [['All',rows.length,'active'],['In Progress',rows.filter(function(v){return !v.outAt;}).length,'pending'],
    ['Completed',rows.filter(function(v){return v.outAt;}).length,'approved']];},
  cols:[{h:'User Id',cell:function(v){return plain(v.user);}},{h:'User',cell:function(v){return mainTxt(v.name);}},
    {h:'Community Name',cell:function(v){return commLink(v.comm);}},{h:'Check In Time',cell:function(v){return plain(v.inAt);}},
    {h:'Check Out Time',cell:function(v){return v.outAt?plain(v.outAt):'<span class="lp-dash">--</span>';}},
    {h:'Status',cell:function(v){return v.outAt?badge('approved','Completed'):badge('pending','In Progress');}}],
  menu:function(v){
    var out=v.outAt?[]:[['Check Out Now','scCloseRowMenu();scVisitOut('+v.key+')']];
    out.push(['All Visits by '+v.name.split(' ')[0],'scCloseRowMenu();glState(\'visitorlogs\').f={q:\''+v.user+'\'};glState(\'visitorlogs\').page=1;scRender()']);
    return out;
  }};
function scVisitOut(key){
  var v=glRow('visitorlogs',key);if(!v)return;
  var d=new Date();v.outAt=fmtDate(DASH_TODAY)+', '+d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});scRender();
  scToast(v.name+' checked out','success',v.comm+'.');
}

Object.assign(PAGE_ACTIONS,{
  communities:['Create Community',function(){scGlForm('communities');}],platforms:['Create Platform',function(){scGlForm('platforms');}],
  amenities:['Create Amenity',function(){scGlForm('amenities');}],cmembers:['Add Member',function(){scGlForm('cmembers');}],
  residents:['Add Resident',function(){scGlForm('residents');}],dailyhelp:['Add Daily Help',function(){scGlForm('dailyhelp');}],
  notices:['Add Notice',function(){scGo('addnotice');}],addnotice:['All Notices',function(){scGo('notices');},ICO.list],
  blocks:['Create Block',function(){scGlForm('blocks');}],flats:['Create Flat',function(){scGlForm('flats');}],
  custbands:['Create Band',function(){scGlForm('custbands');}],ewallets:['Create E-Wallet',function(){scGlForm('ewallets');}],
  cafeteria:['Create Cafeteria',function(){scGlForm('cafeteria');}]});

/* ══ STAFF, PRICING & REPORTS ══════════════════════════════════════════════
   Manage Staff and Roles; Pricing & Discounts (discounts, the scans that
   redeemed them, notification rules); Reports & Analytics, read from the
   same orders and products the other pages show. Every report exports the
   rows it is showing. */
/* a listing's visible rows as a CSV - the columns as shown, without markup */
function scExportGL(id,file){
  var g=GL[id],rows=glRows(id);if(!rows.length){scToast('Nothing to export','info');return;}
  var tmp=document.createElement('div'),txt=function(h){tmp.innerHTML=h;return tmp.textContent.replace(/\s+/g,' ').trim();};
  var csv=[g.cols.map(function(c){return c.h;})].concat(rows.map(function(r){return g.cols.map(function(c){return txt(c.cell(r));});}))
    .map(function(l){return l.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\r\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=file+'.csv';
  document.body.appendChild(a);a.click();a.remove();scToast('Report exported','success',rows.length+(rows.length===1?' row':' rows')+' in the file.');
}
function exportTool(id,file){return function(){return '<button class="btn-outline btn-sm sc-gl-tool" type="button" onclick="scExportGL(\''+id+'\',\''+file+'\')">'+ICO_DOWNLOAD+' Export</button>';};}
function isoDay(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);}
function isoToDate(s){var p=String(s||'').split('-');return p.length===3?new Date(+p[0],+p[1]-1,+p[2]):null;}

/* ── MANAGE STAFF AND ROLES ────────────────────────────────────────────── */
var STAFF_ROLES=['Store Manager','Cashier','Inventory Manager','Delivery Executive','Accountant'];
var STAFF=[[2214,'Ramesh Gowda','ramesh.gowda@mukeshpharmacy.in','+919845123001','Store Manager'],
  [2213,'Anita Shetty','anita.shetty@mukeshpharmacy.in','+919845123002','Cashier'],[2211,'Vinay Kumar','vinay.k@mukeshpharmacy.in','+919845123003','Inventory Manager'],
  [2209,'Suresh B','suresh.b@mukeshpharmacy.in','+919845123004','Delivery Executive'],[2206,'Kavya Rao','kavya.rao@mukeshpharmacy.in','+919845123005','Accountant'],
  [2204,'Mohammed Irfan','irfan@mukeshpharmacy.in','+919845123006','Delivery Executive'],[2201,'Lakshmi N','lakshmi.n@mukeshpharmacy.in','+919845123007','Cashier']]
  .map(function(x,i){return {key:x[0],name:x[1],email:x[2],mobile:x[3],desig:x[4],status:i===6?'Inactive':'Active'};});
GL.staff={one:'staff member',noun:'staff members',rows:STAFF,
  title:function(m){return m.name;},
  search:{placeholder:'Search member',fields:['name','email','mobile','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'desig',label:'Select Designation',opts:STAFF_ROLES}],
  stats:onOffStats,
  cols:[{h:'Member Id',cell:function(m){return plain(m.key);}},{h:'Member',cell:function(m){return personCell(m.name,m.email);}},
    {h:'Mobile Number',cell:function(m){return plain(m.mobile);}},{h:'Designation',cell:function(m){return plain(m.desig);}},
    {h:'Status',cell:function(m){return activeBadge(m.status);}}],
  form:[{k:'name',label:'Member Name',req:true},{k:'desig',label:'Designation',type:'select',opts:STAFF_ROLES,req:true},
    {k:'email',label:'Member Email',type:'email',req:true},{k:'mobile',label:'Mobile Number',req:true,ph:'+91'}],
  defaults:function(){return {status:'Active'};},
  toggle:onOff};

/* ── DISCOUNTS ─────────────────────────────────────────────────────────── */
var DISCOUNTS=[[512,'Diwali Dhamaka','Percentage',15,'2026-11-05','Grocery Retail'],[511,'Health Week','Flat',100,'2026-10-20','Health Services'],
  [509,'First Order','Flat',50,'2026-12-31','Grocery Retail'],[507,'Weekend Saver','Percentage',10,'2026-10-19','Grocery Wholesale'],
  [504,'Monsoon Care','Percentage',20,'2026-09-30','Health Services'],[502,'Service Starter','Flat',200,'2026-11-30','Service'],
  [498,'Pool Pass Offer','Percentage',25,'2026-08-31','Amenities']]
  .map(function(x,i){return {key:x[0],name:x[1],kind:x[2],amount:x[3],valid:x[4],segment:x[5],status:i===3?'Inactive':'Active'};});
function discExpired(d){var v=isoToDate(d.valid);return v&&v<DASH_TODAY;}
function discState(d){return discExpired(d)?'Expired':d.status;}
function discAmt(d){return d.kind==='Percentage'?d.amount+'% off':inr(d.amount)+' off';}
GL.discounts={one:'discount',noun:'discounts',rows:DISCOUNTS,
  title:function(d){return d.name;},
  search:{placeholder:'Enter discount name',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive','Expired'],match:function(d,v){return discState(d)===v;}},
    {k:'segment',label:'Select Segment',opts:STORE_CATS}],
  stats:function(rows){return [['All',rows.length,'active'],['Live',rows.filter(function(d){return discState(d)==='Active';}).length,'approved'],
    ['Expired',rows.filter(discExpired).length,'unapproved']];},
  cols:[{h:'Discount ID',cell:function(d){return plain(d.key);}},{h:'Discount Name',cell:function(d){return mainTxt(d.name);}},
    {h:'Discount Amount',cell:function(d){return '<span class="sc-disc">'+esc(discAmt(d))+'</span>';}},
    {h:'Valid Till',cell:function(d){var v=isoToDate(d.valid);return plain(v?fmtDate(v):'—');}},
    {h:'Store Segment',cell:function(d){return plain(d.segment);}},
    {h:'Redeemed',cell:function(d){var n=DISC_TXNS.filter(function(t){return t.disc===d.key;}).length;
      return n?'<button type="button" class="sc-link" onclick="glState(\'discounttxns\').f={q:\''+d.key+'\'};glState(\'discounttxns\').page=1;scGo(\'discounttxns\')">'+n+(n===1?' scan':' scans')+'</button>':'<span class="lp-dash">None</span>';}},
    {h:'Status',cell:function(d){var s=discState(d);return s==='Expired'?badge('closed','Expired'):activeBadge(s);}}],
  form:[{k:'name',label:'Discount Name',req:true,full:true},{k:'kind',label:'Discount Type',type:'select',opts:['Flat','Percentage'],req:true,def:'Flat'},
    {k:'amount',label:'Discount Amount',type:'number',req:true,ph:'₹ or %'},{k:'valid',label:'Valid Till',type:'date',req:true},
    {k:'segment',label:'Store Segment',type:'select',opts:STORE_CATS,req:true}],
  defaults:function(){return {status:'Active'};},
  onSave:function(d){d.amount=Math.max(0,+d.amount||0);if(d.kind==='Percentage')d.amount=Math.min(100,d.amount);},
  toggle:onOff};

/* ── DISCOUNT TRANSACTIONS ─────────────────────────────────────────────── */
var DISC_TXNS=[['Rambabu Musunuru','Zing Grocery',512,'13 Oct 2026, 06:12 PM','Redeemed'],['Priya Nair','Mukesh Pharmacy',511,'13 Oct 2026, 11:40 AM','Redeemed'],
  ['Arjun Rao','C Mart',509,'12 Oct 2026, 07:55 PM','Redeemed'],['Baiju Balakrishnan','Mukesh Pharmacy',511,'12 Oct 2026, 10:05 AM','Reversed'],
  ['Utkarsh Shukla','Zing Grocery',512,'11 Oct 2026, 05:31 PM','Redeemed'],['Jai Bhagchandani','Fresh Basket',509,'10 Oct 2026, 01:18 PM','Redeemed'],
  ['Mukesh Kum','Care Pharmacy',511,'09 Oct 2026, 09:47 AM','Pending'],['Deepa Menon','DHI Hyperlocal Pvt Ltd',502,'08 Oct 2026, 04:22 PM','Redeemed'],
  ['Karthik Reddy','C Mart',507,'05 Oct 2026, 12:09 PM','Redeemed']]
  .map(function(x,i){return {key:i+1,user:x[0],store:x[1],disc:x[2],scanned:x[3],status:x[4]};});
GL.discounttxns={one:'transaction',noun:'transactions',rows:DISC_TXNS,
  title:function(t){return t.user+' · '+t.store;},
  search:{placeholder:'Search user, store or discount ID',fields:['user','store','disc']},
  filters:[{k:'status',label:'Select Status',opts:['Redeemed','Pending','Reversed']}],
  stats:function(rows){return statusStats(rows,'status',[['Redeemed','approved'],['Pending','pending']]);},
  cols:[{h:'User',cell:function(t){return mainTxt(t.user);}},{h:'Store Name',cell:function(t){return plain(t.store);}},
    {h:'Discount ID',cell:function(t){var d=DISCOUNTS.filter(function(x){return x.key===t.disc;})[0];
      return '<div class="lp-c-plain">'+t.disc+'</div>'+(d?'<div class="lp-c-sub">'+esc(d.name)+' · '+esc(discAmt(d))+'</div>':'');}},
    {h:'Scan Date',cell:function(t){return plain(t.scanned);}},
    {h:'Status',cell:function(t){return badge(t.status==='Redeemed'?'approved':t.status==='Pending'?'pending':'unapproved',t.status);}}],
  menu:function(t){
    if(t.status==='Pending')return [['Confirm Redemption','scCloseRowMenu();scTxnSet('+t.key+',\'Redeemed\')'],['Reverse','scCloseRowMenu();scTxnSet('+t.key+',\'Reversed\')']];
    if(t.status==='Redeemed')return [['Reverse','scCloseRowMenu();scTxnSet('+t.key+',\'Reversed\')']];
    return [['Open Discount','scCloseRowMenu();glState(\'discounts\').f={q:\''+t.disc+'\'};scGo(\'discounts\')']];
  }};
function scTxnSet(key,v){
  var t=glRow('discounttxns',key);if(!t)return;t.status=v;scRender();
  scToast('Discount '+(v==='Redeemed'?'redemption confirmed':'reversed')+' for '+t.user,v==='Redeemed'?'success':'info');
}

/* ── NOTIFICATION EVENTS ───────────────────────────────────────────────── */
var NOTIF_EVENTS=['test email','Order Placed','Order Delivered','Payment Failed','Low Stock','Welcome Signup','Discount Expiring'];
var NOTIF_SCHED=['one time','daily','weekly','monthly'];
var NOTIF_RULES=[[6,'testemail_1755093468','test email','one time',2,'2025-08-13 19:27:49','Active'],
  [5,'order_placed_sms','Order Placed','one time',1240,'2026-09-02 10:14:05','Active'],[4,'low_stock_alert','Low Stock','daily',6,'2026-08-21 08:00:00','Active'],
  [3,'weekly_offers_push','Discount Expiring','weekly',860,'2026-07-30 18:45:12','Inactive'],[2,'payment_failed_retry','Payment Failed','one time',37,'2026-06-11 12:02:44','Active']]
  .map(function(x){return {key:x[0],rule:x[1],event:x[2],sched:x[3],target:x[4],created:x[5],status:x[6]};});
GL.notifevents={one:'notification rule',noun:'notification rules',rows:NOTIF_RULES,
  title:function(n){return n.rule;},
  search:{placeholder:'Search rule or event',fields:['rule','event']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'sched',label:'Schedule Type',opts:NOTIF_SCHED}],
  stats:onOffStats,
  cols:[{h:'Rule Name',cell:function(n){return '<span class="sc-mono">'+esc(n.rule)+'</span>';}},{h:'Event Name',cell:function(n){return mainTxt(n.event);}},
    {h:'Schedule Type',cell:function(n){return plain(n.sched);}},{h:'Target Count',cell:function(n){return plain((+n.target).toLocaleString('en-IN'));}},
    {h:'Created At',cell:function(n){return plain(n.created);}},{h:'Status',cell:function(n){return glSwitch('notifevents',n);}}],
  form:[{k:'event',label:'Event Name',type:'select',opts:NOTIF_EVENTS,req:true},{k:'sched',label:'Schedule Type',type:'select',opts:NOTIF_SCHED,req:true,def:'one time'},
    {k:'target',label:'Target Count',type:'number',req:true,def:'1'}],
  defaults:function(){var d=new Date(),p=function(n){return ('0'+n).slice(-2);};
    return {created:isoDay(DASH_TODAY)+' '+p(d.getHours())+':'+p(d.getMinutes())+':'+p(d.getSeconds()),status:'Active'};},
  onSave:function(n){n.target=Math.max(0,+n.target||0);if(!n.rule)n.rule=n.event.toLowerCase().replace(/[^a-z0-9]+/g,'_')+'_'+Math.floor(Date.now()/1000);},
  toggle:onOff,del:true};

/* ── REPORTS: SETTLEMENT ───────────────────────────────────────────────── */
var SETTLE_PERIODS=['01 – 07 Oct 2026','24 – 30 Sep 2026','17 – 23 Sep 2026'];
var SETTLE_REPORT=(function(){
  var stores=['Mukesh Pharmacy','Zing Grocery','C Mart','DHI Hyperlocal Pvt Ltd','Slot Booking Test Store'],rows=[],k=8840;
  SETTLE_PERIODS.forEach(function(per,pi){stores.forEach(function(st,si){
    var orders=6+((si*7+pi*5)%19),gross=orders*(180+((si*131+pi*53)%420));
    rows.push({key:k--,store:st,period:per,orders:orders,gross:gross,comm:Math.round(gross*.05),net:gross-Math.round(gross*.05),
      settled:pi===0&&si%2===0?'':fmtDate(addD(DASH_TODAY,-(pi*7+3))),status:pi===0&&si%2===0?'Pending':'Settled'});
  });});
  return rows;
})();
GL.settlement={one:'settlement',noun:'settlements',rows:SETTLE_REPORT,
  title:function(s){return s.store+' · '+s.period;},
  search:{placeholder:'Search store or settlement ID',fields:['store','key']},
  filters:[{k:'period',label:'Select Period',opts:SETTLE_PERIODS},{k:'status',label:'Select Status',opts:['Settled','Pending']}],
  stats:function(rows){var sum=function(l,k){return l.reduce(function(t,r){return t+r[k];},0);},pend=rows.filter(function(s){return s.status==='Pending';});
    return [['Net Payable',inr(sum(rows,'net')),'active'],['Pending',inr(sum(pend,'net')),'pending'],['Commission',inr(sum(rows,'comm')),'']];},
  cols:[{h:'Settlement ID',cell:function(s){return plain(s.key);}},{h:'Store',cell:function(s){return mainTxt(s.store);}},
    {h:'Period',cell:function(s){return plain(s.period);}},{h:'Orders',cell:function(s){return plain(s.orders);}},
    {h:'Gross Sales',cell:function(s){return '<div class="lp-c-plain">'+inr(s.gross)+'</div><div class="lp-c-sub">'+inr(s.comm)+' commission</div>';}},
    {h:'Net Payable',cell:function(s){return '<div class="lp-c-main">'+inr(s.net)+'</div>';}},
    {h:'Settled On',cell:function(s){return s.settled?plain(s.settled):'<span class="lp-dash">—</span>';}},
    {h:'Status',cell:function(s){return badge(s.status==='Settled'?'approved':'pending',s.status);}}],
  tool:exportTool('settlement','settlement-report'),
  menu:function(s){return s.status==='Pending'?[['Mark as Settled','scCloseRowMenu();scSettle('+s.key+')']]:[['Show This Store','scCloseRowMenu();glState(\'settlement\').f={q:\''+esc(s.store).replace(/'/g,"\\'")+'\'};scRender()']];}};
function scSettle(key){
  var s=glRow('settlement',key);if(!s)return;s.status='Settled';s.settled=fmtDate(DASH_TODAY);scRender();
  scToast(s.store+' settled','success',inr(s.net)+' for '+s.period+'.');
}

/* ── REPORTS: SALES BY PRODUCTS ────────────────────────────────────────── */
var SALES_BY_PRODUCT=PRODUCTS.slice(0,14).map(function(p,i){
  var price=[25,32,45,180,1499,285,28,265,175,799,349,299,99,1299][i],units=p.itemType==='Service'?4+i%5:18+((i*37)%140);
  return {key:p.key,name:p.name,itemType:p.itemType,main:p.main,store:p.store,units:units,price:price,gross:units*price,orders:Math.max(1,Math.round(units*.6))};
});
GL.salesproducts={one:'product',noun:'products',rows:SALES_BY_PRODUCT,
  title:function(r){return r.name;},
  search:{placeholder:'Search product',fields:['name','key']},
  filters:[{k:'store',label:'Select Store',opts:function(){return SALES_BY_PRODUCT.map(function(r){return r.store;}).filter(function(v,i,a){return a.indexOf(v)===i;});}},
    {k:'main',label:'Select Category',opts:MAIN_CATS},{k:'itemType',label:'Item Type',opts:['Product','Service']}],
  stats:function(rows){return [['Units Sold',rows.reduce(function(t,r){return t+r.units;},0).toLocaleString('en-IN'),'active'],
    ['Gross Sales',inr(rows.reduce(function(t,r){return t+r.gross;},0)),'approved']];},
  cols:[{h:'Product ID',cell:function(r){return plain(r.key);}},{h:'Product / Service',cell:function(r){return '<div class="lp-c-main">'+esc(r.name)+'</div><div class="lp-c-sub">'+esc(r.itemType)+'</div>';}},
    {h:'Category',cell:function(r){return plain(r.main);}},{h:'Store',cell:function(r){return plain(r.store);}},
    {h:'Units Sold',cell:function(r){return '<div class="lp-c-plain">'+r.units+'</div><div class="lp-c-sub">'+r.orders+' orders</div>';}},{h:'Unit Price',cell:function(r){return plain(inr(r.price));}},
    {h:'Gross Sales',cell:function(r){var top=Math.max.apply(null,SALES_BY_PRODUCT.map(function(x){return x.gross;}));
      return '<div class="sc-salebar"><b>'+inr(r.gross)+'</b><span class="sc-credit-track"><span class="sc-credit-fill" style="width:'+(r.gross/top*100).toFixed(1)+'%"></span></span></div>';}}],
  tool:exportTool('salesproducts','sales-by-products'),
  menu:function(r){return [['Open Product','scCloseRowMenu();glState(\'allproducts\').f={q:\''+r.key+'\'};glState(\'allproducts\').page=1;scGo(\'allproducts\')']];}};

/* ── REPORTS: SALES ORDERS (the same orders All Orders shows) ──────────── */
GL.salesorders={one:'order',noun:'orders',rows:ORDERS,
  title:function(o){return 'Order #'+o.key;},
  search:{placeholder:'Search order ID or buyer',fields:['key','user','store']},
  filters:[{k:'status',label:'Select Status',opts:['Pending','In Progress','Completed','Cancelled','Refund']},
    {k:'store',label:'Select Store',opts:function(){return ORDERS.map(function(o){return o.store;}).filter(function(v,i,a){return a.indexOf(v)===i;});}},
    {k:'type',label:'Order Type',opts:ORDER_TYPES}],
  stats:function(rows){var done=rows.filter(function(o){return o.status==='Completed';});
    return [['Orders',rows.length,'active'],['Completed Sales',inr(done.reduce(function(t,o){return t+o.amount;},0)),'approved'],
      ['Refunded',rows.filter(function(o){return o.status==='Refund';}).length,'unapproved']];},
  cols:[{h:'Order ID',cell:function(o){return plain(o.key);}},{h:'Date',cell:function(o){return plain(fmtDT(o.created));}},
    {h:'Buyer',cell:function(o){return '<div class="lp-c-main">'+esc(o.user)+'</div><div class="lp-c-sub">'+esc(o.phone)+'</div>';}},
    {h:'Store',cell:function(o){return '<div class="lp-c-plain">'+esc(o.store)+'</div><div class="lp-c-sub">'+esc(o.type)+'</div>';}},
    {h:'Platform',cell:function(o){return platformChip(o.platform);}},{h:'Amount',cell:function(o){return '<div class="lp-c-main">'+inr(o.amount)+'</div>';}},
    {h:'Status',cell:function(o){return orderTone(o.status);}}],
  tool:exportTool('salesorders','sales-orders-report'),
  menu:function(o){return [['Open in All Orders','scCloseRowMenu();glState(\'allorders\').f={q:\''+o.key+'\'};glState(\'allorders\').page=1;scGo(\'allorders\')']];}};

/* ── REPORTS: CATALOG REJECTS ──────────────────────────────────────────── */
var REJECT_REASONS=['Image below 20 KB','Missing HSN code','Duplicate product name','Price missing','Category not mapped','Image name not in sheet'];
var CATALOG_REJECTS=[['Himalaya Neem Face Wash','Mukesh Pharmacy',0,'Rejected'],['Dettol Soap 125g','Mukesh Pharmacy',1,'Rejected'],
  ['Amul Butter 500g','Zing Grocery',2,'Resubmitted'],['Saffola Gold 1L','C Mart',3,'Rejected'],['Mi Power Bank','Chennai Fashion Store 2k26',4,'Approved'],
  ['Colgate MaxFresh','Suma Grocery',5,'Rejected'],['Real Juice 1L','Zing Grocery',1,'Resubmitted'],['Pest Control','DHI Hyperlocal Pvt Ltd',4,'Rejected']]
  .map(function(x,i){return {key:9301-i,name:x[0],store:x[1],reason:REJECT_REASONS[x[2]],sheet:'catalogue_'+isoDay(addD(DASH_TODAY,-i*2)).replace(/-/g,'')+'.xlsx',
    rejected:fmtDate(addD(DASH_TODAY,-i*2)),status:x[3]};});
GL.catalogreject={one:'rejected item',noun:'rejected items',rows:CATALOG_REJECTS,
  title:function(r){return r.name;},
  search:{placeholder:'Search product or sheet',fields:['name','sheet','key']},
  filters:[{k:'status',label:'Select Status',opts:['Rejected','Resubmitted','Approved']},{k:'reason',label:'Reject Reason',opts:REJECT_REASONS}],
  stats:function(rows){return statusStats(rows,'status',[['Rejected','unapproved'],['Resubmitted','pending']]);},
  cols:[{h:'Reject ID',cell:function(r){return plain(r.key);}},{h:'Product Name',cell:function(r){return '<div class="lp-c-main">'+esc(r.name)+'</div><div class="lp-c-sub">'+esc(r.sheet)+'</div>';}},
    {h:'Store',cell:function(r){return plain(r.store);}},
    {h:'Reason',cell:function(r){return '<span class="sc-reason">'+esc(r.reason)+'</span>';}},{h:'Rejected On',cell:function(r){return plain(r.rejected);}},
    {h:'Status',cell:function(r){return badge(r.status==='Approved'?'approved':r.status==='Resubmitted'?'pending':'unapproved',r.status);}}],
  tool:exportTool('catalogreject','catalog-reject-report'),
  menu:function(r){
    if(r.status==='Rejected')return [['Mark Resubmitted','scCloseRowMenu();scRejectSet('+r.key+',\'Resubmitted\')'],['Go to Bulk Upload','scCloseRowMenu();scGo(\'bulkupload\')']];
    if(r.status==='Resubmitted')return [['Approve','scCloseRowMenu();scRejectSet('+r.key+',\'Approved\')'],['Reject Again','scCloseRowMenu();scRejectSet('+r.key+',\'Rejected\')']];
    return [['Reopen','scCloseRowMenu();scRejectSet('+r.key+',\'Rejected\')']];
  }};
function scRejectSet(key,v){
  var r=glRow('catalogreject',key);if(!r)return;r.status=v;if(v==='Rejected')r.rejected=fmtDate(DASH_TODAY);scRender();
  scToast(r.name+' '+v.toLowerCase(),v==='Approved'?'success':'info');
}

Object.assign(PAGE_ACTIONS,{staff:['Add Staff',function(){scGlForm('staff');}],discounts:['Create Discount',function(){scGlForm('discounts');}],
  notifevents:['Create Notification',function(){scGlForm('notifevents');}]});

/* ══ LISTING DETAIL PANEL ══════════════════════════════════════════════════
   Every listing on the engine opens the same side panel Deals uses: a row
   click or the View details button (the standard action icon) slides it in.
   Tabs: Details (the record as field cards, with its actions), the page's
   own related tabs (a community's residents, a block's flats, a buyer's
   orders...), and Activity - what has happened to the record. Expand lifts
   it into the large window, as on Deals. */
function navIcon(page){
  var hit=null;
  SC_NAV.forEach(function(it){
    if(it.id===page)hit=it.icon;
    (it.children||[]).forEach(function(c){if(c.id===page)hit=c.icon;(c.children||[]).forEach(function(x){if(x.id===page)hit=x.icon;});});
  });
  return hit||ICO.doc;
}
/* a field's icon, read from its label */
function fieldIco(h){
  var t=h.toLowerCase();
  return /status|kyc|verified|setting/.test(t)?ICO.check:/date|created|joined|valid|on$|time|period|scan/.test(t)?ICO.cal
    :/email/.test(t)?ICO.doc:/mobile|phone/.test(t)?ICO.phone:/amount|price|fee|sales|payable|limit|credit|coins|commission|total|₹/.test(t)?ICO.money
    :/community|store|retailer|block|platform/.test(t)?ICO.store:/category|segment|type|band|designation|position/.test(t)?ICO.tag
    :/name|member|buyer|user|customer|resident|staff|partner/.test(t)?ICO.user:/id$|key|no\.?$|sequence/.test(t)?ICO.hash:ICO.doc;
}
function glLog(id,key,text,comment){
  var r=glRow(id,key);if(!r)return;var t=stamp();
  (r._log||(r._log=[])).unshift({text:text,comment:comment||'',who:who(),role:state.role,date:t.date,time:t.time.slice(0,5)});
}
function glOneCap(g){return g.one.replace(/^./,function(c){return c.toUpperCase();});}
function glStatusOf(r){return r.status||r.state||'';}
function scGlOpen(id,key){
  var o=state.glOpen;
  if(o&&o.id===id&&o.key===key){scGlClose();return;}
  var switching=!!(o&&o.id===id);
  state.glEdit=null;state.glSub=null;state.permDraft=null;state.glDraft=null;state.pfPop=false;state.seqEdit=null;
  state.glOpen={id:id,key:key,tab:switching?o.tab:'details'};
  var sb=document.getElementById('sc-gl-sb');if(!sb)return;
  if(switching)refreshPanel('sc-gl-isb',glPanelHTML(id),true);
  else{sb.classList.remove('sc-still');sb.classList.add('open');fillPanel('sc-gl-isb',glPanelHTML(id));}
  markSelectedRow(String(key));
}
function scGlClose(){
  state.glOpen=null;state.glLogAdd=null;state.glEdit=null;state.glSub=null;state.permDraft=null;state.glDraft=null;state.pfPop=false;state.seqEdit=null;if(state.expanded){state.expanded=false;applyExpanded();}
  var sb=document.getElementById('sc-gl-sb');if(sb)sb.classList.remove('open');
  markSelectedRow(null);
}
function scGlTab(tab){if(!state.glOpen)return;state.glOpen.tab=tab;state.glDraft=null;state.pfPop=false;refreshPanel('sc-gl-isb',glPanelHTML(state.glOpen.id),true);}
function glPanelHTML(id){
  var g=GL[id],o=state.glOpen,r=o&&glRow(id,o.key);if(!r)return '';
  var tabs=[{id:'details',label:g.detailsLabel||'Details'}].concat((g.tabs||[]).map(function(t){return {id:t.id,label:typeof t.label==='function'?t.label(r):t.label};}))
    .concat([{id:'logs',label:'Logs'}]);
  if(!tabs.some(function(t){return t.id===o.tab;}))o.tab='details';
  var body=o.tab==='details'?glDetailsHTML(id,r):o.tab==='logs'?glLogsHTML(id,r)
    :g.tabs.filter(function(t){return t.id===o.tab;})[0].html(r);
  return glExpHead(id,r)+tabBarHTML(tabs,o.tab,'scGlTab','scGlClose','sc-gl-tabs')+'<div class="lp-isb-body">'+body+'</div>';
}
function glExpHead(id,r){
  var g=GL[id],st=glStatusOf(r);
  return '<div class="sc-exp-head"><div class="sc-exp-ico">'+navIcon(id)+'</div>'
    +'<div class="sc-exp-text"><div class="sc-exp-title"><span>'+esc(g.title(r))+'</span>'+(st?activeBadge(st):'')+'</div>'
      +'<div class="sc-exp-meta">'+esc(glOneCap(g))+'<span class="hd-sb-dot">•</span>Key '+esc(r.key)+'</div></div>'
    +'<div class="sc-exp-actions">'
      +'<button class="sc-exp-btn" type="button" title="Collapse" aria-label="Collapse" onclick="scCollapsePanel()">'+ICO_COLLAPSE+'</button>'
      +'<button class="lp-isb-close" type="button" title="Close" aria-label="Close" onclick="scGlClose()">'+ICO.close+'</button>'
    +'</div></div>';
}
function glHero(id,r,withEdit){
  var g=GL[id],st=glStatusOf(r),e=state.glEdit,editing=!!(withEdit&&e&&e.id===id&&e.key===r.key);
  return heroCard({icon:navIcon(id),name:g.title(r),meta:[glOneCap(g),'Key '+r.key,st],editing:editing,
    edit:withEdit&&(g.form||g.editHTML)?"scGlEdit('"+id+"',"+r.key+")":'',expand:'scExpandTab()'});
}
/* the record's actions - what the row menu offered - as buttons */
/* WHAT CAN BE DONE TO A RECORD. A change - activate, block, approve, mark
   live, resolve - is a log step: it is taken from the Logs tab with a
   comment, never straight from the row. Looking (View Workflow, View QR
   Code) and leaving (open another page) are not changes; they stay as
   buttons on Details. */
var GL_LOOK=/^(View|Open|Show|Go to|All Visits|No actions)/;
var GL_LEAVE=/scGo\(|glState\(|scExport|scCopy|scGlForm|scBuyerCredit|scBuyerOrders/;
function glActs(id,r){
  var g=GL[id],out=[];
  if(g.toggle){var on=r[g.toggle.k]===g.toggle.on;out.push({label:on?g.toggle.offLabel:g.toggle.onLabel,code:"scGlToggle('"+id+"',"+r.key+")"});}
  (g.menu?g.menu(r):[]).forEach(function(x){
    var code=x[1].replace(/scCloseRowMenu\(\);?/g,'');
    if(GL_LOOK.test(x[0])||GL_LEAVE.test(code))return;
    out.push({label:x[0],code:code});
  });
  return out;
}
function glViewActsHTML(id,r){
  var g=GL[id],acts=[];
  (g.menu?g.menu(r):[]).forEach(function(x){
    var code=x[1].replace(/scCloseRowMenu\(\);?/g,'');
    if(/^No actions/.test(x[0]))return;
    if(GL_LOOK.test(x[0])||GL_LEAVE.test(code))acts.push([x[0],code]);
  });
  if(glActs(id,r).length)acts.push(['Update in Logs',"scGlTab('logs')"]);
  if(g.del)acts.push(['Delete',"scGlDelete('"+id+"',"+r.key+")",'danger']);
  if(!acts.length)return '';
  return '<div class="sc-gl-actbar">'+acts.map(function(a){
    return '<button type="button" class="btn-outline btn-sm'+(a[2]?' sc-gl-act-danger':'')+'" onclick="'+a[1]+'">'+esc(a[0])+'</button>';}).join('')+'</div>';
}
function glDetailsHTML(id,r){
  var g=GL[id],seen={},e=state.glEdit;
  if(e&&e.id===id&&e.key===r.key)return glHero(id,r,true)+(g.editHTML?g.editHTML(r):glEditFormHTML(id,r));
  var cards=g.detailFields?g.detailFields(r).map(function(f){seen[f[0].toLowerCase()]=1;return fieldCard(f[2]||fieldIco(f[0]),f[0],f[1],f[3]);})
    :g.cols.filter(function(c){return !c.noDetail;}).map(function(c){seen[c.h.toLowerCase()]=1;return fieldCard(fieldIco(c.h),c.h,c.cell(r));});
  /* what the form holds but the table does not show (a notice's description...) */
  (g.form||[]).forEach(function(fd){
    if(seen[fd.label.toLowerCase()]||fd.k==='status')return;
    var v=r[fd.k];if(v==null||v===''||typeof v==='object')return;
    if(g.cols.some(function(c){return c.cell(r).indexOf(esc(String(v)))>=0;}))return;
    cards.push(fieldCard(fieldIco(fd.label),fd.label,esc(String(v)),fd.type==='textarea'));
  });
  return glHero(id,r,true)+glViewActsHTML(id,r)
    +secHead(glOneCap(g)+' Details')+(g.detailsTop?g.detailsTop(r):'')+'<div class="lp-sb-detail-grid">'+cards.join('')+'</div>'+(g.detailsExtra?g.detailsExtra(r):'');
}
/* THE LOGS TAB - the Deals Logs, for a listing record: where it stands, the
   steps open to it, the step's form (Comment, Cancel, Submit) under the bar
   with the chosen step marked, and the Activity Log of every step taken. */
function glLogsHTML(id,r){
  var g=GL[id],acts=glActs(id,r),la=state.glLogAdd,adding=la&&la.id===id&&la.key===r.key&&acts.some(function(a){return a.label===la.action;})?la.action:'';
  var cur=glStatusOf(r)||(g.toggle?r[g.toggle.k]:'')||'Active';
  var sa=state.role==='Super Admin';
  /* up to three steps as buttons, the rest under More (the chosen one stays in view) */
  var shown=acts.slice(0,3),rest=acts.slice(3);
  if(adding&&rest.some(function(a){return a.label===adding;})){shown=shown.slice(0,2).concat(rest.filter(function(a){return a.label===adding;}));rest=acts.filter(function(a){return shown.indexOf(a)<0;});}
  var btns=sa?'':shown.map(function(a){
    var neg=/^(Deactivate|Delete|Block|Reject|Revoke|Reverse|Mark Coming Soon|Mark KYC Pending|Reopen|Cancel)/.test(a.label),on=a.label===adding;
    var cls=on?'btn-primary is-active':adding?'btn-outline':(neg?'btn-outline':'btn-primary');
    return '<button class="'+cls+' btn-sm sc-quick-btn" type="button" aria-pressed="'+on+'" onclick="scGlLogQuick(\''+id+'\','+r.key+',\''+esc(a.label).replace(/'/g,"\\'")+'\')">'+esc(a.label)+'</button>';
  }).join('')
    +(!sa&&rest.length?'<button class="btn-outline btn-sm sc-quick-btn sc-more-btn" type="button" onclick="event.stopPropagation();scGlLogMore(this,\''+id+'\','+r.key+')">More '+ICO_DOWN+'</button>':'');
  if(sa&&acts.length)btns='<div class="sc-gl-sa-pick">'+csField('gl-sa-act',acts.map(function(a){return a.label;}),adding,'Select an action','scGlSaPick')+'</div>';
  var head='<div class="sc-logs-bar"><div class="sc-logs-cur">'
      +'<div class="sc-logs-eyebrow">Current status</div>'
      +'<div class="lp-logs-form-header"><span class="lp-log-dot lp-log-dot--info"></span>'+esc(cur)+'</div>'
      +'<p class="lp-logs-form-sub sc-logs-who">'+ICO.user+'<span>'+(acts.length?'Open to <b>'+esc(state.role)+'</b>':'No further actions on this '+esc(g.one))+'</span></p></div>'
    +(btns?'<div class="sc-quick-actions">'+btns+'</div>':'')+'</div>';
  var form='';
  if(adding){
    var anim=!!la.anim;delete la.anim;
    form='<div class="sc-logadd"><div class="sc-logadd-body"><div class="policy-form-grid">'
        +'<div class="ep-form-group ep-form-full"><label class="ep-form-label">Comment</label>'
        +'<textarea class="ep-form-input" id="sc-gl-comment" placeholder="Add a note for the next person"'
        +' onkeydown="if((event.ctrlKey||event.metaKey)&&event.key===\'Enter\'){event.preventDefault();scGlLogSubmit()}"></textarea></div>'
      +'</div></div>'
      +'<div class="sc-logadd-foot"><span class="sc-logadd-hint"><kbd>Ctrl</kbd> + <kbd>Enter</kbd> to submit</span>'
        +'<div class="sc-logadd-btns"><button class="btn-outline" onclick="scGlLogCancel()">Cancel</button>'
        +'<button class="'+(/^(Reject|Block|Revoke|Reverse|Delete)/.test(adding)?'btn-primary sc-btn-danger':'btn-primary')+'" onclick="scGlLogSubmit()">Submit</button></div></div></div>';
    head='<div class="sc-act-panel'+(anim?' is-opening':'')+'">'+head+form+'</div>';
  }
  var log=(r._log||[]).slice().reverse(),made=r.created||r.joined||r.date||r.inAt||r.rejected||'';
  if(made)log.unshift({text:glOneCap(g)+' Added',comment:'',who:r.by||'System',role:'',date:String(made),time:''});
  var table=log.length?recTable(['S.No','Status','Comment','Created By','Create Time'],log.map(function(l,i){
      return '<tr><td>'+(i+1)+'</td><td>'+badge(glLogTone(l.text),l.text)+'</td>'
        +'<td class="sc-log-rem">'+(l.comment?esc(l.comment):'<span class="lp-dash">—</span>')+'</td>'
        +'<td>'+esc(l.who)+'<span class="sc-rec-sub">'+esc(l.role||'')+'</span></td>'
        +'<td>'+esc(l.date)+'<span class="sc-rec-sub">'+esc(l.time||'')+'</span></td></tr>';
    }).join('')):'<div class="lp-logs-empty">No activity logs yet.</div>';
  var count=log.length?'<span class="sc-act-count">'+log.length+(log.length===1?' entry':' entries')+'</span>':'';
  return '<div class="sc-logs">'+(g.logsExtra?g.logsExtra(r):'')+head+'<div class="sc-act-log">'+secHead('Activity Log',count)+table+'</div></div>';
}
/* EDITING IN THE TAB - as on Deals: Edit turns Details into the form card
   in place, the header says Editing, Cancel / Save Changes close it. The
   draft is kept as it is typed, so a repaint does not lose it. */
function scGlEdit(id,key){
  var g=GL[id],r=glRow(id,key);if(!r||!(g.form||g.editHTML))return;
  var vals={};(g.form||[]).forEach(function(fd){vals[fd.k]=r[fd.k]==null?'':String(r[fd.k]);});
  if(g.editStart)g.editStart(r);state.glSub=null;
  state.glEdit={id:id,key:key,vals:vals};state.glLogAdd=null;
  var o=state.glOpen,sb=document.getElementById('sc-gl-sb');if(!sb)return;
  if(o&&o.id===id&&o.key===key){o.tab='details';refreshPanel('sc-gl-isb',glPanelHTML(id),true);}
  else{var sw=!!(o&&o.id===id);state.glOpen={id:id,key:key,tab:'details'};
    if(sw)refreshPanel('sc-gl-isb',glPanelHTML(id),true);
    else{sb.classList.remove('sc-still');sb.classList.add('open');fillPanel('sc-gl-isb',glPanelHTML(id));}}
  markSelectedRow(String(key));
  setTimeout(function(){var f=document.querySelector('#sc-gl-sb .sc-edit-card .ep-form-input');if(f)f.focus();},0);
}
function glEditFields(g){return g.form.filter(function(fd){return fd.k!=='status'&&!(g.toggle&&fd.k===g.toggle.k);});}
function glEditFormHTML(id,r){
  var g=GL[id],e=state.glEdit;
  var cells=glEditFields(g).map(function(fd){
    var v=e.vals[fd.k]==null?'':e.vals[fd.k],ctl;
    if(fd.type==='select'){var o=typeof fd.opts==='function'?fd.opts():fd.opts;ctl=csField('ge-'+fd.k,o.indexOf(v)<0&&v?[v].concat(o):o,v,'Select '+fd.label.toLowerCase(),'scGlEditPick');}
    else if(fd.type==='textarea')ctl='<textarea class="ep-form-input" oninput="scGlEditInput(\''+fd.k+'\',this.value)">'+esc(v)+'</textarea>';
    else ctl='<input class="ep-form-input" type="'+(fd.type||'text')+'" value="'+esc(v)+'" placeholder="'+esc(fd.ph||'')+'" oninput="scGlEditInput(\''+fd.k+'\',this.value)">';
    return field(fd.label,ctl,fd.req,fd.full||fd.type==='textarea');
  }).join('');
  return '<div class="sc-edit-card"><div class="policy-form-grid">'+cells+'</div>'
    +'<div class="sc-edit-actions"><button class="btn-outline" onclick="scGlEditCancel()">Cancel</button>'
    +'<button class="btn-primary" onclick="scGlEditSave()">Save Changes</button></div></div>';
}
function scGlEditInput(k,v){if(state.glEdit)state.glEdit.vals[k]=v;}
function scGlEditPick(v,csid){scGlEditInput(csid.replace(/^ge-/,''),v);}
function scGlEditCancel(){var e=state.glEdit;state.glEdit=null;state.permDraft=null;if(e&&state.glOpen)refreshPanel('sc-gl-isb',glPanelHTML(e.id),true);}
function scGlEditSave(){
  var e=state.glEdit;if(!e)return;var g=GL[e.id],r=glRow(e.id,e.key);if(!r){state.glEdit=null;scRender();return;}
  var vals={},ef=glEditFields(g);
  for(var i=0;i<ef.length;i++){
    var fd=ef[i],v=String(e.vals[fd.k]==null?'':e.vals[fd.k]).trim();
    if(fd.req&&!v){scToast('Enter the '+fd.label.toLowerCase(),'error');return;}
    if(fd.type==='email'&&v&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){scToast('Enter a valid email','error');return;}
    vals[fd.k]=v;
  }
  if(g.check){var why=g.check(Object.assign({},r,vals),r.key);if(why){scToast(why,'error');return;}}
  var changed=ef.filter(function(fd){return String(r[fd.k]==null?'':r[fd.k])!==vals[fd.k];}).map(function(fd){return fd.label;});
  if(!changed.length){state.glEdit=null;refreshPanel('sc-gl-isb',glPanelHTML(e.id),true);scToast('No changes to save','info');return;}
  Object.assign(r,vals);if(g.onSave)g.onSave(r);
  glLog(e.id,e.key,'Updated '+changed.join(', '));
  state.glEdit=null;scRender();scToast(g.title(r)+' updated','success');
}
function glLogTone(t){return /^(Delete|Disable|Deactivate|Reject|Block|Revoke|Reverse|Cancel|Inactive|Removed|Mark Coming Soon|Escalate)/.test(t)?'unapproved'
  :/^(Enable|Activate|Approve|Active|Restore|Mark Live|Resolve|Close|Complete|Confirm|Accept|Unblock|.* Added)/.test(t)?'approved':'active';}
/* the row's action dropdown: the record's status, its steps below */
function glActionBtn(id,r){
  if(!glActs(id,r).length)return '';
  /* one label and one width on every row - the Status column already says where the record stands */
  var g=GL[id],cur=glStatusOf(r)||(g.toggle?r[g.toggle.k]:'');
  return '<button class="ct-action-btn sc-gl-actbtn" type="button" title="Update'+(cur?' · now '+esc(cur):'')+'" aria-label="Update '+esc(g.title(r))+'" onclick="event.stopPropagation();scGlRowMenu(this,\''+id+'\','+r.key+')">'
    +'<span>Update</span>'+ICO_DOWN+'</button>';
}
function scGlRowMenu(btn,id,key){
  var r=glRow(id,key),m=rowMenuEl();if(!r)return;
  if(m.classList.contains('open')&&m.dataset.id===id+':'+key){scCloseRowMenu();return;}
  scCloseAllDD();
  m.innerHTML=glActs(id,r).map(function(a){
    return '<div class="ct-act-item sc-act-avail" onclick="scGlStartLog(\''+id+'\','+key+',\''+esc(a.label).replace(/'/g,"\\'")+'\')">'+esc(a.label)+'</div>';}).join('');
  m.dataset.id=id+':'+key;m.classList.add('open');m.style.width='max-content';m.style.maxHeight='';
  var rc=btn.getBoundingClientRect(),w=Math.ceil(m.getBoundingClientRect().width);
  scPlaceMenu(m,{left:rc.right-w,right:rc.right,top:rc.top,bottom:rc.bottom,width:w});
}
/* THE DROPDOWN OPENS THE STEP IN LOGS - no popup: the record's panel opens on
   Logs with the step's form open, as if it had been picked there. */
function scGlStartLog(id,key,action){
  scCloseRowMenu();
  state.glLogAdd={id:id,key:key,action:action,anim:true};
  var o=state.glOpen,sb=document.getElementById('sc-gl-sb');if(!sb)return;
  if(o&&o.id===id&&o.key===key){o.tab='logs';refreshPanel('sc-gl-isb',glPanelHTML(id),true);}
  else{var sw=!!(o&&o.id===id);state.glOpen={id:id,key:key,tab:'logs'};
    if(sw)refreshPanel('sc-gl-isb',glPanelHTML(id),true);
    else{sb.classList.remove('sc-still');sb.classList.add('open');fillPanel('sc-gl-isb',glPanelHTML(id));}}
  markSelectedRow(String(key));
  setTimeout(function(){var t=document.getElementById('sc-gl-comment');if(t)t.focus();},0);
}
function scGlLogQuick(id,key,action){
  var la=state.glLogAdd;
  if(la&&la.id===id&&la.key===key&&la.action===action){scGlLogCancel();return;}
  state.glLogAdd={id:id,key:key,action:action,anim:true};refreshPanel('sc-gl-isb',glPanelHTML(id));
  setTimeout(function(){var t=document.getElementById('sc-gl-comment');if(t)t.focus();},0);
}
function scGlLogMore(btn,id,key){
  var r=glRow(id,key),m=rowMenuEl();if(!r)return;
  if(m.classList.contains('open')&&m.dataset.id==='more:'+id+':'+key){scCloseRowMenu();return;}
  m.innerHTML=glActs(id,r).slice(3).map(function(a){
    return '<div class="ct-act-item sc-act-avail" onclick="scCloseRowMenu();scGlLogQuick(\''+id+'\','+key+',\''+esc(a.label).replace(/'/g,"\\'")+'\')">'+esc(a.label)+'</div>';}).join('');
  m.dataset.id='more:'+id+':'+key;m.classList.add('open');m.style.width='max-content';m.style.maxHeight='';
  var rc=btn.getBoundingClientRect(),w=Math.ceil(m.getBoundingClientRect().width);
  scPlaceMenu(m,{left:rc.right-w,right:rc.right,top:rc.top,bottom:rc.bottom,width:w});
}
function scGlSaPick(v){var o=state.glOpen;if(!o||!v)return;state.glLogAdd={id:o.id,key:o.key,action:v,anim:true};refreshPanel('sc-gl-isb',glPanelHTML(o.id));
  setTimeout(function(){var t=document.getElementById('sc-gl-comment');if(t)t.focus();},0);}
function scGlLogCancel(){var la=state.glLogAdd;state.glLogAdd=null;if(la&&state.glOpen)refreshPanel('sc-gl-isb',glPanelHTML(la.id));}
function scGlLogSubmit(){
  var la=state.glLogAdd;if(!la)return;
  var r=glRow(la.id,la.key),a=r&&glActs(la.id,r).filter(function(x){return x.label===la.action;})[0];
  if(!a){state.glLogAdd=null;scRender();return;}
  var comment=((document.getElementById('sc-gl-comment')||{}).value||'').trim();
  var before=(r._log||[]).length;
  state.glLogAdd=null;
  (new Function(a.code))();
  /* the step is logged once, with its comment - whatever the action noted itself is folded in */
  if(r._log&&r._log.length>before)r._log.splice(0,r._log.length-before);
  glLog(la.id,la.key,la.action,comment);
  if(state.glOpen)state.glOpen.tab='logs';
  scRender();
}
/* a related list inside a tab: its rows, or a quiet line when there are none */
function relList(head,list,row,empty,more){
  return (list.length?recTable(head,list.slice(0,25).map(row).join('')):'<div class="lp-logs-empty">'+esc(empty)+'</div>')
    +(list.length>25?'<p class="sc-bulk-note">Showing 25 of '+list.length+'.</p>':'')+(more||'');
}
function relHead(id,r,title,n,open){
  return glHero(id,r,false)+secHead(title,'<span class="sc-act-count">'+n+'</span>'+(open||''));
}
function openAll(page,f,label){
  return ' <button type="button" class="sc-link" onclick="glState(\''+page+'\').f='+JSON.stringify(f).replace(/"/g,"'")+';glState(\''+page+'\').page=1;scGo(\''+page+'\')">'+esc(label)+'</button>';
}
var td=function(v){return '<td>'+(v==null||v===''?'—':esc(String(v)))+'</td>';};
function relTab(id,label,head,listFn,row,empty,open){
  return {id:id,label:label,
    html:function(r){var l=listFn(r);return relHead(state.glOpen.id,r,label,l.length,open?open(r):'')+relList(head,l,row,empty);}};
}

/* ── each page's own tabs ───────────────────────────────────────────────── */
GL.allbuyers.tabs=[
  relTab('orders','Orders',['Order ID','Date','Store','Type','Amount','Status'],function(b){return ORDERS.filter(function(o){return o.userId===b.key;});},
    function(o){return '<tr>'+td(o.key)+td(fmtDT(o.created))+td(o.store)+td(o.type)+td(inr(o.amount))+'<td>'+orderTone(o.status)+'</td></tr>';},'No orders from this buyer yet.'),
  {id:'credit',label:'Credit',html:function(b){var c=CREDIT_CUSTOMERS.filter(function(x){return x.buyer===b.key;})[0];
    if(!c)return glHero('allbuyers',b,false)+secHead('Credit')+'<div class="lp-logs-empty">Not on credit.</div><div class="sc-gl-actbar"><button class="btn-outline btn-sm" type="button" onclick="scBuyerCredit('+b.key+')">Add to Credit</button></div>';
    var band=bandBy(c.band)||{limit:0,days:0};
    return glHero('allbuyers',b,false)+secHead('Credit')+'<div class="lp-sb-detail-grid">'+fieldCard(ICO.hash,'Account',c.key)+fieldCard(ICO.tag,'Credit Band',esc(c.band))
      +fieldCard(ICO.money,'Credit Used',inr(c.used)+' of '+inr(band.limit))+fieldCard(ICO.cal,'Credit Period',band.days+' days')+fieldCard(ICO.check,'Status',activeBadge(c.status==='Active'?'Active':'Inactive'))+'</div>';}}
];
GL.creditbands.tabs=[relTab('customers','Customers',['Account','Customer','Mobile','Credit Used','Status'],function(b){return CREDIT_CUSTOMERS.filter(function(c){return c.band===b.name;});},
  function(c){return '<tr>'+td(c.key)+td(c.buyerName)+td(c.mobile)+td(inr(c.used))+'<td>'+badge(c.status==='Active'?'approved':'unapproved',c.status)+'</td></tr>';},'No customers on this band.')];
GL.maincats.tabs=[relTab('subs','Sub Categories',['Key','Sub Category','Sequence','Status'],function(m){return SUB_CATEGORIES.filter(function(s){return s.main===m.name;});},
  function(s){return '<tr>'+td(s.key)+td(s.name)+td(s.seq)+'<td>'+activeBadge(s.status)+'</td></tr>';},'No sub categories yet.')];
GL.subcats.tabs=[relTab('grands','Grand Sub Categories',['Key','Grand Sub Category','Sequence','Status'],function(m){return GRAND_CATEGORIES.filter(function(s){return s.sub===m.name;});},
  function(s){return '<tr>'+td(s.key)+td(s.name)+td(s.seq)+'<td>'+activeBadge(s.status)+'</td></tr>';},'No grand sub categories yet.')];
GL.stores.tabs=[
  relTab('products','Products',['Product ID','Name','Type','Category','Status'],function(st){return PRODUCTS.filter(function(p){return p.storeId===st.key;});},
    function(p){return '<tr>'+td(p.key)+td(p.name)+td(p.itemType)+td(p.main)+'<td>'+activeBadge(p.status)+'</td></tr>';},'No products in this store yet.'),
  relTab('orders','Orders',['Order ID','Date','Buyer','Amount','Status'],function(st){return ORDERS.filter(function(o){return o.storeId===st.key;});},
    function(o){return '<tr>'+td(o.key)+td(fmtDT(o.created))+td(o.user)+td(inr(o.amount))+'<td>'+orderTone(o.status)+'</td></tr>';},'No orders for this store yet.')];
GL.communities.tabs=[
  relTab('residents','Residents',['Key','Name','Property','Position','Status'],function(c){return RESIDENTS.filter(function(x){return x.comm===c.name;});},
    function(x){return '<tr>'+td(x.key)+td(x.name)+td(x.prop)+td(x.pos)+'<td>'+activeBadge(x.status)+'</td></tr>';},'No residents yet.'),
  relTab('blocks','Blocks',['Block Id','Block / Tower','Flats','Status'],function(c){return BLOCKS.filter(function(x){return x.comm===c.name;});},
    function(b){return '<tr>'+td(b.key)+td(b.name)+td(FLATS.filter(function(f){return f.block===b.key;}).length)+'<td>'+activeBadge(b.status)+'</td></tr>';},'No blocks yet.'),
  relTab('amenities','Amenities',['Service ID','Amenity','Fee','Status'],function(c){return AMENITIES.filter(function(x){return x.comm===c.name;});},
    function(a){return '<tr>'+td(a.key)+td(a.name)+td(a.fee?'INR '+a.fee:'Free')+'<td>'+activeBadge(a.status)+'</td></tr>';},'No amenities yet.'),
  relTab('members','Members',['Member Id','Name','Designation','Status'],function(c){return CMEMBERS.filter(function(x){return x.comm===c.name;});},
    function(m){return '<tr>'+td(m.key)+td(m.name)+td(m.desig)+'<td>'+activeBadge(m.status)+'</td></tr>';},'No members yet.')];
GL.blocks.tabs=[relTab('flats','Flats',['Flat Id','Flat Number','Status'],function(b){return FLATS.filter(function(f){return f.block===b.key;});},
  function(f){return '<tr>'+td(f.key)+td(f.num)+'<td>'+activeBadge(f.status)+'</td></tr>';},'No flats in this block yet.',
  function(b){return openAll('flats',{block:blockLabel(b)},'Open in All Flats');})];
GL.residents.tabs=[relTab('notices','Notices',['Post ID','Title','Category','Date'],function(r){return NOTICES.filter(function(n){return n.comm===r.comm;});},
  function(n){return '<tr>'+td(n.key)+td(n.title)+td(n.cat)+td(n.date)+'</tr>';},'No notices in this community.')];
GL.custbands.tabs=[relTab('wallets','E-Wallets',['Key Id','Wallet','Coins','Status'],function(b){return EWALLETS.filter(function(w){return w.band===b.name;});},
  function(w){return '<tr>'+td(w.key)+td(w.name)+td(w.coins)+'<td>'+activeBadge(w.status)+'</td></tr>';},'No e-wallets on this band.')];
GL.discounts.tabs=[relTab('scans','Redemptions',['User','Store','Scan Date','Status'],function(d){return DISC_TXNS.filter(function(t){return t.disc===d.key;});},
  function(t){return '<tr>'+td(t.user)+td(t.store)+td(t.scanned)+'<td>'+badge(t.status==='Redeemed'?'approved':t.status==='Pending'?'pending':'unapproved',t.status)+'</td></tr>';},'Not redeemed yet.')];
GL.livebuyers.tabs=[{id:'keys',label:'Access Keys',html:function(r){
  return glHero('livebuyers',r,false)+secHead('Access Keys')+'<div class="lp-sb-detail-grid">'
    +fieldCard(ICO.key,'Access Key','<span class="sc-mono">'+esc(r.akey)+'</span>',true)+fieldCard(ICO.key,'Access Value','<span class="sc-mono">'+esc(r.aval)+'</span>',true)+'</div>'
    +'<div class="sc-gl-actbar"><button class="btn-outline btn-sm" type="button" onclick="scCopySecret('+r.key+',\'akey\')">Copy Access Key</button>'
    +'<button class="btn-outline btn-sm" type="button" onclick="scCopySecret('+r.key+',\'aval\')">Copy Access Value</button>'
    +'<button class="btn-outline btn-sm" type="button" onclick="glLog(\'livebuyers\','+r.key+',\'Regenerated keys\');scRegenKeys('+r.key+')">Regenerate Keys</button></div>';}}];

/* ══ SEQUENCE, SUPPORT, CARDS, LOCATION ════════════════════════════════════
   Category & Sequence: each app section's display order and visibility,
   reordered in the panel's Sequence tab. Support & Help Desk: tickets, the
   teams they are assigned to, their categories, and policies. Cards and
   Subscriptions: card products and the cards issued from them. Location
   control: which cities are Live. */

/* ── CATEGORY & SEQUENCE ───────────────────────────────────────────────── */
var SEQ_CONFIGS=[[1001,'Home Sections',['Banner Carousel','Shop by Category','Top Stores','Discounts For You','Your Community','Recently Viewed']],
  [1002,'Discounts',DISCOUNTS.map(function(d){return d.name;}).concat(['Bank Offers','Weekend Deals'])],
  [1003,'Community',COMMUNITIES.slice(0,6).map(function(c){return c.name;})],
  [1004,'Inside Community',['Notice Board','Amenities','Daily Help','Visitors','Residents','Blocks & Flats','Maintenance','Events','Polls','Helpdesk',
    'Marketplace','Lost & Found','Parking','Emergency Contacts','Documents','Payments','Clubhouse','Gym','Pool Booking','Feedback']],
  [1006,'Health Sub Categories',['Consultation','Pharmacy','Diagnostics','Dental','Psychology','Ayurveda','Homeopathy','Physiotherapy','Nutrition',
    'Eye Care','Skin Care','Inpatient Admission','Home Care']],
  [1007,'Mart',['Fresh Fruits','Vegetables','Dairy & Bakery','Staples','Snacks']],[1008,'Food',[]],[1009,'Rooms',[]]]
  .map(function(x){return {key:x[0],name:x[1],items:x[2].map(function(n,i){return {name:n,on:!(i%7===6)};}),status:x[2].length?'Active':'Future'};});
GL.sequence={one:'configuration',noun:'configurations',rows:SEQ_CONFIGS,
  title:function(c){return c.name;},
  search:{placeholder:'Search configuration',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive','Future']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Future','pending']]);},
  cols:[{h:'Configuration Name',cell:function(c){return '<div class="lp-c-main">'+esc(c.name)+'</div><div class="lp-c-sub">Module ID: SEQ-'+c.key+'</div>';}},
    {h:'Items',cell:function(c){return '<span class="sc-count-pill">'+c.items.length+'</span>';}},
    {h:'Visible',cell:function(c){var v=c.items.filter(function(i){return i.on;}).length;return c.items.length?plain(v+' of '+c.items.length):'<span class="lp-dash">—</span>';}},
    {h:'Status',cell:function(c){return c.status==='Future'?badge('pending','Future'):activeBadge(c.status);}}],
  form:[{k:'name',label:'Configuration Name',req:true,full:true},{k:'status',label:'Status',type:'select',opts:['Active','Inactive','Future'],req:true,def:'Active'}],
  defaults:function(){return {items:[]};},
  toggle:{k:'status',on:'Active',off:'Inactive',onLabel:'Activate',offLabel:'Deactivate',onDone:'activated',offDone:'deactivated'},
  tabs:[{id:'items',label:'Sequence',html:function(c){
    var rows=c.items.map(function(it,i){
      return '<div class="sc-seq-row'+(it.on?'':' is-off')+'"><span class="sc-seq-no">'+(i+1)+'</span><span class="sc-seq-name">'+esc(it.name)+'</span>'
        +'<span class="sc-seq-tools">'
          +'<button type="button" class="lp-action-btn" title="Move up" aria-label="Move '+esc(it.name)+' up"'+(i?'':' disabled')+' onclick="scSeqMove('+c.key+','+i+',-1)">'+ICO_UP+'</button>'
          +'<button type="button" class="lp-action-btn" title="Move down" aria-label="Move '+esc(it.name)+' down"'+(i<c.items.length-1?'':' disabled')+' onclick="scSeqMove('+c.key+','+i+',1)">'+ICO_DOWN+'</button>'
          +'<button type="button" role="switch" aria-checked="'+it.on+'" class="sc-switch'+(it.on?' is-on':'')+'" title="'+(it.on?'Hide':'Show')+'" onclick="scSeqVis('+c.key+','+i+')"><span></span></button>'
        +'</span></div>';
    }).join('');
    return relHead('sequence',c,'Display Order',c.items.filter(function(i){return i.on;}).length+' visible')
      +(rows?'<div class="sc-seq-list">'+rows+'</div>':'<div class="lp-logs-empty">No items yet - this section is planned for the future.</div>')
      +'<div class="sc-gl-actbar" style="margin-top:14px"><input class="ep-form-input sc-seq-add" id="sc-seq-new" type="text" placeholder="Add an item" onkeydown="if(event.key===\'Enter\')scSeqAdd('+c.key+')">'
      +'<button class="btn-outline btn-sm" type="button" onclick="scSeqAdd('+c.key+')">'+ICO.plus+' Add Item</button></div>';
  }}]};
var ICO_UP='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
function scSeqMove(key,i,d){
  var c=glRow('sequence',key),j=i+d;if(!c||j<0||j>=c.items.length)return;
  var t=c.items[i];c.items[i]=c.items[j];c.items[j]=t;glLog('sequence',key,'Moved '+t.name+' to position '+(j+1));scRender();
}
function scSeqVis(key,i){
  var c=glRow('sequence',key);if(!c)return;var it=c.items[i];it.on=!it.on;glLog('sequence',key,(it.on?'Showed ':'Hid ')+it.name);scRender();
}
function scSeqAdd(key){
  var c=glRow('sequence',key),el=document.getElementById('sc-seq-new'),v=el&&el.value.trim();if(!c||!v)return;
  c.items.push({name:v,on:true});if(c.status==='Future')c.status='Active';glLog('sequence',key,'Added '+v);scRender();scToast(v+' added','success','Position '+c.items.length+' in '+c.name+'.');
}

/* ── SUPPORT: CATEGORIES, TEAMS, TICKETS, POLICIES ─────────────────────── */
var SUP_CATS=[[233,'AGENT','16 Feb 2024','Active'],[234,'ITEM','16 Feb 2024','Inactive'],[235,'ORDER','16 Feb 2024','Inactive'],[236,'FULFILLMENT','16 Feb 2024','Inactive'],
  [237,'PAYMENT','16 Feb 2024','Active'],[238,'Test Category','16 Feb 2024','Inactive'],[425,'FULFILLMENT','09 Aug 2024','Active'],[468,'TESTING NAME','01 Sep 2025','Active'],
  [501,'REFUND','12 Sep 2026','Active']].map(function(x){return {key:x[0],name:x[1],created:x[2],status:x[3]};});
function supCatNames(){return SUP_CATS.map(function(c){return c.name;}).filter(function(v,i,a){return a.indexOf(v)===i;});}
var SUP_TEAMS=[[976,'Test support','TST007','Testsuppteam@yopmail','Test Category','16 Feb 2024'],[981,'Payments Desk','PAY101','payments@opendhi.com','PAYMENT','02 Mar 2025'],
  [988,'Order Care','ORD204','ordercare@opendhi.com','ORDER','19 Jul 2025'],[993,'Agent Helpline','AGT310','agents@opendhi.com','AGENT','05 Jan 2026']]
  .map(function(x){return {key:x[0],name:x[1],code:x[2],email:x[3],cat:x[4],created:x[5],status:'Active'};});
function supTeamNames(){return SUP_TEAMS.map(function(t){return t.name;});}
var TKT_STATUS=['Open','In Progress','Resolved','Closed'];
var TICKETS=[['Payment deducted but order failed','Complaint','Buyer','Payments Desk','PAYMENT','High','L1','In Progress','Under Review'],
  ['Refund not received for #28868','Complaint','Buyer','Payments Desk','REFUND','Critical','L2','Open','Escalated'],
  ['Unable to add new product images','Query','Retailer','Order Care','ITEM','Medium','L1','Open','—'],
  ['Agent referral bonus missing','Request','Agent','Agent Helpline','AGENT','Medium','L1','Resolved','—'],
  ['Wrong item delivered','Complaint','Buyer','Order Care','FULFILLMENT','High','L2','In Progress','Awaiting Customer'],
  ['How to change store timings','Query','Retailer','Test support','Test Category','Low','L1','Closed','—'],
  ['Settlement amount mismatch','Complaint','Retailer','Payments Desk','PAYMENT','High','L2','Open','—'],
  ['Order stuck in Pending','Complaint','Buyer','Order Care','ORDER','Medium','L1','Resolved','—']]
  .map(function(x,i){return {key:5120-i,title:x[0],issue:'ISS-'+(88410-i*7),type:x[1],role:x[2],team:x[3],cat:x[4],priority:x[5],level:x[6],status:x[7],sub:x[8],
    created:fmtDate(addD(DASH_TODAY,-i)),comments:[]};});
var PRIO_TONE={Low:'closed',Medium:'pending',High:'unapproved',Critical:'unapproved'};
GL.tickets={one:'ticket',noun:'tickets',rows:TICKETS,
  title:function(t){return t.title;},
  search:{placeholder:'Search title or issue ID',fields:['title','issue','key']},
  filters:[{k:'type',label:'Select Type',opts:['Complaint','Query','Request']},{k:'role',label:'Select Role',opts:['Buyer','Retailer','Agent']},
    {k:'status',label:'Select Status',opts:TKT_STATUS},{k:'level',label:'Select Level',opts:['L1','L2','L3']},
    {k:'priority',label:'Select Priority',opts:['Low','Medium','High','Critical']},{k:'cat',label:'Select Category',opts:supCatNames}],
  stats:function(rows){return [['All',rows.length,'active'],['Open',rows.filter(function(t){return t.status==='Open'||t.status==='In Progress';}).length,'pending'],
    ['Critical',rows.filter(function(t){return t.priority==='Critical'&&t.status!=='Closed';}).length,'unapproved']];},
  cols:[{h:'Key',cell:function(t){return plain(t.key);}},
    {h:'Title',cell:function(t){return '<div class="lp-c-main sc-c-title" title="'+esc(t.title)+'">'+esc(t.title)+'</div><div class="lp-c-sub">'+esc(t.issue)+'</div>';}},
    {h:'Type',cell:function(t){return '<div class="lp-c-plain">'+esc(t.type)+'</div><div class="lp-c-sub">'+esc(t.role)+'</div>';}},
    {h:'Assign Team',cell:function(t){return t.team?catJump('supteams','q',t.team):'<span class="lp-dash">Unassigned</span>';}},
    {h:'Category',cell:function(t){return plain(t.cat);}},
    {h:'Priority',cell:function(t){return badge(PRIO_TONE[t.priority],t.priority)+' <span class="sc-level">'+esc(t.level)+'</span>';}},
    {h:'Status',cell:function(t){return badge(t.status==='Resolved'||t.status==='Closed'?'approved':t.status==='Open'?'pending':'active',t.status)
      +(t.sub&&t.sub!=='—'?'<div class="lp-c-sub">'+esc(t.sub)+'</div>':'');}}],
  form:[{k:'title',label:'Title',req:true,full:true},{k:'type',label:'Type',type:'select',opts:['Complaint','Query','Request'],req:true},
    {k:'role',label:'Role',type:'select',opts:['Buyer','Retailer','Agent'],req:true},{k:'cat',label:'Category',type:'select',opts:supCatNames,req:true},
    {k:'priority',label:'Priority',type:'select',opts:['Low','Medium','High','Critical'],req:true,def:'Medium'},
    {k:'team',label:'Assign Team',type:'select',opts:supTeamNames,req:true},{k:'level',label:'Level',type:'select',opts:['L1','L2','L3'],req:true,def:'L1'}],
  defaults:function(n){return {issue:'ISS-'+(88420+n),status:'Open',sub:'—',created:fmtDate(DASH_TODAY),comments:[]};},
  menu:function(t){
    var go=function(lbl,st,sub){return [lbl,'scCloseRowMenu();scTicketSet('+t.key+',\''+st+'\',\''+sub+'\')'];},out=[];
    if(t.status==='Open')out.push(go('Start Progress','In Progress','Under Review'));
    if(t.status==='Open'||t.status==='In Progress')out.push(go('Resolve','Resolved','—'));
    if(t.status==='Resolved')out.push(go('Close Ticket','Closed','—'));
    if(t.status==='Resolved'||t.status==='Closed')out.push(go('Reopen','Open','Reopened'));
    if(t.level!=='L3'&&t.status!=='Closed')out.push(['Escalate to '+(t.level==='L1'?'L2':'L3'),'scCloseRowMenu();scTicketEscalate('+t.key+')']);
    return out;
  },
  tabsOff:[{id:'comments',label:'Comments',html:function(t){
    var list=t.comments.length?'<div class="sc-gl-tl">'+t.comments.map(function(c){
        return '<div class="sc-gl-tl-row"><span class="sc-gl-tl-dot"></span><div class="sc-gl-tl-body"><div class="sc-gl-tl-text sc-tkt-c">'+esc(c.text)+'</div>'
          +'<div class="sc-gl-tl-meta">'+esc(c.who)+'<span class="hd-sb-dot">•</span>'+esc(c.date)+' · '+esc(c.time)+'</div></div></div>';}).join('')+'</div>'
      :'<div class="lp-logs-empty">No comments yet.</div>';
    return relHead('tickets',t,'Comments',t.comments.length)
      +'<div class="sc-tkt-compose"><textarea class="ep-form-input sc-notice-desc" id="sc-tkt-c" rows="3" placeholder="Write a comment for the team"></textarea>'
      +'<div class="sc-gl-actbar" style="margin:8px 0 18px;justify-content:flex-end"><button class="btn-primary btn-sm" type="button" onclick="scTicketComment('+t.key+')">Add Comment</button></div></div>'+list;
  }}]};
function scTicketSet(key,st,sub){var t=glRow('tickets',key);if(!t)return;t.status=st;t.sub=sub;scRender();scToast('Ticket '+key+' '+st.toLowerCase(),st==='Resolved'||st==='Closed'?'success':'info');}
function scTicketEscalate(key){var t=glRow('tickets',key);if(!t)return;t.level=t.level==='L1'?'L2':'L3';t.sub='Escalated';scRender();scToast('Ticket '+key+' escalated to '+t.level,'info');}
function scTicketComment(key){
  var t=glRow('tickets',key),el=document.getElementById('sc-tkt-c'),v=el&&el.value.trim();if(!t)return;
  if(!v){scToast('Write a comment first','error');return;}
  var s=stamp();t.comments.unshift({text:v,who:who(),date:s.date,time:s.time.slice(0,5)});glLog('tickets',key,'Comment added');scRender();scToast('Comment added','success');
}
GL.supteams={one:'support team',noun:'support teams',rows:SUP_TEAMS,
  title:function(t){return t.name;},
  search:{placeholder:'Search by email',fields:['email','name','code','key']},
  filters:[{k:'cat',label:'All Categories',opts:supCatNames},{k:'status',label:'Select Status',opts:['Active','Inactive']}],
  stats:onOffStats,
  cols:[{h:'Key',cell:function(t){return plain(t.key);}},{h:'Team Name',cell:function(t){return mainTxt(t.name);}},
    {h:'Team Code',cell:function(t){return '<span class="sc-mono">'+esc(t.code)+'</span>';}},{h:'Team Email',cell:function(t){return mailCell(t.email);}},
    {h:'Category',cell:function(t){return plain(t.cat);}},{h:'Date',cell:function(t){return plain(t.created);}},{h:'Status',cell:function(t){return activeBadge(t.status);}}],
  form:[{k:'name',label:'Team Name',req:true},{k:'code',label:'Team Code',req:true,ph:'e.g. PAY101'},{k:'email',label:'Team Email',type:'email',req:true},
    {k:'cat',label:'Category',type:'select',opts:supCatNames,req:true}],
  defaults:function(){return {created:fmtDate(DASH_TODAY),status:'Active'};},
  toggle:onOff,
  tabs:[relTab('tickets','Tickets',['Key','Title','Priority','Status'],function(t){return TICKETS.filter(function(k){return k.team===t.name;});},
    function(k){return '<tr>'+td(k.key)+td(k.title)+'<td>'+badge(PRIO_TONE[k.priority],k.priority)+'</td>'+td(k.status)+'</tr>';},'No tickets assigned to this team.')]};
GL.supcats={one:'support category',noun:'support categories',rows:SUP_CATS,
  title:function(c){return c.name;},
  search:{placeholder:'Search by name',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']}],
  stats:onOffStats,
  cols:[{h:'Key',cell:function(c){return plain(c.key);}},{h:'Name',cell:function(c){return mainTxt(c.name);}},
    {h:'Date',cell:function(c){return plain(c.created);}},{h:'Status',cell:function(c){return activeBadge(c.status);}}],
  form:[{k:'name',label:'Category Name',req:true,full:true}],
  defaults:function(){return {created:fmtDate(DASH_TODAY),status:'Active'};},
  toggle:onOff,
  tabs:[relTab('tickets','Tickets',['Key','Title','Team','Status'],function(c){return TICKETS.filter(function(k){return k.cat===c.name;});},
    function(k){return '<tr>'+td(k.key)+td(k.title)+td(k.team)+td(k.status)+'</tr>';},'No tickets in this category.')]};
var POLICY_TYPES=['Refund','Cancellation','Return','Privacy','Terms of Use','Shipping'];
var POLICIES=[[611,'7 Day Easy Returns','Return','7 days'],[609,'Order Cancellation','Cancellation','Before dispatch'],[604,'Refund to Source','Refund','5-7 working days'],
  [598,'Privacy Policy','Privacy','Permanent'],[592,'Terms of Use','Terms of Use','Permanent'],[587,'Same Day Delivery','Shipping','Same day']]
  .map(function(x,i){return {key:x[0],name:x[1],type:x[2],period:x[3],by:['Shaun Jacob','Shrinivas Sadalawar'][i%2],created:fmtDate(addD(DASH_TODAY,-i*19))+' · 10:'+(10+i*7)+' AM',
    status:i===5?'Inactive':'Active',desc:'Applies to all orders placed on the platform.'};});
GL.policies={one:'policy',noun:'policies',rows:POLICIES,
  title:function(p){return p.name;},
  search:{placeholder:'Search policy name',fields:['name','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'type',label:'Filter By',opts:POLICY_TYPES}],
  stats:onOffStats,
  cols:[{h:'Policy Id',cell:function(p){return plain(p.key);}},{h:'Policy Name',cell:function(p){return mainTxt(p.name);}},
    {h:'Created By',cell:function(p){return plain(p.by);}},{h:'Created Time',cell:function(p){return plain(p.created);}},
    {h:'Policy Type',cell:function(p){return plain(p.type);}},{h:'Time Period',cell:function(p){return plain(p.period);}},
    {h:'Status',cell:function(p){return activeBadge(p.status);}}],
  form:[{k:'name',label:'Policy Name',req:true},{k:'type',label:'Policy Type',type:'select',opts:POLICY_TYPES,req:true},
    {k:'period',label:'Time Period',req:true,ph:'e.g. 7 days'},{k:'desc',label:'Policy Details',type:'textarea',req:true,full:true}],
  defaults:function(){var d=new Date();return {by:state.role,created:fmtDate(DASH_TODAY)+' · '+d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}),status:'Active'};},
  toggle:onOff,del:true};

/* ── CARDS & SUBSCRIPTIONS ─────────────────────────────────────────────── */
var CARD_CATS=['Membership','Subscription','Gift','Loyalty'];
var CARDS=[['MHB','My Home Bhooja Gold','Membership','Physical',12,2999,'My Home Bhooja Clubhouse'],['MKP','Mukesh Health Plus','Subscription','Virtual',6,499,'Mukesh Pharmacy'],
  ['ZNG','Zing Fresh Pass','Subscription','Virtual',3,199,'Zing Grocery'],['GFT','Festive Gift Card','Gift','Physical',12,1000,'C Mart'],
  ['FPK','Freedom Park Resident','Membership','Physical',24,0,'Freedom Park'],['LYL','Dhi Loyalty','Loyalty','Virtual',12,0,'DHI Hyperlocal Pvt Ltd']]
  .map(function(x,i){return {key:701+i,prefix:x[0],name:x[1],cat:x[2],type:x[3],months:x[4],price:x[5],store:x[6],status:i===3?'Inactive':'Active'};});
function cardNames(){return CARDS.map(function(c){return c.name;});}
GL.cards={one:'card',noun:'cards',rows:CARDS,
  title:function(c){return c.name;},
  search:{placeholder:'Enter card name',fields:['name','prefix']},search2:{placeholder:'Enter store name',fields:['store']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']}],
  stats:function(rows){return [['Cards',rows.length,'active'],['Issued',ISSUED_CARDS.length,'approved']];},
  cols:[{h:'Prefix',cell:function(c){return '<span class="sc-mono">'+esc(c.prefix)+'</span>';}},
    {h:'Card Name',cell:function(c){return '<div class="lp-c-main">'+esc(c.name)+'</div><div class="lp-c-sub">'+esc(c.store)+'</div>';}},
    {h:'Card Category',cell:function(c){return plain(c.cat);}},{h:'Card Type',cell:function(c){return plain(c.type);}},
    {h:'Validity',cell:function(c){return plain(c.months+(c.months===1?' month':' months'));}},
    {h:'Price',cell:function(c){return c.price?plain(inr(c.price)):badge('approved','Free');}},{h:'Status',cell:function(c){return activeBadge(c.status);}}],
  form:[{k:'name',label:'Card Name',req:true},{k:'prefix',label:'Prefix',req:true,ph:'3 letters'},{k:'store',label:'Store Name',req:true},
    {k:'cat',label:'Card Category',type:'select',opts:CARD_CATS,req:true},{k:'type',label:'Card Type',type:'select',opts:['Physical','Virtual'],req:true},
    {k:'months',label:'Validity (months)',type:'number',req:true,def:'12'},{k:'price',label:'Price (₹)',type:'number',req:true,def:'0'}],
  defaults:function(){return {status:'Active'};},
  onSave:function(c){c.prefix=c.prefix.toUpperCase().slice(0,4);c.months=Math.max(1,+c.months||1);c.price=Math.max(0,+c.price||0);},
  toggle:onOff,
  tabs:[relTab('issued','Issued Cards',['Card Number','User','Expiry','Status'],function(c){return ISSUED_CARDS.filter(function(x){return x.card===c.name;});},
    function(x){return '<tr>'+td(x.number)+td(x.user)+td(x.expiry)+'<td>'+activeBadge(x.status)+'</td></tr>';},'No cards issued yet.')]};
var ISSUED_CARDS=(function(){
  var users=[['Priya Nair','Resident'],['Arjun Rao','Resident'],['Rambabu Musunuru','Buyer'],['Deepa Menon','Resident'],['Karthik Reddy','Buyer'],
    ['Ramesh Gowda','Staff'],['Manasa','Resident'],['Utkarsh Shukla','Buyer'],['Anita Shetty','Staff'],['Baiju Balakrishnan','Buyer'],['Thulasi Annapureddy','Resident'],['Mukesh Kum','Buyer']];
  return users.map(function(u,i){
    var c=CARDS[i%CARDS.length],act=addD(DASH_TODAY,-(i*23+5)),exp=new Date(act);exp.setMonth(exp.getMonth()+c.months);
    return {key:8801+i,number:c.prefix+'-'+(4410+i*137)+'-'+(1000+i*911%9000),user:u[0],userType:u[1],card:c.name,issued:fmtDate(addD(act,-2)),
      activated:fmtDate(act),expiry:fmtDate(exp),userStatus:i===7?'Blocked':'Active',status:exp<DASH_TODAY?'Expired':i===4?'Inactive':'Active'};});
})();
GL.cardlist={one:'issued card',noun:'cards',rows:ISSUED_CARDS,
  title:function(x){return x.number;},
  search:{placeholder:'Search card number or user',fields:['number','user','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive','Expired']},{k:'userStatus',label:'Select User Status',opts:['Active','Blocked']},
    {k:'card',label:'Select Card type',opts:cardNames},{k:'userType',label:'Select User Type',opts:['Resident','Buyer','Staff']}],
  stats:function(rows){return statusStats(rows,'status',[['Active','approved'],['Expired','unapproved']]);},
  cols:[{h:'Card Number',cell:function(x){return '<div class="lp-c-main sc-mono">'+esc(x.number)+'</div><div class="lp-c-sub">Card ID '+x.key+'</div>';}},
    {h:'User Name',cell:function(x){return '<div class="lp-c-plain">'+esc(x.user)+'</div><div class="lp-c-sub">'+esc(x.userType)+(x.userStatus==='Blocked'?' · Blocked':'')+'</div>';}},
    {h:'Card Type',cell:function(x){return plain(x.card);}},{h:'Card Issue',cell:function(x){return plain(x.issued);}},
    {h:'QR Code',cell:function(x){return '<span class="sc-qr-mini" title="QR for '+esc(x.number)+'">'+qrSvg(x.key,36)+'</span>';}},
    {h:'Validity',cell:function(x){return '<div class="lp-c-plain">'+esc(x.activated)+'</div><div class="lp-c-sub">to '+esc(x.expiry)+'</div>';}},
    {h:'Status',cell:function(x){return x.status==='Expired'?badge('closed','Expired'):activeBadge(x.status);}}],
  menu:function(x){return [[x.userStatus==='Blocked'?'Unblock User':'Block User','scCloseRowMenu();scCardUser('+x.key+')'],
    [x.status==='Inactive'?'Activate Card':'Deactivate Card','scCloseRowMenu();scCardState('+x.key+')']];}};
function scCardUser(key){var x=glRow('cardlist',key);if(!x)return;x.userStatus=x.userStatus==='Blocked'?'Active':'Blocked';scRender();scToast(x.user+(x.userStatus==='Blocked'?' blocked':' unblocked'),'info');}
function scCardState(key){var x=glRow('cardlist',key);if(!x)return;x.status=x.status==='Inactive'?'Active':'Inactive';scRender();scToast('Card '+x.number+' '+x.status.toLowerCase(),'info');}

/* ── LOCATION CONTROL ──────────────────────────────────────────────────── */
var CITIES=[["'S GRAVENWEZEL",'VLAANDEREN','2970 - 2970'],["'S HERENELDEREN",'VLAANDEREN','3700 - 3700'],['24 PARAGANAS NORTH','WEST BENGAL','700028 - 743711'],
  ['24 PARAGANAS SOUTH','WEST BENGAL','700070 - 743613'],['AAIGEM','VLAANDEREN','9420 - 9420'],['AALBEKE','VLAANDEREN','8511 - 8511'],['AALST','VLAANDEREN','3800 - 9300'],
  ['AGRA','UTTAR PRADESH','282001 - 283126'],['AHMEDABAD','GUJARAT','380001 - 382481'],['BENGALURU','KARNATAKA','560001 - 562157'],['BHOPAL','MADHYA PRADESH','462001 - 462046'],
  ['CHANDIGARH','CHANDIGARH','160001 - 160102'],['CHENNAI','TAMIL NADU','600001 - 600130'],['COIMBATORE','TAMIL NADU','641001 - 641697'],['DEHRADUN','UTTARAKHAND','248001 - 248197'],
  ['GUNTUR','ANDHRA PRADESH','522001 - 522663'],['GURUGRAM','HARYANA','122001 - 122505'],['HYDERABAD','TELANGANA','500001 - 501510'],['INDORE','MADHYA PRADESH','452001 - 453771'],
  ['JAIPUR','RAJASTHAN','302001 - 303905'],['KOCHI','KERALA','682001 - 683594'],['KOLKATA','WEST BENGAL','700001 - 700163'],['LUCKNOW','UTTAR PRADESH','226001 - 227309'],
  ['MUMBAI','MAHARASHTRA','400001 - 400104'],['MYSURU','KARNATAKA','570001 - 571130'],['NAGPUR','MAHARASHTRA','440001 - 441501'],['NEW DELHI','DELHI','110001 - 110097'],
  ['PUNE','MAHARASHTRA','411001 - 412308'],['SURAT','GUJARAT','394101 - 395023'],['VADODARA','GUJARAT','390001 - 391776'],['VIJAYAWADA','ANDHRA PRADESH','520001 - 521456'],
  ['VISAKHAPATNAM','ANDHRA PRADESH','530001 - 531219'],['WARANGAL','TELANGANA','506001 - 506371']]
  .map(function(x,i){var live=['BENGALURU','CHENNAI','HYDERABAD','MUMBAI','PUNE','VIJAYAWADA','WARANGAL','KOCHI'].indexOf(x[0])>=0;
    return {key:i+1,city:x[0],state:x[1],pins:x[2],status:live?'Live':'Coming Soon'};});
GL.cities={one:'city',noun:'cities',rows:CITIES,
  title:function(c){return c.city.charAt(0)+c.city.slice(1).toLowerCase();},
  search:{placeholder:'Search by pincode',fields:['pins','city'],},
  filters:[{k:'city',label:'Select City',opts:function(){return CITIES.map(function(c){return c.city;});}},
    {k:'state',label:'Select State',opts:function(){return CITIES.map(function(c){return c.state;}).filter(function(v,i,a){return a.indexOf(v)===i;}).sort();}},
    {k:'status',label:'Select Status',opts:['Live','Coming Soon']}],
  stats:function(rows){return statusStats(rows,'status',[['Live','approved'],['Coming Soon','pending']]);},
  cols:[{h:'City Name',cell:function(c){return mainTxt(c.city);}},{h:'State Name',cell:function(c){return plain(c.state);}},
    {h:'Pincode Range',cell:function(c){return '<span class="sc-mono">'+esc(c.pins)+'</span>';}},
    {h:'Status',cell:function(c){return badge(c.status==='Live'?'approved':'pending',c.status);}}],
  menu:function(c){return [[c.status==='Live'?'Mark Coming Soon':'Mark Live','scCloseRowMenu();scCitySet('+c.key+',\''+(c.status==='Live'?'Coming Soon':'Live')+'\')']];}};
function scCityMenu(btn,key){
  var c=glRow('cities',key),m=rowMenuEl();if(!c)return;
  if(m.classList.contains('open')&&m.dataset.id==='city:'+key){scCloseRowMenu();return;}
  m.innerHTML=['Live','Coming Soon'].map(function(s){var cur=s===c.status;
    return '<div class="ct-act-item '+(cur?'sc-act-off':'sc-act-avail')+'"'+(cur?'':' onclick="scCloseRowMenu();scCitySet('+key+',\''+s+'\')"')+'>'+s+'</div>';}).join('');
  m.dataset.id='city:'+key;m.classList.add('open');m.style.width='max-content';m.style.maxHeight='';
  var rc=btn.getBoundingClientRect(),w=Math.max(150,Math.ceil(m.getBoundingClientRect().width));m.style.width=w+'px';
  scPlaceMenu(m,{left:rc.right-w,right:rc.right,top:rc.top,bottom:rc.bottom,width:w});
}
function scCitySet(key,st){var c=glRow('cities',key);if(!c||c.status===st)return;c.status=st;glLog('cities',key,'Marked '+st);scRender();
  scToast(GL.cities.title(c)+' is '+(st==='Live'?'now live':'coming soon'),st==='Live'?'success':'info');}

Object.assign(PAGE_ACTIONS,{sequence:['Create Configuration',function(){scGlForm('sequence');}],tickets:['Raise Ticket',function(){scGlForm('tickets');}],
  supteams:['Create Team',function(){scGlForm('supteams');}],supcats:['Create Category',function(){scGlForm('supcats');}],
  policies:['Create Policy',function(){scGlForm('policies');}],cards:['Create Card',function(){scGlForm('cards');}],
  cardlist:['Export Cards',function(){scExportGL('cardlist','card-listing');},ICO_DOWNLOAD]});

/* ══ MY PROFILE ════════════════════════════════════════════════════════════
   Opened from the profile menu. The account's personal information (edited
   in the standard popup form), the stores it runs - each a link to All
   Stores when it is one - and account actions. */
var PROFILE={store:'Mukesh Pharmacy',name:'shrinivas-sadalawar',email:'sadalawar@newforceltd.com',zip:'500049',gst:'6382917382',pan:'Egskdyhw',
  phone:'919064702615',address:'Cyber Towers',
  stores:['Zing Grocery','C Mart','Suma Grocery','Peace Commercial Community','Chennai Commercial','Chennai Fashion Store 2k26','Comm Store Chennai2',
    'ComM StorE Chennai','Lara Locals','OpenDhi Connect And Earn']};
var PROFILE_FIELDS=[['store','Store Name',ICO.store],['name','Name',ICO.user],['email','Email',ICO.doc],['zip','Zip Code',ICO.pin],
  ['gst','GST Number',ICO.hash],['pan','PAN Number',ICO.hash],['phone','Phone No.',ICO.phone],['address','Address',ICO.pin]];
function profileHTML(){
  var P=PROFILE,ini=P.name.split(/[\s-]+/).filter(Boolean).slice(0,2).map(function(w){return w[0];}).join('').toUpperCase();
  var storeRows=GL.stores?glSrc(GL.stores):[];
  var stores=P.stores.map(function(n){
    var hit=storeRows.filter(function(r){return r.name.toLowerCase()===n.toLowerCase();})[0];
    return '<li class="sc-pf-store">'+ICO.store+(hit?catJump('stores','q',hit.name).replace('>'+esc(hit.name)+'<','>'+esc(n)+'<'):'<span>'+esc(n)+'</span>')+'</li>';
  }).join('');
  return '<div class="listing-page"><div class="sc-bill-card sc-pf-card">'
    +'<div class="hd-sb-hero sc-hero sc-pf-hero"><div class="sc-pf-ava">'+esc(ini)+'</div>'
      +'<div class="hd-sb-hero-text"><div class="hd-sb-hero-name">'+esc(P.name)+'</div>'
        +'<div class="hd-sb-hero-meta">'+esc(P.store)+'<span class="hd-sb-dot">•</span>'+esc(P.email)+'<span class="hd-sb-dot">•</span>'+esc(state.role)+'</div></div>'
      +'<div class="hd-sb-hero-right">'+(state.pfEdit?'<span class="sc-editing-pill">'+ICO_EDIT+' Editing</span>'
        :'<button class="lp-sb-view-edit-btn" type="button" onclick="scProfileEdit()">'+ICO_EDIT+' Edit</button>')+'</div></div>'
    +secHead('Personal Information')
    +(state.pfEdit
      ?'<div class="sc-edit-card sc-pf-edit"><div class="policy-form-grid sc-gl-form is-3col">'+PROFILE_FIELDS.map(function(f){
          return field(f[1],'<input class="ep-form-input" id="pf-'+f[0]+'" type="'+(f[0]==='email'?'email':'text')+'" value="'+esc(P[f[0]])+'">',f[0]!=='address');}).join('')+'</div>'
        +'<div class="sc-edit-actions"><button class="btn-outline" onclick="state.pfEdit=false;scRender()">Cancel</button><button class="btn-primary" onclick="scProfileSave()">Save Changes</button></div></div>'
      :'<div class="lp-sb-detail-grid sc-pf-grid">'+PROFILE_FIELDS.map(function(f){return fieldCard(f[2],f[1],esc(P[f[0]]));}).join('')+'</div>')
    +secHead('Stores','<span class="sc-act-count">'+P.stores.length+' stores</span>')
    +'<ul class="sc-pf-stores">'+stores+'</ul>'
    +secHead('Account Information')
    +'<div class="lp-sb-detail-grid sc-pf-grid">'+fieldCard(ICO.shield,'Role',esc(state.role))+fieldCard(ICO.clock,'Last Login','Today, 9:41 AM')+fieldCard(ICO.check,'Account Status',activeBadge('Active'))+'</div>'
    +'<div class="sc-pf-danger"><div><b>Delete Account</b><span>Removes this account and its access to every store. This cannot be undone.</span></div>'
      +'<button class="btn-outline btn-sm sc-gl-act-danger" type="button" onclick="scProfileDelete()">'+ICO_TRASH+' Delete Account</button></div>'
  +'</div></div>';
}
function scProfileEdit(){state.pfEdit=true;scRender();var f=document.getElementById('pf-store');if(f)f.focus();}
function scProfileSave(){
  var v={};
  for(var i=0;i<PROFILE_FIELDS.length;i++){var k=PROFILE_FIELDS[i][0];v[k]=((document.getElementById('pf-'+k)||{}).value||'').trim();
    if(!v[k]&&k!=='address'){scToast('Enter the '+PROFILE_FIELDS[i][1].toLowerCase(),'error');return;}}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)){scToast('Enter a valid email','error');return;}
  if(!/^\d{6}$/.test(v.zip)){scToast('Zip code must be 6 digits','error');return;}
  if(!/^\+?\d{10,13}$/.test(v.phone)){scToast('Enter a valid phone number','error');return;}
  Object.assign(PROFILE,v);state.pfEdit=false;scRender();scToast('Profile updated','success');
}
function scProfileDelete(){
  var foot='<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
    +'<button class="btn-primary sc-btn-danger" onclick="scCloseModal();scToast(\'Account deletion requested\',\'info\',\'This prototype keeps the account - the request is not sent anywhere.\')">Delete Account</button></div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell('Delete Account',PROFILE.name,
    '<p class="sc-confirm-text">Delete <b>'+esc(PROFILE.name)+'</b>? Access to all '+PROFILE.stores.length+' stores ends and this cannot be undone.</p>',foot);
}

/* ══ TEAMS & TEMPLATES ON THE LISTING ENGINE ═══════════════════════════════
   Both pages now open the standard side panel. A team: Details, Members (the
   people in the store's team), Access (its task profiles - the permission
   sets its people get), Workflow (what has happened, step by step) and Logs.
   A template: Details, Permissions and Logs; editing it is the permission
   allocation in place - modules with Select all, each action a checkbox. */

/* the shared permission editor - a draft {role, vertical, perms} in state.permDraft */
function permChipsHTML(vertical,perms){
  var mods=tplModules(vertical).filter(function(m){return (perms[m[0]]||[]).length;});
  if(!mods.length)return '<div class="lp-logs-empty">No permissions given.</div>';
  return '<div class="sc-perm-groups">'+mods.map(function(m){
    return '<div class="sc-perm-group"><div class="sc-perm-gname">'+esc(m[1])+'</div><div class="sc-perm-chips">'
      +perms[m[0]].map(function(a){return '<span class="sc-perm-chip">'+esc(permLabel(m[0],a))+'</span>';}).join('')+'</div></div>';
  }).join('')+'</div>';
}
function permEditorHTML(d){
  if(!d.vertical)return '<div class="lp-logs-empty">Select a vertical to allocate its permissions.</div>';
  return '<div class="sc-perm-edit">'+tplModules(d.vertical).map(function(m){
    var have=d.perms[m[0]]||[],all=have.length===m[2].length;
    return '<div class="sc-perm-emod"><div class="sc-perm-ehead"><b>'+esc(m[1])+'</b>'
        +'<label class="sc-perm-all"><input type="checkbox"'+(all?' checked':'')+' onchange="scPermAll(\''+m[0]+'\',this.checked)"> Select all</label></div>'
      +'<div class="sc-perm-eopts">'+m[2].map(function(a){
        return '<label class="sc-perm-opt"><input type="checkbox"'+(have.indexOf(a)>=0?' checked':'')+' onchange="scPermTog(\''+m[0]+'\',\''+a+'\',this.checked)"> '+esc(permLabel(m[0],a))+'</label>';
      }).join('')+'</div></div>';
  }).join('')+'</div>';
}
function scPermTog(mod,act,on){
  var d=state.permDraft;if(!d)return;var a=d.perms[mod]||(d.perms[mod]=[]),i=a.indexOf(act);
  if(on&&i<0)a.push(act);if(!on&&i>=0)a.splice(i,1);if(!a.length)delete d.perms[mod];
  var m=TPL_MODULES.filter(function(x){return x[0]===mod;})[0],box=document.querySelector('.sc-perm-all input[onchange*="\''+mod+'\'"]');
  if(box&&m)box.checked=(d.perms[mod]||[]).length===m[2].length;
}
function scPermAll(mod,on){
  var d=state.permDraft,m=TPL_MODULES.filter(function(x){return x[0]===mod;})[0];if(!d||!m)return;
  if(on)d.perms[mod]=m[2].slice();else delete d.perms[mod];
  if(state.glOpen)refreshPanel('sc-gl-isb',glPanelHTML(state.glOpen.id));
}
function permsOrdered(vertical,perms){var out={};tplModules(vertical).forEach(function(m){var a=perms[m[0]];if(a&&a.length)out[m[0]]=m[2].filter(function(x){return a.indexOf(x)>=0;});});return out;}
function permCount(perms){return Object.keys(perms).reduce(function(s,k){return s+perms[k].length;},0);}

/* ── TEMPLATES ──────────────────────────────────────────────────────────── */
TEMPLATES.forEach(function(t){t.key=t.id;});
GL.templates={one:'template',noun:'templates',rows:TEMPLATES,
  title:function(t){return t.role;},
  search:{placeholder:'Search by role',fields:['role','vertical']},
  filters:[{k:'vertical',label:'All Verticals',opts:VERTICALS}],
  stats:function(rows){var roles={};rows.forEach(function(t){roles[t.role]=1;});
    return [['Templates',rows.length,'active'],['Roles',Object.keys(roles).length,''],['Verticals',VERTICALS.filter(function(v){return rows.some(function(t){return t.vertical===v;});}).length,'']];},
  cols:[{h:'Role',cell:function(t){var n=permCount(t.perms);return '<div class="lp-c-main">'+esc(t.role)+'</div><div class="lp-c-sub">'+n+(n===1?' permission':' permissions')+'</div>';}},
    {h:'Vertical',cell:function(t){return plain(t.vertical);}},
    {h:'Permissions',cell:function(t){return permsHTML(t);}}],
  del:true,
  tabs:[{id:'perms',label:'Permissions',html:function(t){
    return relHead('templates',t,'Permission Allocation',permCount(t.perms)+' permissions')+permChipsHTML(t.vertical,t.perms);}}],
  /* edit = the permission allocation, in place */
  editStart:function(t){state.permDraft={role:t.role,vertical:t.vertical,perms:JSON.parse(JSON.stringify(t.perms))};},
  editHTML:function(t){var d=state.permDraft;
    return '<div class="sc-edit-card"><div class="policy-form-grid">'
        +field('Template Name','<input class="ep-form-input" value="'+esc(d.role)+'" oninput="state.permDraft.role=this.value">',true)
        +field('Vertical',csField('tpe-vertical',VERTICALS,d.vertical,'Select vertical','scPermVertical'),true)
        +'<div class="ep-form-group ep-form-full"><label class="ep-form-label">Permission Allocation <span class="req">*</span></label>'+permEditorHTML(d)+'</div>'
      +'</div><div class="sc-edit-actions"><button class="btn-outline" onclick="scGlEditCancel()">Cancel</button>'
      +'<button class="btn-primary" onclick="scTplEditSave()">Save Changes</button></div></div>';}};
function scPermVertical(v){
  var d=state.permDraft;if(!d)return;d.vertical=v;
  var ok={};tplModules(v).forEach(function(m){ok[m[0]]=1;});Object.keys(d.perms).forEach(function(k){if(!ok[k])delete d.perms[k];});
  if(state.glOpen)refreshPanel('sc-gl-isb',glPanelHTML(state.glOpen.id));
}
function scTplEditSave(){
  var e=state.glEdit,d=state.permDraft;if(!e||!d)return;var t=glRow('templates',e.key);if(!t)return;
  var role=String(d.role||'').trim();
  if(!role){scToast('Enter the template name','error');return;}
  if(!d.vertical){scToast('Select the vertical','error');return;}
  if(!permCount(d.perms)){scToast('Give the role at least one permission','error');return;}
  if(TEMPLATES.some(function(x){return x.key!==t.key&&x.role.toLowerCase()===role.toLowerCase()&&x.vertical===d.vertical;})){scToast('A '+role+' template already exists for '+d.vertical,'error');return;}
  var before=permCount(t.perms);t.role=role;t.vertical=d.vertical;t.perms=permsOrdered(d.vertical,d.perms);
  glLog('templates',t.key,'Updated permissions',before+' → '+permCount(t.perms)+' permissions');
  state.glEdit=null;state.permDraft=null;scRender();scToast(role+' template updated','success');
}

/* ── TEAMS ──────────────────────────────────────────────────────────────── */
var MEMBER_ROLES=['Owner','Manager','Worker','Security','Delivery Partner'];
function teamMembers(t){
  if(!t.members){
    var first=t.name.split(' ')[0].toLowerCase().replace(/[^a-z]/g,'')||'team',n=1+t.key%3;
    t.members=[{name:'Owner '+t.name.split(' ')[0],email:t.email,mobile:'+9198'+String(45000000+t.key*137).slice(-8),role:'Owner'}];
    if(n>1)t.members.push({name:'Store Manager',email:'manager.'+first+'@gmail.com',mobile:'+9197'+String(31000000+t.key*911).slice(-8),role:'Manager'});
    if(n>2)t.members.push({name:'Security Guard',email:first+'security@gmail.com',mobile:'+9196'+String(70456324+t.key).slice(-8),role:'Security'});
  }
  return t.members;
}
function teamProfiles(t){
  if(!t.profiles)t.profiles=TEMPLATES.filter(function(x){return x.vertical===t.vertical;}).slice(0,2)
    .map(function(x,i){return {id:i+1,role:x.role,perms:JSON.parse(JSON.stringify(x.perms))};});
  return t.profiles;
}
GL.teams={one:'team',noun:'teams',rows:TEAMS,
  title:function(t){return t.name;},
  search:{placeholder:'Search by name, code or email',fields:['name','code','email','key']},
  filters:[{k:'status',label:'Select Status',opts:['Active','Inactive']},{k:'vertical',label:'All Verticals',opts:VERTICALS},
    {k:'sort',label:'Sort by',opts:['Newest first','Oldest first','Name A–Z','Name Z–A'],match:function(){return true;}}],
  sortBy:function(v){return {'Oldest first':function(a,b){return a.key-b.key;},'Name A–Z':function(a,b){return a.name.localeCompare(b.name);},
    'Name Z–A':function(a,b){return b.name.localeCompare(a.name);}}[v]||function(a,b){return b.key-a.key;};},
  stats:function(rows){return [['All Teams',rows.length,'active'],['Active',rows.filter(function(t){return t.status==='Active';}).length,'approved'],
    ['Inactive',rows.filter(function(t){return t.status==='Inactive';}).length,'']];},
  cols:[{h:'Key',cell:function(t){return plain(t.key);}},{h:'Team Name',cell:function(t){return mainTxt(t.name);}},
    {h:'Team Code',cell:function(t){return '<span class="sc-mono">'+esc(t.code)+'</span>';}},{h:'Team Email',cell:function(t){return mailCell(t.email);}},
    {h:'Vertical',cell:function(t){return plain(t.vertical);}},{h:'Date',cell:function(t){return plain(t.date);}},
    {h:'Status',cell:function(t){return activeBadge(t.status);}}],
  form:[{k:'name',label:'Team Name',req:true,ph:'e.g. Zing Grocery'},{k:'email',label:'Team Email',type:'email',req:true,ph:'owner@store.com'},
    {k:'vertical',label:'Vertical',type:'select',opts:VERTICALS,req:true}],
  defaults:function(){var code=TEAMS.reduce(function(m,x){return Math.max(m,+x.code.split(':')[1]);},0);return {code:'store:'+(code+1),date:stamp().date,status:'Active'};},
  toggle:onOff,
  tabs:[
    {id:'members',label:'Members',html:function(t){
      var ms=teamMembers(t),se=state.glSub,ed=se&&se.kind==='member'&&se.key===t.key?se:null;
      var form=ed?'<div class="sc-edit-card sc-sub-edit"><div class="policy-form-grid">'
          +field('Name','<input class="ep-form-input" id="tmm-name" value="'+esc(ed.v.name)+'">',true)
          +field('Email','<input class="ep-form-input" id="tmm-email" type="email" value="'+esc(ed.v.email)+'">',true)
          +field('Mobile','<input class="ep-form-input" id="tmm-mobile" value="'+esc(ed.v.mobile)+'" placeholder="+91">',true)
          +field('Designation',csField('tmm-role',MEMBER_ROLES,ed.v.role,'Select designation'),true)
        +'</div><div class="sc-edit-actions"><button class="btn-outline" onclick="scSubCancel()">Cancel</button>'
        +'<button class="btn-primary" onclick="scMemberSave()">'+(ed.idx<0?'Add Member':'Save Changes')+'</button></div></div>':'';
      var rows=ms.map(function(m,i){return '<tr>'+td(i+1)+td(m.name)+td(m.email)+td(m.mobile)+td(m.role)
        +'<td><div class="sc-gl-acts"><button class="lp-action-btn" type="button" title="Edit member" aria-label="Edit '+esc(m.name)+'" onclick="scMemberEdit('+t.key+','+i+')">'+ICO_EDIT+'</button>'
        +'<button class="lp-action-btn sc-del-btn" type="button" title="Remove member" aria-label="Remove '+esc(m.name)+'" onclick="scMemberDel('+t.key+','+i+')">'+ICO_TRASH+'</button></div></td></tr>';}).join('');
      return glHero('teams',t,false)
        +secHead('Team Member Details',ed?'':'<button class="btn-primary btn-sm" type="button" onclick="scMemberEdit('+t.key+',-1)">'+ICO.plus+' Add Member</button>')
        +form+(ms.length?recTable(['S.No','Name','Email','Mobile','Designation','Action'],rows):'<div class="lp-logs-empty">No members yet.</div>');
    }},
    {id:'access',label:'Access',html:function(t){
      var ps=teamProfiles(t),se=state.glSub,ed=se&&se.kind==='profile'&&se.key===t.key?se:null;
      if(ed){
        var d=state.permDraft;
        return glHero('teams',t,false)+secHead(ed.idx<0?'Add Task Profile':'Edit Task Profile')
          +'<div class="sc-edit-card sc-sub-edit"><div class="policy-form-grid">'
            +(ed.idx<0?field('Start From Template',csField('tpp-from',TEMPLATES.filter(function(x){return x.vertical===t.vertical;}).map(function(x){return x.role;}),ed.from||'','Select a template','scProfileFrom'),false):'')
            +field('Profile Name','<input class="ep-form-input" value="'+esc(d.role)+'" oninput="state.permDraft.role=this.value">',true)
            +'<div class="ep-form-group ep-form-full"><label class="ep-form-label">Permission Allocation <span class="req">*</span></label>'+permEditorHTML(d)+'</div>'
          +'</div><div class="sc-edit-actions"><button class="btn-outline" onclick="scSubCancel()">Cancel</button>'
          +'<button class="btn-primary" onclick="scProfileSaveTP()">'+(ed.idx<0?'Add Task Profile':'Save Changes')+'</button></div></div>';
      }
      return glHero('teams',t,false)
        +secHead('Roles & Permissions — '+t.name,'<button class="btn-primary btn-sm" type="button" onclick="scProfileEditTP('+t.key+',-1)">'+ICO.plus+' Add Task Profile</button>')
        +(ps.length?ps.map(function(p,i){
          return '<div class="sc-tp-card"><div class="sc-tp-head"><div><b>'+esc(p.role)+'</b><span class="lp-c-sub">'+permCount(p.perms)+' permissions</span></div>'
            +'<div class="sc-gl-acts"><button class="lp-action-btn" type="button" title="Edit task profile" aria-label="Edit '+esc(p.role)+'" onclick="scProfileEditTP('+t.key+','+i+')">'+ICO_EDIT+'</button>'
            +'<button class="lp-action-btn sc-del-btn" type="button" title="Delete task profile" aria-label="Delete '+esc(p.role)+'" onclick="scProfileDelTP('+t.key+','+i+')">'+ICO_TRASH+'</button></div></div>'
            +permChipsHTML(t.vertical,p.perms)+'</div>';}).join('')
          :'<div class="lp-logs-empty">No task profiles yet.</div>');
    }},
    {id:'workflow',label:'Workflow',html:function(t){
      var steps=[{s:'Team Created',sub:'Registered',from:'Admin Portal',when:t.date}].concat((t._log||[]).slice().reverse().map(function(l){
        return {s:l.text,sub:l.comment||'—',from:l.who+(l.role?' · '+l.role:''),when:l.date+(l.time?' · '+l.time:'')};}));
      return glHero('teams',t,false)+secHead('Workflow Details')
        +recTable(['S.No','Status','Sub Status','Add From','Time'],steps.map(function(x,i){return '<tr>'+td(i+1)+'<td><b>'+esc(x.s)+'</b></td>'+td(x.sub)+td(x.from)+td(x.when)+'</tr>';}).join(''));
    }}
  ]};
/* members and task profiles are edited in the tab, as everything else is */
function scSubCancel(){state.glSub=null;state.permDraft=null;state.glDraft=null;state.pfPop=false;state.seqEdit=null;if(state.glOpen)refreshPanel('sc-gl-isb',glPanelHTML(state.glOpen.id));}
function scMemberEdit(key,idx){
  var t=glRow('teams',key);if(!t)return;var m=idx>=0?teamMembers(t)[idx]:{name:'',email:'',mobile:'',role:''};
  state.glSub={kind:'member',key:key,idx:idx,v:Object.assign({},m)};refreshPanel('sc-gl-isb',glPanelHTML('teams'));
  setTimeout(function(){var f=document.getElementById('tmm-name');if(f)f.focus();},0);
}
function scMemberSave(){
  var se=state.glSub,t=se&&glRow('teams',se.key);if(!t)return;
  var v=function(id){return ((document.getElementById(id)||{}).value||'').trim();};
  var m={name:v('tmm-name'),email:v('tmm-email'),mobile:v('tmm-mobile'),role:csValue('tmm-role')};
  if(!m.name){scToast('Enter the name','error');return;}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m.email)){scToast('Enter a valid email','error');return;}
  if(!/^\+?\d{10,13}$/.test(m.mobile.replace(/\s/g,''))){scToast('Enter a valid mobile number','error');return;}
  if(!m.role){scToast('Select the designation','error');return;}
  var ms=teamMembers(t);if(se.idx<0)ms.push(m);else ms[se.idx]=m;
  glLog('teams',t.key,(se.idx<0?'Added member ':'Updated member ')+m.name);state.glSub=null;scRender();scToast(m.name+(se.idx<0?' added':' updated'),'success');
}
function scMemberDel(key,idx){
  var t=glRow('teams',key),m=t&&teamMembers(t)[idx];if(!m)return;
  var foot='<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
    +'<button class="btn-primary sc-btn-danger" onclick="scMemberDelGo('+key+','+idx+')">Remove</button></div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell('Remove Member',t.name,'<p class="sc-confirm-text">Remove <b>'+esc(m.name)+'</b> from '+esc(t.name)+'?</p>',foot);
}
function scMemberDelGo(key,idx){var t=glRow('teams',key);var m=teamMembers(t).splice(idx,1)[0];glLog('teams',key,'Removed member '+m.name);scCloseModal();scRender();scToast(m.name+' removed','info');}
function scProfileEditTP(key,idx){
  var t=glRow('teams',key);if(!t)return;var p=idx>=0?teamProfiles(t)[idx]:{role:'',perms:{}};
  state.glSub={kind:'profile',key:key,idx:idx};state.permDraft={role:p.role,vertical:t.vertical,perms:JSON.parse(JSON.stringify(p.perms))};
  refreshPanel('sc-gl-isb',glPanelHTML('teams'));
}
function scProfileFrom(v){
  var se=state.glSub,t=se&&glRow('teams',se.key),x=t&&TEMPLATES.filter(function(y){return y.vertical===t.vertical&&y.role===v;})[0];if(!x)return;
  se.from=v;state.permDraft={role:x.role,vertical:t.vertical,perms:JSON.parse(JSON.stringify(x.perms))};refreshPanel('sc-gl-isb',glPanelHTML('teams'));
}
function scProfileSaveTP(){
  var se=state.glSub,d=state.permDraft,t=se&&glRow('teams',se.key);if(!t||!d)return;
  var role=String(d.role||'').trim();if(!role){scToast('Enter the profile name','error');return;}
  if(!permCount(d.perms)){scToast('Give the profile at least one permission','error');return;}
  var ps=teamProfiles(t),p={id:se.idx<0?ps.reduce(function(m,x){return Math.max(m,x.id);},0)+1:ps[se.idx].id,role:role,perms:permsOrdered(t.vertical,d.perms)};
  if(se.idx<0)ps.push(p);else ps[se.idx]=p;
  glLog('teams',t.key,(se.idx<0?'Added task profile ':'Updated task profile ')+role);state.glSub=null;state.permDraft=null;state.glDraft=null;state.pfPop=false;state.seqEdit=null;scRender();scToast(role+(se.idx<0?' added':' updated'),'success');
}
function scProfileDelTP(key,idx){
  var t=glRow('teams',key),p=t&&teamProfiles(t)[idx];if(!p)return;
  var foot='<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
    +'<button class="btn-primary sc-btn-danger" onclick="scProfileDelGoTP('+key+','+idx+')">Delete</button></div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell('Delete Task Profile',t.name,'<p class="sc-confirm-text">Delete the <b>'+esc(p.role)+'</b> task profile? Members on it lose these permissions.</p>',foot);
}
function scProfileDelGoTP(key,idx){var t=glRow('teams',key);var p=teamProfiles(t).splice(idx,1)[0];glLog('teams',key,'Deleted task profile '+p.role);scCloseModal();scRender();scToast(p.role+' deleted','info');}

Object.assign(PAGE_ACTIONS,{teams:['Create Team',function(){scGlForm('teams');}],templates:['Create Template',function(){scOpenTemplateForm();}]});

/* ── ALL RETAILERS: STORES TAB, DELETE THROUGH LOGS ─────────────────────
   Every store belongs to one retailer (the retailers whose admin type is
   Retailer, in turn). A retailer is deleted from its Logs - Inactive and
   Delete are the steps, as in the system - and is kept as Deleted. */
GL.retailers.filters[1].opts=['Active','Inactive','Deleted'];
GL.retailers.stats=function(rows){return statusStats(rows,'status',[['Active','approved'],['Inactive',''],['Deleted','']]);};
GL.retailers.toggle=null;
GL.retailers.menu=function(r){
  var go=function(lbl,st){return [lbl,'scRetailerSet('+r.key+',\''+st+'\')'];};
  return r.status==='Active'?[go('Inactive','Inactive'),go('Delete','Deleted')]:r.status==='Inactive'?[go('Active','Active'),go('Delete','Deleted')]:[go('Restore','Active')];
};
function scRetailerSet(key,st){var r=glRow('retailers',key);if(!r)return;r.status=st;scToast(r.name+(st==='Deleted'?' deleted':st==='Active'?' is active':' is inactive'),st==='Active'?'success':'info');}
function retailerStores(r){
  var owners=glSrc(GL.retailers).filter(function(x){return x.position==='Retailer';});
  var i=owners.indexOf(r);if(i<0)return [];
  return glSrc(GL.stores).filter(function(st,j){return j%owners.length===i;});
}
var STORE_ADDR={Hyderabad:'Plot 12, HITEC City, Madhapur',Warangal:'2-5-118, Hanamkonda Main Rd',Chennai:'18, Anna Salai, Teynampet',
  Bengaluru:'201-202, Koramangala 5th Block',Pune:'Survey 44, Baner Road',Vijayawada:'MG Road, Labbipet',Mumbai:'Linking Road, Bandra West'};
GL.retailers.tabs=[{id:'stores',label:'Stores',html:function(r){
  var list=retailerStores(r);
  return relHead('retailers',r,'Store Details',list.length+(list.length===1?' store':' stores'))
    +relList(['S.No','Store Name','QR Code','Image','Store Create Time','Location','Sub Domain'],list,function(st,i){
      var made=addD(DASH_TODAY,-((st.key*7)%200)),h=('0'+(st.key%12+8)).slice(-2),m=('0'+(st.key*13%60)).slice(-2);
      return '<tr>'+td(i+1)+'<td><b>'+esc(st.name)+'</b></td>'
        +'<td><span class="sc-qr-mini" title="QR for '+esc(st.name)+'">'+qrSvg(st.key,36)+'</span></td>'
        +'<td><span class="sc-thumb">'+ICO.store+'</span></td>'
        +td(isoDay(made)+' '+h+':'+m)
        +'<td class="sc-loc">'+esc((STORE_ADDR[st.city]||'Main Road')+', '+st.city+', '+st.state+', '+st.country)+'</td>'
        +td(st.retailer==='Business'?'Product':'Service')+'</tr>';
    },r.position==='Retailer'?'No stores yet.':'Only retailers run stores - this is a '+r.position+'.');
}}];

/* ══ STORE PANEL: SECTIONS & LISTS ═════════════════════════════════════════
   Two reusable pieces for detail tabs.
   A SECTION is a group of a record's fields - viewed as field cards (or as
   setting rows), with its own Edit that turns it into the form in place:
   Cancel / Save Changes, logged as "Updated <section>".
   A LIST is a table of things a record holds (holidays, partners, printers),
   with + Add opening its form above the table and a remove that confirms.
   One draft at a time lives in state.glDraft. */
var DAY_ABBR=['S','M','T','W','T','F','S'],DAY_NAME=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var SEC_DEF={},LIST_DEF={};
function secFmt(f,v){
  if(f.type==='switch')return '<span class="sc-onoff'+(v?' is-on':'')+'"><i></i>'+(v?'On':'Off')+'</span>';
  if(f.type==='days')return '<span class="sc-days">'+DAY_ABBR.map(function(d,i){return '<span class="sc-day'+((v||[]).indexOf(i)>=0?' is-on':'')+'" title="'+DAY_NAME[i]+'">'+d+'</span>';}).join('')+'</span>';
  if(f.type==='masked')return v?'<span class="sc-mono">XXXXXXXXXXXX</span>':'<span class="lp-dash">—</span>';
  if(v===''||v==null)return '<span class="lp-dash">—</span>';
  return esc(String(v))+(f.unit?' '+esc(f.unit):'');
}
function draftCtl(f,v){
  var k=f.k;
  if(f.type==='switch')return '<button type="button" role="switch" aria-checked="'+!!v+'" class="sc-switch'+(v?' is-on':'')+'" onclick="scDFlip(\''+k+'\',this)"><span></span></button>';
  if(f.type==='days')return '<span class="sc-days is-edit">'+DAY_ABBR.map(function(d,i){
    return '<button type="button" class="sc-day'+((v||[]).indexOf(i)>=0?' is-on':'')+'" title="'+DAY_NAME[i]+'" aria-pressed="'+((v||[]).indexOf(i)>=0)+'" onclick="scDDay('+i+',this)">'+d+'</button>';}).join('')+'</span>';
  if(f.type==='select'){var o=typeof f.opts==='function'?f.opts():f.opts;return csField('dr-'+k,o,v==null?'':String(v),'Select '+f.label.toLowerCase(),'scDPick');}
  if(f.type==='textarea')return '<textarea class="ep-form-input" oninput="scDInput(\''+k+'\',this.value)">'+esc(v||'')+'</textarea>';
  if(f.type==='file')return '<input class="ep-form-input sc-file-input" type="file" onchange="scDFile(\''+k+'\',this)"'+(f.accept?' accept="'+f.accept+'"':'')+'>';
  return '<input class="ep-form-input" type="'+(f.type==='masked'?'text':f.type||'text')+'" value="'+esc(v==null?'':v)+'" placeholder="'+esc(f.ph||'')+'" oninput="scDInput(\''+k+'\',this.value)">';
}
function scDInput(k,v){if(state.glDraft)state.glDraft.vals[k]=v;}
function scDPick(v,csid){scDInput(csid.replace(/^dr-/,''),v);}
function scDFlip(k,btn){var d=state.glDraft;if(!d)return;d.vals[k]=!d.vals[k];btn.classList.toggle('is-on',d.vals[k]);btn.setAttribute('aria-checked',d.vals[k]);}
function scDDay(i,btn){var d=state.glDraft;if(!d)return;var a=d.vals.days||(d.vals.days=[]),j=a.indexOf(i);if(j<0)a.push(i);else a.splice(j,1);
  btn.classList.toggle('is-on',j<0);btn.setAttribute('aria-pressed',j<0);}
function scDFile(k,inp){var f=inp.files&&inp.files[0],d=state.glDraft;if(!f||!d)return;
  if(f.size>2048*1024){scToast(f.name+' is over 2048 KB','error');inp.value='';return;}d.vals[k]={name:f.name,size:f.size,url:URL.createObjectURL(f)};}
function secFields(def){return def.fields||[].concat.apply([],def.groups.map(function(g){return g[1];}));}
function glPanelRefresh(){if(state.glOpen)refreshPanel('sc-gl-isb',glPanelHTML(state.glOpen.id));}

/* ── a section: view or edit ────────────────────────────────────────────── */
function secBlock(id,r,sec){
  var def=SEC_DEF[sec],obj=def.get(r),d=state.glDraft,editing=!!(d&&d.mode==='sec'&&d.sec===sec&&d.key===r.key);
  var src=editing?d.vals:obj;
  var cell=function(f){return editing?draftCtl(f,src[f.k]):secFmt(f,src[f.k]);};
  var body;
  if(def.groups){
    body='<div class="sc-set">'+def.groups.map(function(g){
      return '<div class="sc-set-group"><div class="sc-set-gtitle">'+esc(g[0])+'</div><div class="sc-set-rows">'
        +g[1].map(function(f){return '<div class="sc-set-row"><span class="sc-set-label">'+esc(f.label)+'</span><span class="sc-set-val">'+cell(f)+'</span></div>';}).join('')+'</div></div>';
    }).join('')+'</div>';
  }else if(editing){
    body='<div class="policy-form-grid">'+def.fields.map(function(f){return field(f.label,cell(f),f.req,f.full||f.type==='textarea'||f.type==='days');}).join('')+'</div>';
  }else body='<div class="lp-sb-detail-grid">'+def.fields.filter(function(f){return !f.editOnly;}).map(function(f){return fieldCard(fieldIco(f.label),f.label,cell(f),f.full);}).join('')+'</div>';
  var edit=editing?'':'<button class="lp-sb-view-edit-btn" type="button" onclick="scSecEdit(\''+id+'\','+r.key+',\''+sec+'\')">'+ICO_EDIT+' Edit</button>';
  return '<div class="sc-sec">'+secHead(def.title,editing?'<span class="sc-editing-pill">'+ICO_EDIT+' Editing</span>':edit)
    +(editing?'<div class="sc-edit-card">'+body+'<div class="sc-edit-actions"><button class="btn-outline" onclick="scDraftCancel()">Cancel</button>'
      +'<button class="btn-primary" onclick="scSecSave()">Save Changes</button></div></div>':body)+'</div>';
}
function scSecEdit(id,key,sec){
  var r=glRow(id,key),def=SEC_DEF[sec];if(!r)return;var obj=def.get(r),vals={};
  secFields(def).forEach(function(f){vals[f.k]=f.type==='days'?(obj[f.k]||[]).slice():obj[f.k];});
  state.glDraft={mode:'sec',id:id,key:key,sec:sec,vals:vals};glPanelRefresh();
}
function scDraftCancel(){state.glDraft=null;glPanelRefresh();}
function scSecSave(){
  var d=state.glDraft;if(!d||d.mode!=='sec')return;var r=glRow(d.id,d.key),def=SEC_DEF[d.sec];if(!r)return;
  var fs=secFields(def),obj=def.get(r);
  for(var i=0;i<fs.length;i++){var f=fs[i],v=d.vals[f.k];
    if(f.req&&(v===''||v==null)){scToast('Enter the '+f.label.toLowerCase(),'error');return;}
    if(f.pattern&&v&&!f.pattern.test(String(v))){scToast(f.label+' is not valid','error');return;}}
  if(fs.some(function(f){return f.type==='days';})&&!(d.vals.days||[]).length){scToast('Pick at least one day','error');return;}
  if(def.check){var why=def.check(d.vals);if(why){scToast(why,'error');return;}}
  var changed=fs.filter(function(f){return !f.editOnly&&JSON.stringify(String(obj[f.k]==null?'':obj[f.k]))!==JSON.stringify(String(d.vals[f.k]==null?'':d.vals[f.k]));});
  if(!changed.length){state.glDraft=null;glPanelRefresh();scToast('No changes to save','info');return;}
  fs.forEach(function(f){if(f.editOnly)return;var v=d.vals[f.k];obj[f.k]=f.type==='number'&&v!==''?+v:v;});
  if(def.after)def.after(r);
  glLog(d.id,d.key,'Updated '+def.title,def.commentKey?String(d.vals[def.commentKey]||'').trim():'');state.glDraft=null;scRender();scToast(def.title+' saved','success');
}

/* ── a list: table, + Add form, remove ──────────────────────────────────── */
function listBlock(id,r,list){
  var def=LIST_DEF[list],rows=def.get(r),d=state.glDraft,adding=!!(d&&d.mode==='list'&&d.list===list&&d.key===r.key);
  var blocked=def.blocked?def.blocked(r):'';
  var form=adding?'<div class="sc-edit-card sc-sub-edit"><div class="policy-form-grid">'+def.fields.map(function(f){return field(f.label,draftCtl(f,d.vals[f.k]),f.req,f.full);}).join('')+'</div>'
    +'<div class="sc-edit-actions"><button class="btn-outline" onclick="scDraftCancel()">Cancel</button>'
    +'<button class="btn-primary" onclick="scListSave()">'+esc(def.addLabel||'Add')+'</button></div></div>':'';
  var add=adding||blocked?'':'<button class="btn-primary btn-sm" type="button" onclick="scListAdd(\''+id+'\','+r.key+',\''+list+'\')">'+ICO.plus+' '+esc(def.addLabel||'Add')+'</button>';
  /* a list may show only some of its rows (a search); each row keeps its real position for remove */
  var view=rows.map(function(x,i){return [x,i];}).filter(function(p){return !def.show||def.show(p[0],r);});
  var table=blocked?'<div class="lp-logs-empty">'+esc(blocked)+'</div>':view.length?recTable(['S.No'].concat(def.cols.map(function(c){return c[1];})).concat(def.noDelete?[]:['Action']),view.map(function(p,n){var x=p[0],i=p[1];
      return '<tr><td>'+(n+1)+'</td>'+def.cols.map(function(c){return '<td>'+(c[2]?c[2](x):esc(x[c[0]]==null||x[c[0]]===''?'—':String(x[c[0]])))+'</td>';}).join('')
        +(def.noDelete?'':'<td><button class="lp-action-btn sc-del-btn" type="button" title="Remove" aria-label="Remove" onclick="scListDel(\''+id+'\','+r.key+',\''+list+'\','+i+')">'+ICO_TRASH+'</button></td>')+'</tr>';
    }).join('')):'<div class="lp-logs-empty">'+esc(def.empty||'No data found.')+'</div>';
  return '<div class="sc-sec">'+secHead(def.title,add)+form+table+'</div>';
}
function scListAdd(id,key,list){var def=LIST_DEF[list],vals={};def.fields.forEach(function(f){vals[f.k]=f.def||'';});state.glDraft={mode:'list',id:id,key:key,list:list,vals:vals};glPanelRefresh();
  setTimeout(function(){var f=document.querySelector('#sc-gl-sb .sc-sub-edit .ep-form-input, #sc-gl-sb .sc-sub-edit .cs-trigger');if(f)f.focus();},0);}
function scListSave(){
  var d=state.glDraft;if(!d||d.mode!=='list')return;var r=glRow(d.id,d.key),def=LIST_DEF[d.list];if(!r)return;
  for(var i=0;i<def.fields.length;i++){var f=def.fields[i];if(f.req&&!d.vals[f.k]){scToast((f.type==='select'?'Select ':f.type==='file'?'Choose ':'Enter ')+'the '+f.label.toLowerCase(),'error');return;}}
  var row=def.make?def.make(d.vals,r):Object.assign({},d.vals);if(!row)return;
  def.get(r).push(row);if(def.after)def.after(r);
  glLog(d.id,d.key,'Added '+def.one+(row.name?' '+row.name:''));state.glDraft=null;scRender();scToast(def.one.replace(/^./,function(c){return c.toUpperCase();})+' added','success');
}
function scListDel(id,key,list,i){
  var r=glRow(id,key),def=LIST_DEF[list],x=r&&def.get(r)[i];if(!x)return;
  var foot='<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
    +'<button class="btn-primary sc-btn-danger" onclick="scListDelGo(\''+id+'\','+key+',\''+list+'\','+i+')">Remove</button></div>';
  document.getElementById('sc-modal-root').innerHTML=modalShell('Remove '+def.one,GL[id].title(r),'<p class="sc-confirm-text">Remove this '+esc(def.one)+(x.name?' <b>'+esc(x.name)+'</b>':'')+'?</p>',foot);
}
function scListDelGo(id,key,list,i){var r=glRow(id,key),def=LIST_DEF[list],x=def.get(r).splice(i,1)[0];if(def.after)def.after(r);glLog(id,key,'Removed '+def.one+(x&&x.name?' '+x.name:''));scCloseModal();scRender();scToast(def.one+' removed','info');}

/* ══ ALL STORES ═══════════════════════════════════════════════════════════ */
function storeOwner(st){
  var owners=glSrc(GL.retailers).filter(function(x){return x.position==='Retailer';}),i=glSrc(GL.stores).indexOf(st);
  return owners.length&&i>=0?owners[i%owners.length]:null;
}
var STORE_SETTINGS=[
  ['Order Setting',[['orderCancel','Order Cancellation','switch'],['orderConfirm','Order Confirmation','switch']]],
  ['Tax Setting',[['tax','Enable','switch']]],
  ['Time To Ship',[['ship','Time To Ship (hours)','number']]],
  ['Max Selling Qty',[['maxQty','Max Selling Qty','number']]],
  ['Currency Setting',[['curFmt','Currency Format','select',['Dot','Comma']]]],
  ['Sales Channel',[['sales','Enable','switch']]],
  ['Sales Channels',[['ondc','ONDC','switch'],['mystore','Mystore','switch'],['paytmCh','Paytm','switch'],['bhaiyaa','Bhaiyaa','switch']]],
  ['Payment Settings',[['eventPts','Payment With Event Points','switch'],['razorpay','Razorpay','switch'],['ccavenue','Ccavenue','switch'],['phonepeGw','Phone Pay Gateway','switch'],
    ['coins','Pay With Coins','switch'],['paytm','Paytm','switch'],['phonepeUpi','Phone Pay Upi','switch'],['gpay','Google Pay','switch'],['cod','COD','switch']]],
  ['Store View',[['communityOnly','Community Only','switch']]],
  ['Sound Alert',[['sound','Sound Alert','switch']]],
  ['Group Order',[['groupOrder','Group Order','switch']]],
  ['Store Domain',[['retail','Retail','switch']]],
  ['Payment Configuration',[['payCfg','Payment Configuration','switch']]],
  ['Minimum Order Value',[['mov','Minimum Order Value (₹)','number'],['movOn','MOV Status','switch']]],
  ['Self Booking',[['guestBook','Guest Self Booking','switch'],['selfBook','Self Booking','switch']]],
  ['Store Access',[['walkIn','Walk In','switch'],['distUnit','Distance Measurement','select',['Kilometre','Mile']],['payType','Payment Type','select',['Payment Before','Payment After']],
    ['inventory','Inventory','select',['With Inventory','Without Inventory']],['deliveryBy','Delivery By','select',['Internal Delivery Partner','Logistic Partner','Self']],
    ['coverage','Delivery Coverage (km)','number'],['delivery','Delivery','switch'],['ipNoInv','Instant Payment Without Invoice','switch'],['ipEvent','Instant Payment With Event','switch'],
    ['ipCard','Instant Payment With Card','switch'],['ipCash','Instant Payment With Cash','switch'],['ipInv','Instant Payment With Invoice','switch'],['chargeBuyer','Delivery Charge Bear By Buyer','switch']]],
  ['Delivery Type',[['instDel','Instant Delivery','switch'],['schedDel','Schedule Delivery','switch']]],
  ['Delivery Partner',[['adloggs','Adloggs','switch'],['prodAdd','Product Addition Access','switch'],['prodPrice','Product Pricing Rights','switch'],['slotBook','Slot Booking','switch']]]
].map(function(g){return [g[0],g[1].map(function(f){return {k:f[0],label:f[1],type:f[2],opts:f[3]};})];});
var LBP_LIST=[['Live LBP Store',5,'Sector 70, Mohali','+91 9876001122'],['Mohali LBP Store',125,'Phase 8B, Mohali','+91 9876001133'],['Rakesh LBP',5,'Kharar Road, Mohali','+91 9876001144'],
  ['ShyamStore',5,'Zirakpur Main Road','+91 9876001155'],['ShivLBP',5,'Sector 17, Chandigarh','+91 9876001166']];
var SUPPLIER_LIST=[['Sri Balaji Distributors','Begum Bazaar, Hyderabad','+91 9848011111'],['Metro Wholesale','Kukatpally, Hyderabad','+91 9848022222'],
  ['Apollo Pharma Supply','Ameerpet, Hyderabad','+91 9848033333'],['Fresh Farms Co-op','Shamshabad, Hyderabad','+91 9848044444']];
function storeExt(st){
  if(st.ext)return st.ext;
  var done=Math.round((st.profile||25)/25),own=storeOwner(st),k=st.key;
  var sets={};STORE_SETTINGS.forEach(function(g){g[1].forEach(function(f){sets[f.k]=f.type==='switch'?false:'';});});
  Object.assign(sets,{tax:true,sales:true,bhaiyaa:true,razorpay:true,sound:true,retail:true,payCfg:true,guestBook:true,selfBook:true,walkIn:true,delivery:true,ipNoInv:true,ipCard:true,
    ship:8,maxQty:5,curFmt:'Dot',mov:'',distUnit:'Kilometre',payType:'Payment Before',inventory:'With Inventory',deliveryBy:'Internal Delivery Partner',coverage:2});
  st.ext={
    images:{listing:true,front:true,nearby:true,discounts:true},gallery:[],
    profile:{timezone:'Asia/Kolkata',owner:own?own.name:'',city:st.city,state:st.state,pin:String(500000+k%900),lat:(17.38+(k%50)/1000).toFixed(4),lng:(78.48+(k%70)/1000).toFixed(4),
      subdomain:st.retailer==='Business'?'Product':'Service',category:(STORE_CATS[k%STORE_CATS.length]||'Grocery Retail'),
      location:(STORE_ADDR[st.city]||'Main Road')+', '+st.city+', '+st.state+', India',currency:'INR',country:st.country||'India',
      mobile:'+91-94'+String(18464861+k).slice(-8),email:own?own.email:'store'+k+'@opendhi.com',created:fmtDate(addD(DASH_TODAY,-((k*7)%200))),house:String(3000+k%300),
      short:st.name+' - everyday essentials near you.',long:st.name+' serves the neighbourhood with quality products and quick delivery.'},
    sched:{type:'Daily',open:'08:00',close:'22:00',days:[0,1,2,3,4,5,6],cutoff:'20:00'},intervals:[],holidays:[],
    settings:sets,
    bank:done>=2?{branch:'Axis Bank',addr:'Madhapur Branch, Hyderabad',ifsc:'UTIB000'+(1000+k%9000),holder:own?own.name:st.name,acct:'9180100'+String(k*7919).slice(-8)}:{branch:'',addr:'',ifsc:'',holder:'',acct:''},
    kyc:done>=3?{btype:'Proprietorship',pan:'ABCPE'+(1000+k%9000)+'K',aadhaar:'Uploaded',tan:'HYDS'+(10000+k)+'A',gst:'36ABCPE'+(1000+k%9000)+'K1Z5',cin:'',fssai:'1362'+String(k*31).slice(-8),msme:'',linked:'Yes'}
      :{btype:'',pan:'',aadhaar:'Not Uploaded',tan:'',gst:'',cin:'',fssai:'',msme:'',linked:'No'},kycFiles:[],
    addons:{pos:false,soundbox:false},
    lbps:done>=4?[{name:LBP_LIST[0][0],addr:LBP_LIST[0][2],rate:LBP_LIST[0][1],phone:LBP_LIST[0][3],status:'Active'}]:[],suppliers:[],
    merchant:{name:'',keyId:'',secret:'',gateway:'razorpay'},soundboxes:[],posList:[],printers:[],agents:[],
    flow:[{st:'Active',c:'Active',amt:'',when:'09 Oct, 2026 05:51:47 PM',by:own?own.name:'System'},{st:'Enable',c:'Enable',amt:'',when:'09 Oct, 2026 05:52:11 PM',by:own?own.name:'System'}]
  };
  return st.ext;
}
/* profile completion: the four parts the system scores */
function storeCompletion(st){
  var x=storeExt(st),p=x.profile;
  var parts=[['Basic Details',!!(p.location&&p.mobile&&p.email&&p.pin)],['KYC Details',!!(x.kyc.pan&&x.kyc.gst)],
    ['Bank Details',!!(x.bank.acct&&x.bank.ifsc)],['Delivery + Location',!!(x.lbps.length&&p.lat&&p.lng)]];
  return {parts:parts,pct:parts.filter(function(q){return q[1];}).length*25};
}
function storeSync(st){st.profile=storeCompletion(st).pct;}
SEC_DEF.storeProfile={title:'Store Profile',get:function(r){return storeExt(r).profile;},after:storeSync,fields:[
  {k:'timezone',label:'Store Timezone',type:'select',opts:['Asia/Kolkata','Asia/Dubai','Europe/Brussels'],req:true},{k:'owner',label:'Retailer Name'},
  {k:'pin',label:'Pin Code',req:true,pattern:/^\d{4,6}$/},{k:'lat',label:'Latitude',type:'number'},{k:'lng',label:'Longitude',type:'number'},
  {k:'subdomain',label:'Sub Domain',type:'select',opts:['Product','Service']},{k:'category',label:'Store Category',type:'select',opts:STORE_CATS},
  {k:'currency',label:'Store Currency',type:'select',opts:['INR','USD','EUR']},{k:'mobile',label:'Store Mobile Number',req:true},
  {k:'email',label:'Store Email',type:'email',req:true,pattern:/^[^@\s]+@[^@\s]+\.[^@\s]+$/},{k:'house',label:'House / Flat / Floor Number'},
  {k:'created',label:'Store Created Date'},{k:'location',label:'Store Location',full:true,req:true},
  {k:'short',label:'Short Desc',type:'textarea',full:true},{k:'long',label:'Long Desc',type:'textarea',full:true}]};
SEC_DEF.storeSched={title:'Time Schedule Details',get:function(r){return storeExt(r).sched;},fields:[
  {k:'type',label:'Schedule Type',type:'select',opts:['Daily','Weekdays','Custom'],req:true},{k:'open',label:'Opens At',type:'time',req:true},
  {k:'close',label:'Closes At',type:'time',req:true},{k:'cutoff',label:'Delivery Cut Off Time',type:'time'},{k:'days',label:'Store Days',type:'days',full:true}]};
SEC_DEF.storeSettings={title:'Store Settings',get:function(r){return storeExt(r).settings;},groups:STORE_SETTINGS};
SEC_DEF.storeBank={title:'Bank Account Details',get:function(r){return storeExt(r).bank;},after:storeSync,fields:[
  {k:'branch',label:'Branch Name',req:true},{k:'addr',label:'Branch Address',req:true},{k:'ifsc',label:'Bank’s IFSC Code',req:true,pattern:/^[A-Z]{4}0[A-Z0-9]{6}$/,ph:'e.g. UTIB0001234'},
  {k:'holder',label:'Bank Account Holder’s Name',req:true},{k:'acct',label:'Bank Account Number',req:true,pattern:/^\d{9,18}$/}]};
SEC_DEF.storeKyc={title:'KYC Details',get:function(r){return storeExt(r).kyc;},after:storeSync,fields:[
  {k:'btype',label:'Business Type',type:'select',opts:['Proprietorship','Partnership','Private Limited','LLP']},{k:'pan',label:'PAN Number',type:'masked',pattern:/^[A-Z]{5}\d{4}[A-Z]$/,ph:'ABCDE1234F'},
  {k:'aadhaar',label:'Aadhaar Card',type:'select',opts:['Uploaded','Not Uploaded']},{k:'tan',label:'TAN',type:'masked'},{k:'gst',label:'GST Number',type:'masked'},
  {k:'cin',label:'CIN Number',type:'masked'},{k:'fssai',label:'FSSAI Licence Number',type:'masked'},{k:'msme',label:'MSME Registration Number',type:'masked'},
  {k:'linked',label:'Is PAN & Aadhaar Linked',type:'select',opts:['Yes','No']}]};
SEC_DEF.storeAddons={title:'Add On Services',get:function(r){return storeExt(r).addons;},groups:[['Razorpay',[
  {k:'pos',label:'Are you interested in Razorpay POS solution',type:'switch'},{k:'soundbox',label:'Are you interested in Razorpay Soundbox solution',type:'switch'}]]]};
SEC_DEF.storeMerchant={title:'Merchant Details',get:function(r){return storeExt(r).merchant;},fields:[
  {k:'name',label:'Merchant Name',req:true},{k:'keyId',label:'Razorpay Key Id',req:true},{k:'secret',label:'Razorpay Secret Key',type:'masked',req:true},
  {k:'gateway',label:'Gateway',type:'select',opts:['razorpay','ccavenue','phonepe'],req:true}]};
LIST_DEF.storeIntervals={title:'Intervals',one:'interval',addLabel:'Add',empty:'No intervals added yet.',get:function(r){return storeExt(r).intervals;},
  fields:[{k:'name',label:'Interval Name',req:true,ph:'e.g. Lunch break'},{k:'from',label:'From',type:'time',req:true},{k:'to',label:'To',type:'time',req:true}],
  cols:[['name','Interval'],['from','From'],['to','To']],make:function(v){if(v.to<=v.from){scToast('The end time must be after the start','error');return null;}return {name:v.name,from:v.from,to:v.to};}};
LIST_DEF.storeHolidays={title:'Store Holidays',one:'holiday',addLabel:'Add',empty:'No holidays added yet.',get:function(r){return storeExt(r).holidays;},
  fields:[{k:'date',label:'Date',type:'date',req:true},{k:'name',label:'Reason',req:true,ph:'e.g. Diwali'}],
  cols:[['date','Date',function(x){var d=isoToDate(x.date);return d?fmtDate(d):esc(x.date);}],['name','Reason']]};
LIST_DEF.storeKycFiles={title:'KYC Attachments',one:'attachment',addLabel:'Add Attachments',empty:'No attachments yet.',get:function(r){return storeExt(r).kycFiles;},
  fields:[{k:'doc',label:'Document',type:'select',opts:['PAN Card','Aadhaar Card','GST Certificate','FSSAI Licence','Cancelled Cheque'],req:true},{k:'file',label:'File',type:'file',accept:'image/*,.pdf',req:true}],
  cols:[['doc','Document'],['file','File',function(x){return '<a class="sc-link" href="'+x.file.url+'" download="'+esc(x.file.name)+'">'+esc(x.file.name)+'</a>';}],['size','Size',function(x){return esc(attSize(x.file.size));}]],
  make:function(v){return {name:v.doc,doc:v.doc,file:v.file};}};
LIST_DEF.storeLbps={title:'Logistic Partner Details',one:'logistic partner',addLabel:'Add',empty:'No logistic partners yet.',get:function(r){return storeExt(r).lbps;},after:storeSync,
  fields:[{k:'pick',label:'Logistic Partner',type:'select',req:true,full:true,opts:function(){return LBP_LIST.map(function(x){return x[0]+' ('+x[1]+' Rs./Km)';});}}],
  cols:[['name','Name'],['addr','Address'],['rate','Delivery Charges',function(x){return esc(x.rate+' Rs./Km');}],['phone','Contact Number'],['status','Status',function(x){return activeBadge(x.status);}]],
  make:function(v,r){var x=LBP_LIST.filter(function(q){return v.pick.indexOf(q[0]+' (')===0;})[0];if(!x)return null;
    if(storeExt(r).lbps.some(function(q){return q.name===x[0];})){scToast(x[0]+' is already added','error');return null;}return {name:x[0],addr:x[2],rate:x[1],phone:x[3],status:'Active'};}};
LIST_DEF.storeSuppliers={title:'Supplier Business Partner',one:'supplier',addLabel:'Add',empty:'No supplier business partners yet.',get:function(r){return storeExt(r).suppliers;},
  fields:[{k:'pick',label:'Supplier',type:'select',req:true,full:true,opts:function(){return SUPPLIER_LIST.map(function(x){return x[0];});}}],
  cols:[['name','Name'],['addr','Address'],['phone','Contact Number'],['status','Status',function(x){return activeBadge(x.status);}]],
  make:function(v,r){var x=SUPPLIER_LIST.filter(function(q){return q[0]===v.pick;})[0];if(!x)return null;
    if(storeExt(r).suppliers.some(function(q){return q.name===x[0];})){scToast(x[0]+' is already added','error');return null;}return {name:x[0],addr:x[1],phone:x[2],status:'Active'};}};
LIST_DEF.storeSoundbox={title:'SoundBox Details',one:'soundbox',addLabel:'Add SoundBox Details',empty:'No soundbox added yet.',get:function(r){return storeExt(r).soundboxes;},
  blocked:function(r){return storeExt(r).addons.soundbox?'':'Enable Soundbox from Add On Services first.';},
  fields:[{k:'name',label:'Device Name',req:true},{k:'serial',label:'Serial Number',req:true}],cols:[['name','Device'],['serial','Serial Number']]};
LIST_DEF.storePos={title:'POS Details',one:'POS terminal',addLabel:'Add POS Details',empty:'No POS terminal added yet.',get:function(r){return storeExt(r).posList;},
  blocked:function(r){return storeExt(r).addons.pos?'':'Enable POS from Add On Services first.';},
  fields:[{k:'name',label:'Terminal Name',req:true},{k:'tid',label:'Terminal ID',req:true}],cols:[['name','Terminal'],['tid','Terminal ID']]};
LIST_DEF.storePrinters={title:'Printer Details',one:'printer',addLabel:'Manage Printer Ids',empty:'No data found.',get:function(r){return storeExt(r).printers;},
  fields:[{k:'name',label:'Printer Name',req:true,ph:'e.g. Billing counter'},{k:'pid',label:'Printer Id',req:true}],
  cols:[['name','Name'],['pid','Printer Id'],['at','Created At']],make:function(v){return {name:v.name,pid:v.pid,at:fmtDate(DASH_TODAY)};}};
LIST_DEF.storeAgents={title:'Agent Details',one:'agent',addLabel:'Add Agent',empty:'No agents assigned yet.',get:function(r){return storeExt(r).agents;},
  fields:[{k:'pick',label:'Agent',type:'select',req:true,full:true,opts:function(){return PARTNERS.filter(function(p){return p.status==='Active';}).map(function(p){return p.name;});}}],
  cols:[['name','Name'],['ref','Referral ID'],['mobile','Mobile'],['at','Assigned On']],
  make:function(v,r){var p=PARTNERS.filter(function(q){return q.name===v.pick;})[0];if(!p)return null;
    if(storeExt(r).agents.some(function(q){return q.name===p.name;})){scToast(p.name+' is already assigned','error');return null;}return {name:p.name,ref:p.ref,mobile:p.mobile,at:fmtDate(DASH_TODAY)};}};

/* Basic Details: the store's images, its gallery, then the store's details */
function storeImagesHTML(st){
  var x=storeExt(st);
  var tile=function(k,label){return '<div class="sc-img-slot"><span class="sc-img-label">'+esc(label)+'</span><span class="sc-img-box'+(x.images[k]?' is-set':'')+'">'+(x.images[k]?ICO.store:ICO.noimg)+'</span></div>';};
  var gal=x.gallery.map(function(g,i){return '<div class="sc-gal-item"><img src="'+g.url+'" alt="'+esc(g.name)+'"><button type="button" class="sc-gal-x" title="Remove" aria-label="Remove '+esc(g.name)+'" onclick="scGalDel('+st.key+','+i+')">'+ICO.close+'</button></div>';}).join('');
  return '<div class="sc-sec">'+secHead('Store Images')
    +'<div class="sc-img-row">'+tile('listing','Listing Image')+tile('front','Front Image')+tile('nearby','Nearby Image')+tile('discounts','Discounts Image')+'</div>'
    +'<div class="sc-gal-head">Gallery</div><div class="sc-gal">'+gal
      +'<label class="sc-gal-add"><input type="file" accept="image/*" multiple hidden onchange="scGalAdd('+st.key+',this.files);this.value=\'\'">'
      +'<span class="sc-gal-add-ico">'+ATT_ICO.upload+'</span><span>Max 2048kb</span></label></div></div>';
}
function scGalAdd(key,files){
  var st=glRow('stores',key);if(!st)return;var x=storeExt(st),bad=0,n=0;
  [].forEach.call(files||[],function(f){if(!/^image\//.test(f.type)||f.size>2048*1024){bad++;return;}x.gallery.push({name:f.name,url:URL.createObjectURL(f)});n++;});
  if(n)glLog('stores',key,'Added '+n+(n===1?' gallery image':' gallery images'));
  scRender();if(bad)scToast(bad+(bad===1?' file was':' files were')+' not added','error','Images only, up to 2048 KB each.');
}
function scGalDel(key,i){var st=glRow('stores',key),x=st&&storeExt(st),g=x&&x.gallery.splice(i,1)[0];if(!g)return;URL.revokeObjectURL(g.url);glLog('stores',key,'Removed gallery image');scRender();}

/* status steps for a store - taken in Logs */
GL.stores.menu=function(st){
  var go=function(lbl,s){return [lbl,'scStoreStatus('+st.key+',\''+s+'\')'];};
  return st.status==='Pending'?[go('Approve Store','Active'),go('Reject Store','Inactive')]:st.status==='Active'?[go('Deactivate Store','Inactive')]:[go('Activate Store','Active')];
};
function scStoreStatus(key,s){var st=glRow('stores',key);if(!st)return;st.status=s;storeExt(st).flow.push({st:s,c:'Store '+s.toLowerCase(),amt:'',when:fmtDT(new Date()),by:who()});
  scToast(st.name+' is now '+s.toLowerCase(),s==='Active'?'success':'info');}
GL.stores.detailsExtra=function(st){return storeImagesHTML(st)+secBlock('stores',st,'storeProfile');};
GL.stores.logsExtra=function(st){
  var c=storeCompletion(st),done=c.pct===100,open=!!state.pfPop;
  return '<div class="sc-pfs"><button type="button" class="btn-outline btn-sm sc-pfs-btn" onclick="state.pfPop=!state.pfPop;glPanelRefresh()" aria-expanded="'+open+'">Profile Status '
      +badge(done?'approved':'pending',done?'Complete':'Pending')+ICO_DOWN+'</button>'
    +(open?'<div class="sc-pfs-pop"><div class="sc-pfs-title">Profile Completion Status</div>'
      +'<div class="sc-pfs-overall">Overall Completion: <b>'+c.pct+'%</b></div><span class="sc-credit-track"><span class="sc-credit-fill" style="width:'+c.pct+'%"></span></span>'
      +'<div class="sc-pfs-sub">Section Details</div>'+c.parts.map(function(q){return '<div class="sc-pfs-row'+(q[1]?' is-done':'')+'"><span>'+(q[1]?'✓':'×')+' '+esc(q[0])+'</span><b>'+(q[1]?'25%':'0%')+'</b></div>';}).join('')
      +'</div>':'')+'</div>';
};
function storeFlowHTML(st,id){
  var x=storeExt(st),rows=x.flow.slice().reverse().concat([]);
  (st._log||[]).forEach(function(l){rows.unshift({st:l.text,c:l.comment||'—',amt:'',when:l.date+(l.time?' · '+l.time:''),by:l.who});});
  return recTable(['S.No','Status','Comment','Settlement Amount','Time','Updated By'],rows.map(function(f,i){
    var tone=/Disable|Inactive|Reject|Delete|Removed/.test(f.st)?'unapproved':/Enable|Active|Approve/.test(f.st)?'approved':'active';
    return '<tr>'+td(i+1)+'<td>'+badge(tone,f.st)+'</td>'+td(f.c)+td(f.amt||'—')+td(f.when)+td(f.by)+'</tr>';}).join(''));
}
function storeTab(id,label,fn){return {id:id,label:label,html:function(st){return glHero('stores',st,false)+fn(st);}};}
GL.stores.tabs=[
  storeTab('schedule','Time Schedule',function(st){return secBlock('stores',st,'storeSched')+listBlock('stores',st,'storeIntervals')+listBlock('stores',st,'storeHolidays');}),
  storeTab('settings','Store Settings',function(st){return secBlock('stores',st,'storeSettings');}),
  storeTab('bank','Bank Details',function(st){return secBlock('stores',st,'storeBank');}),
  storeTab('kyc','KYC Details',function(st){return secBlock('stores',st,'storeKyc')+listBlock('stores',st,'storeKycFiles');}),
  storeTab('addons','Add On Services',function(st){return secBlock('stores',st,'storeAddons');}),
  storeTab('lbps','Logistic Partners',function(st){return listBlock('stores',st,'storeLbps');}),
  storeTab('suppliers','Supplier Business Partners',function(st){return listBlock('stores',st,'storeSuppliers');}),
  storeTab('workflow','Workflow',function(st){return secHead('Workflow Details')+storeFlowHTML(st);}),
  storeTab('merchant','Merchant Details',function(st){
    var sub=state.merchTab||'merchant';
    var bar='<div class="dashboard-tabs sc-subtabs">'+[['merchant','Merchant Details'],['soundbox','SoundBox Details'],['pos','POS Details']].map(function(t){
      return '<button type="button" class="tab-btn'+(sub===t[0]?' active':'')+'" onclick="state.merchTab=\''+t[0]+'\';state.glDraft=null;glPanelRefresh()">'+t[1]+'</button>';}).join('')+'</div>';
    return bar+(sub==='merchant'?secBlock('stores',st,'storeMerchant'):sub==='soundbox'?listBlock('stores',st,'storeSoundbox'):listBlock('stores',st,'storePos'));
  }),
  storeTab('printers','Printer Details',function(st){return listBlock('stores',st,'storePrinters');}),
  storeTab('agents','Agent Details',function(st){return listBlock('stores',st,'storeAgents');})
];

/* ══ STORE CATEGORIES: the configuration a category gives its stores ══════ */
var STORECAT_CFG=[
  ['Order Value',[{k:'movOn',label:'Minimum Order Value',type:'switch'},{k:'mov',label:'Minimum Order Value (₹)',type:'number'}]],
  ['Store Access',[{k:'payType',label:'Payment Type',type:'select',opts:['payment_before','payment_after']},{k:'invType',label:'Inventory Type',type:'select',opts:['with_inventory','without_inventory']}]],
  ['Order Type',[{k:'delivery',label:'Delivery',type:'switch'},{k:'instant',label:'Instant Payment',type:'switch'},{k:'visit',label:'Store Visit',type:'switch'},
    {k:'schedule',label:'Schedule Delivery',type:'switch'},{k:'instDel',label:'Instant Delivery',type:'switch'},{k:'dine',label:'Dine In',type:'switch'}]],
  ['Order Setting',[{k:'confirm',label:'Order Confirmation',type:'switch'},{k:'credit',label:'Credit',type:'switch'}]]
];
function storecatCfg(c){
  if(!c.cfg){var food=/Restaurant|Bakery|Rooms/.test(c.name);
    c.cfg={movOn:true,mov:1,payType:food?'payment_before':'payment_after',invType:/Service|Rooms|Salon|Fitness|Education|Events/.test(c.name)?'without_inventory':'with_inventory',
      delivery:!/Service|Rooms/.test(c.name),instant:false,visit:true,schedule:false,instDel:false,dine:food,confirm:false,credit:false};}
  return c.cfg;
}
SEC_DEF.storecatCfg={title:'Category Configuration',get:storecatCfg,groups:STORECAT_CFG};
GL.storecats.detailsExtra=function(c){return secBlock('storecats',c,'storecatCfg');};
GL.storecats.tabs=[{id:'workflow',label:'Workflow',html:function(c){
  var rows=[{s:'Created',c:'Category added',w:'—',by:'System'}].concat((c._log||[]).slice().reverse().map(function(l){return {s:l.text,c:l.comment||'—',w:l.date+(l.time?' · '+l.time:''),by:l.who};}));
  return glHero('storecats',c,false)+secHead('Workflow Details')+recTable(['S.No','Status','Comment','Time','Updated By'],rows.map(function(x,i){return '<tr>'+td(i+1)+'<td><b>'+esc(x.s)+'</b></td>'+td(x.c)+td(x.w)+td(x.by)+'</tr>';}).join(''));
}}];

GL.stores.detailsLabel='Basic Details';
/* the listing's report links and Login are row actions, not details */
GL.stores.cols.forEach(function(c){if(/^(Reports|Activity)$/.test(c.h))c.noDetail=true;});
/* ── TAGS: the tag's image above its details, and its Workflow ─────────── */
/* the standard Workflow tab: Created, then every step taken on the record */
function wfTab(id){return {id:'workflow',label:'Workflow',html:function(r){
  var made=r.created||r.date||'—';
  var rows=[{s:'Created',c:glOneCap(GL[id])+' added',w:String(made),by:r.by||'System'}].concat((r._log||[]).slice().reverse().map(function(l){return {s:l.text,c:l.comment||'—',w:l.date+(l.time?' · '+l.time:''),by:l.who};}));
  return glHero(id,r,false)+secHead('Workflow Details')+recTable(['S.No','Status','Comment','Time','Updated By'],rows.map(function(x,i){
    var tone=/Inactive|Deactivate|Delete|Reject|Removed/.test(x.s)?'unapproved':/Active|Created|Approve/.test(x.s)?'approved':'active';
    return '<tr>'+td(i+1)+'<td>'+badge(tone,x.s)+'</td>'+td(x.c)+td(x.w)+td(x.by)+'</tr>';}).join(''));
}};}
GL.tags.cols.forEach(function(c){if(c.h==='Tag Image')c.noDetail=true;});
GL.tags.detailsTop=function(r){
  var img=r.img?'<img src="'+r.img.url+'" alt="'+esc(r.name)+'">':'<span class="sc-tag-img sc-tag-img-lg'+(r.type==='Community'?' is-comm':'')+'">'+(r.type==='Community'?ICO.users:ICO.tag)+'</span>';
  return '<div class="sc-qr-big sc-tag-big"><span class="sc-qr-frame sc-tag-frame">'+img+'</span>'
    +'<div class="sc-qr-meta"><b>'+esc(r.name)+'</b><span>'+esc(r.type)+' · '+esc(r.category)+'</span>'
    +'<label class="btn-outline btn-sm sc-tag-up"><input type="file" accept="image/*" hidden onchange="scTagImage('+r.key+',this.files[0]);this.value=\'\'">'+ATT_ICO.upload+' '+(r.img?'Change Image':'Upload Image')+'</label></div></div>';
};
function scTagImage(key,f){
  var r=glRow('tags',key);if(!r||!f)return;
  if(!/^image\//.test(f.type)||f.size>2048*1024){scToast('Choose an image up to 2048 KB','error');return;}
  if(r.img)URL.revokeObjectURL(r.img.url);r.img={name:f.name,url:URL.createObjectURL(f)};glLog('tags',key,'Updated tag image');scRender();scToast('Tag image updated','success');
}
GL.tags.tabs=[wfTab('tags')];

/* ══ RETAIL ORDERS: ROWS THAT OPEN, AND THE ORDER PANEL ════════════════════
   An order row shows the minimum - when, who, which order, its type and
   status - and opens in place (▾) for the phone, address, amount, platform,
   slot and payment. The panel carries the system's order tabs: Details,
   Products, Order Details, Store, User, Workflow (a plain table, as every
   module other than Deals / Purchase Orders), Logs, Payment Info and Payment
   Transactions. */
function scGlExpand(id,key){if(!state.glExp)state.glExp={};var k=id+':'+key;state.glExp[k]=!state.glExp[k];scRender();}
function scRetailOrderTab(key,tab){var id=state.page;scGlOpen(id,key);if(state.glOpen&&state.glOpen.key===key)scGlTab(tab);}
ORDER_CARD_COLS[1].brief=function(o){return '<div class="sc-ord-lines"><span>'+ICO.user+esc(o.user)+'</span></div>';};
ORDER_CARD_COLS[2].brief=function(o){return '<div class="sc-ord-kv"><div><em>Sales Order ID</em><b>'+o.key+'</b></div></div>';};
ORDER_CARD_COLS[3].brief=function(o){return '<div class="sc-ord-kv"><div><em>Order Type</em><b>'+esc(o.type)+'</b></div></div>';};
ORDER_CARD_COLS[4].brief=function(o){return '<div class="sc-ord-kv"><div><em>Current Status</em>'+orderTone(o.status)+'</div></div>';};

function orderExt(o){
  if(o.ext)return o.ext;
  var pool=PRODUCTS.filter(function(p){return p.storeId===o.storeId;});if(!pool.length)pool=PRODUCTS;
  var n=Math.min(pool.length,1+o.key%3),items=[],left=o.amount;
  for(var i=0;i<n;i++){var p=pool[(o.key+i)%pool.length],qty=1+(o.key+i)%2,amt=i===n-1?left:Math.max(1,Math.round(o.amount/n));left-=amt;
    items.push({key:p.key,name:p.name,qty:qty,amount:Math.max(0,amt),status:o.status==='Cancelled'?'Rejected':o.status==='Completed'?'Delivered':o.status==='Refund'?'Refunded':o.status==='Pending'?'Pending':'Accepted'});}
  var paid=o.payment==='Completed'||o.payment==='Refunded'||o.status==='Paid';
  var tx=[];if(paid)tx.push({id:7928+o.key%50,gw:'Online',method:'Online',status:'Completed',ref:'Online_'+(1791550477+o.key)+'_'+(3700+o.key%99)});
  if(o.payment==='Refunded'||o.status==='Refund')tx.push({id:7932+o.key%50,gw:'Online',method:'Online',status:'Refund Initiated',ref:'rfnd_'+(o.payId||'T'+o.key.toString(36)).slice(-12)});
  if(o.payment==='Failed')tx.push({id:7925+o.key%50,gw:'Online',method:'Online',status:'Failed',ref:'Online_'+(1791550400+o.key)});
  o.ext={dealId:35800+o.key%97,domain:'retail',category:o.type==='Store Visit'||o.type==='Instant Payment'?'offline':'online',txnId:13600+o.key%999,
    items:items,tx:tx,delivery:o.type==='Delivery'&&o.status!=='Cancelled'?(o.amount>500?0:40):0,
    cancelReason:o.status==='Cancelled'?'Address not found':'',cancelId:o.status==='Cancelled'?'014':'',cancelledBy:o.status==='Cancelled'?String(o.storeId):''};
  return o.ext;
}
function orderStoreRow(o){return glSrc(GL.stores).filter(function(s){return s.key===o.storeId;})[0];}
function orderFlow(o){
  var t=function(d){return fmtDT(d);},rows=[{st:'In Progress',sub:'Order created by '+o.user,pos:'User',at:t(o.created)}];
  var paid=o.payment==='Completed'||o.payment==='Refunded';
  if(paid)rows.push({st:'Payment Completed',sub:'Payment completed by '+o.user,pos:'User',at:t(new Date(o.created.getTime()+35e3))});
  if(o.status==='Completed')rows.push({st:'Order Completed',sub:'Completed by '+o.store,pos:'Retailer',at:t(o.updated)});
  if(o.status==='Refund')rows.push({st:'Refund Initiated',sub:'Refund initiated by Super Admin',pos:'Superadmin',at:t(o.updated)});
  if(o.status==='Cancelled'){if(paid)rows.push({st:'Refund Initiated',sub:'Refund initiated by '+o.store,pos:'Superadmin',at:t(o.updated)});rows.push({st:'Order Cancelled',sub:'by '+o.store,pos:'Retailer',at:t(o.updated)});}
  (o._log||[]).slice().reverse().forEach(function(l){rows.push({st:l.text,sub:l.comment||'—',pos:l.role||'',at:l.date+(l.time?' · '+l.time:'')});});
  return rows.reverse();
}
var orderTabs=function(id){
  var tab=function(t,label,fn){return {id:t,label:label,html:function(o){return glHero(id,o,false)+fn(o,orderExt(o));}};};
  return [
    tab('products','Products',function(o,x){
      var qty=x.items.reduce(function(a,i){return a+i.qty;},0),refund=x.tx.some(function(q){return q.status==='Refund Initiated';});
      return secHead('Product Details')+recTable(['S.No','Key Id','Image','Products','Unit','Amount','Status'],x.items.map(function(i,n){
          return '<tr>'+td(n+1)+td(i.key)+'<td><span class="sc-thumb">'+ICO.cube+'</span></td><td><b>'+esc(i.name)+'</b></td>'+td(i.qty.toFixed(2))+td(inr(i.amount))
            +'<td>'+badge(i.status==='Rejected'||i.status==='Refunded'?'unapproved':i.status==='Pending'?'pending':'approved',i.status)+'</td></tr>';}).join(''))
        +'<div class="lp-sb-detail-grid sc-ord-sum">'+fieldCard(ICO.cube,'Total Quantity',qty)+fieldCard(ICO.truck,'Delivery Charges',x.delivery?inr(x.delivery):'—')
          +fieldCard(ICO.percent,'Total Tax','—')+fieldCard(ICO.tag,'Discount Amount','—')+fieldCard(ICO.coins,'Bhaiyaa Points','—')
          +fieldCard(ICO.money,'Total Amount',inr(o.amount+x.delivery))+fieldCard(ICO.card,'Paid Amount',x.tx.length?inr(o.amount)+' <span class="lp-c-sub">Online Payment</span>':'—')
          +(refund?fieldCard(ICO.refund,'Refund Amount',inr(o.amount)):'')+'</div>';
    }),
    tab('orderinfo','Order Details',function(o,x){
      var st=orderStoreRow(o),set=st?storeExt(st).settings:{};
      return secHead('Order Details')+'<div class="lp-sb-detail-grid">'
        +(o.status==='Cancelled'?fieldCard(ICO.reject||ICO.info,'Cancellation Reason',esc(x.cancelReason))+fieldCard(ICO.hash,'Cancellation Reason Id',esc(x.cancelId))+fieldCard(ICO.user,'Order Cancelled By',esc(x.cancelledBy)):'')
        +fieldCard(ICO.truck,'Delivery Charge Bear',set.chargeBuyer?'Enable':'Disable')+fieldCard(ICO.money,'Delivery Charges Borne',set.chargeBuyer?'buyer':'seller')
        +fieldCard(ICO.cube,'Inventory',esc((set.inventory||'With Inventory').toLowerCase()))+fieldCard(ICO.truck,'LBP Setting',/Internal/.test(set.deliveryBy||'Internal')?'internal':'external')
        +fieldCard(ICO.card,'Payment Method',esc((set.payType||'Payment Before').toLowerCase()))+'</div>';
    }),
    tab('store','Store',function(o){
      var st=orderStoreRow(o),own=st?storeOwner(st):null,x=st?storeExt(st):null;
      if(!st)return secHead('Store Details')+'<div class="lp-sb-detail-grid">'+fieldCard(ICO.hash,'Store ID',o.storeId)+fieldCard(ICO.store,'Store Name',esc(o.store))+'</div>';
      var svc=[];if(x.settings.delivery)svc.push('delivery');if(x.settings.ipCard||x.settings.ipNoInv)svc.push('instant payment');if(x.settings.ipCard)svc.push('instant payment with card');if(x.settings.walkIn)svc.push('walk in');
      return secHead('Store Details')+'<div class="sc-qr-big sc-ord-store"><span class="sc-qr-frame">'+qrSvg(st.key,120)+'</span><div class="sc-qr-meta"><b>'+esc(st.name)+'</b><span>Store QR · '+esc(x.profile.subdomain)+'</span></div></div>'
        +'<div class="lp-sb-detail-grid">'+fieldCard(ICO.hash,'Store ID',st.key)+fieldCard(ICO.store,'Store Name',esc(st.name))
        +fieldCard(ICO.hash,'Retailer ID',own?own.key:'—')+fieldCard(ICO.user,'Retailer Name',own?esc(own.name):'—')+fieldCard(ICO.phone,'Contact Number',esc(x.profile.mobile))
        +fieldCard(ICO.tag,'Sub Domain',esc(x.profile.subdomain))+fieldCard(ICO.tag,'Store Category',esc(x.profile.category))
        +fieldCard(ICO.card,'Payment Method',esc(x.settings.payType.toLowerCase()))+fieldCard(ICO.pin,'Store Location',esc(x.profile.location),true)
        +fieldCard(ICO.check,'Service',esc(svc.join(', ')||'—'),true)+'</div>';
    }),
    tab('user','User',function(o){
      var b=BUYERS.filter(function(q){return q.key===o.userId;})[0];
      return secHead('User Details')+'<div class="lp-sb-detail-grid">'+fieldCard(ICO.hash,'User ID',o.userId)+fieldCard(ICO.user,'User Name',esc(o.user))
        +fieldCard(ICO.doc,'Email',b&&b.email?esc(b.email):'—')+fieldCard(ICO.phone,'Contact No','91 '+esc(o.phone))+'</div>';
    }),
    tab('workflow','Workflow',function(o){
      return secHead('Workflow Details')+recTable(['S.No','Status','Sub Status','Position','Time'],orderFlow(o).map(function(f,i){
        var tone=/Cancel|Reject|Fail/.test(f.st)?'pending':/Refund/.test(f.st)?'pending':/Completed|Accept/.test(f.st)?'approved':'active';
        return '<tr>'+td(i+1)+'<td>'+badge(tone,f.st)+'</td>'+td(f.sub)+td(f.pos||'—')+td(f.at)+'</tr>';}).join(''));
    }),
    tab('payinfo','Payment Info',function(o,x){
      var refund=x.tx.some(function(q){return q.status==='Refund Initiated';});
      return secHead('Basic Amount Details')+'<div class="sc-amt">'
        +'<div class="sc-amt-row"><span>Order Value (+)</span><b>INR '+fmtAmt(o.amount)+'</b></div>'
        +(x.delivery?'<div class="sc-amt-row"><span>Delivery Charges (+)</span><b>INR '+fmtAmt(x.delivery)+'</b></div>':'')
        +(refund?'<div class="sc-amt-row is-neg"><span>Refund (−)</span><b>INR '+fmtAmt(o.amount)+'</b></div>':'')
        +'<div class="sc-amt-row is-total"><span>Net</span><b>INR '+fmtAmt(refund?x.delivery:o.amount+x.delivery)+'</b></div></div>';
    }),
    tab('paytx','Payment Transactions',function(o,x){
      return secHead('Payment Transactions')+(x.tx.length?recTable(['Payment ID','Gateway Type','Payment Method','Payment Status','Payment Reference'],x.tx.map(function(q){
        return '<tr>'+td(q.id)+td(q.gw)+td(q.method)+'<td>'+badge(q.status==='Completed'?'approved':q.status==='Failed'?'unapproved':'closed',q.status)+'</td><td><span class="sc-mono">'+esc(q.ref)+'</span></td></tr>';}).join('')):'<div class="lp-logs-empty">No payment transactions yet.</div>');
    })
  ];
};
function orderDetailFields(o){
  var x=orderExt(o);
  return [['Sales Order Id',o.key,ICO.hash],['Deal Id',x.dealId,ICO.hash],['Domain',x.domain,ICO.tag],['Category',x.category,ICO.tag],['Platform',platformChip(o.platform),ICO.globe],
    ['Create Time',esc(fmtDT(o.created)),ICO.cal],['User Name',esc(o.user),ICO.user],['User Mobile',esc(o.phone),ICO.phone],
    ['Payment Transaction Id',o.payId?'<span class="sc-mono">'+esc(o.payId)+'</span>':'—',ICO.card],['Transaction ID',x.txnId,ICO.hash],
    ['Order Status',orderTone(o.status),ICO.check],['Payment Status',orderTone(o.payment),ICO.check],['Order Delivery Address',esc(o.city),ICO.pin],['Delivery Address Mobile Number','91 '+esc(o.phone),ICO.phone]];
}
['myorders','schedule','ipay','allorders'].forEach(function(id){
  var g=GL[id];if(!g)return;
  g.detailFields=orderDetailFields;g.tabs=orderTabs(id);
  if(g.cols===ORDER_CARD_COLS)g.expandable=true;
});

/* ── INSTANT PAYMENT ORDERS: their own panel; Payment Info in full ─────── */
/* the settlement breakdown the system shows on every order */
function orderPayRows(o,x){
  var v=o.amount,refund=x.tx.some(function(q){return /Refund/.test(q.status);}),r2=function(n){return Math.round(n*100)/100;};
  var pts=r2(v*0.00075),gw=r2(v*0.0185),plat=r2(v*0.10),tax=r2(plat*0.18),tds=r2(v*0.001);
  var rows=[['Order Value',v,'+']];
  if(x.delivery)rows.push(['Delivery Charges',x.delivery,'+']);
  if(refund)rows.push(['Refund',v,'-']);
  rows.push(['Bhaiyaa Points Borne by the Platform (0.075%)',pts,'+'],['Payment Gateway (1.85%)',gw,'-'],['Platform Charges (10%)',plat,'-'],
    ['Tax On Platform Charges (18%)',tax,'-'],['TDS (0.1%)',tds,'-']);
  var net=rows.reduce(function(t,q){return t+(q[2]==='+'?q[1]:-q[1]);},0);
  return {rows:rows,net:r2(net)};
}
var _orderTabsBase=orderTabs;
orderTabs=function(id){
  var tabs=_orderTabsBase(id);
  tabs.forEach(function(t){if(t.id==='payinfo')t.html=function(o){var x=orderExt(o),p=orderPayRows(o,x);
    return glHero(id,o,false)+secHead('Basic Amount Details')+'<div class="sc-amt">'+p.rows.map(function(q){
      return '<div class="sc-amt-row'+(q[2]==='-'?' is-neg':'')+'"><span>'+esc(q[0])+' ('+(q[2]==='-'?'−':'+')+')</span><b>INR '+q[1].toFixed(2)+'</b></div>';}).join('')
      +'<div class="sc-amt-row is-total"><span>Settlement to Store</span><b>INR '+p.net.toFixed(2)+'</b></div></div>';};});
  /* an instant payment has no cart or delivery: no Products, no Order Details */
  return id==='ipay'?tabs.filter(function(t){return t.id!=='products'&&t.id!=='orderinfo';}):tabs;
};
var _orderFlowBase=orderFlow;
orderFlow=function(o){
  if(o.type!=='Instant Payment')return _orderFlowBase(o);
  var t=function(d){return fmtDT(d);},rows=[{st:'Pending',sub:'Order created using instant payment by customer. by '+o.user,pos:'Customer',at:t(o.created)}];
  if(o.payment==='Completed'||o.payment==='Refunded'||o.status==='Paid')rows.push({st:'Payment Completed',sub:'Order completed using instant payment by customer. by '+o.user,pos:'Customer',at:t(new Date(o.created.getTime()+110e3))});
  if(o.status==='Refund')rows.push({st:'Refund Initiated',sub:'Refund initiated by Super Admin',pos:'Superadmin',at:t(o.updated)});
  (o._log||[]).slice().reverse().forEach(function(l){rows.push({st:l.text,sub:l.comment||'—',pos:l.role||'',at:l.date+(l.time?' · '+l.time:'')});});
  return rows.reverse();
};
var _orderExtBase=orderExt;
orderExt=function(o){
  var fresh=!o.ext,x=_orderExtBase(o);
  if(fresh&&o.type==='Instant Payment')x.tx.forEach(function(q){if(q.status==='Completed'){q.gw='RAZORPAY';q.method='card';q.ref=o.payId||q.ref;}});
  return x;
};
GL.ipay.detailFields=function(o){var x=orderExt(o);
  return [['Order Id',o.key+11,ICO.hash],['Sales Order Id',o.key,ICO.hash],['Deal Id',x.dealId,ICO.hash],['Category',x.category,ICO.tag],
    ['Create Time',esc(fmtDT(o.created)),ICO.cal],['User Name',esc(o.user),ICO.user],['User Mobile',esc(o.phone),ICO.phone],
    ['Payment Type','Online',ICO.card],['Order Status',orderTone(o.status),ICO.check]];};
['myorders','schedule','ipay','allorders'].forEach(function(id){if(GL[id])GL[id].tabs=orderTabs(id);});
GL.ipay.detailsLabel='Details';

/* ── DEALS (retail): Deal · Cart · User · Store · Workflow ─────────────── */
function rdealExt(d){
  if(d.ext)return d.ext;
  var storeName=d.store.replace(/\s*\(\d+\)$/,''),rid=(d.store.match(/\((\d+)\)/)||[])[1]||'';
  var ord=ORDERS.filter(function(o){return o.user===d.user;})[0],instant=d.amount===1;
  var n=+String(d.qty).split('/')[1]||1,pool=PRODUCTS.filter(function(p){return p.store===storeName;});if(!pool.length)pool=PRODUCTS;
  var items=instant?[{pid:76293,name:'Instant Payment',price:1,qty:1}]:[];
  for(var i=0;!instant&&i<n;i++){var p=pool[(d.key+i)%pool.length];items.push({pid:p.key,name:p.name,price:Math.round(d.amount/n),qty:1+(i%2)});}
  d.ext={storeName:storeName,retailerId:rid,userId:ord?ord.userId:'—',phone:ord?ord.phone:'—',instant:instant,items:items};
  return d.ext;
}
GL.retaildeals.detailsLabel='Deal';
GL.retaildeals.detailFields=function(d){var x=rdealExt(d);
  return [['Deal Id',d.key,ICO.hash],['Create Time',esc(fmtDT(d.date)),ICO.cal],['Create By',esc(d.user),ICO.user],
    ['Product Name',esc(x.instant?'Instant Payment':x.items.map(function(i){return i.name;}).join(', ')),ICO.cube],['Quantity',esc(String(d.qty).split('/')[0]),ICO.cube],
    ['Deal Amount','INR '+fmtAmt(d.amount),ICO.money],['Category',x.instant?'Offline':'Online',ICO.tag],['Domain','retail',ICO.tag],
    ['Store Name',esc(x.storeName),ICO.store],['User Name',esc(d.user),ICO.user],['Contact No.',esc(x.phone),ICO.phone],['Deal Status',orderTone(d.status),ICO.check]];};
GL.retaildeals.tabs=[
  {id:'cart',label:'Cart',html:function(d){var x=rdealExt(d),act=d.status==='Complete'?'Order Placed':d.status==='Cancelled'?'Removed':'In Cart';
    return glHero('retaildeals',d,false)+secHead('User Cart Detail')+recTable(['S.No','Product Id','Name','Price','Quantity','Date','Action'],x.items.map(function(i,n){
      return '<tr>'+td(n+1)+td(i.pid)+'<td><b>'+esc(i.name)+'</b></td>'+td('INR '+fmtAmt(i.price))+td(i.qty.toFixed(2))+td(fmtDT(d.date))+'<td>'+badge(act==='Order Placed'?'approved':act==='Removed'?'unapproved':'pending',act)+'</td></tr>';}).join(''));}},
  {id:'user',label:'User',html:function(d){var x=rdealExt(d),b=BUYERS.filter(function(q){return q.key===x.userId;})[0];
    return glHero('retaildeals',d,false)+secHead('User Details')+'<div class="lp-sb-detail-grid">'+fieldCard(ICO.hash,'User ID',x.userId)+fieldCard(ICO.user,'User Name',esc(d.user))
      +fieldCard(ICO.doc,'Email',b&&b.email?esc(b.email):'—')+fieldCard(ICO.phone,'Contact No','91 '+esc(x.phone))+'</div>';}},
  {id:'store',label:'Store',html:function(d){var x=rdealExt(d),st=glSrc(GL.stores).filter(function(s){return s.name===x.storeName;})[0];
    if(!st)return glHero('retaildeals',d,false)+secHead('Store Details')+'<div class="lp-sb-detail-grid">'+fieldCard(ICO.store,'Store Name',esc(x.storeName))+fieldCard(ICO.hash,'Retailer ID',esc(x.retailerId))+'</div>';
    var e=storeExt(st);
    return glHero('retaildeals',d,false)+secHead('Store Details')+'<div class="sc-qr-big sc-ord-store"><span class="sc-qr-frame">'+qrSvg(st.key,120)+'</span><div class="sc-qr-meta"><b>'+esc(st.name)+'</b><span>Store QR</span></div></div>'
      +'<div class="lp-sb-detail-grid">'+fieldCard(ICO.hash,'Store ID',st.key)+fieldCard(ICO.store,'Store Name',esc(st.name))+fieldCard(ICO.hash,'Retailer ID',esc(x.retailerId))
      +fieldCard(ICO.phone,'Contact Number',esc(e.profile.mobile))+fieldCard(ICO.tag,'Store Category',esc(e.profile.category))+fieldCard(ICO.pin,'Store Location',esc(e.profile.location),true)+'</div>';}},
  {id:'workflow',label:'Workflow',html:function(d){var t=function(dt){return fmtDT(dt);};
    var rows=[{st:'Deal Created',sub:'Deal created by '+d.user,pos:'Customer',at:t(d.date)}];
    if(d.status==='Complete')rows.push({st:'Order Placed',sub:'Cart placed as an order by '+d.user,pos:'Customer',at:t(new Date(d.date.getTime()+2e3))});
    if(d.status==='Cancelled')rows.push({st:'Deal Cancelled',sub:'Deal cancelled',pos:'Retailer',at:t(new Date(d.date.getTime()+60e3))});
    (d._log||[]).slice().reverse().forEach(function(l){rows.push({st:l.text,sub:l.comment||'—',pos:l.role||'',at:l.date+(l.time?' · '+l.time:'')});});
    rows.reverse();
    return glHero('retaildeals',d,false)+secHead('Workflow Details')+recTable(['S.No','Status','Sub Status','Position','Time'],rows.map(function(f,i){
      return '<tr>'+td(i+1)+'<td>'+badge(/Cancel/.test(f.st)?'unapproved':/Placed|Complete/.test(f.st)?'approved':'active',f.st)+'</td>'+td(f.sub)+td(f.pos||'—')+td(f.at)+'</tr>';}).join(''));}}
];

/* ══ PRODUCT PANEL ═════════════════════════════════════════════════════════
   All Products / Product List open the system's product tabs: Details
   (images, barcode, then the product's groups), Product Settings, Inventory
   (stock by channel, every movement, and the price - changed with a status
   comment, as in the system), Workflow and Logs. */
var PRODUCT_TAXES=[['IGST',5],['CGST',2.5],['SGST',2.5]];
function prodExt(p){
  if(p.ext)return p.ext;var k=p.key,svc=p.itemType==='Service';
  var std=svc?999:[200,32,45,180,285,28,265,175,349,99][k%10],cost=Math.round(std*0.25);
  p.ext={
    images:[{sample:true,name:p.name+' 1'},{sample:true,name:p.name+' 2'}],
    info:{unit:svc?'Session':'Each',domain:'Retail',ean:k%3?'':'890'+String(k*7919).slice(-10),dsn:String(49353969+k%997),taxType:k%4?'Inclusive':'Exclusive',
      hsn:svc?'9987':['1507','3004','0405','1001'][k%4],profile:'Retailer',created:fmtDate(addD(DASH_TODAY,-(k%60))),by:'Pardeep Singh'},
    price:{cost:cost,std:std,offer:Math.max(1,Math.round(std*0.9))},
    mfg:{maker:svc?'':['Cipla','GSK','Amul','Tata Consumer'][k%4],mfgDate:'',expiry:''},
    desc:{short:'Testing product',long:'Testing product'},
    settings:{weigh:false,cod:false,cancel:false,ret:!svc,pickup:false,retDays:svc?0:2,fulfil:svc?'Service':'Delivery',ship:'',maxQty:5},
    inv:[{qty:100,unit:svc?'Session':'Each',status:'Initial Upload',comment:'Initial Upload',sign:1}]
  };
  return p.ext;
}
function prodStock(p){return prodExt(p).inv.reduce(function(t,m){return t+m.sign*(+m.qty||0);},0);}
function prodImagesHTML(id,p){
  var x=prodExt(p);
  var items=x.images.map(function(im,i){
    return '<div class="sc-gal-item">'+(im.url?'<img src="'+im.url+'" alt="'+esc(im.name)+'">':'<span class="sc-gal-sample">'+ICO.cube+'</span>')
      +'<button type="button" class="sc-gal-x" title="Remove" aria-label="Remove image" onclick="scProdImgDel(\''+id+'\','+p.key+','+i+')">'+ICO.close+'</button></div>';}).join('');
  return '<div class="sc-sec">'+secHead('Image <span class="req">*</span>'.replace(/<[^>]+>/g,'')+'')
    +'<div class="sc-gal">'+items+'<label class="sc-gal-add"><input type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" multiple hidden onchange="scProdImgAdd(\''+id+'\','+p.key+',this.files);this.value=\'\'">'
    +'<span class="sc-gal-add-ico">'+ICO.plus+'</span><span>Add image</span></label></div>'
    +'<p class="sc-img-hint">Only JPG, JPEG, PNG files are allowed.</p></div>'
    +'<div class="sc-sec">'+secHead('Barcode')+'<div class="sc-qr-big"><span class="sc-qr-frame">'+qrSvg(p.key,110)+'</span><div class="sc-qr-meta"><b>Barcode Image</b><span>'+esc(p.name)+' · '+p.key+'</span></div></div></div>';
}
function scProdImgAdd(id,key,files){
  var p=glRow(id,key);if(!p)return;var x=prodExt(p),bad=0,n=0;
  [].forEach.call(files||[],function(f){if(!/\.(jpe?g|png)$/i.test(f.name)){bad++;return;}x.images.push({name:f.name,url:URL.createObjectURL(f)});n++;});
  if(n)glLog(id,key,'Added '+n+(n===1?' image':' images'));scRender();if(bad)scToast(bad+(bad===1?' file was':' files were')+' not added','error','Only JPG, JPEG and PNG files are allowed.');
}
function scProdImgDel(id,key,i){
  var p=glRow(id,key),x=p&&prodExt(p);if(!x)return;
  if(x.images.length<=1){scToast('A product needs at least one image','error');return;}
  var im=x.images.splice(i,1)[0];if(im.url)URL.revokeObjectURL(im.url);glLog(id,key,'Removed an image');scRender();
}
SEC_DEF.prodInfo={title:'Product Details',get:function(r){return prodExt(r).info;},fields:[
  {k:'unit',label:'Product Unit',type:'select',opts:['Each','Kg','Litre','Pack','Session'],req:true},{k:'domain',label:'Product Domain',type:'select',opts:['Retail','Wholesale']},
  {k:'ean',label:'EAN'},{k:'dsn',label:'DSN'},{k:'taxType',label:'Tax Type',type:'select',opts:['Inclusive','Exclusive'],req:true},
  {k:'hsn',label:'HSN Code',req:true,pattern:/^\d{4,8}$/}]};
SEC_DEF.prodCat={title:'Category Details',get:function(r){return prodExt(r).info;},fields:[
  {k:'profile',label:'Service Profile',type:'select',opts:['Retailer','Wholesaler','Service Provider']},{k:'created',label:'Create Time'},{k:'by',label:'Create By'}]};
SEC_DEF.prodPrice={title:'Price Details',get:function(r){return prodExt(r).price;},commentKey:'_comment',fields:[
  {k:'std',label:'Standard Price (₹)',type:'number',req:true},{k:'cost',label:'Cost Price (₹)',type:'number',req:true},{k:'offer',label:'Offer Price (₹)',type:'number',req:true},
  {k:'_comment',label:'Status Comment',type:'textarea',req:true,full:true,editOnly:true}],
  check:function(v){if(+v.offer>+v.std)return 'The offer price cannot be above the standard price';if(+v.cost>+v.std)return 'The cost price cannot be above the standard price';return '';}};
SEC_DEF.prodMfg={title:'Manufacturing Details',get:function(r){return prodExt(r).mfg;},fields:[
  {k:'maker',label:'Manufacturer'},{k:'mfgDate',label:'Manufacturing Date',type:'date'},{k:'expiry',label:'Expiry Date',type:'date'}]};
SEC_DEF.prodDesc={title:'Additional Details',get:function(r){return prodExt(r).desc;},fields:[
  {k:'short',label:'Short Description',type:'textarea',full:true},{k:'long',label:'Long Description',type:'textarea',full:true}]};
SEC_DEF.prodSettings={title:'Advanced Product Settings',get:function(r){return prodExt(r).settings;},groups:[['Advanced Product Settings',[
  {k:'weigh',label:'Weighable',type:'switch'},{k:'cod',label:'Cash on Delivery',type:'switch'},{k:'cancel',label:'Cancellable',type:'switch'},
  {k:'ret',label:'Returnable',type:'switch'},{k:'pickup',label:'Seller Pickup',type:'switch'},{k:'retDays',label:'Return Period (days)',type:'number'},
  {k:'fulfil',label:'Fulfilment Type',type:'select',opts:['Delivery','Pickup','Delivery & Pickup','Service']},{k:'ship',label:'Time to Ship (hours)',type:'number'},
  {k:'maxQty',label:'Maximum Quantity Can Be Sold',type:'number'}]]]};
LIST_DEF.prodInv={noDelete:true,title:'Inventory Movements',one:'inventory entry',addLabel:'Add',empty:'No inventory movements yet.',get:function(r){return prodExt(r).inv;},
  fields:[{k:'status',label:'Status',type:'select',opts:['Good Receipt','Good Issued','Damaged','Returned'],req:true},{k:'qty',label:'Quantity',type:'number',req:true},
    {k:'comment',label:'Comment',req:true,full:true,ph:'e.g. Restock from supplier'}],
  cols:[['qty','Quantity',function(m){return esc((m.sign<0?'−':'')+(+m.qty).toFixed(3));}],['unit','Unit'],['status','Status'],['comment','Comment']],
  make:function(v,r){var q=+v.qty;if(!(q>0)){scToast('Enter a quantity above zero','error');return null;}var out=v.status==='Good Issued'||v.status==='Damaged';
    if(out&&q>prodStock(r)){scToast('Only '+prodStock(r)+' in stock','error');return null;}
    return {qty:q,unit:prodExt(r).info.unit,status:v.status,comment:v.comment,sign:out?-1:1};}};
function prodTaxChips(p){var x=prodExt(p);return '<span class="sc-tax-chips">'+PRODUCT_TAXES.map(function(t){return '<span class="sc-tax-chip">'+t[0]+' @ '+t[1].toFixed(2)+'%</span>';}).join('')+'<span class="sc-tax-chip">HSN '+esc(x.info.hsn)+'</span></span>';}
function prodPanel(id){
  var g=GL[id];if(!g)return;
  g.detailFields=function(p){var x=prodExt(p);
    return [['Store Name',esc(p.store),ICO.store],['Product Name',esc(p.name),ICO.cube],['Product ID',p.key,ICO.hash],['Product Type',esc(p.itemType),ICO.tag],
      ['Main Category',esc(p.main),ICO.tag],['Child Category',esc(p.child||'—'),ICO.tag],['Status',activeBadge(p.status),ICO.check],['Tax Applied',prodTaxChips(p),ICO.percent,true]];};
  g.detailsTop=function(p){return prodImagesHTML(id,p);};
  g.detailsExtra=function(p){var x=prodExt(p);
    return secBlock(id,p,'prodInfo')+secBlock(id,p,'prodCat')
      +'<div class="sc-sec">'+secHead('Bhaiyaa/ONDC Details','<button class="btn-outline btn-sm" type="button" onclick="scGlTab(\'inventory\')">Change in Inventory</button>')
      +'<div class="lp-sb-detail-grid">'+fieldCard(ICO.cube,'Quantity',prodStock(p).toFixed(3))+fieldCard(ICO.money,'Cost Price',inr(x.price.cost))
      +fieldCard(ICO.money,'Standard Price',inr(x.price.std))+fieldCard(ICO.money,'Offer Price',inr(x.price.offer))+'</div></div>'
      +secBlock(id,p,'prodMfg')+secBlock(id,p,'prodDesc');};
  g.tabs=[
    {id:'psettings',label:'Product Settings',html:function(p){return glHero(id,p,false)+secBlock(id,p,'prodSettings');}},
    {id:'inventory',label:'Inventory',html:function(p){var total=prodStock(p);
      return glHero(id,p,false)+secHead('Inventory Details')
        +'<div class="sc-inv-cards"><div class="sc-inv-card"><b>'+total+'</b><span>Bhaiyaa</span></div></div>'
        +'<div class="sc-inv-total">Total Inventory : <b>'+total+'</b></div>'
        +listBlock(id,p,'prodInv')+secBlock(id,p,'prodPrice');}},
    wfTab(id)
  ];
}
['allproducts','productlist'].forEach(prodPanel);

/* ── BRANDS & TAX: Details · Workflow · Logs, as in the system ─────────── */
GL.brands.detailFields=function(b){return [['Brand Id',b.key,ICO.hash],['Brand Name',esc(b.name),ICO.tag],['Main Category',esc(b.main),ICO.tag],
  ['Child Category',esc(b.sub),ICO.tag],['Status',activeBadge(b.status),ICO.check]];};
GL.brands.tabs=[wfTab('brands')];
/* a tax is enabled, disabled or deleted from its Logs; deleted taxes are kept */
TAXES.forEach(function(t,i){if(!t.created)t.created=fmtDT(new Date(2026,3,10-(i%9),17,24-(i%20)));t.by=t.retailer;});
var taxState=function(t){return t.status==='Active'?'Enable':t.status==='Deleted'?'Deleted':'Disable';};
GL.tax.toggle=null;
GL.tax.filters[0].opts=['Active','Inactive','Deleted'];
GL.tax.cols.forEach(function(c){if(c.h==='Status')c.cell=function(t){return activeBadge(taxState(t));};});
GL.tax.menu=function(t){
  var go=function(lbl,st){return [lbl,'scTaxSet('+t.key+',\''+st+'\')'];};
  return t.status==='Active'?[go('Disable','Inactive'),go('Delete','Deleted')]:t.status==='Inactive'?[go('Enable','Active'),go('Delete','Deleted')]:[go('Restore','Active')];
};
function scTaxSet(key,st){var t=glRow('tax',key);if(!t)return;t.status=st;scToast(GL.tax.title(t)+(st==='Active'?' enabled':st==='Deleted'?' deleted':' disabled'),st==='Active'?'success':'info');}
GL.tax.detailFields=function(t){return [['ID',t.key,ICO.hash],['Name',esc(t.name),ICO.tag],['Percentage',(+t.pct).toFixed(2),ICO.percent],
  ['Status',activeBadge(taxState(t)),ICO.check],['Created By',esc(t.by||t.retailer),ICO.user],['Created Time',esc(t.created||'—'),ICO.cal]];};
GL.tax.stats=function(rows){return statusStats(rows,'status',[['Active','approved'],['Inactive',''],['Deleted','']]).map(function(s){return [s[0]==='Active'?'Enabled':s[0]==='Inactive'?'Disabled':s[0],s[1],s[2]];});};
GL.tax.tabs=[wfTab('tax')];

/* ── HSN/SAC: Details · Workflow · Logs; Add HSN/SAC is a page, IGST worked out ─ */
GL.hsn.detailFields=function(h){return [['ID',h.key,ICO.hash],['HSN/SAC Code','<span class="sc-mono">'+esc(h.code)+'</span>',ICO.hash],['Type',esc(h.type),ICO.tag],
  ['Description',esc(h.desc),ICO.doc],['CGST Rate',(+h.cgst).toFixed(2),ICO.percent],['SGST Rate',(+h.sgst).toFixed(2),ICO.percent],
  ['IGST Rate',(+h.igst).toFixed(2)+' <span class="lp-c-sub">CGST + SGST</span>',ICO.percent],['Status',activeBadge(h.status),ICO.check]];};
GL.hsn.tabs=[wfTab('hsn')];
/* IGST is never typed: it is CGST + SGST */
GL.hsn.form=GL.hsn.form.filter(function(f){return f.k!=='igst';});
GL.hsn.onSave=function(h){h.cgst=+h.cgst||0;h.sgst=+h.sgst||0;h.igst=Math.round((h.cgst+h.sgst)*100)/100;};
function hsnCheck(v,selfKey){
  if(!/^\d+$/.test(v.code))return 'The code must be digits only';
  if(v.type==='HSN'&&!/^\d{4}(\d{2})?(\d{2})?$/.test(v.code))return 'An HSN code has 4, 6 or 8 digits';
  if(v.type==='SAC'&&!/^99\d{4}$/.test(v.code))return 'A SAC code has 6 digits and starts with 99';
  if(HSNS.some(function(h){return h.code===v.code&&h.key!==selfKey;}))return v.code+' already exists';
  var c=+v.cgst,s=+v.sgst;if(isNaN(c)||isNaN(s)||c<0||s<0||c>14||s>14)return 'CGST and SGST rates are between 0 and 14';
  return '';
}
GL.hsn.check=hsnCheck;
function addHsnHTML(){
  return '<div class="listing-page"><div class="sc-bill-card sc-notice-card">'
    +secHead('HSN/SAC Details')
    +'<div class="policy-form-grid sc-notice-grid">'
      +field('HSN/SAC Code','<input class="ep-form-input" id="hs-code" type="text" inputmode="numeric" maxlength="8" placeholder="Enter HSN/SAC code">',true)
      +field('Type',csField('hs-type',['HSN','SAC'],'HSN','Select type'),true)
      +field('Description','<input class="ep-form-input" id="hs-desc" type="text" placeholder="Enter description">',true)
      +field('CGST Rate (%)','<input class="ep-form-input" id="hs-cgst" type="number" min="0" max="14" step="0.01" placeholder="0.00" oninput="scHsnCalc()">',true)
      +field('SGST Rate (%)','<input class="ep-form-input" id="hs-sgst" type="number" min="0" max="14" step="0.01" placeholder="0.00" oninput="scHsnCalc()">',true)
      +'<div class="ep-form-group"><label class="ep-form-label">IGST Rate (%) <span class="req">*</span> <span class="sc-sys">Auto-calculated</span></label>'
        +'<div class="sc-ro" id="hs-igst">0.00</div></div>'
    +'</div>'
    +'<div class="sc-bill-foot"><button class="btn-outline" type="button" onclick="scGo(\'hsn\')">Cancel</button>'
      +'<button class="btn-primary" type="button" onclick="scSaveHsn()">Submit</button></div>'
  +'</div></div>';
}
function scHsnCalc(){var v=function(id){return +((document.getElementById(id)||{}).value||0)||0;},el=document.getElementById('hs-igst');if(el)el.textContent=(v('hs-cgst')+v('hs-sgst')).toFixed(2);}
function scSaveHsn(){
  var v=function(id){return ((document.getElementById(id)||{}).value||'').trim();};
  var h={code:v('hs-code'),type:csValue('hs-type')||'HSN',desc:v('hs-desc'),cgst:v('hs-cgst'),sgst:v('hs-sgst')};
  if(!h.code){scToast('Enter the HSN/SAC code','error');return;}
  if(!h.desc){scToast('Enter the description','error');return;}
  if(h.cgst===''||h.sgst===''){scToast('Enter the CGST and SGST rates','error');return;}
  var why=hsnCheck(h);if(why){scToast(why,'error');return;}
  h.key=HSNS.reduce(function(m,x){return Math.max(m,x.key);},0)+1;h.status='Active';h.created=fmtDate(DASH_TODAY);GL.hsn.onSave(h);
  HSNS.unshift(h);glState('hsn').f={};glState('hsn').page=1;glLog('hsn',h.key,'Created');
  scGo('hsn');scToast('HSN/SAC '+h.code+' added','success','IGST '+h.igst.toFixed(2)+'%.');
}
Object.assign(PAGE_ACTIONS,{hsn:['Create HSN/SAC',function(){scGo('addhsn');}],addhsn:['All HSN/SAC',function(){scGo('hsn');},ICO.list]});

/* ── ALL BUYERS: the system's buyer tabs ───────────────────────────────── */
function buyerOrders(b){return ORDERS.filter(function(o){return o.userId===b.key;});}
function buyerCards(b,gift){return ISSUED_CARDS.filter(function(x){var c=CARDS.filter(function(y){return y.name===x.card;})[0];
  return x.user===buyerName(b)&&c&&(gift?c.cat==='Gift':c.cat!=='Gift');});}
GL.allbuyers.detailFields=function(b){return [['Customer ID',b.key,ICO.hash],['First Name',esc(b.first),ICO.user],['Last Name',b.last?esc(b.last):'—',ICO.user],
  ['Email',b.email?esc(b.email):'—',ICO.doc],['Mobile',esc(b.mobile),ICO.phone],['Joined',esc(b.joined),ICO.cal]];};
var _buyerCredit=(GL.allbuyers.tabs||[]).filter(function(t){return t.id==='credit';})[0];
GL.allbuyers.tabs=[
  wfTab('allbuyers'),
  relTab('history','Buying History',['Name','Amount','Quantity','Order Status','Date'],buyerOrders,function(o){var x=orderExt(o);
    return '<tr><td><b>'+esc(x.items.map(function(i){return i.name;}).join(', '))+'</b></td>'+td(inr(o.amount))+td(x.items.reduce(function(t,i){return t+i.qty;},0))
      +'<td>'+orderTone(o.status)+'</td>'+td(fmtDT(o.created))+'</tr>';},'No purchases yet.'),
  relTab('premium','Premium Card',['Card Number','Card','Valid Till','Status'],function(b){return buyerCards(b,false);},function(x){
    return '<tr><td><span class="sc-mono">'+esc(x.number)+'</span></td>'+td(x.card)+td(x.expiry)+'<td>'+(x.status==='Expired'?badge('closed','Expired'):activeBadge(x.status))+'</td></tr>';},'No premium card.'),
  relTab('gift','Gift Card Details',['Card Number','Card','Issued On','Status'],function(b){return buyerCards(b,true);},function(x){
    return '<tr><td><span class="sc-mono">'+esc(x.number)+'</span></td>'+td(x.card)+td(x.issued)+'<td>'+(x.status==='Expired'?badge('closed','Expired'):activeBadge(x.status))+'</td></tr>';},'No gift cards.'),
  relTab('tx','Transactions',['Payment ID','Order','Payment Method','Payment Status','Amount'],function(b){
      var out=[];buyerOrders(b).forEach(function(o){orderExt(o).tx.forEach(function(q){out.push({q:q,o:o});});});return out;},
    function(r){return '<tr>'+td(r.q.id)+td(r.o.key)+td(r.q.method)+'<td>'+badge(r.q.status==='Completed'?'approved':r.q.status==='Failed'?'unapproved':'closed',r.q.status)+'</td>'+td(inr(r.o.amount))+'</tr>';},'No transactions yet.')
].concat(_buyerCredit?[_buyerCredit]:[]);

/* ── CATEGORIES: the main tab is "Category", with the category's image ── */
function catImageTop(id){return function(r){
  var img=r.img?'<img src="'+r.img.url+'" alt="'+esc(r.name)+'">':'<span class="sc-tag-img sc-tag-img-lg">'+ICO.layers+'</span>';
  return '<div class="sc-qr-big sc-tag-big"><span class="sc-qr-frame sc-tag-frame">'+img+'</span>'
    +'<div class="sc-qr-meta"><b>'+esc(r.name)+'</b><span>'+esc(glOneCap(GL[id]))+' image</span>'
    +'<label class="btn-outline btn-sm sc-tag-up"><input type="file" accept="image/*" hidden onchange="scCatImage(\''+id+'\','+r.key+',this.files[0]);this.value=\'\'">'+ATT_ICO.upload+' '+(r.img?'Change Image':'Upload Image')+'</label></div></div>';};}
function scCatImage(id,key,f){
  var r=glRow(id,key);if(!r||!f)return;
  if(!/^image\//.test(f.type)||f.size>2048*1024){scToast('Choose an image up to 2048 KB','error');return;}
  if(r.img)URL.revokeObjectURL(r.img.url);r.img={name:f.name,url:URL.createObjectURL(f)};glLog(id,key,'Updated '+GL[id].one+' image');scRender();scToast('Image updated','success');
}
['maincats','subcats','grandcats'].forEach(function(id){
  var g=GL[id];g.detailsLabel='Category';g.detailsTop=catImageTop(id);
  g.tabs=(g.tabs||[]).filter(function(t){return t.id!=='workflow';}).concat([wfTab(id)]);
});

/* ══ COMMUNITY, PLATFORM, AMENITY PANELS (as in the system) ════════════════ */
function commExt(c){
  if(c.ext)return c.ext;var k=c.key,first=c.name.split(' ')[0].toLowerCase().replace(/[^a-z]/g,'')||'comm';
  var addr=['126, Karummariamman Nagar, VGN MelRore Garden, Tambaram, Tamil Nadu 600045, India','Plot 7, Gachibowli, Hyderabad, Telangana 500032, India',
    '22, MG Road, Bengaluru, Karnataka 560001, India','14, Anna Salai, Chennai, Tamil Nadu 600002, India'][k%4];
  var stores=glSrc(GL.stores);
  c.ext={
    profile:{by:c.name.split(' ').slice(0,2).join(' '),manager:c.name.split(' ').slice(0,2).join(' ').toLowerCase(),email:first+'community@gmail.com',
      mobile:'+9193'+String(95907652+k).slice(-8),address:addr,house:(k%9)+'-'+(k%3),geofence:10,short:c.name,long:c.name+' community'},
    settings:{gatepass:true,checkinout:true,selfOnboard:false},
    stores:[stores[k%stores.length],stores[(k+3)%stores.length]].filter(Boolean).map(function(s){return {id:s.key,name:s.name,status:s.status};})
  };
  return c.ext;
}
SEC_DEF.commProfile={title:'Community Profile',get:function(r){return commExt(r).profile;},fields:[
  {k:'by',label:'Created By'},{k:'manager',label:'Manager Name',req:true},{k:'email',label:'Manager Email Address',type:'email',req:true,pattern:/^[^@\s]+@[^@\s]+\.[^@\s]+$/},
  {k:'mobile',label:'Manager Mobile Number',req:true,pattern:/^\+?\d{10,13}$/},{k:'house',label:'House Number'},{k:'geofence',label:'Geofence Radius (m)',type:'number',req:true},
  {k:'address',label:'Address',full:true,req:true},{k:'short',label:'Short Description',type:'textarea',full:true},{k:'long',label:'Long Description',type:'textarea',full:true}]};
SEC_DEF.commSettings={title:'Community Setting',get:function(r){return commExt(r).settings;},groups:[
  ['Residential Gatepass Services',[{k:'gatepass',label:'Residential Gatepass Services',type:'switch'}]],
  ['Community Setting',[{k:'checkinout',label:'Check in-Check out status',type:'switch'}]],
  ['Residential Settings',[{k:'selfOnboard',label:'Resident Self Onboarding',type:'switch'}]]]};
LIST_DEF.commStores={title:'Store Mapping',one:'store mapping',addLabel:'Mapping',empty:'No stores mapped yet.',get:function(r){return commExt(r).stores;},
  fields:[{k:'pick',label:'Store',type:'select',req:true,full:true,opts:function(){return glSrc(GL.stores).map(function(s){return s.name+' ('+s.key+')';});}}],
  cols:[['id','Store Id'],['name','Store Mapped'],['status','Store Status',function(x){return activeBadge(x.status);}]],
  make:function(v,r){var id=+(v.pick.match(/\((\d+)\)$/)||[])[1],s=glSrc(GL.stores).filter(function(q){return q.key===id;})[0];if(!s)return null;
    if(commExt(r).stores.some(function(q){return q.id===id;})){scToast(s.name+' is already mapped','error');return null;}return {id:s.key,name:s.name,status:s.status};}};
GL.communities.detailFields=function(c){var x=commExt(c),p=x.profile;
  return [['Community Id',c.key,ICO.hash],['Community Name',esc(c.name),ICO.building],['Category',esc(c.cat),ICO.tag],['Registration Type',esc(c.reg),ICO.tag],
    ['Community Created Date',esc(c.created),ICO.cal],['Status',activeBadge(c.status),ICO.check]];};
GL.communities.detailsTop=function(c){return '<div class="sc-qr-big"><span class="sc-qr-frame">'+qrSvg(c.key,110)+'</span><div class="sc-qr-meta"><b>QR Code</b><span>'+esc(c.name)+'</span>'
  +'<button class="btn-outline btn-sm" type="button" onclick="scQrDownload('+c.key+')">'+ICO_DOWNLOAD+' Download QR</button></div></div>';};
GL.communities.detailsExtra=function(c){return secBlock('communities',c,'commProfile');};
var _commTabs=GL.communities.tabs||[];
GL.communities.tabs=[
  {id:'csettings',label:'Community Setting',html:function(c){return glHero('communities',c,false)+secBlock('communities',c,'commSettings');}},
  {id:'cstores',label:'Store Mapping',html:function(c){return glHero('communities',c,false)+listBlock('communities',c,'commStores');}},
  wfTab('communities'),
  relTab('visitors','Visitor Logs',['Visitor ID','Visitor Name','Check-in Date & Time','Check-out Date & Time'],function(c){return VISITOR_LOGS.filter(function(v){return v.comm===c.name;});},
    function(v){return '<tr>'+td(v.user)+'<td><b>'+esc(v.name)+'</b></td>'+td(v.inAt)+td(v.outAt||'--')+'</tr>';},'No visitor logs found.')
].concat(_commTabs);

/* ── ALL PLATFORM ──────────────────────────────────────────────────────── */
function platExt(p){
  if(p.ext)return p.ext;var k=p.key,mgr=p.name.toLowerCase().replace(/platform/,'plat').trim();
  p.ext={profile:{by:mgr,manager:mgr,email:'test'+p.name.split(' ')[0].toLowerCase()+'plat@opendhi.com',mobile:'+9177'+String(66885567+k).slice(-8),pin:'600001',
      address:'Dasampalaiyam, Main St, Mannadi, George Town, Chennai, Tamil Nadu 600001, India',house:String(12+k%20),short:p.name,long:p.name+' platform'},
    comms:[],agents:[]};
  return p.ext;
}
SEC_DEF.platProfile={title:'Platform Manager',get:function(r){return platExt(r).profile;},fields:[
  {k:'by',label:'Created By'},{k:'manager',label:'Platform Manager Name',req:true},{k:'email',label:'Platform Manager Email Address',type:'email',req:true,pattern:/^[^@\s]+@[^@\s]+\.[^@\s]+$/},
  {k:'mobile',label:'Platform Manager Mobile Number',req:true,pattern:/^\+?\d{10,13}$/},{k:'pin',label:'Pincode',req:true,pattern:/^\d{6}$/},{k:'house',label:'House / Flat / Floor Number'},
  {k:'address',label:'Address',full:true,req:true},{k:'short',label:'Short Description',type:'textarea',full:true},{k:'long',label:'Long Description',type:'textarea',full:true}]};
LIST_DEF.platComms={title:'Community Mapping',one:'community mapping',addLabel:'Add',empty:'No communities mapped yet.',get:function(r){return platExt(r).comms;},
  fields:[{k:'pick',label:'Community',type:'select',req:true,full:true,opts:commNames}],
  cols:[['id','Community ID'],['name','Community Mapped'],['status','Status',function(x){return activeBadge(x.status);}]],
  make:function(v,r){var c=COMMUNITIES.filter(function(q){return q.name===v.pick;})[0];if(!c)return null;
    if(platExt(r).comms.some(function(q){return q.id===c.key;})){scToast(c.name+' is already mapped','error');return null;}return {id:c.key,name:c.name,status:c.status};}};
LIST_DEF.platAgents={title:'Agent Details',one:'agent',addLabel:'Add Agents',empty:'No agents assigned yet.',get:function(r){return platExt(r).agents;},
  fields:[{k:'pick',label:'Agent',type:'select',req:true,opts:function(){return PARTNERS.filter(function(p){return p.status==='Active';}).map(function(p){return p.name;});}},
    {k:'to',label:'Assigned To',type:'select',req:true,opts:commNames}],
  cols:[['id','Member ID'],['ref','Referral ID'],['name','Agent Name'],['desig','Designation'],['to','Assigned To']],
  make:function(v,r){var p=PARTNERS.filter(function(q){return q.name===v.pick;})[0];if(!p)return null;
    if(platExt(r).agents.some(function(q){return q.id===p.key;})){scToast(p.name+' is already an agent here','error');return null;}return {id:p.key,ref:p.ref,name:p.name,desig:p.desig,to:v.to};}};
GL.platforms.detailFields=function(p){return [['Platform ID',p.key,ICO.hash],['Platform Name',esc(p.name),ICO.server],['Platform Type',esc(p.type),ICO.tag],
  ['Created Date',esc(p.created),ICO.cal],['Status',activeBadge(p.status),ICO.check]];};
GL.platforms.detailsTop=catImageTop('platforms');
GL.platforms.detailsExtra=function(p){return secBlock('platforms',p,'platProfile');};
GL.platforms.tabs=[
  {id:'pcomms',label:'Communities',html:function(p){return glHero('platforms',p,false)+listBlock('platforms',p,'platComms');}},
  {id:'pagents',label:'Agents',html:function(p){return glHero('platforms',p,false)+listBlock('platforms',p,'platAgents');}},
  wfTab('platforms')];

/* ── AMENITIES ─────────────────────────────────────────────────────────── */
function amenExt(a){
  if(a.ext)return a.ext;
  a.ext={feeType:/Annual|Quarterly|Monthly/.test(a.name)?'Recurring':'One Time',type:/Membership/.test(a.name)?'Membership':'Booking',
    sub:a.kind==='Other'?'General':a.kind,offer:a.fee?Math.round(a.fee*0.7):0,desc:a.name+' at '+a.comm+'.'};
  return a.ext;
}
SEC_DEF.amenMore={title:'Amenity Details',get:amenExt,fields:[
  {k:'feeType',label:'Fee Type',type:'select',opts:['One Time','Recurring'],req:true},{k:'type',label:'Amenity Type',type:'select',opts:['Membership','Booking','Pass'],req:true},
  {k:'sub',label:'Sub Category',type:'select',opts:['Gym','Spa','Pool','Clubhouse','General']},{k:'offer',label:'Offer Price (INR)',type:'number'},
  {k:'desc',label:'Description',type:'textarea',full:true}],check:function(v){return 0;}};
GL.amenities.detailFields=function(a){return [['Service ID',a.key,ICO.hash],['Amenities Name',esc(a.name),ICO.sparkle],['Amenities Store Name',esc(a.comm+'_Amenities'),ICO.store],
  ['Community',esc(a.comm),ICO.building],['Registration Fee',a.fee?'INR '+(+a.fee).toLocaleString('en-IN'):'Free',ICO.money],['Status',activeBadge(a.status),ICO.check]];};
GL.amenities.detailsTop=catImageTop('amenities');
GL.amenities.detailsExtra=function(a){return secBlock('amenities',a,'amenMore');};
GL.amenities.cols.forEach(function(c){if(c.h==='Image')c.noDetail=true;});
GL.amenities.tabs=[wfTab('amenities')];

/* ══ MEMBERS, RESIDENTS, DAILY HELP, NOTICES (as in the system) ═════════════ */
function splitName(n){var p=String(n||'').trim().split(/\s+/);return {first:p[0]||'',last:p.slice(1).join(' ')};}
function splitMobile(m){var d=String(m||'').replace(/[^\d]/g,'');return {cc:'+91',num:d.length>10?d.slice(-10):d};}
/* Police / AML verification: each run is kept with its outcome */
function amlHTML(id,r){
  var runs=r.aml||[];
  return '<div class="sc-sec">'+secHead('Police / AML Verification','<button class="btn-primary btn-sm" type="button" onclick="scRunAml(\''+id+'\','+r.key+')">Run Verification</button>')
    +'<div class="sc-sub-title">Verification History</div>'
    +(runs.length?recTable(['Run Date','Overall Status','Score','Run By'],runs.map(function(v){
      return '<tr>'+td(v.date)+'<td>'+badge(v.status==='Clear'?'approved':v.status==='Review'?'pending':'unapproved',v.status)+'</td>'+td(v.score+' / 100')+td(v.by)+'</tr>';}).join(''))
      :'<div class="lp-logs-empty">No records yet.</div>')+'</div>';
}
function scRunAml(id,key){
  var r=glRow(id,key);if(!r)return;var n=(r.aml||[]).length,score=60+((key*37+n*13)%40),st=score>=80?'Clear':score>=70?'Review':'Flagged';
  (r.aml||(r.aml=[])).unshift({date:fmtDT(new Date()),status:st,score:score,by:who()});
  glLog(id,key,'Ran Police / AML verification','Result: '+st+' ('+score+'/100)');scRender();scToast('Verification '+st.toLowerCase(),st==='Clear'?'success':'info','Score '+score+' / 100.');
}

/* ── ALL COMMUNITY MEMBERS ─────────────────────────────────────────────── */
GL.cmembers.detailFields=function(m){var n=splitName(m.name),mob=splitMobile(m.mobile);
  return [['Referral ID',String(31373000+m.key%1000*7).slice(0,8),ICO.hash],['Community Name',esc(m.comm),ICO.building],['First Name',esc(n.first),ICO.user],['Last Name',n.last?esc(n.last):'—',ICO.user],
    ['Email',esc(m.email),ICO.doc],['Country Code',mob.cc,ICO.globe],['Mobile',esc(mob.num),ICO.phone],['Create Time',esc(fmtDT(addD(DASH_TODAY,-(m.key%30)))),ICO.cal],
    ['Date Of Birth',m.dob?esc(m.dob):'—',ICO.cal],['Designation',esc(m.desig),ICO.tag],['Status',activeBadge(m.status),ICO.check],['KYC Verified',badge(m.kyc==='Yes'?'approved':'unapproved',m.kyc),ICO.check],
    ['PAN Number',m.pan?'<span class="sc-mono">XXXXXXXXXX</span>':'—',ICO.hash],
    ['PAN Card','<button class="btn-outline btn-sm" type="button" onclick="scToast(\'PAN card\',\'info\',\'No PAN card uploaded yet.\')">'+ICO_DOWNLOAD+' Download</button>',ICO.doc]];};
GL.cmembers.tabs=[
  {id:'mstore',label:'Store',html:function(m){var c=COMMUNITIES.filter(function(x){return x.name===m.comm;})[0],list=c?commExt(c).stores:[];
    return glHero('cmembers',m,false)+secHead('Community Stores')+(list.length?recTable(['Store Id','Store Name','Status'],list.map(function(s){return '<tr>'+td(s.id)+'<td><b>'+esc(s.name)+'</b></td><td>'+activeBadge(s.status)+'</td></tr>';}).join(''))
      :'<div class="lp-logs-empty">No stores mapped to '+esc(m.comm)+'.</div>');}},
  relTab('mbuyers','Buyers',['Key','Name','Mobile','Joined'],function(m){return BUYERS.filter(function(b,i){return (i+m.key)%9===0;});},
    function(b){return '<tr>'+td(b.key)+'<td><b>'+esc(buyerName(b))+'</b></td>'+td(b.mobile)+td(b.joined)+'</tr>';},'No buyers onboarded by this member.'),
  wfTab('cmembers'),
  {id:'mkyc',label:'KYC',html:function(m){return glHero('cmembers',m,false)+amlHTML('cmembers',m);}}
];

/* ── ALL RESIDENTS: the membership card, attachments, family ───────────── */
function residentCardSVG(r){
  var q=qrSvg(r.key,90).replace('<svg','<svg x="292" y="96"');
  return '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="230" viewBox="0 0 400 230"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#f7c873"/><stop offset="1" stop-color="#d9962e"/></linearGradient></defs>'
    +'<rect width="400" height="230" rx="16" fill="url(#g)"/><text x="22" y="34" font-family="Inter,Arial" font-size="11" fill="#fff" letter-spacing="2">MEMBERSHIP CARD</text>'
    +'<rect x="22" y="58" width="74" height="86" rx="8" fill="#fff" opacity=".9"/><circle cx="59" cy="88" r="16" fill="#cbd5e1"/><rect x="38" y="110" width="42" height="24" rx="12" fill="#cbd5e1"/>'
    +'<text x="110" y="76" font-family="Inter,Arial" font-size="15" font-weight="700" fill="#fff">'+esc(r.name)+'</text>'
    +'<text x="110" y="96" font-family="Inter,Arial" font-size="11" fill="#fff">'+esc(r.pos)+' · '+esc(r.comm)+'</text>'
    +'<text x="110" y="114" font-family="Inter,Arial" font-size="11" fill="#fff">Flat '+esc(r.prop)+'</text>'
    +'<text x="22" y="204" font-family="Inter,Arial" font-size="11" fill="#fff">Member ID  '+r.key+'</text>'
    +'<rect x="286" y="90" width="102" height="102" rx="8" fill="#fff"/>'+q+'</svg>';
}
function scResidentCard(key){var r=glRow('residents',key);if(!r)return;
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([residentCardSVG(r)],{type:'image/svg+xml'}));a.download='membership-card-'+key+'.svg';
  document.body.appendChild(a);a.click();a.remove();scToast('Membership card downloaded','success');}
GL.residents.detailsTop=function(r){return '<div class="sc-mcard-wrap"><div class="sc-mcard">'+residentCardSVG(r)+'</div>'
  +'<button class="btn-outline btn-sm" type="button" onclick="scResidentCard('+r.key+')">'+ICO_DOWNLOAD+' Download Card</button></div>';};
GL.residents.detailFields=function(r){return [['Resident Type',esc(r.pos),ICO.tag],['Occupancy Status',esc(r.occ),ICO.home],['Full Name',esc(r.name),ICO.user],
  ['Email ID',r.email?esc(r.email):'—',ICO.doc],['Community',esc(r.comm),ICO.building],['Property',esc(r.prop),ICO.home],['Mobile',esc(r.mobile),ICO.phone],['Status',activeBadge(r.status),ICO.check]];};
LIST_DEF.resFiles={title:'Attachments',one:'attachment',addLabel:'Add Attachment',empty:'No attachments yet.',get:function(r){return r.files||(r.files=[]);},
  fields:[{k:'doc',label:'Document',type:'select',opts:['Rental Agreement','Sale Deed','ID Proof','Police Verification','Other'],req:true},{k:'file',label:'File',type:'file',accept:'image/*,.pdf',req:true}],
  cols:[['doc','Document'],['file','File',function(x){return '<a class="sc-link" href="'+x.file.url+'" download="'+esc(x.file.name)+'">'+esc(x.file.name)+'</a>';}],['at','Uploaded On']],
  make:function(v){return {name:v.doc,doc:v.doc,file:v.file,at:fmtDate(DASH_TODAY)};}};
LIST_DEF.resFamily={title:'Family Members',one:'family member',addLabel:'Add Member',empty:'No family members found.',get:function(r){return r.family||(r.family=[]);},
  fields:[{k:'name',label:'Name',req:true},{k:'phone',label:'Phone',req:true,ph:'+91'},{k:'type',label:'Type',type:'select',opts:['Spouse','Child','Parent','Sibling','Other'],req:true}],
  cols:[['name','Name'],['phone','Phone'],['type','Type'],['status','Status',function(x){return activeBadge(x.status);}]],
  make:function(v){if(!/^\+?\d{10,13}$/.test(String(v.phone).replace(/\s/g,''))){scToast('Enter a valid phone number','error');return null;}return {name:v.name,phone:v.phone,type:v.type,status:'Active'};}};
GL.residents.tabs=[wfTab('residents'),
  {id:'rfiles',label:'Attachments',html:function(r){return glHero('residents',r,false)+listBlock('residents',r,'resFiles');}},
  {id:'rfamily',label:'Family',html:function(r){return glHero('residents',r,false)+listBlock('residents',r,'resFamily');}}
].concat((GL.residents.tabs||[]).filter(function(t){return t.id==='notices';}));

/* ── ALL DAILY HELP: photo, KYC documents and verification ─────────────── */
GL.dailyhelp.detailsTop=catImageTop('dailyhelp');
GL.dailyhelp.detailFields=function(m){var n=splitName(m.name),mob=splitMobile(m.mobile);
  return [['Member ID',m.key,ICO.hash],['Community Name',esc(m.comm),ICO.building],['First Name',esc(n.first),ICO.user],['Last Name',n.last?esc(n.last):'—',ICO.user],
    ['Email',m.email?esc(m.email):'—',ICO.doc],['Country Code',mob.cc,ICO.globe],['Mobile',esc(mob.num),ICO.phone],['Designation',esc(m.desig),ICO.tag],
    ['Status',activeBadge(m.status),ICO.check],['Date Of Birth',m.dob?esc(m.dob):'—',ICO.cal]];};
LIST_DEF.helpDocs={title:'Document Images',one:'document',addLabel:'Upload New Document',empty:'No documents yet.',get:function(m){return m.docs||(m.docs=[{name:'ID Card',doc:'ID Card',verify:'Not Required',file:null}]);},
  fields:[{k:'doc',label:'Document Type',type:'select',opts:['ID Card','Aadhaar Card','Address Proof','Police Clearance'],req:true},{k:'file',label:'File',type:'file',accept:'image/*,.pdf',req:true}],
  cols:[['doc','Document Type'],['verify','Document Verification',function(x){return badge(x.verify==='Verified'?'approved':x.verify==='Pending'?'pending':'closed',x.verify);}],
    ['file','File',function(x){return x.file?'<a class="sc-link" href="'+x.file.url+'" download="'+esc(x.file.name)+'">View</a>':'<span class="lp-dash">—</span>';}]],
  make:function(v){return {name:v.doc,doc:v.doc,verify:v.doc==='ID Card'?'Not Required':'Pending',file:v.file};}};
GL.dailyhelp.tabs=[
  {id:'hkyc',label:'KYC',html:function(m){return glHero('dailyhelp',m,false)+listBlock('dailyhelp',m,'helpDocs')+amlHTML('dailyhelp',m);}},
  wfTab('dailyhelp')];

/* ── NOTICE BOARD: Details · Reports · Workflow · Logs ─────────────────── */
GL.notices.detailFields=function(n){return [['Post ID',n.key,ICO.hash],['Post Type',esc(n.type),ICO.tag],['Category',esc(n.cat),ICO.tag],['Title',esc(n.title),ICO.doc],
  ['Target Group',esc(n.group),ICO.users],['Attachment',n.img==='none'?'<span class="lp-dash">No attachment</span>':n.img==='pdf'?'PDF attached':'Image attached',ICO.doc],
  ['Description',esc(n.desc||'—'),ICO.doc,true],['Status',activeBadge(n.status),ICO.check],['Created By',esc(n.by||'harish k'),ICO.user],['Created On',esc(n.date+' | '+n.time),ICO.cal]];};
GL.notices.tabs=[
  relTab('nreports','Reports',['Reported By','Reason','Reported On'],function(n){return n.reports||(n.reports=n.key%3===0?[{who:'Priya Nair',why:'Wrong information',at:fmtDT(addD(DASH_TODAY,-2))}]:[]);},
    function(x){return '<tr><td><b>'+esc(x.who)+'</b></td>'+td(x.why)+td(x.at)+'</tr>';},'No reports on this notice.'),
  wfTab('notices')];

/* ══ BLOCKS, CUSTOMER BANDS, E-WALLETS, PARTNERS, CAFETERIA (as in the system) ═ */
/* ── All Blocks ── */
GL.blocks.detailFields=function(b){return [['Block Id',b.key,ICO.hash],['Community',esc(b.comm),ICO.building],['Block / Tower Name',esc(b.name),ICO.tower],
  ['Total Flats',FLATS.filter(function(f){return f.block===b.key;}).length,ICO.door],['Status',activeBadge(b.status),ICO.check]];};
GL.blocks.tabs=(GL.blocks.tabs||[]).filter(function(t){return t.id!=='workflow';}).concat([wfTab('blocks')]);

/* ── Customer Bands: the band's customers ── */
function bandCustomers(b){
  if(!b.customers){var n=b.assigned||0;b.customers=[];
    for(var i=0;i<n;i++){var u=BUYERS[(b.key*3+i*7)%BUYERS.length];b.customers.push({id:u.key,name:buyerName(u),email:u.email,mobile:u.mobile,refId:String(313000+(u.key%997)),refBy:i%2?'Opendhi Agent':'System',card:i%3===0?'N/A':'SC-'+(4400+u.key%900)});}}
  return b.customers;
}
LIST_DEF.bandCust={title:'Customer Details',one:'customer',addLabel:'Add Customer',empty:'No customers on this band.',get:bandCustomers,
  fields:[{k:'pick',label:'Customer',type:'select',req:true,full:true,opts:function(){return BUYERS.map(function(u){return buyerName(u)+' ('+u.key+')';});}}],
  cols:[['id','Customer ID'],['name','Customer Name'],['email','Email'],['mobile','Mobile Number'],['refId','Referred Id'],['refBy','Referred By'],['card','Smart Card']],
  make:function(v,b){var id=+(v.pick.match(/\((\d+)\)$/)||[])[1],u=BUYERS.filter(function(q){return q.key===id;})[0];if(!u)return null;
    if(bandCustomers(b).some(function(q){return q.id===id;})){scToast(buyerName(u)+' is already on this band','error');return null;}
    return {id:u.key,name:buyerName(u),email:u.email,mobile:u.mobile,refId:String(313000+(u.key%997)),refBy:who(),card:'N/A'};},
  after:function(b){b.assigned=bandCustomers(b).length;},
  show:function(c){var q=(state.bandQ||'').toLowerCase();return !q||(c.name+' '+c.email+' '+c.mobile+' '+c.id).toLowerCase().indexOf(q)>=0;}};
function scBandExport(key){
  var b=glRow('custbands',key);if(!b)return;var rows=bandCustomers(b);if(!rows.length){scToast('Nothing to export','info');return;}
  var csv=[['Customer ID','Customer Name','Email','Mobile Number','Referred Id','Referred By','Smart Card']].concat(rows.map(function(c){return [c.id,c.name,c.email,c.mobile,c.refId,c.refBy,c.card];}))
    .map(function(l){return l.map(function(v){return '"'+String(v==null?'':v).replace(/"/g,'""')+'"';}).join(',');}).join('\r\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='band-'+key+'-customers.csv';document.body.appendChild(a);a.click();a.remove();
  scToast('Customers exported','success',rows.length+' in the file.');
}
GL.custbands.cols.forEach(function(c){if(c.h==='Customers Assigned')c.cell=function(b){return plain(bandCustomers(b).length);};});
GL.custbands.detailFields=function(b){return [['Key Id',b.key,ICO.hash],['Band',esc(b.name),ICO.medal],['Created By',esc(b.by),ICO.user],['Create Time',esc(b.created),ICO.cal],
  ['Customers Assigned',bandCustomers(b).length,ICO.users],['Status',activeBadge(b.status),ICO.check]];};
GL.custbands.tabs=[
  {id:'bcust',label:'Customer List',html:function(b){var q=(state.bandQ||'').toLowerCase();
    var tools='<div class="sc-gl-actbar sc-band-tools"><input class="lp-search-input" type="text" placeholder="Search customer" value="'+esc(state.bandQ||'')+'" oninput="state.bandQ=this.value" onkeydown="if(event.key===\'Enter\')glPanelRefresh()">'
      +'<button class="btn-outline btn-sm" type="button" onclick="glPanelRefresh()">Search</button><button class="btn-outline btn-sm" type="button" onclick="scBandExport('+b.key+')">'+ICO_DOWNLOAD+' Export Cards</button></div>';
    var html=listBlock('custbands',b,'bandCust');
    return glHero('custbands',b,false)+tools+html;}}
].concat((GL.custbands.tabs||[]).filter(function(t){return t.id==='wallets';})).concat([wfTab('custbands')]);

/* ── E-Wallets: promotion, credits, customers ── */
function walletExt(w){
  if(!w.ext)w.ext={promo:{validity:'12 months',perOrder:Math.max(1,Math.round(w.coins/100)),minOrder:100,expiry:'2027-03-31'},
    credits:[{type:'CREDIT',amount:w.coins,band:w.band,at:'2025-05-28 11:16:51',comment:'Auto-Credit'}]};
  return w.ext;
}
SEC_DEF.walletPromo={title:'Promotion Details',get:function(r){return walletExt(r).promo;},fields:[
  {k:'perOrder',label:'Coins per Order',type:'number',req:true},{k:'minOrder',label:'Minimum Order Value (₹)',type:'number',req:true},
  {k:'validity',label:'Coin Validity',type:'select',opts:['3 months','6 months','12 months','No expiry']},{k:'expiry',label:'Promotion Ends',type:'date'}]};
LIST_DEF.walletCredits={noDelete:true,title:'Transaction Details',one:'credit entry',addLabel:'Credit Entry',empty:'No transactions yet.',get:function(r){return walletExt(r).credits;},
  fields:[{k:'type',label:'Type',type:'select',opts:['CREDIT','DEBIT'],req:true,def:'CREDIT'},{k:'amount',label:'Amount (coins)',type:'number',req:true},{k:'comment',label:'Comment',req:true,full:true}],
  cols:[['type','Type',function(x){return badge(x.type==='CREDIT'?'approved':'unapproved',x.type);}],['amount','Amount'],['band','Band Name'],['at','Timestamp'],['comment','Comment']],
  make:function(v,w){var a=+v.amount;if(!(a>0)){scToast('Enter an amount above zero','error');return null;}if(v.type==='DEBIT'&&a>w.coins){scToast('Only '+w.coins+' coins in the wallet','error');return null;}
    var d=new Date(),p=function(n){return ('0'+n).slice(-2);};w.coins+=v.type==='CREDIT'?a:-a;
    return {type:v.type,amount:a,band:w.band,at:isoDay(DASH_TODAY)+' '+p(d.getHours())+':'+p(d.getMinutes())+':'+p(d.getSeconds()),comment:v.comment,name:v.type+' '+a};}};
GL.ewallets.detailFields=function(w){return [['Key Id',w.key,ICO.hash],['Name',esc(w.name),ICO.coins],['Total Coins',(+w.coins).toLocaleString('en-IN'),ICO.coins],
  ['Customer Band',esc(w.band),ICO.medal],['Status',activeBadge(w.status),ICO.check]];};
GL.ewallets.detailsExtra=function(w){return secBlock('ewallets',w,'walletPromo');};
GL.ewallets.tabs=[
  {id:'wcredits',label:'Credit Transactions',html:function(w){return glHero('ewallets',w,false)+listBlock('ewallets',w,'walletCredits');}},
  relTab('wcust','Customer List',['Customer Name','Email','Mobile Number'],function(w){var b=CUSTOMER_BANDS.filter(function(x){return x.name===w.band;})[0];return b?bandCustomers(b):[];},
    function(c){return '<tr><td><b>'+esc(c.name)+'</b></td>'+td(c.email||'—')+td(c.mobile)+'</tr>';},'No customers on this wallet’s band.'),
  wfTab('ewallets')];

/* ── All Partners: photo, KYC, managed communities, agents under them ── */
GL.partners.detailsTop=catImageTop('partners');
GL.partners.detailFields=function(p){var n=splitName(p.name),mob=splitMobile(p.mobile);
  return [['Member ID',p.key,ICO.hash],['Referral ID','<span class="sc-mono">'+esc(p.ref)+'</span>',ICO.hash],['Community Name',p.comm?esc(p.comm):'Not Assigned',ICO.building],
    ['First Name',esc(n.first.toLowerCase()),ICO.user],['Last Name',n.last?esc(n.last.toLowerCase()):'—',ICO.user],['Email',esc(p.email),ICO.doc],['Country Code','91',ICO.globe],
    ['Mobile',esc(mob.num),ICO.phone],['Create Time',esc(fmtDT(addD(DASH_TODAY,-(p.key%40)))),ICO.cal],['Designation',esc(p.desig),ICO.tag],['Status',activeBadge(p.status),ICO.check]];};
LIST_DEF.partnerComms={title:'Managed Communities',one:'community',addLabel:'Assign Community',empty:'No communities assigned yet.',get:function(p){return p.managed||(p.managed=p.comm?[{name:p.comm,at:fmtDate(addD(DASH_TODAY,-10))}]:[]);},
  fields:[{k:'pick',label:'Community',type:'select',req:true,full:true,opts:commNames}],cols:[['name','Community'],['at','Assigned On']],
  make:function(v,p){if((p.managed||[]).some(function(x){return x.name===v.pick;})){scToast(v.pick+' is already assigned','error');return null;}return {name:v.pick,at:fmtDate(DASH_TODAY)};}};
LIST_DEF.partnerDocs={title:'KYC Documents',one:'document',addLabel:'Upload Document',empty:'No KYC documents yet.',get:function(p){return p.docs||(p.docs=[]);},
  fields:[{k:'doc',label:'Document Type',type:'select',opts:['PAN Card','Aadhaar Card','Address Proof','Bank Proof'],req:true},{k:'file',label:'File',type:'file',accept:'image/*,.pdf',req:true}],
  cols:[['doc','Document Type'],['verify','Verification',function(x){return badge('pending',x.verify);}],['file','File',function(x){return '<a class="sc-link" href="'+x.file.url+'" download="'+esc(x.file.name)+'">View</a>';}]],
  make:function(v){return {name:v.doc,doc:v.doc,verify:'Pending',file:v.file};}};
GL.partners.tabs=[wfTab('partners'),
  {id:'pkyc',label:'KYC Details',html:function(p){return glHero('partners',p,false)+listBlock('partners',p,'partnerDocs')+amlHTML('partners',p);}},
  {id:'pmanage',label:'Manage Agent',html:function(p){return glHero('partners',p,false)+listBlock('partners',p,'partnerComms');}},
  relTab('pagents','Agent Details',['Member ID','Referral ID','Agent Name','Designation','Status'],function(p){return PARTNERS.filter(function(x){return x.key!==p.key&&x.comm&&x.comm===p.comm;});},
    function(x){return '<tr>'+td(x.key)+'<td><span class="sc-mono">'+esc(x.ref)+'</span></td><td><b>'+esc(x.name)+'</b></td>'+td(x.desig)+'<td>'+activeBadge(x.status)+'</td></tr>';},'No agents under this partner.')];

/* ── Cafeteria ── */
GL.cafeteria.detailFields=function(c){return [['Key Id',c.key,ICO.hash],['Name',esc(c.name),ICO.cup],['Created By',esc(c.by),ICO.user],['Created Time',esc(c.created),ICO.cal],['Status',activeBadge(c.status),ICO.check]];};
GL.cafeteria.tabs=[wfTab('cafeteria')];

/* ══ SEQUENCE, TICKETS, SUPPORT TEAMS (as in the system) ═══════════════════ */
/* ── Sequence: Basic Details is the item list; Edit reorders it in place ── */
GL.sequence.detailsLabel='Basic Details';
GL.sequence.detailFields=function(c){return [['Configuration Name',esc(c.name),ICO.sortlines],['Module ID','SEQ-'+c.key,ICO.hash],
  ['Items',c.items.length,ICO.list],['Status',c.status==='Future'?badge('pending','Future'):activeBadge(c.status),ICO.check]];};
GL.sequence.detailsExtra=function(c){
  var e=state.seqEdit&&state.seqEdit.key===c.key?state.seqEdit:null,items=e?e.items:c.items;
  var rows=items.map(function(it,i){
    return '<div class="sc-seq-row'+(it.on?'':' is-off')+'"><span class="sc-seq-name">'+esc(it.name)+'</span>'
      +'<span class="sc-seq-no">'+(i+1)+'</span>'
      +(e?'<span class="sc-seq-tools"><button type="button" class="lp-action-btn" title="Move up"'+(i?'':' disabled')+' onclick="scSeqEdMove('+i+',-1)">'+ICO_UP+'</button>'
          +'<button type="button" class="lp-action-btn" title="Move down"'+(i<items.length-1?'':' disabled')+' onclick="scSeqEdMove('+i+',1)">'+ICO_DOWN+'</button>'
          +'<button type="button" role="switch" aria-checked="'+it.on+'" class="sc-switch'+(it.on?' is-on':'')+'" title="'+(it.on?'Hide':'Show')+'" onclick="scSeqEdVis('+i+')"><span></span></button></span>'
        :'<span class="sc-seq-st">'+badge(it.on?'approved':'closed',it.on?'Active':'Hidden')+'</span>')+'</div>';}).join('');
  return '<div class="sc-sec">'+secHead('Display Order',e?'<span class="sc-editing-pill">'+ICO_EDIT+' Editing</span>':'<button class="lp-sb-view-edit-btn" type="button" onclick="scSeqEdStart('+c.key+')">'+ICO_EDIT+' Edit</button>')
    +'<div class="sc-seq-head"><span>Item Name</span><span>Sequence</span><span>'+(e?'Order / Visibility':'Status')+'</span></div>'
    +(rows?'<div class="sc-seq-list">'+rows+'</div>':'<div class="lp-logs-empty">No items yet - this section is planned for the future.</div>')
    +(e?'<div class="sc-gl-actbar" style="margin-top:12px"><input class="ep-form-input sc-seq-add" id="sc-seq-new" type="text" placeholder="Add an item" onkeydown="if(event.key===\'Enter\')scSeqEdAdd()">'
        +'<button class="btn-outline btn-sm" type="button" onclick="scSeqEdAdd()">'+ICO.plus+' Add Item</button></div>'
        +'<div class="sc-edit-actions"><button class="btn-outline" onclick="state.seqEdit=null;glPanelRefresh()">Cancel</button><button class="btn-primary" onclick="scSeqEdSave()">Save Changes</button></div>':'')
    +'</div>';
};
function scSeqEdStart(key){var c=glRow('sequence',key);if(!c)return;state.seqEdit={key:key,items:c.items.map(function(x){return {name:x.name,on:x.on};})};glPanelRefresh();}
function scSeqEdMove(i,d){var e=state.seqEdit;if(!e)return;var j=i+d;if(j<0||j>=e.items.length)return;var t=e.items[i];e.items[i]=e.items[j];e.items[j]=t;glPanelRefresh();}
function scSeqEdVis(i){var e=state.seqEdit;if(!e)return;e.items[i].on=!e.items[i].on;glPanelRefresh();}
function scSeqEdAdd(){var e=state.seqEdit,el=document.getElementById('sc-seq-new'),v=el&&el.value.trim();if(!e||!v)return;e.items.push({name:v,on:true});glPanelRefresh();}
function scSeqEdSave(){
  var e=state.seqEdit,c=e&&glRow('sequence',e.key);if(!c)return;
  var before=JSON.stringify(c.items),after=JSON.stringify(e.items);state.seqEdit=null;
  if(before===after){glPanelRefresh();scToast('No changes to save','info');return;}
  c.items=e.items;if(c.status==='Future'&&c.items.length)c.status='Active';glLog('sequence',c.key,'Updated display order',c.items.filter(function(x){return x.on;}).length+' of '+c.items.length+' visible');
  scRender();scToast(c.name+' saved','success');
}
GL.sequence.tabs=[wfTab('sequence')];

/* ── Tickets: Details · Orders · Notes · Images · Workflow · Assign Member · Logs ── */
function ticketExt(t){
  if(t.ext)return t.ext;var team=SUP_TEAMS.filter(function(x){return x.name===t.team;})[0],ord=ORDERS[t.key%ORDERS.length];
  t.ext={by:ord.user,byEmail:(BUYERS.filter(function(b){return b.key===ord.userId;})[0]||{}).email||'',byPhone:ord.phone,
    assignee:team?teamMembers({key:team.key,name:team.name,email:team.email})[0]:null,orders:t.role==='Buyer'?[ord.key]:[],
    desc:t.title+'. Please look into this at the earliest.',notes:[],images:[]};
  return t.ext;
}
GL.tickets.detailFields=function(t){var x=ticketExt(t),a=x.assignee;
  return [['Type',esc(t.type),ICO.tag],['Category',esc(t.cat),ICO.tag],['Level',esc(t.level),ICO.hash],['Priority',badge(PRIO_TONE[t.priority],t.priority),ICO.flag],
    ['Create Time',esc(t.created),ICO.cal],['Create By',esc(x.by),ICO.user],['Assigned Team',esc(t.team||'—'),ICO.users],
    ['Assignee Name',a?esc(a.name):'—',ICO.user],['Assignee Email',a?esc(a.email):'—',ICO.doc],['Assignee Contact',a?esc(a.mobile):'—',ICO.phone],
    ['Status',badge(t.status==='Resolved'||t.status==='Closed'?'approved':t.status==='Open'?'pending':'active',t.status),ICO.check],['Sub-Status',esc(t.sub||'—'),ICO.check],
    ['Ticket Raised By',esc(x.by),ICO.user],['Ticket Raised Email',x.byEmail?esc(x.byEmail):'—',ICO.doc],['Ticket Raised Contact',esc(x.byPhone),ICO.phone],
    ['Description',esc(x.desc),ICO.doc,true]];};
LIST_DEF.tktNotes={noDelete:true,title:'Notes',one:'note',addLabel:'Add Note',empty:'No notes yet.',get:function(t){return ticketExt(t).notes;},
  fields:[{k:'text',label:'Note',type:'textarea',req:true,full:true}],cols:[['text','Note'],['who','Added By'],['at','Added On']],
  make:function(v){var s=stamp();return {text:v.text,who:who(),at:s.date+' · '+s.time.slice(0,5),name:''};}};
LIST_DEF.tktImages={title:'Images',one:'image',addLabel:'Add Image',empty:'No images attached.',get:function(t){return ticketExt(t).images;},
  fields:[{k:'file',label:'Image',type:'file',accept:'image/*',req:true}],
  cols:[['file','Image',function(x){return '<a class="sc-link" href="'+x.file.url+'" target="_blank" rel="noopener">'+esc(x.file.name)+'</a>';}],['at','Added On']],
  make:function(v){return {file:v.file,name:v.file.name,at:fmtDate(DASH_TODAY)};}};
LIST_DEF.tktAssign={title:'Assign Member',one:'assignee',addLabel:'Assign Member',empty:'No member assigned.',get:function(t){var a=ticketExt(t).assignee;return a?[a]:[];},
  fields:[{k:'pick',label:'Team Member',type:'select',req:true,full:true,opts:function(){var o=[];SUP_TEAMS.forEach(function(tm){teamMembers({key:tm.key,name:tm.name,email:tm.email}).forEach(function(m){o.push(m.name+' — '+tm.name);});});return o;}}],
  cols:[['name','Name'],['email','Email'],['mobile','Contact'],['role','Designation']],
  make:function(v,t){var parts=v.pick.split(' — '),tm=SUP_TEAMS.filter(function(x){return x.name===parts[1];})[0];if(!tm)return null;
    var m=teamMembers({key:tm.key,name:tm.name,email:tm.email}).filter(function(x){return x.name===parts[0];})[0];if(!m)return null;
    ticketExt(t).assignee=m;t.team=tm.name;scToast('Assigned to '+m.name,'success');return null;}};
GL.tickets.tabs=[
  relTab('torders','Orders',['Order ID','Store','Amount','Status'],function(t){return ticketExt(t).orders.map(orderByKey).filter(Boolean);},
    function(o){return '<tr>'+td(o.key)+td(o.store)+td(inr(o.amount))+'<td>'+orderTone(o.status)+'</td></tr>';},'No orders linked to this ticket.'),
  {id:'tnotes',label:'Notes',html:function(t){return glHero('tickets',t,false)+listBlock('tickets',t,'tktNotes');}},
  {id:'timages',label:'Images',html:function(t){return glHero('tickets',t,false)+listBlock('tickets',t,'tktImages');}},
  wfTab('tickets'),
  {id:'tassign',label:'Assign Member',html:function(t){return glHero('tickets',t,false)+listBlock('tickets',t,'tktAssign');}}];
/* assigning saves itself (it replaces the assignee rather than adding a row) */
var _listSaveBase=scListSave;
scListSave=function(){var d=state.glDraft;
  if(d&&d.mode==='list'&&d.list==='tktAssign'){var t=glRow('tickets',d.key);if(!d.vals.pick){scToast('Select the team member','error');return;}
    LIST_DEF.tktAssign.make(d.vals,t);glLog('tickets',d.key,'Assigned to '+ticketExt(t).assignee.name);state.glDraft=null;scRender();return;}
  return _listSaveBase();};

/* ── Support Teams: Details · Workflow · Categories · Access · Team Members ── */
function supTeamExt(t){
  if(!t.ext)t.ext={type:['Sales','Support','Operations'][t.key%3],by:'pardeep verma',cats:[{name:t.cat,at:t.created}],
    access:{view:true,assign:true,resolve:true,close:t.key%2===0,escalate:true,refund:false}};
  return t.ext;
}
GL.supteams.detailFields=function(t){var x=supTeamExt(t);return [['Team ID',t.key,ICO.hash],['Team Name',esc(t.name),ICO.users],['Team Type',esc(x.type),ICO.tag],
  ['Team Email',esc(t.email),ICO.doc],['Team Code','<span class="sc-mono">'+esc(t.code)+'</span>',ICO.hash],['Category',esc(t.cat),ICO.tag],
  ['Category Date',esc(t.created),ICO.cal],['Category By',esc(x.by),ICO.user],['Status',activeBadge(t.status),ICO.check]];};
LIST_DEF.supCats={title:'Categories',one:'category',addLabel:'Add Category',empty:'No categories yet.',get:function(t){return supTeamExt(t).cats;},
  fields:[{k:'pick',label:'Support Category',type:'select',req:true,full:true,opts:supCatNames}],cols:[['name','Category'],['at','Added On']],
  make:function(v,t){if(supTeamExt(t).cats.some(function(c){return c.name===v.pick;})){scToast(v.pick+' is already added','error');return null;}return {name:v.pick,at:fmtDate(DASH_TODAY)};}};
SEC_DEF.supAccess={title:'Access',get:function(t){return supTeamExt(t).access;},groups:[['Ticket Permissions',[
  {k:'view',label:'View Tickets',type:'switch'},{k:'assign',label:'Assign Tickets',type:'switch'},{k:'resolve',label:'Resolve Tickets',type:'switch'},
  {k:'close',label:'Close Tickets',type:'switch'},{k:'escalate',label:'Escalate Tickets',type:'switch'},{k:'refund',label:'Approve Refunds',type:'switch'}]]]};
LIST_DEF.supMembers={title:'Team Members',one:'team member',addLabel:'Add Member',empty:'No team members yet.',get:function(t){return teamMembers({key:t.key,name:t.name,email:t.email,members:t.members});},
  fields:[{k:'name',label:'Name',req:true},{k:'email',label:'Email',type:'email',req:true},{k:'mobile',label:'Mobile',req:true,ph:'+91'},{k:'role',label:'Designation',type:'select',opts:['Team Lead','Agent','Supervisor'],req:true}],
  cols:[['name','Name'],['email','Email'],['mobile','Mobile'],['role','Designation']],
  make:function(v){if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)){scToast('Enter a valid email','error');return null;}return {name:v.name,email:v.email,mobile:v.mobile,role:v.role};}};
/* a support team keeps its own members list */
LIST_DEF.supMembers.get=function(t){if(!t.members)t.members=teamMembers({key:t.key,name:t.name,email:t.email}).map(function(m,i){return {name:m.name,email:m.email,mobile:m.mobile,role:i?'Agent':'Team Lead'};});return t.members;};
var _supTicketsTab=(GL.supteams.tabs||[]).filter(function(x){return x.id==='tickets';});
GL.supteams.tabs=[wfTab('supteams'),
  {id:'scats',label:'Categories',html:function(t){return glHero('supteams',t,false)+listBlock('supteams',t,'supCats');}},
  {id:'saccess',label:'Access',html:function(t){return glHero('supteams',t,false)+secBlock('supteams',t,'supAccess');}},
  {id:'smembers',label:'Team Members',html:function(t){return glHero('supteams',t,false)+listBlock('supteams',t,'supMembers');}}].concat(_supTicketsTab);

/* ══ BOOT ═════════════════════════════════════════════════════════════════  */
[['ICO_DOWNLOAD','download'],['ICO_IMPORT','import'],['ICO_EXPAND','expand'],['ICO_COLLAPSE','collapse'],['ICO_PRINT','print'],
 ['ICO_DL','download'],['ICO_OUT','out'],['ICO_HOURGLASS','hourglass'],['ICO_DONE','done'],['ICO_REJECT','reject'],
 ['ICO_UNDO','undo'],['ICO_ARROW','arrow'],['ICO_BACK','back'],['ICO_EDIT','edit'],['ICO_KEBAB','kebab'],['ICO_TRASH','trash']].forEach(function(p){
  if(typeof window[p[0]]==='string')window[p[0]]=tagIco(window[p[0]],p[1]);
});
scRender();
