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
  store:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M9 20v-6h6v6"/></svg>',
  cube:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
  handshake:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7l3-3 6 6-3 3"/><path d="M12 7L9 4 3 10l3 3"/><path d="M6 13l4 4 2-2 3 3"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
};

/* ── RAIL (MOCK) ──────────────────────────────────────────────────────────
   Mirrors the source prototype's nav. Same data shape as ADT's sidebarItems,
   so swapping in the real structure is an edit to this array alone. */
var SC_NAV=[
  {section:'Overview'},
  {id:'dashboard',label:'Dashboard',icon:ICO.grid},

  {section:'Sub-Contracting'},
  {dropdown:'Transactions',icon:ICO.file,children:[
    {id:'deals',label:'Deals',icon:ICO.file},
    {id:'orders',label:'Purchase Orders',icon:ICO.cart}
  ]},

  {section:'Management'},
  {id:'stores',label:'Stores & Management',icon:ICO.store,placeholder:true},
  {id:'products',label:'Products & Inventory',icon:ICO.cube,placeholder:true},
  {id:'vendors',label:'Vendors',icon:ICO.handshake,placeholder:true},
  {id:'security',label:'Gate & Security',icon:ICO.shield,placeholder:true}
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

  scr:'sent',
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

  dealOpen:false,
  orderOpen:false,
  dealTab:'details',
  orderTab:'details',

  railCollapsed:false
};
var pendingAction=null;   // the business popup currently on screen

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
    +'<button type="button" class="cs-trigger'+(sel?'':' cs-placeholder')+'" onclick="csToggle(this,event)" data-csid="'+id+'">'
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
  if(trigger){trigger.querySelector('.cs-value').textContent=val;trigger.classList.remove('cs-placeholder','cs-open');}
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
function validDealActions(){
  var actions=ROLE_ACTIONS[state.role]||[];
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
function validPOActions(){
  var actions=ROLE_ACTIONS[state.role]||[];
  return actions.filter(function(a){
    if(a==='Generate PO')return state.po==='draft';
    if(a==='Approve PO'||a==='Return PO')return state.po==='created';
    return false;
  });
}

function pendingWith(){
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

function scrLabel(){return state.scr==='sent'?'Sent for Approval':state.scr==='closed'?'Closed':'Approved';}
function scrTone(){return state.scr==='sent'?'pending':state.scr==='closed'?'closed':'approved';}
function shipLabel(){
  return state.shipment==='none'?'Not Started'
    :state.shipment==='closed'?'Closed'
    :state.shipment==='created'?'Created'
    :state.shipment==='outbound_released'?'Freezed Outbound Release'
    :'Challan Generated';
}
function shipTone(){
  return state.shipment==='none'?'sc-idle':state.shipment==='closed'?'closed':'in-progress';
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
  state.stageFilter=null;state.stageLabel='';
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
    if(sb){sb.classList.add('open');document.getElementById('sc-deal-isb').innerHTML=dealPanelHTML();}
  }
  if(state.page==='orders'&&state.orderOpen){
    var ob=document.getElementById('sc-order-sb');
    if(ob){ob.classList.add('open');document.getElementById('sc-order-isb').innerHTML=orderPanelHTML();}
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
  state.stageFilter=key;state.stageLabel=title;
  state.page=(key==='po')?'orders':'deals';
  state.dealOpen=false;state.orderOpen=false;
  scRender();
  if(count===1){key==='po'?scOpenOrder():scOpenDeal();}
}
function scClearStageFilter(){
  state.stageFilter=null;state.stageLabel='';
  scRender();
}

/* ══ LISTING: DEALS ═══════════════════════════════════════════════════════  */
function stageBannerHTML(){
  if(!state.stageFilter)return '';
  return '<div class="sc-banner">'+ICO.info
    +'<span>Filtered by Current Deal Stage: <b>'+esc(state.stageLabel)+'</b></span>'
    +'<button class="btn-outline btn-sm sc-banner-clear" onclick="scClearStageFilter()">Clear</button></div>';
}

function dealsPageHTML(){
  var selected=state.dealOpen?' lp-row-selected':'';
  var row='<tr class="lp-row'+selected+'" style="cursor:pointer" onclick="scOpenDeal()">'
    +'<td>1</td>'
    +'<td><div class="lp-c-main">SCR-2026-50123</div><div class="lp-c-sub">Production Order</div></td>'
    +'<td><div class="lp-c-plain">Sub-contracting for shaft machining</div></td>'
    +'<td><span class="lp-c-name">Kinjal Sisodiya</span></td>'
    +'<td><div class="lp-c-plain">Sri Venkateswara Aerospace Pvt.ltd</div><div class="lp-c-sub">21005 · Hyderabad</div></td>'
    +'<td>'+badge(scrTone(),scrLabel())+'</td>'
    +'<td>'+badge(shipTone(),shipLabel())+'</td>'
    +'<td><div class="lp-c-plain">'+esc(pendingWith())+'</div></td>'
    +'<td><button class="lp-action-btn" title="View details" onclick="event.stopPropagation();scOpenDeal()">'+ICO.hamburger+'</button></td>'
    +'</tr>';

  var stats='<div class="listing-stats">'
    +'<div class="listing-stat active"><div class="listing-stat-count">1</div><div class="listing-stat-label">Open</div></div>'
    +'<div class="listing-stat pending"><div class="listing-stat-count">'+(state.scr==='sent'?1:0)+'</div><div class="listing-stat-label">Awaiting Approval</div></div>'
    +'<div class="listing-stat"><div class="listing-stat-count">'+state.asns.length+'</div><div class="listing-stat-label">ASNs</div></div>'
    +'<div class="listing-stat"><div class="listing-stat-count">'+state.imrs.length+'</div><div class="listing-stat-label">IMRs</div></div>'
    +'</div>';

  return '<div class="listing-page">'
    +stageBannerHTML()
    +'<div class="listing-top">'
      +'<div class="lp-filter-bar" style="flex:1;min-width:0">'
        +'<div class="lp-filter-bar-label">Select Filter</div>'
        +'<div class="lp-filter-bar-row">'
          +'<input class="lp-search-input" type="text" placeholder="Search Deal ID, title, vendor">'
          +csField('sc-f-process',['Job Work','Processing','Repair'],'','Sub-Contracting Process')
          +csField('sc-f-scr',['Sent for Approval','Approved','Closed'],'','SCR Status')
          +csField('sc-f-ship',['Not Started','Created','Freezed Outbound Release','Challan Generated','Closed'],'','Shipment Status')
          +'<button class="lp-pill-clear" onclick="scClearStageFilter()">'+ICO.close+' Reset</button>'
          +'<button class="lp-pill-search" onclick="scToast(\'Filters applied\',\'info\')">Search</button>'
        +'</div>'
      +'</div>'
      +stats
    +'</div>'
    +'<div class="lp-split-wrap sc-split">'
      +'<div class="lp-split-main">'
        +'<div class="lp-table-card" style="border:none;border-radius:0;box-shadow:none">'
          +'<table class="lp-table" style="min-width:980px"><thead><tr>'
          +'<th>S.No</th><th>Deal ID</th><th>Title</th><th>Planner</th><th>Vendor</th>'
          +'<th>SCR Status</th><th>Shipment Status</th><th>Pending With</th><th>Action</th>'
          +'</tr></thead><tbody>'+row+'</tbody></table>'
          +'<div class="lp-pagination"><div class="lp-pagination-info">Showing 1 of 1 deal</div>'
          +'<div class="lp-pagination-controls"><button class="lp-pg-btn active">1</button></div></div>'
        +'</div>'
      +'</div>'
      +'<div class="lp-split-sb" id="sc-deal-sb"><div class="lp-isb" id="sc-deal-isb"></div></div>'
    +'</div>'
  +'</div>';
}

/* ══ LISTING: PURCHASE ORDERS ═════════════════════════════════════════════  */
function ordersPageHTML(){
  var body;
  if(state.po==='none'){
    body='<tr><td colspan="11" style="padding:0">'
      +'<div class="sc-empty"><div class="sc-empty-ico">'+ICO.cart+'</div>'
      +'<div class="sc-empty-title">No Purchase Order yet</div>'
      +'<div class="sc-empty-sub">A PO is created automatically in Draft as soon as the SCR is approved, and appears here for the Buyer to complete.</div>'
      +'</div></td></tr>';
  }else{
    var selected=state.orderOpen?' lp-row-selected':'';
    body='<tr class="lp-row'+selected+'" style="cursor:pointer" onclick="scOpenOrder()">'
      +'<td><div class="lp-c-main">37741</div></td>'
      +'<td><div class="lp-c-plain">SCR-2026-50123</div></td>'
      +'<td><div class="lp-c-plain">Sub-contracting for shaft machining</div></td>'
      +'<td><div class="lp-c-plain">Hazira Works</div></td>'
      +'<td><div class="lp-c-plain">Sri Venkateswara Aerospace Pvt.ltd</div></td>'
      +'<td><span class="lp-c-name">Madan Mohan</span></td>'
      +'<td><div class="lp-c-main">5,000.00</div></td>'
      +'<td><div class="lp-c-n">30 Sep 2026</div></td>'
      +'<td><div class="lp-c-n">'+(state.po==='approved'||state.po==='closed'?'30 Sep 2026':'<span class="lp-dash">—</span>')+'</div></td>'
      +'<td>'+badge(poTone(),poLabel())+'</td>'
      +'<td><button class="lp-action-btn" title="View details" onclick="event.stopPropagation();scOpenOrder()">'+ICO.hamburger+'</button></td>'
      +'</tr>';
  }
  var stats='<div class="listing-stats">'
    +'<div class="listing-stat"><div class="listing-stat-count">'+(state.po==='none'?0:1)+'</div><div class="listing-stat-label">Total</div></div>'
    +'<div class="listing-stat pending"><div class="listing-stat-count">'+(state.po==='draft'||state.po==='created'?1:0)+'</div><div class="listing-stat-label">In Progress</div></div>'
    +'<div class="listing-stat approved"><div class="listing-stat-count">'+(state.po==='approved'||state.po==='closed'?1:0)+'</div><div class="listing-stat-label">Approved</div></div>'
    +'</div>';

  return '<div class="listing-page">'
    +stageBannerHTML()
    +'<div class="listing-top">'
      +'<div class="lp-filter-bar" style="flex:1;min-width:0">'
        +'<div class="lp-filter-bar-label">Select Filter</div>'
        +'<div class="lp-filter-bar-row">'
          +'<input class="lp-search-input" type="text" placeholder="Search PO No., SCR No.">'
          +csField('sc-f-pos',['Draft','Created','Approved','Closed'],'','Status')
          +csField('sc-f-buyer',['Madan Mohan','Gagan Tej'],'','Buyer')
          +'<button class="lp-pill-clear" onclick="scClearStageFilter()">'+ICO.close+' Reset</button>'
          +'<button class="lp-pill-search" onclick="scToast(\'Filters applied\',\'info\')">Search</button>'
        +'</div>'
      +'</div>'
      +stats
    +'</div>'
    +'<div class="lp-split-wrap sc-split">'
      +'<div class="lp-split-main">'
        +'<div class="lp-table-card" style="border:none;border-radius:0;box-shadow:none">'
          +'<table class="lp-table" style="min-width:1100px"><thead><tr>'
          +'<th>PO No.</th><th>SCR No.</th><th>SCR Title</th><th>Location</th><th>Vendor</th>'
          +'<th>Buyer</th><th>PO Value</th><th>Created On</th><th>Approved On</th><th>Status</th><th>Action</th>'
          +'</tr></thead><tbody>'+body+'</tbody></table>'
        +'</div>'
      +'</div>'
      +'<div class="lp-split-sb" id="sc-order-sb"><div class="lp-isb" id="sc-order-isb"></div></div>'
    +'</div>'
  +'</div>';
}

/* ══ PANEL PLUMBING ═══════════════════════════════════════════════════════
   Open and close toggle the class on the EXISTING node and fill its inner —
   never a wholesale re-render — which is what lets the panel actually slide. */
function scOpenDeal(){
  if(state.dealOpen){scCloseDeal();return;}
  state.dealOpen=true;state.dealTab='details';
  var sb=document.getElementById('sc-deal-sb');if(!sb)return;
  sb.classList.add('open');
  document.getElementById('sc-deal-isb').innerHTML=dealPanelHTML();
  markSelectedRow(true);
}
function scCloseDeal(){
  state.dealOpen=false;
  var sb=document.getElementById('sc-deal-sb');if(sb)sb.classList.remove('open');
  markSelectedRow(false);
}
function scOpenOrder(){
  if(state.orderOpen){scCloseOrder();return;}
  state.orderOpen=true;state.orderTab='details';
  var sb=document.getElementById('sc-order-sb');if(!sb)return;
  sb.classList.add('open');
  document.getElementById('sc-order-isb').innerHTML=orderPanelHTML();
  markSelectedRow(true);
}
function scCloseOrder(){
  state.orderOpen=false;
  var sb=document.getElementById('sc-order-sb');if(sb)sb.classList.remove('open');
  markSelectedRow(false);
}
function markSelectedRow(on){
  var r=document.querySelector('.lp-table tbody tr.lp-row');
  if(r)r.classList.toggle('lp-row-selected',!!on);
}
function scDealTab(tab){
  state.dealTab=tab;
  document.getElementById('sc-deal-isb').innerHTML=dealPanelHTML();
}
function scOrderTab(tab){
  state.orderTab=tab;
  document.getElementById('sc-order-isb').innerHTML=orderPanelHTML();
}
function refreshDealPanel(){
  if(state.dealOpen&&document.getElementById('sc-deal-isb'))
    document.getElementById('sc-deal-isb').innerHTML=dealPanelHTML();
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
function recTable(head,rows){
  return '<div class="sc-rec-wrap"><table class="sc-rec-table"><thead><tr>'
    +head.map(function(h){return '<th>'+esc(h)+'</th>';}).join('')
    +'</tr></thead><tbody>'+rows+'</tbody></table></div>';
}

/* ══ DEAL PANEL ═══════════════════════════════════════════════════════════  */
function dealPanelHTML(){
  var tabs=[{id:'details',label:'Details'},{id:'workflow',label:'Workflow'},
            {id:'logs',label:'Logs'},{id:'attachments',label:'Attachments'},{id:'activity',label:'Activity Log'}];
  var bar=tabBarHTML(tabs,state.dealTab,'scDealTab','scCloseDeal','sc-deal-tabs');
  var body;
  if(state.dealTab==='details')body=dealDetailsHTML();
  else if(state.dealTab==='workflow')body=dealWorkflowHTML();
  else if(state.dealTab==='logs')body=dealLogsHTML();
  else if(state.dealTab==='attachments')body=dealAttachmentsHTML();
  else body=dealActivityHTML();

  return bar+'<div class="lp-isb-body">'+body+'</div>';
}

function dealDetailsHTML(){
  /* 20px under a group, as on Payroll — the gap is what separates two grids of
     identical cards into two readable groups. */
  var g=function(cards){return '<div class="lp-sb-detail-grid" style="margin-bottom:20px">'+cards+'</div>';};
  var head=g(
     fieldCard(ICO.hash,'SCR No.','SCR-2026-50123')
    +fieldCard(ICO.check,'Status',badge(scrTone(),scrLabel()))
    +fieldCard(ICO.doc,'SCR Title','Sub-contracting for shaft machining')
    +fieldCard(ICO.tag,'SCR Base','Production Order')
    +fieldCard(ICO.tag,'Nature of SCR / Work Type','Job')
    +fieldCard(ICO.globe,'Purchase Office','PUR-121 — Manufacturing Procurement')
    +fieldCard(ICO.check,'SCR Unpeg','Yes')
    +fieldCard(ICO.check,'Inter-Unit','No')
    +fieldCard(ICO.check,'Partial Material as FIM','Yes')
    +fieldCard(ICO.check,'Billable','Yes')
    +fieldCard(ICO.truck,'Logistics Required','Yes')
    +fieldCard(ICO.user,'Buyer','Madan Mohan')
    +fieldCard(ICO.user,'Approver','PMG Approver')
    +fieldCard(ICO.doc,'Remarks','For urgent processing')
    +fieldCard(ICO.doc,'Header Text','Additional header information',true)
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
    '<tr><td><b>Fabricated End Frame</b></td><td>Finished Product</td><td>10</td><td>Each</td><td>250</td>'
    +'<td>Hazira Works</td><td>0202</td><td>30 Oct 2026</td><td>'+confirmedReceived()+'</td><td>'+openReceiptQty()+'</td>'
    +'<td>'+badge(state.closed?'closed':'open',state.closed?'Closed':'Open')+'</td></tr>');

  var issues=[
    ['SKU_52297_3814 — Mild Steel Plate 10 mm','Zone A','0202'],
    ['SKU_52288_3814 — Carbon Steel Billet','Zone B','0206'],
    ['SKU_52287_3814 — Alloy Steel Forging Block','Zone C','0203']
  ].map(function(r){
    return '<tr><td>Fabricated End Frame</td><td><b>'+r[0]+'</b></td><td>Raw Material</td><td>10</td><td>Each</td>'
      +'<td>Hazira Works</td><td>Main Store</td><td>'+r[1]+'</td><td>Yes</td><td>GST-05</td><td>'+r[2]+'</td><td>1:1</td></tr>';
  }).join('');
  var issue=recTable(['For Receivable Item','Issue Item','Item Type','Issue Qty','UOM','Warehouse','Storage Location','Storage Zone','FIM','Tax Code','HSN','BOM Ratio'],issues);

  return secHead('SCR Header Details',viewBtn('View SCR','scr'))+head
    +secHead('SCR Base Details')+base
    +secHead('Vendor Details')+vendor
    +secHead('Receivable Item Details')+recv
    +secHead('Issue Item Details')+issue;
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
function wfMeta(status,fallbackUser){
  var l=state.dealLogs.filter(function(x){return x.status===status;})[0]
     || state.poLogs.filter(function(x){return x.status===status;})[0];
  return l?{user:l.by+' · '+l.role,date:l.date,time:l.time}:{user:fallbackUser||'Pending',date:'',time:''};
}
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
      +'<div class="lp-wf-desc"><span class="lp-wf-desc-label">Description:</span><span class="lp-wf-desc-text">'+description+'</span></div>'
      +(actions?'<div class="sc-wf-actions">'+actions+'</div>':'')
    +'</div></div>';
}
function viewBtn(label,type,index){
  return '<button class="btn-outline btn-sm" onclick="scOpenView(\''+type+'\''+(index!==undefined?','+index:'')+')">'+ICO.eye+' '+esc(label)+'</button>';
}
/* The lifecycle runs to twenty-odd stages, so it is grouped — with the section
   head the Details tab and every other ADT panel already use, not a second
   heading style. */
function wfGroup(title,rows){
  return '<div class="sc-wf-group">'+secHead(title)+'<div class="lp-wf-wrap">'+rows.join('')+'</div></div>';
}
/* ADT's note box, not a module-specific one. */
function wfNote(text){
  return '<div class="info-box tip" style="margin:0 0 18px">'
    +'<span class="ib-icon">'+ICO.info+'</span><div>'+text+'</div></div>';
}
function dealWorkflowHTML(){
  var html=wfNote('<b>Workflow is read-only.</b> Every operational update is recorded from the Logs tab, '
    +'so this timeline only ever reports what has already happened.');

  html+=wfGroup('SCR',[
    wfRow('Creation',wfMeta('SCR Submitted','Kinjal Sisodiya · Planner'),
      'SCR raised against Production Order PO-100045 and submitted for approval.',
      viewBtn('View SCR','scr')),
    wfRow('Approval — '+(state.scr==='sent'?'Pending':state.scr==='closed'?'Closed':'Approved'),
      wfMeta('SCR Approved','Pending with PMG Approver'),
      state.scr==='sent'?'Awaiting the PMG Approver. The Purchase Order is created in Draft on approval.'
        :'Approved by the PMG Approver. PO 37741 created in Draft.','',true)
  ]);

  html+=wfGroup('Shipment & Outbound',[
    wfRow('Shipment Creation — '+(state.shipment==='none'?'Pending':state.shipment==='closed'?'Closed':'Completed'),
      wfMeta('Shipment Created','Pending with Planner'),
      state.shipment==='none'?'Starts once the Purchase Order is approved.'
        :'Shipment <b>SHP-2026-035307</b> raised against PO 37741.',
      state.shipment!=='none'?viewBtn('View Shipment','shipment'):''),
    wfRow('Outbound Key & Transfer Order — '+(state.outboundKey?'Generated':'Pending'),
      wfMeta('Outbound Key Generated','System'),
      state.outboundKey?'Outbound Key <b>OBK/26/0152</b> and Transfer Order <b>TO/26/0152</b> generated automatically. Material Position <b>MAAS_STAGING</b>.'
        :'Generated automatically as soon as the Shipment is created.',
      state.outboundKey?viewBtn('View Outbound Key','outbound'):''),
    wfRow('Goods Release & Issue — '+(state.goodsIssue?'Completed':'Pending'),
      wfMeta('Goods Release & Issue','Pending with Stores User'),
      state.goodsIssue?'Stores released the reserved issue material. Shipment moved to <b>Freezed Outbound Release</b>.'
        :'Stores releases the reserved issue material against the Transfer Order.',''),
    wfRow('Delivery Note — '+(state.deliveryNote==='none'?'Not Started':state.deliveryNote==='approved'?'Approved':'Generated'),
      wfMeta(state.deliveryNote==='approved'?'Delivery Note Approved':'Delivery Note Generated','Pending with Delivery Note Approver'),
      state.deliveryNote==='none'?'Generated automatically after Goods Release & Issue.'
        :'Delivery Note <b>DN/26/0123</b> covering three issue items, 10 Each.',
      state.deliveryNote!=='none'?viewBtn('View Delivery Note','deliverynote'):''),
    wfRow('Challan — '+(state.challan==='none'?'Not Started':state.challan==='gate_cleared'?'Gate Cleared':state.challan==='closed'?'Closed':'Generated'),
      wfMeta('Challan Generated','Pending with Finance / F&A / IDT'),
      state.challan==='none'?'Generated once the Delivery Note is approved.'
        :'Delivery Challan <b>CHL/26/0103</b> issued as the gate pass copy, billable job work.',
      state.challan!=='none'?viewBtn('View Challan','challan'):''),
    wfRow('Gate Outward — '+(state.gateOut?'Completed':'Pending'),
      wfMeta('Gate Outward Confirmed','Pending with Security User'),
      state.gateOut?'Security confirmed the outward movement against the challan. Vehicle AP47TD8451.'
        :'Security confirms the physical outward movement of the material.',''),
    wfRow('Shipment Confirmation — '+(state.shipmentConfirmed?'Completed':'Pending'),
      wfMeta('Shipment Confirmed','Pending with Planner / PMG'),
      state.shipmentConfirmed?'Shipment confirmed. Material Position updated to <b>At Vendor</b>.'
        :'Planner or PMG confirms the Shipment once it has left the gate.','',true)
  ]);

  var asnRows;
  if(!state.asns.length){
    asnRows=[wfRow('ASN — Pending',{user:'Pending with Vendor User',date:'',time:''},
      'No ASN raised yet. Open ASN Qty <b>'+openASNQty()+'</b> of '+EXPECTED_QTY+'.','',true)];
  }else{
    asnRows=state.asns.map(function(a,i){
      var done=a.qc==='QC Cleared'&&a.gateIn;
      return wfRow('ASN '+(i+1)+' — '+(done?'Gate Inward Confirmed':a.qc==='QC Cleared'?'Awaiting Gate Inward':'Awaiting QC'),
        wfMeta('ASN Created','Vendor Portal User · Vendor User'),
        '<b>'+a.no+'</b> advising <b>'+a.qty+'</b> of '+EXPECTED_QTY+'. QC <b>'+a.qc+'</b>, Gate Inward <b>'
          +(a.gateIn?'Confirmed':'Pending')+'</b>. Open ASN Qty <b>'+openASNQty()+'</b>.',
        viewBtn('View ASN','asn',i),i===state.asns.length-1);
    });
  }
  html+=wfGroup('ASN & Gate Inward',asnRows);

  var imrRows=[];
  if(!state.imrs.length){
    imrRows.push(wfRow('Material Receipt / IMR — Pending',{user:'Pending with Stores User',date:'',time:''},
      'Raised against a QC-cleared ASN that has passed gate inward.',''));
  }else{
    state.imrs.forEach(function(m,i){
      imrRows.push(wfRow('IMR '+(i+1)+' — '+m.status,wfMeta('IMR Created','Stores User'),
        '<b>'+m.no+'</b> against <b>'+m.asnNo+'</b>, receipt quantity <b>'+m.qty+'</b>.',
        viewBtn('View IMR','imr',i)));
    });
  }
  imrRows.push(wfRow('Reconciliation — '+(state.reconciled?'Completed':'Pending'),
    wfMeta('Reconciliation Completed','Pending with Finance / F&A'),
    'Expected <b>'+EXPECTED_QTY+'</b>, cumulative received <b>'+confirmedReceived()+'</b>, open receipt <b>'+openReceiptQty()+'</b>.',
    viewBtn('View Reconciliation','reconciliation')));
  imrRows.push(wfRow('Receipt Completion & Closure — '
      +(state.closed?'Closed':state.shortClosed?'Short Closed':state.fullReceipt?'Full Receipt Confirmed':'Pending'),
    wfMeta('Transaction Closed','Pending with Finance / F&A'),
    state.closed?'SCR, Purchase Order, Shipment and Challan all closed.'
      :state.shortClosed?'The remaining open quantity was short closed. The transaction can now be closed.'
      :state.fullReceipt?'Full receipt confirmed against the expected quantity.'
      :'Available once Reconciliation is complete.','',true));
  html+=wfGroup('IMR & Reconciliation',imrRows);

  return html;
}

/* ── LOGS ─────────────────────────────────────────────────────────────────
   Timeline on the left, the form on the right: the shared .lp-logs-wrap, so a
   Sub-Contracting log reads exactly like a log anywhere else in ADT. */
function logTone(status){
  var s=String(status).toLowerCase();
  if(/reject|return/.test(s))return 'unapproved';
  if(/approv|confirm|clear|complete|closed|close/.test(s))return 'approved';
  if(/pending|submit|sent/.test(s))return 'pending';
  if(/generat|creat/.test(s))return 'info';
  return 'default';
}
function logTimelineHTML(logs){
  if(!logs.length)return '<div class="lp-logs-empty">No activity logs yet.</div>';
  var pSvg='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  var cSvg='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
  var tSvg='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
  return '<div class="lp-logs-timeline">'+logs.map(function(l,n){
    var k=logTone(l.status);
    return '<div class="lp-log-row">'
      +'<div class="lp-log-avatar-col"><div class="lp-log-avatar lp-log-avatar--'+k+'">'+pSvg+'</div>'
      +(n<logs.length-1?'<div class="lp-log-connector"></div>':'')+'</div>'
      +'<div class="lp-log-card">'
        +'<div class="lp-log-status-row"><span class="lp-log-dot lp-log-dot--'+k+'"></span>'
        +'<span class="lp-log-status-text lp-log-status-text--'+k+'">'+esc(l.status)+'</span></div>'
        +'<div class="lp-log-meta-row">'
          +'<span class="lp-log-meta-item">'+pSvg+'<span>'+esc(l.by)+' · '+esc(l.role)+'</span></span>'
          +'<span class="lp-log-meta-item">'+cSvg+'<span>'+esc(l.date)+'</span></span>'
          +'<span class="lp-log-meta-item">'+tSvg+'<span>'+esc(l.time)+'</span></span>'
          +'<span class="lp-log-meta-item">'+esc(l.portal)+'</span>'
        +'</div>'
        +'<div class="lp-log-comment-row"><span class="lp-log-comment-label">Comment:</span>'+esc(l.comment)+'</div>'
      +'</div></div>';
  }).join('')+'</div>';
}
function dealLogsHTML(){
  var opts=validDealActions();
  var form='<div class="lp-logs-form">'
    +'<div class="lp-logs-form-header"><span class="lp-log-dot lp-log-dot--'+logTone(scrLabel())+'"></span>Add Log</div>'
    +'<p class="lp-logs-form-sub">Record the next action on this deal. Only the actions <b>'+esc(state.role)+'</b> can take right now are offered.</p>'
    +'<div class="lp-logs-form-label">Status <span class="lp-logs-form-req">*</span></div>'
    +csField('sc-deal-status',opts,'','Select Status','scDealStatusPicked')
    +'<div class="lp-logs-form-label">Remarks / Comment <span class="lp-logs-form-req">*</span></div>'
    +'<textarea class="lp-logs-form-textarea" id="sc-deal-comment" placeholder="Type comment"></textarea>'
    +'<button class="lp-logs-save-btn" onclick="scSubmitDealLog()">Submit</button>'
    +(opts.length?'':'<p class="lp-logs-form-sub" style="margin:12px 0 0">Nothing is pending with this role at this stage. Switch role in the header to continue the flow.</p>')
    +'</div>';
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
  if(!comment){scToast('Remarks / Comment is mandatory','error');return;}
  executeDealAction(action,comment);
  scRender();
}

function dealAttachmentsHTML(){
  return secHead('Attachments')
    +'<div style="display:flex;flex-direction:column;gap:10px">'
    +'<div class="sc-att-row"><div class="sc-att-ico">'+ICO.doc+'</div>'
      +'<div><div class="sc-att-name">Machining_Specification.pdf</div>'
      +'<div class="sc-att-meta">Uploaded with the SCR · 1.4 MB · 25 Sep 2026</div></div>'
      +'<button class="btn-outline btn-sm" style="margin-left:auto" onclick="scToast(\'Download is not wired in this prototype\',\'info\')">Download</button></div>'
    +'<div class="sc-att-row"><div class="sc-att-ico">'+ICO.doc+'</div>'
      +'<div><div class="sc-att-name">Vendor_Rate_Contract_RC-123.pdf</div>'
      +'<div class="sc-att-meta">Linked from Rate Contract · 820 KB · 25 Sep 2026</div></div>'
      +'<button class="btn-outline btn-sm" style="margin-left:auto" onclick="scToast(\'Download is not wired in this prototype\',\'info\')">Download</button></div>'
    +'</div>'
    +'<div class="ct-upload-area" style="margin-top:14px" onclick="scToast(\'Upload is not wired in this prototype\',\'info\')">'
      +'<b style="font-size:13px;color:var(--navy)">Choose files</b> or drop them here'
      +'<p>PDF, Excel, CSV or Word. Up to 10 MB each.</p></div>';
}
function dealActivityHTML(){
  return secHead('Activity Log')+logTimelineHTML(state.dealLogs);
}

/* ══ ORDER PANEL ══════════════════════════════════════════════════════════  */
function orderPanelHTML(){
  var tabs=[{id:'details',label:'Details'},{id:'workflow',label:'Workflow'},{id:'logs',label:'Logs'}];
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
    +fieldCard(ICO.hash,'PO No.','37741')
    +fieldCard(ICO.check,'PO Status',badge(poTone(),poLabel()))
    +fieldCard(ICO.doc,'SCR No.','SCR-2026-50123')
    +fieldCard(ICO.tag,'Order Type','Sub-Contracting')
    +fieldCard(ICO.handshake,'Vendor / Sub-Contractor','21005 — Sri Venkateswara Aerospace Pvt.ltd')
    +fieldCard(ICO.globe,'Vendor Address','Hyderabad, Telangana 500084')
    +fieldCard(ICO.tag,'Required Skill / Service','Structural Fabrication')
    +fieldCard(ICO.tag,'Lot Type','Specific')
    +fieldCard(ICO.user,'Buyer','Madan Mohan')
    +fieldCard(ICO.doc,'PO Series','Not Applicable')
    +fieldCard(ICO.doc,'Rate Contract','RC-123')
    +fieldCard(ICO.doc,'SAP SCR Reference ID','')
    +fieldCard(ICO.money,'Price Basis','Per Piece')
    +fieldCard(ICO.money,'Currency','INR — Rupees')
    +fieldCard(ICO.clock,'Payment Terms','PT-122 — Payment within 7 Days')
    +fieldCard(ICO.user,'PMG Approver','Gagan Tej')
    +fieldCard(ICO.tag,'Tax Code','GST-05 — GST @ 5%')
    +fieldCard(ICO.globe,'Purchase Office','PUR-121 — Manufacturing Procurement')
    +fieldCard(ICO.money,'PO Value','5,000.00')
    +'</div>';
  var lines=recTable(['#','Receivable Item','Quantity','UOM','Price / Unit','Line Value'],
    '<tr><td>1</td><td><b>Power Shovel</b><span class="sc-rec-sub">SKU_52321_3814</span></td>'
    +'<td>10</td><td>Each</td><td>500</td><td><b>5,000.00</b></td></tr>');
  return secHead('PO Header Details',viewBtn('View PO','po'))+head
    +secHead('PO Lines')+lines;
}
function orderWorkflowHTML(){
  if(state.po==='none'){
    return wfNote('The Purchase Order is created automatically in <b>Draft</b> once the SCR is approved; '
      +'its workflow begins there.');
  }
  var created=state.po==='created'||state.po==='approved'||state.po==='closed';
  var approved=state.po==='approved'||state.po==='closed';
  return wfNote('<b>Workflow is read-only.</b> Purchase Order actions are recorded from the Logs tab.')
    +wfGroup('Purchase Order',[
      wfRow('Draft',wfMeta('PO Auto-Created','System'),
        'PO <b>37741</b> created automatically against SCR-2026-50123 on approval.',viewBtn('View PO','po')),
      wfRow('Generate PO — '+(created?'Created':'Pending'),wfMeta('PO Generated','Pending with Buyer'),
        created?'Buyer completed the commercial fields and generated the Purchase Order. PO value 5,000.00.'
          :'Buyer completes rate contract, price basis, currency, payment terms and line price.',''),
      wfRow('PO Approval — '+(approved?'Approved':'Pending'),wfMeta('PO Approved','Pending with PO Approver'),
        approved?'Approved by the PO Approver. The Planner can now raise the Shipment.'
          :'PO Approver reviews the generated Purchase Order.','',true)
    ]);
}
function orderLogsHTML(){
  var opts=validPOActions();
  var form='<div class="lp-logs-form">'
    +'<div class="lp-logs-form-header"><span class="lp-log-dot lp-log-dot--'+logTone(poLabel())+'"></span>Add Log</div>'
    +'<p class="lp-logs-form-sub">Record the next action on this Purchase Order.</p>'
    +'<div class="lp-logs-form-label">Status <span class="lp-logs-form-req">*</span></div>'
    +csField('sc-po-status',opts,'','Select Status','scOrderStatusPicked')
    +'<div class="lp-logs-form-label">Remarks / Comment <span class="lp-logs-form-req">*</span></div>'
    +'<textarea class="lp-logs-form-textarea" id="sc-po-comment" placeholder="Type comment"></textarea>'
    +'<button class="lp-logs-save-btn" onclick="scSubmitOrderLog()">Submit</button>'
    +(opts.length?'':'<p class="lp-logs-form-sub" style="margin:12px 0 0">Nothing is pending with this role on this PO.</p>')
    +'</div>';
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
  if(!comment){scToast('Remarks / Comment is mandatory','error');return;}
  if(action==='Approve PO'){state.po='approved';addPOLog('PO Approved',comment);scToast('PO 37741 approved');}
  if(action==='Return PO'){addPOLog('PO Returned',comment);scToast('PO returned to Buyer','info');}
  scRender();
}

/* ══ LOG WRITERS ══════════════════════════════════════════════════════════  */
function stamp(){
  var d=new Date();
  return {
    date:d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),
    time:d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit'})
  };
}
function who(){
  return state.role==='Super Admin'?'Super Admin User'
    :state.role==='Vendor User'?'Vendor Portal User'
    :'Kinjal Sisodiya';
}
function addDealLog(status,comment){
  var s=stamp();
  state.dealLogs.unshift({status:status,comment:comment,by:who(),role:state.role,date:s.date,time:s.time,portal:'Web'});
}
function addPOLog(status,comment){
  var s=stamp();
  state.poLogs.unshift({status:status,comment:comment,by:who(),role:state.role,date:s.date,time:s.time,portal:'Web'});
}

/* ══ ACTIONS WITHOUT A FORM ═══════════════════════════════════════════════  */
function executeDealAction(action,comment){
  if(action==='Approve SCR'){
    state.scr='approved';state.po='draft';
    addDealLog('SCR Approved',comment);
    addPOLog('PO Auto-Created','PO 37741 created automatically in Draft after SCR approval.');
    scToast('SCR approved','success','PO 37741 created in Draft for the Buyer.');
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
function scCloseModal(){
  document.getElementById('sc-modal-root').innerHTML='';
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
function select(id,opts){
  return '<select class="ep-form-select" id="'+id+'">'+opts.map(function(o){return '<option>'+esc(o)+'</option>';}).join('')+'</select>';
}
function segField(label,yes){
  return '<div class="sc-radio-group"><span>'+esc(label)+'</span>'
    +'<span class="sc-seg"><button type="button" class="'+(yes?'on':'')+'" onclick="scSeg(this,0)">Yes</button>'
    +'<button type="button" class="'+(yes?'':'on')+'" onclick="scSeg(this,1)">No</button></span></div>';
}
function scSeg(btn){
  var group=btn.parentElement;
  group.querySelectorAll('button').forEach(function(b){b.classList.remove('on');});
  btn.classList.add('on');
}

/* ── CREATE SCR ───────────────────────────────────────────────────────────  */
function scOpenCreateSCR(){
  var header=section('SCR Header Details',
    '<div class="policy-form-grid">'
    +field('SCR Title',input('f-title','Sub-contracting for shaft machining'),true)
    +field('SCR Base',select('f-base',['Production Order','Project']),true)
    +field('Nature of SCR / Work Type',input('f-nature','Job'),true)
    +field('Purchase Office',select('f-office',['PUR-121 — Manufacturing Procurement']),true)
    +'<div class="sc-radio-row">'
      +segField('SCR Unpeg',true)+segField('Inter-Unit',false)+segField('Partial Material as FIM',true)
      +segField('Billable',true)+segField('Logistics Required',true)
    +'</div>'
    +field('Buyer',select('f-buyer',['Madan Mohan','Gagan Tej']))
    +field('Approver',select('f-approver',['PMG Approver']))
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

  var attach=section('Attachments',
    '<div class="ct-upload-area" onclick="scToast(\'Upload is not wired in this prototype\',\'info\')">'
    +'<b style="font-size:13px;color:var(--navy)">Choose files</b> or drop them here'
    +'<p>PDF, Excel, CSV or Word. Up to 10 MB each.</p></div>');

  var foot='<span class="hr-actions-sub" style="margin-right:auto">Submitting sends the SCR to the PMG Approver.</span>'
    +'<div class="ct-modal-btns">'
      +'<button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
      +'<button class="btn-outline" onclick="scSaveDraftSCR()">Save as Draft</button>'
      +'<button class="btn-primary" onclick="scSubmitSCR()">Submit for Approval</button>'
    +'</div>';

  document.getElementById('sc-modal-root').innerHTML=
    modalShell('Create SCR','Sub-Contracting Request',header+base+vendor+recv+issue+attach,foot,true);
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
  state.scr='sent';
  addDealLog('SCR Submitted','SCR created and submitted for approval.');
  scCloseModal();
  state.page='deals';
  scRender();
  scToast('SCR submitted for approval','success','Now pending with the PMG Approver.');
}

/* ── THE FORM-BACKED ACTIONS ──────────────────────────────────────────────  */
function scOpenActionModal(action,comment,context){
  pendingAction={action:action,context:context};
  var fields='';

  if(action==='Generate PO'){
    fields=section('PO Header Details','<div class="policy-form-grid">'
      +readonlyField('SCR No.','SCR-2026-50123')
      +readonlyField('PO No.','37741')
      +readonlyField('Order Type','Sub-Contracting')
      +readonlyField('PO Status','Draft')
      +readonlyField('Vendor / Sub-Contractor','21005 — Sri Venkateswara Aerospace Pvt.ltd')
      +readonlyField('Vendor Address','Hyderabad, Telangana 500084')
      +readonlyField('Required Skill / Service','Structural Fabrication')
      +readonlyField('Lot Type','Specific')
      +readonlyField('Buyer','Madan Mohan')
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
        '<tr><td>1</td><td><b>Power Shovel</b><span class="sc-rec-sub">SKU_52321_3814</span></td><td>10</td><td>Each</td>'
        +'<td><input class="ep-form-input" id="po-price" value="500" oninput="scRecalcPO()"></td>'
        +'<td id="po-line-value"><b>5,000.00</b></td></tr>')
      +'<div class="policy-form-grid" style="margin-top:14px">'
      +field('Header Text (from the request)','<textarea class="ep-form-input" id="po-head" style="min-height:70px"></textarea>',false,true)
      +field('PO Value','<div class="sc-ro" id="po-total">5,000.00</div>')
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
      +readonlyField('SCR Number','SCR-2026-50123')
      +readonlyField('PO Number','37741')
      +field('Vendor Invoice No.',input('asn-inv','INV-'+(8891+state.asns.length)))
      +field('Dispatch Date',input('asn-date','2026-10-08','date'))
      +field('Vehicle No.',input('asn-vehicle','AP47TD8451'))
      +field('Lot / Serial Ref.',input('asn-lot','LOT-HZ-'+(112+state.asns.length)))
      +'</div>')
    +section('Open Items',
      recTable(['Receivable Item','Expected Qty','Cumulative Advised','Open ASN Qty','Advised Qty *'],
        '<tr><td><b>Fabricated End Frame</b></td><td>'+EXPECTED_QTY+'</td><td>'+cumulativeAdvised()+'</td>'
        +'<td><b>'+openASNQty()+'</b></td>'
        +'<td><input class="ep-form-input" id="asn-qty" value="'+Math.min(6,openASNQty())+'"></td></tr>'));
  }

  if(action==='Create IMR'){
    var eligible=eligibleASNs();
    fields=section('IMR Details','<div class="policy-form-grid">'
      +readonlyField('SCR Number','SCR-2026-50123')
      +readonlyField('PO Number','37741')
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
      +fieldCard(ICO.cube,'Receivable Item','Fabricated End Frame')
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
    +readonlyField('Status',action)
    +field('Comment','<textarea class="ep-form-input" id="sc-action-comment" style="min-height:70px" placeholder="Enter comment">'+esc(comment||'')+'</textarea>',true)
    +'</div>');

  var foot='<span class="hr-actions-sub" style="margin-right:auto">Recorded as a log entry on '
    +(context==='order'?'PO 37741':'SCR-2026-50123')+'.</span>'
    +'<div class="ct-modal-btns">'
      +'<button class="btn-outline" onclick="scCloseModal()">Cancel</button>'
      +'<button class="btn-primary" onclick="scSubmitAction()">Submit</button>'
    +'</div>';

  document.getElementById('sc-modal-root').innerHTML=
    modalShell(action,context==='order'?'PO 37741 · SCR-2026-50123':'SCR-2026-50123',statusBlock+fields,foot,true);

  if(action==='Create IMR')scRefreshIMR();
}
function scRecalcPO(){
  var price=parseFloat((document.getElementById('po-price')||{value:0}).value||0);
  var v=(price*10).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
  document.getElementById('po-line-value').innerHTML='<b>'+v+'</b>';
  document.getElementById('po-total').textContent=v;
}
function scRefreshIMR(){
  var sel=document.getElementById('imr-asn');if(!sel)return;
  var i=parseInt(sel.value,10);
  var asn=state.asns[i];if(!asn)return;
  document.getElementById('imr-items').innerHTML=section('Receivable Items',
    recTable(['Receivable Item','Advised Qty','Already Received','Available for Receipt','Receipt Qty *'],
      '<tr><td><b>Fabricated End Frame</b></td><td>'+asn.qty+'</td><td>'+receivedForASN(i)+'</td>'
      +'<td><b>'+availableForIMR(i)+'</b></td>'
      +'<td><input class="ep-form-input" id="imr-qty" value="'+availableForIMR(i)+'"></td></tr>'));
}

function scSubmitAction(){
  if(!pendingAction)return;
  var action=pendingAction.action;
  var comment=(document.getElementById('sc-action-comment')||{value:''}).value.trim();
  if(!comment){scToast('Comment is mandatory','error');return;}

  if(action==='Generate PO'){
    state.po='created';
    addPOLog('PO Generated',comment);
    scToast('PO 37741 generated','success','Now pending with the PO Approver.');
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

function scOpenView(type,index){
  var title='',sub='',body='';

  if(type==='scr'){title='SCR Details';sub='SCR-2026-50123';body=dealDetailsHTML();}

  else if(type==='po'){title='Purchase Order';sub='PO 37741';body=orderDetailsHTML();}

  else if(type==='shipment'){
    title='Shipment';sub='SHP-2026-035307';
    body='<div class="lp-sb-detail-grid">'
      +fieldCard(ICO.box,'Shipment ID','SHP-2026-035307')
      +fieldCard(ICO.doc,'SCR No.','SCR-2026-50123')
      +fieldCard(ICO.cart,'PO No.','37741')
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
        +docCell('SCR No.','SCR-2026-50123')+docCell('PO No.','37741'))
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
        +'<div class="adt-doc-meta">'+(state.deliveryNote==='approved'?'Approved':'Generated')+' · SCR-2026-50123</div></div></div>'
      +docGrid(4,docCell('Delivery Note No.','DN/26/0123')+docCell('Delivery Note Date','25 Sep 2026 11:19')
        +docCell('PO No.','37741')+docCell('Shipment No.','SHP-2026-035307'))
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
      +docGrid(4,docCell('Delivery Note No.','DN/26/0123')+docCell('SCR No.','SCR-2026-50123')
        +docCell('PO No.','37741')+docCell('Shipment No.','SHP-2026-035307'))
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
      +fieldCard(ICO.doc,'SCR No.','SCR-2026-50123')
      +fieldCard(ICO.cart,'PO No.','37741')
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
      +fieldCard(ICO.doc,'SCR No.','SCR-2026-50123')
      +fieldCard(ICO.cart,'PO No.','37741')
      +fieldCard(ICO.cube,'Receipt Qty',String(m.qty))
      +fieldCard(ICO.check,'Status',badge(m.status==='Confirmed'?'approved':'created',m.status))
      +'</div>';
  }

  else if(type==='reconciliation'){
    title='Reconciliation';sub='SCR-2026-50123';
    body=recTable(['SCR','PO','Shipment','Receivable Item','Expected Qty','Received Qty','Open Qty'],
        '<tr><td>SCR-2026-50123</td><td>37741</td><td>SHP-2026-035307</td><td><b>Fabricated End Frame</b></td>'
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

/* ══ BOOT ═════════════════════════════════════════════════════════════════  */
document.getElementById('sc-create-btn').innerHTML=ICO.plus+' Create SCR';
scRender();
