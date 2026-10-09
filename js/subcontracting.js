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
  sliders:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><line x1="15" y1="4" x2="15" y2="8"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="13" y1="16" x2="13" y2="20"/></svg>',
  headset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/></svg>',
  store:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/></svg>',
  cube:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
  handshake:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7l3-3 6 6-3 3"/><path d="M12 7L9 4 3 10l3 3"/><path d="M6 13l4 4 2-2 3 3"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
};

/* ── RAIL (MOCK) ──────────────────────────────────────────────────────────
   Mirrors the source prototype's nav. Same data shape as ADT's sidebarItems,
   so swapping in the real structure is an edit to this array alone. */
var SC_NAV=[
  {id:'dashboard',label:'Dashboard',icon:ICO.grid},
  {id:'stores',label:'Stores & Management',icon:ICO.store,placeholder:true},
  {dropdown:'Transactions',icon:ICO.file,children:[
    {id:'deals',label:'Deals',icon:ICO.file},
    {id:'orders',label:'Orders',icon:ICO.cart}
  ]},
  {id:'products',label:'Product & Inventory',icon:ICO.cube,placeholder:true},
  {id:'category',label:'Category',icon:ICO.sitemap,placeholder:true},
  {id:'masters',label:'Masters',icon:ICO.sliders,placeholder:true},
  {id:'support',label:'Support & Help Desk',icon:ICO.headset,placeholder:true},
  {id:'location',label:'Location control',icon:ICO.globe,placeholder:true}
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
  'QC User':['Clear ASN'],
  'Super Admin':['Approve SCR','Return SCR','Reject SCR','Submit SCR','Generate PO','Approve PO','Return PO',
    'Create Shipment','Goods Release & Issue','Return Shipment','Approve Delivery Note','Return Delivery Note',
    'Generate Challan','Confirm Gate Outward','Return Gate Outward','Confirm Shipment','Create ASN','Clear ASN',
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
  /* Logs design - TEMPORARY toggle, see logsTabHTML */
  logView:(function(){try{var v=localStorage.getItem('sc-logview');return v==='timeline'||v==='activity'?v:'table';}catch(e){return 'table';}})(),
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
   stage:'po',po:{no:'37756',status:'Approved'},created:'24 Sep 2026',asns:0,imrs:0,received:0},
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
  for(var a=1;a<=d.asns;a++){
    add('ASN Created','Vendor User',SAMPLE_PEOPLE['Vendor User'],'ASN '+a+' raised by the vendor.');
    var asnDone=d.stage!=='asn'||a<d.asns||d.sub==='vendor';
    if(asnDone||d.sub==='gatein')add('ASN QC Cleared','QC User',SAMPLE_PEOPLE['QC User'],'ASN '+a+' passed inspection.');
    if(asnDone)add('Gate Inward Confirmed','Security User',SAMPLE_PEOPLE['Security User'],'ASN '+a+' received at the gate.');
  }
  if(!stagePassed(d,'asn'))return m;
  for(var i=1;i<=d.imrs;i++){
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
  if(state.dealOpen){scCloseDeal();return;}
  if(state.orderOpen){scCloseOrder();return;}
});

/* ══ DERIVED FACTS ════════════════════════════════════════════════════════  */
function stageAccess(role,stage){
  if(role==='Super Admin')return true;
  return (STAGE_ACCESS[role]||[]).indexOf(stage)>=0;
}
function cumulativeAdvised(){return state.asns.reduce(function(t,a){return t+a.qty;},0);}
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
var openGroups={'Transactions':true};
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
    +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="16" height="14" rx="2"/><line x1="15" y1="5" x2="15" y2="19"/></svg></button>';
  el.appendChild(top);

  SC_NAV.forEach(function(item){
    if(item.section){
      if(state.railCollapsed)return;
      var s=document.createElement('div');s.className='sb-section';s.textContent=item.section;el.appendChild(s);return;
    }
    if(item.dropdown){
      var isOpen=!!openGroups[item.dropdown];
      var hasActive=(item.children||[]).some(function(c){return c.id===navPage();});
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
      kids.style.maxHeight=isOpen?'600px':'0';
      (item.children||[]).forEach(function(child){
        var c=document.createElement('button');c.type='button';
        c.className='sb-item'+(child.id===navPage()?' active':'');
        c.innerHTML='<div class="sb-ico-wrap">'+child.icon+'</div><span>'+child.label+'</span>';
        c.title=child.label;
        c.onclick=function(){scGo(child.id);};
        kids.appendChild(c);
      });
      parent.onclick=function(){
        if(openGroups[item.dropdown]){delete openGroups[item.dropdown];kids.style.maxHeight='0';parent.classList.remove('open');}
        else{openGroups={};openGroups[item.dropdown]=true;kids.style.maxHeight='600px';parent.classList.add('open');
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
var TITLES={dashboard:'Dashboard',deals:'Deals',orders:'Purchase Orders','scr-form':'Deals'};
/* The SCR form is a page of its own but belongs to Deals. */
function navPage(){return state.page==='scr-form'?'deals':state.page;}
function scGo(page){
  state.page=page;
  state.dealOpen=false;state.orderOpen=false;
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
  if(live){e['Remarks']=o.remarks||'';e['Header Text']=o.headText||'';}
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
    e['Delivery Note · Your / Our Reference']=x.dnInfo.ref;e['Delivery Note · Remarks']=x.dnInfo.remarks;
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
  /* Create SCR belongs to Deals and is hidden elsewhere, like every other
     page action in this header. */
  document.getElementById('sc-create-btn').style.display=state.page==='deals'?'inline-flex':'none';
  buildRoleMenu();
  buildRail();
  var el=document.getElementById('adt-content');
  el.innerHTML=state.page==='deals'?dealsPageHTML():state.page==='orders'?ordersPageHTML():state.page==='scr-form'?scrFormPageHTML():dashboardHTML();
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
}
/* Status changes are recorded before anything is drawn, so a History tab that
   is open shows the step that was just taken. */
var scRenderView=scRender;
scRender=function(){
  if(state.edit&&!(state.edit.create?canCreate(state.edit.id,state.edit.create)
      :state.edit.id.indexOf('po:')===0?canEditPO(state.edit.id.slice(3)):canEditTab(state.edit.id,state.edit.tab)))state.edit=null;
  trackHistory();scRenderView();
};

/* ══ DASHBOARD ════════════════════════════════════════════════════════════  */
function dashboardHTML(){
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

  return '<div class="listing-page">'
    +'<div class="hr-header">'
      +'<div class="hr-header-title">Sub-Contracting Dashboard</div>'
      +'<div class="hr-header-desc">Track your work and deal progress across the Sub-Contracting lifecycle. Viewing as <b>'+esc(state.role)+'</b>.</div>'
    +'</div>'
    +'<div class="hr-band"><span class="hr-band-title">My Work</span><span class="hr-band-rule"></span></div>'
    +'<div class="hr-stat-grid">'+cards+'</div>'
    +'<div class="hr-band"><span class="hr-band-title">Current Deal Stage</span><span class="hr-band-rule"></span></div>'
    +'<div class="sc-stage-grid">'+stages+'</div>'
  +'</div>';
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
      +'<td><div class="lp-c-plain">'+esc(r.vendor)+'</div><div class="lp-c-sub">'+esc(r.vendorSub)+'</div></td>'
      +'<td><div class="lp-c-plain">'+esc(r.pending)+'</div></td>'
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
          +'<th>S.No</th><th>Deal ID</th><th>Vendor</th><th>Pending With</th>'
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
  state.dealOpen=false;
  var sb=document.getElementById('sc-deal-sb');if(sb)sb.classList.remove('open');
  markSelectedRow(null);
}
/* CREATE PO ON EVERY ORDERS ROW. The same quiet outline button sits on each
   line - grey at rest, solid on the hovered row - so a column of them reads
   as one stripe rather than a wall of dark buttons. It generates the PO, so it
   is live only on a Draft PO and only for the Buyer (or Super Admin); on any
   other row it is faded and its tooltip says why. */
function createPOState(r){
  if(r.status!=='Draft')return {ok:false,why:'PO already generated'};
  if(state.role!=='Buyer'&&state.role!=='Super Admin')return {ok:false,why:'Only the Buyer can generate a PO'};
  return {ok:true,why:'Generate PO '+r.no};
}
/* THE PO APPROVER'S DROPDOWN on an Orders row: the same dark status button
   and menu as the Deals listing, offering Approve PO and Return PO. Only on a
   PO that is waiting for approval; the menu and Update Status are the shared
   ones (scRowMenu / scOpenUS), keyed by the PO's SCR. */
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
    +ICO.plus+'<span>Generate PO</span></button>';
}
function scCreatePO(no){
  var r=orderRows().filter(function(x){return x.no===no;})[0];
  if(!r||!createPOState(r).ok)return;
  scOpenActionModal('Generate PO','','order',r.live?LIVE_ID:r.scrId);
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
  state.orderOpen=false;
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
function dealPanelHTML(){
  if(state.dealSel!==LIVE_ID)return samplePanelHTML(sampleDeal(state.dealSel));
  var tabs=DEAL_TABS;
  var bar=tabBarHTML(tabs,state.dealTab,'scDealTab','scCloseDeal','sc-deal-tabs');
  var body;
  if(state.dealTab==='details')body=dealDetailsHTML();
  else if(state.dealTab==='workflow')body=dealWorkflowHTML();
  else if(state.dealTab==='logs')body=dealLogsHTML();
  else if(state.dealTab==='history')body=historyHTML(LIVE_ID);
  else if(DOC_TABS[state.dealTab])body=DOC_TABS[state.dealTab](dealDocs(LIVE_ID));
  else body=attachmentsHTML(LIVE_ID);
  body=withTools(LIVE_ID,state.dealTab,body);

  return bar+'<div class="lp-isb-body">'+body+'</div>';
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
  var obStep=d.stage==='outbound'?['dn','challan','gate','confirm'].indexOf(d.sub||'dn'):(stagePassed(d,'outbound')?4:-1);
  for(k=1;k<=d.asns;k++){
    var last=d.stage==='asn'&&k===d.asns;
    asns.push({no:'ASN-'+n+'-'+k,qty:Math.ceil(it.qty/Math.max(1,d.asns)),
      qc:!last||d.sub==='gatein'||d.sub==='vendor'?'QC Cleared':'Created',gateIn:!last||d.sub==='vendor'});
  }
  for(k=1;k<=d.imrs;k++){
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
      +tplCell('Remarks',esc(x.dnInfo.remarks),'sc-span4')
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
      +fieldCard(ICO.doc,'Remarks',esc(x.dnInfo.remarks)))
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
          +'<button class="sc-hero-expand" type="button" title="Expand" aria-label="Expand" onclick="'+o.expand+'">'+ICO_EXPAND+'</button>')
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
  if(editing&&state.edit&&state.edit.create)o.pill='Creating';
  /* the step that creates this tab's document, for the role that takes it */
  var mk={shipment:'Create Shipment',asn:'Create ASN',imr:'Create IMR'}[tab];
  if(mk&&!editing&&canCreate(id,mk)){o.create="scGoCreate('"+id+"','"+mk+"')";o.createLabel=mk;}
  return heroCard(o);
}
/* Not on an empty state, which has nothing to edit or expand. */
function withTools(id,tab,body){
  if(DETAIL_TABS.indexOf(tab)<0||body.indexOf('class="sc-empty"')>=0)return body;
  if(isEditing(id,tab))return heroFor(id,tab,true)+editFormHTML(id,tab);
  return heroFor(id,tab)+body;
}
/* The PO panel Details: the same card, Expand only - a PO changes through its own steps. */
function poTools(no,body){
  var r=orderRows().filter(function(o){return o.no===no;})[0];if(!r)return body;
  var editing=isEditing('po:'+no,'details');
  return heroCard({icon:ICO.cart,name:'PO '+no,meta:[r.scrId,r.vendor],editing:editing,
    edit:canEditPO(no)?"scEditPO('"+no+"')":'',
    expand:"scExpandTab('sc-order-isb','PO Details · "+no+"')"})+(editing?poEditFormHTML(no):body);
}

/* ══ PO DETAILS, EDITED IN PLACE ═══════════════════════════════════════════
   The PO's commercial fields live here (not in the popup form): the Buyer -
   or Super Admin - edits them on the PO's Details tab while the PO is still
   Draft or Created. Save Changes keeps them; on a Draft PO, Generate PO saves
   and generates in one step. "Open Purchase Order", the Orders listing's
   Generate PO and the Generate PO action all land here. */
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
      +(draft?'<button class="btn-outline" onclick="scSavePO(false)">Save Changes</button>'
          +'<button class="btn-primary" onclick="scSavePO(true)">Generate PO</button>'
        :'<button class="btn-primary" onclick="scSavePO(false)">Save Changes</button>')
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
  if(generate&&poStatusOf(no)==='Draft'){
    if(d)advanceSample(d,'Generate PO','Commercial fields completed.');
    else{state.po='created';addPOLog('PO Generated','Commercial fields completed — PO value '+fmtAmt(poValue())+'.');
      scToast('PO '+LIVE_PO+' generated','success','Pending with the PO Approver.');}
  }else{
    if(d)logDocUpdate(d.id,'PO Updated','Commercial details edited.');else addPOLog('PO Updated','Commercial details edited.');
    scToast('PO '+no+' updated','success');
  }
  state.edit=null;scRender();
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
function scExpandTab(panel,title){
  var src=document.querySelector('#'+panel+' .lp-isb-body');if(!src)return;
  var copy=src.cloneNode(true),tools=copy.querySelector('.sc-tab-tools');if(tools)tools.remove();
  document.getElementById('sc-modal-root').innerHTML=modalShell(title,'',
    '<div class="sc-expand-view">'+copy.innerHTML+'</div>',
    '<div class="ct-modal-btns"><button class="btn-outline" onclick="scCloseModal()">Close</button></div>',true,'sc-expand-modal');
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
  state.page='deals';state.orderOpen=false;state.dealOpen=true;state.dealSel=id;state.dealTab=tab;state.logAdd=null;
  state.edit={id:id,tab:tab,vals:createStartVals(id,action),dirty:false,create:action};
  scRender();
}
function canCreate(id,action){return rowAvailable(id).indexOf(action)>=0;}
function createStartVals(id,action){
  var live=id===LIVE_ID,d=live?null:sampleDeal(id),x=dealDocs(id),v={};
  if(action==='Create Shipment'){
    Object.keys(SHIP_DEFAULTS).forEach(function(k){v[k]=SHIP_DEFAULTS[k];});
    v.ret=isoOf(SHIP_DEFAULTS.ret);v.lrDate=isoOf(SHIP_DEFAULTS.lrDate);
  }else if(action==='Create ASN'){
    var open=live?openASNQty():d.item.qty;
    v={qty:String(live?Math.min(6,open):open),inv:'INV-'+(8891+x.asns.length),date:isoOf(stamp().date),vehicle:SHIP_DEFAULTS.vehicle};
  }else if(action==='Create IMR'){
    var el=imrEligible(id);
    v={asn:el.length?el[0].no:'',qty:el.length?String(el[0].avail):'',date:isoOf(stamp().date)};
  }
  return v;
}
/* ASNs an IMR can be raised against, with what is still available on each */
function imrEligible(id){
  if(id===LIVE_ID)return eligibleASNs().map(function(a){return {no:a.no,avail:availableForIMR(a.index),index:a.index};});
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
function scCreateFromTab(e){
  var id=e.id,action=e.create,v=e.vals,live=id===LIVE_ID,d=live?null:sampleDeal(id),ed=docEdits(id);
  if(!canCreate(id,action)){state.edit=null;scRender();return;}
  if(action==='Create Shipment'){
    if(!v.dna||!v.ret){scToast('Delivery Note Approver and Expected Return are required','error');return;}
    Object.keys(SHIP_DEFAULTS).forEach(function(k){if(k!=='ret'&&k!=='lrDate')ed.ship[k]=String(v[k]==null?'':v[k]).trim();});
    ed.ship.ret=fromIso(v.ret)||SHIP_DEFAULTS.ret;ed.ship.lrDate=fromIso(v.lrDate)||'';
    if(live){
      state.shipment='created';state.outboundKey=true;state.transferOrder=true;
      addDealLog('Shipment Created','Shipment ID SHP-2026-035307');
      addDealLog('Outbound Key Generated','Outbound Key OBK/26/0152 generated automatically.');
      addDealLog('Transfer Order Generated','Transfer Order TO/26/0152 generated automatically.');
      scToast('Shipment SHP-2026-035307 created','success','Outbound Key and Transfer Order generated.');
    }else advanceSample(d,'Create Shipment','Shipment created.');
  }else if(action==='Create ASN'){
    var q=parseInt(v.qty,10);
    if(live){
      if(!(q>0)||q>openASNQty()){scToast('Advised Qty cannot exceed the Open ASN Qty','error');return;}
      var no='ASN-'+String(state.asns.length+1).padStart(3,'0');
      state.asns.push({no:no,qty:q,qc:'Created',gateIn:false});
      addDealLog('ASN Created',no+' — Advised Qty '+q);
      scToast(no+' created','success','Advised Qty '+q+'. Pending QC clearance.');
    }else{
      if(!(q>0)){scToast('Enter the Advised Qty','error');return;}
      advanceSample(d,'Create ASN','Advised Qty '+q);ed.asnQty[d.asns-1]=q;
    }
  }else if(action==='Create IMR'){
    var el=imrEligible(id),a=el.filter(function(z){return z.no===v.asn;})[0],qi=parseInt(v.qty,10);
    if(!a){scToast('Select the ASN','error');return;}
    if(!(qi>0)||qi>a.avail){scToast('Receipt Qty cannot exceed the available ASN Qty','error');return;}
    if(live){
      var imrNo='IMR-'+String(state.imrs.length+1).padStart(3,'0');
      state.imrs.push({no:imrNo,asnNo:a.no,qty:qi,status:'Created'});
      addDealLog('IMR Created',imrNo+' against '+a.no+' — Qty '+qi);
      scToast(imrNo+' created','success','Receipt Qty '+qi+' against '+a.no+'.');
    }else{advanceSample(d,'Create IMR','Receipt Qty '+qi+' against '+a.no);ed.imrQty[d.imrs-1]=qi;}
  }
  state.edit=null;state.logAdd=null;scRender();
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
    if(live){ed('remarks','Remarks','textarea',null,true);ed('head','Header Text','textarea',null,true);}
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
    ed('ref','Your / Our Reference','text',null,true);ed('remarks','Remarks','textarea',null,true);
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
    +'<button class="btn-primary" onclick="scSaveEdit(false)">'+esc(e.create)+'</button></div></div>';
  var returned=tab==='details'&&(id===LIVE_ID?state.scr==='returned':!!(sampleDeal(id)||{}).returned);
  return (returned?returnNoteHTML(id,true):'')
    +'<div class="sc-edit-card"><div class="policy-form-grid">'+cells+'</div>'
    +'<div class="sc-edit-actions"><button class="btn-outline" onclick="scCancelEdit()">Cancel</button>'
      +(returned?'<button class="btn-outline" onclick="scSaveEdit(false)">Save Changes</button>'
          +'<button class="btn-primary" onclick="scSaveEdit(true)">Submit for Approval</button>'
        :'<button class="btn-primary" onclick="scSaveEdit(false)">Save Changes</button>')
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
   documents read them back, and the change is logged ("Shipment Updated"). */
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
  logDocUpdate(id,status,'Details edited.');
  state.edit=null;scRender();
  scToast(status.replace(' Updated','')+' updated','success');
}
/* Shipment field labels, as History names them. */
var SHIP_LABELS={dna:'Delivery Note Approver',challanType:'Challan Type',logistics:'Logistics Required',ret:'Expected Return',
  pkg:'Package Type',pkgNo:'No. of Packages',weight:'Package Weight',mode:'Mode of Dispatch',transporter:'Transporter',
  vehicle:'Vehicle No.',driver:'Driver Details',lrNo:'LR / Transport Reference No.',lrDate:'LR / Transport Date',
  insurance:'Insurance Applicable',insuredBy:'Insured By',contact:'Loading / Unloading Contact'};
/* An edit is logged on the deal like any other step. */
function logDocUpdate(id,status,comment){
  if(id===LIVE_ID){addDealLog(status,comment);return;}
  var d=sampleDeal(id);if(!d)return;
  var t=stamp();d.extra=d.extra||[];
  d.extra.push({status:status,role:state.role,by:who(),comment:comment,date:t.date,time:t.time,portal:'Web',seq:++scSeq});
}

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
    +fieldCard(ICO.doc,'Remarks',esc(L().remarks))
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
   "Remarks:" line, one dot, and an optional footer for whatever that stage
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
      +(description?'<div class="lp-wf-desc"><span class="lp-wf-desc-label">Remarks:</span><span class="lp-wf-desc-text">'+description+'</span></div>':'')
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
  if(pending)rows.push({title:pending.action,meta:{user:'Pending with '+pending.role,date:'',time:''},
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
  return 'Next: <b>'+esc(next.action)+'</b> by the <b>'+esc(next.role)+'</b>, on the Purchase Order.<br>'+openPOBtn(no);
}
/* The role a pending step belongs to, as a header role. */
function roleKey(who){return {'Planner / PMG':'Planner','Finance / F&A':'Finance / F&A / IDT'}[who]||who;}
function handoffBtn(role){
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
  return 'Next: <b>'+esc(next.action)+'</b>, pending with <b>'+esc(next.role)+'</b>.<br>'+handoffBtn(roleKey(next.role));
}
/* ══ LOGS TAB ══════════════════════════════════════════════════════════════
   The log as a listing - S.No, Deal Status, Remarks, Created By, Create Time,
   Portal - oldest first, under a bar naming the current status and who it is
   pending with. The actions this role can take sit right on that bar as
   buttons - the forward step solid, returns and rejections outlined - so
   logging a step is one or two clicks, not a dropdown hunt:
     - a step with its own form (Create Shipment, Generate PO, Submit SCR...)
       opens that form straight away;
     - any other step opens a small composer under the bar, already set to
       that action: Remarks (optional), Reason for a return, and a Submit
       named after the action. Ctrl+Enter in Remarks submits too. */
function isFormStep(id,action){return FORM_ACTIONS.indexOf(action)>=0;}
/* THREE LOGS DESIGNS, ONE SWITCH (Table, Timeline, Activity). "Table" is the listing with action buttons;
   "Timeline" is the earlier design - log cards down the left, the Add Log
   form beside them. A tiny two-icon toggle at the top of the tab flips
   between them and the choice is remembered in this browser.
   TEMPORARY: one design is to be chosen before these changes are pushed; the
   other, and this toggle, then go. */
var ICO_LIST='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>';
var ICO_TIMELINE='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="5" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><line x1="5" y1="7" x2="5" y2="17"/><line x1="10" y1="5" x2="21" y2="5"/><line x1="10" y1="19" x2="21" y2="19"/></svg>';
var ICO_ACTIVITY='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="12" y1="6" x2="21" y2="6"/><line x1="12" y1="18" x2="21" y2="18"/></svg>';
function logViewToggle(){
  var v=state.logView;
  return '<div class="sc-logview" role="group" aria-label="Logs design">'
    +'<button type="button" class="'+(v!=='timeline'&&v!=='activity'?'is-on':'')+'" title="Table view" onclick="scLogView(\'table\')">'+ICO_LIST+'</button>'
    +'<button type="button" class="'+(v==='timeline'?'is-on':'')+'" title="Timeline view" onclick="scLogView(\'timeline\')">'+ICO_TIMELINE+'</button>'
    +'<button type="button" class="'+(v==='activity'?'is-on':'')+'" title="Activity view" onclick="scLogView(\'activity\')">'+ICO_ACTIVITY+'</button>'
  +'</div>';
}
function scLogView(v){
  state.logView=v;state.logAdd=null;
  try{localStorage.setItem('sc-logview',v);}catch(e){}
  scRender();
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
    sub='Next step: <b>'+esc(o.next.action)+'</b>. Nothing for '+esc(state.role)+' to do here yet.';
    btn=o.nextBtn||'';
  }else if(o.state==='completed'){
    cls='is-done';ico=ICO_DONE;t=o.doneTitle||'Transaction completed';
    sub=(o.doneSub||'All steps are done.')+(e?' '+(o.doneVerb||'Closed')+' on '+esc(e.date)+' by '+esc(e.by)+'.':'');
  }else if(o.state==='rejected'){
    cls='is-bad';ico=ICO_REJECT;t='SCR rejected';
    sub=(e?'Rejected on '+esc(e.date)+' by '+esc(e.by)+'.':'This SCR was rejected.')
      +(e&&(e.reason||e.comment)?' Reason: '+esc(e.reason||e.comment)+'.':'')+' No further steps.';
  }else return '';
  return '<div class="sc-empty sc-state '+cls+'"><div class="sc-empty-ico">'+ico+'</div>'
    +'<div class="sc-empty-title">'+esc(t)+'</div><div class="sc-empty-sub">'+sub+'</div>'
    +(btn?'<div class="sc-state-btn">'+btn+'</div>':'')+'</div>';
}
/* the last log entry with this status (logs arrive newest first) */
function lastLogOf(logs,status){for(var i=0;i<logs.length;i++)if(logs[i].status===status)return logs[i];return null;}
function logsTabHTML(o){
  return '<div class="sc-logs-wrap">'+logViewToggle()+(state.logView==='timeline'?logsTimelineHTML(o):state.logView==='activity'?logsActivityHTML(o):logsTableHTML(o))+'</div>';
}
/* Shared by the Activity design: the kind of step a log entry is, its icon,
   the day / time wording and the link to the document it touched. */
var FEED_ICO={
  ok:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>',
  bad:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  add:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  sys:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9z"/></svg>',
  next:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>'
};
function feedKind(l){
  var st=l.status;
  if(l.by==='System')return 'sys';
  if(/Rejected/.test(st))return 'bad';
  if(/Returned|^Moved back|Short Close/.test(st))return 'back';
  if(/Updated/.test(st))return 'edit';
  if(/Submitted|Generated|Created|Auto-Created/.test(st))return 'add';
  return 'ok';
}
/* a day header reads Today / Yesterday when it can */
function feedDay(date){
  if(date===fmtDate(new Date()))return 'Today';
  if(date===fmtDate(new Date(Date.now()-864e5)))return 'Yesterday';
  return date;
}
function shortTime(t){return fmtTime(t).replace(/:\d\d (AM|PM)$/,' $1');}
function feedOpen(o){return !!(o.next&&o.state!=='completed'&&o.state!=='rejected');}
function feedLinkHTML(l,o){
  var v=WF_VIEW[l.status];
  return v?'<button type="button" class="sc-feed-link" onclick="scGoTab(\''+v[1]+'\',\''+(o.dealId||LIVE_ID)+'\')">'+esc(v[0])+' '+ICO_OUT+'</button>':'';
}
/* ── Timeline design: one CARD per log entry down the left, newest first - a
   person marker on the rail, the status in colour (blue for the latest, green
   for done, amber for a return, red for a rejection), then a details box
   (Updated by · Date & time · Portal) and the reason / remarks in their own
   boxes. The Add Log form sits beside it: current status, a Status select
   with what this role can do, Remarks, Cancel / Submit. ── */
var CARD_ICO={
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  web:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
};
function logsTimelineHTML(o){
  var logs=vendorView(o.logs);
  var cards=logs.map(function(l,n){
    var f=feedKind(l),k=f==='bad'?'bad':f==='back'?'wait':n===0?'info':'ok';
    return '<div class="sc-lc-row is-'+k+'">'
      +'<div class="sc-lc-rail"><span class="sc-lc-av">'+CARD_ICO.user+'</span></div>'
      +'<div class="sc-lc-card">'
        +'<div class="sc-lc-status"><span class="sc-lc-dot"></span>'+esc(l.status)+'</div>'
        +'<div class="sc-lc-box">'
          +'<div class="sc-lc-f"><div class="sc-lc-k">'+CARD_ICO.user+'Updated by</div>'
            +'<div class="sc-lc-v">'+esc(l.by)+'</div>'+(l.role&&l.role!==l.by?'<div class="sc-lc-s">'+esc(l.role)+'</div>':'')+'</div>'
          +'<div class="sc-lc-grid">'
            +'<div class="sc-lc-f"><div class="sc-lc-k">'+CARD_ICO.cal+'Date &amp; time</div>'
              +'<div class="sc-lc-v">'+esc(l.date)+'</div><div class="sc-lc-s">'+esc(fmtTime(l.time))+'</div></div>'
            +'<div class="sc-lc-f"><div class="sc-lc-k">'+CARD_ICO.web+'Portal</div><div class="sc-lc-v">'+esc(l.portal||'Web')+'</div></div>'
          +'</div>'
        +'</div>'
        +(l.reason?'<div class="sc-lc-note is-reason"><div class="sc-lc-k">Reason</div>'+esc(l.reason)+'</div>':'')
        +(l.comment?'<div class="sc-lc-note"><div class="sc-lc-k">Remarks</div>'+esc(l.comment)+'</div>':'')
      +'</div></div>';
  }).join('');
  var timeline=logs.length?'<div class="sc-lc">'+cards+'</div>':'<div class="lp-logs-empty">No activity logs yet.</div>';
  var ro=!o.opts.length,card=logStateCard(o);
  var form=card?'<div class="lp-logs-form sc-state-side">'+card+'</div>':'<div class="lp-logs-form">'
    +'<div class="lp-logs-form-header"><span class="lp-log-dot lp-log-dot--info"></span>'+esc(o.current)+'</div>'
    +'<p class="lp-logs-form-sub">'+o.sub+'</p>'
    +'<div class="lp-logs-form-label">Status <span class="lp-logs-form-req">*</span></div>'
    +csField(o.id+'-status',o.opts,'','Select Status','scCardPicked')
    +reasonFieldHTML(o.id,'')
    +'<div class="lp-logs-form-label">Remarks</div>'
    +'<textarea class="lp-logs-form-textarea" id="'+o.id+'-comment" placeholder="Enter remarks"'+(ro?' disabled':'')+'></textarea>'
    +'<div class="sc-logs-btns">'
      +'<button class="btn-outline" onclick="scCardReset(\''+o.id+'\')"'+(ro?' disabled':'')+'>Cancel</button>'
      +'<button class="lp-logs-save-btn" onclick="'+(o.submit||'void 0')+'()"'+(ro?' disabled':'')+'>Submit</button>'
    +'</div>'
    +(o.note&&ro?'<p class="lp-logs-form-sub" style="margin:12px 0 0">'+o.note+'</p>':'')
    +'</div>';
  return '<div class="lp-logs-wrap">'+timeline+form+'</div>';
}
/* picking a status shows the reason a return needs; a step with its own form opens it */
function scCardPicked(val,csid){
  var fid=csid.replace(/-status$/,'');toggleReason(fid,val);
  var id=fid==='sc-sample'?state.dealSel:LIVE_ID;
  if(isFormStep(id,val))scLogQuick('',id,val);
}
function scCardReset(fid){
  var t=document.getElementById(fid+'-comment');if(t)t.value='';
  csValues[fid+'-status']='';toggleReason(fid,'');
  var tr=document.querySelector('[data-csid="'+fid+'-status"]');
  if(tr){tr.querySelector('.cs-value').textContent='Select Status';tr.classList.add('cs-placeholder');}
  document.querySelectorAll('#csd-'+fid+'-status .cs-option').forEach(function(x){x.classList.remove('cs-selected');});
}
function remarksBoxHTML(o,ph){
  return '<textarea class="lp-logs-form-textarea" id="'+o.id+'-comment" placeholder="'+(ph||'Add a note for the next person')+'"'
    +' onkeydown="if((event.ctrlKey||event.metaKey)&&event.key===\'Enter\'){event.preventDefault();scTimelineSubmit(\''+o.id+'\',\''+o.submit+'\')}"></textarea>';
}
function submitBtnHTML(o,sel,cls){
  return '<button class="lp-logs-save-btn'+(cls?' '+cls:'')+(sel&&/^Reject/.test(sel)?' is-warn':'')+'" id="'+o.id+'-submit"'
    +' onclick="scTimelineSubmit(\''+o.id+'\',\''+o.submit+'\')"'+(sel?'':' disabled')+'>'+esc(sel||'Submit')+'</button>';
}
/* the side panel: current status, the actions as tiles, reason, remarks, Submit */
var KBD_HINT='<div class="sc-tl-hint"><kbd>Ctrl</kbd> + <kbd>Enter</kbd> to submit</div>';
function actionPanelHTML(o){
  var ro=!o.opts.length,card=logStateCard(o);
  if(card)return '<div class="lp-logs-form sc-state-side">'+card+'</div>';
  /* one action on offer is picked already - unless it opens a form of its own */
  var only=o.opts.length===1&&!isFormStep(o.dealId,o.opts[0])?o.opts[0]:'';
  /* when every action opens its own form, the tile is the button - no remarks or Submit to dangle */
  var allForms=!ro&&o.opts.every(function(a){return isFormStep(o.dealId,a);});
  return '<div class="lp-logs-form sc-tl-form">'
    +'<div class="sc-tl-eyebrow">Current status</div>'
    +'<div class="lp-logs-form-header"><span class="lp-log-dot lp-log-dot--info"></span>'+esc(o.current)+'</div>'
    +'<p class="lp-logs-form-sub">'+o.sub+'</p>'
    +(ro?'':'<div class="lp-logs-form-label">Action <span class="lp-logs-form-req">*</span></div>'
      +actionTilesHTML(o.id,o.dealId,o.opts,only))
    +reasonFieldHTML(o.id,only)
    +(allForms?'<div class="sc-tl-hint" style="margin-top:-4px">Opens a form - add your remarks there.</div>':'')
    +(ro||allForms?'':'<div class="lp-logs-form-label">Remarks <span class="sc-tl-opt">optional</span></div>'+remarksBoxHTML(o)
      +'<div class="sc-logs-btns"><button class="btn-outline" onclick="scTimelineReset(\''+o.id+'\')">Clear</button>'+submitBtnHTML(o,only)+'</div>'+KBD_HINT)
    +(o.note&&ro?'<p class="lp-logs-form-sub" style="margin:12px 0 0">'+o.note+'</p>':'')
    +'</div>';
}

/* The role's actions as tiles, not a dropdown: there are rarely more than
   three, so all of them show at once. Forward steps first, then returns and
   rejections in the warning tone; a step that opens its own form says so. */
var TILE_ICO={
  go:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  back:FEED_ICO.back,bad:FEED_ICO.bad
};
function actionTilesHTML(fid,dealId,opts,sel){
  csValues[fid+'-status']=sel||'';
  var ord=opts.slice().sort(function(a,b){return /^(Return|Reject)/.test(a)-/^(Return|Reject)/.test(b);});
  return '<div class="sc-tiles" role="radiogroup" id="'+fid+'-tiles">'+ord.map(function(a){
    var k=/^Reject/.test(a)?'bad':/^Return/.test(a)?'back':'go',form=isFormStep(dealId,a);
    return '<button type="button" role="radio" aria-checked="'+(a===sel)+'" class="sc-tile is-'+k+(a===sel?' is-on':'')+'"'
      +' data-action="'+esc(a)+'" onclick="scTilePick(this,\''+fid+'\',\''+esc(dealId)+'\')">'
      +'<span class="sc-tile-ico">'+TILE_ICO[k]+'</span><span class="sc-tile-label">'+esc(a)+'</span>'
      +(form?'<span class="sc-tile-form" title="Opens its own form">Form '+ICO_OUT+'</span>':'')
      +'</button>';
  }).join('')+'</div>';
}
function scTilePick(btn,fid,dealId){
  var a=btn.getAttribute('data-action');
  /* a step with its own form opens it straight away */
  if(isFormStep(dealId,a)){scLogQuick('',dealId,a);return;}
  btn.parentNode.querySelectorAll('.sc-tile').forEach(function(t){
    var on=t===btn;t.classList.toggle('is-on',on);t.setAttribute('aria-checked',on);
  });
  csValues[fid+'-status']=a;toggleReason(fid,a);
  scTimelineSync(fid);
  var f=document.querySelector('#'+fid+'-reason-wrap .cs-trigger')||document.getElementById(fid+'-comment');
  if(f&&f.offsetParent!==null)f.focus();
}
/* Submit is named after the chosen action, red for a rejection */
function scTimelineSync(fid){
  var a=csValue(fid+'-status'),b=document.getElementById(fid+'-submit');
  /* the Activity panel's header follows the chosen action */
  var mv=document.getElementById(fid+'-move');if(mv)mv.textContent=a||mv.getAttribute('data-def');
  if(!b)return;
  b.textContent=a||'Submit';b.disabled=!a;
  b.classList.toggle('is-warn',/^Reject/.test(a));
}
function scTimelineSubmit(fid,submit){
  if(!csValue(fid+'-status')){scToast('Choose an action first','error');return;}
  if(typeof window[submit]==='function')window[submit]();
}
function scTimelineReset(fid){
  var t=document.getElementById(fid+'-comment');if(t)t.value='';
  csValues[fid+'-status']='';toggleReason(fid,'');
  document.querySelectorAll('#'+fid+'-tiles .sc-tile').forEach(function(t){t.classList.remove('is-on');t.setAttribute('aria-checked','false');});
  scTimelineSync(fid);
}
/* ── Activity design: a status header across the top (where the deal is, what
   is next and with whom, and how far along the process it is), then the
   history as people's entries - an avatar with a small badge for the kind of
   step, name · role · time, the step as one soft badge with its document,
   and the remarks in a bubble. The role's actions sit beside it as chips. ── */
function initials(n){return String(n||'').split(/\s+/).filter(Boolean).map(function(w){return w.charAt(0);}).join('').slice(0,2).toUpperCase();}
function logsActivityHTML(o){
  var logs=vendorView(o.logs),id=o.dealId||LIVE_ID,n=WF_FLOW.length;
  var at=o.state==='completed'?n-1:progressIndex(dealEventsOldestFirst(id)),step=Math.max(0,Math.min(n,at+1));
  var tone=o.state==='rejected'?'bad':o.state==='completed'?'ok':'info';
  var sub=feedOpen(o)?'Next: <b>'+esc(o.next.action)+'</b><span class="sc-ac-with">with '+esc(o.next.role)+'</span>'
    :o.state==='rejected'?'This SCR was rejected. No further steps.':o.state==='completed'?'All steps are done.':o.sub;
  var hero='<div class="sc-ac-hero is-'+tone+'">'
    +'<span class="sc-ac-hero-ico">'+(tone==='bad'?ICO_REJECT:tone==='ok'?ICO_DONE:ICO_HOURGLASS)+'</span>'
    +'<div class="sc-ac-hero-main"><div class="sc-ac-eyebrow">Current status</div>'
      +'<div class="sc-ac-hero-title">'+esc(o.current)+'</div><div class="sc-ac-hero-sub">'+sub+'</div></div>'
    +'<div class="sc-ac-prog" title="'+step+' of '+n+' steps in the sub-contracting process">'
      +'<div class="sc-ac-prog-top"><span>Progress</span><b>Step '+step+' of '+n+'</b></div>'
      +'<div class="sc-ac-bar"><i style="width:'+Math.round(step/n*100)+'%"></i></div></div>'
  +'</div>';
  var html='',day='';
  /* the history stays quiet - grey avatars, the step as plain text, remarks
     as plain text - so the eye goes to the panel where the log is changed.
     Only a return or rejection keeps its colour, on the step's text. */
  if(feedOpen(o))
    html+='<div class="sc-ac-item is-next"><span class="sc-ac-av is-next">'+FEED_ICO.next+'</span><div class="sc-ac-main">'
      +'<div class="sc-ac-head"><span>Waiting on <b>'+esc(o.next.role)+'</b></span></div>'
      +'<div class="sc-ac-line"><span class="sc-ac-step">'+esc(o.next.action)+'</span></div></div></div>';
  logs.forEach(function(l,i){
    if(l.date!==day){day=l.date;html+='<div class="sc-ac-day"><span>'+esc(feedDay(day))+'</span></div>';}
    var k=feedKind(l),sys=l.by==='System';
    html+='<div class="sc-ac-item'+(i===0?' is-now':'')+'">'
      +'<span class="sc-ac-av'+(sys?' is-sys':'')+'">'+(sys?FEED_ICO.sys:esc(initials(l.by)))+'</span>'
      +'<div class="sc-ac-main">'
        +'<div class="sc-ac-head"><b>'+esc(l.by)+'</b>'+(l.role&&!sys?'<span class="sc-ac-role">'+esc(l.role)+'</span>':'')
          +'<span class="sc-ac-time" title="'+esc(l.date+' · '+fmtTime(l.time)+' · '+(l.portal||'Web')+' portal')+'">'+esc(shortTime(l.time))+'</span></div>'
        +'<div class="sc-ac-line"><span class="sc-ac-step is-'+k+'">'+esc(l.status)+'</span>'+feedLinkHTML(l,o)+'</div>'
        +(l.reason?'<div class="sc-ac-note is-reason">Reason: '+esc(l.reason)+'</div>':'')
        +(l.comment?'<div class="sc-ac-note">'+esc(l.comment)+'</div>':'')
      +'</div></div>';
  });
  var feed='<div class="sc-ac-feedwrap"><div class="sc-ac-title">Activity <span>'+logs.length+'</span></div>'
    +(logs.length?'<div class="sc-ac-feed">'+html+'</div>':'<div class="lp-logs-empty">No activity logs yet.</div>')+'</div>';
  return hero+'<div class="lp-logs-wrap sc-ac-wrap">'+feed+activityPanelHTML(o)+'</div>';
}
/* the role's side, where the log is changed - the one place in this design
   that carries weight: a header naming the move (current status -> step), the
   actions, reason, remarks and Submit. The status card when there is nothing to do. */
function activityPanelHTML(o){
  var card=logStateCard(o);
  if(card)return '<div class="lp-logs-form sc-state-side">'+card+'</div>';
  if(!o.opts.length)return '<div class="lp-logs-form sc-ac-form"><div class="sc-ac-form-head"><div class="sc-ac-form-title">Update log</div>'
    +'<div class="sc-ac-move"><span>'+esc(o.current)+'</span></div></div><div class="sc-ac-form-body"><p class="lp-logs-form-sub">'+(o.note||'Nothing for you to do here yet.')+'</p></div></div>';
  var only=o.opts.length===1&&!isFormStep(o.dealId,o.opts[0])?o.opts[0]:'';
  var allForms=o.opts.every(function(a){return isFormStep(o.dealId,a);});
  /* the panel says what the update does: from the current status to the step */
  var to=o.opts.filter(function(a){return !/^(Return|Reject)/.test(a);})[0]||o.opts[0];
  return '<div class="lp-logs-form sc-tl-form sc-ac-form">'
    +'<div class="sc-ac-form-head"><div class="sc-ac-form-title">Update log</div>'
      +'<div class="sc-ac-move"><span>'+esc(o.current)+'</span><i>→</i><b id="'+o.id+'-move" data-def="'+esc(only||to)+'">'+esc(only||to)+'</b></div></div>'
    +'<div class="sc-ac-form-body">'
    +'<div class="lp-logs-form-label">Action <span class="lp-logs-form-req">*</span></div>'
    +actionTilesHTML(o.id,o.dealId,o.opts,only)
    +reasonFieldHTML(o.id,only)
    +(allForms?'<div class="sc-tl-hint" style="margin-top:-4px">Opens a form - add your remarks there.</div>'
      :'<div class="lp-logs-form-label">Remarks <span class="sc-tl-opt">optional</span></div>'+remarksBoxHTML(o)
      +'<div class="sc-logs-btns"><button class="btn-outline" onclick="scTimelineReset(\''+o.id+'\')">Clear</button>'+submitBtnHTML(o,only)+'</div>'+KBD_HINT)
    +'</div></div>';
}
/* ── Table design ── */
function logsTableHTML(o){
  var la=state.logAdd,adding=la&&la.key===o.key&&(o.opts.indexOf(la.action)>=0||la.action==='Move Back')?la.action:'';
  var btns=o.opts.map(function(a){
    var back=/^(Return|Reject)/.test(a);
    return '<button class="'+(back?'btn-outline':'btn-primary')+' btn-sm sc-quick-btn'+(adding===a?' is-on':'')+'" type="button"'
      +' onclick="scLogQuick(\''+o.key+'\',\''+o.dealId+'\',\''+a.replace(/'/g,"\\'")+'\')">'+esc(a)+'</button>';
  }).join('');
  var logs=vendorView(o.logs).slice().reverse();
  var card=logStateCard(o);
  var head=card||'<div class="sc-logs-bar"><div class="sc-logs-cur">'
      +'<div class="lp-logs-form-header"><span class="lp-log-dot lp-log-dot--info"></span>'+esc(o.current)+'</div>'
      +'<p class="lp-logs-form-sub">'+o.sub+'</p>'+(o.note&&!o.opts.length?'<div class="sc-logs-note">'+o.note+'</div>':'')+'</div>'
    +(btns?'<div class="sc-quick-actions">'+btns+'</div>':'')
    +'</div>';
  /* While an action is being logged the bar and the form become ONE card: the
     top names the move (current status -> action) with a close button, so the
     action's button appears once - on the card's footer - not on the bar too. */
  if(adding){
    var back=/^(Return|Reject)/.test(adding);
    var mb=adding==='Move Back',go=mb?'scMoveBackSubmit(\''+o.id+'\')':'scLogQuickSubmit(\''+o.id+'\',\''+o.submit+'\')';
    head='<div class="sc-logadd'+(back||mb?' is-back':'')+'">'
      +'<div class="sc-logadd-head"><div class="sc-logadd-move">'
        +'<span class="sc-logadd-from">'+esc(o.current)+'</span><span class="sc-logadd-arrow">→</span>'
        +'<span class="sc-logadd-to">'+(mb?'Move back to '+esc(la.target):esc(adding))+'</span></div>'
        +'<button type="button" class="sc-logadd-x" title="Cancel" aria-label="Cancel" onclick="scLogCancel()">'
          +'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>'
      +'<div class="sc-logadd-body">'
        +(mb?'<p class="sc-mb-note">The deal returns to the state right after <b>'+esc(la.target)+'</b>. Later steps stay in the log as history, and the next role picks up from there.</p>':'')
        +'<div class="policy-form-grid">'
        +reasonFieldHTML(o.id,adding)
        +'<div class="ep-form-group ep-form-full"><label class="ep-form-label">Remarks <span class="sc-tl-opt">optional</span></label>'
          +'<textarea class="ep-form-input" id="'+o.id+'-comment" placeholder="Add a note for the next person"'
          +' onkeydown="if((event.ctrlKey||event.metaKey)&&event.key===\'Enter\'){event.preventDefault();'+go+'}"></textarea></div>'
        +'</div></div>'
      +'<div class="sc-logadd-foot"><span class="sc-logadd-hint"><kbd>Ctrl</kbd> + <kbd>Enter</kbd> to submit</span>'
        +'<div class="sc-logadd-btns"><button class="btn-outline" onclick="scLogCancel()">Cancel</button>'
        +(mb?'<button class="btn-outline sc-btn-warn" onclick="'+go+'">Move Back</button>'
            :'<button class="'+(/^Reject/.test(adding)?'btn-primary sc-btn-danger':'btn-primary')+'" onclick="'+go+'">'+esc(adding)+'</button>')
      +'</div></div></div>';
  }
  var sa=state.role==='Super Admin'&&o.key.indexOf('deal:')===0,mbTargets=sa?moveBackTargets(o.dealId):[];
  var lastIdx={};logs.forEach(function(l,i){lastIdx[l.status]=i;});
  var table=logs.length?recTable(['S.No','Deal Status','Remarks','Created By','Create Time'].concat(sa?['Action']:[]),
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
  /* while a log is being added the form has the tab to itself - the list returns on Submit or Cancel */
  return '<div class="sc-logs">'+head+(adding?'':table)+'</div>';
}
function scLogQuick(key,id,action){
  if(isFormStep(id,action)){
    state.logAdd=null;
    if(action==='Submit SCR'){scOpenResubmit(id);return;}
    scOpenActionModal(action,'',PO_ACTIONS.indexOf(action)>=0?'order':'deal',id);return;
  }
  state.logAdd={key:key,action:action};scRender();
  /* straight into the box: the reason when one is needed, else the remarks */
  setTimeout(function(){
    var f=document.querySelector('.sc-logadd .sc-reason-field .cs-trigger')||document.querySelector('.sc-logadd textarea');
    if(f&&f.offsetParent!==null)f.focus();
  },0);
}
function scLogQuickSubmit(formId,submit){
  if(!state.logAdd)return;
  csValues[formId+'-status']=state.logAdd.action;
  window[submit]();
}
function scLogCancel(){state.logAdd=null;scRender();}

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
  for(var i=events.length-1;i>=0;i--)if(/^Moved back to /.test(events[i].status)){start=i;last=flowIndex(events[i].status.slice(14));break;}
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
  state.logAdd={key:key,action:'Move Back',target:target,dealId:id};scRender();
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
function moveDealBack(id,target,comment){
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
    S.asns=[];S.imrs=[];S.reconciled=S.shortClosed=S.fullReceipt=S.closed=false;
    addDealLog('Moved back to '+target,comment);
    return;
  }
  var d=sampleDeal(id);if(!d)return;
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
  else{d.asns=asnN;d.imrs=k>=12?imrN:0;d.received=k>=13?d.item.qty:0;}
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
  d.extra.push({status:'Moved back to '+target,role:state.role,by:who(),comment:comment,reason:curReason,
    date:t.date,time:t.time,portal:'Web',seq:++scSeq});
}
function dealLogsHTML(){
  var opts=validDealActions(),last=state.dealLogs[0],who=pendingWith(),next=liveNext();
  return logsTabHTML({key:'deal:'+LIVE_ID,dealId:LIVE_ID,id:'sc-deal',logs:state.dealLogs,opts:opts,submit:'scSubmitDealLog',
    current:last?last.status:scrLabel(),
    sub:who&&who!=='—'?'Next action is pending with <b>'+esc(who)+'</b>.':'No further actions on this deal.',
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
  if(FORM_ACTIONS.indexOf(action)>=0){scOpenActionModal(action,comment,'deal');return;}
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
  return bar+'<div class="lp-isb-body">'+body+'</div>';
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
    current:'PO '+poLabel(),sub:'Actions on this Purchase Order.',note:opts.length?'':orderHandoff(),
    state:done?'completed':next?'waiting':'',next:next,nextBtn:next?handoffBtn(next.role):'',
    endLog:lastLogOf(state.poLogs,'PO Approved'),doneTitle:'PO '+poLabel(),doneVerb:'Approved',
    doneSub:'Nothing further is pending on this Purchase Order.'});
}
function scSubmitOrderLog(){
  var action=csValue('sc-po-status');
  var comment=(document.getElementById('sc-po-comment')||{value:''}).value.trim();
  if(!action){scToast('Select a status first','error');return;}
  if(action==='Generate PO'){scOpenActionModal(action,comment,'order');return;}
  var reason=readReason('sc-po');
  if(reasonMissing(action,reason))return;
  withReason(reason,function(){executePOAction(action,comment);});
  state.logAdd=null;
  scRender();
}
function executePOAction(action,comment){
  if(action==='Approve PO'){state.po='approved';state.poApproved=stamp().date;addPOLog('PO Approved',comment);scToast('PO '+LIVE_PO+' approved');}
  if(action==='Return PO'){addPOLog('PO Returned',comment);scToast('PO returned to Buyer','info');}
}

/* ══ SAMPLE DEAL PANEL ════════════════════════════════════════════════════
   The same tabs and components as the live deal, filled from the sample
   record. Read-only: the Logs tab says which role and action are next instead
   of offering a form, because only the live deal walks the process. */
function samplePanelHTML(d){
  var tabs=DEAL_TABS;
  var bar=tabBarHTML(tabs,state.dealTab,'scDealTab','scCloseDeal','sc-deal-tabs');
  var t=state.dealTab,body;
  if(t==='details')body=sampleDetailsHTML(d);
  else if(t==='workflow')body=sampleWorkflowHTML(d);
  else if(t==='logs')body=sampleLogsHTML(d);
  else if(t==='history')body=historyHTML(d.id);
  else if(DOC_TABS[t])body=DOC_TABS[t](dealDocs(d.id));
  else body=attachmentsHTML(d.id);
  body=withTools(d.id,t,body);
  return bar+'<div class="lp-isb-body">'+body+'</div>';
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
    sub:next?'Next action is pending with <b>'+esc(next.role)+'</b>.':'The transaction is closed. No further actions.',
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
  if(action==='Submit SCR'){scOpenResubmit(d.id);return;}
  var reason=readReason('sc-sample');
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
    body=logsTabHTML({key:'po:'+d.po.no,dealId:d.id,id:'sc-sample-po',logs:plogs,opts:[],
      current:'PO '+d.po.status,sub:'Purchase Order '+esc(d.po.no)+'.',
      state:pnext?'waiting':'completed',next:pnext,nextBtn:pnext?handoffBtn(pnext.role):'',
      endLog:lastLogOf(plogs,'PO Approved'),doneTitle:'PO '+d.po.status,doneVerb:'Approved',
      doneSub:'Nothing further is pending on this Purchase Order.'});
  }
  if(state.orderTab==='details')body=poTools(d.po.no,body);
  return bar+'<div class="lp-isb-body">'+body+'</div>';
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
function executeDealAction(action,comment){
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
    var i=state.asns.findIndex(function(a){return a.qc==='Created';});
    if(i>=0){state.asns[i].qc='QC Cleared';addDealLog('ASN QC Cleared',comment+' — '+state.asns[i].no);scToast(state.asns[i].no+' cleared by QC');}
  }
  else if(action==='Return ASN'){
    var j=state.asns.findIndex(function(a){return a.qc==='Created';});
    if(j>=0){addDealLog('ASN Returned',comment+' — '+state.asns[j].no);scToast(state.asns[j].no+' returned to vendor','info');}
  }
  else if(action==='Confirm Gate Inward'){
    var k=state.asns.findIndex(function(a){return a.qc==='QC Cleared'&&!a.gateIn;});
    if(k>=0){state.asns[k].gateIn=true;addDealLog('Gate Inward Confirmed',comment+' — '+state.asns[k].no);scToast('Gate inward confirmed for '+state.asns[k].no);}
  }
  else if(action==='Confirm IMR'){
    var m=state.imrs.findIndex(function(x){return x.status==='Created';});
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
  m.innerHTML='<div class="sc-act-head">'+esc(state.role)+'</div>'
    +(list.length?list.map(function(a,i){
      if(scope==='po'&&PO_APPROVAL.indexOf(a)<0)return '';
      var on=ok.indexOf(a)>=0;
      return '<div class="ct-act-item'+(on?' sc-act-avail':' done')+'"'
        +(on?' onclick="scRowAction(\''+id+'\','+i+')"':' title="Not available at this stage"')+'>'
        +esc(a)+'</div>';
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

var usRow=null;
function scRowAction(id,i){
  scCloseRowMenu();
  var action=rowActionsFor()[i];if(!action)return;
  /* A step that creates something opens its own form, not just a status
     change: Create Shipment on any deal; every form step on the live deal. */
  if(action==='Submit SCR'){scOpenResubmit(id);return;}
  if(FORM_ACTIONS.indexOf(action)>=0){
    scOpenActionModal(action,'',PO_ACTIONS.indexOf(action)>=0?'order':'deal',id);return;
  }
  scOpenUS(id,action,'');
}
function usReviewHTML(id,action){
  var rv=reviewOf(id,action);if(!rv)return '';
  return '<div class="sc-us-review"><div><div class="sc-us-review-t">Review before you confirm</div>'
    +'<div class="sc-us-review-s">Open the '+esc(rv.label.replace(/^View /,''))+' this step acts on.</div></div>'
    +'<button class="btn-outline btn-sm" type="button" onclick="scUSReview()">'+ICO.eye+' '+esc(rv.label)+'</button></div>';
}
/* The viewer shares the modal root, so the form is put away and brought back
   with its status and comment when the viewer closes (scCloseModal). */
function scUSReview(){
  if(!usRow)return;
  usRow.action=csValue('sc-us-status');
  usRow.comment=(document.getElementById('sc-us-comment')||{value:''}).value;
  var rv=reviewOf(usRow.id,usRow.action);if(!rv)return;
  usRow.back=true;
  scOpenView(rv.type,rv.index,usRow.id);
}
function scOpenUS(id,action,comment){
  var r=dealRows().filter(function(x){return x.id===id;})[0];if(!r)return;
  usRow={id:id};
  var res=ACTION_RESULT[action]||action;
  var body='<div class="sc-us-flow">'+badge(rampTone(r.cur),r.cur)
      +'<span class="sc-us-arrow">'+ICO_ARROW+'</span><span id="sc-us-next">'+badge(rampTone(res),res)+'</span></div>'
    +'<div id="sc-us-review">'+usReviewHTML(id,action)+'</div>'
    +field('Status',csField('sc-us-status',rowAvailable(id),action,'Select Status','scUSPicked'),true,true)
    +reasonFieldHTML('sc-us',action)
    +field('Remarks','<textarea class="lp-logs-form-textarea sc-us-comment" id="sc-us-comment" placeholder="Why is this deal moving? (optional)">'+esc(comment||'')+'</textarea>',false,true);
  var foot='<button class="sc-us-log" type="button" onclick="scUSViewLog()">View full log</button>'
    +'<div class="ct-modal-btns">'
      +'<button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
      +'<button class="btn-primary" onclick="scUSSubmit()">Submit</button>'
    +'</div>';
  document.getElementById('sc-modal-root').innerHTML=
    modalShell('Update Status',r.id+' · '+r.vendor+' · '+r.process,'<div class="sc-us-body">'+body+'</div>',foot);
  var c=document.getElementById('sc-us-comment');if(c)c.focus();
}
function scUSPicked(val){
  var res=ACTION_RESULT[val]||val,el=document.getElementById('sc-us-next');
  if(el)el.innerHTML=badge(rampTone(res),res);
  var rv=document.getElementById('sc-us-review');
  if(rv&&usRow)rv.innerHTML=usReviewHTML(usRow.id,val);
  toggleReason('sc-us',val);
}
function scUSViewLog(){
  var id=usRow&&usRow.id;scCloseModal();if(!id)return;
  if(!(state.dealOpen&&state.dealSel===id))scOpenDeal(id);
  scDealTab('logs');
}
function scUSSubmit(){
  var id=usRow&&usRow.id;if(!id)return;
  var action=csValue('sc-us-status');
  var comment=(document.getElementById('sc-us-comment')||{value:''}).value.trim();
  if(!action){scToast('Select a status first','error');return;}
  var reason=readReason('sc-us');
  if(reasonMissing(action,reason))return;
  if(id===LIVE_ID&&FORM_ACTIONS.indexOf(action)>=0){
    scOpenActionModal(action,comment,PO_ACTIONS.indexOf(action)>=0?'order':'deal');return;
  }
  withReason(reason,function(){
    if(id===LIVE_ID){
      if(PO_ACTIONS.indexOf(action)>=0)executePOAction(action,comment);
      else executeDealAction(action,comment);
    }else advanceSample(sampleDeal(id),action,comment);
  });
  scCloseModal();
  scRender();
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
  'Confirm Gate Outward':['Return Gate Outward']
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
  if(usRow&&usRow.back){usRow.back=false;scOpenUS(usRow.id,usRow.action,usRow.comment);}
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
    +field('Remarks','<textarea class="ep-form-input" id="f-remarks" style="min-height:76px">'+esc(ed?ed.remarks:'For urgent processing')+'</textarea>',false,true)
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
   ask for a mandatory Reason field of their own - the remarks stay optional.
   The reason travels on the log entry (logEntry reads curReason, set for the
   length of the one action) and shows as its own line in Logs and Workflow. */
var RETURN_ACTIONS=['Return SCR','Return PO','Return Shipment','Return Delivery Note','Return Gate Outward','Move Back','Short Close'];
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
  'Move Back':['Entered in error','Wrong document generated','Details need correction','Requested by the user'],
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
      addDealLog('SCR Updated','Details edited while with the PMG Approver.');
      scToast('SCR updated','success','The PMG Approver sees the changes.');
      finish();return;
    }else scToast('Changes saved','success','Submit the SCR when it is ready.');
  }else{
    var d=sampleDeal(id);if(!d)return;
    d.title=title;d.base=v('f-base')||d.base;d.buyer=v('f-buyer')||d.buyer;d.item.qty=qty;d.item.price=price;
    if(submit)advanceSample(d,'Submit SCR',note);
    else if(!d.returned){
      logDocUpdate(d.id,'SCR Updated','Details edited while with the PMG Approver.');
      scToast('SCR updated','success','The PMG Approver sees the changes.');
      finish();return;
    }else scToast('Changes saved','success','Submit the SCR when it is ready.');
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

/* ══ BOOT ═════════════════════════════════════════════════════════════════  */
document.getElementById('sc-create-btn').innerHTML=ICO.plus+' Create SCR';
scRender();
