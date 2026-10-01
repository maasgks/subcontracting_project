# Sub-Contracting

A clickable prototype of the Sub-Contracting lifecycle — SCR → Purchase Order →
Shipment → Outbound → ASN / QC → IMR → Reconciliation → Closure — built in the
ADT design system.

Open `subcontracting_project.html` directly in Chrome. There is no build step,
no server and no dependencies.

## What it does

Eleven roles share one deal. The role you are "Logged in as" (top right) decides
which dashboard stages are open to you, which actions the Logs tab will let you
record, and who the deal shows as pending with. Nothing can be done out of
sequence: the Add Log dropdown only ever offers the actions the record is
actually ready for, so the prototype walks the real flow.

Everything operational happens from **Logs**. Workflow is a read-only report of
what has already happened, which is why no action lives there.

Four actions need more than a status and a comment — Create Shipment, Create
ASN, Create IMR and Short Close — and open their own form. The documents a stage
produces (Outbound Key, Delivery Note, Delivery Challan) open as printable
record views.

To walk the whole flow, switch role as the deal asks for it: PMG Approver →
Buyer → PO Approver → Planner → Stores User → Delivery Note Approver →
Finance / F&A / IDT → Security User → Planner → Vendor User → QC User →
Security User → Stores User → Finance / F&A / IDT. Or switch to **Super Admin**,
which can take every action itself.

## Layout

```
subcontracting_project.html   the page — the ADT shell: topbar, rail, #adt-content
css/subcontracting.css        this module's own styles (.sc-* only)
js/subcontracting.js          state, rendering and every interaction
css/*.css                     the ADT design system, copied unmodified
assets/                       logo and the Inter woff2 set fonts.css loads
```

## How it relates to ADT

The eight stylesheets beside `subcontracting.css` are **copied verbatim from the
ADT Revamp workspace and are not edited here**. Every screen is assembled out of
components they already define:

| Screen | Components |
| --- | --- |
| Listings | `.listing-page` `.listing-top` `.listing-stats` `.lp-table` `.lp-filter-bar` |
| Detail panel | `.lp-split-sb` `.lp-isb` `.lp-sb-view-header` `.lp-sb-field-card` |
| Workflow | `.lp-wf-row` `.lp-wf-card` `.lp-wf-meta-row` `.lp-wf-desc` |
| Logs | `.lp-logs-wrap` `.lp-log-card` `.lp-logs-form` |
| Popups | `.ct-modal` `.policy-form-section` `.ep-form-*` |
| Documents | `.adt-doc-page` |
| Dashboard | `.hr-header` `.hr-band` `.hr-stat-card` |

Because the class names are the shared ones, every transition in `motion.css`
applies without a line of its own: page entrance, section stagger, row stagger,
the panel slide, the popup lift, the toasts.

`subcontracting.css` adds only what no shared component covers — the role
switch in the header, the dashboard stage card, the record table, the printable
document grid and the Yes/No switch — plus two scoped corrections that are
documented in the file where they sit.

If the ADT design system changes, re-copy those eight files. Nothing in this
project reads from the ADT workspace at runtime, so the two can drift; that is
the trade for being able to open this page anywhere.

## The mock rail

The sidebar is a placeholder built from one array — `SC_NAV` at the top of
`js/subcontracting.js`. Replace that array with the real structure; nothing else
has to change.
