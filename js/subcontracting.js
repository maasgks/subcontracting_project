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
  'Planner':['Create Shipment','Confirm Shipment'],
  'PMG Approver':['Approve SCR','Return SCR','Reject SCR','Confirm Shipment'],
  'Buyer':['Generate PO','Return SCR'],
  'PO Approver':['Approve PO','Return PO'],
  'Stores User':['Goods Release & Issue','Return Shipment','Create IMR','Confirm IMR'],
  'Delivery Note Approver':['Approve Delivery Note','Return Delivery Note'],
  'Finance / F&A / IDT':['Generate Challan','Return Challan','Complete Reconciliation','Short Close','Confirm Full Receipt','Close Transaction'],
  'Security User':['Confirm Gate Outward','Return Gate Outward','Confirm Gate Inward'],
  'Vendor User':['Create ASN'],
  'QC User':['Clear ASN','Return ASN'],
  'Super Admin':['Approve SCR','Return SCR','Reject SCR','Generate PO','Return PO','Approve PO',
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
  'Planner':['Create Shipment','Confirm Shipment'],
  'PMG Approver':['Approve SCR','Return SCR','Reject SCR'],
  'Buyer':['Generate PO'],
  'PO Approver':['Approve PO','Return PO'],
  'Stores User':['Goods Release & Issue','Return Shipment','Create IMR','Confirm IMR'],
  'Delivery Note Approver':['Approve Delivery Note','Return Delivery Note'],
  'Finance / F&A / IDT':['Generate Challan','Complete Reconciliation','Confirm Full Receipt','Close Transaction'],
  'Security User':['Confirm Gate Outward','Return Gate Outward','Confirm Gate Inward'],
  'Vendor User':['Create ASN'],
  'QC User':['Clear ASN'],
  'Super Admin':['Approve SCR','Return SCR','Reject SCR','Generate PO','Approve PO','Return PO',
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
  'Close Transaction':'Transaction Closed'
};
var PO_ACTIONS=['Generate PO','Approve PO','Return PO'];

/* The four actions that need more than a status and a comment. Picking one in
   the log form opens its own form instead of saving straight away. */
var FORM_ACTIONS=['Create Shipment','Create ASN','Create IMR','Short Close','Generate PO'];

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
function sampleScr(d){return d.rejected?'Rejected':d.stage==='scr'?'Sent for Approval':d.stage==='closed'?'Closed':'Approved';}
function sampleShip(d){
  if(d.stage==='closed')return 'Closed';
  if(!stageReached(d,'shipment'))return 'Not Started';
  if(d.stage==='shipment')return 'Created';
  if(d.stage==='outbound')return d.sub==='gate'||d.sub==='confirm'?'Challan Generated':'Freezed Outbound Release';
  return 'Challan Generated';
}
function scrToneOf(s){return s==='Rejected'?'unapproved':s==='Sent for Approval'?'pending':s==='Closed'?'closed':'approved';}
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
  if(state.scr==='sent')return 'scr';
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

function scrLabel(){return state.scr==='none'?'Not Created':state.scr==='sent'?'Sent for Approval':state.scr==='closed'?'Closed':'Approved';}
function scrTone(){return state.scr==='none'?'sc-idle':state.scr==='sent'?'pending':state.scr==='closed'?'closed':'approved';}
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
      var hasActive=(item.children||[]).some(function(c){return c.id===state.page;});
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
        c.className='sb-item'+(child.id===state.page?' active':'');
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
    b.className='sb-item'+(item.id===state.page?' active':'');
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
var TITLES={dashboard:'Dashboard',deals:'Deals',orders:'Purchase Orders'};
function scGo(page){
  state.page=page;
  state.dealOpen=false;state.orderOpen=false;
  /* Arriving from the rail is a fresh arrival at the page. Carrying a stage
     filter over from a dashboard card would leave the listing quietly scoped
     to something the user did not ask for on this visit. */
  state.stageFilter=null;state.stageLabel='';state.dealPage=1;state.orderPage=1;
  scRender();
}
function scRender(){
  document.getElementById('sc-page-title').textContent=TITLES[state.page]||'Sub-Contracting';
  /* Create SCR belongs to Deals and is hidden elsewhere, like every other
     page action in this header. */
  document.getElementById('sc-create-btn').style.display=state.page==='deals'?'inline-flex':'none';
  buildRoleMenu();
  buildRail();
  var el=document.getElementById('adt-content');
  el.innerHTML=state.page==='deals'?dealsPageHTML():state.page==='orders'?ordersPageHTML():dashboardHTML();
  /* A panel that was already open stays open through a re-render — with the
     class applied in the same frame, so it does not replay the slide-in every
     time a log is saved. Opening it from a row click is the other path, and
     that one animates (scOpenDeal / scOpenOrder). */
  if(state.page==='deals'&&state.dealOpen){
    var sb=document.getElementById('sc-deal-sb');
    if(sb){sb.classList.add('open');fillPanel('sc-deal-isb',dealPanelHTML());}
  }
  if(state.page==='orders'&&state.orderOpen){
    var ob=document.getElementById('sc-order-sb');
    if(ob){ob.classList.add('open');fillPanel('sc-order-isb',orderPanelHTML());}
  }
}

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
          +csField('sc-f-scr',['Sent for Approval','Approved','Closed'],f.scr,'SCR Status','scSyncReset')
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
      +'<td><div class="ct-action-wrap">'+createPOBtn(r)
        +'<button class="lp-action-btn" title="View details" onclick="event.stopPropagation();scOpenOrder(\''+r.no+'\')">'+ICO.hamburger+'</button>'
      +'</div></td>'
      +'</tr>';
  }).join('')||emptyRow(7,'No Purchase Orders match','Change the search or filters, or Reset to see every PO.');
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
          +'<table class="lp-table sc-orders-table'+(state.role==='Buyer'||state.role==='Super Admin'?' has-cta':'')+'"><thead><tr>'
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
  var switching=state.dealOpen;
  state.dealOpen=true;state.dealSel=id;
  if(!switching)state.dealTab='details';
  var sb=document.getElementById('sc-deal-sb');if(!sb)return;
  sb.classList.add('open');
  fillPanel('sc-deal-isb',dealPanelHTML());
  markSelectedRow(id);
}
function scCloseDeal(){
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
  sb.classList.add('open');
  fillPanel('sc-order-isb',orderPanelHTML());
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
  fillPanel('sc-deal-isb',dealPanelHTML());
}
function scOrderTab(tab){
  state.orderTab=tab;
  fillPanel('sc-order-isb',orderPanelHTML());
}
function refreshDealPanel(){
  if(state.dealOpen&&document.getElementById('sc-deal-isb'))
    fillPanel('sc-deal-isb',dealPanelHTML());
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
      return '<button class="lp-isb-tab'+(current===t.id?' active':'')+'" onclick="'+handler+'(\''+t.id+'\')">'+esc(t.label)+'</button>';
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
/* A section head whose table can be opened full-width in a popup. The panel
   is narrow, so a twelve-column item table only shows its first few columns
   there; the expand button shows the same table in a wide modal. */
var ICO_EXPAND='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
function tableHead(title){
  return secHead(title,'<button class="sc-expand-btn" type="button" title="Expand" aria-label="Expand '+esc(title)+'" onclick="scExpandTable(this)">'+ICO_EXPAND+'</button>');
}
function scExpandTable(btn){
  var head=btn.closest('.lp-sb-view-header'),wrap=head&&head.nextElementSibling;
  if(!wrap||!wrap.classList.contains('sc-rec-wrap'))return;
  var title=head.querySelector('.lp-sb-section-title').textContent;
  var id=usRow&&usRow.back?usRow.id:state.dealOpen?state.dealSel:state.orderOpen?state.orderSel:'';
  var n=wrap.querySelectorAll('tbody tr').length;
  /* Expanded from inside a popup (a View SCR, say): that popup is kept and
     comes back when this one closes, instead of being lost. */
  var root=document.getElementById('sc-modal-root');
  if(root.innerHTML)modalStack.push(root.innerHTML);
  root.innerHTML=
    '<div class="ct-modal-overlay" onclick="if(event.target===this)scCloseModal()">'
    +'<div class="ct-modal sc-table-modal" role="dialog" aria-modal="true">'
      +'<div class="ct-modal-hdr"><div><div class="ct-modal-title">'+esc(title)+'</div>'
      +'<div class="ct-modal-sub">'+esc((id?id+' · ':'')+n+(n===1?' line':' lines'))+'</div></div>'
      +'<button class="ct-modal-close" onclick="scCloseModal()" title="Close">'+ICO.close+'</button></div>'
      +wrap.outerHTML
    +'</div></div>';
}
function recTable(head,rows){
  return '<div class="sc-rec-wrap"><table class="sc-rec-table"><thead><tr>'
    +head.map(function(h){return '<th>'+esc(h)+'</th>';}).join('')
    +'</tr></thead><tbody>'+rows+'</tbody></table></div>';
}

/* ══ DEAL PANEL ═══════════════════════════════════════════════════════════  */
/* Logs and Workflow always close the tab row, Logs first: the log is where
   an action is taken, the workflow is where it is read back afterwards. */
var DEAL_TABS=[{id:'details',label:'Details'},{id:'attachments',label:'Attachments'},
               {id:'logs',label:'Logs'},{id:'workflow',label:'Workflow'}];
var ORDER_TABS=[{id:'details',label:'Details'},{id:'logs',label:'Logs'},{id:'workflow',label:'Workflow'}];
function dealPanelHTML(){
  if(state.dealSel!==LIVE_ID)return samplePanelHTML(sampleDeal(state.dealSel));
  var tabs=DEAL_TABS;
  var bar=tabBarHTML(tabs,state.dealTab,'scDealTab','scCloseDeal','sc-deal-tabs');
  var body;
  if(state.dealTab==='details')body=dealDetailsHTML();
  else if(state.dealTab==='workflow')body=dealWorkflowHTML();
  else if(state.dealTab==='logs')body=dealLogsHTML();
  else body=attachmentsHTML(LIVE_ID);

  return bar+'<div class="lp-isb-body">'+body+'</div>';
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
    ['Receivable Item','Item Type','Expected Qty','UOM','Est. Price / Unit','Receiving Warehouse','HSN','Expected Receipt','Received','Open','Status'],
    '<tr><td><b>'+esc(L().item.name)+'</b></td><td>Finished Product</td><td>'+L().item.qty+'</td><td>Each</td><td>'+fmtAmt(L().item.price)+'</td>'
    +'<td>Hazira Works</td><td>0202</td><td>'+esc(L().item.date)+'</td><td>'+confirmedReceived()+'</td><td>'+openReceiptQty()+'</td>'
    +'<td>'+badge(state.closed?'closed':'open',state.closed?'Closed':'Open')+'</td></tr>');

  var issues=[
    ['SKU_52297_3814 — Mild Steel Plate 10 mm','Zone A','0202'],
    ['SKU_52288_3814 — Carbon Steel Billet','Zone B','0206'],
    ['SKU_52287_3814 — Alloy Steel Forging Block','Zone C','0203']
  ].map(function(r){
    return '<tr><td>'+esc(L().item.name)+'</td><td><b>'+r[0]+'</b></td><td>Raw Material</td><td>'+L().item.qty+'</td><td>Each</td>'
      +'<td>Hazira Works</td><td>Main Store</td><td>'+r[1]+'</td><td>Yes</td><td>GST-05</td><td>'+r[2]+'</td><td>1:1</td></tr>';
  }).join('');
  var issue=recTable(['For Receivable Item','Issue Item','Item Type','Issue Qty','UOM','Warehouse','Storage Location','Storage Zone','FIM','Tax Code','HSN','BOM Ratio'],issues);

  return secHead('SCR Header Details',viewBtn('View SCR','scr'))+head
    +secHead('SCR Base Details')+base
    +secHead('Vendor Details')+vendor
    +tableHead('Receivable Item Details')+recv
    +tableHead('Issue Item Details')+issue;
}

/* ── WORKFLOW ─────────────────────────────────────────────────────────────
   THE SAME CARD EVERY WORKFLOW TAB IN ADT RENDERS. wfTimelineHTML() in
   pages.js fixes the anatomy: title, a meta row of who and when, a
   "Description:" line, one dot, and an optional footer for whatever that stage
   has to open. This module reproduces it exactly rather than adding a second
   workflow card to the app.

   WHERE THE STATE WENT. An earlier version of this tab put a status badge in
   each card head and coloured the dot per stage. Both were shapes ADT does not
   have — its timeline is one blue dot the whole way down. The state is still
   on screen, in the two places ADT itself puts it: appended to the stage title
   the way the generic panel writes "Current Status — Active", and in the
   Description line. Nothing is lost and no new component is introduced. */
function wfMeta(l){return {user:l.by,date:l.date,time:fmtTime(l.time)};}
function wfRow(title,meta,description,actions,isLast){
  var pSvg='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  var cSvg='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
  return '<div class="lp-wf-row">'
    +'<div class="lp-wf-dot-col"><div class="lp-wf-dot"></div>'+(isLast?'':'<div class="lp-wf-connector"></div>')+'</div>'
    +'<div class="lp-wf-card">'
      +'<div class="lp-wf-title">'+esc(title)+'</div>'
      +'<div class="lp-wf-meta-row">'
        +'<span class="lp-wf-meta-item">'+pSvg+'<span>'+esc(meta.user)+'</span></span>'
        +(meta.date?'<span class="lp-wf-meta-item">'+cSvg+'<span>'+esc(meta.date)+'</span></span>':'')
        +(meta.time?'<span class="lp-wf-meta-sep">|</span><span class="lp-wf-meta-item"><span>'+esc(meta.time)+'</span></span>':'')
      +'</div>'
      +(description?'<div class="lp-wf-desc"><span class="lp-wf-desc-label">Description:</span><span class="lp-wf-desc-text">'+description+'</span></div>':'')
      +(actions?'<div class="sc-wf-actions">'+actions+'</div>':'')
    +'</div></div>';
}
function viewBtn(label,type,index,id){
  var args="'"+type+"',"+(index!=null?index:'null')+(id&&id!==LIVE_ID?",'"+id+"'":'');
  return '<button class="btn-outline btn-sm" onclick="scOpenView('+args+')">'+ICO.eye+' '+esc(label)+'</button>';
}
/* WHAT EACH LOG ENTRY CAN BE OPENED TO. Every step that produces or confirms
   a document gets a View button on its log and workflow card, so a
   confirmation always shows what was confirmed. ASNs and IMRs are numbered:
   the k-th "ASN QC Cleared" is the k-th ASN, because QC clears in order. */
var VIEW_OF={
  'SCR Submitted':['View SCR','scr'],'SCR Approved':['View SCR','scr'],
  'PO Auto-Created':['View PO','po'],'PO Generated':['View PO','po'],'PO Approved':['View PO','po'],
  'Shipment Created':['View Shipment','shipment'],'Shipment Confirmed':['View Shipment','shipment'],
  'Outbound Key Generated':['View Outbound Key','outbound'],
  'Delivery Note Generated':['View Delivery Note','deliverynote'],'Delivery Note Approved':['View Delivery Note','deliverynote'],
  'Challan Generated':['View Challan','challan'],'Gate Outward Confirmed':['View Challan','challan'],
  'Reconciliation Completed':['View Reconciliation','reconciliation'],'Full Receipt Confirmed':['View Reconciliation','reconciliation']
};
function attachViews(list,id){
  var c={'ASN Created':0,'ASN QC Cleared':0,'Gate Inward Confirmed':0,'IMR Created':0,'IMR Confirmed':0};
  return list.map(function(l){
    var e=Object.assign({},l),imr=/IMR/.test(l.status);
    if(l.status in c)e.view=viewBtn(imr?'View IMR':'View ASN',imr?'imr':'asn',c[l.status]++,id);
    else if(VIEW_OF[l.status])e.view=viewBtn(VIEW_OF[l.status][0],VIEW_OF[l.status][1],null,id);
    return e;
  });
}
/* The document a pending step acts on - shown as "Review before you
   confirm" in Update Status and on the pending workflow card. */
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
function wfTimelineHTML(events,pending){
  events=vendorView(events);
  if(pending&&isVendor()&&VENDOR_PENDING.indexOf(pending.action)<0)pending=null;
  var rows=events.map(function(e){return {title:e.status,meta:wfMeta(e),desc:esc(e.comment),actions:e.view||''};});
  if(pending)rows.push({title:pending.action+' — Pending',meta:{user:'Pending with '+pending.role,date:'',time:''},
    desc:'Awaiting <b>'+esc(pending.role)+'</b>.',actions:pending.actions||''});
  if(!rows.length)return '<div class="lp-wf-empty">No workflow activity yet.</div>';
  return '<div class="lp-wf-wrap">'+rows.map(function(r,i){
    return wfRow(r.title,r.meta,r.desc,r.actions,i===rows.length-1);
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
    return {status:l.status,by:l.by,date:l.date,time:l.time,comment:l.comment};
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
  else if(next)next.actions=reviewBtn(LIVE_ID,next.action);
  return wfTimelineHTML(liveEvents(),next);
}
/* PO actions are recorded on the Purchase Order, not the deal — this is the
   hop between the two. */
function openPOBtn(){
  return '<button class="btn-outline btn-sm" onclick="scGoOrderLogs()">'+ICO.cart+' Open Purchase Order '+LIVE_PO+'</button>';
}
function scGoOrderLogs(){
  state.page='orders';state.stageFilter=null;state.stageLabel='';state.orderPage=1;
  state.orderFilter={q:'',status:'',buyer:''};
  state.dealOpen=false;state.orderOpen=false;
  scRender();
  scOpenOrder(LIVE_PO);
  scOrderTab('logs');
}
/* The role a pending step belongs to, as a header role. */
function roleKey(who){return {'Planner / PMG':'Planner','Finance / F&A':'Finance / F&A / IDT'}[who]||who;}
function handoffBtn(role){
  return '<button class="btn-outline btn-sm" style="margin-top:10px" onclick="scSetRole(\''+role+'\')">'+ICO.user+' Switch to '+esc(role)+'</button>';
}

/* ── LOGS ─────────────────────────────────────────────────────────────────
   Timeline on the left, the form on the right: the shared .lp-logs-wrap, so a
   Sub-Contracting log reads exactly like a log anywhere else in ADT. */
function logTimelineHTML(logs,id){
  logs=vendorView(attachViews(logs.slice().reverse(),id||LIVE_ID).reverse());
  if(!logs.length)return '<div class="lp-logs-empty">No activity logs yet.</div>';
  var pSvg='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  var cSvg='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
  var tSvg='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
  /* logs arrive newest first: the first one is the step being worked now and
     reads blue (info); everything before it is done and reads green. */
  return '<div class="lp-logs-timeline">'+logs.map(function(l,n){
    var k=n===0?'info':'approved';
    return '<div class="lp-log-row">'
      +'<div class="lp-log-avatar-col"><div class="lp-log-avatar lp-log-avatar--'+k+'">'+pSvg+'</div>'
      +(n<logs.length-1?'<div class="lp-log-connector"></div>':'')+'</div>'
      +'<div class="lp-log-card">'
        +'<div class="lp-log-status-row"><span class="lp-log-dot lp-log-dot--'+k+'"></span>'
        +'<span class="lp-log-status-text lp-log-status-text--'+k+'">'+esc(l.status)+'</span></div>'
        +'<div class="lp-log-meta-row">'
          +'<span class="lp-log-meta-item" title="'+esc(l.role)+'">'+pSvg+'<span>'+esc(l.by)+'</span></span>'
          +'<span class="lp-log-meta-item">'+cSvg+'<span>'+esc(l.date)+'</span></span>'
          +'<span class="lp-log-meta-item">'+tSvg+'<span>'+esc(fmtTime(l.time))+'</span></span>'
        +'</div>'
        +(l.comment?'<div class="lp-log-comment-row"><span class="lp-log-comment-label">Comment:</span>'+esc(l.comment)+'</div>':'')
        +(l.view?'<div class="sc-log-view">'+l.view+'</div>':'')
      +'</div></div>';
  }).join('')+'</div>';
}
/* The Add Log card. Headed by the record's CURRENT status, the way every
   ADT logs panel is; the status select offers only what this role can do now. */
function logFormHTML(o){
  return '<div class="lp-logs-form">'
    +'<div class="lp-logs-form-header"><span class="lp-log-dot lp-log-dot--info"></span>'+esc(o.current)+'</div>'
    +'<p class="lp-logs-form-sub">'+o.sub+'</p>'
    +'<div class="lp-logs-form-label">Status <span class="lp-logs-form-req">*</span></div>'
    +(o.readonly
      ?'<div class="cs-wrap"><button type="button" class="cs-trigger" disabled style="cursor:default"><span class="cs-value">'+esc(o.opts[0]||'—')+'</span></button></div>'
      :csField(o.id+'-status',o.opts,'','Select Status',o.hook))
    +'<div class="lp-logs-form-label">Comment</div>'
    +'<textarea class="lp-logs-form-textarea" id="'+o.id+'-comment" placeholder="Enter comment"'+(o.readonly?' disabled':'')+'></textarea>'
    +'<div class="sc-logs-btns">'
      +'<button class="btn-outline" onclick="scResetLogForm(\''+o.id+'\')"'+(o.readonly?' disabled':'')+'>Cancel</button>'
      +'<button class="lp-logs-save-btn" onclick="'+o.submit+'()"'+(o.readonly?' disabled':'')+'>Submit</button>'
    +'</div>'
    +(o.note?'<p class="lp-logs-form-sub" style="margin:12px 0 0">'+o.note+'</p>':'')
    +'</div>';
}
function scResetLogForm(id){
  var t=document.getElementById(id+'-comment');if(t)t.value='';
  csValues[id+'-status']='';
  var tr=document.querySelector('[data-csid="'+id+'-status"]');
  if(tr){tr.querySelector('.cs-value').textContent='Select Status';tr.classList.add('cs-placeholder');}
  document.querySelectorAll('#csd-'+id+'-status .cs-option').forEach(function(o){o.classList.remove('cs-selected');});
}
function dealHandoff(){
  var next=liveNext();
  if(!next)return 'Nothing further is pending on this deal.';
  if(/ PO$/.test(next.action))
    return 'Next: <b>'+esc(next.action)+'</b> by the <b>'+esc(next.role)+'</b>, on the Purchase Order.<br>'+openPOBtn();
  return 'Next: <b>'+esc(next.action)+'</b>, pending with <b>'+esc(next.role)+'</b>.<br>'+handoffBtn(roleKey(next.role));
}
function dealLogsHTML(){
  var opts=validDealActions(),last=state.dealLogs[0];
  var form=logFormHTML({id:'sc-deal',opts:opts,hook:'scDealStatusPicked',submit:'scSubmitDealLog',
    current:last?last.status:scrLabel(),
    sub:'Record the next action as <b>'+esc(state.role)+'</b> and add a comment.',
    note:opts.length?'':dealHandoff()});
  return '<div class="lp-logs-wrap">'+logTimelineHTML(state.dealLogs)+form+'</div>';
}
/* Picking one of the form-backed actions opens its own popup straight away —
   the same behaviour the source prototype had, kept because the comment alone
   cannot carry a shipment or an ASN. */
function scDealStatusPicked(val){
  if(FORM_ACTIONS.indexOf(val)>=0){
    var c=document.getElementById('sc-deal-comment');
    scOpenActionModal(val,c?c.value:'','deal');
  }
}
function scSubmitDealLog(){
  var action=csValue('sc-deal-status');
  var comment=(document.getElementById('sc-deal-comment')||{value:''}).value.trim();
  if(!action){scToast('Select a status first','error');return;}
  if(FORM_ACTIONS.indexOf(action)>=0){scOpenActionModal(action,comment,'deal');return;}
  executeDealAction(action,comment);
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
  if(state.dealOpen&&state.dealTab==='attachments')fillPanel('sc-deal-isb',dealPanelHTML());
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
  else body=orderLogsHTML();
  return bar+'<div class="lp-isb-body">'+body+'</div>';
}
function orderDetailsHTML(){
  if(state.po==='none'){
    return '<div class="sc-empty"><div class="sc-empty-ico">'+ICO.cart+'</div>'
      +'<div class="sc-empty-title">Purchase Order not created yet</div>'
      +'<div class="sc-empty-sub">It is created automatically in Draft once the SCR is approved.</div></div>';
  }
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
    +fieldCard(ICO.doc,'Rate Contract','RC-123')
    +fieldCard(ICO.doc,'SAP SCR Reference ID','')
    +fieldCard(ICO.money,'Price Basis','Per Piece')
    +fieldCard(ICO.money,'Currency','INR — Rupees')
    +fieldCard(ICO.clock,'Payment Terms','PT-122 — Payment within 7 Days')
    +fieldCard(ICO.user,'PMG Approver','Gagan Tej')
    +fieldCard(ICO.tag,'Tax Code','GST-05 — GST @ 5%')
    +fieldCard(ICO.globe,'Purchase Office','PUR-121 — Manufacturing Procurement')
    +fieldCard(ICO.money,'PO Value',fmtAmt(poValue()))
    +'</div>';
  var lines=recTable(['#','Receivable Item','Quantity','UOM','Price / Unit','Line Value'],
    '<tr><td>1</td><td><b>'+esc(L().item.name)+'</b></td>'
    +'<td>'+L().item.qty+'</td><td>Each</td><td>'+fmtAmt(poPrice())+'</td><td><b>'+fmtAmt(poValue())+'</b></td></tr>');
  return secHead('PO Header Details',viewBtn('View PO','po'))+head
    +tableHead('PO Lines')+lines;
}
function orderWorkflowHTML(){
  if(state.po==='none'){
    return '<div class="lp-wf-empty">The Purchase Order is created automatically in Draft once the SCR is approved.</div>';
  }
  var pending=state.po==='draft'?{action:'Generate PO',role:'Buyer'}
    :state.po==='created'?{action:'Approve PO',role:'PO Approver'}:null;
  var ev=state.poLogs.slice().reverse().map(function(l){
    return {status:l.status,by:l.by,date:l.date,time:l.time,comment:l.comment,
      view:l.status==='PO Generated'?viewBtn('View PO','po'):''};
  });
  return wfTimelineHTML(ev,pending);
}
function orderHandoff(){
  var r=state.po==='draft'?['Generate PO','Buyer']:state.po==='created'?['Approve PO','PO Approver']:null;
  if(!r)return 'Nothing further is pending on this PO.';
  return 'Next: <b>'+r[0]+'</b>, pending with <b>'+r[1]+'</b>.<br>'+handoffBtn(r[1]);
}
function orderLogsHTML(){
  var opts=validPOActions();
  var form=logFormHTML({id:'sc-po',opts:opts,hook:'scOrderStatusPicked',submit:'scSubmitOrderLog',
    current:'PO '+poLabel(),sub:'Record the next action on this Purchase Order.',
    note:opts.length?'':orderHandoff()});
  return '<div class="lp-logs-wrap">'+logTimelineHTML(state.poLogs)+form+'</div>';
}
function scOrderStatusPicked(val){
  if(val==='Generate PO'){
    var c=document.getElementById('sc-po-comment');
    scOpenActionModal('Generate PO',c?c.value:'','order');
  }
}
function scSubmitOrderLog(){
  var action=csValue('sc-po-status');
  var comment=(document.getElementById('sc-po-comment')||{value:''}).value.trim();
  if(!action){scToast('Select a status first','error');return;}
  if(action==='Generate PO'){scOpenActionModal(action,comment,'order');return;}
  executePOAction(action,comment);
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
  else body=attachmentsHTML(d.id);
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
    +fieldCard(ICO.cart,'Purchase Order',d.po?esc(d.po.no)+' · '+badge(poToneOf(d.po.status),d.po.status):'Not Created')
  );
  var base=g(fieldCard(ICO.clipboard,d.base,esc(d.baseRef))+fieldCard(ICO.cube,'Plant','Hazira Works'));
  var vendor=g(
     fieldCard(ICO.handshake,'Vendor / Subcontractor',esc(d.vendor.code+' — '+d.vendor.name))
    +fieldCard(ICO.globe,'Vendor Address',esc(d.vendor.addr))
  );
  var recv=recTable(
    ['Receivable Item','Item Type','Expected Qty','UOM','Est. Price / Unit','Receiving Warehouse','HSN','Expected Receipt','Received','Open','Status'],
    '<tr><td><b>'+esc(it.name)+'</b></td><td>'+esc(it.type)+'</td><td>'+it.qty+'</td><td>'+esc(it.uom)+'</td><td>'+fmtAmt(it.price)+'</td>'
    +'<td>Hazira Works</td><td>'+esc(it.hsn)+'</td><td>'+esc(it.due)+'</td><td>'+d.received+'</td><td>'+(closed?0:open)+'</td>'
    +'<td>'+badge(closed?'closed':'open',closed?'Closed':'Open')+'</td></tr>');
  var issue=recTable(['For Receivable Item','Issue Item','Item Type','Issue Qty','UOM','Warehouse','Storage Zone','FIM','HSN'],
    d.issues.map(function(r){
      return '<tr><td>'+esc(it.name)+'</td><td><b>'+esc(r[0])+'</b></td><td>Raw Material</td><td>'+it.qty+'</td><td>'+esc(it.uom)+'</td>'
        +'<td>Hazira Works</td><td>'+esc(r[1])+'</td><td>Yes</td><td>'+esc(r[2])+'</td></tr>';
    }).join(''));
  return secHead('SCR Header Details')+head
    +secHead('SCR Base Details')+base
    +secHead('Vendor Details')+vendor
    +tableHead('Receivable Item Details')+recv
    +tableHead('Issue Item Details')+issue;
}
/* Who a sample deal is waiting on, and for what. d.sub is the step inside a
   stage that several roles share (outbound, ASN, IMR, closure). */
function sampleNextOf(d){
  if(d.rejected)return null;
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
  if(next)next.actions=reviewBtn(d.id,next.action);
  return wfTimelineHTML(attachViews(sampleMilestones(d),d.id),next);
}
function sampleLogsHTML(d){
  var logs=sampleMilestones(d).slice().reverse(),next=sampleNextOf(d);
  /* The same live form as the listing's Update Status: it offers what this
     role can do on this deal now, and Submit moves the deal on. */
  var form=logFormHTML({id:'sc-sample',opts:rowAvailable(d.id),submit:'scSubmitSampleLog',current:logs[0].status,
    sub:next?'Next action is pending with <b>'+esc(next.role)+'</b>.':'The transaction is closed. No further actions.'});
  return '<div class="lp-logs-wrap">'+logTimelineHTML(logs,d.id)+form+'</div>';
}
function scSubmitSampleLog(){
  var d=sampleDeal(state.dealSel);if(!d)return;
  var action=csValue('sc-sample-status');
  var comment=(document.getElementById('sc-sample-comment')||{value:''}).value.trim();
  if(!action){scToast('Select a status first','error');return;}
  advanceSample(d,action,comment);
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
      +fieldCard(ICO.money,'Currency','INR — Rupees')
      +fieldCard(ICO.clock,'Payment Terms','PT-122 — Payment within 7 Days')
      +fieldCard(ICO.tag,'Tax Code','GST-05 — GST @ 5%')
      +fieldCard(ICO.money,'PO Value',fmtAmt(value))
      +'</div>'
      +tableHead('PO Lines')+recTable(['#','Receivable Item','Quantity','UOM','Price / Unit','Line Value'],
        '<tr><td>1</td><td><b>'+esc(it.name)+'</b></td><td>'+it.qty+'</td><td>'+esc(it.uom)+'</td><td>'+fmtAmt(it.price)+'</td><td><b>'+fmtAmt(value)+'</b></td></tr>');
  }else if(state.orderTab==='workflow'){
    var pend=d.po.status==='Draft'?{action:'Generate PO',role:'Buyer'}:d.po.status==='Created'?{action:'Approve PO',role:'PO Approver'}:null;
    body=wfTimelineHTML(attachViews(poLogs,d.id),pend);
  }else{
    body='<div class="lp-logs-wrap">'+logTimelineHTML(poLogs.slice().reverse(),d.id)
      +logFormHTML({id:'sc-sample-po',readonly:true,opts:[],current:'PO '+d.po.status,
        sub:'Purchase Order '+esc(d.po.no)+'.'})+'</div>';
  }
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
  return {status:status,comment:comment,by:auto?'System':who(),role:auto?'System':state.role,
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
  else if(action==='Return SCR'){addDealLog('SCR Returned',comment);scToast('SCR returned to Planner','info');}
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
  if(!n||!SAMPLE_STEP[n.action])return [];
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
function scRowMenu(btn,id){
  var m=rowMenuEl();
  if(m.classList.contains('open')&&m.dataset.id===id){scCloseRowMenu();return;}
  scCloseAllDD();
  var list=rowActionsFor(),ok=rowAvailable(id);
  m.innerHTML='<div class="sc-act-head">'+esc(state.role)+'</div>'
    +(list.length?list.map(function(a,i){
      var on=ok.indexOf(a)>=0;
      return '<div class="ct-act-item'+(on?' sc-act-avail':' done')+'"'
        +(on?' onclick="scRowAction(\''+id+'\','+i+')"':' title="Not available at this stage"')+'>'
        +esc(a)+'</div>';
    }).join(''):'<div class="ct-act-item done">No actions for this role</div>');
  m.dataset.id=id;m.classList.add('open');
  var r=btn.getBoundingClientRect(),w=240;
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
  if(action==='Create Shipment'||action==='Generate PO'||(id===LIVE_ID&&FORM_ACTIONS.indexOf(action)>=0)){
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
    +field('Comment','<textarea class="lp-logs-form-textarea sc-us-comment" id="sc-us-comment" placeholder="Why is this deal moving? (optional)">'+esc(comment||'')+'</textarea>',false,true);
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
  if(id===LIVE_ID&&FORM_ACTIONS.indexOf(action)>=0){
    scOpenActionModal(action,comment,PO_ACTIONS.indexOf(action)>=0?'order':'deal');return;
  }
  if(id===LIVE_ID){
    if(PO_ACTIONS.indexOf(action)>=0)executePOAction(action,comment);
    else executeDealAction(action,comment);
  }else advanceSample(sampleDeal(id),action,comment);
  scCloseModal();
  scRender();
}

/* A sample deal moves one stage per action; its log entries are generated
   from the stage, with the step just taken signed by who took it. */
var SAMPLE_STEP={
  'Approve SCR':function(d,i){d.stage='po';d.po=d.po||{no:String(37760+i),status:'Draft'};d.po.status='Draft';},
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
    d.extra.push({status:ACTION_RESULT[action]||action,role:state.role,by:who(),comment:comment,date:t0.date,time:t0.time,portal:'Web',seq:++scSeq});
    if(action==='Reject SCR')d.rejected=true;
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
function modalShell(title,sub,bodyHTML,footHTML,wide){
  return '<div class="ct-modal-overlay" onclick="if(event.target===this)scCloseModal()">'
    +'<div class="ct-modal'+(wide?' ct-modal--form':'')+'" role="dialog" aria-modal="true" style="padding:0">'
      +'<div style="padding:24px 28px 0">'
        +'<div class="ct-modal-hdr" style="margin-bottom:6px">'
          +'<div><div class="ct-modal-title">'+esc(title)+'</div></div>'
          +'<button class="ct-modal-close" onclick="scCloseModal()" title="Close">'+ICO.close+'</button>'
        +'</div>'
        +(sub?'<div class="ct-modal-sub" style="margin:0 0 4px">'+esc(sub)+'</div>':'')
      +'</div>'
      +'<div style="padding:0 28px">'+bodyHTML+'</div>'
      +'<div class="ct-modal-foot" style="margin:0;position:sticky;bottom:0;border-radius:0 0 16px 16px">'+footHTML+'</div>'
    +'</div></div>';
}
var modalStack=[];
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
function scOpenCreateSCR(){
  var header=section('SCR Header Details',
    '<div class="policy-form-grid">'
    +field('SCR Title',input('f-title','Sub-contracting for shaft machining'),true)
    +field('SCR Base',select('f-base',['Production Order','Project']),true)
    +field('Nature of SCR / Work Type',input('f-nature','Job'),true)
    +field('Purchase Office',select('f-office',['PUR-121 — Manufacturing Procurement']),true)
    +field('Buyer',select('f-buyer',['Madan Mohan','Gagan Tej']))
    +field('Approver',select('f-approver',['PMG Approver']))
    +'<div class="sc-yn-grid ep-form-full">'
      +segField('SCR Unpeg',true)+segField('Inter-Unit',false)+segField('Partial Material as FIM',true)
      +segField('Billable',true)+segField('Logistics Required',true)
    +'</div>'
    +field('Remarks','<textarea class="ep-form-input" id="f-remarks" style="min-height:76px">For urgent processing</textarea>',false,true)
    +field('Header Text','<textarea class="ep-form-input" id="f-headtext" style="min-height:76px">Additional header information</textarea>',false,true)
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
    recTable(['#','Receivable Item','Item Type','Expected Qty','UOM','Est. Price / Unit','Receiving Warehouse','HSN','Expected Receipt Date','Rate Contract','Line Status'],
      '<tr id="sc-recv-row-1"><td>1</td><td>'+select('r1-item',['Fabricated End Frame'])+'</td><td>Finished Product</td>'
      +'<td>'+input('r1-qty','10')+'</td><td>Each</td><td>'+input('r1-price','250')+'</td>'
      +'<td>'+select('r1-wh',['Hazira Works'])+'</td><td>'+select('r1-hsn',['0202'])+'</td>'
      +'<td>'+input('r1-date','2026-10-30','date')+'</td><td>RC-123</td><td>'+badge('open','Open')+'</td></tr>')
    +'<button class="btn-outline btn-sm" style="margin-top:10px" onclick="scAddReceivable()">'+ICO.plus+' Add Receivable Item</button>');

  var issue=section('Issue Item Details',
    recTable(['#','For Receivable Item','Issue Item','Item Type','Issue Qty','UOM','Warehouse','Storage Location','Storage Zone','Free Issue Material','Tax Code','HSN','BOM Ratio'],
      '<tr><td>1</td><td>Fabricated End Frame</td><td>'+select('i1-item',['SKU_52297_3814 — Mild Steel Plate 10 mm'])+'</td>'
      +'<td>Raw Material</td><td>'+input('i1-qty','10')+'</td><td>Each</td><td>Hazira Works</td><td>Main Store</td>'
      +'<td>Zone A</td><td>Yes</td><td>GST-05</td><td>0202</td><td>1:1</td></tr>')
    +'<button class="btn-outline btn-sm" style="margin-top:10px" onclick="scAddIssue()">'+ICO.plus+' Add Issue Item</button>');

  scrDraftFiles=[];
  var attach=section('Attachments','<div id="sc-scr-att">'+scrAttachHTML()+'</div>');

  var foot='<span class="hr-actions-sub" style="margin-right:auto">Submitting sends the SCR to the PMG Approver.</span>'
    +'<div class="ct-modal-btns">'
      +'<button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
      +'<button class="btn-outline" onclick="scSaveDraftSCR()">Save as Draft</button>'
      +'<button class="btn-primary" onclick="scSubmitSCR()">Submit for Approval</button>'
    +'</div>';

  document.getElementById('sc-modal-root').innerHTML=
    modalShell('Create SCR','Sub-Contracting Request',header+base+vendor+recv+issue+attach,foot,true);
}
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
function scAddReceivable(){
  var tb=document.querySelector('#sc-recv-row-1').parentElement;
  var n=tb.children.length+1;
  var tr=document.createElement('tr');
  tr.innerHTML='<td>'+n+'</td><td>'+select('r'+n+'-item',['Machined Shaft'])+'</td><td>Finished Product</td>'
    +'<td>'+input('r'+n+'-qty','5')+'</td><td>Each</td><td>'+input('r'+n+'-price','350')+'</td>'
    +'<td>'+select('r'+n+'-wh',['Hazira Works'])+'</td><td>'+select('r'+n+'-hsn',['0203'])+'</td>'
    +'<td>'+input('r'+n+'-date','2026-10-30','date')+'</td><td>RC-123</td><td>'+badge('open','Open')+'</td>';
  tb.appendChild(tr);
}
function scAddIssue(){
  var tbs=document.querySelectorAll('#sc-modal-root .sc-rec-table tbody');
  var tb=tbs[tbs.length-1];
  var n=tb.children.length+1;
  var tr=document.createElement('tr');
  tr.innerHTML='<td>'+n+'</td><td>Machined Shaft</td><td>'+select('i'+n+'-item',['SKU_52288_3814 — Carbon Steel Billet'])+'</td>'
    +'<td>Raw Material</td><td>'+input('i'+n+'-qty','5')+'</td><td>Each</td><td>Hazira Works</td><td>Main Store</td>'
    +'<td>Zone B</td><td>Yes</td><td>GST-05</td><td>0206</td><td>1:1</td>';
  tb.appendChild(tr);
}
function scSaveDraftSCR(){scCloseModal();scToast('SCR saved as Draft','info');}
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
  scCloseModal();
  state.page='deals';state.stageFilter=null;state.stageLabel='';state.dealPage=1;
  state.dealFilter={q:'',process:'',scr:'',ship:''};
  state.dealOpen=false;
  scRender();
  scOpenDeal(LIVE_ID);
  scToast(LIVE_ID+' submitted','success','Pending with the PMG Approver — approve it from the Logs tab.');
}

/* ── THE FORM-BACKED ACTIONS ──────────────────────────────────────────────  */
function scOpenActionModal(action,comment,context,dealId){
  var did=dealId||LIVE_ID;
  pendingAction={action:action,context:context,id:did};
  var fields='';

  /* The deal the form is for: the live one, or a sample's own PO. */
  var gd=did===LIVE_ID?null:sampleDeal(did);
  var g=gd?{scr:gd.id,po:gd.po?gd.po.no:'',vendor:gd.vendor.code+' — '+gd.vendor.name,addr:gd.vendor.addr,buyer:gd.buyer,
      item:gd.item,price:gd.item.price,head:gd.title}
    :{scr:LIVE_ID,po:LIVE_PO,vendor:'21005 — Sri Venkateswara Aerospace Pvt.ltd',addr:'Hyderabad, Telangana 500084',buyer:L().buyer,
      item:{name:L().item.name,qty:L().item.qty,uom:'Each',price:L().item.price},price:poPrice(),head:L().headText};
  pendingAction.qty=g.item.qty;
  if(action==='Generate PO'){
    fields=section('PO Header Details','<div class="policy-form-grid">'
      +readonlyField('SCR No.',g.scr)
      +readonlyField('PO No.',g.po)
      +readonlyField('Order Type','Sub-Contracting')
      +readonlyField('PO Status','Draft')
      +readonlyField('Vendor / Sub-Contractor',g.vendor)
      +readonlyField('Vendor Address',g.addr)
      +readonlyField('Required Skill / Service','Structural Fabrication')
      +readonlyField('Lot Type','Specific')
      +readonlyField('Buyer',g.buyer)
      +readonlyField('PO Series','Not Applicable')
      +field('Rate Contract',select('po-rc',['RC-123']),true)
      +field('SAP SCR Reference ID','<input class="ep-form-input" id="po-sap" placeholder="Optional">')
      +field('Price Basis',select('po-basis',['Per Piece']),true)
      +field('Currency',select('po-currency',['INR — Rupees']),true)
      +field('Payment Terms',select('po-terms',['PT-122 — Payment within 7 Days']),true)
      +field('PMG Approver',select('po-approver',['Gagan Tej']))
      +field('Tax Code',select('po-tax',['GST-05 — GST @ 5%']),true)
      +readonlyField('Purchase Office','PUR-121 — Manufacturing Procurement')
      +'</div>')
    +section('PO Lines',
      recTable(['#','Receivable Item','Quantity','UOM','Price / Unit','Line Value'],
        '<tr><td>1</td><td><b>'+esc(g.item.name)+'</b><span class="sc-rec-sub">Est. '+fmtAmt(g.item.price)+' / unit on the SCR</span></td><td>'+g.item.qty+'</td><td>'+esc(g.item.uom)+'</td>'
        +'<td><input class="ep-form-input" id="po-price" type="number" min="0" value="'+g.price+'" oninput="scRecalcPO()"></td>'
        +'<td id="po-line-value"><b>'+fmtAmt(g.price*g.item.qty)+'</b></td></tr>')
      +'<div class="policy-form-grid" style="margin-top:14px">'
      +field('Header Text (from the request)','<textarea class="ep-form-input" id="po-head" style="min-height:70px">'+esc(g.head)+'</textarea>',false,true)
      +field('PO Value','<div class="sc-ro" id="po-total">'+fmtAmt(g.price*g.item.qty)+'</div>')
      +'</div>');
  }

  if(action==='Create Shipment'){
    fields=section('Shipment Details','<div class="policy-form-grid">'
      +field('Delivery Note Approver',select('sh-dna',['Chandra Mohan']),true)
      +field('Challan Type',select('sh-type',['Production Material Challan']),true)
      +field('Logistics Required',select('sh-log',['Yes','No']),true)
      +field('Expected Receipt / Return Date',input('sh-date','2026-10-30','date'),true)
      +field('Package Type / Details',input('sh-pkg','Plate Bundle'))
      +field('Number of Packages',input('sh-pkgno','1'))
      +field('Package Weight',input('sh-weight','1000'))
      +field('Weight UOM',select('sh-uom',['Each','KG','MT']))
      +field('Mode of Dispatch',select('sh-mode',['Road Transport','Rail','Air']))
      +field('Transporter',input('sh-transporter','TransCore Logistics'))
      +field('Vehicle No.',input('sh-vehicle','AP47TD8451'))
      +field('Driver Details',input('sh-driver',''))
      +field('LR / Transport Reference No.',input('sh-lr',''))
      +field('LR / Transport Date',input('sh-lrdate','2026-09-26','date'))
      +field('Insurance Applicable',select('sh-ins',['Yes','No']))
      +field('Insured By / Insurance Details',input('sh-insby',''))
      +field('Loading / Unloading Contact',input('sh-contact','ATUL'))
      +'</div>');
  }

  if(action==='Create ASN'){
    fields=section('ASN Details','<div class="policy-form-grid">'
      +readonlyField('Shipment Number','SHP-2026-035307')
      +readonlyField('SCR Number',LIVE_ID)
      +readonlyField('PO Number',LIVE_PO)
      +field('Vendor Invoice No.',input('asn-inv','INV-'+(8891+state.asns.length)))
      +field('Dispatch Date',input('asn-date','2026-10-08','date'))
      +field('Vehicle No.',input('asn-vehicle','AP47TD8451'))
      +field('Lot / Serial Ref.',input('asn-lot','LOT-HZ-'+(112+state.asns.length)))
      +'</div>')
    +section('Open Items',
      recTable(['Receivable Item','Expected Qty','Cumulative Advised','Open ASN Qty','Advised Qty *'],
        '<tr><td><b>'+esc(L().item.name)+'</b></td><td>'+EXPECTED_QTY+'</td><td>'+cumulativeAdvised()+'</td>'
        +'<td><b>'+openASNQty()+'</b></td>'
        +'<td><input class="ep-form-input" id="asn-qty" value="'+Math.min(6,openASNQty())+'"></td></tr>'));
  }

  if(action==='Create IMR'){
    var eligible=eligibleASNs();
    fields=section('IMR Details','<div class="policy-form-grid">'
      +readonlyField('SCR Number',LIVE_ID)
      +readonlyField('PO Number',LIVE_PO)
      +readonlyField('Shipment Number','SHP-2026-035307')
      +field('ASN','<select class="ep-form-select" id="imr-asn" onchange="scRefreshIMR()">'
        +eligible.map(function(a){return '<option value="'+a.index+'">'+a.no+' — Available '+availableForIMR(a.index)+'</option>';}).join('')
        +'</select>',true)
      +field('Receipt Date',input('imr-date','2026-10-16','date'),true)
      +field('Receiving Warehouse',select('imr-wh',['Hazira Works']))
      +'</div>')
    +'<div id="imr-items"></div>';
  }

  if(action==='Short Close'){
    fields=section('Short Close Details',
      '<div class="lp-sb-detail-grid">'
      +fieldCard(ICO.cube,'Receivable Item',L().item.name)
      +fieldCard(ICO.tag,'Expected Qty',String(EXPECTED_QTY))
      +fieldCard(ICO.check,'Received Qty',String(confirmedReceived()))
      +fieldCard(ICO.info,'Open Qty','<b>'+openReceiptQty()+'</b>')
      +'</div>'
      +'<div class="policy-form-grid" style="margin-top:14px">'
      +field('Reason for Short Close','<textarea class="ep-form-input" id="sc-shortclose" style="min-height:84px" placeholder="Why is the remaining quantity being closed?"></textarea>',true,true)
      +'</div>');
  }

  var statusBlock=section('Action',
    '<div class="policy-form-grid">'
    /* Stacked full width, at the foot of the form: the step being taken as a
       chip, then the comment that goes on its log entry. */
    +field('Status','<div class="sc-action-status">'+badge('created',action)+'</div>',false,true)
    +field('Comment','<textarea class="ep-form-input sc-action-comment" id="sc-action-comment" placeholder="Add a comment for the log (optional)">'+esc(comment||'')+'</textarea>',false,true)
    +'</div>');

  var foot='<span class="hr-actions-sub" style="margin-right:auto">Recorded as a log entry on '
    +(context==='order'?'PO '+g.po:did)+'.</span>'
    +'<div class="ct-modal-btns">'
      +'<button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
      +'<button class="btn-primary" onclick="scSubmitAction()">Submit</button>'
    +'</div>';

  document.getElementById('sc-modal-root').innerHTML=
    modalShell(action,context==='order'?'PO '+g.po+' · '+g.scr:did,fields+statusBlock,foot,true);

  if(action==='Create IMR')scRefreshIMR();
}
function scRecalcPO(){
  var price=parseFloat((document.getElementById('po-price')||{value:0}).value||0);
  var v=fmtAmt(price*((pendingAction&&pendingAction.qty)||L().item.qty));
  document.getElementById('po-line-value').innerHTML='<b>'+v+'</b>';
  document.getElementById('po-total').textContent=v;
}
function scRefreshIMR(){
  var sel=document.getElementById('imr-asn');if(!sel)return;
  var i=parseInt(sel.value,10);
  var asn=state.asns[i];if(!asn)return;
  document.getElementById('imr-items').innerHTML=section('Receivable Items',
    recTable(['Receivable Item','Advised Qty','Already Received','Available for Receipt','Receipt Qty *'],
      '<tr><td><b>'+esc(L().item.name)+'</b></td><td>'+asn.qty+'</td><td>'+receivedForASN(i)+'</td>'
      +'<td><b>'+availableForIMR(i)+'</b></td>'
      +'<td><input class="ep-form-input" id="imr-qty" value="'+availableForIMR(i)+'"></td></tr>'));
}

function scSubmitAction(){
  if(!pendingAction)return;
  var action=pendingAction.action;
  var comment=(document.getElementById('sc-action-comment')||{value:''}).value.trim();
  /* a sample deal's form step moves that deal on */
  if(pendingAction.id&&pendingAction.id!==LIVE_ID){
    var sd=sampleDeal(pendingAction.id);
    if(action==='Generate PO'){
      var sp=parseFloat((document.getElementById('po-price')||{value:''}).value);
      if(!(sp>0)){scToast('Enter the price per unit','error');return;}
      sd.item.price=sp;
    }
    advanceSample(sd,action,comment);
    scCloseModal();scRender();return;
  }

  if(action==='Generate PO'){
    var price=parseFloat((document.getElementById('po-price')||{value:''}).value);
    if(!(price>0)){scToast('Enter the price per unit','error');return;}
    state.po='created';state.poPrice=price;
    addPOLog('PO Generated',comment+' — PO value '+fmtAmt(poValue())+'.');
    scToast('PO '+LIVE_PO+' generated','success','Review it from the Workflow tab — View PO.');
  }
  else if(action==='Create Shipment'){
    state.shipment='created';state.outboundKey=true;state.transferOrder=true;
    addDealLog('Shipment Created',comment+' — Shipment ID SHP-2026-035307');
    addDealLog('Outbound Key Generated','Outbound Key OBK/26/0152 generated automatically.');
    addDealLog('Transfer Order Generated','Transfer Order TO/26/0152 generated automatically.');
    scToast('Shipment SHP-2026-035307 created','success','Outbound Key and Transfer Order generated.');
  }
  else if(action==='Create ASN'){
    var qty=parseInt((document.getElementById('asn-qty')||{value:0}).value||0,10);
    if(!(qty>0)||qty>openASNQty()){scToast('Advised Qty cannot exceed the Open ASN Qty','error');return;}
    var no='ASN-'+String(state.asns.length+1).padStart(3,'0');
    state.asns.push({no:no,qty:qty,qc:'Created',gateIn:false});
    addDealLog('ASN Created',comment+' — '+no+' — Advised Qty '+qty);
    scToast(no+' created','success','Advised Qty '+qty+'. Pending QC clearance.');
  }
  else if(action==='Create IMR'){
    var ai=parseInt((document.getElementById('imr-asn')||{value:-1}).value,10);
    var q=parseInt((document.getElementById('imr-qty')||{value:0}).value||0,10);
    if(!(q>0)||q>availableForIMR(ai)){scToast('Receipt Qty cannot exceed the available ASN Qty','error');return;}
    var imrNo='IMR-'+String(state.imrs.length+1).padStart(3,'0');
    state.imrs.push({no:imrNo,asnNo:state.asns[ai].no,qty:q,status:'Created'});
    addDealLog('IMR Created',comment+' — '+imrNo+' against '+state.asns[ai].no+' — Qty '+q);
    scToast(imrNo+' created','success','Receipt Qty '+q+' against '+state.asns[ai].no+'.');
  }
  else if(action==='Short Close'){
    var reason=(document.getElementById('sc-shortclose')||{value:''}).value.trim();
    if(!reason){scToast('Reason for Short Close is mandatory','error');return;}
    state.shortClosed=true;
    addDealLog('Short Close',comment+' — '+reason);
    scToast('Open quantity short closed','success','The transaction can now be closed.');
  }
  scCloseModal();
  scRender();
}

/* ══ RECORD & DOCUMENT VIEWS ══════════════════════════════════════════════  */
function docCell(label,value){return '<div class="sc-doc-cell"><strong>'+esc(label)+'</strong><span>'+(value||'—')+'</span></div>';}
function docGrid(cols,cells){return '<div class="sc-doc-grid cols-'+cols+'">'+cells+'</div>';}

function scOpenView(type,index,id){
  if(id&&id!==LIVE_ID){sampleView(type,index,id);return;}
  var title='',sub='',body='';

  if(type==='scr'){title='SCR Details';sub=LIVE_ID;body=dealDetailsHTML();}

  else if(type==='po'){title='Purchase Order';sub='PO '+LIVE_PO+'';body=orderDetailsHTML();}

  else if(type==='shipment'){
    title='Shipment';sub='SHP-2026-035307';
    body='<div class="lp-sb-detail-grid">'
      +fieldCard(ICO.box,'Shipment ID','SHP-2026-035307')
      +fieldCard(ICO.doc,'SCR No.',LIVE_ID)
      +fieldCard(ICO.cart,'PO No.',LIVE_PO)
      +fieldCard(ICO.user,'Delivery Note Approver','Chandra Mohan')
      +fieldCard(ICO.tag,'Challan Type','Production Material Challan')
      +fieldCard(ICO.truck,'Logistics Required','Yes')
      +fieldCard(ICO.cal,'Expected Return','30 Oct 2026')
      +fieldCard(ICO.cube,'Package Type','Plate Bundle')
      +fieldCard(ICO.truck,'Transporter','TransCore Logistics')
      +fieldCard(ICO.truck,'Vehicle No.','AP47TD8451')
      +'</div>';
  }

  else if(type==='outbound'){
    title='Outbound Key';sub='OBK/26/0152';
    body='<div class="adt-doc-page">'
      +'<div class="adt-doc-header"><div><div class="adt-doc-brand">OUTBOUND KEY</div>'
        +'<div class="adt-doc-brand-sub">Sub-Contracting Material Dispatch</div></div>'
        +'<div><div class="adt-doc-title">OBK/26/0152</div>'
        +'<div class="adt-doc-meta">Generated 25 Sep 2026 11:19 · Sagar Kohli</div></div></div>'
      +docGrid(4,docCell('Outbound Key No.','OBK/26/0152')+docCell('Shipment No.','SHP-2026-035307')
        +docCell('SCR No.',LIVE_ID)+docCell('PO No.',LIVE_PO))
      +docGrid(2,docCell('Transfer Order No.','TO/26/0152')+docCell('Material Position','MAAS_STAGING'))
      +'<div class="adt-doc-section"><div class="adt-doc-section-title">Material Details</div>'
      +recTable(['#','Material Code','Description','Project','Qty','UOM','Warehouse','Storage Location'],
        [['1','SKU_52297_3814','Mild Steel Plate 10 mm'],['2','SKU_52288_3814','Carbon Steel Billet'],
         ['3','SKU_52287_3814','Alloy Steel Forging Block']].map(function(r){
          return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>Industrial Structure Fabrication</td>'
            +'<td>10</td><td>Each</td><td>Hazira Works</td><td>Main Store</td></tr>';}).join(''))
      +'</div>'
      +'<div class="adt-doc-section"><div class="adt-doc-section-title">Package / Vehicle / Transport</div>'
      +docGrid(3,docCell('Package Type','Plate Bundle')+docCell('No. of Packages','1')+docCell('Package Weight','1000 Each'))
      +docGrid(3,docCell('Mode of Dispatch','Road Transport')+docCell('Transporter','TransCore Logistics')+docCell('Vehicle No.','AP47TD8451'))
      +docGrid(3,docCell('Driver Details','')+docCell('LR / Transport Ref.','')+docCell('LR / Transport Date','26 Sep 2026'))
      +docGrid(3,docCell('Insurance Applicable','No')+docCell('Insured By','')+docCell('Loading / Unloading Contact','ATUL'))
      +'</div>'
      +'<div class="sc-doc-note"><b>Note:</b> This key must accompany the material at the security gate. '
      +'Quantities cannot be changed once the key is generated.</div>'
      +'</div>';
  }

  else if(type==='deliverynote'){
    title='Delivery Note';sub='DN/26/0123';
    body='<div class="adt-doc-page">'
      +'<div class="adt-doc-header"><div><div class="adt-doc-brand">DELIVERY NOTE</div>'
        +'<div class="adt-doc-brand-sub">Sub-Contracting</div></div>'
        +'<div><div class="adt-doc-title">DN/26/0123</div>'
        +'<div class="adt-doc-meta">'+(state.deliveryNote==='approved'?'Approved':'Generated')+' · '+LIVE_ID+'</div></div></div>'
      +docGrid(4,docCell('Delivery Note No.','DN/26/0123')+docCell('Delivery Note Date','25 Sep 2026 11:19')
        +docCell('PO No.',LIVE_PO)+docCell('Shipment No.','SHP-2026-035307'))
      +docGrid(2,docCell('Vendor / Consignee','Sri Venkateswara Aerospace Pvt.ltd')+docCell('Dispatching Unit','Hazira Works'))
      +docGrid(2,docCell('Address','Hyderabad, Telangana 500084, India')+docCell('Expected Date of Return','30 Oct 2026'))
      +docGrid(2,docCell('Delivery Note Approver','Chandra Mohan')+docCell('Your / Our Reference',''))
      +'<div class="adt-doc-section"><div class="adt-doc-section-title">Item Details</div>'
      +recTable(['Item No','Material Code','Item Description','Quantity','UOM'],
        [['1','SKU_52297_3814','Mild Steel Plate 10 mm'],['2','SKU_52288_3814','Carbon Steel Billet'],
         ['3','SKU_52287_3814','Alloy Steel Forging Block']].map(function(r){
          return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>10</td><td>Each</td></tr>';}).join(''))
      +'</div>'
      +'<div class="adt-doc-section"><div class="adt-doc-section-title">Package / Vehicle / Transport</div>'
      +docGrid(3,docCell('Package Type','Plate Bundle')+docCell('No. of Packages','1')+docCell('Package Weight','1000 Each'))
      +docGrid(3,docCell('Mode of Dispatch','Road Transport')+docCell('Transporter','TransCore Logistics')+docCell('Vehicle No.','AP47TD8451'))
      +docGrid(3,docCell('Insurance Applicable','Yes')+docCell('LR / Transport Date','26 Sep 2026')+docCell('Loading / Unloading Contact','ATUL'))
      +'</div>'
      +'<div class="sc-doc-sig">'
        +'<div class="sc-doc-sig-block"><div class="sc-doc-sig-name">Sagar Kohli</div><div class="sc-doc-sig-label">Prepared by · 25 Sep 2026</div></div>'
        +'<div class="sc-doc-sig-block"><div class="sc-doc-sig-name">Chandra Mohan</div><div class="sc-doc-sig-label">Authorized by · 25 Sep 2026</div></div>'
        +'<div class="sc-doc-sig-block"><div class="sc-doc-sig-name">—</div><div class="sc-doc-sig-label">Received by</div></div>'
      +'</div>'
      +'<div class="sc-doc-note" style="margin-top:16px">This is a computer generated Delivery Note and does not require a physical signature.</div>'
      +'</div>';
  }

  else if(type==='challan'){
    title='Delivery Challan';sub='CHL/26/0103';
    body='<div class="adt-doc-page">'
      +'<div class="adt-doc-header"><div><div class="adt-doc-brand">DELIVERY CHALLAN</div>'
        +'<div class="adt-doc-brand-sub">Sub-Contracting · Gate Pass Copy · Billable</div></div>'
        +'<div><div class="adt-doc-title">CHL/26/0103</div>'
        +'<div class="adt-doc-meta">'+(state.challan==='gate_cleared'?'GATE_CLEARED':state.challan==='closed'?'Closed':'Generated')+'</div></div></div>'
      +docGrid(4,docCell('Delivery Note No.','DN/26/0123')+docCell('SCR No.',LIVE_ID)
        +docCell('PO No.',LIVE_PO)+docCell('Shipment No.','SHP-2026-035307'))
      +docGrid(3,docCell('Challan Date','25 Sep 2026 11:21')+docCell('Mode','Road Transport')+docCell('Expected Date of Return','30 Oct 2026'))
      +docGrid(2,
         docCell('Vendor','Sri Venkateswara Aerospace Pvt.ltd<br>Hyderabad, Telangana 500084<br>GSTIN 27AAPFU0939F1ZV')
        +docCell('Dispatching Unit','Hazira Works<br>Nature / Reason: JOB<br>Your / Our Ref: TEST1'))
      +'<div class="adt-doc-section"><div class="adt-doc-section-title">Item Details</div>'
      +recTable(['Item No.','Material Code','Description','HSN','Qty','UOM'],
        [['1','SKU_52297_3814','Mild Steel Plate 10 mm','0202'],['2','SKU_52288_3814','Carbon Steel Billet','0206'],
         ['3','SKU_52287_3814','Alloy Steel Forging Block','0203']].map(function(r){
          return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td><td>10</td><td>Each</td></tr>';}).join(''))
      +'</div>'
      +'<div class="adt-doc-section"><div class="adt-doc-section-title">Logistics</div>'
      +docGrid(3,docCell('Package','Plate Bundle')+docCell('No. of Packages','1')+docCell('Package Weight','1000 EA'))
      +docGrid(3,docCell('Transporter','TransCore Logistics')+docCell('Vehicle No.','AP47TD8451')+docCell('LR Date','26 Sep 2026'))
      +'</div>'
      +'<div class="adt-doc-clause"><b>Declaration:</b> Goods are sent for job work and not for sale. Goods remain the '
      +'property of the consignor and are expected to be returned by the specified return date.</div>'
      +'<div class="sc-doc-sig">'
        +'<div class="sc-doc-sig-block"><div class="sc-doc-sig-name">Sagar Kohli</div><div class="sc-doc-sig-label">Prepared by</div></div>'
        +'<div class="sc-doc-sig-block"><div class="sc-doc-sig-name">—</div><div class="sc-doc-sig-label">F&amp;A</div></div>'
        +'<div class="sc-doc-sig-block"><div class="sc-doc-sig-name">Sagar Kohli</div><div class="sc-doc-sig-label">Authorized by</div></div>'
      +'</div></div>';
  }

  else if(type==='asn'){
    var a=state.asns[index];if(!a)return;
    title='ASN Details';sub=a.no;
    body='<div class="lp-sb-detail-grid">'
      +fieldCard(ICO.doc,'ASN No.',a.no)
      +fieldCard(ICO.box,'Shipment No.','SHP-2026-035307')
      +fieldCard(ICO.doc,'SCR No.',LIVE_ID)
      +fieldCard(ICO.cart,'PO No.',LIVE_PO)
      +fieldCard(ICO.cube,'Advised Qty',String(a.qty))
      +fieldCard(ICO.check,'QC Status',badge(a.qc==='QC Cleared'?'approved':'pending',a.qc))
      +fieldCard(ICO.shield,'Gate Inward',badge(a.gateIn?'approved':'pending',a.gateIn?'Confirmed':'Pending'))
      +'</div>';
  }

  else if(type==='imr'){
    var m=state.imrs[index];if(!m)return;
    title='IMR Details';sub=m.no;
    body='<div class="lp-sb-detail-grid">'
      +fieldCard(ICO.doc,'IMR No.',m.no)
      +fieldCard(ICO.doc,'ASN No.',m.asnNo)
      +fieldCard(ICO.box,'Shipment No.','SHP-2026-035307')
      +fieldCard(ICO.doc,'SCR No.',LIVE_ID)
      +fieldCard(ICO.cart,'PO No.',LIVE_PO)
      +fieldCard(ICO.cube,'Receipt Qty',String(m.qty))
      +fieldCard(ICO.check,'Status',badge(m.status==='Confirmed'?'approved':'created',m.status))
      +'</div>';
  }

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
  else if(type==='shipment'){title='Shipment';sub='SHP-2026-0'+n;
    body=g(fieldCard(ICO.box,'Shipment ID',sub)+common+fieldCard(ICO.user,'Planner',esc(d.planner))
      +fieldCard(ICO.cube,'Issue Material',esc(d.issues[0][0]))+fieldCard(ICO.globe,'From Warehouse','Hazira Works')
      +fieldCard(ICO.cal,'Expected Return',esc(it.due)));}
  else if(type==='outbound'){title='Outbound Key';sub='OBK/26/'+n;
    body=g(fieldCard(ICO.hash,'Outbound Key No.',sub)+common+fieldCard(ICO.cube,'Issue Material',esc(d.issues[0][0])));}
  else if(type==='deliverynote'){title='Delivery Note';sub='DN/26/'+n;
    body=g(fieldCard(ICO.doc,'Delivery Note No.',sub)+common+fieldCard(ICO.cube,'Issue Material',esc(d.issues[0][0]))
      +fieldCard(ICO.globe,'Warehouse','Hazira Works')+fieldCard(ICO.user,'Approver',esc(SAMPLE_PEOPLE['Delivery Note Approver'])));}
  else if(type==='challan'){title='Delivery Challan';sub='CHL/26/'+n;
    body=g(fieldCard(ICO.doc,'Challan No.',sub)+common+fieldCard(ICO.globe,'Ship To',esc(d.vendor.addr))
      +fieldCard(ICO.cube,'Material',esc(d.issues[0][0]))+fieldCard(ICO.truck,'Transporter','TransCore Logistics'));}
  else if(type==='asn'){
    var qc=d.stage!=='asn'||k<d.asns||d.sub==='gatein'||d.sub==='vendor';
    title='ASN';sub='ASN-'+n+'-'+k;
    body=g(fieldCard(ICO.hash,'ASN No.',sub)+common+fieldCard(ICO.cube,'Receivable Item',esc(it.name))
      +fieldCard(ICO.hash,'Advised Qty',Math.ceil(it.qty/Math.max(1,d.asns))+' '+esc(it.uom))
      +fieldCard(ICO.check,'QC Status',badge(qc?'approved':'pending',qc?'QC Cleared':'Created')));}
  else if(type==='imr'){
    var ok=d.stage!=='imr'||k<d.imrs||d.sub==='create';
    title='IMR';sub='IMR-'+n+'-'+k;
    body=g(fieldCard(ICO.hash,'IMR No.',sub)+common+fieldCard(ICO.cube,'Receivable Item',esc(it.name))
      +fieldCard(ICO.globe,'Receiving Warehouse','Hazira Works')
      +fieldCard(ICO.check,'Status',badge(ok?'approved':'created',ok?'Confirmed':'Created')));}
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
